'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import getOffset from 'dom-lib/getOffset';
import { mergeRefs, useClassNames, useElementResize, useEventListener, useMount } from '../utils';
/**
 * Get the layout size and offset of the mount element
 */
function useOffset(mountRef, onOffsetChange) {
  var _useState = useState(null),
    offset = _useState[0],
    setOffset = _useState[1];
  var updateOffset = useCallback(function () {
    if (!mountRef.current) {
      return;
    }
    var newOffset = getOffset(mountRef.current);
    if ((newOffset === null || newOffset === void 0 ? void 0 : newOffset.height) !== (offset === null || offset === void 0 ? void 0 : offset.height) || (newOffset === null || newOffset === void 0 ? void 0 : newOffset.width) !== (offset === null || offset === void 0 ? void 0 : offset.width) || (newOffset === null || newOffset === void 0 ? void 0 : newOffset.top) !== (offset === null || offset === void 0 ? void 0 : offset.top) || (newOffset === null || newOffset === void 0 ? void 0 : newOffset.left) !== (offset === null || offset === void 0 ? void 0 : offset.left)) {
      setOffset(newOffset);
      if (offset !== null && newOffset !== null) {
        onOffsetChange === null || onOffsetChange === void 0 ? void 0 : onOffsetChange(newOffset);
      }
    }
  }, [mountRef, offset, onOffsetChange]);

  // Update after the element size changes
  useElementResize(function () {
    return mountRef.current;
  }, updateOffset);

  // Initialize after the first render
  useMount(updateOffset);

  // Update after window size changes
  useEventListener(window, 'resize', updateOffset, false);

  // Update after window scroll
  useEventListener(window, 'scroll', debounce(updateOffset, 100), false);
  return offset;
}

/**
 * Get the layout size and offset of the container element
 * @param container
 */
function useContainerOffset(container) {
  var _useState2 = useState(null),
    offset = _useState2[0],
    setOffset = _useState2[1];
  useEffect(function () {
    var node = typeof container === 'function' ? container() : container;
    setOffset(node ? getOffset(node) : null);
  }, [container]);
  return offset;
}

/**
 * Check whether the current element should be in a fixed state.
 * @param offset
 * @param containerOffset
 * @param props
 */
function useFixed(offset, containerOffset, props) {
  var top = props.top,
    onChange = props.onChange;
  var _useState3 = useState(false),
    fixed = _useState3[0],
    setFixed = _useState3[1];
  var handleScroll = useCallback(function () {
    if (!offset) {
      return;
    }
    var scrollY = window.scrollY || window.pageYOffset;

    // When the scroll distance exceeds the element's top value, it is fixed.
    var nextFixed = scrollY - (Number(offset === null || offset === void 0 ? void 0 : offset.top) - Number(top)) >= 0;

    // If the current element is specified in the container,
    // add to determine whether the current container is in the window range.
    if (containerOffset) {
      nextFixed = nextFixed && scrollY < Number(containerOffset.top) + Number(containerOffset.height);
    }
    if (nextFixed !== fixed) {
      setFixed(nextFixed);
      onChange === null || onChange === void 0 ? void 0 : onChange(nextFixed);
    }
  }, [offset, top, containerOffset, fixed, onChange]);

  // Add scroll event to window
  useEventListener(window, 'scroll', handleScroll, false);
  return fixed;
}

/**
 * Components such as navigation, buttons, etc. can be fixed in the visible range.
 * Commonly used for pages with long content, fixed the specified elements in the visible range of the page to assist in quick operation.
 *
 * @see https://rsuitejs.com/components/affix/
 */
var Affix = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _merge;
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'affix' : _props$classPrefix,
    className = props.className,
    children = props.children,
    container = props.container,
    _props$top = props.top,
    top = _props$top === void 0 ? 0 : _props$top,
    onChange = props.onChange,
    onOffsetChange = props.onOffsetChange,
    rest = _objectWithoutPropertiesLoose(props, ["as", "classPrefix", "className", "children", "container", "top", "onChange", "onOffsetChange"]);
  var mountRef = useRef(null);
  var offset = useOffset(mountRef, onOffsetChange);
  var containerOffset = useContainerOffset(container);
  var fixed = useFixed(offset, containerOffset, {
    top: top,
    onChange: onChange
  });
  var _useClassNames = useClassNames(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge;
  var classes = merge(className, (_merge = {}, _merge[withClassPrefix()] = fixed, _merge));
  var _ref = offset || {},
    width = _ref.width,
    height = _ref.height;
  var placeholderStyles = fixed ? {
    width: width,
    height: height
  } : undefined;
  var fixedStyles = {
    position: 'fixed',
    top: top,
    width: width,
    zIndex: 10
  };
  var affixStyles = fixed ? fixedStyles : undefined;
  return /*#__PURE__*/React.createElement(Component, _extends({}, rest, {
    ref: mergeRefs(mountRef, ref)
  }), /*#__PURE__*/React.createElement("div", {
    className: classes,
    style: affixStyles
  }, children), fixed && /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: placeholderStyles
  }));
});
Affix.displayName = 'Affix';
Affix.propTypes = {
  top: PropTypes.number,
  onChange: PropTypes.func,
  container: PropTypes.oneOfType([PropTypes.any, PropTypes.func])
};
export default Affix;