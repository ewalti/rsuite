'use client';
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _pick = _interopRequireDefault(require("lodash/pick"));
var _MonthDropdown = _interopRequireDefault(require("./MonthDropdown"));
var _TimeDropdown = _interopRequireDefault(require("./TimeDropdown"));
var _CalendarBody = _interopRequireDefault(require("./CalendarBody"));
var _CalendarHeader = _interopRequireDefault(require("./CalendarHeader"));
var _utils = require("../utils");
var _dateUtils = require("../utils/dateUtils");
var _CalendarContext = require("./CalendarContext");
var _useCalendarState2 = _interopRequireWildcard(require("./useCalendarState"));
var _AngleUp = _interopRequireDefault(require("@rsuite/icons/legacy/AngleUp"));
var CalendarContainer = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
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
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, ["as", "className", "classPrefix", "dateRange", "disabledBackward", "defaultState", "disabledDate", "disabledForward", "format", "hoverRangeValue", "isoWeek", "targetId", "limitEndYear", "limitStartYear", "locale", "onChangeMonth", "onChangeTime", "onMouseMove", "onMoveBackward", "onMoveForward", "onSelect", "onToggleMeridian", "onToggleMonthDropdown", "onToggleTimeDropdown", "calendarDate", "cellClassName", "renderCell", "renderTitle", "renderToolbar", "showMeridian", "showWeekNumbers", "inline"]);
  var _useClassNames = (0, _utils.useClassNames)(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix;
  var _useCalendarState = (0, _useCalendarState2.default)(defaultState),
    calendarState = _useCalendarState.calendarState,
    reset = _useCalendarState.reset,
    openMonth = _useCalendarState.openMonth,
    openTime = _useCalendarState.openTime;
  var calendarDate = (0, _react.useMemo)(function () {
    return (0, _dateUtils.isValid)(calendarDateProp) ? calendarDateProp : new Date();
  }, [calendarDateProp]);
  var isDisabledDate = (0, _utils.useEventCallback)(function (date) {
    var _disabledDate;
    return (_disabledDate = disabledDate === null || disabledDate === void 0 ? void 0 : disabledDate(date)) !== null && _disabledDate !== void 0 ? _disabledDate : false;
  });
  var isTimeDisabled = function isTimeDisabled(date) {
    return (0, _dateUtils.disabledTime)(props, date);
  };
  var handleMoveForward = (0, _utils.useEventCallback)(function () {
    onMoveForward === null || onMoveForward === void 0 ? void 0 : onMoveForward((0, _dateUtils.addMonths)(calendarDate, 1));
  });
  var handleMoveBackward = (0, _utils.useEventCallback)(function () {
    onMoveBackward === null || onMoveBackward === void 0 ? void 0 : onMoveBackward((0, _dateUtils.addMonths)(calendarDate, -1));
  });

  // It is displayed as the month to be selected.
  var toggleMonthView = (0, _utils.useEventCallback)(function () {
    if (calendarState === _useCalendarState2.CalendarState.MONTH) {
      reset();
    } else {
      openMonth();
    }
    onToggleMonthDropdown === null || onToggleMonthDropdown === void 0 ? void 0 : onToggleMonthDropdown(calendarState !== _useCalendarState2.CalendarState.MONTH);
  });

  // It is displayed as a time to be selected.
  var toggleTimeView = (0, _utils.useEventCallback)(function () {
    if (calendarState === _useCalendarState2.CalendarState.TIME) {
      reset();
    } else {
      openTime();
    }
    onToggleTimeDropdown === null || onToggleTimeDropdown === void 0 ? void 0 : onToggleTimeDropdown(calendarState !== _useCalendarState2.CalendarState.TIME);
  });
  var handleCloseDropdown = (0, _utils.useEventCallback)(function () {
    return reset();
  });
  var renderDate = (0, _dateUtils.shouldRenderDate)(format);
  var renderTime = (0, _dateUtils.shouldRenderTime)(format);
  var renderMonth = (0, _dateUtils.shouldRenderMonth)(format);
  var onlyShowTime = renderTime && !renderDate && !renderMonth;
  var onlyShowMonth = renderMonth && !renderDate && !renderTime;
  var showTime = calendarState === _useCalendarState2.CalendarState.TIME || onlyShowTime;
  var showMonth = calendarState === _useCalendarState2.CalendarState.MONTH || onlyShowMonth;
  var inSameThisMonthDate = function inSameThisMonthDate(date) {
    return (0, _dateUtils.isSameMonth)(calendarDate, date);
  };
  var calendarClasses = merge(className, withClassPrefix({
    'time-view': showTime,
    'month-view': showMonth,
    'show-week-numbers': showWeekNumbers
  }));
  var timeDropdownProps = (0, _pick.default)(rest, _dateUtils.calendarOnlyProps);
  var handleChangeMonth = (0, _utils.useEventCallback)(function (date, event) {
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
  return /*#__PURE__*/_react.default.createElement(_CalendarContext.CalendarProvider, {
    value: contextValue
  }, /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
    "data-testid": "calendar"
  }, (0, _dateUtils.omitHideDisabledProps)(rest), {
    className: calendarClasses,
    ref: ref
  }), /*#__PURE__*/_react.default.createElement(_CalendarHeader.default, {
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
  }), renderDate && /*#__PURE__*/_react.default.createElement(_CalendarBody.default, null), renderMonth && /*#__PURE__*/_react.default.createElement(_MonthDropdown.default, {
    show: showMonth,
    limitEndYear: limitEndYear,
    limitStartYear: limitStartYear,
    disabledMonth: isDisabledDate
  }), renderTime && /*#__PURE__*/_react.default.createElement(_TimeDropdown.default, (0, _extends2.default)({}, timeDropdownProps, {
    show: showTime,
    showMeridian: showMeridian
  })), (showMonth || showTime) && renderDate && /*#__PURE__*/_react.default.createElement("button", {
    className: prefix('btn-close'),
    onClick: handleCloseDropdown,
    "aria-label": "Collapse " + (showMonth ? 'month' : 'time') + " view"
  }, /*#__PURE__*/_react.default.createElement(_AngleUp.default, null))));
});
CalendarContainer.displayName = 'CalendarContainer';
CalendarContainer.propTypes = {
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  disabledDate: _propTypes.default.func,
  disabledHours: _propTypes.default.func,
  disabledMinutes: _propTypes.default.func,
  disabledSeconds: _propTypes.default.func,
  format: _propTypes.default.string,
  hideHours: _propTypes.default.func,
  hideMinutes: _propTypes.default.func,
  hideSeconds: _propTypes.default.func,
  isoWeek: _propTypes.default.bool,
  limitEndYear: _propTypes.default.number,
  limitStartYear: _propTypes.default.number,
  locale: _propTypes.default.object,
  onChangeMonth: _propTypes.default.func,
  onChangeTime: _propTypes.default.func,
  onMoveBackward: _propTypes.default.func,
  onMoveForward: _propTypes.default.func,
  onSelect: _propTypes.default.func,
  onToggleMeridian: _propTypes.default.func,
  onToggleMonthDropdown: _propTypes.default.func,
  onToggleTimeDropdown: _propTypes.default.func,
  calendarDate: _propTypes.default.instanceOf(Date),
  renderCell: _propTypes.default.func,
  renderTitle: _propTypes.default.func,
  renderToolbar: _propTypes.default.func,
  showMeridian: _propTypes.default.bool,
  showWeekNumbers: _propTypes.default.bool
};
var _default = CalendarContainer;
exports.default = _default;