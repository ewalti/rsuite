'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import React from 'react';
import InputGroup from '../../InputGroup';
var PickerLabel = function PickerLabel(_ref) {
  var children = _ref.children,
    className = _ref.className,
    _ref$as = _ref.as,
    Component = _ref$as === void 0 ? InputGroup.Addon : _ref$as,
    rest = _objectWithoutPropertiesLoose(_ref, ["children", "className", "as"]);
  return children ? /*#__PURE__*/React.createElement(Component, _extends({
    "data-testid": "picker-label",
    className: className
  }, rest), children) : null;
};
export default PickerLabel;