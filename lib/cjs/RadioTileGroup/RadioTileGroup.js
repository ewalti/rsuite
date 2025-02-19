'use client';
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = exports.RadioTileContext = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _utils = require("../utils");
var _Stack = _interopRequireDefault(require("../Stack"));
var RadioTileContext = /*#__PURE__*/_react.default.createContext({});

/**
 * The `RadioTileGroup` component is used to group a collection of `RadioTile` components.
 * @version 5.35.0
 * @see https://rsuitejs.com/components/radio-tile/
 */
exports.RadioTileContext = RadioTileContext;
var RadioTileGroup = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? _Stack.default : _props$as,
    className = props.className,
    inline = props.inline,
    children = props.children,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'radio-tile-group' : _props$classPrefix,
    disabled = props.disabled,
    valueProp = props.value,
    defaultValue = props.defaultValue,
    name = props.name,
    onChange = props.onChange,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, ["as", "className", "inline", "children", "classPrefix", "disabled", "value", "defaultValue", "name", "onChange"]);
  var _useClassNames = (0, _utils.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var classes = merge(className, withClassPrefix());
  var _useControlled = (0, _utils.useControlled)(valueProp, defaultValue),
    value = _useControlled[0],
    setValue = _useControlled[1];
  var handleChange = (0, _react.useCallback)(function (nextValue, event) {
    setValue(nextValue);
    onChange === null || onChange === void 0 ? void 0 : onChange(nextValue, event);
  }, [onChange, setValue]);
  var contextValue = (0, _react.useMemo)(function () {
    return {
      name: name,
      disabled: disabled,
      value: typeof value === 'undefined' ? null : value,
      onChange: handleChange
    };
  }, [disabled, handleChange, name, value]);
  return /*#__PURE__*/_react.default.createElement(RadioTileContext.Provider, {
    value: contextValue
  }, /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
    alignItems: "stretch",
    spacing: 10
  }, rest, {
    role: "radiogroup",
    childrenRenderMode: "clone",
    direction: inline ? 'row' : 'column',
    ref: ref,
    className: classes
  }), children));
});
RadioTileGroup.displayName = 'RadioTileGroup';
RadioTileGroup.propTypes = {
  name: _propTypes.default.string,
  inline: _propTypes.default.bool,
  value: _propTypes.default.any,
  defaultValue: _propTypes.default.any,
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  children: _propTypes.default.node,
  onChange: _propTypes.default.func
};
var _default = RadioTileGroup;
exports.default = _default;