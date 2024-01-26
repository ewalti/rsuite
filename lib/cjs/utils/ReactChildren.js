'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.find = find;
exports.map = map;
exports.mapCloneElement = mapCloneElement;
exports.count = count;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireDefault(require("react"));
function find(children, func, context) {
  var index = 0;
  var result;
  _react.default.Children.forEach(children, function (child) {
    if (result) {
      return;
    }
    index += 1;
    if (func.call(context, child, index)) {
      result = child;
    }
  });
  return result;
}
function map(children, func, context) {
  var index = 0;
  return _react.default.Children.map(children, function (child) {
    if (! /*#__PURE__*/_react.default.isValidElement(child)) {
      return child;
    }
    var handle = func.call(context, child, index);
    index += 1;
    return handle;
  });
}
function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    return object.type || object.$$typeof;
  }
}
function isFragment(children) {
  return _react.default.Children.count(children) === 1 && typeOf(children) === Symbol.for('react.fragment');
}
function mapCloneElement(children, func, context) {
  var elements = children;
  if (isFragment(children)) {
    var _props;
    elements = (_props = children.props) === null || _props === void 0 ? void 0 : _props.children;
  }
  return map(elements, function (child, index) {
    return /*#__PURE__*/_react.default.cloneElement(child, (0, _extends2.default)({
      key: index
    }, func(child, index)));
  }, context);
}
function count(children) {
  return _react.default.Children.count(Array.isArray(children) ? children.filter(function (child) {
    return child;
  }) : children);
}
function some(children, func, context) {
  var index = 0;
  var result = false;
  _react.default.Children.forEach(children, function (child) {
    if (result) {
      return;
    }
    if (! /*#__PURE__*/_react.default.isValidElement(child)) {
      return;
    }

    /* eslint-disable */
    if (func.call(context, child, index += 1)) {
      result = true;
    }
  });
  return result;
}
var _default = {
  mapCloneElement: mapCloneElement,
  count: count,
  some: some,
  map: map,
  find: find
};
exports.default = _default;