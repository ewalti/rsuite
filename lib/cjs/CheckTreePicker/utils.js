'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.isEveryChildChecked = isEveryChildChecked;
exports.isSomeChildChecked = isSomeChildChecked;
exports.isSomeNodeHasChildren = isSomeNodeHasChildren;
exports.isAllSiblingNodeUncheckable = isAllSiblingNodeUncheckable;
exports.isEveryFirstLevelNodeUncheckable = isEveryFirstLevelNodeUncheckable;
exports.isNodeUncheckable = isNodeUncheckable;
exports.getFormattedTree = getFormattedTree;
exports.getDisabledState = getDisabledState;
exports.getCheckTreePickerDefaultValue = getCheckTreePickerDefaultValue;
exports.getSelectedItems = getSelectedItems;
exports.getNodeCheckState = getNodeCheckState;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));
var _isNil2 = _interopRequireDefault(require("lodash/isNil"));
var _utils = require("../utils");
var _treeUtils = require("../utils/treeUtils");
var _attachParent = require("../utils/attachParent");
function isEveryChildChecked(nodes, parent) {
  if ((0, _isNil2.default)(parent.refKey) || (0, _isNil2.default)(nodes[parent.refKey])) {
    return false;
  }
  var children = (0, _treeUtils.getChildrenByFlattenNodes)(nodes, parent);
  if (!children.length) {
    var _nodes$parent$refKey$;
    return (_nodes$parent$refKey$ = nodes[parent.refKey].check) !== null && _nodes$parent$refKey$ !== void 0 ? _nodes$parent$refKey$ : false;
  }
  return children.every(function (child) {
    return !(0, _isNil2.default)(child.refKey) && nodes[child.refKey].check;
  });
}
function isSomeChildChecked(nodes, parent, childrenKey) {
  if (!(0, _isNil2.default)(parent.refKey) && (0, _isNil2.default)(nodes[parent.refKey])) {
    return false;
  }
  var children = (0, _treeUtils.getChildrenByFlattenNodes)(nodes, parent);
  return children.some(function (child) {
    var _child$childrenKey;
    if ((child === null || child === void 0 ? void 0 : (_child$childrenKey = child[childrenKey]) === null || _child$childrenKey === void 0 ? void 0 : _child$childrenKey.length) > 0) {
      return isSomeChildChecked(nodes, child, childrenKey);
    }
    return !(0, _isNil2.default)(child.refKey) && nodes[child.refKey].check;
  });
}
function isSomeNodeHasChildren(data, childrenKey) {
  return data.some(function (node) {
    return Array.isArray(node[childrenKey]);
  });
}

/**
 * is all siblings nodes is uncheckable
 * @param {*} node
 */
function isAllSiblingNodeUncheckable(node, nodes, uncheckableItemValues, valueKey) {
  var list = [];
  var parentNodeRefKey = node.parent ? node.parent.refKey : '';
  Object.keys(nodes).forEach(function (refKey) {
    var _curNode$parent;
    var curNode = nodes[refKey];
    if ((0, _isNil2.default)(node.parent) && (0, _isNil2.default)(curNode.parent)) {
      list.push(curNode);
    } else if (((_curNode$parent = curNode.parent) === null || _curNode$parent === void 0 ? void 0 : _curNode$parent.refKey) === parentNodeRefKey) {
      list.push(curNode);
    }
  });
  return list.every(function (node) {
    return isNodeUncheckable(node, {
      uncheckableItemValues: uncheckableItemValues,
      valueKey: valueKey
    });
  });
}

/**
 * get each first level node uncheckable state
 */
function isEveryFirstLevelNodeUncheckable(nodes, uncheckableItemValues, valueKey) {
  var list = [];
  Object.keys(nodes).forEach(function (refKey) {
    var curNode = nodes[refKey];
    if (!curNode.parent) {
      list.push(curNode);
    }
  });
  return list.every(function (node) {
    return isNodeUncheckable(node, {
      uncheckableItemValues: uncheckableItemValues,
      valueKey: valueKey
    });
  });
}

/**
 * get node uncheckable state
 * @param {*} node
 */
function isNodeUncheckable(node, props) {
  var _props$uncheckableIte = props.uncheckableItemValues,
    uncheckableItemValues = _props$uncheckableIte === void 0 ? [] : _props$uncheckableIte,
    valueKey = props.valueKey;
  return uncheckableItemValues.some(function (value) {
    return node[valueKey] === value;
  });
}
function getFormattedTree(nodes, data, props) {
  var childrenKey = props.childrenKey,
    cascade = props.cascade;
  return data.map(function (node) {
    var formatted = (0, _extends2.default)({}, node);
    var curNode = nodes[node.refKey];
    if (curNode) {
      var _node$childrenKey;
      var checkState = !(0, _isUndefined2.default)(cascade) ? getNodeCheckState({
        node: curNode,
        cascade: cascade,
        nodes: nodes,
        childrenKey: childrenKey
      }) : undefined;
      formatted.check = curNode.check;
      formatted.expand = curNode.expand;
      formatted.uncheckable = curNode.uncheckable;
      (0, _attachParent.attachParent)(formatted, curNode.parent);
      formatted.checkState = checkState;
      if (((_node$childrenKey = node[childrenKey]) === null || _node$childrenKey === void 0 ? void 0 : _node$childrenKey.length) > 0) {
        formatted[childrenKey] = getFormattedTree(nodes, formatted[childrenKey], props);
      }
    }
    return formatted;
  });
}
function getDisabledState(nodes, node, props) {
  var _props$disabledItemVa = props.disabledItemValues,
    disabledItemValues = _props$disabledItemVa === void 0 ? [] : _props$disabledItemVa,
    valueKey = props.valueKey;
  if (!(0, _isNil2.default)(node.refKey) && (0, _isNil2.default)(nodes[node.refKey])) {
    return false;
  }
  return disabledItemValues.some(function (value) {
    return node.refKey && nodes[node.refKey][valueKey] === value;
  });
}
function getCheckTreePickerDefaultValue(value, uncheckableItemValues) {
  if (Array.isArray(value)) {
    return value.filter(function (v) {
      return !uncheckableItemValues.includes(v);
    });
  }
  return [];
}
function getSelectedItems(nodes, values) {
  var checkedItems = [];
  values.forEach(function (value) {
    var refKey = (0, _treeUtils.getNodeFormattedRefKey)(value);
    var node = nodes[refKey];
    if (!(0, _isNil2.default)(node)) {
      checkedItems.push(node);
    }
  });
  return checkedItems;
}
function getNodeCheckState(_ref) {
  var nodes = _ref.nodes,
    node = _ref.node,
    cascade = _ref.cascade,
    childrenKey = _ref.childrenKey;
  if ((0, _isNil2.default)(nodes[node.refKey])) {
    return _utils.CHECK_STATE.UNCHECK;
  }
  if (!node[childrenKey] || !node[childrenKey].length || !cascade) {
    nodes[node.refKey].checkAll = false;
    return node.check ? _utils.CHECK_STATE.CHECK : _utils.CHECK_STATE.UNCHECK;
  }
  if (isEveryChildChecked(nodes, node)) {
    nodes[node.refKey].checkAll = true;
    nodes[node.refKey].check = true;
    return _utils.CHECK_STATE.CHECK;
  }
  if (isSomeChildChecked(nodes, node, childrenKey)) {
    nodes[node.refKey].checkAll = false;
    return _utils.CHECK_STATE.INDETERMINATE;
  }
  return _utils.CHECK_STATE.UNCHECK;
}