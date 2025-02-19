'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';
import MonthDropdown from './MonthDropdown';
import TimeDropdown from './TimeDropdown';
import CalendarBody from './CalendarBody';
import CalendarHeader from './CalendarHeader';
import { useClassNames, useEventCallback } from '../utils';
import { disabledTime, addMonths, shouldRenderDate, shouldRenderTime, shouldRenderMonth, isSameMonth, calendarOnlyProps, omitHideDisabledProps, isValid } from '../utils/dateUtils';
import { CalendarProvider } from './CalendarContext';
import useCalendarState, { CalendarState } from './useCalendarState';
import AngleUpIcon from '@rsuite/icons/legacy/AngleUp';
var CalendarContainer = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    className = props.className,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'calendar' : _props$classPrefix,
    dateRange = props.dateRange,
    disabledBackward = props.disabledBackward,
    defaultState = props.defaultState,
    disabledDate = props.disabledDate,
    disabledForward = props.disabledForward,
    format = props.format,
    hoverRangeValue = props.hoverRangeValue,
    _props$isoWeek = props.isoWeek,
    isoWeek = _props$isoWeek === void 0 ? false : _props$isoWeek,
    targetId = props.targetId,
    limitEndYear = props.limitEndYear,
    limitStartYear = props.limitStartYear,
    locale = props.locale,
    onChangeMonth = props.onChangeMonth,
    onChangeTime = props.onChangeTime,
    onMouseMove = props.onMouseMove,
    onMoveBackward = props.onMoveBackward,
    onMoveForward = props.onMoveForward,
    onSelect = props.onSelect,
    onToggleMeridian = props.onToggleMeridian,
    onToggleMonthDropdown = props.onToggleMonthDropdown,
    onToggleTimeDropdown = props.onToggleTimeDropdown,
    calendarDateProp = props.calendarDate,
    cellClassName = props.cellClassName,
    renderCell = props.renderCell,
    renderTitle = props.renderTitle,
    renderToolbar = props.renderToolbar,
    showMeridian = props.showMeridian,
    showWeekNumbers = props.showWeekNumbers,
    inline = props.inline,
    rest = _objectWithoutPropertiesLoose(props, ["as", "className", "classPrefix", "dateRange", "disabledBackward", "defaultState", "disabledDate", "disabledForward", "format", "hoverRangeValue", "isoWeek", "targetId", "limitEndYear", "limitStartYear", "locale", "onChangeMonth", "onChangeTime", "onMouseMove", "onMoveBackward", "onMoveForward", "onSelect", "onToggleMeridian", "onToggleMonthDropdown", "onToggleTimeDropdown", "calendarDate", "cellClassName", "renderCell", "renderTitle", "renderToolbar", "showMeridian", "showWeekNumbers", "inline"]);
  var _useClassNames = useClassNames(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix;
  var _useCalendarState = useCalendarState(defaultState),
    calendarState = _useCalendarState.calendarState,
    reset = _useCalendarState.reset,
    openMonth = _useCalendarState.openMonth,
    openTime = _useCalendarState.openTime;
  var calendarDate = useMemo(function () {
    return isValid(calendarDateProp) ? calendarDateProp : new Date();
  }, [calendarDateProp]);
  var isDisabledDate = useEventCallback(function (date) {
    var _disabledDate;
    return (_disabledDate = disabledDate === null || disabledDate === void 0 ? void 0 : disabledDate(date)) !== null && _disabledDate !== void 0 ? _disabledDate : false;
  });
  var isTimeDisabled = function isTimeDisabled(date) {
    return disabledTime(props, date);
  };
  var handleMoveForward = useEventCallback(function () {
    onMoveForward === null || onMoveForward === void 0 ? void 0 : onMoveForward(addMonths(calendarDate, 1));
  });
  var handleMoveBackward = useEventCallback(function () {
    onMoveBackward === null || onMoveBackward === void 0 ? void 0 : onMoveBackward(addMonths(calendarDate, -1));
  });

  // It is displayed as the month to be selected.
  var toggleMonthView = useEventCallback(function () {
    if (calendarState === CalendarState.MONTH) {
      reset();
    } else {
      openMonth();
    }
    onToggleMonthDropdown === null || onToggleMonthDropdown === void 0 ? void 0 : onToggleMonthDropdown(calendarState !== CalendarState.MONTH);
  });

  // It is displayed as a time to be selected.
  var toggleTimeView = useEventCallback(function () {
    if (calendarState === CalendarState.TIME) {
      reset();
    } else {
      openTime();
    }
    onToggleTimeDropdown === null || onToggleTimeDropdown === void 0 ? void 0 : onToggleTimeDropdown(calendarState !== CalendarState.TIME);
  });
  var handleCloseDropdown = useEventCallback(function () {
    return reset();
  });
  var renderDate = shouldRenderDate(format);
  var renderTime = shouldRenderTime(format);
  var renderMonth = shouldRenderMonth(format);
  var onlyShowTime = renderTime && !renderDate && !renderMonth;
  var onlyShowMonth = renderMonth && !renderDate && !renderTime;
  var showTime = calendarState === CalendarState.TIME || onlyShowTime;
  var showMonth = calendarState === CalendarState.MONTH || onlyShowMonth;
  var inSameThisMonthDate = function inSameThisMonthDate(date) {
    return isSameMonth(calendarDate, date);
  };
  var calendarClasses = merge(className, withClassPrefix({
    'time-view': showTime,
    'month-view': showMonth,
    'show-week-numbers': showWeekNumbers
  }));
  var timeDropdownProps = pick(rest, calendarOnlyProps);
  var handleChangeMonth = useEventCallback(function (date, event) {
    reset();
    onChangeMonth === null || onChangeMonth === void 0 ? void 0 : onChangeMonth(date, event);
  });
  var contextValue = {
    date: calendarDate,
    dateRange: dateRange,
    disabledDate: isDisabledDate,
    format: format,
    hoverRangeValue: hoverRangeValue,
    inSameMonth: inSameThisMonthDate,
    isoWeek: isoWeek,
    targetId: targetId,
    locale: locale,
    onChangeMonth: handleChangeMonth,
    onChangeTime: onChangeTime,
    onMouseMove: onMouseMove,
    onSelect: onSelect,
    cellClassName: cellClassName,
    renderCell: renderCell,
    showWeekNumbers: showWeekNumbers,
    inline: inline
  };
  return /*#__PURE__*/React.createElement(CalendarProvider, {
    value: contextValue
  }, /*#__PURE__*/React.createElement(Component, _extends({
    "data-testid": "calendar"
  }, omitHideDisabledProps(rest), {
    className: calendarClasses,
    ref: ref
  }), /*#__PURE__*/React.createElement(CalendarHeader, {
    showMonth: renderMonth,
    showDate: renderDate,
    showTime: renderTime,
    showMeridian: showMeridian,
    disabledTime: isTimeDisabled,
    onMoveForward: handleMoveForward,
    onMoveBackward: handleMoveBackward,
    onToggleMonthDropdown: toggleMonthView,
    onToggleTimeDropdown: toggleTimeView,
    onToggleMeridian: onToggleMeridian,
    renderTitle: renderTitle,
    renderToolbar: renderToolbar,
    disabledBackward: disabledBackward,
    disabledForward: disabledForward
  }), renderDate && /*#__PURE__*/React.createElement(CalendarBody, null), renderMonth && /*#__PURE__*/React.createElement(MonthDropdown, {
    show: showMonth,
    limitEndYear: limitEndYear,
    limitStartYear: limitStartYear,
    disabledMonth: isDisabledDate
  }), renderTime && /*#__PURE__*/React.createElement(TimeDropdown, _extends({}, timeDropdownProps, {
    show: showTime,
    showMeridian: showMeridian
  })), (showMonth || showTime) && renderDate && /*#__PURE__*/React.createElement("button", {
    className: prefix('btn-close'),
    onClick: handleCloseDropdown,
    "aria-label": "Collapse " + (showMonth ? 'month' : 'time') + " view"
  }, /*#__PURE__*/React.createElement(AngleUpIcon, null))));
});
CalendarContainer.displayName = 'CalendarContainer';
CalendarContainer.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  disabledDate: PropTypes.func,
  disabledHours: PropTypes.func,
  disabledMinutes: PropTypes.func,
  disabledSeconds: PropTypes.func,
  format: PropTypes.string,
  hideHours: PropTypes.func,
  hideMinutes: PropTypes.func,
  hideSeconds: PropTypes.func,
  isoWeek: PropTypes.bool,
  limitEndYear: PropTypes.number,
  limitStartYear: PropTypes.number,
  locale: PropTypes.object,
  onChangeMonth: PropTypes.func,
  onChangeTime: PropTypes.func,
  onMoveBackward: PropTypes.func,
  onMoveForward: PropTypes.func,
  onSelect: PropTypes.func,
  onToggleMeridian: PropTypes.func,
  onToggleMonthDropdown: PropTypes.func,
  onToggleTimeDropdown: PropTypes.func,
  calendarDate: PropTypes.instanceOf(Date),
  renderCell: PropTypes.func,
  renderTitle: PropTypes.func,
  renderToolbar: PropTypes.func,
  showMeridian: PropTypes.bool,
  showWeekNumbers: PropTypes.bool
};
export default CalendarContainer;