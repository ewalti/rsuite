'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import React, { useMemo, useImperativeHandle, useRef } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import set from 'lodash/set';
import { SchemaModel } from 'schema-typed';
import FormContext, { FormValueContext } from './FormContext';
import FormControl from '../FormControl';
import FormControlLabel from '../FormControlLabel';
import FormErrorMessage from '../FormErrorMessage';
import FormGroup from '../FormGroup';
import FormHelpText from '../FormHelpText';
import { useFormClassNames } from './useFormClassNames';
import useSchemaModel from './useSchemaModel';
import { useControlled, useEventCallback } from '../utils';
import { oneOf } from '../internals/propTypes';
/**
 * The `Form` component is a form interface for collecting and validating user input.
 * @see https://rsuitejs.com/components/form
 */
var Form = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$checkTrigger = props.checkTrigger,
    checkTrigger = _props$checkTrigger === void 0 ? 'change' : _props$checkTrigger,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'form' : _props$classPrefix,
    _props$errorFromConte = props.errorFromContext,
    errorFromContext = _props$errorFromConte === void 0 ? true : _props$errorFromConte,
    _props$formDefaultVal = props.formDefaultValue,
    formDefaultValue = _props$formDefaultVal === void 0 ? {} : _props$formDefaultVal,
    formValue = props.formValue,
    formError = props.formError,
    fluid = props.fluid,
    _props$nestedField = props.nestedField,
    nestedField = _props$nestedField === void 0 ? false : _props$nestedField,
    _props$layout = props.layout,
    layout = _props$layout === void 0 ? 'vertical' : _props$layout,
    _props$model = props.model,
    formModel = _props$model === void 0 ? SchemaModel({}) : _props$model,
    readOnly = props.readOnly,
    plaintext = props.plaintext,
    className = props.className,
    children = props.children,
    disabled = props.disabled,
    onSubmit = props.onSubmit,
    onCheck = props.onCheck,
    onError = props.onError,
    onChange = props.onChange,
    rest = _objectWithoutPropertiesLoose(props, ["checkTrigger", "classPrefix", "errorFromContext", "formDefaultValue", "formValue", "formError", "fluid", "nestedField", "layout", "model", "readOnly", "plaintext", "className", "children", "disabled", "onSubmit", "onCheck", "onError", "onChange"]);
  var _useSchemaModel = useSchemaModel(formModel),
    getCombinedModel = _useSchemaModel.getCombinedModel,
    pushFieldRule = _useSchemaModel.pushFieldRule,
    removeFieldRule = _useSchemaModel.removeFieldRule;
  var classes = useFormClassNames({
    classPrefix: classPrefix,
    className: className,
    fluid: fluid,
    layout: layout,
    readOnly: readOnly,
    plaintext: plaintext,
    disabled: disabled
  });
  var _useControlled = useControlled(formValue, formDefaultValue),
    realFormValue = _useControlled[0],
    setFormValue = _useControlled[1];
  var _useControlled2 = useControlled(formError, {}),
    realFormError = _useControlled2[0],
    setFormError = _useControlled2[1];
  var realFormValueRef = useRef(realFormValue);
  realFormValueRef.current = realFormValue;
  var realFormErrorRef = useRef(realFormError);
  realFormErrorRef.current = realFormError;

  /**
   * Validate the form data and return a boolean.
   * The error message after verification is returned in the callback.
   * @param callback
   */
  var check = useEventCallback(function (callback) {
    var formValue = realFormValue || {};
    var formError = {};
    var errorCount = 0;
    var model = getCombinedModel();
    Object.keys(model.spec).forEach(function (key) {
      var checkResult = model.checkForField(key, formValue);
      if (checkResult.hasError === true) {
        errorCount += 1;
        formError[key] = (checkResult === null || checkResult === void 0 ? void 0 : checkResult.errorMessage) || checkResult;
      }
    });
    setFormError(formError);
    onCheck === null || onCheck === void 0 ? void 0 : onCheck(formError);
    callback === null || callback === void 0 ? void 0 : callback(formError);
    if (errorCount > 0) {
      onError === null || onError === void 0 ? void 0 : onError(formError);
      return false;
    }
    return true;
  });

  /**
   * Check the data field
   * @param fieldName
   * @param callback
   */
  var checkForField = useEventCallback(function (fieldName, callback) {
    var _extends2;
    var formValue = realFormValue || {};
    var model = getCombinedModel();
    var checkResult = model.checkForField(fieldName, formValue);
    var formError = _extends({}, realFormError, (_extends2 = {}, _extends2[fieldName] = (checkResult === null || checkResult === void 0 ? void 0 : checkResult.errorMessage) || checkResult, _extends2));
    setFormError(formError);
    onCheck === null || onCheck === void 0 ? void 0 : onCheck(formError);
    callback === null || callback === void 0 ? void 0 : callback(checkResult);
    if (checkResult.hasError) {
      onError === null || onError === void 0 ? void 0 : onError(formError);
    }
    return !checkResult.hasError;
  });

  /**
   * Check form data asynchronously and return a Promise
   */
  var checkAsync = useEventCallback(function () {
    var formValue = realFormValue || {};
    var promises = [];
    var keys = [];
    var model = getCombinedModel();
    Object.keys(model.spec).forEach(function (key) {
      keys.push(key);
      promises.push(model.checkForFieldAsync(key, formValue));
    });
    return Promise.all(promises).then(function (values) {
      var formError = {};
      var errorCount = 0;
      for (var i = 0; i < values.length; i++) {
        if (values[i].hasError) {
          errorCount += 1;
          formError[keys[i]] = values[i].errorMessage;
        }
      }
      onCheck === null || onCheck === void 0 ? void 0 : onCheck(formError);
      setFormError(formError);
      if (errorCount > 0) {
        onError === null || onError === void 0 ? void 0 : onError(formError);
      }
      return {
        hasError: errorCount > 0,
        formError: formError
      };
    });
  });

  /**
   * Asynchronously check form fields and return Promise
   * @param fieldName
   */
  var checkForFieldAsync = useEventCallback(function (fieldName) {
    var formValue = realFormValue || {};
    var model = getCombinedModel();
    return model.checkForFieldAsync(fieldName, formValue).then(function (checkResult) {
      var _extends3;
      var formError = _extends({}, realFormError, (_extends3 = {}, _extends3[fieldName] = checkResult.errorMessage, _extends3));
      onCheck === null || onCheck === void 0 ? void 0 : onCheck(formError);
      setFormError(formError);
      if (checkResult.hasError) {
        onError === null || onError === void 0 ? void 0 : onError(formError);
      }
      return checkResult;
    });
  });
  var cleanErrors = useEventCallback(function () {
    setFormError({});
  });
  var cleanErrorForField = useEventCallback(function (fieldName) {
    setFormError(omit(realFormError, [fieldName]));
  });
  var resetErrors = useEventCallback(function (formError) {
    if (formError === void 0) {
      formError = {};
    }
    setFormError(formError);
  });
  useImperativeHandle(ref, function () {
    return {
      root: rootRef.current,
      check: check,
      checkForField: checkForField,
      checkAsync: checkAsync,
      checkForFieldAsync: checkForFieldAsync,
      cleanErrors: cleanErrors,
      cleanErrorForField: cleanErrorForField,
      resetErrors: resetErrors
    };
  });
  var removeFieldError = useEventCallback(function (name) {
    /**
     * when this function is called when the children component is unmount, it's an old render frame
     * so use Ref to get future error
     */
    var formError = omit(realFormErrorRef.current, [name]);
    realFormErrorRef.current = formError;
    setFormError(formError);
    onCheck === null || onCheck === void 0 ? void 0 : onCheck(formError);
  });
  var removeFieldValue = useEventCallback(function (name) {
    /**
     * when this function is called when the children component is unmount, it's an old render frame
     * so use Ref to get future value
     */
    var formValue = omit(realFormValueRef.current, [name]);
    realFormValueRef.current = formValue;
    setFormValue(formValue);
    onChange === null || onChange === void 0 ? void 0 : onChange(formValue);
  });
  var handleSubmit = useEventCallback(function (event) {
    if (disabled || readOnly || plaintext) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    var checkStatus = check();
    onSubmit === null || onSubmit === void 0 ? void 0 : onSubmit(checkStatus, event);
  });
  var handleFieldError = useEventCallback(function (name, errorMessage) {
    var _extends4;
    var formError = _extends({}, realFormError, (_extends4 = {}, _extends4[name] = errorMessage, _extends4));
    setFormError(formError);
    onError === null || onError === void 0 ? void 0 : onError(formError);
    onCheck === null || onCheck === void 0 ? void 0 : onCheck(formError);
  });
  var handleFieldSuccess = useEventCallback(function (name) {
    removeFieldError(name);
  });
  var setFieldValue = function setFieldValue(formValue, fieldName, fieldValue) {
    var _extends5;
    if (nestedField) {
      return set(_extends({}, formValue), fieldName, fieldValue);
    }
    return _extends({}, formValue, (_extends5 = {}, _extends5[fieldName] = fieldValue, _extends5));
  };
  var handleFieldChange = useEventCallback(function (name, value, event) {
    var nextFormValue = setFieldValue(realFormValue, name, value);
    setFormValue(nextFormValue);
    onChange === null || onChange === void 0 ? void 0 : onChange(nextFormValue, event);
  });
  var rootRef = useRef(null);
  var formContextValue = useMemo(function () {
    return {
      getCombinedModel: getCombinedModel,
      checkTrigger: checkTrigger,
      errorFromContext: errorFromContext,
      readOnly: readOnly,
      plaintext: plaintext,
      disabled: disabled,
      formError: realFormError,
      nestedField: nestedField,
      removeFieldValue: removeFieldValue,
      removeFieldError: removeFieldError,
      pushFieldRule: pushFieldRule,
      removeFieldRule: removeFieldRule,
      onFieldChange: handleFieldChange,
      onFieldError: handleFieldError,
      onFieldSuccess: handleFieldSuccess
    };
  }, [getCombinedModel, checkTrigger, errorFromContext, readOnly, plaintext, disabled, realFormError, nestedField, removeFieldValue, removeFieldError, pushFieldRule, removeFieldRule, handleFieldChange, handleFieldError, handleFieldSuccess]);
  return /*#__PURE__*/React.createElement("form", _extends({}, rest, {
    ref: rootRef,
    onSubmit: handleSubmit,
    className: classes
  }), /*#__PURE__*/React.createElement(FormContext.Provider, {
    value: formContextValue
  }, /*#__PURE__*/React.createElement(FormValueContext.Provider, {
    value: realFormValue
  }, children)));
});
Form.Control = FormControl;
Form.ControlLabel = FormControlLabel;
Form.ErrorMessage = FormErrorMessage;
Form.Group = FormGroup;
Form.HelpText = FormHelpText;
Form.Control = FormControl;
Form.displayName = 'Form';
Form.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  children: PropTypes.node,
  errorFromContext: PropTypes.bool,
  layout: oneOf(['horizontal', 'vertical', 'inline']),
  fluid: PropTypes.bool,
  formValue: PropTypes.object,
  formDefaultValue: PropTypes.object,
  formError: PropTypes.object,
  checkTrigger: oneOf(['change', 'blur', 'none']),
  onChange: PropTypes.func,
  onError: PropTypes.func,
  onCheck: PropTypes.func,
  onSubmit: PropTypes.func,
  model: PropTypes.any,
  readOnly: PropTypes.bool,
  plaintext: PropTypes.bool,
  disabled: PropTypes.bool
};
export default Form;