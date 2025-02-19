'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from '../utils';
import Stack from '../Stack';
/**
 * The ButtonToolbar component is used to group a series of buttons together in a single line.
 * @see https://rsuitejs.com/components/button/#button-toolbar
 */
var ButtonToolbar = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var className = props.className,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'btn-toolbar' : _props$classPrefix,
    _props$as = props.as,
    Component = _props$as === void 0 ? Stack : _props$as,
    _props$role = props.role,
    role = _props$role === void 0 ? 'toolbar' : _props$role,
    rest = _objectWithoutPropertiesLoose(props, ["className", "classPrefix", "as", "role"]);
  var stackProps = Component === Stack ? {
    wrap: true,
    spacing: 10,
    childrenRenderMode: 'clone'
  } : null;
  var _useClassNames = useClassNames(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge;
  var classes = merge(className, withClassPrefix());
  return /*#__PURE__*/React.createElement(Component, _extends({}, stackProps, rest, {
    role: role,
    ref: ref,
    className: classes
  }));
});
ButtonToolbar.displayName = 'ButtonToolbar';
ButtonToolbar.propTypes = {
  as: PropTypes.elementType,
  classPrefix: PropTypes.string
};
export default ButtonToolbar;