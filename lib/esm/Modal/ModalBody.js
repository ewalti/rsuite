'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from '../utils';
import { ModalContext } from './ModalContext';
import IconButton from '../IconButton';
import Close from '@rsuite/icons/Close';
import DrawerContext from '../Drawer/DrawerContext';
var ModalBody = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _context$getBodyStyle, _useContext;
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'modal-body' : _props$classPrefix,
    className = props.className,
    style = props.style,
    children = props.children,
    rest = _objectWithoutPropertiesLoose(props, ["as", "classPrefix", "className", "style", "children"]);
  var _useClassNames = useClassNames(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix;
  var classes = merge(className, withClassPrefix());
  var context = useContext(ModalContext);
  var bodyStyles = context === null || context === void 0 ? void 0 : (_context$getBodyStyle = context.getBodyStyles) === null || _context$getBodyStyle === void 0 ? void 0 : _context$getBodyStyle.call(context);
  var closeButton = (_useContext = useContext(DrawerContext)) === null || _useContext === void 0 ? void 0 : _useContext.closeButton;
  var buttonElement = null;
  if (closeButton) {
    buttonElement = typeof closeButton === 'boolean' ? /*#__PURE__*/React.createElement(IconButton, {
      icon: /*#__PURE__*/React.createElement(Close, null),
      appearance: "subtle",
      size: "sm",
      className: prefix('close'),
      onClick: context === null || context === void 0 ? void 0 : context.onModalClose
    }) : closeButton;
  }
  return /*#__PURE__*/React.createElement(Component, _extends({}, rest, {
    ref: ref,
    style: _extends({}, bodyStyles, style),
    className: classes
  }), buttonElement, children);
});
ModalBody.displayName = 'ModalBody';
ModalBody.propTypes = {
  as: PropTypes.elementType,
  classPrefix: PropTypes.string,
  className: PropTypes.string
};
export default ModalBody;