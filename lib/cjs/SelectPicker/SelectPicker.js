'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");
exports.__esModule = true;
exports.default = void 0;
var _taggedTemplateLiteralLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteralLoose"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _pick = _interopRequireDefault(require("lodash/pick"));
var _isUndefined = _interopRequireDefault(require("lodash/isUndefined"));
var _isNil = _interopRequireDefault(require("lodash/isNil"));
var _isFunction = _interopRequireDefault(require("lodash/isFunction"));
var _omit = _interopRequireDefault(require("lodash/omit"));
var _utils = require("../utils");
var _getDataGroupBy = require("../utils/getDataGroupBy");
var _Picker = require("../internals/Picker");
var _SearchBox = _interopRequireDefault(require("../internals/SearchBox"));
var _propTypes2 = require("../internals/propTypes");
var _templateObject;
var emptyArray = [];
/**
 * The `SelectPicker` component is used to select an item from a list of data.
 * @see https://rsuitejs.com/components/select-picker/
 */
var SelectPicker = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    _props$appearance = props.appearance,
    appearance = _props$appearance === void 0 ? 'default' : _props$appearance,
    _props$data = props.data,
    data = _props$data === void 0 ? emptyArray : _props$data,
    _props$valueKey = props.valueKey,
    valueKey = _props$valueKey === void 0 ? 'value' : _props$valueKey,
    _props$labelKey = props.labelKey,
    labelKey = _props$labelKey === void 0 ? 'label' : _props$labelKey,
    valueProp = props.value,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'picker' : _props$classPrefix,
    placeholder = props.placeholder,
    defaultValue = props.defaultValue,
    disabled = props.disabled,
    _props$cleanable = props.cleanable,
    cleanable = _props$cleanable === void 0 ? true : _props$cleanable,
    _props$placement = props.placement,
    placement = _props$placement === void 0 ? 'bottomStart' : _props$placement,
    menuClassName = props.menuClassName,
    _props$menuAutoWidth = props.menuAutoWidth,
    menuAutoWidth = _props$menuAutoWidth === void 0 ? true : _props$menuAutoWidth,
    _props$menuMaxHeight = props.menuMaxHeight,
    menuMaxHeight = _props$menuMaxHeight === void 0 ? 320 : _props$menuMaxHeight,
    menuStyle = props.menuStyle,
    groupBy = props.groupBy,
    overrideLocale = props.locale,
    toggleAs = props.toggleAs,
    style = props.style,
    _props$searchable = props.searchable,
    searchable = _props$searchable === void 0 ? true : _props$searchable,
    _props$disabledItemVa = props.disabledItemValues,
    disabledItemValues = _props$disabledItemVa === void 0 ? emptyArray : _props$disabledItemVa,
    virtualized = props.virtualized,
    listProps = props.listProps,
    id = props.id,
    onGroupTitleClick = props.onGroupTitleClick,
    searchBy = props.searchBy,
    onEntered = props.onEntered,
    onExited = props.onExited,
    onClean = props.onClean,
    onChange = props.onChange,
    onSelect = props.onSelect,
    onSearch = props.onSearch,
    onClose = props.onClose,
    onOpen = props.onOpen,
    sort = props.sort,
    renderValue = props.renderValue,
    renderMenu = props.renderMenu,
    renderMenuGroup = props.renderMenuGroup,
    renderMenuItem = props.renderMenuItem,
    renderExtraFooter = props.renderExtraFooter,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, ["as", "appearance", "data", "valueKey", "labelKey", "value", "classPrefix", "placeholder", "defaultValue", "disabled", "cleanable", "placement", "menuClassName", "menuAutoWidth", "menuMaxHeight", "menuStyle", "groupBy", "locale", "toggleAs", "style", "searchable", "disabledItemValues", "virtualized", "listProps", "id", "onGroupTitleClick", "searchBy", "onEntered", "onExited", "onClean", "onChange", "onSelect", "onSearch", "onClose", "onOpen", "sort", "renderValue", "renderMenu", "renderMenuGroup", "renderMenuItem", "renderExtraFooter"]);
  var _usePickerRef = (0, _Picker.usePickerRef)(ref),
    trigger = _usePickerRef.trigger,
    root = _usePickerRef.root,
    target = _usePickerRef.target,
    overlay = _usePickerRef.overlay,
    list = _usePickerRef.list,
    searchInput = _usePickerRef.searchInput;
  var _useCustom = (0, _utils.useCustom)('Picker', overrideLocale),
    locale = _useCustom.locale;
  var _ref = (0, _utils.useControlled)(valueProp, defaultValue),
    value = _ref[0],
    setValue = _ref[1]; // Used to hover the focus item  when trigger `onKeydown`
  var _useFocusItemValue = (0, _Picker.useFocusItemValue)(value, {
      data: data,
      valueKey: valueKey,
      target: function target() {
        return overlay.current;
      }
    }),
    focusItemValue = _useFocusItemValue.focusItemValue,
    setFocusItemValue = _useFocusItemValue.setFocusItemValue,
    onFocusItem = _useFocusItemValue.onKeyDown; // Use search keywords to filter options.
  var _useSearch = (0, _Picker.useSearch)(data, {
      labelKey: labelKey,
      searchBy: searchBy,
      callback: function callback(searchKeyword, filteredData, event) {
        var _filteredData$;
        // The first option after filtering is the focus.
        setFocusItemValue(filteredData === null || filteredData === void 0 ? void 0 : (_filteredData$ = filteredData[0]) === null || _filteredData$ === void 0 ? void 0 : _filteredData$[valueKey]);
        onSearch === null || onSearch === void 0 ? void 0 : onSearch(searchKeyword, event);
      }
    }),
    searchKeyword = _useSearch.searchKeyword,
    filteredData = _useSearch.filteredData,
    resetSearch = _useSearch.resetSearch,
    handleSearch = _useSearch.handleSearch; // Use component active state to support keyboard events.
  var _useState = (0, _react.useState)(false),
    active = _useState[0],
    setActive = _useState[1];
  var handleClose = (0, _utils.useEventCallback)(function () {
    var _trigger$current, _trigger$current$clos;
    (_trigger$current = trigger.current) === null || _trigger$current === void 0 ? void 0 : (_trigger$current$clos = _trigger$current.close) === null || _trigger$current$clos === void 0 ? void 0 : _trigger$current$clos.call(_trigger$current);
  });
  var handleSelect = (0, _utils.useEventCallback)(function (value, item, event) {
    var _target$current;
    onSelect === null || onSelect === void 0 ? void 0 : onSelect(value, item, event);
    (_target$current = target.current) === null || _target$current === void 0 ? void 0 : _target$current.focus();
  });
  var handleChangeValue = (0, _utils.useEventCallback)(function (value, event) {
    onChange === null || onChange === void 0 ? void 0 : onChange(value, event);
  });
  var handleMenuPressEnter = (0, _utils.useEventCallback)(function (event) {
    if (!focusItemValue) {
      return;
    }

    // Find active `MenuItem` by `value`
    var focusItem = data.find(function (item) {
      return (0, _utils.shallowEqual)(item[valueKey], focusItemValue);
    });
    setValue(focusItemValue);
    handleSelect(focusItemValue, focusItem, event);
    handleChangeValue(focusItemValue, event);
    handleClose();
  });
  var handleItemSelect = (0, _utils.useEventCallback)(function (value, item, event) {
    setValue(value);
    setFocusItemValue(value);
    handleSelect(value, item, event);
    handleChangeValue(value, event);
    handleClose();
  });
  var handleClean = (0, _utils.useEventCallback)(function (event) {
    if (disabled || !cleanable) {
      return;
    }
    setValue(null);
    setFocusItemValue(value);
    handleChangeValue(null, event);
  });
  var onPickerKeyDown = (0, _Picker.useToggleKeyDownEvent)((0, _extends2.default)({
    toggle: !focusItemValue || !active,
    trigger: trigger,
    target: target,
    overlay: overlay,
    searchInput: searchInput,
    active: active,
    onExit: handleClean,
    onMenuKeyDown: onFocusItem,
    onMenuPressEnter: handleMenuPressEnter,
    onClose: function onClose() {
      setFocusItemValue(null);
    }
  }, rest));
  var handleExited = (0, _utils.useEventCallback)(function () {
    resetSearch();
    setActive(false);
    onSearch === null || onSearch === void 0 ? void 0 : onSearch('');
    onClose === null || onClose === void 0 ? void 0 : onClose();
  });
  var handleEntered = (0, _utils.useEventCallback)(function () {
    setActive(true);
    setFocusItemValue(value);
    onOpen === null || onOpen === void 0 ? void 0 : onOpen();
  });

  // Find active `MenuItem` by `value`
  var activeItem = data.find(function (item) {
    return (0, _utils.shallowEqual)(item[valueKey], value);
  });

  /**
   * 1.Have a value and the value is valid.
   * 2.Regardless of whether the value is valid, as long as renderValue is set, it is judged to have a value.
   */
  var hasValue = !!activeItem || !(0, _isNil.default)(value) && (0, _isFunction.default)(renderValue);
  var _useClassNames = (0, _utils.useClassNames)(classPrefix),
    prefix = _useClassNames.prefix,
    merge = _useClassNames.merge;
  var selectedElement = placeholder;
  if (activeItem !== null && activeItem !== void 0 && activeItem[labelKey]) {
    selectedElement = activeItem[labelKey];
  }
  if (!(0, _isNil.default)(value) && (0, _isFunction.default)(renderValue)) {
    selectedElement = renderValue(value, activeItem, selectedElement);
    // If renderValue returns null or undefined, hasValue is false.
    if ((0, _isNil.default)(selectedElement)) {
      hasValue = false;
    }
  }
  var renderPopup = function renderPopup(positionProps, speakerRef) {
    var left = positionProps.left,
      top = positionProps.top,
      className = positionProps.className;
    var classes = merge(className, menuClassName, prefix('select-menu'));
    var styles = (0, _extends2.default)({}, menuStyle, {
      left: left,
      top: top
    });
    var items = filteredData;

    // Create a tree structure data when set `groupBy`
    if (groupBy) {
      items = (0, _getDataGroupBy.getDataGroupBy)(items, groupBy, sort);
    } else if (typeof sort === 'function') {
      items = items.sort(sort(false));
    }
    var menu = items.length ? /*#__PURE__*/_react.default.createElement(_Picker.Listbox, {
      listProps: listProps,
      listRef: list,
      disabledItemValues: disabledItemValues,
      valueKey: valueKey,
      labelKey: labelKey,
      renderMenuGroup: renderMenuGroup,
      renderMenuItem: renderMenuItem,
      maxHeight: menuMaxHeight,
      classPrefix: 'picker-select-menu',
      listItemClassPrefix: 'picker-select-menu-item',
      listItemAs: _Picker.ListItem,
      activeItemValues: [value],
      focusItemValue: focusItemValue,
      data: items
      // FIXME-Doma
      // `group` is redundant so long as `groupBy` exists
      ,
      group: !(0, _isUndefined.default)(groupBy),
      groupBy: groupBy,
      onSelect: handleItemSelect,
      onGroupTitleClick: onGroupTitleClick,
      virtualized: virtualized
    }) : /*#__PURE__*/_react.default.createElement("div", {
      className: prefix(_templateObject || (_templateObject = (0, _taggedTemplateLiteralLoose2.default)(["none"])))
    }, locale === null || locale === void 0 ? void 0 : locale.noResultsText);
    return /*#__PURE__*/_react.default.createElement(_Picker.PickerPopup, {
      ref: (0, _utils.mergeRefs)(overlay, speakerRef),
      autoWidth: menuAutoWidth,
      className: classes,
      style: styles,
      onKeyDown: onPickerKeyDown,
      target: trigger
    }, searchable && /*#__PURE__*/_react.default.createElement(_SearchBox.default, {
      placeholder: locale === null || locale === void 0 ? void 0 : locale.searchPlaceholder,
      onChange: handleSearch,
      value: searchKeyword,
      inputRef: searchInput
    }), renderMenu ? renderMenu(menu) : menu, renderExtraFooter === null || renderExtraFooter === void 0 ? void 0 : renderExtraFooter());
  };
  var _usePickerClassName = (0, _Picker.usePickerClassName)((0, _extends2.default)({}, props, {
      classPrefix: classPrefix,
      appearance: appearance,
      hasValue: hasValue,
      name: 'select',
      cleanable: cleanable
    })),
    classes = _usePickerClassName[0],
    usedClassNamePropKeys = _usePickerClassName[1];
  return /*#__PURE__*/_react.default.createElement(_Picker.PickerToggleTrigger, {
    id: id,
    pickerProps: (0, _pick.default)(props, _Picker.pickTriggerPropKeys),
    ref: trigger,
    placement: placement,
    onEntered: (0, _utils.createChainedFunction)(handleEntered, onEntered),
    onExited: (0, _utils.createChainedFunction)(handleExited, onExited),
    speaker: renderPopup
  }, /*#__PURE__*/_react.default.createElement(Component, {
    className: classes,
    style: style,
    ref: root
  }, /*#__PURE__*/_react.default.createElement(_Picker.PickerToggle, (0, _extends2.default)({}, (0, _omit.default)(rest, [].concat(_Picker.omitTriggerPropKeys, usedClassNamePropKeys)), {
    ref: target,
    appearance: appearance,
    onClean: (0, _utils.createChainedFunction)(handleClean, onClean),
    onKeyDown: onPickerKeyDown,
    as: toggleAs,
    disabled: disabled,
    cleanable: cleanable && !disabled,
    hasValue: hasValue,
    inputValue: value !== null && value !== void 0 ? value : '',
    focusItemValue: focusItemValue,
    active: active,
    placement: placement
  }), selectedElement || (locale === null || locale === void 0 ? void 0 : locale.placeholder))));
});
SelectPicker.displayName = 'SelectPicker';
SelectPicker.propTypes = (0, _extends2.default)({}, _Picker.listPickerPropTypes, {
  locale: _propTypes.default.any,
  appearance: (0, _propTypes2.oneOf)(['default', 'subtle']),
  menuAutoWidth: _propTypes.default.bool,
  menuMaxHeight: _propTypes.default.number,
  renderMenu: _propTypes.default.func,
  renderMenuItem: _propTypes.default.func,
  renderMenuGroup: _propTypes.default.func,
  onSelect: _propTypes.default.func,
  onGroupTitleClick: _propTypes.default.func,
  onSearch: _propTypes.default.func,
  /**
   * group by key in `data`
   */
  groupBy: _propTypes.default.any,
  sort: _propTypes.default.func,
  searchable: _propTypes.default.bool,
  virtualized: _propTypes.default.bool,
  searchBy: _propTypes.default.func
});
var _default = SelectPicker;
exports.default = _default;