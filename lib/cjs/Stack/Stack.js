'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _utils = require("../utils");
var _propTypes2 = require("../internals/propTypes");
var _StackItem = _interopRequireDefault(require("./StackItem"));
/**
 * The `Stack` component is a quick layout component through Flexbox,
 * supporting vertical and horizontal stacking, custom spacing and line wrapping.
 *
 * @see https://rsuitejs.com/components/stack
 */
var Stack = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
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
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, ["as", "alignItems", "classPrefix", "childrenRenderMode", "className", "children", "direction", "justifyContent", "spacing", "divider", "style", "wrap"]);
  var _useCustom = (0, _utils.useCustom)('Stack'),
    rtl = _useCustom.rtl;
  var _useClassNames = (0, _utils.useClassNames)(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix;
  var classes = merge(className, withClassPrefix());
  var isSupportGap = (0, _utils.isSupportFlexGap)();
  var flexGap = Array.isArray(spacing) ? spacing : [spacing, spacing];
  var itemStyles = (_itemStyles = {}, _itemStyles[rtl ? 'marginLeft' : 'marginRight'] = flexGap[0], _itemStyles.marginBottom = flexGap[1], _itemStyles);
  var styles = (0, _extends2.default)({
    alignItems: alignItems,
    justifyContent: justifyContent,
    flexDirection: direction,
    flexWrap: wrap ? 'wrap' : undefined,
    gap: isSupportGap ? spacing : undefined
  }, style);

  /*
   * toArray remove undefined, null and boolean
   */
  var filterChildren = _react.default.Children.toArray(children);
  var count = filterChildren.length;
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({}, rest, {
    ref: ref,
    className: classes,
    style: styles
  }), _react.default.Children.map(filterChildren, function (child, index) {
    var childNode = childrenRenderMode === 'wrap' && child.type !== _StackItem.default ? /*#__PURE__*/_react.default.createElement(_StackItem.default, {
      key: index,
      className: prefix('item'),
      style: !isSupportGap ? itemStyles : undefined
    }, child) : /*#__PURE__*/_react.default.cloneElement(child, {
      className: merge(prefix('item'), child.props.className),
      style: !isSupportGap ? (0, _extends2.default)({}, itemStyles, child.props.style) : child.props.style
    });
    return [childNode, index < count - 1 ? divider : null];
  }));
});
Stack.Item = _StackItem.default;
Stack.displayName = 'Stack';
Stack.propTypes = {
  className: _propTypes.default.string,
  children: _propTypes.default.node,
  classPrefix: _propTypes.default.string,
  direction: (0, _propTypes2.oneOf)(['row', 'row-reverse', 'column', 'column-reverse']),
  alignItems: (0, _propTypes2.oneOf)(['flex-start', 'center', 'flex-end', 'stretch', 'baseline']),
  justifyContent: (0, _propTypes2.oneOf)(['flex-start', 'center', 'flex-end', 'space-between', 'space-around']),
  spacing: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string, _propTypes.default.array]),
  divider: _propTypes.default.node,
  wrap: _propTypes.default.bool
};
var _default = Stack;
exports.default = _default;