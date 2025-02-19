'use client';
"use strict";

exports.__esModule = true;
exports.getSafeCalendarDate = getSafeCalendarDate;
exports.getWeekHoverRange = exports.getMonthHoverRange = exports.isSameRange = void 0;
var _dateUtils = require("../utils/dateUtils");
function getSafeCalendarDate(_ref) {
  var _value;
  var value = _ref.value,
    _ref$calendarKey = _ref.calendarKey,
    calendarKey = _ref$calendarKey === void 0 ? 'start' : _ref$calendarKey,
    allowAameMonth = _ref.allowAameMonth;
  // Update calendarDate if the value is not null
  value = (_value = value) !== null && _value !== void 0 ? _value : [];
  var gap = allowAameMonth ? 0 : 1;
  if (value[0] && value[1]) {
    var diffMonth = (0, _dateUtils.differenceInCalendarMonths)(value[1], value[0]);
    if (calendarKey === 'start') {
      return [value[0], diffMonth <= 0 ? (0, _dateUtils.copyTime)({
        from: value[1],
        to: (0, _dateUtils.addMonths)(value[0], gap)
      }) : value[1]];
    } else if (calendarKey === 'end') {
      return [diffMonth <= 0 ? (0, _dateUtils.copyTime)({
        from: value[0],
        to: (0, _dateUtils.addMonths)(value[1], -gap)
      }) : value[0], value[1]];
    }

    // If only the start date
  } else if (value[0]) {
    return [value[0], (0, _dateUtils.addMonths)(value[0], gap)];
  }
  var todayDate = new Date();
  return [todayDate, (0, _dateUtils.addMonths)(todayDate, gap)];
}
var isSameRange = function isSameRange(source, dest, format) {
  // If both are null, reguard as same
  if (null === source && null === dest) return true;
  // If only one is null, regard as different
  if (null === source || null === dest) return false;
  var result = (0, _dateUtils.isSameDay)(source[0], dest[0]) && (0, _dateUtils.isSameDay)(source[1], dest[1]);
  if ((0, _dateUtils.shouldRenderTime)(format)) {
    result && (result = (0, _dateUtils.isSameSecond)(source[0], dest[0]) && (0, _dateUtils.isSameSecond)(source[1], dest[1]));
  }
  return result;
};
exports.isSameRange = isSameRange;
var getMonthHoverRange = function getMonthHoverRange(date) {
  return [(0, _dateUtils.startOfMonth)(date), (0, _dateUtils.endOfMonth)(date)];
};
exports.getMonthHoverRange = getMonthHoverRange;
var getWeekHoverRange = function getWeekHoverRange(isoWeek, date) {
  if (isoWeek) {
    // set to the first day of this week according to ISO 8601, 12:00 am
    return [(0, _dateUtils.startOfISOWeek)(date), (0, _dateUtils.endOfISOWeek)(date)];
  }
  return [(0, _dateUtils.startOfWeek)(date), (0, _dateUtils.endOfWeek)(date)];
};
exports.getWeekHoverRange = getWeekHoverRange;