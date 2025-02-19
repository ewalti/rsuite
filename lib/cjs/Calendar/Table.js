'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _TableRow = _interopRequireDefault(require("./TableRow"));
var _TableHeaderRow = _interopRequireDefault(require("./TableHeaderRow"));
var _utils = require("../utils");
var _CalendarContext = require("./CalendarContext");
var Table = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    className = props.className,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'calendar-table' : _props$classPrefix,
    _props$rows = props.rows,
    rows = _props$rows === void 0 ? [] : _props$rows,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, ["as", "className", "classPrefix", "rows"]);
  var _useClassNames = (0, _utils.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var classes = merge(className, withClassPrefix());
  var _useCalendarContext = (0, _CalendarContext.useCalendarContext)(),
    targetId = _useCalendarContext.targetId;
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
    role: "grid",
    tabIndex: -1,
    id: targetId ? targetId + "-" + classPrefix : undefined
  }, rest, {
    ref: ref,
    className: classes
  }), /*#__PURE__*/_react.default.createElement(_TableHeaderRow.default, null), rows.map(function (week, index) {
    return /*#__PURE__*/_react.default.createElement(_TableRow.default, {
      key: index,
      weekendDate: week,
      rowIndex: index + 1
    });
  }));
});
Table.displayName = 'CalendarTable';
Table.propTypes = {
  rows: _propTypes.default.array,
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string
};
var _default = Table;
exports.default = _default;