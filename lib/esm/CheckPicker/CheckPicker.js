'use client';
import _taggedTemplateLiteralLoose from "@babel/runtime/helpers/esm/taggedTemplateLiteralLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _templateObject;
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clone from 'lodash/clone';
import isUndefined from 'lodash/isUndefined';
import isFunction from 'lodash/isFunction';
import remove from 'lodash/remove';
import omit from 'lodash/omit';
import pick from 'lodash/pick';
import isNil from 'lodash/isNil';
import { filterNodesOfTree } from '../utils/treeUtils';
import { createChainedFunction, useClassNames, shallowEqual, useCustom, useControlled, useEventCallback, mergeRefs } from '../utils';
import { getDataGroupBy } from '../utils/getDataGroupBy';
import { Listbox, ListCheckItem, PickerToggle, PickerPopup, SelectedElement, PickerToggleTrigger, useFocusItemValue, usePickerClassName, useSearch, useToggleKeyDownEvent, usePickerRef, pickTriggerPropKeys, omitTriggerPropKeys, listPickerPropTypes } from '../internals/Picker';
import SearchBox from '../internals/SearchBox';
import { oneOf } from '../internals/propTypes';
var emptyArray = [];
/**
 * A component for selecting checkable items in a dropdown list.
 * @see https://rsuitejs.com/components/check-picker
 */
var CheckPicker = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    _props$appearance = props.appearance,
    appearance = _props$appearance === void 0 ? 'default' : _props$appearance,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'picker' : _props$classPrefix,
    _props$countable = props.countable,
    countable = _props$countable === void 0 ? true : _props$countable,
    _props$data = props.data,
    data = _props$data === void 0 ? emptyArray : _props$data,
    _props$disabledItemVa = props.disabledItemValues,
    disabledItemValues = _props$disabledItemVa === void 0 ? emptyArray : _props$disabledItemVa,
    _props$valueKey = props.valueKey,
    valueKey = _props$valueKey === void 0 ? 'value' : _props$valueKey,
    _props$labelKey = props.labelKey,
    labelKey = _props$labelKey === void 0 ? 'label' : _props$labelKey,
    _props$searchable = props.searchable,
    searchable = _props$searchable === void 0 ? true : _props$searchable,
    virtualized = props.virtualized,
    _props$cleanable = props.cleanable,
    cleanable = _props$cleanable === void 0 ? true : _props$cleanable,
    _props$placement = props.placement,
    placement = _props$placement === void 0 ? 'bottomStart' : _props$placement,
    _props$menuAutoWidth = props.menuAutoWidth,
    menuAutoWidth = _props$menuAutoWidth === void 0 ? true : _props$menuAutoWidth,
    _props$menuMaxHeight = props.menuMaxHeight,
    menuMaxHeight = _props$menuMaxHeight === void 0 ? 320 : _props$menuMaxHeight,
    menuClassName = props.menuClassName,
    menuStyle = props.menuStyle,
    overrideLocale = props.locale,
    placeholder = props.placeholder,
    disabled = props.disabled,
    toggleAs = props.toggleAs,
    style = props.style,
    sticky = props.sticky,
    valueProp = props.value,
    defaultValue = props.defaultValue,
    groupBy = props.groupBy,
    listProps = props.listProps,
    id = props.id,
    sort = props.sort,
    searchBy = props.searchBy,
    renderMenuItem = props.renderMenuItem,
    renderMenuGroup = props.renderMenuGroup,
    renderValue = props.renderValue,
    renderExtraFooter = props.renderExtraFooter,
    renderMenu = props.renderMenu,
    onGroupTitleClick = props.onGroupTitleClick,
    onSearch = props.onSearch,
    onEnter = props.onEnter,
    onEntered = props.onEntered,
    onExited = props.onExited,
    onClean = props.onClean,
    onChange = props.onChange,
    onSelect = props.onSelect,
    onClose = props.onClose,
    onOpen = props.onOpen,
    rest = _objectWithoutPropertiesLoose(props, ["as", "appearance", "classPrefix", "countable", "data", "disabledItemValues", "valueKey", "labelKey", "searchable", "virtualized", "cleanable", "placement", "menuAutoWidth", "menuMaxHeight", "menuClassName", "menuStyle", "locale", "placeholder", "disabled", "toggleAs", "style", "sticky", "value", "defaultValue", "groupBy", "listProps", "id", "sort", "searchBy", "renderMenuItem", "renderMenuGroup", "renderValue", "renderExtraFooter", "renderMenu", "onGroupTitleClick", "onSearch", "onEnter", "onEntered", "onExited", "onClean", "onChange", "onSelect", "onClose", "onOpen"]);
  var _usePickerRef = usePickerRef(ref),
    trigger = _usePickerRef.trigger,
    root = _usePickerRef.root,
    target = _usePickerRef.target,
    overlay = _usePickerRef.overlay,
    list = _usePickerRef.list,
    searchInput = _usePickerRef.searchInput;
  var _useCustom = useCustom('Picker', overrideLocale),
    locale = _useCustom.locale;
  var _useControlled = useControlled(valueProp, defaultValue || []),
    value = _useControlled[0],
    setValue = _useControlled[1]; // Used to hover the focuse item  when trigger `onKeydown`
  var _useFocusItemValue = useFocusItemValue(value === null || value === void 0 ? void 0 : value[0], {
      data: data,
      valueKey: valueKey,
      target: function target() {
        return overlay.current;
      }
    }),
    focusItemValue = _useFocusItemValue.focusItemValue,
    setFocusItemValue = _useFocusItemValue.setFocusItemValue,
    onFocusItem = _useFocusItemValue.onKeyDown;
  var handleSearchCallback = useEventCallback(function (searchKeyword, filteredData, event) {
    var _filteredData$;
    // The first option after filtering is the focus.
    setFocusItemValue(filteredData === null || filteredData === void 0 ? void 0 : (_filteredData$ = filteredData[0]) === null || _filteredData$ === void 0 ? void 0 : _filteredData$[valueKey]);
    onSearch === null || onSearch === void 0 ? void 0 : onSearch(searchKeyword, event);
  });

  // Use search keywords to filter options.
  var _useSearch = useSearch(data, {
      labelKey: labelKey,
      searchBy: searchBy,
      callback: handleSearchCallback
    }),
    searchKeyword = _useSearch.searchKeyword,
    filteredData = _useSearch.filteredData,
    handleSearch = _useSearch.handleSearch,
    resetSearch = _useSearch.resetSearch,
    checkShouldDisplay = _useSearch.checkShouldDisplay; // Use component active state to support keyboard events.
  var _useState = useState(false),
    active = _useState[0],
    setActive = _useState[1]; // A list of shortcut options.
  // when opened again, the selected options are displayed at the top.
  var _useState2 = useState([]),
    stickyItems = _useState2[0],
    setStickyItems = _useState2[1];
  var initStickyItems = function initStickyItems() {
    if (!sticky) {
      return;
    }
    var nextStickyItems = [];
    if (data && value.length) {
      nextStickyItems = data.filter(function (item) {
        return value.some(function (v) {
          return v === item[valueKey];
        });
      });
    }
    setStickyItems(nextStickyItems);
  };
  var handleChangeValue = useEventCallback(function (value, event) {
    onChange === null || onChange === void 0 ? void 0 : onChange(value, event);
  });
  var handleClean = useEventCallback(function (event) {
    if (disabled || !cleanable) {
      return;
    }
    setValue([]);
    onClean === null || onClean === void 0 ? void 0 : onClean(event);
    handleChangeValue([], event);
  });
  var handleMenuPressEnter = function handleMenuPressEnter(event) {
    var nextValue = clone(value);
    if (!focusItemValue) {
      return;
    }
    if (!nextValue.some(function (v) {
      return shallowEqual(v, focusItemValue);
    })) {
      nextValue.push(focusItemValue);
    } else {
      remove(nextValue, function (itemVal) {
        return shallowEqual(itemVal, focusItemValue);
      });
    }
    var focusItem = data.find(function (item) {
      return shallowEqual(item === null || item === void 0 ? void 0 : item[valueKey], focusItemValue);
    });
    setValue(nextValue);
    handleSelect(nextValue, focusItem, event);
    handleChangeValue(nextValue, event);
  };
  var onPickerKeyDown = useToggleKeyDownEvent(_extends({
    toggle: !focusItemValue || !active,
    trigger: trigger,
    target: target,
    overlay: overlay,
    searchInput: searchInput,
    active: active,
    onExit: handleClean,
    onMenuKeyDown: onFocusItem,
    onMenuPressEnter: handleMenuPressEnter,
    onMenuPressBackspace: handleClean,
    onClose: function onClose() {
      setFocusItemValue(null);
    }
  }, rest));
  var handleSelect = useEventCallback(function (nextItemValue, item, event) {
    onSelect === null || onSelect === void 0 ? void 0 : onSelect(nextItemValue, item, event);
  });
  var handleItemSelect = useEventCallback(function (nextItemValue, item, event, checked) {
    var nextValue = clone(value);
    if (checked) {
      nextValue.push(nextItemValue);
    } else {
      remove(nextValue, function (itemVal) {
        return shallowEqual(itemVal, nextItemValue);
      });
    }
    setValue(nextValue);
    setFocusItemValue(nextItemValue);
    handleSelect(nextValue, item, event);
    handleChangeValue(nextValue, event);
  });
  var handleEntered = useEventCallback(function () {
    setActive(true);
    onOpen === null || onOpen === void 0 ? void 0 : onOpen();
  });
  var handleExited = useEventCallback(function () {
    resetSearch();
    setFocusItemValue(null);
    setActive(false);
    onClose === null || onClose === void 0 ? void 0 : onClose();
  });
  var selectedItems = data.filter(function (item) {
    return value === null || value === void 0 ? void 0 : value.some(function (val) {
      return shallowEqual(item[valueKey], val);
    });
  }) || [];

  /**
   * 1.Have a value and the value is valid.
   * 2.Regardless of whether the value is valid, as long as renderValue is set, it is judged to have a value.
   */
  var hasValue = selectedItems.length > 0 || (value === null || value === void 0 ? void 0 : value.length) > 0 && isFunction(renderValue);
  var _useClassNames = useClassNames(classPrefix),
    prefix = _useClassNames.prefix,
    merge = _useClassNames.merge;
  var selectedElement = placeholder;
  if (selectedItems.length > 0) {
    selectedElement = /*#__PURE__*/React.createElement(SelectedElement, {
      selectedItems: selectedItems,
      countable: countable,
      valueKey: valueKey,
      labelKey: labelKey,
      prefix: prefix
    });
  }
  if ((value === null || value === void 0 ? void 0 : value.length) > 0 && isFunction(renderValue)) {
    selectedElement = renderValue(value, selectedItems, selectedElement);
    // If renderValue returns null or undefined, hasValue is false.
    if (isNil(selectedElement)) {
      hasValue = false;
    }
  }
  var renderPopup = function renderPopup(positionProps, speakerRef) {
    var left = positionProps.left,
      top = positionProps.top,
      className = positionProps.className;
    var classes = merge(className, menuClassName, prefix('check-menu'));
    var styles = _extends({}, menuStyle, {
      left: left,
      top: top
    });
    var items = filteredData;
    var filteredStickyItems = [];
    if (stickyItems) {
      filteredStickyItems = filterNodesOfTree(stickyItems, function (item) {
        return checkShouldDisplay(item);
      });
      items = filterNodesOfTree(data, function (item) {
        return checkShouldDisplay(item) && !stickyItems.some(function (v) {
          return v[valueKey] === item[valueKey];
        });
      });
    }

    // Create a tree structure data when set `groupBy`
    if (groupBy) {
      items = getDataGroupBy(items, groupBy, sort);
    } else if (typeof sort === 'function') {
      items = items.sort(sort(false));
    }
    var menu = items.length || filteredStickyItems.length ? /*#__PURE__*/React.createElement(Listbox, {
      listProps: listProps,
      listRef: list,
      disabledItemValues: disabledItemValues,
      valueKey: valueKey,
      labelKey: labelKey,
      renderMenuGroup: renderMenuGroup,
      renderMenuItem: renderMenuItem,
      maxHeight: menuMaxHeight,
      classPrefix: 'picker-check-menu',
      listItemAs: ListCheckItem,
      activeItemValues: value,
      focusItemValue: focusItemValue,
      data: [].concat(filteredStickyItems, items)
      // `group` is redundant so long as `groupBy` exists
      ,
      group: !isUndefined(groupBy),
      groupBy: groupBy,
      onSelect: handleItemSelect,
      onGroupTitleClick: onGroupTitleClick,
      virtualized: virtualized
    }) : /*#__PURE__*/React.createElement("div", {
      className: prefix(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["none"])))
    }, locale === null || locale === void 0 ? void 0 : locale.noResultsText);
    return /*#__PURE__*/React.createElement(PickerPopup, {
      ref: mergeRefs(overlay, speakerRef),
      autoWidth: menuAutoWidth,
      className: classes,
      style: styles,
      onKeyDown: onPickerKeyDown,
      target: trigger
    }, searchable && /*#__PURE__*/React.createElement(SearchBox, {
      placeholder: locale === null || locale === void 0 ? void 0 : locale.searchPlaceholder,
      onChange: handleSearch,
      value: searchKeyword,
      inputRef: searchInput
    }), renderMenu ? renderMenu(menu) : menu, renderExtraFooter === null || renderExtraFooter === void 0 ? void 0 : renderExtraFooter());
  };
  var _usePickerClassName = usePickerClassName(_extends({}, props, {
      appearance: appearance,
      classPrefix: classPrefix,
      cleanable: cleanable,
      countable: countable,
      hasValue: hasValue,
      name: 'check'
    })),
    classes = _usePickerClassName[0],
    usedClassNamePropKeys = _usePickerClassName[1];
  return /*#__PURE__*/React.createElement(PickerToggleTrigger, {
    id: id,
    multiple: true,
    pickerProps: pick(props, pickTriggerPropKeys),
    ref: trigger,
    placement: placement,
    onEnter: createChainedFunction(initStickyItems, onEnter),
    onEntered: createChainedFunction(handleEntered, onEntered),
    onExited: createChainedFunction(handleExited, onExited),
    speaker: renderPopup
  }, /*#__PURE__*/React.createElement(Component, {
    className: classes,
    style: style,
    ref: root
  }, /*#__PURE__*/React.createElement(PickerToggle, _extends({}, omit(rest, [].concat(omitTriggerPropKeys, usedClassNamePropKeys)), {
    ref: target,
    appearance: appearance,
    disabled: disabled,
    onClean: handleClean,
    onKeyDown: onPickerKeyDown,
    as: toggleAs,
    cleanable: cleanable && !disabled,
    hasValue: hasValue,
    active: active,
    placement: placement,
    inputValue: value,
    focusItemValue: focusItemValue
  }), selectedElement || (locale === null || locale === void 0 ? void 0 : locale.placeholder))));
});
CheckPicker.displayName = 'CheckPicker';
CheckPicker.propTypes = _extends({}, listPickerPropTypes, {
  locale: PropTypes.any,
  appearance: oneOf(['default', 'subtle']),
  menuAutoWidth: PropTypes.bool,
  menuMaxHeight: PropTypes.number,
  renderMenu: PropTypes.func,
  renderMenuItem: PropTypes.func,
  renderMenuGroup: PropTypes.func,
  onSelect: PropTypes.func,
  onGroupTitleClick: PropTypes.func,
  onSearch: PropTypes.func,
  groupBy: PropTypes.any,
  sort: PropTypes.func,
  searchable: PropTypes.bool,
  countable: PropTypes.bool,
  sticky: PropTypes.bool,
  virtualized: PropTypes.bool,
  searchBy: PropTypes.func
});
export default CheckPicker;