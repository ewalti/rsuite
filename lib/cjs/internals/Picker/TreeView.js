'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _useCombobox2 = _interopRequireDefault(require("./hooks/useCombobox"));
var TreeView = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var children = props.children,
    treeRootClassName = props.treeRootClassName,
    multiselectable = props.multiselectable,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, ["children", "treeRootClassName", "multiselectable"]);
  var _useCombobox = (0, _useCombobox2.default)(),
    id = _useCombobox.id,
    labelId = _useCombobox.labelId,
    popupType = _useCombobox.popupType;
  return /*#__PURE__*/_react.default.createElement("div", (0, _extends2.default)({
    role: "tree",
    id: id + "-" + popupType,
    "aria-multiselectable": multiselectable,
    "aria-labelledby": labelId,
    ref: ref
  }, rest), /*#__PURE__*/_react.default.createElement("div", {
    className: treeRootClassName
  }, children));
});
var _default = TreeView;
exports.default = _default;