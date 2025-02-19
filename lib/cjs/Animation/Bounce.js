'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _Transition = _interopRequireDefault(require("./Transition"));
var _utils = require("../utils");
/**
 * Bounce animation component
 * @see https://rsuitejs.com/components/animation/#bounce
 */
var Bounce = /*#__PURE__*/_react.default.forwardRef(function (_ref, ref) {
  var _ref$timeout = _ref.timeout,
    timeout = _ref$timeout === void 0 ? 300 : _ref$timeout,
    props = (0, _objectWithoutPropertiesLoose2.default)(_ref, ["timeout"]);
  var _useClassNames = (0, _utils.useClassNames)('anim'),
    prefix = _useClassNames.prefix;
  return /*#__PURE__*/_react.default.createElement(_Transition.default, (0, _extends2.default)({}, props, {
    ref: ref,
    animation: true,
    timeout: timeout,
    enteringClassName: prefix('bounce-in'),
    enteredClassName: prefix('bounce-in'),
    exitingClassName: prefix('bounce-out'),
    exitedClassName: prefix('bounce-out')
  }));
});
Bounce.displayName = 'Bounce';
var _default = Bounce;
exports.default = _default;