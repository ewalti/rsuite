'use client';
"use strict";

exports.__esModule = true;
exports.default = void 0;
var _react = require("react");
var useUpdateEffect = function useUpdateEffect(effect, deps) {
  var isMounting = (0, _react.useRef)(true);
  (0, _react.useEffect)(function () {
    if (isMounting.current) {
      isMounting.current = false;
      return;
    }
    effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
var _default = useUpdateEffect;
exports.default = _default;