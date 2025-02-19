'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _utils = require("../utils");
/**
 * The Grid component is used to specify the layout of child elements in rows and columns.
 * @see https://rsuitejs.com/components/grid
 */
var Grid = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'grid-container' : _props$classPrefix,
    className = props.className,
    fluid = props.fluid,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, ["as", "classPrefix", "className", "fluid"]);
  var _useClassNames = (0, _utils.useClassNames)(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    prefix = _useClassNames.prefix,
    merge = _useClassNames.merge;
  var classes = merge(className, fluid ? prefix({
    fluid: fluid
  }) : withClassPrefix());
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
    role: "grid"
  }, rest, {
    ref: ref,
    className: classes
  }));
});
Grid.displayName = 'Grid';
Grid.propTypes = {
  className: _propTypes.default.string,
  fluid: _propTypes.default.bool,
  classPrefix: _propTypes.default.string,
  as: _propTypes.default.elementType
};
var _default = Grid;
exports.default = _default;