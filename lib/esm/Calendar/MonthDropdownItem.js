'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { composeFunctions, useClassNames, useCustom } from '../utils';
import { setMonth, setYear } from '../utils/dateUtils';
import { useCalendarContext } from './CalendarContext';
import { getAriaLabel } from './utils';
var MonthDropdownItem = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    className = props.className,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'calendar-month-dropdown-cell' : _props$classPrefix,
    active = props.active,
    disabled = props.disabled,
    _props$month = props.month,
    month = _props$month === void 0 ? 0 : _props$month,
    year = props.year,
    rest = _objectWithoutPropertiesLoose(props, ["as", "className", "classPrefix", "active", "disabled", "month", "year"]);
  var _useCalendarContext = useCalendarContext(),
    date = _useCalendarContext.date,
    onSelect = _useCalendarContext.onChangeMonth;
  var _useCustom = useCustom('Calendar'),
    locale = _useCustom.locale,
    formatDate = _useCustom.formatDate;
  var formatStr = locale.formattedMonthPattern;
  var currentMonth = useMemo(function () {
    if (year && month) {
      return composeFunctions(function (d) {
        return setYear(d, year);
      }, function (d) {
        return setMonth(d, month - 1);
      })(date);
    }
    return date;
  }, [date, month, year]);
  var handleClick = useCallback(function (event) {
    if (disabled) {
      return;
    }
    onSelect === null || onSelect === void 0 ? void 0 : onSelect(currentMonth, event);
  }, [currentMonth, disabled, onSelect]);
  var _useClassNames = useClassNames(classPrefix),
    prefix = _useClassNames.prefix,
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var classes = merge(className, withClassPrefix({
    active: active
  }), {
    disabled: disabled
  });
  var ariaLabel = currentMonth ? getAriaLabel(currentMonth, formatStr, formatDate) : '';
  return /*#__PURE__*/React.createElement(Component, _extends({
    key: month,
    role: "gridcell",
    "aria-selected": active,
    "aria-disabled": disabled,
    "aria-label": ariaLabel,
    tabIndex: active ? 0 : -1,
    ref: ref,
    className: classes,
    onClick: handleClick
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: prefix('content')
  }, month));
});
MonthDropdownItem.displayName = 'MonthDropdownItem';
MonthDropdownItem.propTypes = {
  month: PropTypes.number,
  year: PropTypes.number,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  active: PropTypes.bool,
  disabled: PropTypes.bool
};
export default MonthDropdownItem;