'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import CheckIcon from '@rsuite/icons/Check';
import Stack from '../Stack';
import { RadioTileContext } from '../RadioTileGroup/RadioTileGroup';
import { useClassNames, useControlled, partitionHTMLProps } from '../utils';
import useUniqueId from '../utils/useUniqueId';
/**
 * A series of selectable tile components that behave like Radio.
 * @version 5.35.0
 * @see https://rsuitejs.com/components/radio-tile/
 */
var RadioTile = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useContext = useContext(RadioTileContext),
    groupValue = _useContext.value,
    nameContext = _useContext.name,
    disabledContext = _useContext.disabled,
    onGroupChange = _useContext.onChange;
  var _props$as = props.as,
    Component = _props$as === void 0 ? Stack : _props$as,
    children = props.children,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'radio-tile' : _props$classPrefix,
    checkedProp = props.checked,
    className = props.className,
    defaultChecked = props.defaultChecked,
    _props$disabled = props.disabled,
    disabled = _props$disabled === void 0 ? disabledContext : _props$disabled,
    icon = props.icon,
    value = props.value,
    label = props.label,
    _props$name = props.name,
    name = _props$name === void 0 ? nameContext : _props$name,
    _props$tabIndex = props.tabIndex,
    tabIndex = _props$tabIndex === void 0 ? 0 : _props$tabIndex,
    onChange = props.onChange,
    rest = _objectWithoutPropertiesLoose(props, ["as", "children", "classPrefix", "checked", "className", "defaultChecked", "disabled", "icon", "value", "label", "name", "tabIndex", "onChange"]);
  var _useControlled = useControlled(typeof groupValue !== 'undefined' ? groupValue === value : checkedProp, defaultChecked || false),
    checked = _useControlled[0],
    setChecked = _useControlled[1];
  var _partitionHTMLProps = partitionHTMLProps(rest),
    htmlInputProps = _partitionHTMLProps[0],
    restProps = _partitionHTMLProps[1];
  var _useClassNames = useClassNames(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix,
    prefix = _useClassNames.prefix;
  var handleChange = useCallback(function (event) {
    setChecked(true);
    onGroupChange === null || onGroupChange === void 0 ? void 0 : onGroupChange(value, event);
    onChange === null || onChange === void 0 ? void 0 : onChange(value, event);
  }, [onChange, onGroupChange, setChecked, value]);
  var classes = merge(className, withClassPrefix({
    checked: checked,
    disabled: disabled
  }));
  var radioId = useUniqueId('radio-');
  return /*#__PURE__*/React.createElement(Component, _extends({
    spacing: 6
  }, restProps, {
    childrenRenderMode: "clone",
    ref: ref,
    className: classes,
    as: "label"
  }), /*#__PURE__*/React.createElement("div", {
    className: prefix('icon')
  }, icon), /*#__PURE__*/React.createElement("div", {
    className: prefix('body')
  }, /*#__PURE__*/React.createElement("input", _extends({}, htmlInputProps, {
    type: "radio",
    name: name,
    value: value,
    checked: checked,
    tabIndex: tabIndex,
    disabled: disabled,
    onChange: handleChange,
    "aria-checked": checked,
    "aria-disabled": disabled,
    "aria-labelledby": radioId + "-label",
    "aria-describedby": radioId + "-desc"
  })), /*#__PURE__*/React.createElement("div", {
    className: prefix('label'),
    id: radioId + "-label"
  }, label), /*#__PURE__*/React.createElement("div", {
    className: prefix('content'),
    id: radioId + "-desc"
  }, children), /*#__PURE__*/React.createElement("div", {
    className: prefix('mark')
  }, /*#__PURE__*/React.createElement(CheckIcon, {
    className: prefix('mark-icon')
  }))));
});
RadioTile.displayName = 'RadioTile';
RadioTile.propTypes = {
  children: PropTypes.node,
  classPrefix: PropTypes.string,
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.node,
  label: PropTypes.node,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func
};
export default RadioTile;