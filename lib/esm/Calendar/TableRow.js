'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useClassNames, DATERANGE_DISABLED_TARGET } from '../utils';
import { isSameDay, addDays, isBefore, isAfter, format } from '../utils/dateUtils';
import { useCalendarContext } from './CalendarContext';
import TableCell from './TableCell';
var TableRow = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    className = props.className,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'calendar-table' : _props$classPrefix,
    _props$weekendDate = props.weekendDate,
    weekendDate = _props$weekendDate === void 0 ? new Date() : _props$weekendDate,
    rowIndex = props.rowIndex,
    rest = _objectWithoutPropertiesLoose(props, ["as", "className", "classPrefix", "weekendDate", "rowIndex"]);
  var _useCalendarContext = useCalendarContext(),
    _useCalendarContext$d = _useCalendarContext.date,
    selected = _useCalendarContext$d === void 0 ? new Date() : _useCalendarContext$d,
    dateRange = _useCalendarContext.dateRange,
    disabledDate = _useCalendarContext.disabledDate,
    hoverRangeValue = _useCalendarContext.hoverRangeValue,
    inSameMonth = _useCalendarContext.inSameMonth,
    isoWeek = _useCalendarContext.isoWeek,
    onSelect = _useCalendarContext.onSelect,
    showWeekNumbers = _useCalendarContext.showWeekNumbers;
  var _useClassNames = useClassNames(classPrefix),
    prefix = _useClassNames.prefix,
    merge = _useClassNames.merge;
  var handleSelect = useCallback(function (date, disabled, event) {
    if (disabled) {
      return;
    }
    onSelect === null || onSelect === void 0 ? void 0 : onSelect(date, event);
  }, [onSelect]);
  var renderDays = function renderDays() {
    var days = [];
    var _ref = dateRange || [],
      selectedStartDate = _ref[0],
      selectedEndDate = _ref[1];
    var _ref2 = hoverRangeValue !== null && hoverRangeValue !== void 0 ? hoverRangeValue : [],
      hoverStartDate = _ref2[0],
      hoverEndDate = _ref2[1];
    var isRangeSelectionMode = typeof dateRange !== 'undefined';
    for (var i = 0; i < 7; i += 1) {
      var thisDate = addDays(weekendDate, i);
      var disabled = disabledDate === null || disabledDate === void 0 ? void 0 : disabledDate(thisDate, dateRange, DATERANGE_DISABLED_TARGET.CALENDAR);
      var unSameMonth = !(inSameMonth !== null && inSameMonth !== void 0 && inSameMonth(thisDate));
      var rangeStart = !unSameMonth && selectedStartDate && isSameDay(thisDate, selectedStartDate);
      var rangeEnd = !unSameMonth && selectedEndDate && isSameDay(thisDate, selectedEndDate);
      var isSelected = isRangeSelectionMode ? rangeStart || rangeEnd : isSameDay(thisDate, selected);

      // TODO-Doma Move those logic that's for DatePicker/DateRangePicker to a separate component
      //           Calendar is not supposed to be reused this way
      var inRange = false;
      // for Selected
      if (selectedStartDate && selectedEndDate) {
        if (isBefore(thisDate, selectedEndDate) && isAfter(thisDate, selectedStartDate)) {
          inRange = true;
        }
        if (isBefore(thisDate, selectedStartDate) && isAfter(thisDate, selectedEndDate)) {
          inRange = true;
        }
      }

      // for Hovering
      if (!isSelected && hoverStartDate && hoverEndDate) {
        if (!isAfter(thisDate, hoverEndDate) && !isBefore(thisDate, hoverStartDate)) {
          inRange = true;
        }
        if (!isAfter(thisDate, hoverStartDate) && !isBefore(thisDate, hoverEndDate)) {
          inRange = true;
        }
      }
      days.push( /*#__PURE__*/React.createElement(TableCell, {
        key: format(thisDate, 'yyyy-MM-dd'),
        date: thisDate,
        disabled: disabled,
        selected: isSelected,
        onSelect: handleSelect,
        unSameMonth: unSameMonth,
        rangeStart: rangeStart,
        rangeEnd: rangeEnd,
        inRange: inRange
      }));
    }
    return days;
  };
  var classes = merge(className, prefix('row'));
  var week = format(weekendDate, isoWeek ? 'I' : 'w', {
    firstWeekContainsDate: 4
  });
  return /*#__PURE__*/React.createElement(Component, _extends({}, rest, {
    ref: ref,
    role: "row",
    "aria-rowindex": rowIndex,
    className: classes
  }), showWeekNumbers && /*#__PURE__*/React.createElement("div", {
    role: "rowheader",
    "aria-label": "Week " + week,
    className: prefix('cell-week-number')
  }, week), renderDays());
});
TableRow.displayName = 'CalendarTableRow';
TableRow.propTypes = {
  weekendDate: PropTypes.instanceOf(Date),
  className: PropTypes.string,
  classPrefix: PropTypes.string
};
export default TableRow;