'use client';
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var ReactDOM = _interopRequireWildcard(require("react-dom"));
var majorVersion = parseInt(_react.default.version);
var SuperposedReactDOM = ReactDOM;
function render(element, container) {
  var mountElement = document.createElement('div');
  mountElement.className = 'rs-mount-element';
  var containerElement = container || document.body;

  // Add the detached element to the root
  containerElement.appendChild(mountElement);
  if (majorVersion >= 18) {
    /**
     * ignore react 18 warnings
     * Warning: You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".
     */
    ReactDOM['__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED'].usingClientEntryPoint = true;
    var createRoot = SuperposedReactDOM.createRoot;
    var root = containerElement.__root || createRoot(mountElement, {
      identifierPrefix: 'rs-root-'
    });
    root.render(element);
    containerElement.__root = root;
    return root;
  }
  SuperposedReactDOM.render(element, mountElement);
  return {
    unmount: function unmount() {
      SuperposedReactDOM.unmountComponentAtNode(mountElement);
      containerElement.removeChild(mountElement);
    }
  };
}
var _default = render;
exports.default = _default;