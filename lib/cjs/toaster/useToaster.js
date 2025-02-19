'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _react = require("react");
var _toaster = _interopRequireDefault(require("./toaster"));
var _utils = require("../utils");
/**
 * The 'useToaster' hook is a wrapper for the 'toaster' module.
 * @returns toaster { push, remove, clear }
 *
 * @see https://rsuitejs.com/components/message/
 * @see https://rsuitejs.com/components/notification/
 */
var useToaster = function useToaster() {
  var _useCustom = (0, _utils.useCustom)(),
    toasters = _useCustom.toasters;
  return (0, _react.useMemo)(function () {
    return {
      /**
       * Push a toast message.
       * @param message The message to be displayed.
       *                eg: `<Message type="success" description="Success" />` or `<Notification type="success" closable>Success</Notification>`
       * @param options The options of the toast message. (optional)
       *                eg: `{ placement: 'topCenter', duration: 5000 }`
       * @returns The key of the toast message.
       */
      push: function push(message, options) {
        var _toasters$current;
        var customToaster = toasters === null || toasters === void 0 ? void 0 : (_toasters$current = toasters.current) === null || _toasters$current === void 0 ? void 0 : _toasters$current.get((options === null || options === void 0 ? void 0 : options.placement) || 'topCenter');
        return customToaster ? customToaster.push(message, options) : _toaster.default.push(message, options);
      },
      /**
       * Remove a toast message.
       * @param key  The key of the toast message.
       */
      remove: function remove(key) {
        toasters ? Array.from(toasters.current).forEach(function (_ref) {
          var c = _ref[1];
          return c === null || c === void 0 ? void 0 : c.remove(key);
        }) : _toaster.default.remove(key);
      },
      /**
       * Clear all toast messages.
       */
      clear: function clear() {
        toasters ? Array.from(toasters.current).forEach(function (_ref2) {
          var c = _ref2[1];
          return c === null || c === void 0 ? void 0 : c.clear();
        }) : _toaster.default.clear();
      }
    };
  }, [toasters]);
};
var _default = useToaster;
exports.default = _default;