'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import React, { useMemo } from 'react';
import InputPicker from '../InputPicker/InputPicker';
import InputPickerContext from '../InputPicker/InputPickerContext';
/**
 * `TagPicker` component enables multi-selection by tags and supports new options.
 *
 * @see https://rsuitejs.com/components/tag-picker/
 */
var TagPicker = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$tagProps = props.tagProps,
    tagProps = _props$tagProps === void 0 ? {} : _props$tagProps,
    _props$trigger = props.trigger,
    trigger = _props$trigger === void 0 ? 'Enter' : _props$trigger,
    onTagRemove = props.onTagRemove,
    renderMenuItemCheckbox = props.renderMenuItemCheckbox,
    rest = _objectWithoutPropertiesLoose(props, ["tagProps", "trigger", "onTagRemove", "renderMenuItemCheckbox"]);
  var contextValue = useMemo(function () {
    return {
      multi: true,
      trigger: trigger,
      tagProps: tagProps,
      onTagRemove: onTagRemove,
      renderMenuItemCheckbox: renderMenuItemCheckbox
    };
  }, [onTagRemove, renderMenuItemCheckbox, tagProps, trigger]);
  return /*#__PURE__*/React.createElement(InputPickerContext.Provider, {
    value: contextValue
  }, /*#__PURE__*/React.createElement(InputPicker, _extends({}, rest, {
    ref: ref
  })));
});
TagPicker.displayName = 'TagPicker';
export default TagPicker;