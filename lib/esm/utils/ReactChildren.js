'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import React from 'react';
export function find(children, func, context) {
  var index = 0;
  var result;
  React.Children.forEach(children, function (child) {
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
export function map(children, func, context) {
  var index = 0;
  return React.Children.map(children, function (child) {
    if (! /*#__PURE__*/React.isValidElement(child)) {
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
  return React.Children.count(children) === 1 && typeOf(children) === Symbol.for('react.fragment');
}
export function mapCloneElement(children, func, context) {
  var elements = children;
  if (isFragment(children)) {
    var _props;
    elements = (_props = children.props) === null || _props === void 0 ? void 0 : _props.children;
  }
  return map(elements, function (child, index) {
    return /*#__PURE__*/React.cloneElement(child, _extends({
      key: index
    }, func(child, index)));
  }, context);
}
export function count(children) {
  return React.Children.count(Array.isArray(children) ? children.filter(function (child) {
    return child;
  }) : children);
}
function some(children, func, context) {
  var index = 0;
  var result = false;
  React.Children.forEach(children, function (child) {
    if (result) {
      return;
    }
    if (! /*#__PURE__*/React.isValidElement(child)) {
      return;
    }

    /* eslint-disable */
    if (func.call(context, child, index += 1)) {
      result = true;
    }
  });
  return result;
}
export default {
  mapCloneElement: mapCloneElement,
  count: count,
  some: some,
  map: map,
  find: find
};