'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _createComponent = _interopRequireDefault(require("../utils/createComponent"));
/**
 * The Content component is used to wrap content in a themed container with a max-width.
 * @see https://rsuitejs.com/components/container/
 *
 * For Internet Explorer 11 and lower, it's suggested that an ARIA role of "main"
 * be added to the <main> element to ensure it is accessible
 */
var Content = (0, _createComponent.default)({
  name: 'Content',
  componentAs: 'main'
});
var _default = Content;
exports.default = _default;