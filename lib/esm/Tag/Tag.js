'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _taggedTemplateLiteralLoose from "@babel/runtime/helpers/esm/taggedTemplateLiteralLoose";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _templateObject, _templateObject2;
import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames, useCustom } from '../utils';
import CloseButton from '../internals/CloseButton';
/**
 * The `Tag` component is used to label and categorize.
 * It can be used to mark the status of an object or classify it into different categories.
 *
 * @see https://rsuitejs.com/components/tag
 */
var Tag = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'tag' : _props$classPrefix,
    _props$size = props.size,
    size = _props$size === void 0 ? 'md' : _props$size,
    _props$color = props.color,
    color = _props$color === void 0 ? 'default' : _props$color,
    children = props.children,
    closable = props.closable,
    className = props.className,
    onClose = props.onClose,
    rest = _objectWithoutPropertiesLoose(props, ["as", "classPrefix", "size", "color", "children", "closable", "className", "onClose"]);
  var _useClassNames = useClassNames(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    prefix = _useClassNames.prefix,
    merge = _useClassNames.merge;
  var classes = merge(className, withClassPrefix(size, color, {
    closable: closable
  }));
  var _useCustom = useCustom(),
    locale = _useCustom.locale;
  return /*#__PURE__*/React.createElement(Component, _extends({}, rest, {
    ref: ref,
    className: classes
  }), /*#__PURE__*/React.createElement("span", {
    className: prefix(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["text"])))
  }, children), closable && /*#__PURE__*/React.createElement(CloseButton, {
    className: prefix(_templateObject2 || (_templateObject2 = _taggedTemplateLiteralLoose(["icon-close"]))),
    onClick: onClose,
    tabIndex: -1,
    locale: {
      closeLabel: locale === null || locale === void 0 ? void 0 : locale.remove
    }
  }));
});
Tag.displayName = 'Tag';
Tag.propTypes = {
  closable: PropTypes.bool,
  classPrefix: PropTypes.string,
  onClose: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
  as: PropTypes.elementType
};
export default Tag;