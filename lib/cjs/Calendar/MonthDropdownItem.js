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
var _utils = require("../utils");
var _dateUtils = require("../utils/dateUtils");
var _CalendarContext = require("./CalendarContext");
var _utils2 = require("./utils");
var MonthDropdownItem = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
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
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, ["as", "className", "classPrefix", "active", "disabled", "month", "year"]);
  var _useCalendarContext = (0, _CalendarContext.useCalendarContext)(),
    date = _useCalendarContext.date,
    onSelect = _useCalendarContext.onChangeMonth;
  var _useCustom = (0, _utils.useCustom)('Calendar'),
    locale = _useCustom.locale,
    formatDate = _useCustom.formatDate;
  var formatStr = locale.formattedMonthPattern;
  var currentMonth = (0, _react.useMemo)(function () {
    if (year && month) {
      return (0, _utils.composeFunctions)(function (d) {
        return (0, _dateUtils.setYear)(d, year);
      }, function (d) {
        return (0, _dateUtils.setMonth)(d, month - 1);
      })(date);
    }
    return date;
  }, [date, month, year]);
  var handleClick = (0, _react.useCallback)(function (event) {
    if (disabled) {
      return;
    }
    onSelect === null || onSelect === void 0 ? void 0 : onSelect(currentMonth, event);
  }, [currentMonth, disabled, onSelect]);
  var _useClassNames = (0, _utils.useClassNames)(classPrefix),
    prefix = _useClassNames.prefix,
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var classes = merge(className, withClassPrefix({
    active: active
  }), {
    disabled: disabled
  });
  var ariaLabel = currentMonth ? (0, _utils2.getAriaLabel)(currentMonth, formatStr, formatDate) : '';
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
    key: month,
    role: "gridcell",
    "aria-selected": active,
    "aria-disabled": disabled,
    "aria-label": ariaLabel,
    tabIndex: active ? 0 : -1,
    ref: ref,
    className: classes,
    onClick: handleClick
  }, rest), /*#__PURE__*/_react.default.createElement("span", {
    className: prefix('content')
  }, month));
});
MonthDropdownItem.displayName = 'MonthDropdownItem';
MonthDropdownItem.propTypes = {
  month: _propTypes.default.number,
  year: _propTypes.default.number,
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  active: _propTypes.default.bool,
  disabled: _propTypes.default.bool
};
var _default = MonthDropdownItem;
exports.default = _default;