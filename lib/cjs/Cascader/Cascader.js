'use client';
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends3 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _reactUseSet = require("react-use-set");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _omit = _interopRequireDefault(require("lodash/omit"));
var _pick = _interopRequireDefault(require("lodash/pick"));
var _isNil = _interopRequireDefault(require("lodash/isNil"));
var _isFunction = _interopRequireDefault(require("lodash/isFunction"));
var _shallowEqual = _interopRequireDefault(require("../utils/shallowEqual"));
var _TreeView = _interopRequireDefault(require("./TreeView"));
var _treeUtils = require("../utils/treeUtils");
var _utils = require("./utils");
var _utils2 = require("../utils");
var _Picker = require("../internals/Picker");
var _SearchBox = _interopRequireDefault(require("../internals/SearchBox"));
var _useMap = require("../utils/useMap");
var _propTypes2 = require("../internals/propTypes");
var emptyArray = [];

/**
 * The `Cascader` component displays a hierarchical list of options.
 * @see https://rsuitejs.com/components/cascader
 */
var Cascader = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    _props$data = props.data,
    data = _props$data === void 0 ? emptyArray : _props$data,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'picker' : _props$classPrefix,
    _props$childrenKey = props.childrenKey,
    childrenKey = _props$childrenKey === void 0 ? 'children' : _props$childrenKey,
    _props$valueKey = props.valueKey,
    valueKey = _props$valueKey === void 0 ? 'value' : _props$valueKey,
    _props$labelKey = props.labelKey,
    labelKey = _props$labelKey === void 0 ? 'label' : _props$labelKey,
    defaultValue = props.defaultValue,
    placeholder = props.placeholder,
    disabled = props.disabled,
    _props$disabledItemVa = props.disabledItemValues,
    disabledItemValues = _props$disabledItemVa === void 0 ? emptyArray : _props$disabledItemVa,
    _props$appearance = props.appearance,
    appearance = _props$appearance === void 0 ? 'default' : _props$appearance,
    _props$cleanable = props.cleanable,
    cleanable = _props$cleanable === void 0 ? true : _props$cleanable,
    overrideLocale = props.locale,
    toggleAs = props.toggleAs,
    style = props.style,
    valueProp = props.value,
    inline = props.inline,
    menuClassName = props.menuClassName,
    menuStyle = props.menuStyle,
    menuWidth = props.menuWidth,
    menuHeight = props.menuHeight,
    _props$searchable = props.searchable,
    searchable = _props$searchable === void 0 ? true : _props$searchable,
    parentSelectable = props.parentSelectable,
    _props$placement = props.placement,
    placement = _props$placement === void 0 ? 'bottomStart' : _props$placement,
    id = props.id,
    renderMenuItem = props.renderMenuItem,
    renderSearchItem = props.renderSearchItem,
    renderValue = props.renderValue,
    renderMenu = props.renderMenu,
    renderExtraFooter = props.renderExtraFooter,
    onEnter = props.onEnter,
    onExited = props.onExited,
    onClean = props.onClean,
    onChange = props.onChange,
    onSelect = props.onSelect,
    onSearch = props.onSearch,
    onClose = props.onClose,
    onOpen = props.onOpen,
    getChildren = props.getChildren,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, ["as", "data", "classPrefix", "childrenKey", "valueKey", "labelKey", "defaultValue", "placeholder", "disabled", "disabledItemValues", "appearance", "cleanable", "locale", "toggleAs", "style", "value", "inline", "menuClassName", "menuStyle", "menuWidth", "menuHeight", "searchable", "parentSelectable", "placement", "id", "renderMenuItem", "renderSearchItem", "renderValue", "renderMenu", "renderExtraFooter", "onEnter", "onExited", "onClean", "onChange", "onSelect", "onSearch", "onClose", "onOpen", "getChildren"]); // Use component active state to support keyboard events.
  var _useState = (0, _react.useState)(false),
    active = _useState[0],
    setActive = _useState[1];
  var _usePickerRef = (0, _Picker.usePickerRef)(ref),
    trigger = _usePickerRef.trigger,
    root = _usePickerRef.root,
    target = _usePickerRef.target,
    overlay = _usePickerRef.overlay,
    searchInput = _usePickerRef.searchInput;
  var _ref = (0, _utils2.useControlled)(valueProp, defaultValue),
    value = _ref[0],
    setValue = _ref[1];
  var isMounted = (0, _utils2.useIsMounted)();
  var loadingItemsSet = (0, _reactUseSet.useSet)();
  var asyncChildrenMap = (0, _useMap.useMap)();
  var parentMap = (0, _react.useMemo)(function () {
    return (0, _treeUtils.getParentMap)(data, function (item) {
      var _asyncChildrenMap$get;
      return (_asyncChildrenMap$get = asyncChildrenMap.get(item)) !== null && _asyncChildrenMap$get !== void 0 ? _asyncChildrenMap$get : item[childrenKey];
    });
  }, [asyncChildrenMap, childrenKey, data]);
  var flattenedData = (0, _react.useMemo)(function () {
    return (0, _treeUtils.flattenTree)(data, function (item) {
      var _asyncChildrenMap$get2;
      return (_asyncChildrenMap$get2 = asyncChildrenMap.get(item)) !== null && _asyncChildrenMap$get2 !== void 0 ? _asyncChildrenMap$get2 : item[childrenKey];
    });
  }, [asyncChildrenMap, childrenKey, data]);

  // The item that focus is on
  var _useState2 = (0, _react.useState)(),
    activeItem = _useState2[0],
    setActiveItem = _useState2[1];
  var _usePaths = (0, _utils.usePaths)({
      data: data,
      activeItem: activeItem,
      selectedItem: flattenedData.find(function (item) {
        return item[valueKey] === value;
      }),
      getParent: function getParent(item) {
        return parentMap.get(item);
      },
      getChildren: function getChildren(item) {
        var _asyncChildrenMap$get3;
        return (_asyncChildrenMap$get3 = asyncChildrenMap.get(item)) !== null && _asyncChildrenMap$get3 !== void 0 ? _asyncChildrenMap$get3 : item[childrenKey];
      }
    }),
    columnsToDisplay = _usePaths.columnsToDisplay,
    pathTowardsActiveItem = _usePaths.pathTowardsActiveItem,
    pathTowardsSelectedItem = _usePaths.pathTowardsSelectedItem;
  var _useCustom = (0, _utils2.useCustom)('Picker', overrideLocale),
    locale = _useCustom.locale,
    rtl = _useCustom.rtl;
  /**
   * 1.Have a value and the value is valid.
   * 2.Regardless of whether the value is valid, as long as renderValue is set, it is judged to have a value.
   */
  var hasValue = pathTowardsSelectedItem.length > 0 || !(0, _isNil.default)(value) && (0, _isFunction.default)(renderValue);
  var _useClassNames = (0, _utils2.useClassNames)(classPrefix),
    prefix = _useClassNames.prefix,
    merge = _useClassNames.merge;
  var _useState3 = (0, _react.useState)(''),
    searchKeyword = _useState3[0],
    setSearchKeyword = _useState3[1];
  var someKeyword = function someKeyword(item, keyword) {
    if (item[labelKey].match(new RegExp((0, _utils2.getSafeRegExpString)(keyword || searchKeyword), 'i'))) {
      return true;
    }
    var parent = parentMap.get(item);
    if (parent && someKeyword(parent)) {
      return true;
    }
    return false;
  };
  var getSearchResult = function getSearchResult(keyword) {
    var items = [];
    var result = flattenedData.filter(function (item) {
      if (!parentSelectable && item[childrenKey]) {
        return false;
      }
      return someKeyword(item, keyword);
    });
    for (var i = 0; i < result.length; i++) {
      items.push(result[i]);

      // A maximum of 100 search results are returned.
      if (i === 99) {
        return items;
      }
    }
    return items;
  };

  // Used to hover the focuse item  when trigger `onKeydown`
  var _useFocusItemValue = (0, _Picker.useFocusItemValue)(value, {
      rtl: rtl,
      data: flattenedData,
      valueKey: valueKey,
      defaultLayer: pathTowardsSelectedItem !== null && pathTowardsSelectedItem !== void 0 && pathTowardsSelectedItem.length ? pathTowardsSelectedItem.length - 1 : 0,
      target: function target() {
        return overlay.current;
      },
      getParent: function getParent(item) {
        return parentMap.get(item);
      },
      callback: (0, _react.useCallback)(function (value) {
        setActiveItem(flattenedData.find(function (item) {
          return item[valueKey] === value;
        }));
      }, [flattenedData, setActiveItem, valueKey])
    }),
    focusItemValue = _useFocusItemValue.focusItemValue,
    setFocusItemValue = _useFocusItemValue.setFocusItemValue,
    setLayer = _useFocusItemValue.setLayer,
    setKeys = _useFocusItemValue.setKeys,
    onFocusItem = _useFocusItemValue.onKeyDown;
  var handleSearch = (0, _utils2.useEventCallback)(function (value, event) {
    var items = getSearchResult(value);
    setSearchKeyword(value);
    onSearch === null || onSearch === void 0 ? void 0 : onSearch(value, event);
    if (!value || items.length === 0) {
      setFocusItemValue(undefined);
      return;
    }
    if (items.length > 0) {
      setFocusItemValue(items[0][valueKey]);
      setLayer(0);
      setKeys([]);
    }
  });
  var handleEntered = (0, _utils2.useEventCallback)(function () {
    if (!target.current) {
      return;
    }
    onOpen === null || onOpen === void 0 ? void 0 : onOpen();
    setActive(true);
  });
  var handleExited = (0, _utils2.useEventCallback)(function () {
    if (!target.current) {
      return;
    }
    onClose === null || onClose === void 0 ? void 0 : onClose();
    setActive(false);
    setSearchKeyword('');
  });
  var handleClose = (0, _utils2.useEventCallback)(function () {
    var _trigger$current, _target$current, _target$current$focus;
    (_trigger$current = trigger.current) === null || _trigger$current === void 0 ? void 0 : _trigger$current.close();

    // The focus is on the trigger button after closing
    (_target$current = target.current) === null || _target$current === void 0 ? void 0 : (_target$current$focus = _target$current.focus) === null || _target$current$focus === void 0 ? void 0 : _target$current$focus.call(_target$current);
  });
  var handleClean = (0, _utils2.useEventCallback)(function (event) {
    if (disabled || !target.current) {
      return;
    }
    setValue(null);
    onChange === null || onChange === void 0 ? void 0 : onChange(null, event);
  });
  var handleMenuPressEnter = (0, _utils2.useEventCallback)(function (event) {
    var focusItem = (0, _treeUtils.findNodeOfTree)(data, function (item) {
      return item[valueKey] === focusItemValue;
    });
    var isLeafNode = focusItem && !focusItem[childrenKey];
    if (isLeafNode) {
      setValue(focusItemValue);
      if (pathTowardsActiveItem.length) {
        setLayer(pathTowardsActiveItem.length - 1);
      }
      if (!(0, _shallowEqual.default)(value, focusItemValue)) {
        onSelect === null || onSelect === void 0 ? void 0 : onSelect(focusItem, pathTowardsActiveItem, event);
        onChange === null || onChange === void 0 ? void 0 : onChange(focusItemValue !== null && focusItemValue !== void 0 ? focusItemValue : null, event);
      }
      handleClose();
    }
  });
  var onPickerKeyDown = (0, _Picker.useToggleKeyDownEvent)((0, _extends3.default)({
    toggle: !focusItemValue || !active,
    trigger: trigger,
    target: target,
    overlay: overlay,
    searchInput: searchInput,
    active: active,
    onExit: handleClean,
    onMenuKeyDown: onFocusItem,
    onMenuPressEnter: handleMenuPressEnter
  }, rest));
  var handleSelect = (0, _utils2.useEventCallback)(function (node, cascadePaths, isLeafNode, event) {
    var _node$childrenKey, _trigger$current2;
    onSelect === null || onSelect === void 0 ? void 0 : onSelect(node, cascadePaths, event);
    setActiveItem(node);
    var nextValue = node[valueKey];

    // Lazy load node's children
    if (typeof getChildren === 'function' && ((_node$childrenKey = node[childrenKey]) === null || _node$childrenKey === void 0 ? void 0 : _node$childrenKey.length) === 0 && !asyncChildrenMap.has(node)) {
      loadingItemsSet.add(node);
      var children = getChildren(node);
      if (children instanceof Promise) {
        children.then(function (data) {
          if (isMounted()) {
            loadingItemsSet.delete(node);
            asyncChildrenMap.set(node, data);
          }
        });
      } else {
        loadingItemsSet.delete(node);
        asyncChildrenMap.set(node, children);
      }
    }
    if (isLeafNode) {
      // Determines whether the option is a leaf node, and if so, closes the picker.
      handleClose();
      setValue(nextValue);
      if (!(0, _shallowEqual.default)(value, nextValue)) {
        onChange === null || onChange === void 0 ? void 0 : onChange(nextValue, event);
      }
      return;
    }

    /** When the parent is optional, the value and the displayed path are updated. */
    if (parentSelectable && !(0, _shallowEqual.default)(value, nextValue)) {
      setValue(nextValue);
      onChange === null || onChange === void 0 ? void 0 : onChange(nextValue, event);
    }

    // Update menu position
    (_trigger$current2 = trigger.current) === null || _trigger$current2 === void 0 ? void 0 : _trigger$current2.updatePosition();
  });

  /**
   * The search structure option is processed after being selected.
   */
  var handleSearchRowSelect = (0, _utils2.useEventCallback)(function (node, nodes, event) {
    var nextValue = node[valueKey];
    handleClose();
    setSearchKeyword('');
    setValue(nextValue);
    onSelect === null || onSelect === void 0 ? void 0 : onSelect(node, nodes, event);
    onChange === null || onChange === void 0 ? void 0 : onChange(nextValue, event);
  });
  var renderSearchRow = function renderSearchRow(item, key) {
    var regx = new RegExp((0, _utils2.getSafeRegExpString)(searchKeyword), 'ig');
    var nodes = (0, _treeUtils.getPathTowardsItem)(item, function (item) {
      return parentMap.get(item);
    });
    var formattedNodes = nodes.map(function (node) {
      var _extends2;
      var labelElements = [];
      var a = node[labelKey].split(regx);
      var b = node[labelKey].match(regx);
      for (var i = 0; i < a.length; i++) {
        labelElements.push(a[i]);
        if (b && b[i]) {
          labelElements.push( /*#__PURE__*/_react.default.createElement("span", {
            key: i,
            className: prefix('cascader-search-match')
          }, b[i]));
        }
      }
      return (0, _extends3.default)({}, node, (_extends2 = {}, _extends2[labelKey] = labelElements, _extends2));
    });
    var disabled = disabledItemValues.some(function (value) {
      return formattedNodes.some(function (node) {
        return node[valueKey] === value;
      });
    });
    var itemClasses = prefix('cascader-row', {
      'cascader-row-disabled': disabled,
      'cascader-row-focus': item[valueKey] === focusItemValue
    });
    var label = formattedNodes.map(function (node, index) {
      return /*#__PURE__*/_react.default.createElement("span", {
        key: "col-" + index,
        className: prefix('cascader-col')
      }, node[labelKey]);
    });
    return /*#__PURE__*/_react.default.createElement("div", {
      role: "treeitem",
      key: key,
      "aria-disabled": disabled,
      "data-key": item[valueKey],
      className: itemClasses,
      tabIndex: -1,
      onClick: function onClick(event) {
        if (!disabled) {
          handleSearchRowSelect(item, nodes, event);
        }
      }
    }, renderSearchItem ? renderSearchItem(label, nodes) : label);
  };
  var renderSearchResultPanel = function renderSearchResultPanel() {
    if (searchKeyword === '') {
      return null;
    }
    var items = getSearchResult();
    return /*#__PURE__*/_react.default.createElement("div", {
      className: prefix('cascader-search-panel'),
      "data-layer": 0,
      role: "tree"
    }, items.length ? items.map(renderSearchRow) : /*#__PURE__*/_react.default.createElement("div", {
      className: prefix('none')
    }, locale.noResultsText));
  };
  var renderTreeView = function renderTreeView(positionProps, speakerRef) {
    var _ref2 = positionProps || {},
      left = _ref2.left,
      top = _ref2.top,
      className = _ref2.className;
    var styles = (0, _extends3.default)({}, menuStyle, {
      left: left,
      top: top
    });
    var classes = merge(className, menuClassName, prefix('cascader-menu', {
      inline: inline
    }));
    return /*#__PURE__*/_react.default.createElement(_Picker.PickerPopup, {
      ref: (0, _utils2.mergeRefs)(overlay, speakerRef),
      className: classes,
      style: styles,
      target: trigger,
      onKeyDown: onPickerKeyDown
    }, searchable && /*#__PURE__*/_react.default.createElement(_SearchBox.default, {
      placeholder: locale === null || locale === void 0 ? void 0 : locale.searchPlaceholder,
      onChange: handleSearch,
      value: searchKeyword,
      inputRef: searchInput
    }), renderSearchResultPanel(), searchKeyword === '' && /*#__PURE__*/_react.default.createElement(_TreeView.default, {
      menuWidth: menuWidth,
      menuHeight: menuHeight,
      disabledItemValues: disabledItemValues,
      loadingItemsSet: loadingItemsSet,
      valueKey: valueKey,
      labelKey: labelKey,
      childrenKey: childrenKey,
      classPrefix: 'picker-cascader-menu',
      cascadeData: columnsToDisplay,
      cascadePaths: pathTowardsActiveItem,
      activeItemValue: value
      // FIXME make onSelect generic
      ,
      onSelect: handleSelect,
      renderMenu: renderMenu,
      renderMenuItem: renderMenuItem
    }), renderExtraFooter === null || renderExtraFooter === void 0 ? void 0 : renderExtraFooter());
  };
  var selectedElement = placeholder;
  if (pathTowardsSelectedItem.length > 0) {
    selectedElement = [];
    pathTowardsSelectedItem.forEach(function (item, index) {
      var key = item[valueKey] || item[labelKey];
      selectedElement.push( /*#__PURE__*/_react.default.createElement("span", {
        key: key
      }, item[labelKey]));
      if (index < pathTowardsSelectedItem.length - 1) {
        selectedElement.push( /*#__PURE__*/_react.default.createElement("span", {
          className: "separator",
          key: key + "-separator"
        }, ' / '));
      }
    });
  }
  if (!(0, _isNil.default)(value) && (0, _isFunction.default)(renderValue)) {
    selectedElement = renderValue(value, pathTowardsSelectedItem, selectedElement);
    // If renderValue returns null or undefined, hasValue is false.
    if ((0, _isNil.default)(selectedElement)) {
      hasValue = false;
    }
  }
  var _usePickerClassName = (0, _Picker.usePickerClassName)((0, _extends3.default)({}, props, {
      classPrefix: classPrefix,
      hasValue: hasValue,
      name: 'cascader',
      appearance: appearance,
      cleanable: cleanable
    })),
    classes = _usePickerClassName[0],
    usedClassNamePropKeys = _usePickerClassName[1]; // TODO: bad api design
  //       consider an isolated Menu component
  if (inline) {
    return renderTreeView();
  }
  return /*#__PURE__*/_react.default.createElement(_Picker.PickerToggleTrigger, {
    id: id,
    popupType: "tree",
    pickerProps: (0, _pick.default)(props, _Picker.pickTriggerPropKeys),
    ref: trigger,
    placement: placement,
    onEntered: (0, _utils2.createChainedFunction)(handleEntered, onEnter),
    onExited: (0, _utils2.createChainedFunction)(handleExited, onExited),
    speaker: renderTreeView
  }, /*#__PURE__*/_react.default.createElement(Component, {
    className: classes,
    style: style,
    ref: root
  }, /*#__PURE__*/_react.default.createElement(_Picker.PickerToggle, (0, _extends3.default)({}, (0, _omit.default)(rest, [].concat(_Picker.omitTriggerPropKeys, usedClassNamePropKeys)), {
    ref: target,
    as: toggleAs,
    appearance: appearance,
    disabled: disabled,
    onClean: (0, _utils2.createChainedFunction)(handleClean, onClean),
    onKeyDown: onPickerKeyDown,
    cleanable: cleanable && !disabled,
    hasValue: hasValue,
    active: active,
    placement: placement,
    inputValue: value !== null && value !== void 0 ? value : '',
    focusItemValue: focusItemValue
  }), selectedElement || (locale === null || locale === void 0 ? void 0 : locale.placeholder))));
});
Cascader.displayName = 'Cascader';
Cascader.propTypes = (0, _extends3.default)({}, _Picker.listPickerPropTypes, {
  disabledItemValues: _propTypes.default.array,
  locale: _propTypes.default.any,
  appearance: (0, _propTypes2.oneOf)(['default', 'subtle']),
  renderMenu: _propTypes.default.func,
  onSelect: _propTypes.default.func,
  onSearch: _propTypes.default.func,
  cleanable: _propTypes.default.bool,
  renderMenuItem: _propTypes.default.func,
  renderSearchItem: _propTypes.default.func,
  menuWidth: _propTypes.default.number,
  menuHeight: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  searchable: _propTypes.default.bool,
  inline: _propTypes.default.bool,
  parentSelectable: _propTypes.default.bool
});
var _default = Cascader;
exports.default = _default;