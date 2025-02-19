'use client';
"use strict";

exports.__esModule = true;
exports.default = exports.CalendarState = void 0;
var _react = require("react");
var CalendarState;
exports.CalendarState = CalendarState;
(function (CalendarState) {
  CalendarState["TIME"] = "TIME";
  CalendarState["MONTH"] = "MONTH";
})(CalendarState || (exports.CalendarState = CalendarState = {}));
var useCalendarState = function useCalendarState(defaultState) {
  var _useState = (0, _react.useState)(defaultState),
    calendarState = _useState[0],
    setCalendarState = _useState[1];
  var reset = (0, _react.useCallback)(function () {
    setCalendarState(undefined);
  }, []);
  var openMonth = (0, _react.useCallback)(function () {
    setCalendarState(CalendarState.MONTH);
  }, []);
  var openTime = (0, _react.useCallback)(function () {
    setCalendarState(CalendarState.TIME);
  }, []);
  return {
    calendarState: calendarState,
    reset: reset,
    openMonth: openMonth,
    openTime: openTime
  };
};
var _default = useCalendarState;
exports.default = _default;