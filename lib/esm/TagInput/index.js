'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import React, { useMemo } from 'react';
import InputPicker from '../InputPicker/InputPicker';
import InputPickerContext from '../InputPicker/InputPickerContext';
/**
 * The `TagInput` component is an enhancement of Input and supports input tags and management tags.
 *
 * @see https://rsuitejs.com/components/tag-input
 */
var TagInput = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$tagProps = props.tagProps,
    tagProps = _props$tagProps === void 0 ? {} : _props$tagProps,
    _props$trigger = props.trigger,
    trigger = _props$trigger === void 0 ? 'Enter' : _props$trigger,
    value = props.value,
    defaultValue = props.defaultValue,
    onTagRemove = props.onTagRemove,
    rest = _objectWithoutPropertiesLoose(props, ["tagProps", "trigger", "value", "defaultValue", "onTagRemove"]);
  var contextValue = useMemo(function () {
    return {
      multi: true,
      disabledOptions: true,
      trigger: trigger,
      tagProps: tagProps,
      onTagRemove: onTagRemove
    };
  }, [onTagRemove, tagProps, trigger]);
  var data = useMemo(function () {
    return (value || defaultValue || []).map(function (v) {
      return {
        value: v,
        label: v
      };
    });
  }, [defaultValue, value]);
  return /*#__PURE__*/React.createElement(InputPickerContext.Provider, {
    value: contextValue
  }, /*#__PURE__*/React.createElement(InputPicker, _extends({}, rest, {
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
export default TagInput;