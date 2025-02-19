'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireDefault(require("react"));
var _PanelGroup = _interopRequireDefault(require("../PanelGroup"));
var _Panel = _interopRequireDefault(require("../Panel"));
/**
 * The `Accordion` component is used to display content that can be collapsed.
 * @see https://rsuitejs.com/components/accordion
 */
var Accordion = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  return /*#__PURE__*/_react.default.createElement(_PanelGroup.default, (0, _extends2.default)({
    accordion: true,
    ref: ref
  }, props));
});
Accordion.Panel = _Panel.default;
Accordion.displayName = 'Accordion';
var _default = Accordion;
exports.default = _default;