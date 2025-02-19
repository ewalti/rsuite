'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useClassNames, useControlled } from '../utils';
import Stack from '../Stack';
export var RadioTileContext = /*#__PURE__*/React.createContext({});

/**
 * The `RadioTileGroup` component is used to group a collection of `RadioTile` components.
 * @version 5.35.0
 * @see https://rsuitejs.com/components/radio-tile/
 */
var RadioTileGroup = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? Stack : _props$as,
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
    rest = _objectWithoutPropertiesLoose(props, ["as", "className", "inline", "children", "classPrefix", "disabled", "value", "defaultValue", "name", "onChange"]);
  var _useClassNames = useClassNames(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var classes = merge(className, withClassPrefix());
  var _useControlled = useControlled(valueProp, defaultValue),
    value = _useControlled[0],
    setValue = _useControlled[1];
  var handleChange = useCallback(function (nextValue, event) {
    setValue(nextValue);
    onChange === null || onChange === void 0 ? void 0 : onChange(nextValue, event);
  }, [onChange, setValue]);
  var contextValue = useMemo(function () {
    return {
      name: name,
      disabled: disabled,
      value: typeof value === 'undefined' ? null : value,
      onChange: handleChange
    };
  }, [disabled, handleChange, name, value]);
  return /*#__PURE__*/React.createElement(RadioTileContext.Provider, {
    value: contextValue
  }, /*#__PURE__*/React.createElement(Component, _extends({
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
  name: PropTypes.string,
  inline: PropTypes.bool,
  value: PropTypes.any,
  defaultValue: PropTypes.any,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  children: PropTypes.node,
  onChange: PropTypes.func
};
export default RadioTileGroup;