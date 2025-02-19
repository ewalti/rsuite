'use client';
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireWildcard(require("react"));
var _reactDom = require("react-dom");
var _canUseDOM = _interopRequireDefault(require("dom-lib/canUseDOM"));
var MountedPortal = /*#__PURE__*/_react.default.memo(function (_ref) {
  var children = _ref.children,
    container = _ref.container;
  var _useState = (0, _react.useState)(false),
    mounted = _useState[0],
    setMounted = _useState[1];
  (0, _react.useEffect)(function () {
    return setMounted(true);
  }, []);
  if (container && mounted) {
    return /*#__PURE__*/(0, _reactDom.createPortal)(children, container);
  }
  return null;
});
function usePortal(props) {
  if (props === void 0) {
    props = {};
  }
  var _props = props,
    container = _props.container,
    _props$waitMount = _props.waitMount,
    waitMount = _props$waitMount === void 0 ? false : _props$waitMount;
  var containerElement = typeof container === 'function' ? container() : container;
  var rootElement = (0, _react.useMemo)(function () {
    return _canUseDOM.default ? containerElement || document.body : null;
  }, [containerElement]);
  var Portal = (0, _react.useCallback)(function (_ref2) {
    var children = _ref2.children;
    return rootElement != null ? /*#__PURE__*/(0, _reactDom.createPortal)(children, rootElement) : null;
  }, [rootElement]);
  var WaitMountPortal = (0, _react.useCallback)(function (props) {
    return /*#__PURE__*/_react.default.createElement(MountedPortal, (0, _extends2.default)({
      container: rootElement
    }, props));
  }, [rootElement]);
  return {
    target: rootElement,
    Portal: waitMount ? WaitMountPortal : Portal
  };
}
var _default = usePortal;
exports.default = _default;