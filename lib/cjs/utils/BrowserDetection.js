'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.isSupportFlexGap = exports.getSafariVersion = exports.getChromeVersion = exports.isAndroid = exports.isEdge = exports.isIE11 = exports.isIE10 = exports.isIE = void 0;
var _canUseDOM = _interopRequireDefault(require("dom-lib/canUseDOM"));
// from http://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser

// Internet Explorer 6-11
var isIE = function isIE() {
  return _canUseDOM.default && /MSIE |Trident\/|Edge\//.test(window.navigator.userAgent);
};
exports.isIE = isIE;
var isIE10 = function isIE10() {
  return _canUseDOM.default && !!window.navigator.userAgent.match(/MSIE 10.0/);
};
exports.isIE10 = isIE10;
var isIE11 = function isIE11() {
  return _canUseDOM.default && window.navigator.userAgent.indexOf('Trident') > -1 && window.navigator.userAgent.indexOf('rv:11.0') > -1;
};

// Edge 20+
exports.isIE11 = isIE11;
var isEdge = function isEdge() {
  return _canUseDOM.default && !isIE() && 'styleMedia' in window;
};
exports.isEdge = isEdge;
var isAndroid = function isAndroid() {
  return _canUseDOM.default && /Android/i.test(navigator.userAgent);
};
exports.isAndroid = isAndroid;
var getChromeVersion = function getChromeVersion() {
  if (_canUseDOM.default) {
    var match = window.navigator.userAgent.match(/Chrom(e|ium)\/([\d\.]+)\./);
    return match ? parseFloat(match[2]) : false;
  }
  return false;
};
exports.getChromeVersion = getChromeVersion;
var getSafariVersion = function getSafariVersion() {
  if (_canUseDOM.default) {
    var match = window.navigator.userAgent.match(/Version\/([\d\.]+).*Safari/);
    return match ? parseFloat(match[1]) : false;
  }
  return false;
};

/**
 * flexbox-gap compatibility
 * @see https://caniuse.com/flexbox-gap
 */
exports.getSafariVersion = getSafariVersion;
var isSupportFlexGap = function isSupportFlexGap() {
  if (isIE()) {
    return false;
  }
  var chromeVersion = getChromeVersion();
  var safariVersion = getSafariVersion();

  // edge consider as chrome
  if (chromeVersion) {
    // flex-gap is support in Chrome 84+
    return chromeVersion >= 84;
  }
  if (safariVersion) {
    // flex-gap is support in Safari 14.1+
    return safariVersion >= 14.1;
  }
  return true;
};
exports.isSupportFlexGap = isSupportFlexGap;