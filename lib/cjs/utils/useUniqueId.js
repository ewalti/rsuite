'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");
exports.__esModule = true;
exports.default = useUniqueId;
var React = _interopRequireWildcard(require("react"));
var _uniqueId = _interopRequireDefault(require("lodash/uniqueId"));
var reactUseId = React['useId' + ''];

/**
 * Used for generating unique ID for DOM elements
 *
 * @param idProp If id is provided, it will be used instead of generating a new one
 */
function useUniqueId(prefix, idProp) {
  var idRef = React.useRef();
  if (reactUseId !== undefined) {
    return idProp !== null && idProp !== void 0 ? idProp : "" + prefix + reactUseId();
  }
  if (!idRef.current) {
    idRef.current = (0, _uniqueId.default)(prefix);
  }
  return idProp !== null && idProp !== void 0 ? idProp : idRef.current;
}