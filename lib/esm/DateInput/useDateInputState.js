'use client';
import { useEffect } from 'react';
import startCase from 'lodash/startCase';
import { addDays, addMonths, addYears, addHours, addMinutes, addSeconds, format, isLastDayOfMonth, lastDayOfMonth, isValid } from '../utils/dateUtils';
import { useDateField, patternMap } from './DateField';
export function useDateInputState(_ref) {
  var formatStr = _ref.formatStr,
    locale = _ref.locale,
    date = _ref.date,
    isControlledDate = _ref.isControlledDate;
  var _useDateField = useDateField(formatStr, locale.localize, date),
    dateField = _useDateField.dateField,
    dispatch = _useDateField.dispatch,
    toDateString = _useDateField.toDateString,
    toDate = _useDateField.toDate,
    isEmptyValue = _useDateField.isEmptyValue;
  var setDateOffset = function setDateOffset(pattern, offset, callback) {
    var currentDate = new Date();
    var year = dateField.year || currentDate.getFullYear();
    var month = dateField.month ? dateField.month - 1 : currentDate.getMonth();
    var day = dateField.day || 0;
    var hour = dateField.hour || 0;
    var minute = dateField.minute || 0;
    var second = dateField.second || 0;
    var actionName;
    var value;
    switch (pattern) {
      case 'y':
        actionName = 'setYear';
        value = addYears(new Date(year, 0), offset).getFullYear();
        break;
      case 'M':
        actionName = 'setMonth';
        value = addMonths(new Date(year, month), offset).getMonth() + 1;
        break;
      case 'd':
        actionName = 'setDay';
        var prevDate = new Date(year, month, day);
        value = addDays(prevDate, offset).getDate();
        if (offset > 0) {
          value = isLastDayOfMonth(prevDate) ? 1 : value;
        } else {
          value = prevDate.getDate() === 1 ? lastDayOfMonth(prevDate).getDate() : value;
        }
        break;
      case 'H':
      case 'h':
        actionName = 'setHour';
        value = addHours(new Date(year, month, day, hour), offset).getHours();
        break;
      case 'm':
        actionName = 'setMinute';
        value = addMinutes(new Date(year, month, day, hour, minute), offset).getMinutes();
        break;
      case 's':
        actionName = 'setSecond';
        value = addSeconds(new Date(year, month, day, hour, minute, second), offset).getSeconds();
        break;
      case 'a':
        actionName = 'setHour';
        value = hour >= 12 ? hour - 12 : hour + 12;
        break;
    }
    if (actionName && value) {
      dispatch({
        type: actionName,
        value: value
      });
      var field = patternMap[pattern];
      callback === null || callback === void 0 ? void 0 : callback(toDate(field, value));
    }
  };
  var setDateField = function setDateField(pattern, value, callback) {
    var field = patternMap[pattern];
    var actionName = "set" + startCase(field);
    dispatch({
      type: actionName,
      value: value
    });
    callback === null || callback === void 0 ? void 0 : callback(toDate(field, value));
  };
  var getDateField = function getDateField(pattern) {
    var fieldName = patternMap[pattern];
    return {
      name: fieldName,
      value: dateField[fieldName]
    };
  };
  var toControlledDateString = function toControlledDateString() {
    if (date && isValid(date)) {
      return format(date, formatStr, {
        locale: locale
      });
    }
    // if date is not valid, return uncontrolled date string
    return toDateString();
  };
  useEffect(function () {
    if (isControlledDate) {
      if (date && isValid(date)) {
        dispatch({
          type: 'setNewDate',
          value: date
        });
      } else if (date === null) {
        dispatch({
          type: 'setNewDate',
          value: null
        });
      }
    }
  }, [date, dispatch, isControlledDate]);
  return {
    dateField: dateField,
    setDateOffset: setDateOffset,
    setDateField: setDateField,
    getDateField: getDateField,
    toDateString: isControlledDate ? toControlledDateString : toDateString,
    isEmptyValue: isEmptyValue
  };
}
export default useDateInputState;