'use client';
import { addMonths, isSameDay, shouldRenderTime, isSameSecond, startOfMonth, endOfMonth, startOfISOWeek, endOfISOWeek, startOfWeek, endOfWeek, differenceInCalendarMonths, copyTime } from '../utils/dateUtils';
export function getSafeCalendarDate(_ref) {
  var _value;
  var value = _ref.value,
    _ref$calendarKey = _ref.calendarKey,
    calendarKey = _ref$calendarKey === void 0 ? 'start' : _ref$calendarKey,
    allowAameMonth = _ref.allowAameMonth;
  // Update calendarDate if the value is not null
  value = (_value = value) !== null && _value !== void 0 ? _value : [];
  var gap = allowAameMonth ? 0 : 1;
  if (value[0] && value[1]) {
    var diffMonth = differenceInCalendarMonths(value[1], value[0]);
    if (calendarKey === 'start') {
      return [value[0], diffMonth <= 0 ? copyTime({
        from: value[1],
        to: addMonths(value[0], gap)
      }) : value[1]];
    } else if (calendarKey === 'end') {
      return [diffMonth <= 0 ? copyTime({
        from: value[0],
        to: addMonths(value[1], -gap)
      }) : value[0], value[1]];
    }

    // If only the start date
  } else if (value[0]) {
    return [value[0], addMonths(value[0], gap)];
  }
  var todayDate = new Date();
  return [todayDate, addMonths(todayDate, gap)];
}
export var isSameRange = function isSameRange(source, dest, format) {
  // If both are null, reguard as same
  if (null === source && null === dest) return true;
  // If only one is null, regard as different
  if (null === source || null === dest) return false;
  var result = isSameDay(source[0], dest[0]) && isSameDay(source[1], dest[1]);
  if (shouldRenderTime(format)) {
    result && (result = isSameSecond(source[0], dest[0]) && isSameSecond(source[1], dest[1]));
  }
  return result;
};
export var getMonthHoverRange = function getMonthHoverRange(date) {
  return [startOfMonth(date), endOfMonth(date)];
};
export var getWeekHoverRange = function getWeekHoverRange(isoWeek, date) {
  if (isoWeek) {
    // set to the first day of this week according to ISO 8601, 12:00 am
    return [startOfISOWeek(date), endOfISOWeek(date)];
  }
  return [startOfWeek(date), endOfWeek(date)];
};