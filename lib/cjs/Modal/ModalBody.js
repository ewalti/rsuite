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
var _ModalContext = require("./ModalContext");
var _IconButton = _interopRequireDefault(require("../IconButton"));
var _Close = _interopRequireDefault(require("@rsuite/icons/Close"));
var _DrawerContext = _interopRequireDefault(require("../Drawer/DrawerContext"));
var ModalBody = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _context$getBodyStyle, _useContext;
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'modal-body' : _props$classPrefix,
    className = props.className,
    style = props.style,
    children = props.children,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, ["as", "classPrefix", "className", "style", "children"]);
  var _useClassNames = (0, _utils.useClassNames)(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix;
  var classes = merge(className, withClassPrefix());
  var context = (0, _react.useContext)(_ModalContext.ModalContext);
  var bodyStyles = context === null || context === void 0 ? void 0 : (_context$getBodyStyle = context.getBodyStyles) === null || _context$getBodyStyle === void 0 ? void 0 : _context$getBodyStyle.call(context);
  var closeButton = (_useContext = (0, _react.useContext)(_DrawerContext.default)) === null || _useContext === void 0 ? void 0 : _useContext.closeButton;
  var buttonElement = null;
  if (closeButton) {
    buttonElement = typeof closeButton === 'boolean' ? /*#__PURE__*/_react.default.createElement(_IconButton.default, {
      icon: /*#__PURE__*/_react.default.createElement(_Close.default, null),
      appearance: "subtle",
      size: "sm",
      className: prefix('close'),
      onClick: context === null || context === void 0 ? void 0 : context.onModalClose
    }) : closeButton;
  }
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({}, rest, {
    ref: ref,
    style: (0, _extends2.default)({}, bodyStyles, style),
    className: classes
  }), buttonElement, children);
});
ModalBody.displayName = 'ModalBody';
ModalBody.propTypes = {
  as: _propTypes.default.elementType,
  classPrefix: _propTypes.default.string,
  className: _propTypes.default.string
};
var _default = ModalBody;
exports.default = _default;