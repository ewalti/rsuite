'use client';
"use strict";

exports.__esModule = true;
exports.attachParent = attachParent;
function attachParent(data, parent) {
  // mark "parent" unenumable
  Object.defineProperty(data, 'parent', {
    value: parent,
    writable: false,
    enumerable: false,
    configurable: true
  });
  return data;
}