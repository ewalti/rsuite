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
var _utils = require("../utils");
var _ButtonGroupContext = _interopRequireDefault(require("./ButtonGroupContext"));
var _propTypes2 = require("../internals/propTypes");
/**
 * The ButtonGroup component is used to group a series of buttons together in a single line or column.
 * @see https://rsuitejs.com/components/button/#button-group
 */
var ButtonGroup = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'btn-group' : _props$classPrefix,
    _props$role = props.role,
    role = _props$role === void 0 ? 'group' : _props$role,
    className = props.className,
    children = props.children,
    block = props.block,
    vertical = props.vertical,
    justified = props.justified,
    size = props.size,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, ["as", "classPrefix", "role", "className", "children", "block", "vertical", "justified", "size"]);
  var _useClassNames = (0, _utils.useClassNames)(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge;
  var classes = merge(className, withClassPrefix(size, {
    block: block,
    vertical: vertical,
    justified: justified
  }));
  var contextValue = (0, _react.useMemo)(function () {
    return {
      size: size
    };
  }, [size]);
  return /*#__PURE__*/_react.default.createElement(_ButtonGroupContext.default.Provider, {
    value: contextValue
  }, /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({}, rest, {
    role: role,
    ref: ref,
    className: classes
  }), children));
});
ButtonGroup.displayName = 'ButtonGroup';
ButtonGroup.propTypes = {
  className: _propTypes.default.string,
  as: _propTypes.default.elementType,
  classPrefix: _propTypes.default.string,
  children: _propTypes.default.node,
  block: _propTypes.default.bool,
  vertical: _propTypes.default.bool,
  justified: _propTypes.default.bool,
  role: _propTypes.default.string,
  size: (0, _propTypes2.oneOf)(['lg', 'md', 'sm', 'xs'])
};
var _default = ButtonGroup;
exports.default = _default;