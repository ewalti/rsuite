'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");
exports.__esModule = true;
exports.default = void 0;
var _taggedTemplateLiteralLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteralLoose"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _isNil = _interopRequireDefault(require("lodash/isNil"));
var _omit = _interopRequireDefault(require("lodash/omit"));
var _partial = _interopRequireDefault(require("lodash/partial"));
var _pick = _interopRequireDefault(require("lodash/pick"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Calendar = _interopRequireDefault(require("@rsuite/icons/legacy/Calendar"));
var _ClockO = _interopRequireDefault(require("@rsuite/icons/legacy/ClockO"));
var _CustomProvider = require("../CustomProvider");
var _Toolbar = _interopRequireDefault(require("../DatePicker/Toolbar"));
var _PredefinedRanges = _interopRequireDefault(require("../DatePicker/PredefinedRanges"));
var _Stack = _interopRequireDefault(require("../Stack"));
var _Picker = require("../internals/Picker");
var _utils = require("../utils");
var _dateUtils = require("../utils/dateUtils");
var _Calendar2 = _interopRequireDefault(require("./Calendar"));
var disabledDateUtils = _interopRequireWildcard(require("./disabledDateUtils"));
var _utils2 = require("./utils");
var _propTypes2 = require("../internals/propTypes");
var _DateRangePickerContext = _interopRequireDefault(require("./DateRangePickerContext"));
var _DateRangeInput = _interopRequireDefault(require("../DateRangeInput"));
var _InputGroup = _interopRequireDefault(require("../InputGroup"));
var _templateObject;
/**
 * A date range picker allows you to select a date range from a calendar.
 *
 * @see https://rsuitejs.com/components/date-range-picker
 */
var DateRangePicker = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _ref, _ref2, _merge;
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'picker' : _props$classPrefix,
    className = props.className,
    _props$appearance = props.appearance,
    appearance = _props$appearance === void 0 ? 'default' : _props$appearance,
    _props$editable = props.editable,
    editable = _props$editable === void 0 ? true : _props$editable,
    _props$cleanable = props.cleanable,
    cleanable = _props$cleanable === void 0 ? true : _props$cleanable,
    _props$character = props.character,
    character = _props$character === void 0 ? ' ~ ' : _props$character,
    defaultCalendarValue = props.defaultCalendarValue,
    defaultValue = props.defaultValue,
    plaintext = props.plaintext,
    disabled = props.disabled,
    DEPRECATED_disabledDateProp = props.disabledDate,
    shouldDisableDate = props.shouldDisableDate,
    _props$format = props.format,
    formatStr = _props$format === void 0 ? 'yyyy-MM-dd' : _props$format,
    hoverRange = props.hoverRange,
    idProp = props.id,
    _props$isoWeek = props.isoWeek,
    isoWeek = _props$isoWeek === void 0 ? false : _props$isoWeek,
    _props$limitEndYear = props.limitEndYear,
    limitEndYear = _props$limitEndYear === void 0 ? 1000 : _props$limitEndYear,
    limitStartYear = props.limitStartYear,
    overrideLocale = props.locale,
    loading = props.loading,
    label = props.label,
    menuClassName = props.menuClassName,
    menuStyle = props.menuStyle,
    oneTap = props.oneTap,
    _props$placeholder = props.placeholder,
    placeholder = _props$placeholder === void 0 ? '' : _props$placeholder,
    _props$placement = props.placement,
    placement = _props$placement === void 0 ? 'bottomStart' : _props$placement,
    ranges = props.ranges,
    readOnly = props.readOnly,
    _props$showOneCalenda = props.showOneCalendar,
    showOneCalendar = _props$showOneCalenda === void 0 ? false : _props$showOneCalenda,
    showWeekNumbers = props.showWeekNumbers,
    showMeridian = props.showMeridian,
    style = props.style,
    size = props.size,
    caretAsProp = props.caretAs,
    valueProp = props.value,
    onChange = props.onChange,
    onClean = props.onClean,
    onClose = props.onClose,
    onEnter = props.onEnter,
    onEntered = props.onEntered,
    onExited = props.onExited,
    onOk = props.onOk,
    onOpen = props.onOpen,
    onSelect = props.onSelect,
    onShortcutClick = props.onShortcutClick,
    renderTitle = props.renderTitle,
    renderCell = props.renderCell,
    cellClassName = props.cellClassName,
    restProps = (0, _objectWithoutPropertiesLoose2.default)(props, ["as", "classPrefix", "className", "appearance", "editable", "cleanable", "character", "defaultCalendarValue", "defaultValue", "plaintext", "disabled", "disabledDate", "shouldDisableDate", "format", "hoverRange", "id", "isoWeek", "limitEndYear", "limitStartYear", "locale", "loading", "label", "menuClassName", "menuStyle", "oneTap", "placeholder", "placement", "ranges", "readOnly", "showOneCalendar", "showWeekNumbers", "showMeridian", "style", "size", "caretAs", "value", "onChange", "onClean", "onClose", "onEnter", "onEntered", "onExited", "onOk", "onOpen", "onSelect", "onShortcutClick", "renderTitle", "renderCell", "cellClassName"]);
  var id = (0, _utils.useUniqueId)('rs-', idProp);
  var _usePickerRef = (0, _Picker.usePickerRef)(ref),
    trigger = _usePickerRef.trigger,
    root = _usePickerRef.root,
    target = _usePickerRef.target,
    overlay = _usePickerRef.overlay;
  var _useClassNames = (0, _utils.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix;
  var _useCustom = (0, _utils.useCustom)('DateRangePicker', overrideLocale),
    locale = _useCustom.locale,
    formatDate = _useCustom.formatDate;
  var rangeFormatStr = "" + formatStr + character + formatStr;
  var _useControlled = (0, _utils.useControlled)(valueProp, defaultValue !== null && defaultValue !== void 0 ? defaultValue : null),
    value = _useControlled[0],
    setValue = _useControlled[1]; // Show only the calendar month panel. formatStr = 'yyyy-MM'
  var onlyShowMonth = (0, _dateUtils.shouldRenderMonth)(formatStr) && !(0, _dateUtils.shouldRenderDate)(formatStr);

  /**
   * Whether to complete the selection.
   * Everytime selection will change this value. If the value is false, it means that the selection has not been completed.
   *
   * In `oneTap` mode, select action will not change this value, its value should be true always.
   */
  var _useState = (0, _react.useState)(true),
    isSelectedIdle = _useState[0],
    setSelectedIdle = _useState[1];
  /**
   * The currently selected date range.
   *
   * The time range is selected by two clicks. After the first click,
   * the cursor will store a temporary event date in the process until
   * the second click to determine the end date of the date range.
   *
   */
  var _useState2 = (0, _react.useState)((_ref = valueProp !== null && valueProp !== void 0 ? valueProp : defaultValue) !== null && _ref !== void 0 ? _ref : []),
    selectedDates = _useState2[0],
    setSelectedDates = _useState2[1]; // The date of the current hover, used to reduce the calculation of `handleMouseMove`
  var _useState3 = (0, _react.useState)(null),
    hoverDateRange = _useState3[0],
    setHoverDateRange = _useState3[1]; // The displayed calendar panel is rendered based on this value.
  var _useState4 = (0, _react.useState)((0, _utils2.getSafeCalendarDate)({
      value: (_ref2 = value !== null && value !== void 0 ? value : defaultCalendarValue) !== null && _ref2 !== void 0 ? _ref2 : null
    })),
    calendarDate = _useState4[0],
    setCalendarDate = _useState4[1];
  /**
   * When hoverRange is set, `selectValue` will be updated during the hover process,
   * which will cause the `selectValue` to be updated after the first click,
   * so declare a Ref to temporarily store the `selectValue` of the first click.
   */
  var selectRangeValueRef = (0, _react.useRef)(null);

  /**
   * Get the time on the calendar.
   */
  var getCalendarDatetime = function getCalendarDatetime(calendarKey) {
    var index = calendarKey === 'start' ? 0 : 1;
    return (calendarDate === null || calendarDate === void 0 ? void 0 : calendarDate[index]) || (defaultCalendarValue === null || defaultCalendarValue === void 0 ? void 0 : defaultCalendarValue[index]);
  };

  /**
   * Call this function to update the calendar panel rendering benchmark value.
   * If params `value` is not passed, it defaults to [new Date(), addMonth(new Date(), 1)].
   */
  var setCalendarDateRange = function setCalendarDateRange(_ref3) {
    var dateRange = _ref3.dateRange,
      calendarKey = _ref3.calendarKey,
      eventName = _ref3.eventName;
    var nextValue = dateRange;

    // The time should remain the same when the dates in the date range are changed.
    if ((0, _dateUtils.shouldRenderTime)(formatStr) && dateRange !== null && dateRange !== void 0 && dateRange.length && eventName !== 'changeTime') {
      var _startDate = (0, _dateUtils.copyTime)({
        from: getCalendarDatetime('start'),
        to: dateRange[0]
      });
      var _endDate = (0, _dateUtils.copyTime)({
        from: getCalendarDatetime('end'),
        to: dateRange.length === 1 ? (0, _dateUtils.addMonths)(_startDate, 1) : dateRange[1]
      });
      nextValue = [_startDate, _endDate];
    } else if (dateRange === null && typeof defaultCalendarValue !== 'undefined') {
      // Make the calendar render the value of defaultCalendarValue after clearing the value.
      nextValue = defaultCalendarValue;
    }
    var nextCalendarDate = (0, _utils2.getSafeCalendarDate)({
      value: nextValue,
      calendarKey: calendarKey,
      allowAameMonth: onlyShowMonth
    });
    setCalendarDate(nextCalendarDate);
    if (onlyShowMonth && eventName === 'changeMonth') {
      setSelectedDates(nextCalendarDate);
    }
  };

  // if valueProp changed then update selectValue/hoverValue
  (0, _react.useEffect)(function () {
    setSelectedDates(valueProp !== null && valueProp !== void 0 ? valueProp : []);
    setHoverDateRange(valueProp !== null && valueProp !== void 0 ? valueProp : null);
  }, [valueProp]);
  var getDateRangeString = function getDateRangeString(nextValue) {
    var _nextValue$, _nextValue$2;
    var startDate = (_nextValue$ = nextValue === null || nextValue === void 0 ? void 0 : nextValue[0]) !== null && _nextValue$ !== void 0 ? _nextValue$ : null;
    var endDate = (_nextValue$2 = nextValue === null || nextValue === void 0 ? void 0 : nextValue[1]) !== null && _nextValue$2 !== void 0 ? _nextValue$2 : null;
    if (startDate && endDate) {
      var displayValue = [startDate, endDate].sort(_dateUtils.compareAsc);
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_CustomProvider.FormattedDate, {
        date: displayValue[0],
        formatStr: formatStr
      }), character, /*#__PURE__*/_react.default.createElement(_CustomProvider.FormattedDate, {
        date: displayValue[1],
        formatStr: formatStr
      }));
    }
    return rangeFormatStr;
  };
  var getInputHtmlSize = function getInputHtmlSize() {
    var padding = 4;
    var strings = rangeFormatStr;
    if (value) {
      var _startDate2 = value[0],
        _endDate2 = value[1];
      strings = "" + formatDate(_startDate2, formatStr) + character + formatDate(_endDate2, formatStr);
    }
    return (0, _utils.getStringLength)(strings) + padding;
  };

  /**
   * preset hover range
   */
  var getHoverRangeValue = function getHoverRangeValue(date) {
    function getHoverRangeFunc() {
      if (hoverRange === 'week') {
        return (0, _partial.default)(_utils2.getWeekHoverRange, isoWeek);
      } else if (hoverRange === 'month') {
        return _utils2.getMonthHoverRange;
      }
      return hoverRange;
    }
    var hoverRangeFunc = getHoverRangeFunc();
    if ((0, _isNil.default)(hoverRangeFunc)) {
      return null;
    }
    var hoverValues = hoverRangeFunc(date);
    var isHoverRangeValid = hoverValues instanceof Array && hoverValues.length === 2;
    if (!isHoverRangeValid) {
      return null;
    }
    if ((0, _dateUtils.isAfter)(hoverValues[0], hoverValues[1])) {
      hoverValues = (0, _dateUtils.reverseDateRangeOmitTime)(hoverValues);
    }
    return hoverValues;
  };
  var setDateRange = function setDateRange(event, nextValue, closeOverlay) {
    if (closeOverlay === void 0) {
      closeOverlay = true;
    }
    // If nextValue is null, it means that the user is erasing the selected dates.
    setSelectedDates(nextValue !== null && nextValue !== void 0 ? nextValue : []);
    setValue(nextValue);
    if (!(0, _utils2.isSameRange)(nextValue, value, formatStr)) {
      onChange === null || onChange === void 0 ? void 0 : onChange(nextValue, event);
    }

    // `closeOverlay` default value is `true`
    if (closeOverlay !== false) {
      handleClose();
    }
  };

  /**
   * Select the date range. If oneTap is not set, you need to click twice to select the start time and end time.
   * The MouseMove event is called between the first click and the second click to update the selection state.
   */
  var handleMouseMove = (0, _utils.useEventCallback)(function (date) {
    var nextHoverDateRange = getHoverRangeValue(date);

    // If hasDoneSelect is false,
    // it means there's already one selected date
    // and waiting for user to select the second date to complete the selection.
    if (!isSelectedIdle) {
      // If `hoverRange` is set, you need to change the value of hoverDateRange according to the rules
      if (!(0, _isNil.default)(nextHoverDateRange) && !(0, _isNil.default)(selectRangeValueRef.current)) {
        var nextSelectedDates = [selectRangeValueRef.current[0], nextHoverDateRange[1]];
        if ((0, _dateUtils.isBefore)(nextHoverDateRange[0], selectRangeValueRef.current[0])) {
          nextSelectedDates = [nextHoverDateRange[0], selectRangeValueRef.current[1]];
        }
        setSelectedDates(nextSelectedDates);
      } else {
        setHoverDateRange(function (prevHoverValue) {
          return (0, _isNil.default)(prevHoverValue) ? null : [prevHoverValue[0], date];
        });
      }

      // Before the first click, if nextHoverDateRange has a value, hoverDateRange needs to be updated
    } else if (!(0, _isNil.default)(nextHoverDateRange)) {
      setHoverDateRange(nextHoverDateRange);
    }
  });

  /**
   * Callback for selecting a date cell in the calendar grid
   */
  var handleSelectDate = (0, _utils.useEventCallback)(function (index, date, event) {
    var calendarKey = index === 0 ? 'start' : 'end';
    var nextSelectDates = hoverDateRange !== null && hoverDateRange !== void 0 ? hoverDateRange : [];
    var hoverRangeValue = getHoverRangeValue(date);
    var noHoverRangeValid = (0, _isNil.default)(hoverRangeValue);

    // in `oneTap` mode
    if (isSelectedIdle && oneTap) {
      setDateRange(event, noHoverRangeValid ? [(0, _dateUtils.startOfDay)(date), (0, _dateUtils.endOfDay)(date)] : hoverRangeValue);
      setSelectedIdle(false);
      return;
    }

    // no preset hover range can use
    if (noHoverRangeValid) {
      // start select
      if (isSelectedIdle) {
        nextSelectDates = [date];
      } else {
        // finish select
        nextSelectDates[1] = date;
      }
    } else {
      if (!isSelectedIdle) {
        nextSelectDates = selectedDates;
        selectRangeValueRef.current = null;
      } else {
        nextSelectDates = hoverRangeValue;
        selectRangeValueRef.current = hoverRangeValue;
      }
    }
    if (nextSelectDates.length === 2) {
      // If user have completed the selection, then sort the selected dates.
      if ((0, _dateUtils.isAfter)(nextSelectDates[0], nextSelectDates[1])) {
        nextSelectDates = (0, _dateUtils.reverseDateRangeOmitTime)(nextSelectDates);
      }
      if ((0, _dateUtils.shouldRenderTime)(formatStr)) {
        nextSelectDates = [(0, _dateUtils.copyTime)({
          from: getCalendarDatetime('start'),
          to: nextSelectDates[0]
        }), (0, _dateUtils.copyTime)({
          from: getCalendarDatetime('end'),
          to: nextSelectDates[1]
        })];
      }
      setHoverDateRange(nextSelectDates);
    } else {
      setHoverDateRange([nextSelectDates[0], nextSelectDates[0]]);
    }
    setSelectedDates(nextSelectDates);
    setCalendarDateRange({
      dateRange: nextSelectDates,
      calendarKey: calendarKey,
      eventName: 'changeDate'
    });
    onSelect === null || onSelect === void 0 ? void 0 : onSelect(date, event);
    setSelectedIdle(!isSelectedIdle);
  });

  /**
   * If `selectValue` changed, there will be the following effects.
   * 1. Check if the selection is completed.
   * 2. if the selection is completed, set the temporary `hoverValue` empty.
   */
  (0, _react.useEffect)(function () {
    var selectValueLength = selectedDates.length;
    var doneSelected = selectValueLength === 0 || selectValueLength === 2;
    doneSelected && setHoverDateRange(null);
  }, [selectedDates]);
  var handleSingleCalendarMonth = (0, _utils.useEventCallback)(function (index, date) {
    var calendarKey = index === 0 ? 'start' : 'end';
    var nextCalendarDate = Array.from(calendarDate);
    nextCalendarDate[index] = date;
    setCalendarDateRange({
      dateRange: nextCalendarDate,
      calendarKey: calendarKey,
      eventName: 'changeMonth'
    });
  });
  var handleSingleCalendarTime = (0, _utils.useEventCallback)(function (index, date) {
    var calendarKey = index === 0 ? 'start' : 'end';
    var nextCalendarDate = Array.from(calendarDate);
    nextCalendarDate[index] = date;
    setCalendarDateRange({
      dateRange: nextCalendarDate,
      calendarKey: calendarKey,
      eventName: 'changeTime'
    });
    setSelectedDates(function (prev) {
      var next = [].concat(prev);

      // if next[index] is not empty, only update the time after aligning the year, month and day
      next[index] = next[index] ? (0, _dateUtils.copyTime)({
        from: date,
        to: next[index]
      }) : new Date(date.valueOf());
      return next;
    });
  });

  /**
   * The callback triggered when PM/AM is switched.
   */
  var handleToggleMeridian = (0, _utils.useEventCallback)(function (index) {
    var nextCalendarDate = Array.from(calendarDate);
    nextCalendarDate[index] = (0, _dateUtils.getReversedTimeMeridian)(nextCalendarDate[index]);
    setCalendarDate(nextCalendarDate);

    // If the value already exists, update the value again.
    if (selectedDates.length === 2) {
      var nextSelectedDates = Array.from(selectedDates);
      nextSelectedDates[index] = (0, _dateUtils.getReversedTimeMeridian)(nextSelectedDates[index]);
      setSelectedDates(nextSelectedDates);
    }
  });
  var handleEnter = (0, _utils.useEventCallback)(function () {
    var nextCalendarDate;
    if (value && value.length) {
      var _startDate3 = value[0],
        endData = value[1];
      nextCalendarDate = [_startDate3, (0, _dateUtils.isSameMonth)(_startDate3, endData) ? (0, _dateUtils.addMonths)(endData, 1) : endData];
    } else {
      // Reset the date on the calendar to the default date
      nextCalendarDate = (0, _utils2.getSafeCalendarDate)({
        value: defaultCalendarValue !== null && defaultCalendarValue !== void 0 ? defaultCalendarValue : null
      });
    }
    setSelectedDates(value !== null && value !== void 0 ? value : []);
    setCalendarDateRange({
      dateRange: nextCalendarDate
    });
  });

  /**
   * Toolbar operation callback function
   */
  var handleShortcutPageDate = (0, _utils.useEventCallback)(function (range, closeOverlay, event) {
    if (closeOverlay === void 0) {
      closeOverlay = false;
    }
    var value = range.value;
    setCalendarDateRange({
      dateRange: value
    });
    if (closeOverlay) {
      setDateRange(event, value, closeOverlay);
    } else {
      setSelectedDates(value !== null && value !== void 0 ? value : []);
    }
    onShortcutClick === null || onShortcutClick === void 0 ? void 0 : onShortcutClick(range, event);

    // End unfinished selections.
    setSelectedIdle(true);
  });
  var handleOK = (0, _utils.useEventCallback)(function (event) {
    setDateRange(event, selectedDates);
    onOk === null || onOk === void 0 ? void 0 : onOk(selectedDates, event);
  });
  var handleClean = (0, _utils.useEventCallback)(function (event) {
    setCalendarDateRange({
      dateRange: null
    });
    setDateRange(event, null);
    onClean === null || onClean === void 0 ? void 0 : onClean(event);
    event.stopPropagation();
  });

  /**
   * Callback after the input box value is changed.
   */
  var handleInputChange = (0, _utils.useEventCallback)(function (value, event) {
    if (!value) {
      return;
    }
    var startDate = value[0],
      endDate = value[1];
    var selectValue = [startDate, endDate];
    setHoverDateRange(selectValue);
    setSelectedDates(selectValue);
    setCalendarDateRange({
      dateRange: selectValue
    });
    setDateRange(event, selectValue);
  });
  var isDateDisabled = function isDateDisabled(date, options) {
    var selectDate = options.selectDate,
      selectedDone = options.selectedDone,
      target = options.target;
    if (typeof shouldDisableDate === 'function') {
      return shouldDisableDate(date, selectDate, selectedDone, target);
    }
    if (typeof DEPRECATED_disabledDateProp === 'function') {
      return DEPRECATED_disabledDateProp(date, selectDate, selectedDone, target);
    }
    return false;
  };
  var disabledByBetween = function disabledByBetween(start, end, type) {
    // If the date is between the start and the end
    // the button is disabled
    while ((0, _dateUtils.isBefore)(start, end) || (0, _dateUtils.isSameDay)(start, end)) {
      if (isDateDisabled(start, {
        selectDate: selectedDates,
        selectedDone: isSelectedIdle,
        target: type
      })) {
        return true;
      }
      start = (0, _dateUtils.addDays)(start, 1);
    }
    return false;
  };
  var disabledOkButton = function disabledOkButton() {
    var start = selectedDates[0],
      end = selectedDates[1];
    if (!start || !end || !isSelectedIdle) {
      return true;
    }
    return disabledByBetween(start, end, _utils.DATERANGE_DISABLED_TARGET.TOOLBAR_BUTTON_OK);
  };
  var disabledShortcutButton = function disabledShortcutButton(value) {
    if (value === void 0) {
      value = [];
    }
    var _value = value,
      start = _value[0],
      end = _value[1];
    if (!start || !end) {
      return true;
    }
    return disabledByBetween(start, end, _utils.DATERANGE_DISABLED_TARGET.TOOLBAR_SHORTCUT);
  };
  var handleClose = (0, _utils.useEventCallback)(function () {
    var _trigger$current, _trigger$current$clos;
    (_trigger$current = trigger.current) === null || _trigger$current === void 0 ? void 0 : (_trigger$current$clos = _trigger$current.close) === null || _trigger$current$clos === void 0 ? void 0 : _trigger$current$clos.call(_trigger$current);
  });
  var handleInputKeyDown = (0, _utils.useEventCallback)(function (event) {
    (0, _Picker.onMenuKeyDown)(event, {
      esc: handleClose,
      enter: function enter() {
        var _trigger$current2;
        var _ref4 = ((_trigger$current2 = trigger.current) === null || _trigger$current2 === void 0 ? void 0 : _trigger$current2.getState()) || {},
          open = _ref4.open;
        if (!open) {
          var _trigger$current3;
          (_trigger$current3 = trigger.current) === null || _trigger$current3 === void 0 ? void 0 : _trigger$current3.open();
        }
      }
    });
  });
  var renderCalendarOverlay = function renderCalendarOverlay(positionProps, speakerRef) {
    var left = positionProps.left,
      top = positionProps.top,
      className = positionProps.className;
    var classes = merge(className, menuClassName, prefix('daterange-menu'));
    var panelClasses = prefix('daterange-panel', {
      'daterange-panel-show-one-calendar': showOneCalendar
    });

    /**
     * Set a min-width (528px) when there are two calendars
     * @see https://github.com/rsuite/rsuite/issues/3522
     */
    var panelStyles = {
      minWidth: showOneCalendar ? 'auto' : 528
    };
    var styles = (0, _extends2.default)({}, menuStyle, {
      left: left,
      top: top
    });
    var calendarProps = {
      calendarDate: calendarDate,
      disabledDate: function disabledDate(date, values, type) {
        return isDateDisabled(date, {
          selectDate: values,
          selectedDone: isSelectedIdle,
          target: type
        });
      },
      format: formatStr,
      hoverRangeValue: hoverDateRange !== null && hoverDateRange !== void 0 ? hoverDateRange : undefined,
      isoWeek: isoWeek,
      limitEndYear: limitEndYear,
      limitStartYear: limitStartYear,
      locale: locale,
      showWeekNumbers: showWeekNumbers,
      value: selectedDates,
      showMeridian: showMeridian,
      onChangeCalendarMonth: handleSingleCalendarMonth,
      onChangeCalendarTime: handleSingleCalendarTime,
      onMouseMove: handleMouseMove,
      onSelect: handleSelectDate,
      onToggleMeridian: handleToggleMeridian,
      renderTitle: renderTitle,
      renderCell: renderCell,
      cellClassName: cellClassName
    };
    var sideRanges = (ranges === null || ranges === void 0 ? void 0 : ranges.filter(function (range) {
      return (range === null || range === void 0 ? void 0 : range.placement) === 'left';
    })) || [];
    var bottomRanges = ranges === null || ranges === void 0 ? void 0 : ranges.filter(function (range) {
      return (range === null || range === void 0 ? void 0 : range.placement) === 'bottom' || (range === null || range === void 0 ? void 0 : range.placement) === undefined;
    });
    return /*#__PURE__*/_react.default.createElement(_Picker.PickerPopup, {
      role: "dialog",
      "aria-labelledby": label ? id + "-label" : undefined,
      tabIndex: -1,
      className: classes,
      ref: (0, _utils.mergeRefs)(overlay, speakerRef),
      target: trigger,
      style: styles
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: panelClasses,
      style: panelStyles
    }, /*#__PURE__*/_react.default.createElement(_Stack.default, {
      alignItems: "flex-start"
    }, sideRanges.length > 0 && /*#__PURE__*/_react.default.createElement(_PredefinedRanges.default, {
      direction: "column",
      spacing: 0,
      className: prefix('daterange-predefined'),
      ranges: sideRanges,
      calendarDate: calendarDate,
      locale: locale,
      disabledShortcut: disabledShortcutButton,
      onShortcutClick: handleShortcutPageDate,
      "data-testid": "daterange-predefined-side"
    }), /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
      className: prefix('daterange-content')
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: prefix('daterange-header'),
      "data-testid": "daterange-header"
    }, getDateRangeString(selectedDates)), /*#__PURE__*/_react.default.createElement("div", {
      className: prefix("daterange-calendar-" + (showOneCalendar ? 'single' : 'group'))
    }, /*#__PURE__*/_react.default.createElement(_DateRangePickerContext.default.Provider, {
      value: {
        isSelectedIdle: isSelectedIdle
      }
    }, /*#__PURE__*/_react.default.createElement(_Calendar2.default, (0, _extends2.default)({
      index: 0
    }, calendarProps)), !showOneCalendar && /*#__PURE__*/_react.default.createElement(_Calendar2.default, (0, _extends2.default)({
      index: 1
    }, calendarProps))))), /*#__PURE__*/_react.default.createElement(_Toolbar.default, {
      locale: locale,
      calendarDate: selectedDates,
      disabledOkBtn: disabledOkButton,
      disabledShortcut: disabledShortcutButton,
      hideOkBtn: oneTap,
      onOk: handleOK,
      onShortcutClick: handleShortcutPageDate,
      ranges: bottomRanges
    })))));
  };
  var hasValue = !(0, _isNil.default)(value) && value.length > 1;
  var _usePickerClassName = (0, _Picker.usePickerClassName)((0, _extends2.default)({}, props, {
      classPrefix: classPrefix,
      name: 'daterange',
      appearance: appearance,
      hasValue: hasValue,
      cleanable: cleanable
    })),
    classes = _usePickerClassName[0],
    usedClassNamePropKeys = _usePickerClassName[1];
  var caretAs = (0, _react.useMemo)(function () {
    if (caretAsProp === null) {
      return null;
    }
    return caretAsProp || ((0, _dateUtils.shouldOnlyRenderTime)(formatStr) ? _ClockO.default : _Calendar.default);
  }, [caretAsProp, formatStr]);
  var isErrorValue = function isErrorValue(value) {
    if (!value) {
      return false;
    }
    var startDate = value[0],
      endDate = value[1];
    if (!(0, _dateUtils.isValid)(startDate) || !(0, _dateUtils.isValid)(endDate)) {
      return true;
    }
    if ((0, _dateUtils.isBefore)(endDate, startDate)) {
      return true;
    }
    var disabledOptions = {
      selectDate: value,
      selectedDone: isSelectedIdle,
      target: _utils.DATERANGE_DISABLED_TARGET.INPUT
    };
    if (isDateDisabled(startDate, disabledOptions) || isDateDisabled(endDate, disabledOptions)) {
      return true;
    }
    return false;
  };
  var _partitionHTMLProps = (0, _utils.partitionHTMLProps)(restProps, {
      htmlProps: [],
      includeAria: true
    }),
    ariaProps = _partitionHTMLProps[0],
    rest = _partitionHTMLProps[1];
  var showCleanButton = cleanable && hasValue && !readOnly;
  var invalidValue = value && isErrorValue(value);
  return /*#__PURE__*/_react.default.createElement(_Picker.PickerToggleTrigger, {
    trigger: "active",
    ref: trigger,
    pickerProps: (0, _pick.default)(props, _Picker.pickTriggerPropKeys),
    placement: placement,
    onEnter: (0, _utils.createChainedFunction)(handleEnter, onEnter),
    onEntered: (0, _utils.createChainedFunction)(onOpen, onEntered),
    onExited: (0, _utils.createChainedFunction)(onClose, onExited),
    speaker: renderCalendarOverlay
  }, /*#__PURE__*/_react.default.createElement(Component, {
    ref: root,
    className: merge(className, classes, (_merge = {}, _merge[prefix('error')] = invalidValue, _merge)),
    style: style
  }, plaintext ? /*#__PURE__*/_react.default.createElement(_DateRangeInput.default, {
    value: value,
    format: formatStr,
    plaintext: plaintext
  }) : /*#__PURE__*/_react.default.createElement(_InputGroup.default, (0, _extends2.default)({}, (0, _omit.default)(rest, [].concat(_Picker.omitTriggerPropKeys, usedClassNamePropKeys, _dateUtils.calendarOnlyProps)), {
    inside: true,
    size: size
  }), /*#__PURE__*/_react.default.createElement(_Picker.PickerLabel, {
    className: prefix(_templateObject || (_templateObject = (0, _taggedTemplateLiteralLoose2.default)(["label"]))),
    id: id + "-label"
  }, label), /*#__PURE__*/_react.default.createElement(_DateRangeInput.default, (0, _extends2.default)({
    "aria-haspopup": "dialog",
    "aria-invalid": invalidValue,
    "aria-labelledby": label ? id + "-label" : undefined
  }, ariaProps, {
    ref: target,
    id: id,
    value: value,
    character: character,
    format: formatStr,
    placeholder: placeholder ? placeholder : rangeFormatStr,
    disabled: disabled,
    onChange: handleInputChange,
    readOnly: readOnly || !editable || loading,
    plaintext: plaintext,
    onKeyDown: handleInputKeyDown,
    htmlSize: getInputHtmlSize()
  })), /*#__PURE__*/_react.default.createElement(_Picker.PickerIndicator, {
    loading: loading,
    caretAs: caretAs,
    onClose: handleClean,
    showCleanButton: showCleanButton
  }))));
});
DateRangePicker.after = disabledDateUtils.after;
DateRangePicker.afterToday = disabledDateUtils.afterToday;
DateRangePicker.allowedDays = disabledDateUtils.allowedDays;
DateRangePicker.allowedMaxDays = disabledDateUtils.allowedMaxDays;
DateRangePicker.allowedRange = disabledDateUtils.allowedRange;
DateRangePicker.before = disabledDateUtils.before;
DateRangePicker.beforeToday = disabledDateUtils.beforeToday;
DateRangePicker.combine = disabledDateUtils.combine;
DateRangePicker.displayName = 'DateRangePicker';
DateRangePicker.propTypes = (0, _extends2.default)({}, _Picker.pickerPropTypes, {
  ranges: _propTypes.default.array,
  value: _propTypes.default.arrayOf(_propTypes.default.instanceOf(Date)),
  defaultValue: _propTypes.default.arrayOf(_propTypes.default.instanceOf(Date)),
  defaultCalendarValue: _propTypes.default.arrayOf(_propTypes.default.instanceOf(Date)),
  hoverRange: _propTypes.default.oneOfType([(0, _propTypes2.oneOf)(['week', 'month']), _propTypes.default.func]),
  format: _propTypes.default.string,
  isoWeek: _propTypes.default.bool,
  oneTap: _propTypes.default.bool,
  limitEndYear: _propTypes.default.number,
  limitStartYear: _propTypes.default.number,
  onChange: _propTypes.default.func,
  onOk: _propTypes.default.func,
  disabledDate: (0, _propTypes2.deprecatePropTypeNew)(_propTypes.default.func, 'Use "shouldDisableDate" property instead.'),
  shouldDisableDate: _propTypes.default.func,
  onSelect: _propTypes.default.func,
  showWeekNumbers: _propTypes.default.bool,
  showMeridian: _propTypes.default.bool,
  showOneCalendar: _propTypes.default.bool
});
var _default = DateRangePicker;
exports.default = _default;