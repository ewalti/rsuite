'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = deprecatePropType;
exports.deprecatePropTypeNew = deprecatePropTypeNew;
var _warnOnce = _interopRequireDefault(require("../../utils/warnOnce"));
// Ref: https://github.com/thefrontside/deprecated-prop-type/blob/master/deprecated.js

/**
 * Prints deprecation message when user uses a deprecated prop
 *
 * @deprecated Use {@link deprecatePropTypeNew} which prints clearer messages.
 */
function deprecatePropType(propType, explanation) {
  return function validate(props, propName, componentName) {
    // Note ...rest here
    if (props[propName] != null) {
      var message = "\"" + propName + "\" property of \"" + componentName + "\" has been deprecated.\n" + explanation;
      (0, _warnOnce.default)(message);
    }
    for (var _len = arguments.length, rest = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      rest[_key - 3] = arguments[_key];
    }
    return propType.apply(void 0, [props, propName, componentName].concat(rest)); // and here
  };
}

/**
 * Prints deprecation message when user uses a deprecated prop
 *
 * @example
 *
 *   deprecatePropTypeNew(PropTypes.bool, 'Use Dropdown.Separator component instead.')
 *
 */
function deprecatePropTypeNew(propType, explanation) {
  return function validate(props, propName, componentName) {
    // Note ...rest here
    if (props[propName] != null) {
      var message = "[rsuite] \"" + propName + "\" property of " + componentName + " component has been deprecated.\n" + explanation;
      (0, _warnOnce.default)(message);
    }
    for (var _len2 = arguments.length, rest = new Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
      rest[_key2 - 3] = arguments[_key2];
    }
    return propType.apply(void 0, [props, propName, componentName].concat(rest)); // and here
  };
}