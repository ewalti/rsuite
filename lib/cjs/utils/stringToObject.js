'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _isObject = _interopRequireDefault(require("lodash/isObject"));
// FIXME Never used
var _default = function _default(value, labelKey, valueKey) {
  if ((0, _isObject.default)(value)) {
    return value;
  }
  if (labelKey && valueKey) {
    var _ref;
    return _ref = {}, _ref[labelKey] = value, _ref[valueKey] = value, _ref;
  }
  return null;
};
exports.default = _default;