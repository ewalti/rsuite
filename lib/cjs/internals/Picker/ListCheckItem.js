'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _utils = require("../../utils");
var _Checkbox = _interopRequireDefault(require("../../Checkbox"));
var _useCombobox2 = _interopRequireDefault(require("./hooks/useCombobox"));
var ListCheckItem = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _props$active = props.active,
    active = _props$active === void 0 ? false : _props$active,
    _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    _props$checkboxAs = props.checkboxAs,
    CheckboxItem = _props$checkboxAs === void 0 ? _Checkbox.default : _props$checkboxAs,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'check-item' : _props$classPrefix,
    _props$checkable = props.checkable,
    checkable = _props$checkable === void 0 ? true : _props$checkable,
    disabled = props.disabled,
    value = props.value,
    focus = props.focus,
    children = props.children,
    className = props.className,
    indeterminate = props.indeterminate,
    onKeyDown = props.onKeyDown,
    onSelect = props.onSelect,
    onCheck = props.onCheck,
    onSelectItem = props.onSelectItem,
    renderMenuItemCheckbox = props.renderMenuItemCheckbox,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, ["active", "as", "checkboxAs", "classPrefix", "checkable", "disabled", "value", "focus", "children", "className", "indeterminate", "onKeyDown", "onSelect", "onCheck", "onSelectItem", "renderMenuItemCheckbox"]);
  var handleChange = (0, _utils.useEventCallback)(function (value, checked, event) {
    onSelect === null || onSelect === void 0 ? void 0 : onSelect(value, event, checked);
  });
  var handleCheck = (0, _utils.useEventCallback)(function (event) {
    if (!disabled) {
      onCheck === null || onCheck === void 0 ? void 0 : onCheck(value, event, !active);
    }
  });
  var handleSelectItem = (0, _utils.useEventCallback)(function (event) {
    if (!disabled) {
      onSelectItem === null || onSelectItem === void 0 ? void 0 : onSelectItem(value, event, !active);
    }
  });
  var _useCombobox = (0, _useCombobox2.default)(),
    id = _useCombobox.id;
  var _useClassNames = (0, _utils.useClassNames)(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix;
  var checkboxItemClasses = withClassPrefix({
    focus: focus
  });
  var checkboxProps = {
    value: value,
    disabled: disabled,
    indeterminate: indeterminate,
    checkable: checkable,
    children: children,
    checked: active,
    className: checkboxItemClasses,
    onKeyDown: disabled ? undefined : onKeyDown,
    onChange: handleChange,
    onClick: handleSelectItem,
    onCheckboxClick: handleCheck
  };
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
    role: "option",
    "aria-selected": active,
    "aria-disabled": disabled,
    id: id ? id + "-opt-" + value : undefined,
    "data-key": value
  }, rest, {
    ref: ref,
    className: className,
    tabIndex: -1
  }), renderMenuItemCheckbox ? renderMenuItemCheckbox(checkboxProps) : /*#__PURE__*/_react.default.createElement(CheckboxItem, (0, _extends2.default)({
    role: "checkbox"
  }, checkboxProps)));
});
ListCheckItem.displayName = 'ListCheckItem';
var _default = ListCheckItem;
exports.default = _default;