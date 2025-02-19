'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { AutoSizer, FixedSizeList } from '../internals/Windowing';
import { DateUtils, useClassNames } from '../utils';
import MonthDropdownItem from './MonthDropdownItem';
import { useCalendarContext } from './CalendarContext';
var monthMap = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
export function isEveryDateInMonth(year, month, predicate) {
  var days = DateUtils.getDaysInMonth(new Date(year, month));
  for (var i = 1; i <= days; i++) {
    if (!predicate(new Date(year, month, i))) {
      return false;
    }
  }
  return true;
}
var MonthDropdown = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    className = props.className,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'calendar-month-dropdown' : _props$classPrefix,
    limitStartYear = props.limitStartYear,
    _props$limitEndYear = props.limitEndYear,
    limitEndYear = _props$limitEndYear === void 0 ? 5 : _props$limitEndYear,
    show = props.show,
    _props$height = props.height,
    defaultHeight = _props$height === void 0 ? 221 : _props$height,
    _props$width = props.width,
    defaultWidth = _props$width === void 0 ? 256 : _props$width,
    disabledMonth = props.disabledMonth,
    rest = _objectWithoutPropertiesLoose(props, ["as", "className", "classPrefix", "limitStartYear", "limitEndYear", "show", "height", "width", "disabledMonth"]);
  var _useCalendarContext = useCalendarContext(),
    _useCalendarContext$d = _useCalendarContext.date,
    date = _useCalendarContext$d === void 0 ? new Date() : _useCalendarContext$d,
    targetId = _useCalendarContext.targetId;
  var _useClassNames = useClassNames(classPrefix),
    prefix = _useClassNames.prefix,
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var thisYear = DateUtils.getYear(new Date());
  var startYear = limitStartYear ? thisYear - limitStartYear + 1 : 1900;
  var rowCount = useMemo(function () {
    var endYear = thisYear + limitEndYear;
    return endYear - startYear;
  }, [limitEndYear, startYear, thisYear]);
  var isMonthDisabled = useCallback(function (year, month) {
    if (disabledMonth) {
      return isEveryDateInMonth(year, month, disabledMonth);
    }
    return false;
  }, [disabledMonth]);
  var rowRenderer = useCallback(function (_ref) {
    var index = _ref.index,
      style = _ref.style;
    var selectedMonth = DateUtils.getMonth(date);
    var selectedYear = DateUtils.getYear(date);
    var year = startYear + index;
    var isSelectedYear = year === selectedYear;
    var titleClassName = prefix('year', {
      'year-active': isSelectedYear
    });
    var rowClassName = merge(prefix('row'), {
      'first-row': index === 0,
      'last-row': index === rowCount - 1
    });
    return /*#__PURE__*/React.createElement("div", {
      className: rowClassName,
      role: "row",
      "aria-label": "" + year,
      style: style
    }, /*#__PURE__*/React.createElement("div", {
      className: titleClassName,
      role: "rowheader"
    }, year), /*#__PURE__*/React.createElement("div", {
      className: prefix('list')
    }, monthMap.map(function (item, month) {
      return /*#__PURE__*/React.createElement(MonthDropdownItem, {
        disabled: isMonthDisabled(year, month),
        active: isSelectedYear && month === selectedMonth,
        key: month + "_" + item,
        month: month + 1,
        year: year
      });
    })));
  }, [date, isMonthDisabled, merge, prefix, rowCount, startYear]);
  var classes = merge(className, withClassPrefix(), {
    show: show
  });
  var itemSize = 75;
  var initialItemIndex = DateUtils.getYear(date) - startYear;
  var initialScrollOffset = itemSize * initialItemIndex;
  return /*#__PURE__*/React.createElement(Component, _extends({
    role: "grid",
    "aria-label": "Select month",
    tabIndex: -1,
    id: targetId ? targetId + "-" + classPrefix : undefined
  }, rest, {
    ref: ref,
    className: classes
  }), /*#__PURE__*/React.createElement("div", {
    className: prefix('content')
  }, /*#__PURE__*/React.createElement("div", {
    className: prefix('scroll')
  }, show && /*#__PURE__*/React.createElement(AutoSizer, {
    defaultHeight: defaultHeight,
    defaultWidth: defaultWidth
  }, function (_ref2) {
    var height = _ref2.height,
      width = _ref2.width;
    return /*#__PURE__*/React.createElement(FixedSizeList, {
      className: prefix('row-wrapper'),
      width: width || defaultWidth,
      height: height || defaultHeight,
      itemSize: itemSize,
      itemCount: rowCount,
      initialScrollOffset: initialScrollOffset
    }, rowRenderer);
  }))));
});
MonthDropdown.displayName = 'MonthDropdown';
MonthDropdown.propTypes = {
  limitEndYear: PropTypes.number,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  show: PropTypes.bool,
  disabledMonth: PropTypes.func
};
export default MonthDropdown;