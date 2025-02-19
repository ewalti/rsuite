'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _isEmpty from "lodash/isEmpty";
import _clone from "lodash/clone";
import _isNil from "lodash/isNil";
import _isArray from "lodash/isArray";
import _omit from "lodash/omit";
import _isUndefined from "lodash/isUndefined";
import _intersection from "lodash/intersection";
function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
import React, { useRef, useState, useEffect, useCallback } from 'react';
import shallowEqualArray from '../utils/shallowEqualArray';
import { getNodeCheckState } from '../CheckTreePicker/utils';
import { TREE_NODE_DROP_POSITION, shallowEqual } from '../utils';
import { shouldDisplay } from '../internals/Picker';
import reactToString from './reactToString';
import { TREE_NODE_PADDING, TREE_NODE_ROOT_PADDING } from './constants';
import { attachParent } from './attachParent';
// gap of tree node
var TREE_NODE_GAP = 4;

/**
 * according node parentNode expand state decide node whether to show
 * @param {*} expandItemValues
 * @param {*} parentKeys
 */
export function shouldShowNodeByParentExpanded(expandItemValues, parentKeys) {
  if (expandItemValues === void 0) {
    expandItemValues = [];
  }
  if (parentKeys === void 0) {
    parentKeys = [];
  }
  var intersectionKeys = _intersection(expandItemValues, parentKeys);
  if (intersectionKeys.length === parentKeys.length) {
    return true;
  }
  return false;
}

/**
 * flatten tree structure to array
 * @param {*} tree
 * @param {*} childrenKey
 * @param {*} executor
 *
 * @deprecated This {@link UNSAFE_flattenTree} function is considered unsafe because it mutates `tree` argument in-place
 *             Use {@link flattenTree} instead.
 */
export function UNSAFE_flattenTree(tree, childrenKey, executor) {
  if (childrenKey === void 0) {
    childrenKey = 'children';
  }
  var flattenData = [];
  var traverse = function traverse(data, parent) {
    if (!_isArray(data)) {
      return;
    }
    data.forEach(function (item, index) {
      var node = typeof executor === 'function' ? executor(item, index) : item;
      flattenData.push(attachParent(node, parent));
      if (item[childrenKey]) {
        traverse(item[childrenKey], item);
      }
    });
  };
  traverse(tree, null);
  return flattenData;
}
export var WalkTreeStrategy;
(function (WalkTreeStrategy) {
  WalkTreeStrategy[WalkTreeStrategy["DFS"] = 0] = "DFS";
  WalkTreeStrategy[WalkTreeStrategy["BFS"] = 1] = "BFS";
})(WalkTreeStrategy || (WalkTreeStrategy = {}));
export function flattenTree(rootNodes, getChildren, walkStrategy) {
  if (walkStrategy === void 0) {
    walkStrategy = WalkTreeStrategy.BFS;
  }
  var result = [];
  if (walkStrategy === WalkTreeStrategy.BFS) {
    walkTreeBfs(rootNodes, getChildren, function (node) {
      return result.push(node);
    });
  } else if (walkStrategy === WalkTreeStrategy.DFS) {
    walkTreeDfs(rootNodes, getChildren, function (node) {
      return result.push(node);
    });
  }
  return result;
}
export function walkTreeBfs(rootNodes, getChildren, callback) {
  for (var queue = [].concat(rootNodes); queue.length > 0;) {
    var _node = queue.shift();
    callback(_node);
    var children = getChildren(_node);
    if (children) {
      queue.push.apply(queue, children);
    }
  }
}
export function walkTreeDfs(rootNodes, getChildren, callback) {
  for (var _iterator = _createForOfIteratorHelperLoose(rootNodes), _step; !(_step = _iterator()).done;) {
    var _node2 = _step.value;
    callback(_node2);
    var children = getChildren(_node2);
    if (children) {
      walkTreeDfs(children, getChildren, callback);
    }
  }
}

/**
 * get all ancestor nodes of given node
 * @param {*} node
 */
export function getNodeParents(node, parentKey, valueKey) {
  if (parentKey === void 0) {
    parentKey = 'parent';
  }
  var parents = [];
  var traverse = function traverse(node) {
    if (node !== null && node !== void 0 && node[parentKey]) {
      traverse(node[parentKey]);
      if (valueKey) {
        parents.push(node[parentKey][valueKey]);
      } else {
        parents.push(node[parentKey]);
      }
    }
  };
  traverse(node);
  return parents;
}

/**
 * get all parentKeys of given node
 * @param nodes
 * @param node
 * @param valueKey
 */
export function getNodeParentKeys(nodes, node, valueKey) {
  var parentKeys = [];
  var traverse = function traverse(node) {
    var _node$parent;
    if (node !== null && node !== void 0 && (_node$parent = node.parent) !== null && _node$parent !== void 0 && _node$parent.refKey) {
      var _node$parent2;
      traverse(nodes[node.parent.refKey]);
      parentKeys.push(node === null || node === void 0 ? void 0 : (_node$parent2 = node.parent) === null || _node$parent2 === void 0 ? void 0 : _node$parent2[valueKey]);
    }
  };
  traverse(node);
  return parentKeys;
}
export function hasVisibleChildren(node, childrenKey) {
  if (!Array.isArray(node[childrenKey])) {
    return false;
  }
  return node[childrenKey].some(function (child) {
    return child.visible;
  });
}

/**
 * shallow equal array
 * @param a
 * @param b
 */
export function compareArray(a, b) {
  return _isArray(a) && _isArray(b) && !shallowEqualArray(a, b);
}
export function getDefaultExpandItemValues(data, props) {
  var valueKey = props.valueKey,
    defaultExpandAll = props.defaultExpandAll,
    childrenKey = props.childrenKey,
    _props$defaultExpandI = props.defaultExpandItemValues,
    defaultExpandItemValues = _props$defaultExpandI === void 0 ? [] : _props$defaultExpandI;
  if (defaultExpandAll) {
    return UNSAFE_flattenTree(data, childrenKey).filter(function (item) {
      return Array.isArray(item[childrenKey]) && item[childrenKey].length > 0;
    }).map(function (item) {
      return item[valueKey];
    });
  }
  return defaultExpandItemValues;
}

/**
 * 获取 expandItemValues 的 value
 * @param props
 */
export function getExpandItemValues(props) {
  var expandItemValues = props.expandItemValues,
    defaultExpandItemValues = props.defaultExpandItemValues;
  if (!_isUndefined(expandItemValues) && Array.isArray(expandItemValues)) {
    return expandItemValues;
  }
  if (!_isUndefined(defaultExpandItemValues) && Array.isArray(defaultExpandItemValues)) {
    return defaultExpandItemValues;
  }
  return [];
}

/**
 * get dragNode and it's children node keys
 * @param node
 * @param childrenKey
 * @param valueKey
 */
export function getDragNodeKeys(dragNode, childrenKey, valueKey) {
  var dragNodeKeys = [dragNode[valueKey]];
  var traverse = function traverse(data) {
    if ((data === null || data === void 0 ? void 0 : data.length) > 0) {
      data.forEach(function (node) {
        dragNodeKeys = dragNodeKeys.concat([node[valueKey]]);
        if (node[childrenKey]) {
          traverse(node[childrenKey]);
        }
      });
    }
  };
  traverse(dragNode[childrenKey]);
  return dragNodeKeys;
}
export function calDropNodePosition(event, treeNodeElement) {
  var clientY = event.clientY;
  var _treeNodeElement$getB = treeNodeElement.getBoundingClientRect(),
    top = _treeNodeElement$getB.top,
    bottom = _treeNodeElement$getB.bottom;
  var gap = TREE_NODE_GAP;

  // bottom of node
  if (clientY >= bottom - gap && clientY <= bottom) {
    return TREE_NODE_DROP_POSITION.DRAG_OVER_BOTTOM;
  }

  // top of node
  if (clientY <= top + gap && clientY >= top) {
    return TREE_NODE_DROP_POSITION.DRAG_OVER_TOP;
  }
  if (clientY >= top + gap && clientY <= bottom - gap) {
    return TREE_NODE_DROP_POSITION.DRAG_OVER;
  }
  return -1;
}
export function removeDragNode(data, params, _ref) {
  var valueKey = _ref.valueKey,
    childrenKey = _ref.childrenKey;
  var dragNode = params.dragNode;
  var traverse = function traverse(items, parent) {
    for (var _index = 0; _index < items.length; _index += 1) {
      var _item = items[_index];
      if (shallowEqual(_item[valueKey], dragNode[valueKey])) {
        items.splice(_index, 1);
        // when children is empty, delete children prop for hidden anchor
        if (items.length === 0 && parent) {
          delete parent.children;
        }
        break;
      }
      if (Array.isArray(_item[childrenKey])) {
        traverse(_item[childrenKey], _item);
      }
    }
  };
  traverse(data);
}
export function createUpdateTreeDataFunction(params, _ref2) {
  var valueKey = _ref2.valueKey,
    childrenKey = _ref2.childrenKey;
  return function (tree) {
    var data = [].concat(tree);
    var dragNode = params.dragNode,
      dropNode = params.dropNode,
      dropNodePosition = params.dropNodePosition;
    var cloneDragNode = _extends({}, dragNode);
    removeDragNode(data, params, {
      valueKey: valueKey,
      childrenKey: childrenKey
    });
    var updateTree = function updateTree(items) {
      for (var _index2 = 0; _index2 < items.length; _index2 += 1) {
        var _item2 = items[_index2];
        if (shallowEqual(_item2[valueKey], dropNode[valueKey])) {
          // drag to node inside
          if (dropNodePosition === TREE_NODE_DROP_POSITION.DRAG_OVER) {
            _item2[childrenKey] = _isNil(_item2[childrenKey]) ? [] : _item2[childrenKey];
            _item2[childrenKey].push(cloneDragNode);
            break;
          } else if (dropNodePosition === TREE_NODE_DROP_POSITION.DRAG_OVER_TOP) {
            // drag to top of node
            items.splice(_index2, 0, cloneDragNode);
            break;
          } else if (dropNodePosition === TREE_NODE_DROP_POSITION.DRAG_OVER_BOTTOM) {
            // drag to bottom of node
            items.splice(_index2 + 1, 0, cloneDragNode);
            break;
          }
        }
        if (Array.isArray(_item2[childrenKey]) && _item2[childrenKey].length > 0) {
          updateTree(_item2[childrenKey]);
        }
      }
    };
    updateTree(data);
    return [].concat(data);
  };
}
export function findNodeOfTree(data, check) {
  var findNode = function findNode(nodes) {
    if (nodes === void 0) {
      nodes = [];
    }
    for (var i = 0; i < nodes.length; i += 1) {
      var _item3 = nodes[i];
      if (_isArray(_item3.children)) {
        var _node3 = findNode(_item3.children);
        if (_node3) {
          return _node3;
        }
      }
      if (check(_item3)) {
        return _item3;
      }
    }
    return undefined;
  };
  return findNode(data);
}
export function filterNodesOfTree(data, check) {
  var findNodes = function findNodes(nodes) {
    if (nodes === void 0) {
      nodes = [];
    }
    var nextNodes = [];
    for (var i = 0; i < nodes.length; i += 1) {
      if (_isArray(nodes[i].children)) {
        var nextChildren = findNodes(nodes[i].children);
        if (nextChildren.length) {
          var _item4 = _clone(nodes[i]);
          _item4.children = nextChildren;
          nextNodes.push(_item4);
          continue;
        }
      }
      if (check(nodes[i])) {
        nextNodes.push(nodes[i]);
      }
    }
    return nextNodes;
  };
  return findNodes(data);
}

/**
 * get all focusable items
 * exclude not visible and disabled node
 * @param filteredData - filtered tree data
 * @param props - TreeProps
 * @param isSearching - component is in Searching
 * @returns
 */
export var getFocusableItems = function getFocusableItems(filteredData, props, isSearching) {
  var disabledItemValues = props.disabledItemValues,
    valueKey = props.valueKey,
    childrenKey = props.childrenKey,
    expandItemValues = props.expandItemValues;
  var items = [];
  var loop = function loop(nodes) {
    nodes.forEach(function (node) {
      var disabled = disabledItemValues.some(function (disabledItem) {
        return shallowEqual(disabledItem, node[valueKey]);
      });
      if (!disabled && node.visible) {
        items.push(node);
      }
      // always expand when searching
      var expand = isSearching ? true : expandItemValues.includes(node[valueKey]);
      if (node[childrenKey] && expand) {
        loop(node[childrenKey]);
      }
    });
  };
  loop(filteredData);
  return items;
};

/**
 * return all focusable Item and active Element index
 * @param focusItemValue
 * @param focusableItems items
 */
export var getActiveIndex = function getActiveIndex(focusItemValue, focusItems, valueKey) {
  var activeIndex = -1;
  focusItems.forEach(function (item, index) {
    if (shallowEqual(item[valueKey], focusItemValue)) {
      activeIndex = index;
    }
  });
  return activeIndex;
};

/**
 * get current active element and node data
 * @param flattenNodes - flattenData
 */
export var getActiveItem = function getActiveItem(focusItemValue, flattenNodes, valueKey) {
  var nodeData = null;
  var activeNode = Object.values(flattenNodes).find(function (node) {
    return shallowEqual(node[valueKey], focusItemValue);
  });
  if (activeNode) {
    nodeData = activeNode;
  }
  return nodeData;
};
export var getElementByDataKey = function getElementByDataKey(dataKey, treeNodesRefs, selector) {
  var ele = treeNodesRefs[dataKey];
  if (ele instanceof Element) {
    return ele.querySelector(selector);
  }
  return null;
};

/**
 * focus to specify tree node
 * @param refKey - target node refKey
 * @param treeNodeRefs - all tree node refs object
 * @param selector - node css selector
 */
export var focusTreeNode = function focusTreeNode(refKey, treeNodeRefs, selector) {
  var _node$focus;
  var node = getElementByDataKey(refKey, treeNodeRefs, selector);
  node === null || node === void 0 ? void 0 : (_node$focus = node.focus) === null || _node$focus === void 0 ? void 0 : _node$focus.call(node);
};
/**
 * focus next item with keyboard
 * @param param
 */
export var focusNextItem = function focusNextItem(_ref3) {
  var focusItemValue = _ref3.focusItemValue,
    focusableItems = _ref3.focusableItems,
    treeNodesRefs = _ref3.treeNodesRefs,
    selector = _ref3.selector,
    valueKey = _ref3.valueKey,
    callback = _ref3.callback;
  var activeIndex = getActiveIndex(focusItemValue, focusableItems, valueKey);
  if (focusableItems.length === 0) {
    return;
  }
  var nextIndex = activeIndex === focusableItems.length - 1 ? 0 : activeIndex + 1;
  var nextFocusItemValue = focusableItems[nextIndex][valueKey];
  callback === null || callback === void 0 ? void 0 : callback(nextFocusItemValue);
  focusTreeNode(focusableItems[nextIndex].refKey, treeNodesRefs, selector);
};

/**
 * focus prev item with keyboard
 * @param param
 */
export var focusPreviousItem = function focusPreviousItem(_ref4) {
  var focusItemValue = _ref4.focusItemValue,
    focusableItems = _ref4.focusableItems,
    treeNodesRefs = _ref4.treeNodesRefs,
    selector = _ref4.selector,
    valueKey = _ref4.valueKey,
    callback = _ref4.callback;
  var activeIndex = getActiveIndex(focusItemValue, focusableItems, valueKey);
  if (focusableItems.length === 0) {
    return;
  }
  var prevIndex = activeIndex === 0 ? focusableItems.length - 1 : activeIndex - 1;
  prevIndex = prevIndex >= 0 ? prevIndex : 0;
  var prevFocusItemValue = focusableItems[prevIndex][valueKey];
  callback === null || callback === void 0 ? void 0 : callback(prevFocusItemValue);
  focusTreeNode(focusableItems[prevIndex].refKey, treeNodesRefs, selector);
};
/**
 * Left arrow keyboard event handler
 * When focus is on an open node, closes the node.
 * When focus is on a child node that is also either an end node or a closed node, moves focus to its parent node.
 * When focus is on a root node that is also either an end node or a closed node, does nothing.
 * @see https://www.w3.org/TR/wai-aria-practices/#TreeView
 */
export function leftArrowHandler(_ref5) {
  var focusItem = _ref5.focusItem,
    expand = _ref5.expand,
    onExpand = _ref5.onExpand,
    onFocusItem = _ref5.onFocusItem;
  if (_isEmpty(focusItem)) {
    return;
  }
  if (expand) {
    onExpand(_extends({}, focusItem, {
      expand: expand
    }));
  } else if (focusItem !== null && focusItem !== void 0 && focusItem.parent) {
    onFocusItem();
  }
}

/**
 * Right arrow keyboard event handler
 * When focus is on a closed node, opens the node; focus does not move.
 * When focus is on a open node, moves focus to the first child node.
 * When focus is on an end node, does nothing.
 * @see https://www.w3.org/TR/wai-aria-practices/#TreeView
 */
export function rightArrowHandler(_ref6) {
  var focusItem = _ref6.focusItem,
    expand = _ref6.expand,
    childrenKey = _ref6.childrenKey,
    onExpand = _ref6.onExpand,
    onFocusItem = _ref6.onFocusItem;
  if (_isEmpty(focusItem) || !Array.isArray(focusItem[childrenKey])) {
    return;
  }
  if (!expand) {
    onExpand(_extends({}, focusItem, {
      expand: expand
    }));
  } else {
    onFocusItem();
  }
}

/**
 * get scrollIndex in virtualized list
 * @param nodes - data
 * @param value - activeItem value
 * @param valueKey
 */
export var getScrollToIndex = function getScrollToIndex(nodes, value, valueKey) {
  return nodes.filter(function (n) {
    return n.visible;
  }).findIndex(function (item) {
    return item[valueKey] === value;
  });
};

/**
 * when searching, expand state always return true
 * @param searchKeyword
 * @param expand
 */
export function getExpandWhenSearching(searchKeyword, expand) {
  return isSearching(searchKeyword) ? true : expand;
}
function getTreeActiveNode(nodes, value, valueKey) {
  if (_isUndefined(value)) {
    return undefined;
  }
  for (var refKey in nodes) {
    if (shallowEqual(nodes[refKey][valueKey], value)) {
      return nodes[refKey];
    }
  }
}
export { getTreeActiveNode };

/**
 * toggle tree node
 * @param param0
 */
export function toggleExpand(_ref7) {
  var node = _ref7.node,
    isExpand = _ref7.isExpand,
    expandItemValues = _ref7.expandItemValues,
    valueKey = _ref7.valueKey;
  var newExpandItemValues = new Set(expandItemValues);
  if (isExpand) {
    newExpandItemValues.add(node[valueKey]);
  } else {
    newExpandItemValues.delete(node[valueKey]);
  }
  return Array.from(newExpandItemValues);
}
export function getTreeNodeTitle(label) {
  if (typeof label === 'string') {
    return label;
  } else if ( /*#__PURE__*/React.isValidElement(label)) {
    var _nodes = reactToString(label);
    return _nodes.join('');
  }
}

/**
 * get all children from flattenNodes object by given parent node
 * @param nodes
 * @param parent
 */
export function getChildrenByFlattenNodes(nodes, parent) {
  if (!_isNil(parent.refKey) && _isNil(nodes[parent.refKey])) {
    return [];
  }
  return Object.values(nodes).filter(function (item) {
    var _item$parent;
    return (item === null || item === void 0 ? void 0 : (_item$parent = item.parent) === null || _item$parent === void 0 ? void 0 : _item$parent.refKey) === parent.refKey && item.refKey && !nodes[item.refKey].uncheckable;
  });
}
export function useTreeDrag() {
  // current dragging node
  var dragNode = useRef(null);
  var _useState = useState(null),
    dragOverNodeKey = _useState[0],
    setDragOverNodeKey = _useState[1]; // drag node and it's children nodes key
  var _useState2 = useState([]),
    dragNodeKeys = _useState2[0],
    setDragNodeKeys = _useState2[1];
  var _useState3 = useState(null),
    dropNodePosition = _useState3[0],
    setDropNodePosition = _useState3[1];
  var setDragNode = function setDragNode(node) {
    dragNode.current = node;
  };
  return {
    dragNode: dragNode === null || dragNode === void 0 ? void 0 : dragNode.current,
    dragOverNodeKey: dragOverNodeKey,
    dragNodeKeys: dragNodeKeys,
    dropNodePosition: dropNodePosition,
    setDragNode: setDragNode,
    setDragOverNodeKey: setDragOverNodeKey,
    setDragNodeKeys: setDragNodeKeys,
    setDropNodePosition: setDropNodePosition
  };
}
/**
 * hooks for flatten tree structure
 * @param param0
 */
export function useFlattenTreeData(_ref8) {
  var data = _ref8.data,
    labelKey = _ref8.labelKey,
    valueKey = _ref8.valueKey,
    childrenKey = _ref8.childrenKey,
    _ref8$uncheckableItem = _ref8.uncheckableItemValues,
    uncheckableItemValues = _ref8$uncheckableItem === void 0 ? [] : _ref8$uncheckableItem,
    callback = _ref8.callback;
  var _useState4 = useState(Object.create(null)),
    dispatch = _useState4[1];
  var forceUpdate = useCallback(function () {
    dispatch(Object.create(null));
  }, [dispatch]);
  var flattenNodes = useRef({});
  var flattenTreeData = useCallback(function (treeData, parent, layer) {
    if (layer === void 0) {
      layer = 1;
    }
    if (!Array.isArray(treeData) || treeData.length === 0) {
      return [];
    }
    treeData.map(function (node) {
      var _extends2;
      var value = node[valueKey];
      /**
       * because the value of the node's type is string or number,
       * so it can used as the key of the object directly
       * to avoid number value is converted to string. 1 and '1' will be convert to '1'
       *  we used `String_` or `Number_` prefix
       */
      var refKey = getNodeFormattedRefKey(value);
      node.refKey = refKey;
      flattenNodes.current[refKey] = _extends((_extends2 = {
        layer: layer
      }, _extends2[labelKey] = node[labelKey], _extends2[valueKey] = node[valueKey], _extends2.uncheckable = uncheckableItemValues.some(function (value) {
        return shallowEqual(node[valueKey], value);
      }), _extends2), node);
      if (parent) {
        flattenNodes.current[refKey].parent = _omit(parent, 'parent', 'children');
      }
      flattenTreeData(node[childrenKey], node, layer + 1);
    });
    callback === null || callback === void 0 ? void 0 : callback(flattenNodes.current);
  }, [childrenKey, valueKey, labelKey, callback, uncheckableItemValues]);
  var serializeListOnlyParent = useCallback(function (nodes, key) {
    var list = [];
    Object.keys(nodes).forEach(function (refKey) {
      var currentNode = nodes[refKey];
      if (!_isNil(currentNode.parent) && !_isNil(currentNode.parent.refKey)) {
        var parentNode = nodes[currentNode.parent.refKey];
        if (currentNode[key]) {
          if (!(parentNode !== null && parentNode !== void 0 && parentNode.checkAll)) {
            list.push(nodes[refKey][valueKey]);
          } else if (parentNode !== null && parentNode !== void 0 && parentNode.uncheckable) {
            list.push(nodes[refKey][valueKey]);
          }
        }
      } else {
        if (currentNode[key]) {
          list.push(nodes[refKey][valueKey]);
        }
      }
    });
    return list;
  }, [valueKey]);

  /**
   * using in CheckTreePicker, to unSerializeList check property
   */
  var unSerializeList = useCallback(function (_ref9) {
    var nodes = _ref9.nodes,
      key = _ref9.key,
      _ref9$value = _ref9.value,
      value = _ref9$value === void 0 ? [] : _ref9$value,
      cascade = _ref9.cascade,
      uncheckableItemValues = _ref9.uncheckableItemValues;
    // Reset values to false
    Object.keys(nodes).forEach(function (refKey) {
      var node = nodes[refKey];
      if (cascade && !_isNil(node.parent) && !_isNil(node.parent.refKey)) {
        node[key] = nodes[node.parent.refKey][key];
      } else {
        node[key] = false;
      }
      value.forEach(function (value) {
        if (shallowEqual(nodes[refKey][valueKey], value) && !uncheckableItemValues.some(function (uncheckableValue) {
          return shallowEqual(value, uncheckableValue);
        })) {
          nodes[refKey][key] = true;
        }
      });
    });
  }, [valueKey]);
  var formatVirtualizedTreeData = function formatVirtualizedTreeData(nodes, data, expandItemValues, options) {
    var cascade = options.cascade,
      searchKeyword = options.searchKeyword;
    return UNSAFE_flattenTree(data, childrenKey, function (node) {
      var formatted = {};
      var curNode = nodes === null || nodes === void 0 ? void 0 : nodes[node.refKey];
      var parentKeys = getNodeParentKeys(nodes, curNode, valueKey);
      /**
       * When using virtualized,
       * if the parent node is collapsed, the child nodes should be hidden
       * avoid component height calculation errors
       */
      var visible = curNode !== null && curNode !== void 0 && curNode.parent ? shouldShowNodeByParentExpanded(expandItemValues, parentKeys) : true;

      /**
       * when searching, every node default expand
       * the node's visible should follow the original state
       */
      if (isSearching(searchKeyword)) {
        visible = node.visible;
      }
      if (curNode) {
        var checkState = !_isUndefined(cascade) ? getNodeCheckState({
          node: curNode,
          cascade: cascade,
          nodes: nodes,
          childrenKey: childrenKey
        }) : undefined;
        formatted = _extends({}, node, {
          check: curNode.check,
          uncheckable: curNode.uncheckable,
          hasChildren: !!node[childrenKey],
          layer: curNode.layer,
          parent: curNode.parent,
          checkState: checkState,
          visible: visible
        });
      }
      return formatted;
    });
  };
  useEffect(function () {
    // when data is changed, should clear the flattenNodes, avoid duplicate keys
    flattenNodes.current = {};
    flattenTreeData(data);
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    forceUpdate: forceUpdate,
    flattenNodes: flattenNodes.current,
    flattenTreeData: flattenTreeData,
    serializeListOnlyParent: serializeListOnlyParent,
    unSerializeList: unSerializeList,
    formatVirtualizedTreeData: formatVirtualizedTreeData
  };
}

/**
 * A hook that saving every tree node ref
 */
export function useTreeNodeRefs() {
  var treeNodeRefs = useRef({});
  var saveTreeNodeRef = function saveTreeNodeRef(ref, refKey) {
    if (!_isNil(refKey)) {
      treeNodeRefs.current[refKey] = ref;
    }
  };
  return {
    treeNodesRefs: treeNodeRefs.current,
    saveTreeNodeRef: saveTreeNodeRef
  };
}
/**
 * A hook that handles tree search filter options
 * @param props
 */
export function useTreeSearch(props) {
  var labelKey = props.labelKey,
    childrenKey = props.childrenKey,
    searchKeyword = props.searchKeyword,
    data = props.data,
    searchBy = props.searchBy,
    callback = props.callback;
  var filterVisibleData = useCallback(function (data, searchKeyword) {
    var setVisible = function setVisible(nodes) {
      return nodes.forEach(function (item) {
        item.visible = searchBy ? searchBy(searchKeyword, item[labelKey], item) : shouldDisplay(item[labelKey], searchKeyword);
        if (_isArray(item[childrenKey])) {
          filterVisibleData(item[childrenKey], searchKeyword);
          item[childrenKey].forEach(function (child) {
            if (child.visible) {
              item.visible = child.visible;
            }
          });
        }
      });
    };
    setVisible(data);
    return data;
  }, [childrenKey, labelKey, searchBy]);

  // Use search keywords to filter options.
  var _useState5 = useState(searchKeyword !== null && searchKeyword !== void 0 ? searchKeyword : ''),
    searchKeywordState = _useState5[0],
    setSearchKeyword = _useState5[1];
  var _useState6 = useState(function () {
      return filterVisibleData(data, searchKeywordState);
    }),
    filteredData = _useState6[0],
    setFilteredData = _useState6[1];
  var handleSearch = function handleSearch(searchKeyword, event) {
    var filteredData = filterVisibleData(data, searchKeyword);
    setFilteredData(filteredData);
    setSearchKeyword(searchKeyword);
    event && (callback === null || callback === void 0 ? void 0 : callback(searchKeyword, filteredData, event));
  };
  useEffect(function () {
    handleSearch(searchKeyword !== null && searchKeyword !== void 0 ? searchKeyword : '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKeyword]);
  var handleSetFilteredData = useCallback(function (data, searchKeyword) {
    setFilteredData(filterVisibleData(data, searchKeyword));
  }, [filterVisibleData]);
  return {
    searchKeywordState: searchKeywordState,
    filteredData: filteredData,
    setFilteredData: handleSetFilteredData,
    setSearchKeyword: setSearchKeyword,
    handleSearch: handleSearch
  };
}
export function useGetTreeNodeChildren(treeData, valueKey, childrenKey) {
  var _useState7 = useState([]),
    loadingNodeValues = _useState7[0],
    setLoadingNodeValues = _useState7[1];
  var _useState8 = useState(treeData),
    data = _useState8[0],
    setData = _useState8[1];
  var concatChildren = useCallback(function (treeNode, children) {
    var value = treeNode[valueKey];
    treeNode = findNodeOfTree(data, function (item) {
      return value === item[valueKey];
    });
    treeNode[childrenKey] = children;
    var newData = data.concat([]);
    setData(newData);
    return newData;
  }, [data, valueKey, childrenKey]);
  var loadChildren = useCallback(function (node, getChildren) {
    setLoadingNodeValues(function (prev) {
      return prev.concat(node[valueKey]);
    });
    var children = getChildren(node);
    if (children instanceof Promise) {
      children.then(function (res) {
        var newData = concatChildren(node, res);
        setData(newData);
        setLoadingNodeValues(function (prev) {
          return prev.filter(function (item) {
            return !shallowEqual(item, node[valueKey]);
          });
        });
      });
    } else {
      setData(concatChildren(node, children));
      setLoadingNodeValues(function (prev) {
        return prev.filter(function (item) {
          return !shallowEqual(item, node[valueKey]);
        });
      });
    }
  }, [concatChildren, valueKey]);
  return {
    data: data,
    setData: setData,
    loadingNodeValues: loadingNodeValues,
    loadChildren: loadChildren
  };
}
/**
 * Focus to active tree node.
 * @param param0
 */
export function focusToActiveTreeNode(_ref10) {
  var _activeItem$focus;
  var list = _ref10.list,
    valueKey = _ref10.valueKey,
    activeNode = _ref10.activeNode,
    virtualized = _ref10.virtualized,
    container = _ref10.container,
    selector = _ref10.selector,
    formattedNodes = _ref10.formattedNodes;
  if (!container) return;
  if (virtualized && activeNode) {
    var _list$scrollToRow;
    var scrollIndex = getScrollToIndex(formattedNodes, activeNode === null || activeNode === void 0 ? void 0 : activeNode[valueKey], valueKey);
    (_list$scrollToRow = list.scrollToRow) === null || _list$scrollToRow === void 0 ? void 0 : _list$scrollToRow.call(list, scrollIndex);
    return;
  }
  var activeItem = container.querySelector(selector);
  if (!activeItem) {
    return;
  }
  activeItem === null || activeItem === void 0 ? void 0 : (_activeItem$focus = activeItem.focus) === null || _activeItem$focus === void 0 ? void 0 : _activeItem$focus.call(activeItem);
}
export function isSearching(searchKeyword) {
  return !_isEmpty(searchKeyword);
}
export function getTreeNodeIndent(rtl, layer, absolute) {
  var _ref12;
  if (absolute === void 0) {
    absolute = false;
  }
  // layer start from 1
  var offset = layer * TREE_NODE_PADDING + TREE_NODE_ROOT_PADDING;
  if (absolute) {
    var _ref11;
    return _ref11 = {}, _ref11[rtl ? 'right' : 'left'] = offset, _ref11;
  }
  return _ref12 = {}, _ref12[rtl ? 'paddingRight' : 'paddingLeft'] = offset, _ref12;
}

/**
 * according to the value type to get the formatted valueKey of the node
 * @param value
 * @returns
 */
export function getNodeFormattedRefKey(value) {
  return "" + (typeof value === 'number' ? 'Number_' : 'String_') + value;
}

/**
 * create drag preview when tree node start drag
 * @param name
 * @param className
 * @returns
 */
export function createDragPreview(name, className) {
  var dragPreview = document.createElement('div');
  dragPreview.id = 'rs-tree-drag-preview';
  dragPreview.innerHTML = name;
  dragPreview.classList.add(className);
  document.body.appendChild(dragPreview);
  return dragPreview;
}

/**
 * remove drag preview when tree node drop
 */
export function removeDragPreview() {
  var _dragPreview$parentNo, _dragPreview$parentNo2;
  var dragPreview = document.getElementById('rs-tree-drag-preview');
  dragPreview === null || dragPreview === void 0 ? void 0 : (_dragPreview$parentNo = dragPreview.parentNode) === null || _dragPreview$parentNo === void 0 ? void 0 : (_dragPreview$parentNo2 = _dragPreview$parentNo.removeChild) === null || _dragPreview$parentNo2 === void 0 ? void 0 : _dragPreview$parentNo2.call(_dragPreview$parentNo, dragPreview);
}
export function stringifyTreeNodeLabel(label) {
  if (typeof label === 'string') {
    return label;
  } else if ( /*#__PURE__*/React.isValidElement(label)) {
    var _nodes2 = reactToString(label);
    return _nodes2.join('');
  }
  return '';
}

/**
 * Returns a WeakMap that maps each item in `items` to its parent
 * indicated by `getChildren` function
 */
export function getParentMap(items, getChildren) {
  var map = new WeakMap();
  for (var queue = [].concat(items); queue.length > 0;) {
    var _item5 = queue.shift();
    var children = getChildren(_item5);
    if (children) {
      for (var _iterator2 = _createForOfIteratorHelperLoose(children), _step2; !(_step2 = _iterator2()).done;) {
        var child = _step2.value;
        map.set(child, _item5);
        queue.push(child);
      }
    }
  }
  return map;
}

/**
 * Returns a Map that maps each item's "key", indicated by `getKey` function,
 * to its parent indicated by `getChildren` function
 *
 * NOTICE:
 * Using this function is discouraged.
 * Use {@link getParentMap} whenever possible.
 */
export function getKeyParentMap(items, getKey, getChildren) {
  var map = new Map();
  for (var queue = [].concat(items); queue.length > 0;) {
    var _item6 = queue.shift();
    var children = getChildren(_item6);
    if (children) {
      for (var _iterator3 = _createForOfIteratorHelperLoose(children), _step3; !(_step3 = _iterator3()).done;) {
        var child = _step3.value;
        map.set(getKey(child), _item6);
        queue.push(child);
      }
    }
  }
  return map;
}

/**
 * Returns an array indicating the hierarchy path from root towards `target` item
 */
export function getPathTowardsItem(target, getParent) {
  if (!target) return [];
  var path = [target];
  for (var parent = getParent(target); !!parent; parent = getParent(parent)) {
    path.unshift(parent);
  }
  return path;
}