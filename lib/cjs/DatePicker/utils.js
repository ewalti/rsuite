'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.getDefaultRanges = getDefaultRanges;
exports.splitRanges = splitRanges;
exports.getRanges = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _dateUtils = require("../utils/dateUtils");
function getDefaultRanges(value) {
  var today = new Date();

  /**
   * If it is an array type, it returns the default shortcut key suitable for DateRangePicker Toolbar,
   * otherwise it returns the default shortcut key suitable for DatePicker Toolbar
   */
  if (value instanceof Array) {
    return [{
      label: 'today',
      value: [(0, _dateUtils.startOfDay)(today), (0, _dateUtils.endOfDay)(today)]
    }, {
      label: 'yesterday',
      value: [(0, _dateUtils.startOfDay)((0, _dateUtils.subDays)(today, 1)), (0, _dateUtils.endOfDay)((0, _dateUtils.subDays)(today, 1))]
    }, {
      label: 'last7Days',
      value: [(0, _dateUtils.startOfDay)((0, _dateUtils.subDays)(today, 6)), (0, _dateUtils.endOfDay)(today)]
    }];
  }
  return [{
    label: 'today',
    value: today
  }, {
    label: 'yesterday',
    value: (0, _dateUtils.subDays)(today, 1)
  }];
}
var generateRangesIterator = function generateRangesIterator(_ref) {
  var calendarDate = _ref.calendarDate;
  return function (_ref2) {
    var value = _ref2.value,
      rest = (0, _objectWithoutPropertiesLoose2.default)(_ref2, ["value"]);
    return (0, _extends2.default)({
      value: typeof value === 'function' ? value(calendarDate) : value
    }, rest);
  };
};

/**
 * get Toolbar ranges from Toolbar props
 * @param ranges
 * @param calendarDate
 */
var getRanges = function getRanges(_ref3) {
  var ranges = _ref3.ranges,
    calendarDate = _ref3.calendarDate;
  return typeof ranges === 'undefined' ? getDefaultRanges(calendarDate) : ranges.map(generateRangesIterator({
    calendarDate: calendarDate
  }));
};
exports.getRanges = getRanges;
function splitRanges(ranges) {
  // The shortcut option on the left side of the calendar panel
  var sideRanges = (ranges === null || ranges === void 0 ? void 0 : ranges.filter(function (range) {
    return (range === null || range === void 0 ? void 0 : range.placement) === 'left';
  })) || [];

  // The shortcut option on the bottom of the calendar panel
  var bottomRanges = (ranges === null || ranges === void 0 ? void 0 : ranges.filter(function (range) {
    return (range === null || range === void 0 ? void 0 : range.placement) === 'bottom' || (range === null || range === void 0 ? void 0 : range.placement) === undefined;
  })) || [];
  return {
    sideRanges: sideRanges,
    bottomRanges: bottomRanges
  };
}