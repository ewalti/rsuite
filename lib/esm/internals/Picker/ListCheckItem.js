'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import React from 'react';
import { useClassNames, useEventCallback } from '../../utils';
import Checkbox from '../../Checkbox';
import useCombobox from './hooks/useCombobox';
var ListCheckItem = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$active = props.active,
    active = _props$active === void 0 ? false : _props$active,
    _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    _props$checkboxAs = props.checkboxAs,
    CheckboxItem = _props$checkboxAs === void 0 ? Checkbox : _props$checkboxAs,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'check-item' : _props$classPrefix,
    _props$checkable = props.checkable,
    checkable = _props$checkable === void 0 ? true : _props$checkable,
    disabled = props.disabled,
    value = props.value,
    focus = props.focus,
    children = props.children,
    className = props.className,
    indeterminate = props.indeterminate,
    onKeyDown = props.onKeyDown,
    onSelect = props.onSelect,
    onCheck = props.onCheck,
    onSelectItem = props.onSelectItem,
    renderMenuItemCheckbox = props.renderMenuItemCheckbox,
    rest = _objectWithoutPropertiesLoose(props, ["active", "as", "checkboxAs", "classPrefix", "checkable", "disabled", "value", "focus", "children", "className", "indeterminate", "onKeyDown", "onSelect", "onCheck", "onSelectItem", "renderMenuItemCheckbox"]);
  var handleChange = useEventCallback(function (value, checked, event) {
    onSelect === null || onSelect === void 0 ? void 0 : onSelect(value, event, checked);
  });
  var handleCheck = useEventCallback(function (event) {
    if (!disabled) {
      onCheck === null || onCheck === void 0 ? void 0 : onCheck(value, event, !active);
    }
  });
  var handleSelectItem = useEventCallback(function (event) {
    if (!disabled) {
      onSelectItem === null || onSelectItem === void 0 ? void 0 : onSelectItem(value, event, !active);
    }
  });
  var _useCombobox = useCombobox(),
    id = _useCombobox.id;
  var _useClassNames = useClassNames(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix;
  var checkboxItemClasses = withClassPrefix({
    focus: focus
  });
  var checkboxProps = {
    value: value,
    disabled: disabled,
    indeterminate: indeterminate,
    checkable: checkable,
    children: children,
    checked: active,
    className: checkboxItemClasses,
    onKeyDown: disabled ? undefined : onKeyDown,
    onChange: handleChange,
    onClick: handleSelectItem,
    onCheckboxClick: handleCheck
  };
  return /*#__PURE__*/React.createElement(Component, _extends({
    role: "option",
    "aria-selected": active,
    "aria-disabled": disabled,
    id: id ? id + "-opt-" + value : undefined,
    "data-key": value
  }, rest, {
    ref: ref,
    className: className,
    tabIndex: -1
  }), renderMenuItemCheckbox ? renderMenuItemCheckbox(checkboxProps) : /*#__PURE__*/React.createElement(CheckboxItem, _extends({
    role: "checkbox"
  }, checkboxProps)));
});
ListCheckItem.displayName = 'ListCheckItem';
export default ListCheckItem;