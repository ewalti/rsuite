'use client';
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));
var _isNil2 = _interopRequireDefault(require("lodash/isNil"));
var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));
var _omit2 = _interopRequireDefault(require("lodash/omit"));
var _pick2 = _interopRequireDefault(require("lodash/pick"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Windowing = require("../internals/Windowing");
var _propTypes2 = require("../internals/propTypes");
var _TreeNode = _interopRequireDefault(require("./TreeNode"));
var _treeUtils = require("../utils/treeUtils");
var _utils = require("../utils");
var _Picker = require("../internals/Picker");
var _SearchBox = _interopRequireDefault(require("../internals/SearchBox"));
var _TreeContext = _interopRequireDefault(require("../Tree/TreeContext"));
var emptyArray = [];
var itemSize = function itemSize() {
  return 36;
};

/**
 * The `TreePicker` component is used for selecting single options which are organized in a tree structure.
 *
 * @see https://rsuitejs.com/components/tree-picker/
 */
var TreePicker = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    _props$data = props.data,
    data = _props$data === void 0 ? emptyArray : _props$data,
    _props$appearance = props.appearance,
    appearance = _props$appearance === void 0 ? 'default' : _props$appearance,
    style = props.style,
    showIndentLine = props.showIndentLine,
    controlledValue = props.value,
    overrideLocale = props.locale,
    _props$height = props.height,
    height = _props$height === void 0 ? 360 : _props$height,
    _props$menuMaxHeight = props.menuMaxHeight,
    menuMaxHeight = _props$menuMaxHeight === void 0 ? 320 : _props$menuMaxHeight,
    menuStyle = props.menuStyle,
    className = props.className,
    disabled = props.disabled,
    _props$placement = props.placement,
    placement = _props$placement === void 0 ? 'bottomStart' : _props$placement,
    _props$cleanable = props.cleanable,
    cleanable = _props$cleanable === void 0 ? true : _props$cleanable,
    _props$searchable = props.searchable,
    searchable = _props$searchable === void 0 ? true : _props$searchable,
    _props$virtualized = props.virtualized,
    virtualized = _props$virtualized === void 0 ? false : _props$virtualized,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'picker' : _props$classPrefix,
    defaultValue = props.defaultValue,
    placeholder = props.placeholder,
    searchKeyword = props.searchKeyword,
    menuClassName = props.menuClassName,
    _props$menuAutoWidth = props.menuAutoWidth,
    menuAutoWidth = _props$menuAutoWidth === void 0 ? true : _props$menuAutoWidth,
    searchBy = props.searchBy,
    toggleAs = props.toggleAs,
    _props$labelKey = props.labelKey,
    labelKey = _props$labelKey === void 0 ? 'label' : _props$labelKey,
    _props$valueKey = props.valueKey,
    valueKey = _props$valueKey === void 0 ? 'value' : _props$valueKey,
    _props$childrenKey = props.childrenKey,
    childrenKey = _props$childrenKey === void 0 ? 'children' : _props$childrenKey,
    draggable = props.draggable,
    _props$defaultExpandA = props.defaultExpandAll,
    defaultExpandAll = _props$defaultExpandA === void 0 ? false : _props$defaultExpandA,
    _props$disabledItemVa = props.disabledItemValues,
    disabledItemValues = _props$disabledItemVa === void 0 ? emptyArray : _props$disabledItemVa,
    controlledExpandItemValues = props.expandItemValues,
    _props$defaultExpandI = props.defaultExpandItemValues,
    defaultExpandItemValues = _props$defaultExpandI === void 0 ? emptyArray : _props$defaultExpandI,
    id = props.id,
    listProps = props.listProps,
    getChildren = props.getChildren,
    renderTreeIcon = props.renderTreeIcon,
    renderTreeNode = props.renderTreeNode,
    onExit = props.onExit,
    onExited = props.onExited,
    onClean = props.onClean,
    onOpen = props.onOpen,
    onSearch = props.onSearch,
    onSelect = props.onSelect,
    onSelectItem = props.onSelectItem,
    onChange = props.onChange,
    onEntered = props.onEntered,
    onClose = props.onClose,
    onDragEnd = props.onDragEnd,
    onDragStart = props.onDragStart,
    onDragEnter = props.onDragEnter,
    onDragLeave = props.onDragLeave,
    onDragOver = props.onDragOver,
    onDrop = props.onDrop,
    onExpand = props.onExpand,
    renderExtraFooter = props.renderExtraFooter,
    renderMenu = props.renderMenu,
    renderValue = props.renderValue,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, ["as", "data", "appearance", "style", "showIndentLine", "value", "locale", "height", "menuMaxHeight", "menuStyle", "className", "disabled", "placement", "cleanable", "searchable", "virtualized", "classPrefix", "defaultValue", "placeholder", "searchKeyword", "menuClassName", "menuAutoWidth", "searchBy", "toggleAs", "labelKey", "valueKey", "childrenKey", "draggable", "defaultExpandAll", "disabledItemValues", "expandItemValues", "defaultExpandItemValues", "id", "listProps", "getChildren", "renderTreeIcon", "renderTreeNode", "onExit", "onExited", "onClean", "onOpen", "onSearch", "onSelect", "onSelectItem", "onChange", "onEntered", "onClose", "onDragEnd", "onDragStart", "onDragEnter", "onDragLeave", "onDragOver", "onDrop", "onExpand", "renderExtraFooter", "renderMenu", "renderValue"]);
  var _useCustom = (0, _utils.useCustom)('Picker', overrideLocale),
    rtl = _useCustom.rtl,
    locale = _useCustom.locale;
  var _useContext = (0, _react.useContext)(_TreeContext.default),
    inline = _useContext.inline;
  var _usePickerRef = (0, _Picker.usePickerRef)(ref, {
      inline: inline
    }),
    trigger = _usePickerRef.trigger,
    root = _usePickerRef.root,
    target = _usePickerRef.target,
    overlay = _usePickerRef.overlay,
    list = _usePickerRef.list,
    searchInput = _usePickerRef.searchInput,
    treeView = _usePickerRef.treeView;
  var _useControlled = (0, _utils.useControlled)(controlledValue, defaultValue),
    value = _useControlled[0],
    setValue = _useControlled[1],
    isControlled = _useControlled[2];
  var _useGetTreeNodeChildr = (0, _treeUtils.useGetTreeNodeChildren)(data, valueKey, childrenKey),
    treeData = _useGetTreeNodeChildr.data,
    setTreeData = _useGetTreeNodeChildr.setData,
    loadingNodeValues = _useGetTreeNodeChildr.loadingNodeValues,
    loadChildren = _useGetTreeNodeChildr.loadChildren;
  var _useControlled2 = (0, _utils.useControlled)(controlledExpandItemValues, (0, _treeUtils.getDefaultExpandItemValues)(treeData, {
      defaultExpandAll: defaultExpandAll,
      valueKey: valueKey,
      childrenKey: childrenKey,
      defaultExpandItemValues: defaultExpandItemValues
    })),
    expandItemValues = _useControlled2[0],
    setExpandItemValues = _useControlled2[1];
  var _useState = (0, _react.useState)(false),
    active = _useState[0],
    setActive = _useState[1];
  var _useState2 = (0, _react.useState)(null),
    focusItemValue = _useState2[0],
    setFocusItemValue = _useState2[1];
  var _useFlattenTreeData = (0, _treeUtils.useFlattenTreeData)({
      data: treeData,
      labelKey: labelKey,
      valueKey: valueKey,
      childrenKey: childrenKey,
      callback: function callback() {
        // after flattenData, always trigger re-render
        forceUpdate();
      }
    }),
    flattenNodes = _useFlattenTreeData.flattenNodes,
    forceUpdate = _useFlattenTreeData.forceUpdate,
    formatVirtualizedTreeData = _useFlattenTreeData.formatVirtualizedTreeData;
  var _useClassNames = (0, _utils.useClassNames)(classPrefix),
    prefix = _useClassNames.prefix,
    merge = _useClassNames.merge;
  var _useClassNames2 = (0, _utils.useClassNames)('tree'),
    treePrefix = _useClassNames2.prefix,
    withTreeClassPrefix = _useClassNames2.withClassPrefix;
  var _useTreeSearch = (0, _treeUtils.useTreeSearch)({
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
  var _useTreeDrag = (0, _treeUtils.useTreeDrag)(),
    dragNodeKeys = _useTreeDrag.dragNodeKeys,
    dragOverNodeKey = _useTreeDrag.dragOverNodeKey,
    dragNode = _useTreeDrag.dragNode,
    dropNodePosition = _useTreeDrag.dropNodePosition,
    setDragNodeKeys = _useTreeDrag.setDragNodeKeys,
    setDragOverNodeKey = _useTreeDrag.setDragOverNodeKey,
    setDragNode = _useTreeDrag.setDragNode,
    setDropNodePosition = _useTreeDrag.setDropNodePosition;
  var _useTreeNodeRefs = (0, _treeUtils.useTreeNodeRefs)(),
    treeNodesRefs = _useTreeNodeRefs.treeNodesRefs,
    saveTreeNodeRef = _useTreeNodeRefs.saveTreeNodeRef;
  var activeNode = (0, _treeUtils.getTreeActiveNode)(flattenNodes, value, valueKey);
  var getFormattedNodes = function getFormattedNodes(render) {
    if (virtualized) {
      return formatVirtualizedTreeData(flattenNodes, filteredData, expandItemValues, {
        searchKeyword: searchKeywordState
      }).filter(function (n) {
        return n.visible;
      });
    }
    return filteredData.map(function (dataItem, index) {
      return render === null || render === void 0 ? void 0 : render(dataItem, index, 1);
    });
  };
  var focusActiveNode = function focusActiveNode() {
    if (list.current) {
      (0, _treeUtils.focusToActiveTreeNode)({
        list: list.current,
        valueKey: valueKey,
        selector: "." + treePrefix('node-active'),
        activeNode: activeNode,
        virtualized: virtualized,
        container: treeView.current,
        formattedNodes: getFormattedNodes()
      });
    }
  };
  (0, _react.useEffect)(function () {
    setFilteredData(data, searchKeywordState);
    setTreeData(data);
  }, [data, searchKeywordState, setFilteredData, setTreeData]);
  (0, _react.useEffect)(function () {
    setFilteredData(treeData, searchKeywordState);
  }, [treeData, searchKeywordState, setFilteredData]);
  (0, _react.useEffect)(function () {
    if (Array.isArray(controlledExpandItemValues)) {
      setExpandItemValues(controlledExpandItemValues);
    }
  }, [controlledExpandItemValues, setExpandItemValues]);
  (0, _react.useEffect)(function () {
    setSearchKeyword(searchKeyword !== null && searchKeyword !== void 0 ? searchKeyword : '');
  }, [searchKeyword, setSearchKeyword]);
  var getDropData = function getDropData(nodeData) {
    var options = {
      valueKey: valueKey,
      childrenKey: childrenKey
    };
    return {
      /** draggingNode */
      dragNode: dragNode,
      /** dropNode */
      dropNode: nodeData,
      /** dragAndDrop Position type */
      dropNodePosition: dropNodePosition,
      createUpdateDataFunction: (0, _treeUtils.createUpdateTreeDataFunction)({
        dragNode: dragNode,
        dropNode: nodeData,
        dropNodePosition: dropNodePosition
      }, options)
    };
  };
  var getTreeNodeProps = function getTreeNodeProps(node, layer, index) {
    var draggingNode = dragNode !== null && dragNode !== void 0 ? dragNode : {};
    return {
      as: Component,
      rtl: rtl,
      value: node[valueKey],
      label: node[labelKey],
      index: index,
      layer: layer,
      loading: loadingNodeValues.some(function (item) {
        return (0, _utils.shallowEqual)(item, node[valueKey]);
      }),
      expand: node.expand,
      active: (0, _utils.shallowEqual)(node[valueKey], value),
      focus: (0, _utils.shallowEqual)(node[valueKey], focusItemValue),
      visible: node.visible,
      draggable: draggable,
      dragging: (0, _utils.shallowEqual)(node[valueKey], draggingNode[valueKey]),
      children: node[childrenKey],
      nodeData: node,
      disabled: disabledItemValues.some(function (disabledItem) {
        return (0, _utils.shallowEqual)(disabledItem, node[valueKey]);
      }),
      dragOver: (0, _utils.shallowEqual)(node[valueKey], dragOverNodeKey) && dropNodePosition === _utils.TREE_NODE_DROP_POSITION.DRAG_OVER,
      dragOverTop: (0, _utils.shallowEqual)(node[valueKey], dragOverNodeKey) && dropNodePosition === _utils.TREE_NODE_DROP_POSITION.DRAG_OVER_TOP,
      dragOverBottom: (0, _utils.shallowEqual)(node[valueKey], dragOverNodeKey) && dropNodePosition === _utils.TREE_NODE_DROP_POSITION.DRAG_OVER_BOTTOM,
      onSelect: handleSelect,
      onDragStart: handleDragStart,
      onDragEnter: handleDragEnter,
      onDragOver: handleDragOver,
      onDragLeave: handleDragLeave,
      onDragEnd: handleDragEnd,
      onDrop: handleDrop,
      onExpand: handleExpand,
      renderTreeNode: renderTreeNode,
      renderTreeIcon: renderTreeIcon
    };
  };

  // TODO-Doma
  // Replace `getKeyParentMap` with `getParentMap`
  var itemParentMap = (0, _react.useMemo)(function () {
    return (0, _treeUtils.getKeyParentMap)(data, function (node) {
      return node[valueKey];
    }, function (node) {
      return node[childrenKey];
    });
  }, [childrenKey, data, valueKey]);
  var handleSelect = (0, _utils.useEventCallback)(function (nodeData, event) {
    var _target$current, _trigger$current, _trigger$current$clos;
    if (!nodeData) {
      return;
    }
    var nodeValue = nodeData[valueKey];
    if (!isControlled) {
      setValue(nodeValue);
    }
    setFocusItemValue(nodeData[valueKey]);
    onChange === null || onChange === void 0 ? void 0 : onChange(nodeValue, event);
    onSelect === null || onSelect === void 0 ? void 0 : onSelect(nodeData, nodeValue, event);
    onSelectItem === null || onSelectItem === void 0 ? void 0 : onSelectItem(nodeData, (0, _treeUtils.getPathTowardsItem)(nodeData, function (item) {
      return itemParentMap.get(item[valueKey]);
    }));
    (_target$current = target.current) === null || _target$current === void 0 ? void 0 : _target$current.focus();
    (_trigger$current = trigger.current) === null || _trigger$current === void 0 ? void 0 : (_trigger$current$clos = _trigger$current.close) === null || _trigger$current$clos === void 0 ? void 0 : _trigger$current$clos.call(_trigger$current);
  });
  var handleExpand = (0, _utils.useEventCallback)(function (node) {
    var nextExpandItemValues = (0, _treeUtils.toggleExpand)({
      node: node,
      isExpand: !node.expand,
      expandItemValues: expandItemValues,
      valueKey: valueKey
    });
    setExpandItemValues(nextExpandItemValues);
    onExpand === null || onExpand === void 0 ? void 0 : onExpand(nextExpandItemValues, node, (0, _Picker.createConcatChildrenFunction)(node, node[valueKey], {
      valueKey: valueKey,
      childrenKey: childrenKey
    }));
    if ((0, _isFunction2.default)(getChildren) && !node.expand && Array.isArray(node[childrenKey]) && node[childrenKey].length === 0) {
      loadChildren(node, getChildren);
    }
  });
  var handleDragStart = (0, _utils.useEventCallback)(function (nodeData, event) {
    if (draggable) {
      var _event$dataTransfer;
      var dragMoverNode = (0, _treeUtils.createDragPreview)((0, _treeUtils.stringifyTreeNodeLabel)(nodeData[labelKey]), treePrefix('drag-preview'));
      (_event$dataTransfer = event.dataTransfer) === null || _event$dataTransfer === void 0 ? void 0 : _event$dataTransfer.setDragImage(dragMoverNode, 0, 0);
      setDragNodeKeys((0, _treeUtils.getDragNodeKeys)(nodeData, childrenKey, valueKey));
      setDragNode(flattenNodes[nodeData.refKey]);
      onDragStart === null || onDragStart === void 0 ? void 0 : onDragStart(nodeData, event);
    }
  });
  var handleDragEnter = (0, _utils.useEventCallback)(function (nodeData, event) {
    if (dragNodeKeys.some(function (d) {
      return (0, _utils.shallowEqual)(d, nodeData[valueKey]);
    })) {
      return;
    }
    if (dragNode) {
      setDragOverNodeKey(nodeData[valueKey]);
      setDropNodePosition((0, _treeUtils.calDropNodePosition)(event, treeNodesRefs[nodeData.refKey]));
    }
    onDragEnter === null || onDragEnter === void 0 ? void 0 : onDragEnter(nodeData, event);
  });
  var handleDragOver = (0, _utils.useEventCallback)(function (nodeData, event) {
    if (dragNodeKeys.some(function (d) {
      return (0, _utils.shallowEqual)(d, nodeData[valueKey]);
    })) {
      event.dataTransfer.dropEffect = 'none';
      return;
    }
    if (dragNode && (0, _utils.shallowEqual)(nodeData[valueKey], dragOverNodeKey)) {
      var lastDropNodePosition = (0, _treeUtils.calDropNodePosition)(event, treeNodesRefs[nodeData.refKey]);
      if (lastDropNodePosition === dropNodePosition) return;
      setDropNodePosition(lastDropNodePosition);
    }
    onDragOver === null || onDragOver === void 0 ? void 0 : onDragOver(nodeData, event);
  });
  var handleDragLeave = (0, _utils.useEventCallback)(function (nodeData, event) {
    onDragLeave === null || onDragLeave === void 0 ? void 0 : onDragLeave(nodeData, event);
  });
  var handleDragEnd = (0, _utils.useEventCallback)(function (nodeData, event) {
    (0, _treeUtils.removeDragPreview)();
    setDragNode(null);
    setDragNodeKeys([]);
    setDragOverNodeKey(null);
    onDragEnd === null || onDragEnd === void 0 ? void 0 : onDragEnd(nodeData, event);
  });
  var handleDrop = (0, _utils.useEventCallback)(function (nodeData, event) {
    if (dragNodeKeys.some(function (d) {
      return (0, _utils.shallowEqual)(d, nodeData[valueKey]);
    })) {
      console.error('Cannot drag a node to itself and its children');
    } else {
      var dropData = getDropData(nodeData);
      onDrop === null || onDrop === void 0 ? void 0 : onDrop(dropData, event);
    }
    (0, _treeUtils.removeDragPreview)();
    setDragNode(null);
    setDragNodeKeys([]);
    setDragOverNodeKey(null);
  });
  var handleOpen = (0, _utils.useEventCallback)(function () {
    var _trigger$current2, _trigger$current2$ope;
    (_trigger$current2 = trigger.current) === null || _trigger$current2 === void 0 ? void 0 : (_trigger$current2$ope = _trigger$current2.open) === null || _trigger$current2$ope === void 0 ? void 0 : _trigger$current2$ope.call(_trigger$current2);
    focusActiveNode();
    onOpen === null || onOpen === void 0 ? void 0 : onOpen();
    setActive(true);
  });
  var handleClose = (0, _utils.useEventCallback)(function () {
    var _trigger$current3, _trigger$current3$clo, _target$current2;
    (_trigger$current3 = trigger.current) === null || _trigger$current3 === void 0 ? void 0 : (_trigger$current3$clo = _trigger$current3.close) === null || _trigger$current3$clo === void 0 ? void 0 : _trigger$current3$clo.call(_trigger$current3);
    setSearchKeyword('');
    setActive(false);
    setFocusItemValue(activeNode === null || activeNode === void 0 ? void 0 : activeNode[valueKey]);
    /**
     * when using keyboard toggle picker, should refocus on PickerToggle Component after close picker menu
     */
    (_target$current2 = target.current) === null || _target$current2 === void 0 ? void 0 : _target$current2.focus();
  });
  var handleFocusItem = (0, _utils.useEventCallback)(function (key) {
    var focusableItems = (0, _treeUtils.getFocusableItems)(filteredData, {
      disabledItemValues: disabledItemValues,
      valueKey: valueKey,
      childrenKey: childrenKey,
      expandItemValues: expandItemValues
    }, (0, _treeUtils.isSearching)(searchKeywordState));
    var selector = "." + treePrefix('node-label');
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
    if (key === _utils.KEY_VALUES.DOWN) {
      (0, _treeUtils.focusNextItem)(focusProps);
      return;
    }
    if (key === _utils.KEY_VALUES.UP) {
      (0, _treeUtils.focusPreviousItem)(focusProps);
    }
  });
  var handleLeftArrow = (0, _utils.useEventCallback)(function () {
    if ((0, _isNil2.default)(focusItemValue)) return;
    var focusItem = (0, _treeUtils.getActiveItem)(focusItemValue, flattenNodes, valueKey);
    (0, _treeUtils.leftArrowHandler)({
      focusItem: focusItem,
      expand: expandItemValues.includes(focusItem === null || focusItem === void 0 ? void 0 : focusItem[valueKey]),
      onExpand: handleExpand,
      childrenKey: childrenKey,
      onFocusItem: function onFocusItem() {
        var _focusItem$parent, _focusItem$parent2;
        setFocusItemValue(focusItem === null || focusItem === void 0 ? void 0 : (_focusItem$parent = focusItem.parent) === null || _focusItem$parent === void 0 ? void 0 : _focusItem$parent[valueKey]);
        (0, _treeUtils.focusTreeNode)(focusItem === null || focusItem === void 0 ? void 0 : (_focusItem$parent2 = focusItem.parent) === null || _focusItem$parent2 === void 0 ? void 0 : _focusItem$parent2.refKey, treeNodesRefs, "." + treePrefix('node-label'));
      }
    });
  });
  var handleRightArrow = (0, _utils.useEventCallback)(function () {
    if ((0, _isNil2.default)(focusItemValue)) return;
    var focusItem = (0, _treeUtils.getActiveItem)(focusItemValue, flattenNodes, valueKey);
    (0, _treeUtils.rightArrowHandler)({
      focusItem: focusItem,
      expand: expandItemValues.includes(focusItem === null || focusItem === void 0 ? void 0 : focusItem[valueKey]),
      childrenKey: childrenKey,
      onExpand: handleExpand,
      onFocusItem: function onFocusItem() {
        handleFocusItem(_utils.KEY_VALUES.DOWN);
      }
    });
  });
  var selectActiveItem = (0, _utils.useEventCallback)(function (event) {
    if ((0, _isNil2.default)(focusItemValue)) return;
    var activeItem = (0, _treeUtils.getActiveItem)(focusItemValue, flattenNodes, valueKey);
    handleSelect(activeItem, event);
  });
  var handleClean = (0, _utils.useEventCallback)(function (event) {
    var nullValue = null;
    var target = event.target;
    // exclude searchbox
    if (target.matches('input[role="searchbox"]') || disabled || !cleanable) {
      return;
    }
    if (!isControlled) {
      setValue(null);
    }
    onChange === null || onChange === void 0 ? void 0 : onChange(nullValue, event);
  });
  var onPickerKeydown = (0, _Picker.useToggleKeyDownEvent)((0, _extends2.default)({
    toggle: !activeNode || !active,
    trigger: trigger,
    target: target,
    overlay: overlay,
    searchInput: searchInput,
    active: active,
    onExit: handleClean,
    onClose: handleClose,
    onMenuKeyDown: function onMenuKeyDown(event) {
      (0, _Picker.onMenuKeyDown)(event, {
        down: function down() {
          return handleFocusItem(_utils.KEY_VALUES.DOWN);
        },
        up: function up() {
          return handleFocusItem(_utils.KEY_VALUES.UP);
        },
        left: rtl ? handleRightArrow : handleLeftArrow,
        right: rtl ? handleLeftArrow : handleRightArrow,
        enter: selectActiveItem,
        del: handleClean
      });
    }
  }, rest));
  var handleTreeKeyDown = (0, _utils.useEventCallback)(function (event) {
    if (!treeView.current) {
      return;
    }
    (0, _Picker.onMenuKeyDown)(event, {
      down: function down() {
        return handleFocusItem(_utils.KEY_VALUES.DOWN);
      },
      up: function up() {
        return handleFocusItem(_utils.KEY_VALUES.UP);
      },
      left: rtl ? handleRightArrow : handleLeftArrow,
      right: rtl ? handleLeftArrow : handleRightArrow,
      enter: selectActiveItem
    });
  });
  var renderNode = function renderNode(node, index, layer) {
    if (!node.visible) {
      return null;
    }
    var children = node[childrenKey];
    var expand = (0, _treeUtils.getExpandWhenSearching)(searchKeywordState, expandItemValues.includes(node[valueKey]));
    var visibleChildren = (0, _isUndefined2.default)(searchKeywordState) || searchKeywordState.length === 0 ? !!children : (0, _treeUtils.hasVisibleChildren)(node, childrenKey);
    var nodeProps = (0, _extends2.default)({}, getTreeNodeProps((0, _extends2.default)({}, node, {
      expand: expand
    }), layer, index), {
      hasChildren: visibleChildren
    });
    if (nodeProps.hasChildren) {
      var _merge;
      layer += 1;
      var openClass = treePrefix('open');
      var childrenClass = merge(treePrefix('node-children'), (_merge = {}, _merge[openClass] = expand && visibleChildren, _merge));
      var nodes = children || [];
      return /*#__PURE__*/_react.default.createElement("div", {
        className: childrenClass,
        key: node[valueKey]
      }, /*#__PURE__*/_react.default.createElement(_TreeNode.default, (0, _extends2.default)({}, nodeProps, {
        ref: function ref(_ref) {
          return saveTreeNodeRef(_ref, node.refKey);
        }
      })), /*#__PURE__*/_react.default.createElement("div", {
        className: treePrefix('group'),
        role: "group"
      }, nodes.map(function (child, i) {
        return renderNode(child, i, layer);
      }), showIndentLine && /*#__PURE__*/_react.default.createElement("span", {
        className: treePrefix('indent-line'),
        style: (0, _treeUtils.getTreeNodeIndent)(rtl, layer - 1, true)
      })));
    }
    return /*#__PURE__*/_react.default.createElement(_TreeNode.default, (0, _extends2.default)({
      ref: function ref(_ref2) {
        return saveTreeNodeRef(_ref2, node.refKey);
      },
      key: node[valueKey]
    }, nodeProps));
  };
  var renderVirtualListNode = function renderVirtualListNode(_ref3) {
    var index = _ref3.index,
      style = _ref3.style,
      data = _ref3.data;
    var node = data[index];
    var layer = node.layer,
      visible = node.visible;
    var expand = (0, _treeUtils.getExpandWhenSearching)(searchKeywordState, expandItemValues.includes(node[valueKey]));
    if (!node.visible) {
      return null;
    }
    var nodeProps = (0, _extends2.default)({}, getTreeNodeProps((0, _extends2.default)({}, node, {
      expand: expand
    }), layer), {
      style: style,
      hasChildren: node.hasChildren
    });
    return visible && /*#__PURE__*/_react.default.createElement(_TreeNode.default, (0, _extends2.default)({
      ref: function ref(_ref4) {
        return saveTreeNodeRef(_ref4, node.refKey);
      }
    }, nodeProps));
  };
  var renderTree = function renderTree() {
    var _withTreeClassPrefix;
    var classes = withTreeClassPrefix((_withTreeClassPrefix = {}, _withTreeClassPrefix[className !== null && className !== void 0 ? className : ''] = inline, _withTreeClassPrefix.virtualized = virtualized, _withTreeClassPrefix));
    var formattedNodes = getFormattedNodes(renderNode);
    return /*#__PURE__*/_react.default.createElement(_Picker.TreeView, {
      treeRootClassName: treePrefix('root'),
      ref: inline ? root : treeView,
      className: classes,
      style: inline ? (0, _extends2.default)({
        height: height
      }, style) : {},
      onKeyDown: inline ? handleTreeKeyDown : undefined
    }, virtualized ? /*#__PURE__*/_react.default.createElement(_Windowing.AutoSizer, {
      defaultHeight: inline ? height : menuMaxHeight,
      style: {
        width: 'auto',
        height: 'auto'
      }
    }, function (_ref5) {
      var height = _ref5.height;
      return /*#__PURE__*/_react.default.createElement(_Windowing.List, (0, _extends2.default)({
        ref: list,
        height: height,
        itemSize: itemSize,
        itemCount: formattedNodes.length,
        itemData: formattedNodes
      }, listProps), renderVirtualListNode);
    }) : formattedNodes);
  };
  var renderTreeView = function renderTreeView(positionProps, speakerRef) {
    var left = positionProps.left,
      top = positionProps.top,
      className = positionProps.className;
    var classes = merge(className, menuClassName, prefix('tree-menu'));
    var mergedMenuStyle = (0, _extends2.default)({}, menuStyle, {
      left: left,
      top: top
    });
    return /*#__PURE__*/_react.default.createElement(_Picker.PickerPopup, {
      autoWidth: menuAutoWidth,
      className: classes,
      style: mergedMenuStyle,
      ref: (0, _utils.mergeRefs)(overlay, speakerRef),
      onKeyDown: onPickerKeydown,
      target: trigger
    }, searchable ? /*#__PURE__*/_react.default.createElement(_SearchBox.default, {
      placeholder: locale.searchPlaceholder,
      onChange: handleSearch,
      value: searchKeywordState,
      inputRef: searchInput
    }) : null, renderMenu ? renderMenu(renderTree()) : renderTree(), renderExtraFooter === null || renderExtraFooter === void 0 ? void 0 : renderExtraFooter());
  };

  /**
   * 1.Have a value and the value is valid.
   * 2.Regardless of whether the value is valid, as long as renderValue is set, it is judged to have a value.
   */
  var hasValidValue = !(0, _isNil2.default)(activeNode) || !(0, _isNil2.default)(value) && (0, _isFunction2.default)(renderValue);
  var selectedElement = placeholder;
  if (hasValidValue) {
    var node = activeNode !== null && activeNode !== void 0 ? activeNode : {};
    selectedElement = node[labelKey];
    if ((0, _isFunction2.default)(renderValue) && value) {
      selectedElement = renderValue(value, node, selectedElement);
      if ((0, _isNil2.default)(selectedElement)) {
        hasValidValue = false;
      }
    }
  }
  var _usePickerClassName = (0, _Picker.usePickerClassName)((0, _extends2.default)({}, props, {
      classPrefix: classPrefix,
      appearance: appearance,
      hasValue: hasValidValue,
      name: 'tree',
      cleanable: cleanable
    })),
    classes = _usePickerClassName[0],
    usedClassNamePropKeys = _usePickerClassName[1];
  if (inline) {
    return renderTree();
  }
  return /*#__PURE__*/_react.default.createElement(_Picker.PickerToggleTrigger, {
    id: id,
    popupType: "tree",
    pickerProps: (0, _pick2.default)(props, _Picker.pickTriggerPropKeys),
    ref: trigger,
    placement: placement,
    onEnter: handleOpen,
    onEntered: onEntered,
    onExit: (0, _utils.createChainedFunction)(onClose, onExit),
    onExited: (0, _utils.createChainedFunction)(handleClose, onExited),
    speaker: renderTreeView
  }, /*#__PURE__*/_react.default.createElement(Component, {
    className: classes,
    style: style,
    ref: root
  }, /*#__PURE__*/_react.default.createElement(_Picker.PickerToggle, (0, _extends2.default)({}, (0, _omit2.default)(rest, [].concat(_Picker.omitTriggerPropKeys, usedClassNamePropKeys, ['cascade'])), {
    ref: target,
    appearance: appearance,
    onKeyDown: onPickerKeydown,
    onClean: (0, _utils.createChainedFunction)(handleClean, onClean),
    cleanable: cleanable && !disabled,
    as: toggleAs,
    disabled: disabled,
    hasValue: hasValidValue,
    active: active,
    placement: placement,
    inputValue: value,
    focusItemValue: focusItemValue
  }), selectedElement || locale.placeholder)));
});
TreePicker.displayName = 'TreePicker';
TreePicker.propTypes = (0, _extends2.default)({}, _Picker.listPickerPropTypes, {
  locale: _propTypes.default.any,
  appearance: (0, _propTypes2.oneOf)(['default', 'subtle']),
  height: _propTypes.default.number,
  draggable: _propTypes.default.bool,
  virtualized: _propTypes.default.bool,
  searchable: _propTypes.default.bool,
  menuAutoWidth: _propTypes.default.bool,
  searchKeyword: _propTypes.default.string,
  defaultExpandAll: _propTypes.default.bool,
  expandItemValues: _propTypes.default.array,
  defaultExpandItemValues: _propTypes.default.array,
  onSearch: _propTypes.default.func,
  onExpand: _propTypes.default.func,
  onSelect: _propTypes.default.func,
  renderMenu: _propTypes.default.func,
  renderTreeNode: _propTypes.default.func,
  renderTreeIcon: _propTypes.default.func,
  renderExtraFooter: _propTypes.default.func,
  renderDragNode: _propTypes.default.func,
  searchBy: _propTypes.default.func
});
var _default = TreePicker;
exports.default = _default;