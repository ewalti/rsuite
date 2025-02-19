'use client';
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _InputPicker = _interopRequireDefault(require("../InputPicker/InputPicker"));
var _InputPickerContext = _interopRequireDefault(require("../InputPicker/InputPickerContext"));
/**
 * The `TagInput` component is an enhancement of Input and supports input tags and management tags.
 *
 * @see https://rsuitejs.com/components/tag-input
 */
var TagInput = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _props$tagProps = props.tagProps,
    tagProps = _props$tagProps === void 0 ? {} : _props$tagProps,
    _props$trigger = props.trigger,
    trigger = _props$trigger === void 0 ? 'Enter' : _props$trigger,
    value = props.value,
    defaultValue = props.defaultValue,
    onTagRemove = props.onTagRemove,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, ["tagProps", "trigger", "value", "defaultValue", "onTagRemove"]);
  var contextValue = (0, _react.useMemo)(function () {
    return {
      multi: true,
      disabledOptions: true,
      trigger: trigger,
      tagProps: tagProps,
      onTagRemove: onTagRemove
    };
  }, [onTagRemove, tagProps, trigger]);
  var data = (0, _react.useMemo)(function () {
    return (value || defaultValue || []).map(function (v) {
      return {
        value: v,
        label: v
      };
    });
  }, [defaultValue, value]);
  return /*#__PURE__*/_react.default.createElement(_InputPickerContext.default.Provider, {
    value: contextValue
  }, /*#__PURE__*/_react.default.createElement(_InputPicker.default, (0, _extends2.default)({}, rest, {
    "aria-haspopup": false,
    "aria-expanded": undefined,
    "aria-controls": undefined,
    "aria-keyshortcuts": trigger,
    value: value,
    defaultValue: defaultValue,
    data: data,
    placement: undefined,
    creatable: true,
    ref: ref
  })));
});
TagInput.displayName = 'TagInput';
var _default = TagInput;
exports.default = _default;