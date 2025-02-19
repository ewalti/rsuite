'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.disabledTime = disabledTime;
exports.getMonthView = getMonthView;
exports.copyTime = copyTime;
exports.reverseDateRangeOmitTime = reverseDateRangeOmitTime;
exports.getReversedTimeMeridian = exports.shouldOnlyRenderTime = exports.shouldRenderDate = exports.shouldRenderMonth = exports.shouldRenderTime = exports.omitHideDisabledProps = exports.calendarOnlyProps = exports.lastDayOfMonth = exports.isLastDayOfMonth = exports.differenceInCalendarMonths = exports.set = exports.isValid = exports.isMatch = exports.subDays = exports.startOfWeek = exports.startOfMonth = exports.startOfISOWeek = exports.startOfDay = exports.setYear = exports.setSeconds = exports.setMonth = exports.setMinutes = exports.setHours = exports.setDate = exports.parseISO = exports.parse = exports.isSameSecond = exports.isSameMonth = exports.isSameDay = exports.isEqual = exports.isBefore = exports.isAfter = exports.getYear = exports.getSeconds = exports.getMonth = exports.getMinutes = exports.getHours = exports.getDaysInMonth = exports.getDay = exports.getDate = exports.format = exports.endOfWeek = exports.endOfMonth = exports.endOfISOWeek = exports.endOfDay = exports.compareAsc = exports.addHours = exports.addMinutes = exports.addSeconds = exports.addYears = exports.addMonths = exports.addDays = void 0;
var _pick = _interopRequireDefault(require("lodash/pick"));
var _omitBy = _interopRequireDefault(require("lodash/omitBy"));
var _getHours = _interopRequireDefault(require("date-fns/getHours"));
exports.getHours = _getHours.default;
var _setHours = _interopRequireDefault(require("date-fns/setHours"));
exports.setHours = _setHours.default;
var _getDay = _interopRequireDefault(require("date-fns/getDay"));
exports.getDay = _getDay.default;
var _getMinutes = _interopRequireDefault(require("date-fns/getMinutes"));
exports.getMinutes = _getMinutes.default;
var _getSeconds = _interopRequireDefault(require("date-fns/getSeconds"));
exports.getSeconds = _getSeconds.default;
var _addDays = _interopRequireDefault(require("date-fns/addDays"));
exports.addDays = _addDays.default;
var _set = _interopRequireDefault(require("date-fns/set"));
exports.set = _set.default;
var _isValid = _interopRequireDefault(require("date-fns/isValid"));
exports.isValid = _isValid.default;
var _addMonths = _interopRequireDefault(require("date-fns/addMonths"));
exports.addMonths = _addMonths.default;
var _addYears = _interopRequireDefault(require("date-fns/addYears"));
exports.addYears = _addYears.default;
var _addSeconds = _interopRequireDefault(require("date-fns/addSeconds"));
exports.addSeconds = _addSeconds.default;
var _addMinutes = _interopRequireDefault(require("date-fns/addMinutes"));
exports.addMinutes = _addMinutes.default;
var _addHours = _interopRequireDefault(require("date-fns/addHours"));
exports.addHours = _addHours.default;
var _compareAsc = _interopRequireDefault(require("date-fns/compareAsc"));
exports.compareAsc = _compareAsc.default;
var _endOfDay = _interopRequireDefault(require("date-fns/endOfDay"));
exports.endOfDay = _endOfDay.default;
var _endOfISOWeek = _interopRequireDefault(require("date-fns/endOfISOWeek"));
exports.endOfISOWeek = _endOfISOWeek.default;
var _endOfMonth = _interopRequireDefault(require("date-fns/endOfMonth"));
exports.endOfMonth = _endOfMonth.default;
var _endOfWeek = _interopRequireDefault(require("date-fns/endOfWeek"));
exports.endOfWeek = _endOfWeek.default;
var _format = _interopRequireDefault(require("date-fns/format"));
exports.format = _format.default;
var _getDate = _interopRequireDefault(require("date-fns/getDate"));
exports.getDate = _getDate.default;
var _getDaysInMonth = _interopRequireDefault(require("date-fns/getDaysInMonth"));
exports.getDaysInMonth = _getDaysInMonth.default;
var _getMonth = _interopRequireDefault(require("date-fns/getMonth"));
exports.getMonth = _getMonth.default;
var _getYear = _interopRequireDefault(require("date-fns/getYear"));
exports.getYear = _getYear.default;
var _isAfter = _interopRequireDefault(require("date-fns/isAfter"));
exports.isAfter = _isAfter.default;
var _isBefore = _interopRequireDefault(require("date-fns/isBefore"));
exports.isBefore = _isBefore.default;
var _isEqual = _interopRequireDefault(require("date-fns/isEqual"));
exports.isEqual = _isEqual.default;
var _isSameDay = _interopRequireDefault(require("date-fns/isSameDay"));
exports.isSameDay = _isSameDay.default;
var _isSameMonth = _interopRequireDefault(require("date-fns/isSameMonth"));
exports.isSameMonth = _isSameMonth.default;
var _isSameSecond = _interopRequireDefault(require("date-fns/isSameSecond"));
exports.isSameSecond = _isSameSecond.default;
var _parse = _interopRequireDefault(require("date-fns/parse"));
exports.parse = _parse.default;
var _parseISO = _interopRequireDefault(require("date-fns/parseISO"));
exports.parseISO = _parseISO.default;
var _setDate = _interopRequireDefault(require("date-fns/setDate"));
exports.setDate = _setDate.default;
var _setMinutes = _interopRequireDefault(require("date-fns/setMinutes"));
exports.setMinutes = _setMinutes.default;
var _setMonth = _interopRequireDefault(require("date-fns/setMonth"));
exports.setMonth = _setMonth.default;
var _setSeconds = _interopRequireDefault(require("date-fns/setSeconds"));
exports.setSeconds = _setSeconds.default;
var _setYear = _interopRequireDefault(require("date-fns/setYear"));
exports.setYear = _setYear.default;
var _startOfDay = _interopRequireDefault(require("date-fns/startOfDay"));
exports.startOfDay = _startOfDay.default;
var _startOfISOWeek = _interopRequireDefault(require("date-fns/startOfISOWeek"));
exports.startOfISOWeek = _startOfISOWeek.default;
var _startOfMonth = _interopRequireDefault(require("date-fns/startOfMonth"));
exports.startOfMonth = _startOfMonth.default;
var _startOfWeek = _interopRequireDefault(require("date-fns/startOfWeek"));
exports.startOfWeek = _startOfWeek.default;
var _subDays = _interopRequireDefault(require("date-fns/subDays"));
exports.subDays = _subDays.default;
var _isMatch = _interopRequireDefault(require("date-fns/isMatch"));
exports.isMatch = _isMatch.default;
var _differenceInCalendarMonths = _interopRequireDefault(require("date-fns/differenceInCalendarMonths"));
exports.differenceInCalendarMonths = _differenceInCalendarMonths.default;
var _isLastDayOfMonth = _interopRequireDefault(require("date-fns/isLastDayOfMonth"));
exports.isLastDayOfMonth = _isLastDayOfMonth.default;
var _lastDayOfMonth = _interopRequireDefault(require("date-fns/lastDayOfMonth"));
exports.lastDayOfMonth = _lastDayOfMonth.default;
var disabledTimeProps = ['disabledHours', 'disabledMinutes', 'disabledSeconds'];
var hideTimeProps = ['hideHours', 'hideMinutes', 'hideSeconds'];
var otherProps = ['renderCell', 'cellClassName'];
var calendarOnlyProps = disabledTimeProps.concat(hideTimeProps).concat(otherProps);
exports.calendarOnlyProps = calendarOnlyProps;
function validTime(calendarProps, date) {
  if (!date) {
    return false;
  }
  return Object.keys(calendarProps).some(function (key) {
    if (/(Hours)/.test(key)) {
      var _calendarProps$key;
      return (_calendarProps$key = calendarProps[key]) === null || _calendarProps$key === void 0 ? void 0 : _calendarProps$key.call(calendarProps, (0, _getHours.default)(date), date);
    }
    if (/(Minutes)/.test(key)) {
      var _calendarProps$key2;
      return (_calendarProps$key2 = calendarProps[key]) === null || _calendarProps$key2 === void 0 ? void 0 : _calendarProps$key2.call(calendarProps, (0, _getMinutes.default)(date), date);
    }
    if (/(Seconds)/.test(key)) {
      var _calendarProps$key3;
      return (_calendarProps$key3 = calendarProps[key]) === null || _calendarProps$key3 === void 0 ? void 0 : _calendarProps$key3.call(calendarProps, (0, _getSeconds.default)(date), date);
    }
    return false;
  });
}

/**
 * Verify that the time is valid.
 *
 * @param props
 * @param date
 */
function disabledTime(props, date) {
  var calendarProps = (0, _pick.default)(props, disabledTimeProps);
  return validTime(calendarProps, date);
}
var omitHideDisabledProps = function omitHideDisabledProps(props) {
  return (0, _omitBy.default)(props, function (_val, key) {
    return key.startsWith('disabled') || key.startsWith('hide');
  });
};
exports.omitHideDisabledProps = omitHideDisabledProps;
var shouldRenderTime = function shouldRenderTime(format) {
  return /([Hhms])/.test(format);
};
exports.shouldRenderTime = shouldRenderTime;
var shouldRenderMonth = function shouldRenderMonth(format) {
  return /[Yy]/.test(format) && /[ML]/.test(format);
};
exports.shouldRenderMonth = shouldRenderMonth;
var shouldRenderDate = function shouldRenderDate(format) {
  return /[Yy]/.test(format) && /[ML]/.test(format) && /[Dd]/.test(format);
}; // for date-fns v1 and v2
exports.shouldRenderDate = shouldRenderDate;
var shouldOnlyRenderTime = function shouldOnlyRenderTime(format) {
  return /([Hhms])/.test(format) && !/([YyMDd])/.test(format);
}; // for date-fns v1 and v2

/**
 * Get all weeks of this month
 * @params monthDate
 * @return date[]
 */
exports.shouldOnlyRenderTime = shouldOnlyRenderTime;
function getMonthView(monthDate, isoWeek) {
  var firstDayOfMonth = (0, _getDay.default)(monthDate);
  var distance = 0 - firstDayOfMonth;
  if (isoWeek) {
    distance = 1 - firstDayOfMonth;
    if (firstDayOfMonth === 0) {
      distance = -6;
    }
  }
  var firstWeekendDate = (0, _addDays.default)(monthDate, distance);
  var weeks = [firstWeekendDate];
  var nextWeekendDate = (0, _addDays.default)(firstWeekendDate, 7);
  weeks.push(nextWeekendDate);
  while (weeks.length < 6) {
    nextWeekendDate = (0, _addDays.default)(nextWeekendDate, 7);
    weeks.push(nextWeekendDate);
  }
  return weeks;
}

/**
 * Copy the time of one date to another
 */
function copyTime(_ref) {
  var from = _ref.from,
    to = _ref.to;
  if (!(0, _isValid.default)(from) || !(0, _isValid.default)(to)) {
    return to;
  }
  return (0, _set.default)(to, {
    hours: (0, _getHours.default)(from),
    minutes: (0, _getMinutes.default)(from),
    seconds: (0, _getSeconds.default)(from)
  });
}

/**
 * Swap two dates without swapping the time.
 */
function reverseDateRangeOmitTime(dateRange) {
  var start = dateRange[0],
    end = dateRange[1];
  if (start && end) {
    return [copyTime({
      from: start,
      to: end
    }), copyTime({
      from: end,
      to: start
    })];
  }
  return dateRange;
}

/**
 * Get the time with AM and PM reversed.
 */
var getReversedTimeMeridian = function getReversedTimeMeridian(date) {
  var clonedDate = new Date(date.valueOf());
  var hours = (0, _getHours.default)(clonedDate);
  var nextHours = hours >= 12 ? hours - 12 : hours + 12;
  return (0, _setHours.default)(clonedDate, nextHours);
};
exports.getReversedTimeMeridian = getReversedTimeMeridian;