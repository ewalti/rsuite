'use client';
import _taggedTemplateLiteralLoose from "@babel/runtime/helpers/esm/taggedTemplateLiteralLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _templateObject;
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import isUndefined from 'lodash/isUndefined';
import get from 'lodash/get';
import set from 'lodash/set';
import Input from '../Input';
import FormErrorMessage from '../FormErrorMessage';
import { useClassNames } from '../utils';
import FormContext, { FormValueContext } from '../Form/FormContext';
import { FormGroupContext } from '../FormGroup/FormGroup';
import { useWillUnmount, useEventCallback } from '../utils';
import { oneOf } from '../internals/propTypes';
import useRegisterModel from './useRegisterModel';
import Toggle from '../Toggle';

/**
 * Props that FormControl passes to its accepter
 */

/**
 * The `<Form.Control>` component is used to wrap the components that need to be validated.
 * @see https://rsuitejs.com/components/form/
 */
var FormControl = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _accepterProps;
  var _useContext = useContext(FormContext),
    readOnlyContext = _useContext.readOnly,
    plaintextContext = _useContext.plaintext,
    disabledContext = _useContext.disabled,
    errorFromContext = _useContext.errorFromContext,
    formError = _useContext.formError,
    nestedField = _useContext.nestedField,
    removeFieldValue = _useContext.removeFieldValue,
    removeFieldError = _useContext.removeFieldError,
    pushFieldRule = _useContext.pushFieldRule,
    removeFieldRule = _useContext.removeFieldRule,
    onFieldChange = _useContext.onFieldChange,
    onFieldError = _useContext.onFieldError,
    onFieldSuccess = _useContext.onFieldSuccess,
    getCombinedModel = _useContext.getCombinedModel,
    contextCheckTrigger = _useContext.checkTrigger;
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    _props$accepter = props.accepter,
    AccepterComponent = _props$accepter === void 0 ? Input : _props$accepter,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'form-control' : _props$classPrefix,
    checkAsync = props.checkAsync,
    checkTrigger = props.checkTrigger,
    _props$errorPlacement = props.errorPlacement,
    errorPlacement = _props$errorPlacement === void 0 ? 'bottomStart' : _props$errorPlacement,
    errorMessage = props.errorMessage,
    name = props.name,
    value = props.value,
    _props$readOnly = props.readOnly,
    readOnly = _props$readOnly === void 0 ? readOnlyContext : _props$readOnly,
    _props$plaintext = props.plaintext,
    plaintext = _props$plaintext === void 0 ? plaintextContext : _props$plaintext,
    _props$disabled = props.disabled,
    disabled = _props$disabled === void 0 ? disabledContext : _props$disabled,
    onChange = props.onChange,
    onBlur = props.onBlur,
    defaultValue = props.defaultValue,
    _props$shouldResetWit = props.shouldResetWithUnmount,
    shouldResetWithUnmount = _props$shouldResetWit === void 0 ? false : _props$shouldResetWit,
    rule = props.rule,
    rest = _objectWithoutPropertiesLoose(props, ["as", "accepter", "classPrefix", "checkAsync", "checkTrigger", "errorPlacement", "errorMessage", "name", "value", "readOnly", "plaintext", "disabled", "onChange", "onBlur", "defaultValue", "shouldResetWithUnmount", "rule"]);
  var _useContext2 = useContext(FormGroupContext),
    controlId = _useContext2.controlId;
  if (!onFieldChange) {
    throw new Error("\n      <FormControl> must be inside a component decorated with <Form>.\n      And need to update React to 16.6.0 +.\n    ");
  }
  useRegisterModel(name, pushFieldRule, removeFieldRule, rule);
  useWillUnmount(function () {
    if (shouldResetWithUnmount) {
      removeFieldValue === null || removeFieldValue === void 0 ? void 0 : removeFieldValue(name);
      removeFieldError === null || removeFieldError === void 0 ? void 0 : removeFieldError(name);
    }
  });
  var trigger = checkTrigger || contextCheckTrigger;
  var formValue = useContext(FormValueContext);
  var getFieldValue = function getFieldValue(fieldName) {
    if (!isUndefined(value)) {
      return value;
    }
    return nestedField ? get(formValue, fieldName) : formValue === null || formValue === void 0 ? void 0 : formValue[name];
  };
  var setFieldValue = function setFieldValue(fieldName, fieldValue) {
    var _extends2;
    if (nestedField) {
      return set(_extends({}, formValue), fieldName, fieldValue);
    }
    return _extends({}, formValue, (_extends2 = {}, _extends2[fieldName] = fieldValue, _extends2));
  };
  var getFieldError = function getFieldError(fieldName) {
    if (nestedField) {
      var _name = fieldName.includes('.') ? fieldName.replace('.', '.object.') + '.errorMessage' : fieldName;
      return get(formError, _name);
    }
    return formError === null || formError === void 0 ? void 0 : formError[fieldName];
  };
  var fieldValue = getFieldValue(name);
  var _useClassNames = useClassNames(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    prefix = _useClassNames.prefix;
  var classes = withClassPrefix('wrapper');
  var handleFieldChange = useEventCallback(function (value, event) {
    handleFieldCheck(value, trigger === 'change');
    onFieldChange === null || onFieldChange === void 0 ? void 0 : onFieldChange(name, value, event);
    onChange === null || onChange === void 0 ? void 0 : onChange(value, event);
  });
  var handleFieldBlur = useEventCallback(function (event) {
    handleFieldCheck(fieldValue, trigger === 'blur');
    onBlur === null || onBlur === void 0 ? void 0 : onBlur(event);
  });
  var handleFieldCheck = useEventCallback(function (value, isCheckTrigger) {
    var checkFieldName = nestedField ? name.split('.')[0] : name;
    var callbackEvents = function callbackEvents(checkResult) {
      // The relevant event is triggered only when the inspection is allowed.
      if (isCheckTrigger) {
        if (checkResult.hasError) {
          onFieldError === null || onFieldError === void 0 ? void 0 : onFieldError(checkFieldName, (checkResult === null || checkResult === void 0 ? void 0 : checkResult.errorMessage) || checkResult);
        } else {
          onFieldSuccess === null || onFieldSuccess === void 0 ? void 0 : onFieldSuccess(checkFieldName);
        }
      }
      return checkResult;
    };
    var nextFormValue = setFieldValue(name, value);
    var model = getCombinedModel();
    if (checkAsync) {
      return model === null || model === void 0 ? void 0 : model.checkForFieldAsync(checkFieldName, nextFormValue).then(function (checkResult) {
        return callbackEvents(checkResult);
      });
    }
    return Promise.resolve(callbackEvents(model === null || model === void 0 ? void 0 : model.checkForField(checkFieldName, nextFormValue)));
  });
  var messageNode = null;
  if (!isUndefined(errorMessage)) {
    messageNode = errorMessage;
  } else if (errorFromContext) {
    var fieldError = getFieldError(name);
    if (typeof fieldError === 'string' || !(fieldError !== null && fieldError !== void 0 && fieldError.array) && !(fieldError !== null && fieldError !== void 0 && fieldError.object) && fieldError !== null && fieldError !== void 0 && fieldError.hasError) {
      messageNode = fieldError;
    }
  }
  var ariaDescribedby = controlId ? controlId + "-help-text" : null;
  var fieldHasError = Boolean(messageNode);
  var ariaErrormessage = fieldHasError && controlId ? controlId + "-error-message" : undefined;
  var valueKey = 'value';

  // Toggle component is a special case that uses `checked` and `defaultChecked` instead of `value` and `defaultValue` props.
  if (AccepterComponent === Toggle) {
    valueKey = 'checked';
  }
  var accepterProps = (_accepterProps = {}, _accepterProps[valueKey] = fieldValue === undefined ? defaultValue : fieldValue, _accepterProps);
  return /*#__PURE__*/React.createElement(Component, {
    className: classes,
    ref: ref,
    "data-testid": "form-control-wrapper"
  }, /*#__PURE__*/React.createElement(AccepterComponent, _extends({
    id: controlId,
    "aria-labelledby": controlId ? controlId + "-control-label" : null,
    "aria-describedby": ariaDescribedby,
    "aria-invalid": fieldHasError || undefined,
    "aria-errormessage": ariaErrormessage
  }, accepterProps, rest, {
    readOnly: readOnly,
    plaintext: plaintext,
    disabled: disabled,
    name: name,
    onChange: handleFieldChange,
    onBlur: handleFieldBlur
  })), /*#__PURE__*/React.createElement(FormErrorMessage, {
    id: controlId ? controlId + "-error-message" : undefined,
    role: "alert",
    "aria-relevant": "all",
    show: !!messageNode,
    className: prefix(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["message-wrapper"]))),
    placement: errorPlacement
  }, messageNode));
});
FormControl.displayName = 'FormControl';
FormControl.propTypes = {
  name: PropTypes.string.isRequired,
  checkTrigger: oneOf(['change', 'blur', 'none']),
  checkAsync: PropTypes.bool,
  accepter: PropTypes.any,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  classPrefix: PropTypes.string,
  errorMessage: PropTypes.node,
  errorPlacement: oneOf(['bottomStart', 'bottomEnd', 'topStart', 'topEnd', 'leftStart', 'rightStart', 'leftEnd', 'rightEnd']),
  value: PropTypes.any
};
export default FormControl;