'use client';
import isObject from 'lodash/isObject';

// FIXME Never used
export default (function (value, labelKey, valueKey) {
  if (isObject(value)) {
    return value;
  }
  if (labelKey && valueKey) {
    var _ref;
    return _ref = {}, _ref[labelKey] = value, _ref[valueKey] = value, _ref;
  }
  return null;
});