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
var _Check = _interopRequireDefault(require("@rsuite/icons/Check"));
var _Stack = _interopRequireDefault(require("../Stack"));
var _RadioTileGroup = require("../RadioTileGroup/RadioTileGroup");
var _utils = require("../utils");
var _useUniqueId = _interopRequireDefault(require("../utils/useUniqueId"));
/**
 * A series of selectable tile components that behave like Radio.
 * @version 5.35.0
 * @see https://rsuitejs.com/components/radio-tile/
 */
var RadioTile = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useContext = (0, _react.useContext)(_RadioTileGroup.RadioTileContext),
    groupValue = _useContext.value,
    nameContext = _useContext.name,
    disabledContext = _useContext.disabled,
    onGroupChange = _useContext.onChange;
  var _props$as = props.as,
    Component = _props$as === void 0 ? _Stack.default : _props$as,
    children = props.children,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'radio-tile' : _props$classPrefix,
    checkedProp = props.checked,
    className = props.className,
    defaultChecked = props.defaultChecked,
    _props$disabled = props.disabled,
    disabled = _props$disabled === void 0 ? disabledContext : _props$disabled,
    icon = props.icon,
    value = props.value,
    label = props.label,
    _props$name = props.name,
    name = _props$name === void 0 ? nameContext : _props$name,
    _props$tabIndex = props.tabIndex,
    tabIndex = _props$tabIndex === void 0 ? 0 : _props$tabIndex,
    onChange = props.onChange,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, ["as", "children", "classPrefix", "checked", "className", "defaultChecked", "disabled", "icon", "value", "label", "name", "tabIndex", "onChange"]);
  var _useControlled = (0, _utils.useControlled)(typeof groupValue !== 'undefined' ? groupValue === value : checkedProp, defaultChecked || false),
    checked = _useControlled[0],
    setChecked = _useControlled[1];
  var _partitionHTMLProps = (0, _utils.partitionHTMLProps)(rest),
    htmlInputProps = _partitionHTMLProps[0],
    restProps = _partitionHTMLProps[1];
  var _useClassNames = (0, _utils.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix,
    prefix = _useClassNames.prefix;
  var handleChange = (0, _react.useCallback)(function (event) {
    setChecked(true);
    onGroupChange === null || onGroupChange === void 0 ? void 0 : onGroupChange(value, event);
    onChange === null || onChange === void 0 ? void 0 : onChange(value, event);
  }, [onChange, onGroupChange, setChecked, value]);
  var classes = merge(className, withClassPrefix({
    checked: checked,
    disabled: disabled
  }));
  var radioId = (0, _useUniqueId.default)('radio-');
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
    spacing: 6
  }, restProps, {
    childrenRenderMode: "clone",
    ref: ref,
    className: classes,
    as: "label"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: prefix('icon')
  }, icon), /*#__PURE__*/_react.default.createElement("div", {
    className: prefix('body')
  }, /*#__PURE__*/_react.default.createElement("input", (0, _extends2.default)({}, htmlInputProps, {
    type: "radio",
    name: name,
    value: value,
    checked: checked,
    tabIndex: tabIndex,
    disabled: disabled,
    onChange: handleChange,
    "aria-checked": checked,
    "aria-disabled": disabled,
    "aria-labelledby": radioId + "-label",
    "aria-describedby": radioId + "-desc"
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: prefix('label'),
    id: radioId + "-label"
  }, label), /*#__PURE__*/_react.default.createElement("div", {
    className: prefix('content'),
    id: radioId + "-desc"
  }, children), /*#__PURE__*/_react.default.createElement("div", {
    className: prefix('mark')
  }, /*#__PURE__*/_react.default.createElement(_Check.default, {
    className: prefix('mark-icon')
  }))));
});
RadioTile.displayName = 'RadioTile';
RadioTile.propTypes = {
  children: _propTypes.default.node,
  classPrefix: _propTypes.default.string,
  checked: _propTypes.default.bool,
  defaultChecked: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  icon: _propTypes.default.node,
  label: _propTypes.default.node,
  name: _propTypes.default.string,
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  onChange: _propTypes.default.func
};
var _default = RadioTile;
exports.default = _default;