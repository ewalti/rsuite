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
var _isSameMonth = _interopRequireDefault(require("date-fns/isSameMonth"));
var _CalendarContainer = _interopRequireDefault(require("./CalendarContainer"));
var _Button = _interopRequireDefault(require("../Button"));
var _CustomProvider = require("../CustomProvider");
var _utils = require("../utils");
var _useCalendarDate2 = _interopRequireDefault(require("./useCalendarDate"));
/**
 * The Calendar component is used to select dates.
 * @see https://rsuitejs.com/components/calendar
 */
var Calendar = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? _CalendarContainer.default : _props$as,
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
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, ["as", "bordered", "className", "classPrefix", "compact", "defaultValue", "isoWeek", "locale", "onChange", "onMonthChange", "onSelect", "renderCell", "value", "cellClassName"]);
  var _useCalendarDate = (0, _useCalendarDate2.default)(value, defaultValue),
    calendarDate = _useCalendarDate.calendarDate,
    setCalendarDate = _useCalendarDate.setCalendarDate;
  var _useCustom = (0, _utils.useCustom)('Calendar', overrideLocale),
    locale = _useCustom.locale;
  var handleChange = (0, _react.useCallback)(function (nextValue) {
    setCalendarDate(nextValue);
    onChange === null || onChange === void 0 ? void 0 : onChange(nextValue);
    if (!(0, _isSameMonth.default)(nextValue, calendarDate)) {
      onMonthChange === null || onMonthChange === void 0 ? void 0 : onMonthChange(nextValue);
    }
  }, [setCalendarDate, onChange, calendarDate, onMonthChange]);
  var handleClickToday = (0, _react.useCallback)(function () {
    handleChange(new Date());
  }, [handleChange]);
  var handleSelect = (0, _react.useCallback)(function (nextValue) {
    onSelect === null || onSelect === void 0 ? void 0 : onSelect(nextValue);
    handleChange(nextValue);
  }, [handleChange, onSelect]);
  var _useClassNames = (0, _utils.useClassNames)(classPrefix),
    prefix = _useClassNames.prefix,
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var renderToolbar = (0, _react.useCallback)(function () {
    return /*#__PURE__*/_react.default.createElement(_Button.default, {
      className: prefix('btn-today'),
      size: "sm",
      onClick: handleClickToday
    }, locale.today || 'Today');
  }, [handleClickToday, locale.today, prefix]);
  var customRenderCell = (0, _react.useCallback)(function (date) {
    return renderCell === null || renderCell === void 0 ? void 0 : renderCell(date);
  }, [renderCell]);
  var classes = merge(className, withClassPrefix('panel', {
    bordered: bordered,
    compact: compact
  }));
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({}, rest, {
    inline: true,
    className: classes,
    ref: ref,
    isoWeek: isoWeek,
    format: "yyyy-MM-dd",
    calendarDate: calendarDate,
    limitEndYear: 1000,
    locale: locale,
    renderTitle: function renderTitle(date) {
      return /*#__PURE__*/_react.default.createElement(_CustomProvider.FormattedDate, {
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
  value: _propTypes.default.instanceOf(Date),
  defaultValue: _propTypes.default.instanceOf(Date),
  isoWeek: _propTypes.default.bool,
  compact: _propTypes.default.bool,
  bordered: _propTypes.default.bool,
  locale: _propTypes.default.object,
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  onChange: _propTypes.default.func,
  onSelect: _propTypes.default.func,
  renderCell: _propTypes.default.func
};
var _default = Calendar;
exports.default = _default;