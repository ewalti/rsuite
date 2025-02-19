'use client';
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _pick = _interopRequireDefault(require("lodash/pick"));
var _omit = _interopRequireDefault(require("lodash/omit"));
var _utils = require("../utils");
var _utils2 = require("../Animation/utils");
var _Picker = require("../internals/Picker");
var _Plaintext = _interopRequireDefault(require("../internals/Plaintext"));
var _propTypes2 = require("../internals/propTypes");
var _utils3 = require("./utils");
var _Combobox = _interopRequireDefault(require("./Combobox"));
/**
 * Autocomplete function of input field.
 * @see https://rsuitejs.com/components/auto-complete
 *
 * TODO: Remove unnecessary .rs-auto-complete element
 * TODO: role=combobox and aria-autocomplete on input element
 */
var AutoComplete = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    disabled = props.disabled,
    className = props.className,
    _props$placement = props.placement,
    placement = _props$placement === void 0 ? 'bottomStart' : _props$placement,
    _props$selectOnEnter = props.selectOnEnter,
    selectOnEnter = _props$selectOnEnter === void 0 ? true : _props$selectOnEnter,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'auto-complete' : _props$classPrefix,
    _props$defaultValue = props.defaultValue,
    defaultValue = _props$defaultValue === void 0 ? '' : _props$defaultValue,
    _props$menuAutoWidth = props.menuAutoWidth,
    menuAutoWidth = _props$menuAutoWidth === void 0 ? true : _props$menuAutoWidth,
    data = props.data,
    valueProp = props.value,
    open = props.open,
    style = props.style,
    size = props.size,
    menuClassName = props.menuClassName,
    id = props.id,
    readOnly = props.readOnly,
    plaintext = props.plaintext,
    renderMenu = props.renderMenu,
    renderMenuItem = props.renderMenuItem,
    onSelect = props.onSelect,
    filterBy = props.filterBy,
    onKeyDown = props.onKeyDown,
    onChange = props.onChange,
    onClose = props.onClose,
    onOpen = props.onOpen,
    onFocus = props.onFocus,
    onBlur = props.onBlur,
    onMenuFocus = props.onMenuFocus,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, ["as", "disabled", "className", "placement", "selectOnEnter", "classPrefix", "defaultValue", "menuAutoWidth", "data", "value", "open", "style", "size", "menuClassName", "id", "readOnly", "plaintext", "renderMenu", "renderMenuItem", "onSelect", "filterBy", "onKeyDown", "onChange", "onClose", "onOpen", "onFocus", "onBlur", "onMenuFocus"]);
  var datalist = (0, _utils3.transformData)(data);
  var _useControlled = (0, _utils.useControlled)(valueProp, defaultValue),
    value = _useControlled[0],
    setValue = _useControlled[1];
  var _useState = (0, _react.useState)(false),
    focus = _useState[0],
    setFocus = _useState[1];
  var items = (datalist === null || datalist === void 0 ? void 0 : datalist.filter((0, _utils3.shouldDisplay)(filterBy, value))) || [];
  var hasItems = items.length > 0;
  var _usePickerRef = (0, _Picker.usePickerRef)(ref),
    trigger = _usePickerRef.trigger,
    overlay = _usePickerRef.overlay,
    root = _usePickerRef.root;
  var isMounted = (0, _utils.useIsMounted)();

  // Used to hover the focuse item  when trigger `onKeydown`
  var _useFocusItemValue = (0, _Picker.useFocusItemValue)(value, {
      data: datalist,
      focusToOption: false,
      callback: onMenuFocus,
      target: function target() {
        return overlay.current;
      }
    }),
    focusItemValue = _useFocusItemValue.focusItemValue,
    setFocusItemValue = _useFocusItemValue.setFocusItemValue,
    handleKeyDown = _useFocusItemValue.onKeyDown;
  var handleKeyDownEvent = function handleKeyDownEvent(event) {
    if (!overlay.current) {
      return;
    }
    (0, _Picker.onMenuKeyDown)(event, {
      enter: selectOnEnter ? selectFocusMenuItem : undefined,
      esc: handleClose
    });
    handleKeyDown(event);
    onKeyDown === null || onKeyDown === void 0 ? void 0 : onKeyDown(event);
  };
  var selectFocusMenuItem = function selectFocusMenuItem(event) {
    if (!focusItemValue) {
      return;
    }
    var focusItem = datalist.find(function (item) {
      return (item === null || item === void 0 ? void 0 : item.value) === focusItemValue;
    });
    setValue(focusItemValue);
    setFocusItemValue(focusItemValue);
    handleSelect(focusItem, event);
    if (value !== focusItemValue) {
      handleChangeValue(focusItemValue, event);
    }
    handleClose();
  };
  var handleSelect = (0, _utils.useEventCallback)(function (item, event) {
    onSelect === null || onSelect === void 0 ? void 0 : onSelect(item.value, item, event);
  });
  var handleChangeValue = (0, _utils.useEventCallback)(function (value, event) {
    onChange === null || onChange === void 0 ? void 0 : onChange(value, event);
  });
  var handleChange = function handleChange(value, event) {
    setFocusItemValue('');
    setValue(value);
    setFocus(true);
    handleChangeValue(value, event);
  };
  var handleClose = (0, _utils.useEventCallback)(function () {
    if (isMounted()) {
      setFocus(false);
      onClose === null || onClose === void 0 ? void 0 : onClose();
    }
  });
  var handleOpen = (0, _utils.useEventCallback)(function () {
    setFocus(true);
    onOpen === null || onOpen === void 0 ? void 0 : onOpen();
  });
  var handleItemSelect = (0, _utils.useEventCallback)(function (nextItemValue, item, event) {
    setValue(nextItemValue);
    setFocusItemValue(nextItemValue);
    handleSelect(item, event);
    if (value !== nextItemValue) {
      handleChangeValue(nextItemValue, event);
    }
    handleClose();
  });
  var handleInputFocus = (0, _utils.useEventCallback)(function (event) {
    onFocus === null || onFocus === void 0 ? void 0 : onFocus(event);
    handleOpen();
  });
  var handleInputBlur = (0, _utils.useEventCallback)(function (event) {
    setTimeout(handleClose, 300);
    onBlur === null || onBlur === void 0 ? void 0 : onBlur(event);
  });
  var _useClassNames = (0, _utils.useClassNames)(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge;
  var classes = merge(className, withClassPrefix({
    disabled: disabled
  }));
  var _partitionHTMLProps = (0, _utils.partitionHTMLProps)((0, _omit.default)(rest, _Picker.pickTriggerPropKeys)),
    htmlInputProps = _partitionHTMLProps[0],
    restProps = _partitionHTMLProps[1];
  var renderPopup = function renderPopup(positionProps, speakerRef) {
    var left = positionProps.left,
      top = positionProps.top,
      className = positionProps.className;
    var styles = {
      left: left,
      top: top
    };
    var menu = /*#__PURE__*/_react.default.createElement(_Picker.Listbox, {
      classPrefix: "auto-complete-menu",
      listItemClassPrefix: "auto-complete-item",
      listItemAs: _Picker.ListItem,
      focusItemValue: focusItemValue,
      onSelect: handleItemSelect,
      renderMenuItem: renderMenuItem,
      data: items,
      className: menuClassName
    });
    return /*#__PURE__*/_react.default.createElement(_Picker.PickerPopup, {
      ref: (0, _utils.mergeRefs)(overlay, speakerRef),
      style: styles,
      className: className,
      onKeyDown: handleKeyDownEvent,
      target: trigger,
      autoWidth: menuAutoWidth
    }, renderMenu ? renderMenu(menu) : menu);
  };
  if (plaintext) {
    return /*#__PURE__*/_react.default.createElement(_Plaintext.default, {
      ref: ref,
      localeKey: "unfilled"
    }, typeof value === 'undefined' ? defaultValue : value);
  }
  var expanded = open || focus && hasItems;
  return /*#__PURE__*/_react.default.createElement(_Picker.PickerToggleTrigger, {
    id: id,
    ref: trigger,
    placement: placement,
    pickerProps: (0, _pick.default)(props, _Picker.pickTriggerPropKeys),
    trigger: ['click', 'focus'],
    open: expanded,
    speaker: renderPopup
  }, /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
    className: classes,
    style: style,
    ref: root
  }, restProps), /*#__PURE__*/_react.default.createElement(_Combobox.default, (0, _extends2.default)({}, htmlInputProps, {
    disabled: disabled,
    value: value,
    size: size,
    readOnly: readOnly,
    expanded: expanded,
    focusItemValue: focusItemValue,
    onBlur: handleInputBlur,
    onFocus: handleInputFocus,
    onChange: handleChange,
    onKeyDown: handleKeyDownEvent
  }))));
});
AutoComplete.displayName = 'AutoComplete';
AutoComplete.propTypes = (0, _extends2.default)({}, _utils2.animationPropTypes, {
  data: _propTypes.default.array,
  disabled: _propTypes.default.bool,
  onSelect: _propTypes.default.func,
  onChange: _propTypes.default.func,
  classPrefix: _propTypes.default.string,
  value: _propTypes.default.string,
  defaultValue: _propTypes.default.string,
  className: _propTypes.default.string,
  menuClassName: _propTypes.default.string,
  menuAutoWidth: _propTypes.default.bool,
  placement: (0, _propTypes2.oneOf)(_utils.PLACEMENT),
  onFocus: _propTypes.default.func,
  onMenuFocus: _propTypes.default.func,
  onBlur: _propTypes.default.func,
  onKeyDown: _propTypes.default.func,
  onOpen: _propTypes.default.func,
  onClose: _propTypes.default.func,
  readOnly: _propTypes.default.bool,
  renderMenu: _propTypes.default.func,
  renderMenuItem: _propTypes.default.func,
  style: _propTypes.default.object,
  size: (0, _propTypes2.oneOf)(['lg', 'md', 'sm', 'xs']),
  open: _propTypes.default.bool,
  selectOnEnter: _propTypes.default.bool,
  filterBy: _propTypes.default.func
});
var _default = AutoComplete;
exports.default = _default;