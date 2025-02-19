'use client';
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.isEveryDateInMonth = isEveryDateInMonth;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Windowing = require("../internals/Windowing");
var _utils = require("../utils");
var _MonthDropdownItem = _interopRequireDefault(require("./MonthDropdownItem"));
var _CalendarContext = require("./CalendarContext");
var monthMap = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
function isEveryDateInMonth(year, month, predicate) {
  var days = _utils.DateUtils.getDaysInMonth(new Date(year, month));
  for (var i = 1; i <= days; i++) {
    if (!predicate(new Date(year, month, i))) {
      return false;
    }
  }
  return true;
}
var MonthDropdown = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
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
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, ["as", "className", "classPrefix", "limitStartYear", "limitEndYear", "show", "height", "width", "disabledMonth"]);
  var _useCalendarContext = (0, _CalendarContext.useCalendarContext)(),
    _useCalendarContext$d = _useCalendarContext.date,
    date = _useCalendarContext$d === void 0 ? new Date() : _useCalendarContext$d,
    targetId = _useCalendarContext.targetId;
  var _useClassNames = (0, _utils.useClassNames)(classPrefix),
    prefix = _useClassNames.prefix,
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var thisYear = _utils.DateUtils.getYear(new Date());
  var startYear = limitStartYear ? thisYear - limitStartYear + 1 : 1900;
  var rowCount = (0, _react.useMemo)(function () {
    var endYear = thisYear + limitEndYear;
    return endYear - startYear;
  }, [limitEndYear, startYear, thisYear]);
  var isMonthDisabled = (0, _react.useCallback)(function (year, month) {
    if (disabledMonth) {
      return isEveryDateInMonth(year, month, disabledMonth);
    }
    return false;
  }, [disabledMonth]);
  var rowRenderer = (0, _react.useCallback)(function (_ref) {
    var index = _ref.index,
      style = _ref.style;
    var selectedMonth = _utils.DateUtils.getMonth(date);
    var selectedYear = _utils.DateUtils.getYear(date);
    var year = startYear + index;
    var isSelectedYear = year === selectedYear;
    var titleClassName = prefix('year', {
      'year-active': isSelectedYear
    });
    var rowClassName = merge(prefix('row'), {
      'first-row': index === 0,
      'last-row': index === rowCount - 1
    });
    return /*#__PURE__*/_react.default.createElement("div", {
      className: rowClassName,
      role: "row",
      "aria-label": "" + year,
      style: style
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: titleClassName,
      role: "rowheader"
    }, year), /*#__PURE__*/_react.default.createElement("div", {
      className: prefix('list')
    }, monthMap.map(function (item, month) {
      return /*#__PURE__*/_react.default.createElement(_MonthDropdownItem.default, {
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
  var initialItemIndex = _utils.DateUtils.getYear(date) - startYear;
  var initialScrollOffset = itemSize * initialItemIndex;
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
    role: "grid",
    "aria-label": "Select month",
    tabIndex: -1,
    id: targetId ? targetId + "-" + classPrefix : undefined
  }, rest, {
    ref: ref,
    className: classes
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: prefix('content')
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: prefix('scroll')
  }, show && /*#__PURE__*/_react.default.createElement(_Windowing.AutoSizer, {
    defaultHeight: defaultHeight,
    defaultWidth: defaultWidth
  }, function (_ref2) {
    var height = _ref2.height,
      width = _ref2.width;
    return /*#__PURE__*/_react.default.createElement(_Windowing.FixedSizeList, {
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
  limitEndYear: _propTypes.default.number,
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  show: _propTypes.default.bool,
  disabledMonth: _propTypes.default.func
};
var _default = MonthDropdown;
exports.default = _default;