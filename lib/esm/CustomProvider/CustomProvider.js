'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import React from 'react';
import { getClassNamePrefix, prefix } from '../utils/prefix';
import { addClass, removeClass, canUseDOM } from '../DOMHelper';
import ToastContainer, { toastPlacements } from '../toaster/ToastContainer';
import { usePortal, useIsomorphicLayoutEffect } from '../utils';
var CustomContext = /*#__PURE__*/React.createContext({});
var themes = ['light', 'dark', 'high-contrast'];

/**
 * CustomProvider is used to provide global configuration, such as language, theme, etc.
 *
 * @see https://rsuitejs.com/components/custom-provider
 */
var CustomProvider = function CustomProvider(props) {
  var children = props.children,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? getClassNamePrefix() : _props$classPrefix,
    theme = props.theme,
    container = props.toastContainer,
    disableRipple = props.disableRipple,
    rest = _objectWithoutPropertiesLoose(props, ["children", "classPrefix", "theme", "toastContainer", "disableRipple"]);
  var toasters = React.useRef(new Map());
  var _usePortal = usePortal({
      container: container,
      waitMount: true
    }),
    Portal = _usePortal.Portal;
  var value = React.useMemo(function () {
    return _extends({
      classPrefix: classPrefix,
      theme: theme,
      toasters: toasters,
      disableRipple: disableRipple
    }, rest);
  }, [classPrefix, theme, disableRipple, rest]);
  useIsomorphicLayoutEffect(function () {
    if (canUseDOM && theme) {
      addClass(document.body, prefix(classPrefix, "theme-" + theme));

      // Remove the className that will cause style conflicts
      themes.forEach(function (t) {
        if (t !== theme) {
          removeClass(document.body, prefix(classPrefix, "theme-" + t));
        }
      });
    }
  }, [classPrefix, theme]);
  return /*#__PURE__*/React.createElement(CustomContext.Provider, {
    value: value
  }, children, /*#__PURE__*/React.createElement(Portal, null, /*#__PURE__*/React.createElement("div", {
    className: "rs-toast-provider"
  }, toastPlacements.map(function (placement) {
    return /*#__PURE__*/React.createElement(ToastContainer, {
      key: placement,
      placement: placement,
      ref: function ref(_ref) {
        toasters.current.set(placement, _ref);
      }
    });
  }))));
};
export { CustomContext };
export default CustomProvider;