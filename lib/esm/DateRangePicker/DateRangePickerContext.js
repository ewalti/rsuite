'use client';
import React, { useContext } from 'react';
var DateRangePickerContext = /*#__PURE__*/React.createContext({});
export default DateRangePickerContext;
export var useDateRangePickerContext = function useDateRangePickerContext() {
  return useContext(DateRangePickerContext) || {};
};