'use client';
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = exports.CustomContext = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _prefix = require("../utils/prefix");
var _DOMHelper = require("../DOMHelper");
var _ToastContainer = _interopRequireWildcard(require("../toaster/ToastContainer"));
var _utils = require("../utils");
var CustomContext = /*#__PURE__*/_react.default.createContext({});
exports.CustomContext = CustomContext;
var themes = ['light', 'dark', 'high-contrast'];

/**
 * CustomProvider is used to provide global configuration, such as language, theme, etc.
 *
 * @see https://rsuitejs.com/components/custom-provider
 */
var CustomProvider = function CustomProvider(props) {
  var children = props.children,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? (0, _prefix.getClassNamePrefix)() : _props$classPrefix,
    theme = props.theme,
    container = props.toastContainer,
    disableRipple = props.disableRipple,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, ["children", "classPrefix", "theme", "toastContainer", "disableRipple"]);
  var toasters = _react.default.useRef(new Map());
  var _usePortal = (0, _utils.usePortal)({
      container: container,
      waitMount: true
    }),
    Portal = _usePortal.Portal;
  var value = _react.default.useMemo(function () {
    return (0, _extends2.default)({
      classPrefix: classPrefix,
      theme: theme,
      toasters: toasters,
      disableRipple: disableRipple
    }, rest);
  }, [classPrefix, theme, disableRipple, rest]);
  (0, _utils.useIsomorphicLayoutEffect)(function () {
    if (_DOMHelper.canUseDOM && theme) {
      (0, _DOMHelper.addClass)(document.body, (0, _prefix.prefix)(classPrefix, "theme-" + theme));

      // Remove the className that will cause style conflicts
      themes.forEach(function (t) {
        if (t !== theme) {
          (0, _DOMHelper.removeClass)(document.body, (0, _prefix.prefix)(classPrefix, "theme-" + t));
        }
      });
    }
  }, [classPrefix, theme]);
  return /*#__PURE__*/_react.default.createElement(CustomContext.Provider, {
    value: value
  }, children, /*#__PURE__*/_react.default.createElement(Portal, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "rs-toast-provider"
  }, _ToastContainer.toastPlacements.map(function (placement) {
    return /*#__PURE__*/_react.default.createElement(_ToastContainer.default, {
      key: placement,
      placement: placement,
      ref: function ref(_ref) {
        toasters.current.set(placement, _ref);
      }
    });
  }))));
};
var _default = CustomProvider;
exports.default = _default;