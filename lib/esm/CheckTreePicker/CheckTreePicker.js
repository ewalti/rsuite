'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _isUndefined from "lodash/isUndefined";
import _cloneDeep from "lodash/cloneDeep";
import _omit from "lodash/omit";
import _isFunction from "lodash/isFunction";
import _pick from "lodash/pick";
import _isNil from "lodash/isNil";
import React, { useState, useEffect, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { List, AutoSizer } from '../internals/Windowing';
import CheckTreeNode from './CheckTreeNode';
import TreeContext from '../Tree/TreeContext';
import { getKeyParentMap, getPathTowardsItem, getTreeNodeIndent } from '../utils/treeUtils';
import { createChainedFunction, useCustom, useClassNames, useControlled, useEventCallback, KEY_VALUES, mergeRefs } from '../utils';
import { PickerToggle, TreeView, onMenuKeyDown as _onMenuKeyDown, PickerPopup, SelectedElement, PickerToggleTrigger, createConcatChildrenFunction, usePickerClassName, useToggleKeyDownEvent, usePickerRef, pickTriggerPropKeys, omitTriggerPropKeys, listPickerPropTypes } from '../internals/Picker';
import SearchBox from '../internals/SearchBox';
import { isEveryChildChecked, isSomeNodeHasChildren, isAllSiblingNodeUncheckable, isEveryFirstLevelNodeUncheckable, getFormattedTree, getDisabledState, getCheckTreePickerDefaultValue, getSelectedItems, isNodeUncheckable } from './utils';
import { hasVisibleChildren, getExpandWhenSearching, useTreeSearch, useTreeNodeRefs, getDefaultExpandItemValues, useFlattenTreeData, focusNextItem, getFocusableItems, focusPreviousItem, toggleExpand, getActiveItem, useGetTreeNodeChildren, focusToActiveTreeNode, focusTreeNode, leftArrowHandler, rightArrowHandler, isSearching } from '../utils/treeUtils';
import { oneOf } from '../internals/propTypes';
var emptyArray = [];
var itemSize = function itemSize() {
  return 36;
};

/**
 * The `CheckTreePicker` component is used for selecting multiple options which are organized in a tree structure.
 *
 * @see https://rsuitejs.com/components/check-tree-picker
 */
var CheckTreePicker = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    _props$data = props.data,
    data = _props$data === void 0 ? emptyArray : _props$data,
    style = props.style,
    _props$appearance = props.appearance,
    appearance = _props$appearance === void 0 ? 'default' : _props$appearance,
    _props$cleanable = props.cleanable,
    cleanable = _props$cleanable === void 0 ? true : _props$cleanable,
    _props$countable = props.countable,
    countable = _props$countable === void 0 ? true : _props$countable,
    searchBy = props.searchBy,
    toggleAs = props.toggleAs,
    searchKeyword = props.searchKeyword,
    showIndentLine = props.showIndentLine,
    overrideLocale = props.locale,
    _props$cascade = props.cascade,
    cascade = _props$cascade === void 0 ? true : _props$cascade,
    disabled = props.disabled,
    _props$valueKey = props.valueKey,
    valueKey = _props$valueKey === void 0 ? 'value' : _props$valueKey,
    _props$labelKey = props.labelKey,
    labelKey = _props$labelKey === void 0 ? 'label' : _props$labelKey,
    _props$placement = props.placement,
    placement = _props$placement === void 0 ? 'bottomStart' : _props$placement,
    _props$childrenKey = props.childrenKey,
    childrenKey = _props$childrenKey === void 0 ? 'children' : _props$childrenKey,
    placeholder = props.placeholder,
    controlledValue = props.value,
    _props$defaultValue = props.defaultValue,
    defaultValue = _props$defaultValue === void 0 ? emptyArray : _props$defaultValue,
    _props$defaultExpandA = props.defaultExpandAll,
    defaultExpandAll = _props$defaultExpandA === void 0 ? false : _props$defaultExpandA,
    _props$disabledItemVa = props.disabledItemValues,
    disabledItemValues = _props$disabledItemVa === void 0 ? emptyArray : _props$disabledItemVa,
    controlledExpandItemValues = props.expandItemValues,
    _props$defaultExpandI = props.defaultExpandItemValues,
    defaultExpandItemValues = _props$defaultExpandI === void 0 ? emptyArray : _props$defaultExpandI,
    _props$height = props.height,
    height = _props$height === void 0 ? 360 : _props$height,
    _props$menuMaxHeight = props.menuMaxHeight,
    menuMaxHeight = _props$menuMaxHeight === void 0 ? 320 : _props$menuMaxHeight,
    menuStyle = props.menuStyle,
    _props$searchable = props.searchable,
    searchable = _props$searchable === void 0 ? true : _props$searchable,
    _props$virtualized = props.virtualized,
    virtualized = _props$virtualized === void 0 ? false : _props$virtualized,
    className = props.className,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'picker' : _props$classPrefix,
    menuClassName = props.menuClassName,
    _props$menuAutoWidth = props.menuAutoWidth,
    menuAutoWidth = _props$menuAutoWidth === void 0 ? true : _props$menuAutoWidth,
    _props$uncheckableIte = props.uncheckableItemValues,
    uncheckableItemValues = _props$uncheckableIte === void 0 ? emptyArray : _props$uncheckableIte,
    id = props.id,
    listProps = props.listProps,
    renderMenu = props.renderMenu,
    getChildren = props.getChildren,
    renderExtraFooter = props.renderExtraFooter,
    onEntered = props.onEntered,
    onChange = props.onChange,
    onClean = props.onClean,
    onClose = props.onClose,
    onExited = props.onExited,
    onSearch = props.onSearch,
    onSelect = props.onSelect,
    onSelectItem = props.onSelectItem,
    onOpen = props.onOpen,
    onScroll = props.onScroll,
    onExpand = props.onExpand,
    renderValue = props.renderValue,
    renderTreeIcon = props.renderTreeIcon,
    renderTreeNode = props.renderTreeNode,
    rest = _objectWithoutPropertiesLoose(props, ["as", "data", "style", "appearance", "cleanable", "countable", "searchBy", "toggleAs", "searchKeyword", "showIndentLine", "locale", "cascade", "disabled", "valueKey", "labelKey", "placement", "childrenKey", "placeholder", "value", "defaultValue", "defaultExpandAll", "disabledItemValues", "expandItemValues", "defaultExpandItemValues", "height", "menuMaxHeight", "menuStyle", "searchable", "virtualized", "className", "classPrefix", "menuClassName", "menuAutoWidth", "uncheckableItemValues", "id", "listProps", "renderMenu", "getChildren", "renderExtraFooter", "onEntered", "onChange", "onClean", "onClose", "onExited", "onSearch", "onSelect", "onSelectItem", "onOpen", "onScroll", "onExpand", "renderValue", "renderTreeIcon", "renderTreeNode"]);
  var _useContext = useContext(TreeContext),
    inline = _useContext.inline;
  var _usePickerRef = usePickerRef(ref, {
      inline: inline
    }),
    trigger = _usePickerRef.trigger,
    root = _usePickerRef.root,
    target = _usePickerRef.target,
    overlay = _usePickerRef.overlay,
    list = _usePickerRef.list,
    searchInput = _usePickerRef.searchInput,
    treeView = _usePickerRef.treeView;
  var _useCustom = useCustom('Picker', overrideLocale),
    rtl = _useCustom.rtl,
    locale = _useCustom.locale;
  var _useState = useState(false),
    active = _useState[0],
    setActive = _useState[1];
  var _useState2 = useState(null),
    activeNode = _useState2[0],
    setActiveNode = _useState2[1];
  var _useClassNames = useClassNames(classPrefix),
    prefix = _useClassNames.prefix,
    merge = _useClassNames.merge;
  var _useClassNames2 = useClassNames('check-tree'),
    checkTreePrefix = _useClassNames2.prefix,
    withCheckTreeClassPrefix = _useClassNames2.withClassPrefix;
  var _useControlled = useControlled(controlledValue, defaultValue),
    value = _useControlled[0],
    setValue = _useControlled[1],
    isControlled = _useControlled[2];
  var _useGetTreeNodeChildr = useGetTreeNodeChildren(data, valueKey, childrenKey),
    treeData = _useGetTreeNodeChildr.data,
    setTreeData = _useGetTreeNodeChildr.setData,
    loadingNodeValues = _useGetTreeNodeChildr.loadingNodeValues,
    loadChildren = _useGetTreeNodeChildr.loadChildren;
  var _useControlled2 = useControlled(controlledExpandItemValues, getDefaultExpandItemValues(treeData, {
      defaultExpandAll: defaultExpandAll,
      valueKey: valueKey,
      childrenKey: childrenKey,
      defaultExpandItemValues: defaultExpandItemValues
    })),
    expandItemValues = _useControlled2[0],
    setExpandItemValues = _useControlled2[1];
  var _useState3 = useState(null),
    focusItemValue = _useState3[0],
    setFocusItemValue = _useState3[1];
  var _useFlattenTreeData = useFlattenTreeData({
      data: treeData,
      labelKey: labelKey,
      valueKey: valueKey,
      childrenKey: childrenKey,
      uncheckableItemValues: uncheckableItemValues,
      callback: function callback(nodes) {
        // after flattenData, always unSerialize check property value
        unSerializeList({
          nodes: nodes,
          key: 'check',
          value: value,
          cascade: cascade,
          uncheckableItemValues: uncheckableItemValues
        });
        forceUpdate();
      }
    }),
    flattenNodes = _useFlattenTreeData.flattenNodes,
    forceUpdate = _useFlattenTreeData.forceUpdate,
    formatVirtualizedTreeData = _useFlattenTreeData.formatVirtualizedTreeData,
    serializeListOnlyParent = _useFlattenTreeData.serializeListOnlyParent,
    unSerializeList = _useFlattenTreeData.unSerializeList;
  var _useTreeSearch = useTreeSearch({
      labelKey: labelKey,
      childrenKey: childrenKey,
      searchKeyword: searchKeyword,
      data: treeData,
      searchBy: searchBy,
      callback: function callback(searchKeyword, _filterData, event) {
        onSearch === null || onSearch === void 0 ? void 0 : onSearch(searchKeyword, event);
      }
    }),
    filteredData = _useTreeSearch.filteredData,
    searchKeywordState = _useTreeSearch.searchKeywordState,
    setSearchKeyword = _useTreeSearch.setSearchKeyword,
    handleSearch = _useTreeSearch.handleSearch,
    setFilteredData = _useTreeSearch.setFilteredData;
  var _useTreeNodeRefs = useTreeNodeRefs(),
    treeNodesRefs = _useTreeNodeRefs.treeNodesRefs,
    saveTreeNodeRef = _useTreeNodeRefs.saveTreeNodeRef;
  /**
   * get formatted nodes for render tree
   * @params render - renderNode function. only used when virtualized setting false
   */
  var getFormattedNodes = function getFormattedNodes(render) {
    if (virtualized) {
      return formatVirtualizedTreeData(flattenNodes, filteredData, expandItemValues, {
        cascade: cascade,
        searchKeyword: searchKeywordState
      }).filter(function (item) {
        return item.visible;
      });
    }
    return getFormattedTree(flattenNodes, filteredData, {
      childrenKey: childrenKey,
      cascade: cascade
    }).map(function (node) {
      return render === null || render === void 0 ? void 0 : render(node, 1);
    });
  };
  var getTreeNodeProps = function getTreeNodeProps(node, layer) {
    return {
      as: Component,
      rtl: rtl,
      value: node[valueKey],
      label: node[labelKey],
      layer: layer,
      focus: focusItemValue === node[valueKey],
      expand: node.expand,
      visible: node.visible,
      loading: loadingNodeValues.some(function (item) {
        return item === node[valueKey];
      }),
      disabled: getDisabledState(flattenNodes, node, {
        disabledItemValues: disabledItemValues,
        valueKey: valueKey
      }),
      nodeData: node,
      checkState: node.checkState,
      uncheckable: isNodeUncheckable(node, {
        uncheckableItemValues: uncheckableItemValues,
        valueKey: valueKey
      }),
      allUncheckable: isAllSiblingNodeUncheckable(node, flattenNodes, uncheckableItemValues, valueKey),
      onSelect: handleSelect,
      onExpand: handleExpand,
      renderTreeNode: renderTreeNode,
      renderTreeIcon: renderTreeIcon
    };
  };
  var focusActiveNode = function focusActiveNode() {
    if (list.current) {
      focusToActiveTreeNode({
        list: list.current,
        valueKey: valueKey,
        selector: "." + checkTreePrefix('node-active'),
        activeNode: activeNode,
        virtualized: virtualized,
        container: treeView.current,
        formattedNodes: getFormattedNodes()
      });
    }
  };
  useEffect(function () {
    setValue(getCheckTreePickerDefaultValue(value, uncheckableItemValues));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(function () {
    setFilteredData(data, searchKeywordState);
    setTreeData(data);
  }, [data, searchKeywordState, setFilteredData, setTreeData]);
  useEffect(function () {
    setFilteredData(treeData, searchKeywordState);
  }, [treeData, searchKeywordState, setFilteredData]);
  useEffect(function () {
    if (Array.isArray(controlledExpandItemValues)) {
      setExpandItemValues(controlledExpandItemValues);
    }
  }, [controlledExpandItemValues, setExpandItemValues]);
  useEffect(function () {
    setSearchKeyword(searchKeyword !== null && searchKeyword !== void 0 ? searchKeyword : '');
  }, [searchKeyword, setSearchKeyword]);
  useEffect(function () {
    unSerializeList({
      nodes: flattenNodes,
      key: 'check',
      value: value,
      cascade: cascade,
      uncheckableItemValues: uncheckableItemValues
    });
    forceUpdate();
  }, [cascade, value, uncheckableItemValues, unSerializeList, flattenNodes, forceUpdate]);
  var toggleUpChecked = useEventCallback(function (nodes, node, checked) {
    var currentNode = node.refKey ? nodes[node.refKey] : null;
    if (cascade && currentNode) {
      if (!checked) {
        currentNode.check = checked;
        currentNode.checkAll = checked;
      } else {
        if (isEveryChildChecked(nodes, currentNode)) {
          currentNode.check = true;
          currentNode.checkAll = true;
        } else {
          currentNode.check = false;
          currentNode.checkAll = false;
        }
      }
      if (currentNode.parent) {
        toggleUpChecked(nodes, currentNode.parent, checked);
      }
    }
  });
  var toggleDownChecked = useEventCallback(function (nodes, node, isChecked) {
    var currentNode = node.refKey ? nodes[node.refKey] : null;
    if (!currentNode) {
      return;
    }
    currentNode.check = isChecked;
    if (!currentNode[childrenKey] || !currentNode[childrenKey].length || !cascade) {
      currentNode.checkAll = false;
    } else {
      currentNode.checkAll = isChecked;
      currentNode[childrenKey].forEach(function (child) {
        toggleDownChecked(nodes, child, isChecked);
      });
    }
  });
  var toggleChecked = useEventCallback(function (node, isChecked) {
    var nodes = _cloneDeep(flattenNodes);
    toggleDownChecked(nodes, node, isChecked);
    node.parent && toggleUpChecked(nodes, node.parent, isChecked);
    var values = serializeListOnlyParent(nodes, 'check');
    // filter uncheckableItemValues
    return values.filter(function (v) {
      return !uncheckableItemValues.includes(v);
    });
  });

  // TODO-Doma
  // Replace `getKeyParentMap` with `getParentMap`
  var itemParentMap = useMemo(function () {
    return getKeyParentMap(data, function (node) {
      return node[valueKey];
    }, function (node) {
      return node[childrenKey];
    });
  }, [childrenKey, data, valueKey]);
  var handleSelect = useEventCallback(function (node, event) {
    var currentNode = node.refKey ? flattenNodes[node.refKey] : null;
    if (!node || !currentNode) {
      return;
    }
    var selectedValues = toggleChecked(node, !currentNode.check);
    if (!isControlled) {
      unSerializeList({
        nodes: flattenNodes,
        key: 'check',
        value: selectedValues,
        cascade: cascade,
        uncheckableItemValues: uncheckableItemValues
      });
      setValue(selectedValues);
    }
    setActiveNode(node);
    setFocusItemValue(node[valueKey]);
    onChange === null || onChange === void 0 ? void 0 : onChange(selectedValues, event);
    onSelect === null || onSelect === void 0 ? void 0 : onSelect(node, selectedValues, event);
    onSelectItem === null || onSelectItem === void 0 ? void 0 : onSelectItem(node, getPathTowardsItem(node, function (item) {
      return itemParentMap.get(item[valueKey]);
    }));
  });
  var handleOpen = useEventCallback(function () {
    var _trigger$current, _trigger$current$open;
    (_trigger$current = trigger.current) === null || _trigger$current === void 0 ? void 0 : (_trigger$current$open = _trigger$current.open) === null || _trigger$current$open === void 0 ? void 0 : _trigger$current$open.call(_trigger$current);
    setFocusItemValue(activeNode === null || activeNode === void 0 ? void 0 : activeNode[valueKey]);
    focusActiveNode();
    onOpen === null || onOpen === void 0 ? void 0 : onOpen();
    setActive(true);
  });
  var handleClose = useEventCallback(function () {
    var _trigger$current2, _trigger$current2$clo, _target$current;
    (_trigger$current2 = trigger.current) === null || _trigger$current2 === void 0 ? void 0 : (_trigger$current2$clo = _trigger$current2.close) === null || _trigger$current2$clo === void 0 ? void 0 : _trigger$current2$clo.call(_trigger$current2);
    setSearchKeyword('');
    onClose === null || onClose === void 0 ? void 0 : onClose();
    setFocusItemValue(null);
    setActive(false);

    /**
     * when using keyboard toggle picker, should refocus on PickerToggle Component after close picker menu
     */
    (_target$current = target.current) === null || _target$current === void 0 ? void 0 : _target$current.focus();
  });
  var handleExpand = useEventCallback(function (node) {
    var nextExpandItemValues = toggleExpand({
      node: node,
      isExpand: !node.expand,
      expandItemValues: expandItemValues,
      valueKey: valueKey
    });
    setExpandItemValues(nextExpandItemValues);
    onExpand === null || onExpand === void 0 ? void 0 : onExpand(nextExpandItemValues, node, createConcatChildrenFunction(node, node[valueKey], {
      valueKey: valueKey,
      childrenKey: childrenKey
    }));
    if (_isFunction(getChildren) && !node.expand && Array.isArray(node[childrenKey]) && node[childrenKey].length === 0) {
      loadChildren(node, getChildren);
    }
  });
  var handleClean = useEventCallback(function (event) {
    var target = event.target;
    // exclude searchbox
    if (target.matches('input[role="searchbox"]') || disabled || !cleanable) {
      return;
    }
    setActiveNode(null);
    setFocusItemValue(null);
    if (!isControlled) {
      setValue([]);
      unSerializeList({
        nodes: flattenNodes,
        key: 'check',
        value: [],
        cascade: cascade,
        uncheckableItemValues: uncheckableItemValues
      });
    }
    onChange === null || onChange === void 0 ? void 0 : onChange([], event);
  });
  var handleFocusItem = useEventCallback(function (key) {
    var focusableItems = getFocusableItems(filteredData, {
      disabledItemValues: disabledItemValues,
      valueKey: valueKey,
      childrenKey: childrenKey,
      expandItemValues: expandItemValues
    }, isSearching(searchKeywordState));
    var selector = "." + checkTreePrefix('node-label');
    var focusProps = {
      focusItemValue: focusItemValue,
      focusableItems: focusableItems,
      treeNodesRefs: treeNodesRefs,
      selector: selector,
      valueKey: valueKey,
      callback: function callback(nextFocusItemValue) {
        setFocusItemValue(nextFocusItemValue);
      }
    };
    if (key === KEY_VALUES.DOWN) {
      focusNextItem(focusProps);
      return;
    }
    if (key === KEY_VALUES.UP) {
      focusPreviousItem(focusProps);
    }
  });
  var handleLeftArrow = useEventCallback(function () {
    if (_isNil(focusItemValue)) return;
    var focusItem = getActiveItem(focusItemValue, flattenNodes, valueKey);
    leftArrowHandler({
      focusItem: focusItem,
      expand: expandItemValues.includes(focusItem === null || focusItem === void 0 ? void 0 : focusItem[valueKey]),
      onExpand: handleExpand,
      childrenKey: childrenKey,
      onFocusItem: function onFocusItem() {
        var _focusItem$parent, _focusItem$parent2;
        setFocusItemValue(focusItem === null || focusItem === void 0 ? void 0 : (_focusItem$parent = focusItem.parent) === null || _focusItem$parent === void 0 ? void 0 : _focusItem$parent[valueKey]);
        focusTreeNode(focusItem === null || focusItem === void 0 ? void 0 : (_focusItem$parent2 = focusItem.parent) === null || _focusItem$parent2 === void 0 ? void 0 : _focusItem$parent2.refKey, treeNodesRefs, "." + checkTreePrefix('node-label'));
      }
    });
  });
  var handleRightArrow = useEventCallback(function () {
    if (_isNil(focusItemValue)) return;
    var focusItem = getActiveItem(focusItemValue, flattenNodes, valueKey);
    rightArrowHandler({
      focusItem: focusItem,
      expand: expandItemValues.includes(focusItem === null || focusItem === void 0 ? void 0 : focusItem[valueKey]),
      childrenKey: childrenKey,
      onExpand: handleExpand,
      onFocusItem: function onFocusItem() {
        handleFocusItem(KEY_VALUES.DOWN);
      }
    });
  });
  var selectActiveItem = function selectActiveItem(event) {
    if (_isNil(focusItemValue)) return;
    var activeItem = getActiveItem(focusItemValue, flattenNodes, valueKey);
    if (!isNodeUncheckable(activeItem, {
      uncheckableItemValues: uncheckableItemValues,
      valueKey: valueKey
    }) && activeItem !== null) {
      handleSelect(activeItem, event);
    }
  };
  var onPickerKeydown = useToggleKeyDownEvent(_extends({
    toggle: !focusItemValue || !active,
    trigger: trigger,
    target: target,
    overlay: overlay,
    searchInput: searchInput,
    active: active,
    onExit: handleClean,
    onClose: handleClose,
    onMenuKeyDown: function onMenuKeyDown(event) {
      _onMenuKeyDown(event, {
        down: function down() {
          return handleFocusItem(KEY_VALUES.DOWN);
        },
        up: function up() {
          return handleFocusItem(KEY_VALUES.UP);
        },
        left: rtl ? handleRightArrow : handleLeftArrow,
        right: rtl ? handleLeftArrow : handleRightArrow,
        enter: selectActiveItem,
        del: handleClean
      });
    }
  }, rest));
  var handleTreeKeydown = useEventCallback(function (event) {
    if (!treeView.current) {
      return;
    }
    _onMenuKeyDown(event, {
      down: function down() {
        return handleFocusItem(KEY_VALUES.DOWN);
      },
      up: function up() {
        return handleFocusItem(KEY_VALUES.UP);
      },
      left: rtl ? handleRightArrow : handleLeftArrow,
      right: rtl ? handleLeftArrow : handleRightArrow,
      enter: selectActiveItem
    });
  });
  var renderNode = function renderNode(node, layer) {
    var visible = node.visible,
      refKey = node.refKey; // when searching, all nodes should be expand
    var expand = getExpandWhenSearching(searchKeywordState, expandItemValues.includes(node[valueKey]));
    if (!visible) {
      return null;
    }
    var children = node[childrenKey];
    var visibleChildren = _isUndefined(searchKeywordState) || searchKeywordState.length === 0 ? !!children : hasVisibleChildren(node, childrenKey);
    var nodeProps = _extends({}, getTreeNodeProps(_extends({}, node, {
      /**
       * spread operator don't copy unenumerable properties
       * so we need to copy them manually
       */
      parent: node.parent,
      expand: expand
    }), layer), {
      hasChildren: visibleChildren
    });
    if (nodeProps.hasChildren) {
      var _merge;
      layer += 1;
      var openClass = checkTreePrefix('open');
      var childrenClass = merge(checkTreePrefix('node-children'), (_merge = {}, _merge[openClass] = expand && visibleChildren, _merge));
      var nodes = children || [];
      return /*#__PURE__*/React.createElement("div", {
        className: childrenClass,
        key: node[valueKey]
      }, /*#__PURE__*/React.createElement(CheckTreeNode, _extends({}, nodeProps, {
        ref: function ref(_ref) {
          return saveTreeNodeRef(_ref, refKey);
        }
      })), /*#__PURE__*/React.createElement("div", {
        className: checkTreePrefix('group'),
        role: "group"
      }, nodes.map(function (child) {
        return renderNode(child, layer);
      }), showIndentLine && /*#__PURE__*/React.createElement("span", {
        className: checkTreePrefix('indent-line'),
        style: getTreeNodeIndent(rtl, layer - 1, true)
      })));
    }
    return /*#__PURE__*/React.createElement(CheckTreeNode, _extends({
      key: node[valueKey],
      ref: function ref(_ref2) {
        return saveTreeNodeRef(_ref2, refKey);
      }
    }, nodeProps));
  };
  var renderVirtualListNode = function renderVirtualListNode(_ref3) {
    var index = _ref3.index,
      style = _ref3.style,
      data = _ref3.data;
    var node = data[index];
    var layer = node.layer,
      refKey = node.refKey,
      visible = node.visible;
    var expand = getExpandWhenSearching(searchKeywordState, expandItemValues.includes(node[valueKey]));
    var nodeProps = _extends({}, getTreeNodeProps(_extends({}, node, {
      /**
       * spread operator don't copy unenumerable properties
       * so we need to copy them manually
       */
      parent: node.parent,
      expand: expand
    }), layer), {
      hasChildren: node.hasChildren
    });
    return visible && /*#__PURE__*/React.createElement(CheckTreeNode, _extends({
      style: style,
      ref: function ref(_ref4) {
        return saveTreeNodeRef(_ref4, refKey);
      }
    }, nodeProps));
  };
  var renderCheckTree = function renderCheckTree() {
    var _withCheckTreeClassPr, _merge2;
    var classes = withCheckTreeClassPrefix((_withCheckTreeClassPr = {}, _withCheckTreeClassPr[className !== null && className !== void 0 ? className : ''] = inline, _withCheckTreeClassPr['without-children'] = !isSomeNodeHasChildren(data, childrenKey), _withCheckTreeClassPr.virtualized = virtualized, _withCheckTreeClassPr));
    var formattedNodes = getFormattedNodes(renderNode);
    if (!formattedNodes.some(function (v) {
      return v !== null;
    })) {
      return /*#__PURE__*/React.createElement("div", {
        className: prefix('none')
      }, locale.noResultsText);
    }
    var treeNodesClass = merge(checkTreePrefix('root'), (_merge2 = {}, _merge2[checkTreePrefix('all-uncheckable')] = isEveryFirstLevelNodeUncheckable(flattenNodes, uncheckableItemValues, valueKey), _merge2));
    return /*#__PURE__*/React.createElement(TreeView, {
      ref: inline ? root : treeView,
      multiselectable: true,
      treeRootClassName: treeNodesClass,
      className: classes,
      style: inline ? _extends({
        height: height
      }, style) : {},
      onScroll: onScroll,
      onKeyDown: inline ? handleTreeKeydown : undefined
    }, virtualized ? /*#__PURE__*/React.createElement(AutoSizer, {
      defaultHeight: inline ? height : menuMaxHeight,
      style: {
        width: 'auto',
        height: 'auto'
      }
    }, function (_ref5) {
      var height = _ref5.height;
      return /*#__PURE__*/React.createElement(List, _extends({
        ref: list,
        height: height,
        itemSize: itemSize,
        itemCount: formattedNodes.length,
        itemData: formattedNodes
      }, listProps), renderVirtualListNode);
    }) : formattedNodes);
  };
  var renderDropdownMenu = function renderDropdownMenu(positionProps, speakerRef) {
    var left = positionProps.left,
      top = positionProps.top,
      className = positionProps.className;
    var classes = classNames(className, menuClassName, prefix('check-tree-menu'));
    var mergedMenuStyle = _extends({}, menuStyle, {
      left: left,
      top: top
    });
    return /*#__PURE__*/React.createElement(PickerPopup, {
      autoWidth: menuAutoWidth,
      className: classes,
      style: mergedMenuStyle,
      ref: mergeRefs(overlay, speakerRef),
      onKeyDown: onPickerKeydown,
      target: trigger
    }, searchable ? /*#__PURE__*/React.createElement(SearchBox, {
      placeholder: locale.searchPlaceholder,
      onChange: handleSearch,
      value: searchKeywordState,
      inputRef: searchInput
    }) : null, renderMenu ? renderMenu(renderCheckTree()) : renderCheckTree(), renderExtraFooter === null || renderExtraFooter === void 0 ? void 0 : renderExtraFooter());
  };
  var selectedItems = useMemo(function () {
    return getSelectedItems(flattenNodes, value);
  }, [flattenNodes, value]);
  /**
   * 1.Have a value and the value is valid.
   * 2.Regardless of whether the value is valid, as long as renderValue is set, it is judged to have a value.
   */
  var hasValidValue = selectedItems.length > 0 || value.length > 0 && _isFunction(renderValue);
  var selectedElement = placeholder;
  if (hasValidValue) {
    selectedElement = /*#__PURE__*/React.createElement(SelectedElement, {
      selectedItems: selectedItems,
      countable: countable,
      valueKey: valueKey,
      labelKey: labelKey,
      childrenKey: childrenKey,
      prefix: prefix,
      cascade: cascade,
      locale: locale
    });
    if (_isFunction(renderValue)) {
      selectedElement = renderValue(value, selectedItems, selectedElement);
      if (_isNil(selectedElement)) {
        hasValidValue = false;
      }
    }
  }
  var _usePickerClassName = usePickerClassName(_extends({}, props, {
      classPrefix: classPrefix,
      appearance: appearance,
      countable: countable,
      cleanable: cleanable,
      disabled: disabled,
      hasValue: hasValidValue,
      name: 'check-tree'
    })),
    classes = _usePickerClassName[0],
    usedClassNamePropKeys = _usePickerClassName[1];
  if (inline) {
    return renderCheckTree();
  }
  return /*#__PURE__*/React.createElement(PickerToggleTrigger, {
    id: id,
    popupType: "tree",
    multiple: true,
    pickerProps: _pick(props, pickTriggerPropKeys),
    ref: trigger,
    placement: placement,
    onEnter: handleOpen,
    onEntered: onEntered,
    onExited: createChainedFunction(handleClose, onExited),
    speaker: renderDropdownMenu
  }, /*#__PURE__*/React.createElement(Component, {
    className: classes,
    style: style,
    ref: root
  }, /*#__PURE__*/React.createElement(PickerToggle, _extends({}, _omit(rest, [].concat(omitTriggerPropKeys, usedClassNamePropKeys)), {
    ref: target,
    appearance: appearance,
    onKeyDown: onPickerKeydown,
    onClean: createChainedFunction(handleClean, onClean),
    cleanable: cleanable && !disabled,
    disabled: disabled,
    as: toggleAs,
    hasValue: hasValidValue,
    active: active,
    placement: placement,
    inputValue: value,
    focusItemValue: focusItemValue
  }), selectedElement || locale.placeholder)));
});
CheckTreePicker.displayName = 'CheckTreePicker';
CheckTreePicker.propTypes = _extends({}, listPickerPropTypes, {
  height: PropTypes.number,
  appearance: oneOf(['default', 'subtle']),
  locale: PropTypes.any,
  cascade: PropTypes.bool,
  countable: PropTypes.bool,
  searchable: PropTypes.bool,
  virtualized: PropTypes.bool,
  searchKeyword: PropTypes.string,
  menuAutoWidth: PropTypes.bool,
  defaultExpandAll: PropTypes.bool,
  containerPadding: PropTypes.number,
  disabledItemValues: PropTypes.array,
  expandItemValues: PropTypes.array,
  defaultExpandItemValues: PropTypes.array,
  uncheckableItemValues: PropTypes.array,
  onSearch: PropTypes.func,
  onExpand: PropTypes.func,
  onSelect: PropTypes.func,
  renderMenu: PropTypes.func,
  renderTreeNode: PropTypes.func,
  renderTreeIcon: PropTypes.func,
  searchBy: PropTypes.func,
  onScroll: PropTypes.func
});
export default CheckTreePicker;