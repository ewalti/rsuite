'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';
import omit from 'lodash/omit';
import { useClassNames, useControlled, useIsMounted, useEventCallback, PLACEMENT, mergeRefs, partitionHTMLProps } from '../utils';
import { animationPropTypes } from '../Animation/utils';
import { PickerToggleTrigger, onMenuKeyDown, Listbox, ListItem, PickerPopup, useFocusItemValue, usePickerRef, pickTriggerPropKeys } from '../internals/Picker';
import Plaintext from '../internals/Plaintext';
import { oneOf } from '../internals/propTypes';
import { transformData, shouldDisplay } from './utils';
import Combobox from './Combobox';
/**
 * Autocomplete function of input field.
 * @see https://rsuitejs.com/components/auto-complete
 *
 * TODO: Remove unnecessary .rs-auto-complete element
 * TODO: role=combobox and aria-autocomplete on input element
 */
var AutoComplete = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    disabled = props.disabled,
    className = props.className,
    _props$placement = props.placement,
    placement = _props$placement === void 0 ? 'bottomStart' : _props$placement,
    _props$selectOnEnter = props.selectOnEnter,
    selectOnEnter = _props$selectOnEnter === void 0 ? true : _props$selectOnEnter,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'auto-complete' : _props$classPrefix,
    _props$defaultValue = props.defaultValue,
    defaultValue = _props$defaultValue === void 0 ? '' : _props$defaultValue,
    _props$menuAutoWidth = props.menuAutoWidth,
    menuAutoWidth = _props$menuAutoWidth === void 0 ? true : _props$menuAutoWidth,
    data = props.data,
    valueProp = props.value,
    open = props.open,
    style = props.style,
    size = props.size,
    menuClassName = props.menuClassName,
    id = props.id,
    readOnly = props.readOnly,
    plaintext = props.plaintext,
    renderMenu = props.renderMenu,
    renderMenuItem = props.renderMenuItem,
    onSelect = props.onSelect,
    filterBy = props.filterBy,
    onKeyDown = props.onKeyDown,
    onChange = props.onChange,
    onClose = props.onClose,
    onOpen = props.onOpen,
    onFocus = props.onFocus,
    onBlur = props.onBlur,
    onMenuFocus = props.onMenuFocus,
    rest = _objectWithoutPropertiesLoose(props, ["as", "disabled", "className", "placement", "selectOnEnter", "classPrefix", "defaultValue", "menuAutoWidth", "data", "value", "open", "style", "size", "menuClassName", "id", "readOnly", "plaintext", "renderMenu", "renderMenuItem", "onSelect", "filterBy", "onKeyDown", "onChange", "onClose", "onOpen", "onFocus", "onBlur", "onMenuFocus"]);
  var datalist = transformData(data);
  var _useControlled = useControlled(valueProp, defaultValue),
    value = _useControlled[0],
    setValue = _useControlled[1];
  var _useState = useState(false),
    focus = _useState[0],
    setFocus = _useState[1];
  var items = (datalist === null || datalist === void 0 ? void 0 : datalist.filter(shouldDisplay(filterBy, value))) || [];
  var hasItems = items.length > 0;
  var _usePickerRef = usePickerRef(ref),
    trigger = _usePickerRef.trigger,
    overlay = _usePickerRef.overlay,
    root = _usePickerRef.root;
  var isMounted = useIsMounted();

  // Used to hover the focuse item  when trigger `onKeydown`
  var _useFocusItemValue = useFocusItemValue(value, {
      data: datalist,
      focusToOption: false,
      callback: onMenuFocus,
      target: function target() {
        return overlay.current;
      }
    }),
    focusItemValue = _useFocusItemValue.focusItemValue,
    setFocusItemValue = _useFocusItemValue.setFocusItemValue,
    handleKeyDown = _useFocusItemValue.onKeyDown;
  var handleKeyDownEvent = function handleKeyDownEvent(event) {
    if (!overlay.current) {
      return;
    }
    onMenuKeyDown(event, {
      enter: selectOnEnter ? selectFocusMenuItem : undefined,
      esc: handleClose
    });
    handleKeyDown(event);
    onKeyDown === null || onKeyDown === void 0 ? void 0 : onKeyDown(event);
  };
  var selectFocusMenuItem = function selectFocusMenuItem(event) {
    if (!focusItemValue) {
      return;
    }
    var focusItem = datalist.find(function (item) {
      return (item === null || item === void 0 ? void 0 : item.value) === focusItemValue;
    });
    setValue(focusItemValue);
    setFocusItemValue(focusItemValue);
    handleSelect(focusItem, event);
    if (value !== focusItemValue) {
      handleChangeValue(focusItemValue, event);
    }
    handleClose();
  };
  var handleSelect = useEventCallback(function (item, event) {
    onSelect === null || onSelect === void 0 ? void 0 : onSelect(item.value, item, event);
  });
  var handleChangeValue = useEventCallback(function (value, event) {
    onChange === null || onChange === void 0 ? void 0 : onChange(value, event);
  });
  var handleChange = function handleChange(value, event) {
    setFocusItemValue('');
    setValue(value);
    setFocus(true);
    handleChangeValue(value, event);
  };
  var handleClose = useEventCallback(function () {
    if (isMounted()) {
      setFocus(false);
      onClose === null || onClose === void 0 ? void 0 : onClose();
    }
  });
  var handleOpen = useEventCallback(function () {
    setFocus(true);
    onOpen === null || onOpen === void 0 ? void 0 : onOpen();
  });
  var handleItemSelect = useEventCallback(function (nextItemValue, item, event) {
    setValue(nextItemValue);
    setFocusItemValue(nextItemValue);
    handleSelect(item, event);
    if (value !== nextItemValue) {
      handleChangeValue(nextItemValue, event);
    }
    handleClose();
  });
  var handleInputFocus = useEventCallback(function (event) {
    onFocus === null || onFocus === void 0 ? void 0 : onFocus(event);
    handleOpen();
  });
  var handleInputBlur = useEventCallback(function (event) {
    setTimeout(handleClose, 300);
    onBlur === null || onBlur === void 0 ? void 0 : onBlur(event);
  });
  var _useClassNames = useClassNames(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge;
  var classes = merge(className, withClassPrefix({
    disabled: disabled
  }));
  var _partitionHTMLProps = partitionHTMLProps(omit(rest, pickTriggerPropKeys)),
    htmlInputProps = _partitionHTMLProps[0],
    restProps = _partitionHTMLProps[1];
  var renderPopup = function renderPopup(positionProps, speakerRef) {
    var left = positionProps.left,
      top = positionProps.top,
      className = positionProps.className;
    var styles = {
      left: left,
      top: top
    };
    var menu = /*#__PURE__*/React.createElement(Listbox, {
      classPrefix: "auto-complete-menu",
      listItemClassPrefix: "auto-complete-item",
      listItemAs: ListItem,
      focusItemValue: focusItemValue,
      onSelect: handleItemSelect,
      renderMenuItem: renderMenuItem,
      data: items,
      className: menuClassName
    });
    return /*#__PURE__*/React.createElement(PickerPopup, {
      ref: mergeRefs(overlay, speakerRef),
      style: styles,
      className: className,
      onKeyDown: handleKeyDownEvent,
      target: trigger,
      autoWidth: menuAutoWidth
    }, renderMenu ? renderMenu(menu) : menu);
  };
  if (plaintext) {
    return /*#__PURE__*/React.createElement(Plaintext, {
      ref: ref,
      localeKey: "unfilled"
    }, typeof value === 'undefined' ? defaultValue : value);
  }
  var expanded = open || focus && hasItems;
  return /*#__PURE__*/React.createElement(PickerToggleTrigger, {
    id: id,
    ref: trigger,
    placement: placement,
    pickerProps: pick(props, pickTriggerPropKeys),
    trigger: ['click', 'focus'],
    open: expanded,
    speaker: renderPopup
  }, /*#__PURE__*/React.createElement(Component, _extends({
    className: classes,
    style: style,
    ref: root
  }, restProps), /*#__PURE__*/React.createElement(Combobox, _extends({}, htmlInputProps, {
    disabled: disabled,
    value: value,
    size: size,
    readOnly: readOnly,
    expanded: expanded,
    focusItemValue: focusItemValue,
    onBlur: handleInputBlur,
    onFocus: handleInputFocus,
    onChange: handleChange,
    onKeyDown: handleKeyDownEvent
  }))));
});
AutoComplete.displayName = 'AutoComplete';
AutoComplete.propTypes = _extends({}, animationPropTypes, {
  data: PropTypes.array,
  disabled: PropTypes.bool,
  onSelect: PropTypes.func,
  onChange: PropTypes.func,
  classPrefix: PropTypes.string,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  className: PropTypes.string,
  menuClassName: PropTypes.string,
  menuAutoWidth: PropTypes.bool,
  placement: oneOf(PLACEMENT),
  onFocus: PropTypes.func,
  onMenuFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onKeyDown: PropTypes.func,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  readOnly: PropTypes.bool,
  renderMenu: PropTypes.func,
  renderMenuItem: PropTypes.func,
  style: PropTypes.object,
  size: oneOf(['lg', 'md', 'sm', 'xs']),
  open: PropTypes.bool,
  selectOnEnter: PropTypes.bool,
  filterBy: PropTypes.func
});
export default AutoComplete;