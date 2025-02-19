'use client';
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
import React, { useState, useImperativeHandle, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import kebabCase from 'lodash/kebabCase';
import Transition from '../Animation/Transition';
import { useClassNames, guid, createChainedFunction, render } from '../utils';
import ToastContext from './ToastContext';
export var toastPlacements = ['topCenter', 'bottomCenter', 'topStart', 'topEnd', 'bottomStart', 'bottomEnd'];
var useMessages = function useMessages() {
  var _useState = useState([]),
    messages = _useState[0],
    setMessages = _useState[1];
  var getKey = useCallback(function (key) {
    if (typeof key === 'undefined' && messages.length) {
      return messages[messages.length - 1].key;
    }
    return key;
  }, [messages]);
  var push = useCallback(function (message, options) {
    var key = guid();
    setMessages(function (prevMessages) {
      return [].concat(prevMessages, [_extends({
        key: key,
        visible: true,
        node: message
      }, options)]);
    });
    return key;
  }, []);
  var clear = useCallback(function () {
    // Set all existing messages to be invisible.
    setMessages(messages.map(function (msg) {
      return _extends({}, msg, {
        visible: false
      });
    }));

    // Remove all invisible messages after 400ms.
    // The delay removal here is to preserve the animation.
    setTimeout(function () {
      setMessages([]);
    }, 400);
  }, [messages]);
  var remove = useCallback(function (key) {
    // Set the message of the specified key to invisible.
    setMessages(messages.map(function (n) {
      if (n.key === getKey(key)) {
        n.visible = false;
      }
      return n;
    }));

    // Remove invisible messages after 400ms.
    setTimeout(function () {
      setMessages(messages.filter(function (msg) {
        return msg.visible;
      }));
    }, 400);
  }, [messages, getKey]);
  return {
    messages: messages,
    push: push,
    clear: clear,
    remove: remove
  };
};
var ToastContainer = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var rootRef = useRef();
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    className = props.className,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'toast-container' : _props$classPrefix,
    _props$placement = props.placement,
    placement = _props$placement === void 0 ? 'topCenter' : _props$placement,
    callback = props.callback,
    rest = _objectWithoutPropertiesLoose(props, ["as", "className", "classPrefix", "placement", "callback"]);
  var _useClassNames = useClassNames(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge,
    rootPrefix = _useClassNames.rootPrefix;
  var classes = merge(className, withClassPrefix(kebabCase(placement)));
  var _useMessages = useMessages(),
    push = _useMessages.push,
    clear = _useMessages.clear,
    remove = _useMessages.remove,
    messages = _useMessages.messages;
  useImperativeHandle(ref, function () {
    return {
      root: rootRef.current,
      push: push,
      clear: clear,
      remove: remove
    };
  });
  var elements = messages.map(function (item) {
    return /*#__PURE__*/React.createElement(Transition, {
      key: item.key,
      in: item.visible,
      exitedClassName: rootPrefix('toast-fade-exited'),
      exitingClassName: rootPrefix('toast-fade-exiting'),
      enteringClassName: rootPrefix('toast-fade-entering'),
      enteredClassName: rootPrefix('toast-fade-entered'),
      timeout: 300
    }, function (transitionProps, ref) {
      var _item$node, _item$node$props, _item$node2, _item$node2$props;
      var transitionClassName = transitionProps.className,
        rest = _objectWithoutPropertiesLoose(transitionProps, ["className"]);
      return /*#__PURE__*/React.cloneElement(item.node, _extends({}, rest, {
        ref: ref,
        duration: item.duration,
        // Remove the message after the specified time.
        onClose: createChainedFunction((_item$node = item.node) === null || _item$node === void 0 ? void 0 : (_item$node$props = _item$node.props) === null || _item$node$props === void 0 ? void 0 : _item$node$props.onClose, function () {
          return remove(item.key);
        }),
        className: merge(rootPrefix('toast'), (_item$node2 = item.node) === null || _item$node2 === void 0 ? void 0 : (_item$node2$props = _item$node2.props) === null || _item$node2$props === void 0 ? void 0 : _item$node2$props.className, transitionClassName)
      }));
    });
  });
  return /*#__PURE__*/React.createElement(ToastContext.Provider, {
    value: {
      usedToaster: true
    }
  }, /*#__PURE__*/React.createElement(Component, _extends({}, rest, {
    ref: function ref(selfRef) {
      rootRef.current = selfRef;
      callback === null || callback === void 0 ? void 0 : callback(selfRef);
    },
    className: classes
  }), elements));
});
ToastContainer.getInstance = function (props) {
  var container = props.container,
    rest = _objectWithoutPropertiesLoose(props, ["container"]);
  var containerRef = /*#__PURE__*/React.createRef();
  var containerElement = (typeof container === 'function' ? container() : container) || document.body;
  return new Promise(function (resolve) {
    var renderCallback = function renderCallback() {
      resolve([containerRef, unmount]);
    };
    var _render = render( /*#__PURE__*/React.createElement(ToastContainer, _extends({}, rest, {
        ref: containerRef,
        callback: renderCallback
      })), containerElement),
      unmount = _render.unmount;
  });
};
ToastContainer.displayName = 'ToastContainer';
ToastContainer.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  placement: PropTypes.elementType,
  container: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  callback: PropTypes.func
};
export default ToastContainer;