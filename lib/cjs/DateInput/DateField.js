'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.useDateField = exports.DateField = exports.patternMap = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));
var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));
var _react = require("react");
var _isValid = _interopRequireDefault(require("date-fns/isValid"));
var _utils = require("./utils");
var patternMap = {
  y: 'year',
  M: 'month',
  d: 'day',
  H: 'hour',
  h: 'hour',
  m: 'minute',
  s: 'second',
  a: 'meridian'
};
exports.patternMap = patternMap;
var DateField = /*#__PURE__*/function (_Object) {
  (0, _inheritsLoose2.default)(DateField, _Object);
  function DateField(format, value) {
    var _this;
    _this = _Object.call(this) || this;
    _this.format = void 0;
    _this.patternArray = [];
    _this.year = null;
    _this.month = null;
    _this.day = null;
    _this.hour = null;
    _this.minute = null;
    _this.second = null;
    _this.format = format;
    var formatArray = format.match(new RegExp('([y|d|M|H|h|m|s|a])+', 'ig')) || [];
    _this.patternArray = formatArray.map(function (pattern) {
      return {
        pattern: pattern,
        key: patternMap[pattern[0]]
      };
    });
    if (value && (0, _isValid.default)(value)) {
      _this.year = value.getFullYear();
      _this.month = value.getMonth() + 1;
      _this.day = value.getDate();
      _this.hour = value.getHours();
      _this.minute = value.getMinutes();
      _this.second = value.getSeconds();
    }
    return _this;
  }
  return DateField;
}( /*#__PURE__*/(0, _wrapNativeSuper2.default)(Object));
/**
 * Pad a number with zeros to the left.
 */
exports.DateField = DateField;
function padNumber(number, length) {
  var numberString = String(number);
  if (numberString.length >= length) {
    return numberString;
  }
  var paddingCount = length - numberString.length;
  for (var i = 0; i < paddingCount; i++) {
    numberString = '0' + numberString;
  }
  return numberString;
}
var useDateField = function useDateField(format, localize, date) {
  var _useReducer = (0, _react.useReducer)(function (state, action) {
      switch (action.type) {
        case 'setYear':
          return (0, _extends2.default)({}, state, {
            year: action.value
          });
        case 'setMonth':
          return (0, _extends2.default)({}, state, {
            month: action.value
          });
        case 'setDay':
          return (0, _extends2.default)({}, state, {
            day: action.value
          });
        case 'setHour':
          return (0, _extends2.default)({}, state, {
            hour: action.value
          });
        case 'setMinute':
          return (0, _extends2.default)({}, state, {
            minute: action.value
          });
        case 'setSecond':
          return (0, _extends2.default)({}, state, {
            second: action.value
          });
        case 'setNewDate':
          return new DateField(format, action.value);
        default:
          return state;
      }
    }, new DateField(format, date)),
    dateField = _useReducer[0],
    dispatch = _useReducer[1];
  var toDateString = function toDateString() {
    var str = format;
    dateField.patternArray.forEach(function (item) {
      var key = item.key,
        pattern = item.pattern;
      var hour = dateField.hour;
      var value = dateField[key];
      if (value !== null) {
        if (pattern === 'MMM' && typeof value === 'number') {
          value = localize === null || localize === void 0 ? void 0 : localize.month(value - 1, {
            width: 'abbreviated'
          });
        } else if (pattern === 'MMMM' && typeof value === 'number') {
          value = localize === null || localize === void 0 ? void 0 : localize.month(value - 1, {
            width: 'wide'
          });
        } else if (pattern === 'aa') {
          if (typeof hour === 'number') {
            value = hour > 12 ? 'PM' : 'AM';
          } else {
            value = 'aa';
          }
        } else if (pattern === 'hh' && typeof value === 'number') {
          value = value === 0 ? 12 : value > 12 ? value - 12 : value;
        }
        if (typeof value === 'number') {
          value = padNumber(value, pattern.length);
        }
        str = str.replace(pattern, value);
      }
    });
    return str;
  };

  // Check if the field value is valid.
  var validFieldValue = function validFieldValue(type, value) {
    var _format$match;
    var isValid = true;
    (_format$match = format.match(new RegExp('([y|d|M|H|h|m|s])+', 'ig'))) === null || _format$match === void 0 ? void 0 : _format$match.forEach(function (pattern) {
      var key = patternMap[pattern[0]];
      var fieldValue = type === key ? value : dateField[key];
      if (fieldValue === null) {
        isValid = false;
        return;
      }
    });
    return isValid;
  };
  var isEmptyValue = function isEmptyValue(type, value) {
    var _format$match2;
    var checkValueArray = (_format$match2 = format.match(new RegExp('([y|d|M|H|h|m|s])+', 'ig'))) === null || _format$match2 === void 0 ? void 0 : _format$match2.map(function (pattern) {
      var key = patternMap[pattern[0]];
      var fieldValue = type === key ? value : dateField[key];
      return fieldValue !== null;
    });
    return checkValueArray === null || checkValueArray === void 0 ? void 0 : checkValueArray.every(function (item) {
      return item === false;
    });
  };
  var toDate = function toDate(type, value) {
    var year = dateField.year,
      month = dateField.month,
      day = dateField.day,
      hour = dateField.hour,
      minute = dateField.minute,
      second = dateField.second;
    var date = new Date(year || 0, typeof month === 'number' ? month - 1 : 0,
    // The default day is 1 when the value is null, otherwise it becomes the last day of the month.
    day || 1, hour || 0, minute || 0, second || 0);
    if (typeof type === 'undefined' || typeof value === 'undefined') {
      return date;
    }
    if (value === null || !validFieldValue(type, value)) {
      if (isEmptyValue(type, value)) {
        return null;
      }
      return new Date('');
    }
    if (type === 'meridian' && typeof hour === 'number') {
      var newHour = hour > 12 ? hour - 12 : hour + 12;
      type = 'hour';
      value = newHour;
    }
    return (0, _utils.modifyDate)(date, type, value);
  };
  return {
    dateField: dateField,
    dispatch: dispatch,
    toDate: toDate,
    toDateString: toDateString,
    isEmptyValue: isEmptyValue
  };
};
exports.useDateField = useDateField;