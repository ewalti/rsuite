'use client';
"use strict";

exports.__esModule = true;
exports.default = void 0;
function getStringLength(str) {
  var length = 0;
  Array.from(str).forEach(function (char) {
    if (char.charCodeAt(0) > 255) {
      length += 2;
    } else {
      length++;
    }
  });
  return length;
}
var _default = getStringLength;
exports.default = _default;