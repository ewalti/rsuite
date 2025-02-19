'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import isSameMonth from 'date-fns/isSameMonth';
import CalendarContainer from './CalendarContainer';
import Button from '../Button';
import { FormattedDate } from '../CustomProvider';
import { useClassNames, useCustom } from '../utils';
import useCalendarDate from './useCalendarDate';
/**
 * The Calendar component is used to select dates.
 * @see https://rsuitejs.com/components/calendar
 */
var Calendar = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? CalendarContainer : _props$as,
    bordered = props.bordered,
    className = props.className,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'calendar' : _props$classPrefix,
    compact = props.compact,
    _props$defaultValue = props.defaultValue,
    defaultValue = _props$defaultValue === void 0 ? new Date() : _props$defaultValue,
    isoWeek = props.isoWeek,
    overrideLocale = props.locale,
    onChange = props.onChange,
    onMonthChange = props.onMonthChange,
    onSelect = props.onSelect,
    renderCell = props.renderCell,
    value = props.value,
    cellClassName = props.cellClassName,
    rest = _objectWithoutPropertiesLoose(props, ["as", "bordered", "className", "classPrefix", "compact", "defaultValue", "isoWeek", "locale", "onChange", "onMonthChange", "onSelect", "renderCell", "value", "cellClassName"]);
  var _useCalendarDate = useCalendarDate(value, defaultValue),
    calendarDate = _useCalendarDate.calendarDate,
    setCalendarDate = _useCalendarDate.setCalendarDate;
  var _useCustom = useCustom('Calendar', overrideLocale),
    locale = _useCustom.locale;
  var handleChange = useCallback(function (nextValue) {
    setCalendarDate(nextValue);
    onChange === null || onChange === void 0 ? void 0 : onChange(nextValue);
    if (!isSameMonth(nextValue, calendarDate)) {
      onMonthChange === null || onMonthChange === void 0 ? void 0 : onMonthChange(nextValue);
    }
  }, [setCalendarDate, onChange, calendarDate, onMonthChange]);
  var handleClickToday = useCallback(function () {
    handleChange(new Date());
  }, [handleChange]);
  var handleSelect = useCallback(function (nextValue) {
    onSelect === null || onSelect === void 0 ? void 0 : onSelect(nextValue);
    handleChange(nextValue);
  }, [handleChange, onSelect]);
  var _useClassNames = useClassNames(classPrefix),
    prefix = _useClassNames.prefix,
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var renderToolbar = useCallback(function () {
    return /*#__PURE__*/React.createElement(Button, {
      className: prefix('btn-today'),
      size: "sm",
      onClick: handleClickToday
    }, locale.today || 'Today');
  }, [handleClickToday, locale.today, prefix]);
  var customRenderCell = useCallback(function (date) {
    return renderCell === null || renderCell === void 0 ? void 0 : renderCell(date);
  }, [renderCell]);
  var classes = merge(className, withClassPrefix('panel', {
    bordered: bordered,
    compact: compact
  }));
  return /*#__PURE__*/React.createElement(Component, _extends({}, rest, {
    inline: true,
    className: classes,
    ref: ref,
    isoWeek: isoWeek,
    format: "yyyy-MM-dd",
    calendarDate: calendarDate,
    limitEndYear: 1000,
    locale: locale,
    renderTitle: function renderTitle(date) {
      return /*#__PURE__*/React.createElement(FormattedDate, {
        date: date,
        formatStr: locale.formattedMonthPattern || 'MMMM  yyyy'
      });
    },
    renderToolbar: renderToolbar,
    renderCell: customRenderCell,
    cellClassName: cellClassName,
    onMoveForward: handleChange,
    onMoveBackward: handleChange,
    onChangeMonth: handleChange,
    onSelect: handleSelect
  }));
});
Calendar.displayName = 'Calendar';
Calendar.propTypes = {
  value: PropTypes.instanceOf(Date),
  defaultValue: PropTypes.instanceOf(Date),
  isoWeek: PropTypes.bool,
  compact: PropTypes.bool,
  bordered: PropTypes.bool,
  locale: PropTypes.object,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  onChange: PropTypes.func,
  onSelect: PropTypes.func,
  renderCell: PropTypes.func
};
export default Calendar;