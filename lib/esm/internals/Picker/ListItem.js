'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import React from 'react';
import { useClassNames, useEventCallback } from '../../utils';
import useCombobox from './hooks/useCombobox';
var ListItem = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    _props$role = props.role,
    role = _props$role === void 0 ? 'option' : _props$role,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'dropdown-menu-item' : _props$classPrefix,
    active = props.active,
    children = props.children,
    className = props.className,
    disabled = props.disabled,
    focus = props.focus,
    value = props.value,
    onKeyDown = props.onKeyDown,
    onSelect = props.onSelect,
    renderItem = props.renderItem,
    rest = _objectWithoutPropertiesLoose(props, ["as", "role", "classPrefix", "active", "children", "className", "disabled", "focus", "value", "onKeyDown", "onSelect", "renderItem"]);
  var _useCombobox = useCombobox(),
    id = _useCombobox.id;
  var handleClick = useEventCallback(function (event) {
    event.preventDefault();
    if (!disabled) {
      onSelect === null || onSelect === void 0 ? void 0 : onSelect(value, event);
    }
  });
  var _useClassNames = useClassNames(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix;
  var classes = withClassPrefix({
    active: active,
    focus: focus,
    disabled: disabled
  });
  return /*#__PURE__*/React.createElement(Component, _extends({
    role: role,
    "aria-selected": active,
    "aria-disabled": disabled,
    id: id ? id + "-opt-" + value : undefined,
    "data-key": value
  }, rest, {
    ref: ref,
    className: className,
    tabIndex: -1,
    onKeyDown: disabled ? null : onKeyDown,
    onClick: handleClick
  }), /*#__PURE__*/React.createElement("span", {
    className: classes
  }, renderItem ? renderItem(value) : children));
});
ListItem.displayName = 'ListItem';
export default ListItem;