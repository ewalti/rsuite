'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _utils = require("../../utils");
var _useCombobox2 = _interopRequireDefault(require("./hooks/useCombobox"));
var ListItem = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    _props$role = props.role,
    role = _props$role === void 0 ? 'option' : _props$role,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'dropdown-menu-item' : _props$classPrefix,
    active = props.active,
    children = props.children,
    className = props.className,
    disabled = props.disabled,
    focus = props.focus,
    value = props.value,
    onKeyDown = props.onKeyDown,
    onSelect = props.onSelect,
    renderItem = props.renderItem,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, ["as", "role", "classPrefix", "active", "children", "className", "disabled", "focus", "value", "onKeyDown", "onSelect", "renderItem"]);
  var _useCombobox = (0, _useCombobox2.default)(),
    id = _useCombobox.id;
  var handleClick = (0, _utils.useEventCallback)(function (event) {
    event.preventDefault();
    if (!disabled) {
      onSelect === null || onSelect === void 0 ? void 0 : onSelect(value, event);
    }
  });
  var _useClassNames = (0, _utils.useClassNames)(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix;
  var classes = withClassPrefix({
    active: active,
    focus: focus,
    disabled: disabled
  });
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
    role: role,
    "aria-selected": active,
    "aria-disabled": disabled,
    id: id ? id + "-opt-" + value : undefined,
    "data-key": value
  }, rest, {
    ref: ref,
    className: className,
    tabIndex: -1,
    onKeyDown: disabled ? null : onKeyDown,
    onClick: handleClick
  }), /*#__PURE__*/_react.default.createElement("span", {
    className: classes
  }, renderItem ? renderItem(value) : children));
});
ListItem.displayName = 'ListItem';
var _default = ListItem;
exports.default = _default;