'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FormGroupContext } from '../FormGroup/FormGroup';
import { InputGroupContext } from '../InputGroup/InputGroup';
import Plaintext from '../internals/Plaintext';
import { createChainedFunction, mergeRefs, useClassNames, KEY_VALUES } from '../utils';
import { refType, oneOf } from '../internals/propTypes';
/**
 * The `<Input>` component is used to get user input in a text field.
 *
 * @see https://rsuitejs.com/components/input
 */
var Input = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var className = props.className,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'input' : _props$classPrefix,
    _props$as = props.as,
    Component = _props$as === void 0 ? 'input' : _props$as,
    _props$type = props.type,
    type = _props$type === void 0 ? 'text' : _props$type,
    disabled = props.disabled,
    value = props.value,
    defaultValue = props.defaultValue,
    inputRef = props.inputRef,
    id = props.id,
    size = props.size,
    htmlSize = props.htmlSize,
    plaintext = props.plaintext,
    readOnly = props.readOnly,
    onPressEnter = props.onPressEnter,
    onFocus = props.onFocus,
    onBlur = props.onBlur,
    onKeyDown = props.onKeyDown,
    onChange = props.onChange,
    rest = _objectWithoutPropertiesLoose(props, ["className", "classPrefix", "as", "type", "disabled", "value", "defaultValue", "inputRef", "id", "size", "htmlSize", "plaintext", "readOnly", "onPressEnter", "onFocus", "onBlur", "onKeyDown", "onChange"]);
  var handleKeyDown = function handleKeyDown(event) {
    if (event.key === KEY_VALUES.ENTER) {
      onPressEnter === null || onPressEnter === void 0 ? void 0 : onPressEnter(event);
    }
    onKeyDown === null || onKeyDown === void 0 ? void 0 : onKeyDown(event);
  };
  var handleChange = function handleChange(event) {
    var _event$target;
    onChange === null || onChange === void 0 ? void 0 : onChange((_event$target = event.target) === null || _event$target === void 0 ? void 0 : _event$target.value, event);
  };
  var _useClassNames = useClassNames(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge;
  var classes = merge(className, withClassPrefix(size, {
    plaintext: plaintext
  }));
  var inputGroupContext = useContext(InputGroupContext);
  var formGroupContext = useContext(FormGroupContext);

  // Make the Input component display in plain text,
  // and display default characters when there is no value.
  if (plaintext) {
    return /*#__PURE__*/React.createElement(Plaintext, {
      ref: ref,
      localeKey: "unfilled"
    }, typeof value === 'undefined' ? defaultValue : value);
  }
  var inputable = !disabled && !readOnly;
  var eventProps = {};
  if (inputable) {
    eventProps.onChange = handleChange;
    eventProps.onKeyDown = handleKeyDown;
    eventProps.onFocus = createChainedFunction(onFocus, inputGroupContext === null || inputGroupContext === void 0 ? void 0 : inputGroupContext.onFocus);
    eventProps.onBlur = createChainedFunction(onBlur, inputGroupContext === null || inputGroupContext === void 0 ? void 0 : inputGroupContext.onBlur);
  }
  return /*#__PURE__*/React.createElement(Component, _extends({}, rest, eventProps, {
    ref: mergeRefs(ref, inputRef),
    className: classes,
    type: type,
    id: id || (formGroupContext === null || formGroupContext === void 0 ? void 0 : formGroupContext.controlId),
    value: value,
    defaultValue: defaultValue,
    disabled: disabled,
    readOnly: readOnly,
    size: htmlSize
  }));
});
Input.displayName = 'Input';
Input.propTypes = {
  type: PropTypes.string,
  as: PropTypes.elementType,
  id: PropTypes.string,
  classPrefix: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  size: oneOf(['lg', 'md', 'sm', 'xs']),
  inputRef: refType,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onKeyDown: PropTypes.func,
  onPressEnter: PropTypes.func
};
export default Input;