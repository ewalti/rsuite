'use client';
import _taggedTemplateLiteralLoose from "@babel/runtime/helpers/esm/taggedTemplateLiteralLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _templateObject, _templateObject2, _templateObject3, _templateObject4;
import React, { useState, useRef, useEffect, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import isUndefined from 'lodash/isUndefined';
import isNil from 'lodash/isNil';
import isFunction from 'lodash/isFunction';
import remove from 'lodash/remove';
import clone from 'lodash/clone';
import isArray from 'lodash/isArray';
import omit from 'lodash/omit';
import pick from 'lodash/pick';
import getWidth from 'dom-lib/getWidth';
import shallowEqual from '../utils/shallowEqual';
import { filterNodesOfTree } from '../utils/treeUtils';
import Plaintext from '../internals/Plaintext';
import { createChainedFunction, tplTransform, useClassNames, useCustom, useControlled, useEventCallback, mergeRefs, isOneOf, KEY_VALUES } from '../utils';
import { oneOf } from '../internals/propTypes';
import { getDataGroupBy } from '../utils/getDataGroupBy';
import { Listbox, ListItem, ListCheckItem, PickerToggle, PickerPopup, PickerToggleTrigger, useFocusItemValue, usePickerClassName, useSearch, usePickerRef, useToggleKeyDownEvent, pickTriggerPropKeys, omitTriggerPropKeys, listPickerPropTypes } from '../internals/Picker';
import Tag from '../Tag';
import InputAutosize from './InputAutosize';
import TextBox from './TextBox';
import InputPickerContext from './InputPickerContext';
var convertSize = function convertSize(size) {
  switch (size) {
    case 'lg':
      return 'lg';
    case 'sm':
    case 'xs':
      return 'sm';
    default:
      return 'md';
  }
};
/**
 * Single item selector with text box input.
 *
 * @see https://rsuitejs.com/components/input-picker
 */
var InputPicker = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _merge;
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    _props$appearance = props.appearance,
    appearance = _props$appearance === void 0 ? 'default' : _props$appearance,
    _props$cleanable = props.cleanable,
    cleanable = _props$cleanable === void 0 ? true : _props$cleanable,
    _props$cacheData = props.cacheData,
    cacheData = _props$cacheData === void 0 ? [] : _props$cacheData,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'picker' : _props$classPrefix,
    _props$data = props.data,
    controlledData = _props$data === void 0 ? [] : _props$data,
    disabled = props.disabled,
    readOnly = props.readOnly,
    plaintext = props.plaintext,
    defaultValue = props.defaultValue,
    _props$defaultOpen = props.defaultOpen,
    defaultOpen = _props$defaultOpen === void 0 ? false : _props$defaultOpen,
    _props$disabledItemVa = props.disabledItemValues,
    disabledItemValues = _props$disabledItemVa === void 0 ? [] : _props$disabledItemVa,
    overrideLocale = props.locale,
    toggleAs = props.toggleAs,
    style = props.style,
    _props$searchable = props.searchable,
    searchable = _props$searchable === void 0 ? true : _props$searchable,
    controlledOpen = props.open,
    placeholder = props.placeholder,
    groupBy = props.groupBy,
    menuClassName = props.menuClassName,
    menuStyle = props.menuStyle,
    _props$menuAutoWidth = props.menuAutoWidth,
    menuAutoWidth = _props$menuAutoWidth === void 0 ? true : _props$menuAutoWidth,
    _props$menuMaxHeight = props.menuMaxHeight,
    menuMaxHeight = _props$menuMaxHeight === void 0 ? 320 : _props$menuMaxHeight,
    creatable = props.creatable,
    shouldDisplayCreateOption = props.shouldDisplayCreateOption,
    valueProp = props.value,
    _props$valueKey = props.valueKey,
    valueKey = _props$valueKey === void 0 ? 'value' : _props$valueKey,
    virtualized = props.virtualized,
    _props$labelKey = props.labelKey,
    labelKey = _props$labelKey === void 0 ? 'label' : _props$labelKey,
    listProps = props.listProps,
    id = props.id,
    tabIndex = props.tabIndex,
    sort = props.sort,
    renderMenu = props.renderMenu,
    renderExtraFooter = props.renderExtraFooter,
    renderValue = props.renderValue,
    renderMenuItem = props.renderMenuItem,
    renderMenuGroup = props.renderMenuGroup,
    onEnter = props.onEnter,
    onEntered = props.onEntered,
    onExit = props.onExit,
    onExited = props.onExited,
    onChange = props.onChange,
    onClean = props.onClean,
    onCreate = props.onCreate,
    onSearch = props.onSearch,
    onSelect = props.onSelect,
    onOpen = props.onOpen,
    onClose = props.onClose,
    onBlur = props.onBlur,
    onFocus = props.onFocus,
    searchBy = props.searchBy,
    _props$placement = props.placement,
    placement = _props$placement === void 0 ? 'bottomStart' : _props$placement,
    rest = _objectWithoutPropertiesLoose(props, ["as", "appearance", "cleanable", "cacheData", "classPrefix", "data", "disabled", "readOnly", "plaintext", "defaultValue", "defaultOpen", "disabledItemValues", "locale", "toggleAs", "style", "searchable", "open", "placeholder", "groupBy", "menuClassName", "menuStyle", "menuAutoWidth", "menuMaxHeight", "creatable", "shouldDisplayCreateOption", "value", "valueKey", "virtualized", "labelKey", "listProps", "id", "tabIndex", "sort", "renderMenu", "renderExtraFooter", "renderValue", "renderMenuItem", "renderMenuGroup", "onEnter", "onEntered", "onExit", "onExited", "onChange", "onClean", "onCreate", "onSearch", "onSelect", "onOpen", "onClose", "onBlur", "onFocus", "searchBy", "placement"]);
  var _useContext = useContext(InputPickerContext),
    multi = _useContext.multi,
    tagProps = _useContext.tagProps,
    trigger = _useContext.trigger,
    disabledOptions = _useContext.disabledOptions,
    onTagRemove = _useContext.onTagRemove,
    renderMenuItemCheckbox = _useContext.renderMenuItemCheckbox;
  if (groupBy === valueKey || groupBy === labelKey) {
    throw Error('`groupBy` can not be equal to `valueKey` and `labelKey`');
  }
  var inputRef = useRef();
  var _usePickerRef = usePickerRef(ref),
    triggerRef = _usePickerRef.trigger,
    root = _usePickerRef.root,
    target = _usePickerRef.target,
    overlay = _usePickerRef.overlay,
    list = _usePickerRef.list;
  var _useCustom = useCustom(['Picker', 'InputPicker'], overrideLocale),
    locale = _useCustom.locale;
  var _useClassNames = useClassNames(classPrefix),
    prefix = _useClassNames.prefix,
    merge = _useClassNames.merge;
  var _useState = useState(controlledData),
    uncontrolledData = _useState[0],
    setData = _useState[1];
  var _useState2 = useState(100),
    maxWidth = _useState2[0],
    setMaxWidth = _useState2[1];
  var _useState3 = useState([]),
    newData = _useState3[0],
    setNewData = _useState3[1];
  var _useState4 = useState(defaultOpen),
    uncontrolledOpen = _useState4[0],
    setOpen = _useState4[1];
  var open = isUndefined(controlledOpen) ? uncontrolledOpen : controlledOpen;
  var getAllData = useCallback(function () {
    return [].concat(uncontrolledData, newData);
  }, [uncontrolledData, newData]);
  var getAllDataAndCache = useCallback(function () {
    return [].concat(getAllData(), cacheData);
  }, [getAllData, cacheData]);
  var _useControlled = useControlled(valueProp, multi ? defaultValue || [] : defaultValue),
    value = _useControlled[0],
    setValue = _useControlled[1],
    isControlled = _useControlled[2];
  var cloneValue = function cloneValue() {
    return multi ? clone(value) || [] : value;
  };
  var handleClose = useEventCallback(function () {
    var _triggerRef$current, _target$current, _target$current$focus;
    triggerRef === null || triggerRef === void 0 ? void 0 : (_triggerRef$current = triggerRef.current) === null || _triggerRef$current === void 0 ? void 0 : _triggerRef$current.close();

    // The focus is on the trigger button after closing
    (_target$current = target.current) === null || _target$current === void 0 ? void 0 : (_target$current$focus = _target$current.focus) === null || _target$current$focus === void 0 ? void 0 : _target$current$focus.call(_target$current);
  });

  // Used to hover the focuse item  when trigger `onKeydown`
  var _useFocusItemValue = useFocusItemValue(multi ? value === null || value === void 0 ? void 0 : value[0] : value, {
      data: getAllDataAndCache(),
      valueKey: valueKey,
      target: function target() {
        return overlay.current;
      }
    }),
    focusItemValue = _useFocusItemValue.focusItemValue,
    setFocusItemValue = _useFocusItemValue.setFocusItemValue,
    onKeyDown = _useFocusItemValue.onKeyDown;
  var handleSearchCallback = useEventCallback(function (searchKeyword, filteredData, event) {
    var _filteredData$;
    // The first option after filtering is the focus.
    setFocusItemValue(disabledOptions ? searchKeyword : (filteredData === null || filteredData === void 0 ? void 0 : (_filteredData$ = filteredData[0]) === null || _filteredData$ === void 0 ? void 0 : _filteredData$[valueKey]) || searchKeyword);
    onSearch === null || onSearch === void 0 ? void 0 : onSearch(searchKeyword, event);
  });

  // Use search keywords to filter options.
  var _useSearch = useSearch(getAllData(), {
      labelKey: labelKey,
      searchBy: searchBy,
      callback: handleSearchCallback
    }),
    searchKeyword = _useSearch.searchKeyword,
    resetSearch = _useSearch.resetSearch,
    checkShouldDisplay = _useSearch.checkShouldDisplay,
    handleSearch = _useSearch.handleSearch; // Update the state when the data in props changes
  useEffect(function () {
    if (controlledData && !shallowEqual(controlledData, uncontrolledData)) {
      var _controlledData$;
      setData(controlledData);
      setNewData([]);
      setFocusItemValue(controlledData === null || controlledData === void 0 ? void 0 : (_controlledData$ = controlledData[0]) === null || _controlledData$ === void 0 ? void 0 : _controlledData$[valueKey]);
    }
  }, [setFocusItemValue, controlledData, uncontrolledData, valueKey]);
  useEffect(function () {
    var _triggerRef$current2;
    // In multiple selection, you need to set a maximum width for the input.
    if ((_triggerRef$current2 = triggerRef.current) !== null && _triggerRef$current2 !== void 0 && _triggerRef$current2.root) {
      setMaxWidth(getWidth(triggerRef.current.root));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update the position of the menu when the search keyword and value change
  useEffect(function () {
    var _triggerRef$current3, _triggerRef$current3$;
    (_triggerRef$current3 = triggerRef.current) === null || _triggerRef$current3 === void 0 ? void 0 : (_triggerRef$current3$ = _triggerRef$current3.updatePosition) === null || _triggerRef$current3$ === void 0 ? void 0 : _triggerRef$current3$.call(_triggerRef$current3);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKeyword, value]);
  var getDataItem = function getDataItem(value) {
    // Find active `MenuItem` by `value`
    var allData = getAllDataAndCache();
    var activeItem = allData.find(function (item) {
      return shallowEqual(item[valueKey], value);
    });
    var itemNode = placeholder;
    if (activeItem !== null && activeItem !== void 0 && activeItem[labelKey]) {
      itemNode = activeItem === null || activeItem === void 0 ? void 0 : activeItem[labelKey];
    }
    return {
      isValid: !!activeItem,
      activeItem: activeItem,
      itemNode: itemNode
    };
  };
  var getInput = function getInput() {
    var _inputRef$current;
    return multi ? (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 ? void 0 : _inputRef$current.input : inputRef.current;
  };
  var focusInput = function focusInput() {
    var _getInput;
    return (_getInput = getInput()) === null || _getInput === void 0 ? void 0 : _getInput.focus();
  };
  var blurInput = function blurInput() {
    var _getInput2;
    return (_getInput2 = getInput()) === null || _getInput2 === void 0 ? void 0 : _getInput2.blur();
  };

  /**
   * Convert the string of the newly created option into an object.
   */
  var createOption = function createOption(value) {
    var _ref2;
    if (groupBy) {
      var _ref;
      return _ref = {
        create: true
      }, _ref[groupBy] = locale === null || locale === void 0 ? void 0 : locale.newItem, _ref[valueKey] = value, _ref[labelKey] = value, _ref;
    }
    return _ref2 = {
      create: true
    }, _ref2[valueKey] = value, _ref2[labelKey] = value, _ref2;
  };
  var handleChange = useEventCallback(function (value, event) {
    onChange === null || onChange === void 0 ? void 0 : onChange(value, event);
  });
  var handleRemoveItemByTag = useEventCallback(function (tag, event) {
    event.stopPropagation();
    var val = cloneValue();
    remove(val, function (itemVal) {
      return shallowEqual(itemVal, tag);
    });
    setValue(val);
    handleChange(val, event);
    onTagRemove === null || onTagRemove === void 0 ? void 0 : onTagRemove(tag, event);
  });
  var handleSelect = useEventCallback(function (value, item, event) {
    onSelect === null || onSelect === void 0 ? void 0 : onSelect(value, item, event);
    if (creatable && item.create) {
      delete item.create;
      onCreate === null || onCreate === void 0 ? void 0 : onCreate(value, item, event);
      setNewData(newData.concat(item));
    }
  });

  /**
   * Callback triggered by single selection
   * @param value
   * @param item
   * @param event
   */
  var handleSelectItem = useEventCallback(function (value, item, event) {
    setValue(value);
    setFocusItemValue(value);
    resetSearch();
    handleSelect(value, item, event);
    handleChange(value, event);
    handleClose();
  });

  /**
   * Callback triggered by multiple selection
   * @param nextItemValue
   * @param item
   * @param event
   * @param checked
   */
  var handleCheckTag = useEventCallback(function (nextItemValue, item, event, checked) {
    var val = cloneValue();
    if (checked) {
      val.push(nextItemValue);
    } else {
      remove(val, function (itemVal) {
        return shallowEqual(itemVal, nextItemValue);
      });
    }
    setValue(val);
    resetSearch();
    setFocusItemValue(nextItemValue);
    handleSelect(val, item, event);
    handleChange(val, event);
    focusInput();
  });
  var handleTagKeyPress = useEventCallback(function (event) {
    // When composing, ignore the keypress event.
    if (event.nativeEvent.isComposing) {
      return;
    }
    var val = cloneValue();
    var data = getAllData();
    if (!focusItemValue || !data) {
      return;
    }

    // If the value is disabled in this option, it is returned.
    if (disabledItemValues !== null && disabledItemValues !== void 0 && disabledItemValues.some(function (item) {
      return item === focusItemValue;
    })) {
      return;
    }
    if (!val.some(function (v) {
      return shallowEqual(v, focusItemValue);
    })) {
      val.push(focusItemValue);
    } else if (!disabledOptions) {
      remove(val, function (itemVal) {
        return shallowEqual(itemVal, focusItemValue);
      });
    }
    var focusItem = data.find(function (item) {
      return shallowEqual(item === null || item === void 0 ? void 0 : item[valueKey], focusItemValue);
    });
    if (!focusItem) {
      focusItem = createOption(focusItemValue);
    }
    setValue(val);
    resetSearch();
    handleSelect(val, focusItem, event);
    handleChange(val, event);
  });
  var handleMenuItemKeyPress = useEventCallback(function (event) {
    if (!focusItemValue || !controlledData) {
      return;
    }

    // If the value is disabled in this option, it is returned.
    if (disabledItemValues !== null && disabledItemValues !== void 0 && disabledItemValues.some(function (item) {
      return item === focusItemValue;
    })) {
      return;
    }

    // Find active `MenuItem` by `value`
    var allData = getAllData();
    var focusItem = allData.find(function (item) {
      return shallowEqual(item[valueKey], focusItemValue);
    });

    // FIXME Bad state flow
    if (!focusItem && focusItemValue === searchKeyword) {
      focusItem = createOption(searchKeyword);
    }
    setValue(focusItemValue);
    resetSearch();
    if (focusItem) {
      handleSelect(focusItemValue, focusItem, event);
    }
    handleChange(focusItemValue, event);
    handleClose();
  });

  /**
   * Remove the last item, after pressing the back key on the keyboard.
   * @param event
   */
  var removeLastItem = useEventCallback(function (event) {
    var target = event === null || event === void 0 ? void 0 : event.target;
    if ((target === null || target === void 0 ? void 0 : target.tagName) !== 'INPUT') {
      focusInput();
      return;
    }
    if ((target === null || target === void 0 ? void 0 : target.tagName) === 'INPUT' && target !== null && target !== void 0 && target.value) {
      return;
    }
    var val = cloneValue();
    val.pop();
    setValue(val);
    handleChange(val, event);
  });
  var handleClean = useEventCallback(function (event) {
    if (disabled || searchKeyword !== '') {
      return;
    }
    setValue(null);
    setFocusItemValue(null);
    resetSearch();
    if (multi) {
      handleChange([], event);
    } else {
      handleChange(null, event);
    }
    onClean === null || onClean === void 0 ? void 0 : onClean(event);
  });
  var events = {
    onMenuPressBackspace: multi ? removeLastItem : handleClean,
    onMenuKeyDown: onKeyDown,
    onMenuPressEnter: undefined,
    onKeyDown: undefined
  };
  var handleKeyPress = useEventCallback(function (event) {
    // When typing a space, create a tag.
    if (isOneOf('Space', trigger) && event.key === KEY_VALUES.SPACE) {
      handleTagKeyPress(event);
      event.preventDefault();
    }

    // When typing a comma, create a tag.
    if (isOneOf('Comma', trigger) && event.key === KEY_VALUES.COMMA) {
      handleTagKeyPress(event);
      event.preventDefault();
    }
  });
  if (multi) {
    if (isOneOf('Enter', trigger)) {
      events.onMenuPressEnter = handleTagKeyPress;
    }
    if (creatable) {
      events.onKeyDown = handleKeyPress;
    }
  } else {
    events.onMenuPressEnter = handleMenuItemKeyPress;
  }
  var onPickerKeyDown = useToggleKeyDownEvent(_extends({
    trigger: triggerRef,
    target: target,
    overlay: overlay
  }, events, rest));
  var handleExited = useEventCallback(function () {
    setFocusItemValue(multi ? value === null || value === void 0 ? void 0 : value[0] : value);
    resetSearch();
    onClose === null || onClose === void 0 ? void 0 : onClose();
  });
  var handleFocus = useEventCallback(function () {
    if (!readOnly) {
      var _triggerRef$current4;
      setOpen(true);
      (_triggerRef$current4 = triggerRef.current) === null || _triggerRef$current4 === void 0 ? void 0 : _triggerRef$current4.open();
    }
  });
  var handleEnter = useEventCallback(function () {
    focusInput();
    setOpen(true);
  });
  var handleExit = useEventCallback(function () {
    blurInput();
    setOpen(false);
  });
  var renderListItem = function renderListItem(label, item) {
    // 'Create option "{0}"' =>  Create option "xxxxx"
    var newLabel = item.create ? /*#__PURE__*/React.createElement("span", null, tplTransform(locale.createOption, label)) : label;
    return renderMenuItem ? renderMenuItem(newLabel, item) : newLabel;
  };
  var checkValue = function checkValue() {
    if (multi) {
      return {
        isValid: false,
        itemNode: null
      };
    }
    var dataItem = getDataItem(value);
    var itemNode = dataItem.itemNode;
    if (!isNil(value) && isFunction(renderValue)) {
      itemNode = renderValue(value, dataItem.activeItem, itemNode);
    }
    return {
      isValid: dataItem.isValid,
      itemNode: itemNode
    };
  };
  var renderMultiValue = function renderMultiValue() {
    if (!multi) {
      return null;
    }
    var _tagProps$closable = tagProps.closable,
      closable = _tagProps$closable === void 0 ? true : _tagProps$closable,
      onClose = tagProps.onClose,
      tagRest = _objectWithoutPropertiesLoose(tagProps, ["closable", "onClose"]);
    var tags = value || [];
    var items = [];
    var tagElements = tags.map(function (tag) {
      var _getDataItem = getDataItem(tag),
        isValid = _getDataItem.isValid,
        itemNode = _getDataItem.itemNode,
        activeItem = _getDataItem.activeItem;
      items.push(activeItem);
      if (!isValid) {
        return null;
      }
      return /*#__PURE__*/React.createElement(Tag, _extends({
        role: "option"
      }, tagRest, {
        key: tag,
        size: convertSize(rest.size),
        closable: !disabled && closable && !readOnly && !plaintext,
        title: typeof itemNode === 'string' ? itemNode : undefined,
        onClose: createChainedFunction(handleRemoveItemByTag.bind(null, tag), onClose)
      }), itemNode);
    }).filter(function (item) {
      return item !== null;
    });
    if ((tags.length > 0 || isControlled) && isFunction(renderValue)) {
      return renderValue(value, items, tagElements);
    }
    return tagElements;
  };
  var renderPopup = function renderPopup(positionProps, speakerRef) {
    var left = positionProps.left,
      top = positionProps.top,
      className = positionProps.className;
    var menuClassPrefix = multi ? 'picker-check-menu' : 'picker-select-menu';
    var classes = merge(className, menuClassName, prefix(multi ? 'check-menu' : 'select-menu'));
    var styles = _extends({}, menuStyle, {
      left: left,
      top: top
    });
    var items = filterNodesOfTree(getAllData(), checkShouldDisplay);
    if (creatable && (typeof shouldDisplayCreateOption === 'function' ? shouldDisplayCreateOption(searchKeyword, items) : searchKeyword && !items.find(function (item) {
      return item[valueKey] === searchKeyword;
    }))) {
      items = [].concat(items, [createOption(searchKeyword)]);
    }

    // Create a tree structure data when set `groupBy`
    if (groupBy) {
      items = getDataGroupBy(items, groupBy, sort);
    } else if (typeof sort === 'function') {
      items = items.sort(sort(false));
    }
    if (disabledOptions) {
      return /*#__PURE__*/React.createElement(PickerPopup, {
        ref: mergeRefs(overlay, speakerRef)
      });
    }
    var menu = items.length ? /*#__PURE__*/React.createElement(Listbox, {
      listProps: listProps,
      listRef: list,
      disabledItemValues: disabledItemValues,
      valueKey: valueKey,
      labelKey: labelKey,
      classPrefix: menuClassPrefix,
      listItemClassPrefix: multi ? undefined : menuClassPrefix + "-item",
      listItemAs: multi ? ListCheckItem : ListItem,
      listItemProps: {
        renderMenuItemCheckbox: renderMenuItemCheckbox
      },
      activeItemValues: multi ? value : [value],
      focusItemValue: focusItemValue,
      maxHeight: menuMaxHeight,
      data: items
      // FIXME-Doma
      // `group` is redundant so long as `groupBy` exists
      ,
      group: !isUndefined(groupBy),
      groupBy: groupBy,
      onSelect: multi ? handleCheckTag : handleSelectItem // fixme don't use any
      ,
      renderMenuGroup: renderMenuGroup,
      renderMenuItem: renderListItem,
      virtualized: virtualized
    }) : /*#__PURE__*/React.createElement("div", {
      className: prefix(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["none"])))
    }, locale === null || locale === void 0 ? void 0 : locale.noResultsText);
    return /*#__PURE__*/React.createElement(PickerPopup, {
      ref: mergeRefs(overlay, speakerRef),
      autoWidth: menuAutoWidth,
      className: classes,
      style: styles,
      target: triggerRef,
      onKeyDown: onPickerKeyDown
    }, renderMenu ? renderMenu(menu) : menu, renderExtraFooter === null || renderExtraFooter === void 0 ? void 0 : renderExtraFooter());
  };
  var _checkValue = checkValue(),
    isValid = _checkValue.isValid,
    itemNode = _checkValue.itemNode;
  var tagElements = renderMultiValue();

  /**
   * 1.Have a value and the value is valid.
   * 2.Regardless of whether the value is valid, as long as renderValue is set, it is judged to have a value.
   * 3.If renderValue returns null or undefined, hasValue is false.
   */
  var hasSingleValue = !isNil(value) && isFunction(renderValue) && !isNil(itemNode);
  var hasMultiValue = isArray(value) && value.length > 0 && isFunction(renderValue) && !isNil(tagElements);
  var hasValue = multi ? !!(tagElements !== null && tagElements !== void 0 && tagElements.length) || hasMultiValue : isValid || hasSingleValue;
  var _usePickerClassName = usePickerClassName(_extends({}, props, {
      classPrefix: classPrefix,
      appearance: appearance,
      hasValue: hasValue,
      name: 'input',
      cleanable: cleanable
    })),
    pickerClasses = _usePickerClassName[0],
    usedClassNamePropKeys = _usePickerClassName[1];
  var classes = merge(pickerClasses, (_merge = {}, _merge[prefix(_templateObject2 || (_templateObject2 = _taggedTemplateLiteralLoose(["tag"])))] = multi, _merge[prefix(_templateObject3 || (_templateObject3 = _taggedTemplateLiteralLoose(["focused"])))] = open, _merge[prefix(_templateObject4 || (_templateObject4 = _taggedTemplateLiteralLoose(["disabled-options"])))] = disabledOptions, _merge));
  var searching = !!searchKeyword && open;
  var editable = searchable && !disabled && !rest.loading;
  var inputProps = multi ? {
    inputStyle: {
      maxWidth: maxWidth - 63
    },
    as: InputAutosize
  } : {
    as: 'input'
  };
  if (plaintext) {
    var plaintextProps = {};

    // TagPicker has -6px margin-left on the plaintext wrapper
    // for fixing margin-left on tags from 2nd line on
    if (multi && hasValue) {
      plaintextProps.style = {
        marginLeft: -6
      };
    }
    return /*#__PURE__*/React.createElement(Plaintext, _extends({
      localeKey: "notSelected",
      ref: target
    }, plaintextProps), itemNode || (tagElements !== null && tagElements !== void 0 && tagElements.length ? tagElements : null) || placeholder);
  }
  var placeholderNode = placeholder || (disabledOptions ? null : locale === null || locale === void 0 ? void 0 : locale.placeholder);
  return /*#__PURE__*/React.createElement(PickerToggleTrigger, {
    id: id,
    multiple: multi,
    pickerProps: pick(props, pickTriggerPropKeys),
    ref: triggerRef,
    trigger: "active",
    onEnter: createChainedFunction(handleEnter, onEnter),
    onEntered: createChainedFunction(onEntered, onOpen),
    onExit: createChainedFunction(handleExit, onExit),
    onExited: createChainedFunction(handleExited, onExited),
    speaker: renderPopup,
    placement: placement
  }, /*#__PURE__*/React.createElement(Component, {
    className: classes,
    style: style,
    onClick: focusInput,
    onKeyDown: onPickerKeyDown,
    ref: root
  }, /*#__PURE__*/React.createElement(PickerToggle, _extends({}, omit(rest, [].concat(omitTriggerPropKeys, usedClassNamePropKeys)), {
    appearance: appearance,
    readOnly: readOnly,
    plaintext: plaintext,
    ref: target,
    as: toggleAs,
    tabIndex: tabIndex,
    onClean: handleClean,
    cleanable: cleanable && !disabled,
    hasValue: hasValue,
    active: open,
    disabled: disabled,
    placement: placement,
    inputValue: value,
    focusItemValue: focusItemValue,
    caret: !disabledOptions
  }), searching || multi && hasValue ? null : itemNode || placeholderNode), /*#__PURE__*/React.createElement(TextBox, {
    showTagList: hasValue && multi,
    tags: tagElements,
    editable: editable,
    readOnly: readOnly,
    disabled: disabled,
    multiple: multi,
    onBlur: onBlur,
    onFocus: createChainedFunction(handleFocus, onFocus),
    inputRef: inputRef,
    onChange: handleSearch,
    inputValue: open ? searchKeyword : '',
    inputProps: inputProps
  })));
});
InputPicker.displayName = 'InputPicker';
InputPicker.propTypes = _extends({}, listPickerPropTypes, {
  locale: PropTypes.any,
  appearance: oneOf(['default', 'subtle']),
  cacheData: PropTypes.array,
  menuAutoWidth: PropTypes.bool,
  menuMaxHeight: PropTypes.number,
  searchable: PropTypes.bool,
  creatable: PropTypes.bool,
  groupBy: PropTypes.any,
  sort: PropTypes.func,
  renderMenu: PropTypes.func,
  renderMenuItem: PropTypes.func,
  renderMenuGroup: PropTypes.func,
  onCreate: PropTypes.func,
  onSelect: PropTypes.func,
  onGroupTitleClick: PropTypes.func,
  onSearch: PropTypes.func,
  virtualized: PropTypes.bool,
  searchBy: PropTypes.func
});
export default InputPicker;