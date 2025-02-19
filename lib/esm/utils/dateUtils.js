'use client';
import pick from 'lodash/pick';
import omitBy from 'lodash/omitBy';
import getHours from 'date-fns/getHours';
import setHours from 'date-fns/setHours';
import getDay from 'date-fns/getDay';
import getMinutes from 'date-fns/getMinutes';
import getSeconds from 'date-fns/getSeconds';
import addDays from 'date-fns/addDays';
import set from 'date-fns/set';
import isValid from 'date-fns/isValid';
export { default as addDays } from 'date-fns/addDays';
export { default as addMonths } from 'date-fns/addMonths';
export { default as addYears } from 'date-fns/addYears';
export { default as addSeconds } from 'date-fns/addSeconds';
export { default as addMinutes } from 'date-fns/addMinutes';
export { default as addHours } from 'date-fns/addHours';
export { default as compareAsc } from 'date-fns/compareAsc';
export { default as endOfDay } from 'date-fns/endOfDay';
export { default as endOfISOWeek } from 'date-fns/endOfISOWeek';
export { default as endOfMonth } from 'date-fns/endOfMonth';
export { default as endOfWeek } from 'date-fns/endOfWeek';
export { default as format } from 'date-fns/format';
export { default as getDate } from 'date-fns/getDate';
export { default as getDay } from 'date-fns/getDay';
export { default as getDaysInMonth } from 'date-fns/getDaysInMonth';
export { default as getHours } from 'date-fns/getHours';
export { default as getMinutes } from 'date-fns/getMinutes';
export { default as getMonth } from 'date-fns/getMonth';
export { default as getSeconds } from 'date-fns/getSeconds';
export { default as getYear } from 'date-fns/getYear';
export { default as isAfter } from 'date-fns/isAfter';
export { default as isBefore } from 'date-fns/isBefore';
export { default as isEqual } from 'date-fns/isEqual';
export { default as isSameDay } from 'date-fns/isSameDay';
export { default as isSameMonth } from 'date-fns/isSameMonth';
export { default as isSameSecond } from 'date-fns/isSameSecond';
export { default as parse } from 'date-fns/parse';
export { default as parseISO } from 'date-fns/parseISO';
export { default as setDate } from 'date-fns/setDate';
export { default as setHours } from 'date-fns/setHours';
export { default as setMinutes } from 'date-fns/setMinutes';
export { default as setMonth } from 'date-fns/setMonth';
export { default as setSeconds } from 'date-fns/setSeconds';
export { default as setYear } from 'date-fns/setYear';
export { default as startOfDay } from 'date-fns/startOfDay';
export { default as startOfISOWeek } from 'date-fns/startOfISOWeek';
export { default as startOfMonth } from 'date-fns/startOfMonth';
export { default as startOfWeek } from 'date-fns/startOfWeek';
export { default as subDays } from 'date-fns/subDays';
export { default as isMatch } from 'date-fns/isMatch';
export { default as isValid } from 'date-fns/isValid';
export { default as set } from 'date-fns/set';
export { default as differenceInCalendarMonths } from 'date-fns/differenceInCalendarMonths';
export { default as isLastDayOfMonth } from 'date-fns/isLastDayOfMonth';
export { default as lastDayOfMonth } from 'date-fns/lastDayOfMonth';
var disabledTimeProps = ['disabledHours', 'disabledMinutes', 'disabledSeconds'];
var hideTimeProps = ['hideHours', 'hideMinutes', 'hideSeconds'];
var otherProps = ['renderCell', 'cellClassName'];
export var calendarOnlyProps = disabledTimeProps.concat(hideTimeProps).concat(otherProps);
function validTime(calendarProps, date) {
  if (!date) {
    return false;
  }
  return Object.keys(calendarProps).some(function (key) {
    if (/(Hours)/.test(key)) {
      var _calendarProps$key;
      return (_calendarProps$key = calendarProps[key]) === null || _calendarProps$key === void 0 ? void 0 : _calendarProps$key.call(calendarProps, getHours(date), date);
    }
    if (/(Minutes)/.test(key)) {
      var _calendarProps$key2;
      return (_calendarProps$key2 = calendarProps[key]) === null || _calendarProps$key2 === void 0 ? void 0 : _calendarProps$key2.call(calendarProps, getMinutes(date), date);
    }
    if (/(Seconds)/.test(key)) {
      var _calendarProps$key3;
      return (_calendarProps$key3 = calendarProps[key]) === null || _calendarProps$key3 === void 0 ? void 0 : _calendarProps$key3.call(calendarProps, getSeconds(date), date);
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
export function disabledTime(props, date) {
  var calendarProps = pick(props, disabledTimeProps);
  return validTime(calendarProps, date);
}
export var omitHideDisabledProps = function omitHideDisabledProps(props) {
  return omitBy(props, function (_val, key) {
    return key.startsWith('disabled') || key.startsWith('hide');
  });
};
export var shouldRenderTime = function shouldRenderTime(format) {
  return /([Hhms])/.test(format);
};
export var shouldRenderMonth = function shouldRenderMonth(format) {
  return /[Yy]/.test(format) && /[ML]/.test(format);
};
export var shouldRenderDate = function shouldRenderDate(format) {
  return /[Yy]/.test(format) && /[ML]/.test(format) && /[Dd]/.test(format);
}; // for date-fns v1 and v2

export var shouldOnlyRenderTime = function shouldOnlyRenderTime(format) {
  return /([Hhms])/.test(format) && !/([YyMDd])/.test(format);
}; // for date-fns v1 and v2

/**
 * Get all weeks of this month
 * @params monthDate
 * @return date[]
 */
export function getMonthView(monthDate, isoWeek) {
  var firstDayOfMonth = getDay(monthDate);
  var distance = 0 - firstDayOfMonth;
  if (isoWeek) {
    distance = 1 - firstDayOfMonth;
    if (firstDayOfMonth === 0) {
      distance = -6;
    }
  }
  var firstWeekendDate = addDays(monthDate, distance);
  var weeks = [firstWeekendDate];
  var nextWeekendDate = addDays(firstWeekendDate, 7);
  weeks.push(nextWeekendDate);
  while (weeks.length < 6) {
    nextWeekendDate = addDays(nextWeekendDate, 7);
    weeks.push(nextWeekendDate);
  }
  return weeks;
}

/**
 * Copy the time of one date to another
 */
export function copyTime(_ref) {
  var from = _ref.from,
    to = _ref.to;
  if (!isValid(from) || !isValid(to)) {
    return to;
  }
  return set(to, {
    hours: getHours(from),
    minutes: getMinutes(from),
    seconds: getSeconds(from)
  });
}

/**
 * Swap two dates without swapping the time.
 */
export function reverseDateRangeOmitTime(dateRange) {
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
export var getReversedTimeMeridian = function getReversedTimeMeridian(date) {
  var clonedDate = new Date(date.valueOf());
  var hours = getHours(clonedDate);
  var nextHours = hours >= 12 ? hours - 12 : hours + 12;
  return setHours(clonedDate, nextHours);
};