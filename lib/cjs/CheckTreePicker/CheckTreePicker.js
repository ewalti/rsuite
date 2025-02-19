'use client';
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));
var _cloneDeep2 = _interopRequireDefault(require("lodash/cloneDeep"));
var _omit2 = _interopRequireDefault(require("lodash/omit"));
var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));
var _pick2 = _interopRequireDefault(require("lodash/pick"));
var _isNil2 = _interopRequireDefault(require("lodash/isNil"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _Windowing = require("../internals/Windowing");
var _CheckTreeNode = _interopRequireDefault(require("./CheckTreeNode"));
var _TreeContext = _interopRequireDefault(require("../Tree/TreeContext"));
var _treeUtils = require("../utils/treeUtils");
var _utils = require("../utils");
var _Picker = require("../internals/Picker");
var _SearchBox = _interopRequireDefault(require("../internals/SearchBox"));
var _utils2 = require("./utils");
var _propTypes2 = require("../internals/propTypes");
var emptyArray = [];
var itemSize = function itemSize() {
  return 36;
};

/**
 * The `CheckTreePicker` component is used for selecting multiple options which are organized in a tree structure.
 *
 * @see https://rsuitejs.com/components/check-tree-picker
 */
var CheckTreePicker = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
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
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, ["as", "data", "style", "appearance", "cleanable", "countable", "searchBy", "toggleAs", "searchKeyword", "showIndentLine", "locale", "cascade", "disabled", "valueKey", "labelKey", "placement", "childrenKey", "placeholder", "value", "defaultValue", "defaultExpandAll", "disabledItemValues", "expandItemValues", "defaultExpandItemValues", "height", "menuMaxHeight", "menuStyle", "searchable", "virtualized", "className", "classPrefix", "menuClassName", "menuAutoWidth", "uncheckableItemValues", "id", "listProps", "renderMenu", "getChildren", "renderExtraFooter", "onEntered", "onChange", "onClean", "onClose", "onExited", "onSearch", "onSelect", "onSelectItem", "onOpen", "onScroll", "onExpand", "renderValue", "renderTreeIcon", "renderTreeNode"]);
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
  var _useCustom = (0, _utils.useCustom)('Picker', overrideLocale),
    rtl = _useCustom.rtl,
    locale = _useCustom.locale;
  var _useState = (0, _react.useState)(false),
    active = _useState[0],
    setActive = _useState[1];
  var _useState2 = (0, _react.useState)(null),
    activeNode = _useState2[0],
    setActiveNode = _useState2[1];
  var _useClassNames = (0, _utils.useClassNames)(classPrefix),
    prefix = _useClassNames.prefix,
    merge = _useClassNames.merge;
  var _useClassNames2 = (0, _utils.useClassNames)('check-tree'),
    checkTreePrefix = _useClassNames2.prefix,
    withCheckTreeClassPrefix = _useClassNames2.withClassPrefix;
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
  var _useState3 = (0, _react.useState)(null),
    focusItemValue = _useState3[0],
    setFocusItemValue = _useState3[1];
  var _useFlattenTreeData = (0, _treeUtils.useFlattenTreeData)({
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
  var _useTreeNodeRefs = (0, _treeUtils.useTreeNodeRefs)(),
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
    return (0, _utils2.getFormattedTree)(flattenNodes, filteredData, {
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
      disabled: (0, _utils2.getDisabledState)(flattenNodes, node, {
        disabledItemValues: disabledItemValues,
        valueKey: valueKey
      }),
      nodeData: node,
      checkState: node.checkState,
      uncheckable: (0, _utils2.isNodeUncheckable)(node, {
        uncheckableItemValues: uncheckableItemValues,
        valueKey: valueKey
      }),
      allUncheckable: (0, _utils2.isAllSiblingNodeUncheckable)(node, flattenNodes, uncheckableItemValues, valueKey),
      onSelect: handleSelect,
      onExpand: handleExpand,
      renderTreeNode: renderTreeNode,
      renderTreeIcon: renderTreeIcon
    };
  };
  var focusActiveNode = function focusActiveNode() {
    if (list.current) {
      (0, _treeUtils.focusToActiveTreeNode)({
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
  (0, _react.useEffect)(function () {
    setValue((0, _utils2.getCheckTreePickerDefaultValue)(value, uncheckableItemValues));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
  (0, _react.useEffect)(function () {
    unSerializeList({
      nodes: flattenNodes,
      key: 'check',
      value: value,
      cascade: cascade,
      uncheckableItemValues: uncheckableItemValues
    });
    forceUpdate();
  }, [cascade, value, uncheckableItemValues, unSerializeList, flattenNodes, forceUpdate]);
  var toggleUpChecked = (0, _utils.useEventCallback)(function (nodes, node, checked) {
    var currentNode = node.refKey ? nodes[node.refKey] : null;
    if (cascade && currentNode) {
      if (!checked) {
        currentNode.check = checked;
        currentNode.checkAll = checked;
      } else {
        if ((0, _utils2.isEveryChildChecked)(nodes, currentNode)) {
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
  var toggleDownChecked = (0, _utils.useEventCallback)(function (nodes, node, isChecked) {
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
  var toggleChecked = (0, _utils.useEventCallback)(function (node, isChecked) {
    var nodes = (0, _cloneDeep2.default)(flattenNodes);
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
  var itemParentMap = (0, _react.useMemo)(function () {
    return (0, _treeUtils.getKeyParentMap)(data, function (node) {
      return node[valueKey];
    }, function (node) {
      return node[childrenKey];
    });
  }, [childrenKey, data, valueKey]);
  var handleSelect = (0, _utils.useEventCallback)(function (node, event) {
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
    onSelectItem === null || onSelectItem === void 0 ? void 0 : onSelectItem(node, (0, _treeUtils.getPathTowardsItem)(node, function (item) {
      return itemParentMap.get(item[valueKey]);
    }));
  });
  var handleOpen = (0, _utils.useEventCallback)(function () {
    var _trigger$current, _trigger$current$open;
    (_trigger$current = trigger.current) === null || _trigger$current === void 0 ? void 0 : (_trigger$current$open = _trigger$current.open) === null || _trigger$current$open === void 0 ? void 0 : _trigger$current$open.call(_trigger$current);
    setFocusItemValue(activeNode === null || activeNode === void 0 ? void 0 : activeNode[valueKey]);
    focusActiveNode();
    onOpen === null || onOpen === void 0 ? void 0 : onOpen();
    setActive(true);
  });
  var handleClose = (0, _utils.useEventCallback)(function () {
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
  var handleClean = (0, _utils.useEventCallback)(function (event) {
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
  var handleFocusItem = (0, _utils.useEventCallback)(function (key) {
    var focusableItems = (0, _treeUtils.getFocusableItems)(filteredData, {
      disabledItemValues: disabledItemValues,
      valueKey: valueKey,
      childrenKey: childrenKey,
      expandItemValues: expandItemValues
    }, (0, _treeUtils.isSearching)(searchKeywordState));
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
        (0, _treeUtils.focusTreeNode)(focusItem === null || focusItem === void 0 ? void 0 : (_focusItem$parent2 = focusItem.parent) === null || _focusItem$parent2 === void 0 ? void 0 : _focusItem$parent2.refKey, treeNodesRefs, "." + checkTreePrefix('node-label'));
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
  var selectActiveItem = function selectActiveItem(event) {
    if ((0, _isNil2.default)(focusItemValue)) return;
    var activeItem = (0, _treeUtils.getActiveItem)(focusItemValue, flattenNodes, valueKey);
    if (!(0, _utils2.isNodeUncheckable)(activeItem, {
      uncheckableItemValues: uncheckableItemValues,
      valueKey: valueKey
    }) && activeItem !== null) {
      handleSelect(activeItem, event);
    }
  };
  var onPickerKeydown = (0, _Picker.useToggleKeyDownEvent)((0, _extends2.default)({
    toggle: !focusItemValue || !active,
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
  var handleTreeKeydown = (0, _utils.useEventCallback)(function (event) {
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
  var renderNode = function renderNode(node, layer) {
    var visible = node.visible,
      refKey = node.refKey; // when searching, all nodes should be expand
    var expand = (0, _treeUtils.getExpandWhenSearching)(searchKeywordState, expandItemValues.includes(node[valueKey]));
    if (!visible) {
      return null;
    }
    var children = node[childrenKey];
    var visibleChildren = (0, _isUndefined2.default)(searchKeywordState) || searchKeywordState.length === 0 ? !!children : (0, _treeUtils.hasVisibleChildren)(node, childrenKey);
    var nodeProps = (0, _extends2.default)({}, getTreeNodeProps((0, _extends2.default)({}, node, {
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
      return /*#__PURE__*/_react.default.createElement("div", {
        className: childrenClass,
        key: node[valueKey]
      }, /*#__PURE__*/_react.default.createElement(_CheckTreeNode.default, (0, _extends2.default)({}, nodeProps, {
        ref: function ref(_ref) {
          return saveTreeNodeRef(_ref, refKey);
        }
      })), /*#__PURE__*/_react.default.createElement("div", {
        className: checkTreePrefix('group'),
        role: "group"
      }, nodes.map(function (child) {
        return renderNode(child, layer);
      }), showIndentLine && /*#__PURE__*/_react.default.createElement("span", {
        className: checkTreePrefix('indent-line'),
        style: (0, _treeUtils.getTreeNodeIndent)(rtl, layer - 1, true)
      })));
    }
    return /*#__PURE__*/_react.default.createElement(_CheckTreeNode.default, (0, _extends2.default)({
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
    var expand = (0, _treeUtils.getExpandWhenSearching)(searchKeywordState, expandItemValues.includes(node[valueKey]));
    var nodeProps = (0, _extends2.default)({}, getTreeNodeProps((0, _extends2.default)({}, node, {
      /**
       * spread operator don't copy unenumerable properties
       * so we need to copy them manually
       */
      parent: node.parent,
      expand: expand
    }), layer), {
      hasChildren: node.hasChildren
    });
    return visible && /*#__PURE__*/_react.default.createElement(_CheckTreeNode.default, (0, _extends2.default)({
      style: style,
      ref: function ref(_ref4) {
        return saveTreeNodeRef(_ref4, refKey);
      }
    }, nodeProps));
  };
  var renderCheckTree = function renderCheckTree() {
    var _withCheckTreeClassPr, _merge2;
    var classes = withCheckTreeClassPrefix((_withCheckTreeClassPr = {}, _withCheckTreeClassPr[className !== null && className !== void 0 ? className : ''] = inline, _withCheckTreeClassPr['without-children'] = !(0, _utils2.isSomeNodeHasChildren)(data, childrenKey), _withCheckTreeClassPr.virtualized = virtualized, _withCheckTreeClassPr));
    var formattedNodes = getFormattedNodes(renderNode);
    if (!formattedNodes.some(function (v) {
      return v !== null;
    })) {
      return /*#__PURE__*/_react.default.createElement("div", {
        className: prefix('none')
      }, locale.noResultsText);
    }
    var treeNodesClass = merge(checkTreePrefix('root'), (_merge2 = {}, _merge2[checkTreePrefix('all-uncheckable')] = (0, _utils2.isEveryFirstLevelNodeUncheckable)(flattenNodes, uncheckableItemValues, valueKey), _merge2));
    return /*#__PURE__*/_react.default.createElement(_Picker.TreeView, {
      ref: inline ? root : treeView,
      multiselectable: true,
      treeRootClassName: treeNodesClass,
      className: classes,
      style: inline ? (0, _extends2.default)({
        height: height
      }, style) : {},
      onScroll: onScroll,
      onKeyDown: inline ? handleTreeKeydown : undefined
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
  var renderDropdownMenu = function renderDropdownMenu(positionProps, speakerRef) {
    var left = positionProps.left,
      top = positionProps.top,
      className = positionProps.className;
    var classes = (0, _classnames.default)(className, menuClassName, prefix('check-tree-menu'));
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
    }) : null, renderMenu ? renderMenu(renderCheckTree()) : renderCheckTree(), renderExtraFooter === null || renderExtraFooter === void 0 ? void 0 : renderExtraFooter());
  };
  var selectedItems = (0, _react.useMemo)(function () {
    return (0, _utils2.getSelectedItems)(flattenNodes, value);
  }, [flattenNodes, value]);
  /**
   * 1.Have a value and the value is valid.
   * 2.Regardless of whether the value is valid, as long as renderValue is set, it is judged to have a value.
   */
  var hasValidValue = selectedItems.length > 0 || value.length > 0 && (0, _isFunction2.default)(renderValue);
  var selectedElement = placeholder;
  if (hasValidValue) {
    selectedElement = /*#__PURE__*/_react.default.createElement(_Picker.SelectedElement, {
      selectedItems: selectedItems,
      countable: countable,
      valueKey: valueKey,
      labelKey: labelKey,
      childrenKey: childrenKey,
      prefix: prefix,
      cascade: cascade,
      locale: locale
    });
    if ((0, _isFunction2.default)(renderValue)) {
      selectedElement = renderValue(value, selectedItems, selectedElement);
      if ((0, _isNil2.default)(selectedElement)) {
        hasValidValue = false;
      }
    }
  }
  var _usePickerClassName = (0, _Picker.usePickerClassName)((0, _extends2.default)({}, props, {
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
  return /*#__PURE__*/_react.default.createElement(_Picker.PickerToggleTrigger, {
    id: id,
    popupType: "tree",
    multiple: true,
    pickerProps: (0, _pick2.default)(props, _Picker.pickTriggerPropKeys),
    ref: trigger,
    placement: placement,
    onEnter: handleOpen,
    onEntered: onEntered,
    onExited: (0, _utils.createChainedFunction)(handleClose, onExited),
    speaker: renderDropdownMenu
  }, /*#__PURE__*/_react.default.createElement(Component, {
    className: classes,
    style: style,
    ref: root
  }, /*#__PURE__*/_react.default.createElement(_Picker.PickerToggle, (0, _extends2.default)({}, (0, _omit2.default)(rest, [].concat(_Picker.omitTriggerPropKeys, usedClassNamePropKeys)), {
    ref: target,
    appearance: appearance,
    onKeyDown: onPickerKeydown,
    onClean: (0, _utils.createChainedFunction)(handleClean, onClean),
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
CheckTreePicker.propTypes = (0, _extends2.default)({}, _Picker.listPickerPropTypes, {
  height: _propTypes.default.number,
  appearance: (0, _propTypes2.oneOf)(['default', 'subtle']),
  locale: _propTypes.default.any,
  cascade: _propTypes.default.bool,
  countable: _propTypes.default.bool,
  searchable: _propTypes.default.bool,
  virtualized: _propTypes.default.bool,
  searchKeyword: _propTypes.default.string,
  menuAutoWidth: _propTypes.default.bool,
  defaultExpandAll: _propTypes.default.bool,
  containerPadding: _propTypes.default.number,
  disabledItemValues: _propTypes.default.array,
  expandItemValues: _propTypes.default.array,
  defaultExpandItemValues: _propTypes.default.array,
  uncheckableItemValues: _propTypes.default.array,
  onSearch: _propTypes.default.func,
  onExpand: _propTypes.default.func,
  onSelect: _propTypes.default.func,
  renderMenu: _propTypes.default.func,
  renderTreeNode: _propTypes.default.func,
  renderTreeIcon: _propTypes.default.func,
  searchBy: _propTypes.default.func,
  onScroll: _propTypes.default.func
});
var _default = CheckTreePicker;
exports.default = _default;