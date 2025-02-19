'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import React, { useCallback, useState } from 'react';
import Button from '../Button';
import Stack from '../Stack';
import { useUpdateEffect } from '../utils';
import { getDefaultRanges, getRanges } from './utils';
var PredefinedRanges = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var className = props.className,
    disabledShortcut = props.disabledShortcut,
    onShortcutClick = props.onShortcutClick,
    calendarDate = props.calendarDate,
    rangesProp = props.ranges,
    locale = props.locale,
    rest = _objectWithoutPropertiesLoose(props, ["className", "disabledShortcut", "onShortcutClick", "calendarDate", "ranges", "locale"]);
  var _useState = useState(getRanges(props)),
    ranges = _useState[0],
    setRanges = _useState[1];
  useUpdateEffect(function () {
    setRanges(getRanges({
      ranges: rangesProp,
      calendarDate: calendarDate
    }));
  }, [calendarDate, rangesProp]);
  var hasLocaleKey = useCallback(function (key) {
    return getDefaultRanges(calendarDate).some(function (item) {
      return item.label === key;
    });
  }, [calendarDate]);
  if (ranges.length === 0) {
    return null;
  }
  return /*#__PURE__*/React.createElement(Stack, _extends({
    className: className,
    ref: ref,
    alignItems: "flex-start",
    spacing: 4
  }, rest), ranges.map(function (range, index) {
    var value = range.value,
      closeOverlay = range.closeOverlay,
      label = range.label,
      rest = _objectWithoutPropertiesLoose(range, ["value", "closeOverlay", "label"]);
    var disabled = disabledShortcut === null || disabledShortcut === void 0 ? void 0 : disabledShortcut(value);
    var handleClickShortcut = function handleClickShortcut(event) {
      if (disabled) {
        return;
      }
      onShortcutClick === null || onShortcutClick === void 0 ? void 0 : onShortcutClick(range, closeOverlay !== false ? true : false, event);
    };
    return /*#__PURE__*/React.createElement(Button, _extends({
      appearance: "link",
      size: "sm",
      key: index,
      disabled: disabled,
      onClick: handleClickShortcut
    }, rest), hasLocaleKey(label) && typeof label === 'string' ? locale === null || locale === void 0 ? void 0 : locale[label] : label);
  }));
});
export default PredefinedRanges;