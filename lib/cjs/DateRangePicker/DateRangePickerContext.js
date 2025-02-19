'use client';
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");
exports.__esModule = true;
exports.useDateRangePickerContext = exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var DateRangePickerContext = /*#__PURE__*/_react.default.createContext({});
var _default = DateRangePickerContext;
exports.default = _default;
var useDateRangePickerContext = function useDateRangePickerContext() {
  return (0, _react.useContext)(DateRangePickerContext) || {};
};
exports.useDateRangePickerContext = useDateRangePickerContext;