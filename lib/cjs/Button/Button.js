'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _taggedTemplateLiteralLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteralLoose"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _ButtonGroup = require("../ButtonGroup");
var _SafeAnchor = _interopRequireDefault(require("../SafeAnchor"));
var _Ripple = _interopRequireDefault(require("../internals/Ripple"));
var _utils = require("../utils");
var _propTypes2 = require("../internals/propTypes");
var _templateObject, _templateObject2, _templateObject3;
/**
 * The Button component is used to trigger a custom action.
 * @see https://rsuitejs.com/components/button
 */
var Button = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var as = props.as,
    active = props.active,
    _props$appearance = props.appearance,
    appearance = _props$appearance === void 0 ? 'default' : _props$appearance,
    block = props.block,
    className = props.className,
    children = props.children,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'btn' : _props$classPrefix,
    color = props.color,
    disabled = props.disabled,
    loading = props.loading,
    _props$ripple = props.ripple,
    ripple = _props$ripple === void 0 ? true : _props$ripple,
    sizeProp = props.size,
    startIcon = props.startIcon,
    endIcon = props.endIcon,
    typeProp = props.type,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, ["as", "active", "appearance", "block", "className", "children", "classPrefix", "color", "disabled", "loading", "ripple", "size", "startIcon", "endIcon", "type"]);
  var buttonGroup = (0, _react.useContext)(_ButtonGroup.ButtonGroupContext);
  var size = sizeProp !== null && sizeProp !== void 0 ? sizeProp : buttonGroup === null || buttonGroup === void 0 ? void 0 : buttonGroup.size;
  var _useClassNames = (0, _utils.useClassNames)(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    prefix = _useClassNames.prefix,
    merge = _useClassNames.merge;
  var classes = merge(className, withClassPrefix(appearance, color, size, {
    active: active,
    disabled: disabled,
    loading: loading,
    block: block
  }));
  var renderButtonContent = (0, _react.useCallback)(function () {
    var spin = /*#__PURE__*/_react.default.createElement("span", {
      className: prefix(_templateObject || (_templateObject = (0, _taggedTemplateLiteralLoose2.default)(["spin"])))
    });
    var rippleElement = ripple && !(0, _utils.isOneOf)(appearance, ['link', 'ghost']) ? /*#__PURE__*/_react.default.createElement(_Ripple.default, null) : null;
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, loading && spin, startIcon ? /*#__PURE__*/_react.default.createElement("span", {
      className: prefix(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteralLoose2.default)(["start-icon"])))
    }, startIcon) : null, children, endIcon ? /*#__PURE__*/_react.default.createElement("span", {
      className: prefix(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteralLoose2.default)(["end-icon"])))
    }, endIcon) : null, rippleElement);
  }, [appearance, children, endIcon, loading, prefix, ripple, startIcon]);
  if (rest.href) {
    return /*#__PURE__*/_react.default.createElement(_SafeAnchor.default, (0, _extends2.default)({}, rest, {
      as: as,
      ref: ref,
      "aria-disabled": disabled,
      disabled: disabled,
      className: classes
    }), renderButtonContent());
  }
  var Component = as || 'button';
  var type = typeProp || (Component === 'button' ? 'button' : undefined);
  var role = rest.role || (Component !== 'button' ? 'button' : undefined);
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({}, rest, {
    role: role,
    type: type,
    ref: ref,
    disabled: disabled,
    "aria-disabled": disabled,
    className: classes
  }), renderButtonContent());
});
Button.displayName = 'Button';
Button.propTypes = {
  as: _propTypes.default.elementType,
  active: _propTypes.default.bool,
  appearance: (0, _propTypes2.oneOf)(['default', 'primary', 'link', 'subtle', 'ghost']),
  block: _propTypes.default.bool,
  children: _propTypes.default.node,
  color: (0, _propTypes2.oneOf)(['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']),
  disabled: _propTypes.default.bool,
  href: _propTypes.default.string,
  loading: _propTypes.default.bool,
  ripple: _propTypes.default.bool,
  size: (0, _propTypes2.oneOf)(['lg', 'md', 'sm', 'xs']),
  type: (0, _propTypes2.oneOf)(['button', 'reset', 'submit'])
};
var _default = Button;
exports.default = _default;