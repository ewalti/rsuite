'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';
import omit from 'lodash/omit';
import isFunction from 'lodash/isFunction';
import isNil from 'lodash/isNil';
import TreeView from './TreeView';
import Checkbox from '../Checkbox';
import { useCascadeValue, useColumnData, useFlattenData, isSomeChildChecked } from './utils';
import { getNodeParents, findNodeOfTree } from '../utils/treeUtils';
import { getColumnsAndPaths } from '../Cascader/utils';
import { createChainedFunction, mergeRefs, getSafeRegExpString, useClassNames, useCustom, useUpdateEffect, useControlled, useEventCallback } from '../utils';
import { PickerToggle, PickerPopup, SelectedElement, PickerToggleTrigger, usePickerClassName, usePickerRef, useToggleKeyDownEvent, useFocusItemValue, pickTriggerPropKeys, omitTriggerPropKeys, listPickerPropTypes } from '../internals/Picker';
import SearchBox from '../internals/SearchBox';
import { oneOf } from '../internals/propTypes';
var emptyArray = [];

/**
 * The `MultiCascader` component is used to select multiple values from cascading options.
 * @see https://rsuitejs.com/components/multi-cascader/
 */
var MultiCascader = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _selectedPaths;
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    _props$data = props.data,
    data = _props$data === void 0 ? emptyArray : _props$data,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'picker' : _props$classPrefix,
    defaultValue = props.defaultValue,
    valueProp = props.value,
    _props$valueKey = props.valueKey,
    valueKey = _props$valueKey === void 0 ? 'value' : _props$valueKey,
    _props$labelKey = props.labelKey,
    labelKey = _props$labelKey === void 0 ? 'label' : _props$labelKey,
    _props$childrenKey = props.childrenKey,
    childrenKey = _props$childrenKey === void 0 ? 'children' : _props$childrenKey,
    disabled = props.disabled,
    _props$disabledItemVa = props.disabledItemValues,
    disabledItemValues = _props$disabledItemVa === void 0 ? emptyArray : _props$disabledItemVa,
    _props$cleanable = props.cleanable,
    cleanable = _props$cleanable === void 0 ? true : _props$cleanable,
    overrideLocale = props.locale,
    toggleAs = props.toggleAs,
    style = props.style,
    _props$countable = props.countable,
    countable = _props$countable === void 0 ? true : _props$countable,
    _props$cascade = props.cascade,
    cascade = _props$cascade === void 0 ? true : _props$cascade,
    inline = props.inline,
    placeholder = props.placeholder,
    _props$placement = props.placement,
    placement = _props$placement === void 0 ? 'bottomStart' : _props$placement,
    _props$appearance = props.appearance,
    appearance = _props$appearance === void 0 ? 'default' : _props$appearance,
    menuWidth = props.menuWidth,
    menuHeight = props.menuHeight,
    menuClassName = props.menuClassName,
    menuStyle = props.menuStyle,
    _props$searchable = props.searchable,
    searchable = _props$searchable === void 0 ? true : _props$searchable,
    _props$uncheckableIte = props.uncheckableItemValues,
    uncheckableItemValues = _props$uncheckableIte === void 0 ? emptyArray : _props$uncheckableIte,
    id = props.id,
    getChildren = props.getChildren,
    renderValue = props.renderValue,
    renderMenu = props.renderMenu,
    renderMenuItem = props.renderMenuItem,
    renderExtraFooter = props.renderExtraFooter,
    onEnter = props.onEnter,
    onExit = props.onExit,
    onExited = props.onExited,
    onClean = props.onClean,
    onSearch = props.onSearch,
    onSelect = props.onSelect,
    onChange = props.onChange,
    onOpen = props.onOpen,
    onClose = props.onClose,
    onCheck = props.onCheck,
    rest = _objectWithoutPropertiesLoose(props, ["as", "data", "classPrefix", "defaultValue", "value", "valueKey", "labelKey", "childrenKey", "disabled", "disabledItemValues", "cleanable", "locale", "toggleAs", "style", "countable", "cascade", "inline", "placeholder", "placement", "appearance", "menuWidth", "menuHeight", "menuClassName", "menuStyle", "searchable", "uncheckableItemValues", "id", "getChildren", "renderValue", "renderMenu", "renderMenuItem", "renderExtraFooter", "onEnter", "onExit", "onExited", "onClean", "onSearch", "onSelect", "onChange", "onOpen", "onClose", "onCheck"]);
  var itemKeys = {
    childrenKey: childrenKey,
    labelKey: labelKey,
    valueKey: valueKey
  };
  var _useState = useState(false),
    active = _useState[0],
    setActive = _useState[1];
  var _useFlattenData = useFlattenData(data, itemKeys),
    flattenData = _useFlattenData.flattenData,
    addFlattenData = _useFlattenData.addFlattenData;
  var _useControlled = useControlled(valueProp, defaultValue),
    controlledValue = _useControlled[0];
  var _useCascadeValue = useCascadeValue(_extends({}, itemKeys, {
      uncheckableItemValues: uncheckableItemValues,
      cascade: cascade,
      value: controlledValue
    }), flattenData),
    value = _useCascadeValue.value,
    setValue = _useCascadeValue.setValue,
    splitValue = _useCascadeValue.splitValue; // The columns displayed in the cascading panel.
  var _useColumnData = useColumnData(flattenData),
    columnData = _useColumnData.columnData,
    setColumnData = _useColumnData.setColumnData,
    addColumn = _useColumnData.addColumn,
    removeColumnByIndex = _useColumnData.removeColumnByIndex,
    enforceUpdateColumnData = _useColumnData.enforceUpdateColumnData;
  useUpdateEffect(function () {
    enforceUpdateColumnData(data);
  }, [data]);

  // The path after cascading data selection.
  var _useState2 = useState(),
    selectedPaths = _useState2[0],
    setSelectedPaths = _useState2[1];
  var _usePickerRef = usePickerRef(ref),
    trigger = _usePickerRef.trigger,
    root = _usePickerRef.root,
    target = _usePickerRef.target,
    overlay = _usePickerRef.overlay,
    searchInput = _usePickerRef.searchInput;
  var _useCustom = useCustom('Picker', overrideLocale),
    locale = _useCustom.locale,
    rtl = _useCustom.rtl;
  var selectedItems = flattenData.filter(function (item) {
    return value.some(function (v) {
      return v === item[valueKey];
    });
  }) || [];

  // Used to hover the focuse item  when trigger `onKeydown`
  var _useFocusItemValue = useFocusItemValue(selectedPaths === null || selectedPaths === void 0 ? void 0 : (_selectedPaths = selectedPaths[selectedPaths.length - 1]) === null || _selectedPaths === void 0 ? void 0 : _selectedPaths[valueKey], {
      rtl: rtl,
      data: flattenData,
      valueKey: valueKey,
      defaultLayer: selectedPaths !== null && selectedPaths !== void 0 && selectedPaths.length ? selectedPaths.length - 1 : 0,
      target: function target() {
        return overlay.current;
      },
      callback: useCallback(function (value) {
        var _getColumnsAndPaths = getColumnsAndPaths(data, flattenData.find(function (item) {
            return item[valueKey] === value;
          }), {
            getParent: function getParent() {
              return undefined;
            },
            getChildren: function getChildren(item) {
              return item[childrenKey];
            }
          }),
          columns = _getColumnsAndPaths.columns,
          path = _getColumnsAndPaths.path;
        setColumnData(columns);
        setSelectedPaths(path);
      }, [childrenKey, data, flattenData, setColumnData, valueKey])
    }),
    focusItemValue = _useFocusItemValue.focusItemValue,
    setLayer = _useFocusItemValue.setLayer,
    setKeys = _useFocusItemValue.setKeys,
    onFocusItem = _useFocusItemValue.onKeyDown;
  /**
   * 1.Have a value and the value is valid.
   * 2.Regardless of whether the value is valid, as long as renderValue is set, it is judged to have a value.
   */
  var hasValue = selectedItems.length > 0 || Number(valueProp === null || valueProp === void 0 ? void 0 : valueProp.length) > 0 && isFunction(renderValue);
  var _useClassNames = useClassNames(classPrefix),
    prefix = _useClassNames.prefix,
    merge = _useClassNames.merge;
  var _useState3 = useState(''),
    searchKeyword = _useState3[0],
    setSearchKeyword = _useState3[1];
  var handleEntered = useEventCallback(function () {
    onOpen === null || onOpen === void 0 ? void 0 : onOpen();
    setActive(true);
  });
  var handleExited = useEventCallback(function () {
    setActive(false);
    setSearchKeyword('');
  });
  var handleSelect = useEventCallback(function (node, cascadePaths, event) {
    var _node$childrenKey, _node$childrenKey2, _trigger$current, _trigger$current$upda;
    setSelectedPaths(cascadePaths);
    onSelect === null || onSelect === void 0 ? void 0 : onSelect(node, cascadePaths, event);
    var columnIndex = cascadePaths.length;

    // Lazy load node's children
    if (typeof getChildren === 'function' && ((_node$childrenKey = node[childrenKey]) === null || _node$childrenKey === void 0 ? void 0 : _node$childrenKey.length) === 0) {
      node.loading = true;
      var children = getChildren(node);
      if (children instanceof Promise) {
        children.then(function (data) {
          node.loading = false;
          node[childrenKey] = data;
          if (target.current || inline) {
            addFlattenData(data, node);
            addColumn(data, columnIndex);
          }
        });
      } else {
        node.loading = false;
        node[childrenKey] = children;
        addFlattenData(children, node);
        addColumn(children, columnIndex);
      }
    } else if ((_node$childrenKey2 = node[childrenKey]) !== null && _node$childrenKey2 !== void 0 && _node$childrenKey2.length) {
      addColumn(node[childrenKey], columnIndex);
    } else {
      // Removes subsequent columns of the current column when the clicked node is a leaf node.
      removeColumnByIndex(columnIndex);
    }
    (_trigger$current = trigger.current) === null || _trigger$current === void 0 ? void 0 : (_trigger$current$upda = _trigger$current.updatePosition) === null || _trigger$current$upda === void 0 ? void 0 : _trigger$current$upda.call(_trigger$current);
  });
  var handleCheck = useEventCallback(function (node, event, checked) {
    var nodeValue = node[valueKey];
    var nextValue = [];
    if (cascade) {
      nextValue = splitValue(node, checked, value).value;
    } else {
      nextValue = [].concat(value);
      if (checked) {
        nextValue.push(nodeValue);
      } else {
        nextValue = nextValue.filter(function (n) {
          return n !== nodeValue;
        });
      }
    }
    setValue(nextValue);
    onChange === null || onChange === void 0 ? void 0 : onChange(nextValue, event);
    onCheck === null || onCheck === void 0 ? void 0 : onCheck(nextValue, node, checked, event);
  });
  var handleClean = useEventCallback(function (event) {
    if (disabled || !target.current) {
      return;
    }
    setSelectedPaths([]);
    setValue([]);
    setColumnData([data]);
    onChange === null || onChange === void 0 ? void 0 : onChange([], event);
  });
  var handleMenuPressEnter = useEventCallback(function (event) {
    var _overlay$current;
    var focusItem = findNodeOfTree(data, function (item) {
      return item[valueKey] === focusItemValue;
    });
    var checkbox = (_overlay$current = overlay.current) === null || _overlay$current === void 0 ? void 0 : _overlay$current.querySelector("[data-key=\"" + focusItemValue + "\"] [type=\"checkbox\"]");
    if (checkbox) {
      handleCheck(focusItem, event, (checkbox === null || checkbox === void 0 ? void 0 : checkbox.getAttribute('aria-checked')) !== 'true');
    }
  });
  var onPickerKeyDown = useToggleKeyDownEvent(_extends({
    toggle: !focusItemValue || !active,
    trigger: trigger,
    target: target,
    overlay: overlay,
    searchInput: searchInput,
    active: active,
    onExit: handleClean,
    onMenuKeyDown: onFocusItem,
    onMenuPressEnter: handleMenuPressEnter
  }, rest));
  var handleSearch = useEventCallback(function (value, event) {
    setSearchKeyword(value);
    onSearch === null || onSearch === void 0 ? void 0 : onSearch(value, event);
    if (value) {
      setLayer(0);
    } else if (selectedPaths !== null && selectedPaths !== void 0 && selectedPaths.length) {
      setLayer(selectedPaths.length - 1);
    }
    setKeys([]);
  });
  var getSearchResult = function getSearchResult() {
    var items = [];
    var result = flattenData.filter(function (item) {
      if (uncheckableItemValues.some(function (value) {
        return item[valueKey] === value;
      })) {
        return false;
      }
      if (item[labelKey].match(new RegExp(getSafeRegExpString(searchKeyword), 'i'))) {
        return true;
      }
      return false;
    });
    for (var i = 0; i < result.length; i++) {
      items.push(result[i]);

      // A maximum of 100 search results are returned.
      if (i === 99) {
        return items;
      }
    }
    return items;
  };
  var renderSearchRow = function renderSearchRow(item, key) {
    var _extends2;
    var nodes = getNodeParents(item);
    var regx = new RegExp(getSafeRegExpString(searchKeyword), 'ig');
    var labelElements = [];
    var a = item[labelKey].split(regx);
    var b = item[labelKey].match(regx);
    for (var i = 0; i < a.length; i++) {
      labelElements.push(a[i]);
      if (b[i]) {
        labelElements.push( /*#__PURE__*/React.createElement("span", {
          key: i,
          className: prefix('cascader-search-match')
        }, b[i]));
      }
    }
    nodes.push(_extends({}, item, (_extends2 = {}, _extends2[labelKey] = labelElements, _extends2)));
    var active = value.some(function (value) {
      if (cascade) {
        return nodes.some(function (node) {
          return node[valueKey] === value;
        });
      }
      return item[valueKey] === value;
    });
    var disabled = disabledItemValues.some(function (value) {
      return nodes.some(function (node) {
        return node[valueKey] === value;
      });
    });
    var itemClasses = prefix('cascader-row', {
      'cascader-row-disabled': disabled,
      'cascader-row-focus': item[valueKey] === focusItemValue
    });
    return /*#__PURE__*/React.createElement("div", {
      role: "treeitem",
      "aria-disabled": disabled,
      key: key,
      className: itemClasses,
      "data-key": item[valueKey]
    }, /*#__PURE__*/React.createElement(Checkbox, {
      disabled: disabled,
      checked: active,
      value: item[valueKey],
      indeterminate: cascade && !active && isSomeChildChecked(item, value, {
        valueKey: valueKey,
        childrenKey: childrenKey
      }),
      onChange: function onChange(_value, checked, event) {
        handleCheck(item, event, checked);
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: prefix('cascader-cols')
    }, nodes.map(function (node, index) {
      return /*#__PURE__*/React.createElement("span", {
        key: "col-" + index,
        className: prefix('cascader-col')
      }, node[labelKey]);
    }))));
  };
  var renderSearchResultPanel = function renderSearchResultPanel() {
    if (searchKeyword === '') {
      return null;
    }
    var items = getSearchResult();
    return /*#__PURE__*/React.createElement("div", {
      className: prefix('cascader-search-panel'),
      "data-layer": 0,
      role: "tree"
    }, items.length ? items.map(renderSearchRow) : /*#__PURE__*/React.createElement("div", {
      className: prefix('none')
    }, locale.noResultsText));
  };
  var renderTreeView = function renderTreeView(positionProps, speakerRef) {
    var _ref = positionProps || {},
      left = _ref.left,
      top = _ref.top,
      className = _ref.className;
    var styles = _extends({}, menuStyle, {
      left: left,
      top: top
    });
    var classes = merge(className, menuClassName, prefix('cascader-menu', 'multi-cascader-menu', {
      inline: inline
    }));
    return /*#__PURE__*/React.createElement(PickerPopup, {
      ref: mergeRefs(overlay, speakerRef),
      className: classes,
      style: styles,
      target: trigger,
      onKeyDown: onPickerKeyDown
    }, searchable && /*#__PURE__*/React.createElement(SearchBox, {
      placeholder: locale === null || locale === void 0 ? void 0 : locale.searchPlaceholder,
      onChange: handleSearch,
      value: searchKeyword,
      inputRef: searchInput
    }), renderSearchResultPanel(), searchKeyword === '' && /*#__PURE__*/React.createElement(TreeView, {
      cascade: cascade,
      menuWidth: menuWidth,
      menuHeight: menuHeight,
      uncheckableItemValues: uncheckableItemValues,
      disabledItemValues: disabledItemValues,
      valueKey: valueKey,
      labelKey: labelKey,
      childrenKey: childrenKey,
      classPrefix: 'picker-cascader-menu',
      cascadeData: columnData,
      cascadePaths: selectedPaths,
      value: value,
      onSelect: handleSelect,
      onCheck: handleCheck,
      renderMenu: renderMenu,
      renderMenuItem: renderMenuItem
    }), renderExtraFooter === null || renderExtraFooter === void 0 ? void 0 : renderExtraFooter());
  };
  var selectedElement = placeholder;
  if (selectedItems.length > 0) {
    selectedElement = /*#__PURE__*/React.createElement(SelectedElement, {
      selectedItems: selectedItems,
      countable: countable,
      valueKey: valueKey,
      labelKey: labelKey,
      childrenKey: childrenKey,
      prefix: prefix,
      cascade: cascade,
      locale: locale
    });
  }
  if (hasValue && isFunction(renderValue)) {
    selectedElement = renderValue(value.length ? value : valueProp !== null && valueProp !== void 0 ? valueProp : [], selectedItems, selectedElement);
    // If renderValue returns null or undefined, hasValue is false.
    if (isNil(selectedElement)) {
      hasValue = false;
    }
  }
  var _usePickerClassName = usePickerClassName(_extends({}, props, {
      classPrefix: classPrefix,
      hasValue: hasValue,
      countable: countable,
      name: 'cascader',
      appearance: appearance,
      cleanable: cleanable
    })),
    classes = _usePickerClassName[0],
    usedClassNamePropKeys = _usePickerClassName[1];
  if (inline) {
    return renderTreeView();
  }
  return /*#__PURE__*/React.createElement(PickerToggleTrigger, {
    id: id,
    popupType: "tree",
    multiple: true,
    pickerProps: pick(props, pickTriggerPropKeys),
    ref: trigger,
    placement: placement,
    onEnter: createChainedFunction(handleEntered, onEnter),
    onExited: createChainedFunction(handleExited, onExited),
    onExit: createChainedFunction(onClose, onExit),
    speaker: renderTreeView
  }, /*#__PURE__*/React.createElement(Component, {
    className: classes,
    style: style,
    ref: root
  }, /*#__PURE__*/React.createElement(PickerToggle, _extends({}, omit(rest, [].concat(omitTriggerPropKeys, usedClassNamePropKeys)), {
    as: toggleAs,
    appearance: appearance,
    disabled: disabled,
    ref: target,
    onClean: createChainedFunction(handleClean, onClean),
    onKeyDown: onPickerKeyDown,
    cleanable: cleanable && !disabled,
    hasValue: hasValue,
    active: active,
    placement: placement,
    inputValue: value
  }), selectedElement || locale.placeholder)));
});
MultiCascader.displayName = 'MultiCascader';
MultiCascader.propTypes = _extends({}, listPickerPropTypes, {
  value: PropTypes.array,
  disabledItemValues: PropTypes.array,
  locale: PropTypes.any,
  appearance: oneOf(['default', 'subtle']),
  cascade: PropTypes.bool,
  inline: PropTypes.bool,
  countable: PropTypes.bool,
  menuWidth: PropTypes.number,
  menuHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  uncheckableItemValues: PropTypes.array,
  searchable: PropTypes.bool,
  renderMenuItem: PropTypes.func,
  renderMenu: PropTypes.func,
  onSearch: PropTypes.func,
  onSelect: PropTypes.func,
  onCheck: PropTypes.func
});
export default MultiCascader;