'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import AngleLeftIcon from '@rsuite/icons/legacy/AngleLeft';
import AngleRightIcon from '@rsuite/icons/legacy/AngleRight';
import IconButton from '../IconButton';
import Button from '../Button';
import { useClassNames } from '../utils';
import { FormattedDate } from '../CustomProvider';
import { useCalendarContext } from './CalendarContext';
import { useDateRangePickerContext } from '../DateRangePicker/DateRangePickerContext';
var CalendarHeader = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    className = props.className,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'calendar-header' : _props$classPrefix,
    disabledBackward = props.disabledBackward,
    disabledForward = props.disabledForward,
    showDate = props.showDate,
    showMeridian = props.showMeridian,
    showMonth = props.showMonth,
    showTime = props.showTime,
    disabledTime = props.disabledTime,
    onMoveBackward = props.onMoveBackward,
    onMoveForward = props.onMoveForward,
    onToggleMeridian = props.onToggleMeridian,
    onToggleMonthDropdown = props.onToggleMonthDropdown,
    onToggleTimeDropdown = props.onToggleTimeDropdown,
    renderTitleProp = props.renderTitle,
    renderToolbar = props.renderToolbar,
    rest = _objectWithoutPropertiesLoose(props, ["as", "className", "classPrefix", "disabledBackward", "disabledForward", "showDate", "showMeridian", "showMonth", "showTime", "disabledTime", "onMoveBackward", "onMoveForward", "onToggleMeridian", "onToggleMonthDropdown", "onToggleTimeDropdown", "renderTitle", "renderToolbar"]);
  var _useCalendarContext = useCalendarContext(),
    locale = _useCalendarContext.locale,
    _useCalendarContext$d = _useCalendarContext.date,
    date = _useCalendarContext$d === void 0 ? new Date() : _useCalendarContext$d,
    format = _useCalendarContext.format,
    inline = _useCalendarContext.inline,
    disabledDate = _useCalendarContext.disabledDate;
  var _useDateRangePickerCo = useDateRangePickerContext(),
    isSelectedIdle = _useDateRangePickerCo.isSelectedIdle;
  var _useClassNames = useClassNames(classPrefix),
    prefix = _useClassNames.prefix,
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge;
  var btnProps = {
    appearance: 'subtle',
    size: inline ? 'sm' : 'xs'
  };
  var getTimeFormat = useCallback(function () {
    var timeFormat = [];
    if (!format) {
      return '';
    }
    if (/([Hh])/.test(format)) {
      timeFormat.push(showMeridian ? 'hh' : 'HH');
    }
    if (/m/.test(format)) {
      timeFormat.push('mm');
    }
    if (/s/.test(format)) {
      timeFormat.push('ss');
    }
    return timeFormat.join(':');
  }, [format, showMeridian]);
  var getDateFormat = useCallback(function () {
    if (showMonth) {
      return (locale === null || locale === void 0 ? void 0 : locale.formattedMonthPattern) || 'yyyy-MM';
    }
    return 'yyyy';
  }, [locale, showMonth]);
  var renderTitle = useCallback(function () {
    var _renderTitleProp;
    return (_renderTitleProp = renderTitleProp === null || renderTitleProp === void 0 ? void 0 : renderTitleProp(date)) !== null && _renderTitleProp !== void 0 ? _renderTitleProp : date && /*#__PURE__*/React.createElement(FormattedDate, {
      date: date,
      formatStr: getDateFormat()
    });
  }, [date, getDateFormat, renderTitleProp]);
  var dateTitleClasses = prefix('title', 'title-date', {
    error: disabledDate === null || disabledDate === void 0 ? void 0 : disabledDate(date)
  });
  var timeTitleClasses = prefix('title', 'title-time', {
    error: disabledTime === null || disabledTime === void 0 ? void 0 : disabledTime(date)
  });
  var backwardClass = prefix('backward', {
    'btn-disabled': disabledBackward
  });
  var forwardClass = prefix('forward', {
    'btn-disabled': disabledForward
  });
  var monthToolbar = /*#__PURE__*/React.createElement("div", {
    className: prefix('month-toolbar')
  }, /*#__PURE__*/React.createElement(IconButton, _extends({}, btnProps, {
    // TODO: aria-label should be translated by i18n
    "aria-label": "Previous month",
    className: backwardClass,
    onClick: disabledBackward ? undefined : onMoveBackward,
    icon: /*#__PURE__*/React.createElement(AngleLeftIcon, null)
  })), /*#__PURE__*/React.createElement(Button, _extends({}, btnProps, {
    "aria-label": "Select month",
    className: dateTitleClasses,
    onClick: onToggleMonthDropdown
  }), renderTitle()), /*#__PURE__*/React.createElement(IconButton, _extends({}, btnProps, {
    "aria-label": "Next month",
    className: forwardClass,
    onClick: disabledForward ? undefined : onMoveForward,
    icon: /*#__PURE__*/React.createElement(AngleRightIcon, null)
  })));
  var hasMonth = showDate || showMonth;
  var classes = merge(className, withClassPrefix({
    'has-month': hasMonth,
    'has-time': showTime
  }));

  // If the date is not selected, the time cannot be selected (it only works in DateRangePicker).
  var disableSelectTime = typeof isSelectedIdle === 'undefined' ? false : !isSelectedIdle;
  return /*#__PURE__*/React.createElement(Component, _extends({}, rest, {
    ref: ref,
    className: classes
  }), hasMonth && monthToolbar, showTime && /*#__PURE__*/React.createElement("div", {
    className: prefix('time-toolbar')
  }, /*#__PURE__*/React.createElement(Button, _extends({}, btnProps, {
    "aria-label": "Select time",
    className: timeTitleClasses,
    onClick: onToggleTimeDropdown,
    disabled: disableSelectTime
  }), date && /*#__PURE__*/React.createElement(FormattedDate, {
    date: date,
    formatStr: getTimeFormat()
  })), showMeridian && /*#__PURE__*/React.createElement(Button, _extends({}, btnProps, {
    "aria-label": "Toggle meridian",
    className: prefix('meridian'),
    onClick: onToggleMeridian,
    disabled: disableSelectTime
  }), date && /*#__PURE__*/React.createElement(FormattedDate, {
    date: date,
    formatStr: "a"
  }))), renderToolbar === null || renderToolbar === void 0 ? void 0 : renderToolbar(date));
});
CalendarHeader.displayName = 'CalendarHeader';
CalendarHeader.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  disabledBackward: PropTypes.bool,
  disabledForward: PropTypes.bool,
  disabledTime: PropTypes.func,
  onMoveBackward: PropTypes.func,
  onMoveForward: PropTypes.func,
  onToggleMeridian: PropTypes.func,
  onToggleMonthDropdown: PropTypes.func,
  onToggleTimeDropdown: PropTypes.func,
  renderTitle: PropTypes.func,
  renderToolbar: PropTypes.func,
  showDate: PropTypes.bool,
  showMeridian: PropTypes.bool,
  showMonth: PropTypes.bool,
  showTime: PropTypes.bool
};
export default CalendarHeader;