'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import React from 'react';
import PropTypes from 'prop-types';
import upperFirst from 'lodash/upperFirst';
import { useClassNames } from '../utils';
import { useCalendarContext } from './CalendarContext';
var weekKeys = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
var TableHeaderRow = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    className = props.className,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'calendar-table' : _props$classPrefix,
    rest = _objectWithoutPropertiesLoose(props, ["as", "className", "classPrefix"]);
  var _useCalendarContext = useCalendarContext(),
    locale = _useCalendarContext.locale,
    showWeekNumbers = _useCalendarContext.showWeekNumbers,
    isoWeek = _useCalendarContext.isoWeek;
  var _useClassNames = useClassNames(classPrefix),
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix;
  var classes = merge(className, prefix('row', 'header-row'));
  var items = weekKeys;
  if (isoWeek) {
    items = weekKeys.filter(function (v) {
      return v !== 'sunday';
    });
    items.push('sunday');
  }
  return /*#__PURE__*/React.createElement(Component, _extends({
    role: "row"
  }, rest, {
    ref: ref,
    className: classes
  }), showWeekNumbers && /*#__PURE__*/React.createElement("div", {
    className: prefix('header-cell'),
    role: "columnheader"
  }), items.map(function (key) {
    return /*#__PURE__*/React.createElement("div", {
      key: key,
      className: prefix('header-cell'),
      role: "columnheader",
      "aria-label": upperFirst(key)
    }, /*#__PURE__*/React.createElement("span", {
      className: prefix('header-cell-content')
    }, locale === null || locale === void 0 ? void 0 : locale[key]));
  }));
});
TableHeaderRow.displayName = 'CalendarTableHeaderRow';
TableHeaderRow.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  classPrefix: PropTypes.string
};
export default TableHeaderRow;