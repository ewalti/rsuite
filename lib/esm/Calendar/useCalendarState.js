'use client';
import { useCallback, useState } from 'react';
export var CalendarState;
(function (CalendarState) {
  CalendarState["TIME"] = "TIME";
  CalendarState["MONTH"] = "MONTH";
})(CalendarState || (CalendarState = {}));
var useCalendarState = function useCalendarState(defaultState) {
  var _useState = useState(defaultState),
    calendarState = _useState[0],
    setCalendarState = _useState[1];
  var reset = useCallback(function () {
    setCalendarState(undefined);
  }, []);
  var openMonth = useCallback(function () {
    setCalendarState(CalendarState.MONTH);
  }, []);
  var openTime = useCallback(function () {
    setCalendarState(CalendarState.TIME);
  }, []);
  return {
    calendarState: calendarState,
    reset: reset,
    openMonth: openMonth,
    openTime: openTime
  };
};
export default useCalendarState;