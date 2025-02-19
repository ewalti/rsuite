'use client';
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends6 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _omit = _interopRequireDefault(require("lodash/omit"));
var _set = _interopRequireDefault(require("lodash/set"));
var _schemaTyped = require("schema-typed");
var _FormContext = _interopRequireWildcard(require("./FormContext"));
var _FormControl = _interopRequireDefault(require("../FormControl"));
var _FormControlLabel = _interopRequireDefault(require("../FormControlLabel"));
var _FormErrorMessage = _interopRequireDefault(require("../FormErrorMessage"));
var _FormGroup = _interopRequireDefault(require("../FormGroup"));
var _FormHelpText = _interopRequireDefault(require("../FormHelpText"));
var _useFormClassNames = require("./useFormClassNames");
var _useSchemaModel2 = _interopRequireDefault(require("./useSchemaModel"));
var _utils = require("../utils");
var _propTypes2 = require("../internals/propTypes");
/**
 * The `Form` component is a form interface for collecting and validating user input.
 * @see https://rsuitejs.com/components/form
 */
var Form = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
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
    formModel = _props$model === void 0 ? (0, _schemaTyped.SchemaModel)({}) : _props$model,
    readOnly = props.readOnly,
    plaintext = props.plaintext,
    className = props.className,
    children = props.children,
    disabled = props.disabled,
    onSubmit = props.onSubmit,
    onCheck = props.onCheck,
    onError = props.onError,
    onChange = props.onChange,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, ["checkTrigger", "classPrefix", "errorFromContext", "formDefaultValue", "formValue", "formError", "fluid", "nestedField", "layout", "model", "readOnly", "plaintext", "className", "children", "disabled", "onSubmit", "onCheck", "onError", "onChange"]);
  var _useSchemaModel = (0, _useSchemaModel2.default)(formModel),
    getCombinedModel = _useSchemaModel.getCombinedModel,
    pushFieldRule = _useSchemaModel.pushFieldRule,
    removeFieldRule = _useSchemaModel.removeFieldRule;
  var classes = (0, _useFormClassNames.useFormClassNames)({
    classPrefix: classPrefix,
    className: className,
    fluid: fluid,
    layout: layout,
    readOnly: readOnly,
    plaintext: plaintext,
    disabled: disabled
  });
  var _useControlled = (0, _utils.useControlled)(formValue, formDefaultValue),
    realFormValue = _useControlled[0],
    setFormValue = _useControlled[1];
  var _useControlled2 = (0, _utils.useControlled)(formError, {}),
    realFormError = _useControlled2[0],
    setFormError = _useControlled2[1];
  var realFormValueRef = (0, _react.useRef)(realFormValue);
  realFormValueRef.current = realFormValue;
  var realFormErrorRef = (0, _react.useRef)(realFormError);
  realFormErrorRef.current = realFormError;

  /**
   * Validate the form data and return a boolean.
   * The error message after verification is returned in the callback.
   * @param callback
   */
  var check = (0, _utils.useEventCallback)(function (callback) {
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
  var checkForField = (0, _utils.useEventCallback)(function (fieldName, callback) {
    var _extends2;
    var formValue = realFormValue || {};
    var model = getCombinedModel();
    var checkResult = model.checkForField(fieldName, formValue);
    var formError = (0, _extends6.default)({}, realFormError, (_extends2 = {}, _extends2[fieldName] = (checkResult === null || checkResult === void 0 ? void 0 : checkResult.errorMessage) || checkResult, _extends2));
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
  var checkAsync = (0, _utils.useEventCallback)(function () {
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
  var checkForFieldAsync = (0, _utils.useEventCallback)(function (fieldName) {
    var formValue = realFormValue || {};
    var model = getCombinedModel();
    return model.checkForFieldAsync(fieldName, formValue).then(function (checkResult) {
      var _extends3;
      var formError = (0, _extends6.default)({}, realFormError, (_extends3 = {}, _extends3[fieldName] = checkResult.errorMessage, _extends3));
      onCheck === null || onCheck === void 0 ? void 0 : onCheck(formError);
      setFormError(formError);
      if (checkResult.hasError) {
        onError === null || onError === void 0 ? void 0 : onError(formError);
      }
      return checkResult;
    });
  });
  var cleanErrors = (0, _utils.useEventCallback)(function () {
    setFormError({});
  });
  var cleanErrorForField = (0, _utils.useEventCallback)(function (fieldName) {
    setFormError((0, _omit.default)(realFormError, [fieldName]));
  });
  var resetErrors = (0, _utils.useEventCallback)(function (formError) {
    if (formError === void 0) {
      formError = {};
    }
    setFormError(formError);
  });
  (0, _react.useImperativeHandle)(ref, function () {
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
  var removeFieldError = (0, _utils.useEventCallback)(function (name) {
    /**
     * when this function is called when the children component is unmount, it's an old render frame
     * so use Ref to get future error
     */
    var formError = (0, _omit.default)(realFormErrorRef.current, [name]);
    realFormErrorRef.current = formError;
    setFormError(formError);
    onCheck === null || onCheck === void 0 ? void 0 : onCheck(formError);
  });
  var removeFieldValue = (0, _utils.useEventCallback)(function (name) {
    /**
     * when this function is called when the children component is unmount, it's an old render frame
     * so use Ref to get future value
     */
    var formValue = (0, _omit.default)(realFormValueRef.current, [name]);
    realFormValueRef.current = formValue;
    setFormValue(formValue);
    onChange === null || onChange === void 0 ? void 0 : onChange(formValue);
  });
  var handleSubmit = (0, _utils.useEventCallback)(function (event) {
    if (disabled || readOnly || plaintext) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    var checkStatus = check();
    onSubmit === null || onSubmit === void 0 ? void 0 : onSubmit(checkStatus, event);
  });
  var handleFieldError = (0, _utils.useEventCallback)(function (name, errorMessage) {
    var _extends4;
    var formError = (0, _extends6.default)({}, realFormError, (_extends4 = {}, _extends4[name] = errorMessage, _extends4));
    setFormError(formError);
    onError === null || onError === void 0 ? void 0 : onError(formError);
    onCheck === null || onCheck === void 0 ? void 0 : onCheck(formError);
  });
  var handleFieldSuccess = (0, _utils.useEventCallback)(function (name) {
    removeFieldError(name);
  });
  var setFieldValue = function setFieldValue(formValue, fieldName, fieldValue) {
    var _extends5;
    if (nestedField) {
      return (0, _set.default)((0, _extends6.default)({}, formValue), fieldName, fieldValue);
    }
    return (0, _extends6.default)({}, formValue, (_extends5 = {}, _extends5[fieldName] = fieldValue, _extends5));
  };
  var handleFieldChange = (0, _utils.useEventCallback)(function (name, value, event) {
    var nextFormValue = setFieldValue(realFormValue, name, value);
    setFormValue(nextFormValue);
    onChange === null || onChange === void 0 ? void 0 : onChange(nextFormValue, event);
  });
  var rootRef = (0, _react.useRef)(null);
  var formContextValue = (0, _react.useMemo)(function () {
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
  return /*#__PURE__*/_react.default.createElement("form", (0, _extends6.default)({}, rest, {
    ref: rootRef,
    onSubmit: handleSubmit,
    className: classes
  }), /*#__PURE__*/_react.default.createElement(_FormContext.default.Provider, {
    value: formContextValue
  }, /*#__PURE__*/_react.default.createElement(_FormContext.FormValueContext.Provider, {
    value: realFormValue
  }, children)));
});
Form.Control = _FormControl.default;
Form.ControlLabel = _FormControlLabel.default;
Form.ErrorMessage = _FormErrorMessage.default;
Form.Group = _FormGroup.default;
Form.HelpText = _FormHelpText.default;
Form.Control = _FormControl.default;
Form.displayName = 'Form';
Form.propTypes = {
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  children: _propTypes.default.node,
  errorFromContext: _propTypes.default.bool,
  layout: (0, _propTypes2.oneOf)(['horizontal', 'vertical', 'inline']),
  fluid: _propTypes.default.bool,
  formValue: _propTypes.default.object,
  formDefaultValue: _propTypes.default.object,
  formError: _propTypes.default.object,
  checkTrigger: (0, _propTypes2.oneOf)(['change', 'blur', 'none']),
  onChange: _propTypes.default.func,
  onError: _propTypes.default.func,
  onCheck: _propTypes.default.func,
  onSubmit: _propTypes.default.func,
  model: _propTypes.default.any,
  readOnly: _propTypes.default.bool,
  plaintext: _propTypes.default.bool,
  disabled: _propTypes.default.bool
};
var _default = Form;
exports.default = _default;