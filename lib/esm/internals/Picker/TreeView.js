'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import React from 'react';
import useCombobox from './hooks/useCombobox';
var TreeView = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var children = props.children,
    treeRootClassName = props.treeRootClassName,
    multiselectable = props.multiselectable,
    rest = _objectWithoutPropertiesLoose(props, ["children", "treeRootClassName", "multiselectable"]);
  var _useCombobox = useCombobox(),
    id = _useCombobox.id,
    labelId = _useCombobox.labelId,
    popupType = _useCombobox.popupType;
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "tree",
    id: id + "-" + popupType,
    "aria-multiselectable": multiselectable,
    "aria-labelledby": labelId,
    ref: ref
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: treeRootClassName
  }, children));
});
export default TreeView;