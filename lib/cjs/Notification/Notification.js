'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _taggedTemplateLiteralLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteralLoose"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _utils = require("../utils");
var _propTypes2 = require("../internals/propTypes");
var _CloseButton = _interopRequireDefault(require("../internals/CloseButton"));
var _ToastContext = _interopRequireDefault(require("../toaster/ToastContext"));
var _templateObject, _templateObject2;
/**
 * The `Notification` component is used to display global messages and notifications.
 *
 * @see https://rsuitejs.com/components/notification
 */
var Notification = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'notification' : _props$classPrefix,
    closable = props.closable,
    _props$duration = props.duration,
    duration = _props$duration === void 0 ? 4500 : _props$duration,
    className = props.className,
    type = props.type,
    header = props.header,
    children = props.children,
    onClose = props.onClose,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, ["as", "classPrefix", "closable", "duration", "className", "type", "header", "children", "onClose"]);
  var _useState = (0, _react.useState)('show'),
    display = _useState[0],
    setDisplay = _useState[1];
  var _useClassNames = (0, _utils.useClassNames)(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix;
  var isMounted = (0, _utils.useIsMounted)();
  var _useContext = (0, _react.useContext)(_ToastContext.default),
    usedToaster = _useContext.usedToaster; // Timed close message
  var _useTimeout = (0, _utils.useTimeout)(onClose, duration, usedToaster && duration > 0),
    clear = _useTimeout.clear; // Click to trigger to close the message
  var handleClose = (0, _utils.useEventCallback)(function (event) {
    setDisplay('hiding');
    onClose === null || onClose === void 0 ? void 0 : onClose(event);
    clear();
    setTimeout(function () {
      if (isMounted()) {
        setDisplay('hide');
      }
    }, 1000);
  });
  var renderHeader = function renderHeader() {
    if (!header) {
      return null;
    }
    return /*#__PURE__*/_react.default.createElement("div", {
      className: prefix('title')
    }, type ? /*#__PURE__*/_react.default.createElement("div", {
      className: prefix(_templateObject || (_templateObject = (0, _taggedTemplateLiteralLoose2.default)(["title-with-icon"])))
    }, _utils.MESSAGE_STATUS_ICONS[type], header) : /*#__PURE__*/_react.default.createElement("div", {
      className: prefix('title')
    }, header));
  };
  if (display === 'hide') {
    return null;
  }
  var classes = merge(className, withClassPrefix(type, display, {
    closable: closable
  }));
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
    role: "alert"
  }, rest, {
    ref: ref,
    className: classes
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: prefix(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteralLoose2.default)(["content"])))
  }, renderHeader(), /*#__PURE__*/_react.default.createElement("div", {
    className: prefix('description')
  }, typeof children === 'function' ? children() : children)), closable && /*#__PURE__*/_react.default.createElement(_CloseButton.default, {
    onClick: handleClose
  }));
});
Notification.displayName = 'Notification';
Notification.propTypes = {
  as: _propTypes.default.elementType,
  duration: _propTypes.default.number,
  header: _propTypes.default.node,
  closable: _propTypes.default.bool,
  classPrefix: _propTypes.default.string,
  className: _propTypes.default.string,
  type: (0, _propTypes2.oneOf)(['info', 'success', 'warning', 'error']),
  onClose: _propTypes.default.func
};
var _default = Notification;
exports.default = _default;