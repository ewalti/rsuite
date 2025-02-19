'use client';
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _Button = _interopRequireDefault(require("../Button"));
var _Stack = _interopRequireDefault(require("../Stack"));
var _utils = require("../utils");
var _utils2 = require("./utils");
var PredefinedRanges = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var className = props.className,
    disabledShortcut = props.disabledShortcut,
    onShortcutClick = props.onShortcutClick,
    calendarDate = props.calendarDate,
    rangesProp = props.ranges,
    locale = props.locale,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, ["className", "disabledShortcut", "onShortcutClick", "calendarDate", "ranges", "locale"]);
  var _useState = (0, _react.useState)((0, _utils2.getRanges)(props)),
    ranges = _useState[0],
    setRanges = _useState[1];
  (0, _utils.useUpdateEffect)(function () {
    setRanges((0, _utils2.getRanges)({
      ranges: rangesProp,
      calendarDate: calendarDate
    }));
  }, [calendarDate, rangesProp]);
  var hasLocaleKey = (0, _react.useCallback)(function (key) {
    return (0, _utils2.getDefaultRanges)(calendarDate).some(function (item) {
      return item.label === key;
    });
  }, [calendarDate]);
  if (ranges.length === 0) {
    return null;
  }
  return /*#__PURE__*/_react.default.createElement(_Stack.default, (0, _extends2.default)({
    className: className,
    ref: ref,
    alignItems: "flex-start",
    spacing: 4
  }, rest), ranges.map(function (range, index) {
    var value = range.value,
      closeOverlay = range.closeOverlay,
      label = range.label,
      rest = (0, _objectWithoutPropertiesLoose2.default)(range, ["value", "closeOverlay", "label"]);
    var disabled = disabledShortcut === null || disabledShortcut === void 0 ? void 0 : disabledShortcut(value);
    var handleClickShortcut = function handleClickShortcut(event) {
      if (disabled) {
        return;
      }
      onShortcutClick === null || onShortcutClick === void 0 ? void 0 : onShortcutClick(range, closeOverlay !== false ? true : false, event);
    };
    return /*#__PURE__*/_react.default.createElement(_Button.default, (0, _extends2.default)({
      appearance: "link",
      size: "sm",
      key: index,
      disabled: disabled,
      onClick: handleClickShortcut
    }, rest), hasLocaleKey(label) && typeof label === 'string' ? locale === null || locale === void 0 ? void 0 : locale[label] : label);
  }));
});
var _default = PredefinedRanges;
exports.default = _default;