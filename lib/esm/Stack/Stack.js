'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames, useCustom, isSupportFlexGap } from '../utils';
import { oneOf } from '../internals/propTypes';
import StackItem from './StackItem';
/**
 * The `Stack` component is a quick layout component through Flexbox,
 * supporting vertical and horizontal stacking, custom spacing and line wrapping.
 *
 * @see https://rsuitejs.com/components/stack
 */
var Stack = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _itemStyles;
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    _props$alignItems = props.alignItems,
    alignItems = _props$alignItems === void 0 ? 'center' : _props$alignItems,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'stack' : _props$classPrefix,
    _props$childrenRender = props.childrenRenderMode,
    childrenRenderMode = _props$childrenRender === void 0 ? 'wrap' : _props$childrenRender,
    className = props.className,
    children = props.children,
    direction = props.direction,
    justifyContent = props.justifyContent,
    spacing = props.spacing,
    divider = props.divider,
    style = props.style,
    wrap = props.wrap,
    rest = _objectWithoutPropertiesLoose(props, ["as", "alignItems", "classPrefix", "childrenRenderMode", "className", "children", "direction", "justifyContent", "spacing", "divider", "style", "wrap"]);
  var _useCustom = useCustom('Stack'),
    rtl = _useCustom.rtl;
  var _useClassNames = useClassNames(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix;
  var classes = merge(className, withClassPrefix());
  var isSupportGap = isSupportFlexGap();
  var flexGap = Array.isArray(spacing) ? spacing : [spacing, spacing];
  var itemStyles = (_itemStyles = {}, _itemStyles[rtl ? 'marginLeft' : 'marginRight'] = flexGap[0], _itemStyles.marginBottom = flexGap[1], _itemStyles);
  var styles = _extends({
    alignItems: alignItems,
    justifyContent: justifyContent,
    flexDirection: direction,
    flexWrap: wrap ? 'wrap' : undefined,
    gap: isSupportGap ? spacing : undefined
  }, style);

  /*
   * toArray remove undefined, null and boolean
   */
  var filterChildren = React.Children.toArray(children);
  var count = filterChildren.length;
  return /*#__PURE__*/React.createElement(Component, _extends({}, rest, {
    ref: ref,
    className: classes,
    style: styles
  }), React.Children.map(filterChildren, function (child, index) {
    var childNode = childrenRenderMode === 'wrap' && child.type !== StackItem ? /*#__PURE__*/React.createElement(StackItem, {
      key: index,
      className: prefix('item'),
      style: !isSupportGap ? itemStyles : undefined
    }, child) : /*#__PURE__*/React.cloneElement(child, {
      className: merge(prefix('item'), child.props.className),
      style: !isSupportGap ? _extends({}, itemStyles, child.props.style) : child.props.style
    });
    return [childNode, index < count - 1 ? divider : null];
  }));
});
Stack.Item = StackItem;
Stack.displayName = 'Stack';
Stack.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  classPrefix: PropTypes.string,
  direction: oneOf(['row', 'row-reverse', 'column', 'column-reverse']),
  alignItems: oneOf(['flex-start', 'center', 'flex-end', 'stretch', 'baseline']),
  justifyContent: oneOf(['flex-start', 'center', 'flex-end', 'space-between', 'space-around']),
  spacing: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array]),
  divider: PropTypes.node,
  wrap: PropTypes.bool
};
export default Stack;