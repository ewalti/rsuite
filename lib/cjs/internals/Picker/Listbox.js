'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _isUndefined = _interopRequireDefault(require("lodash/isUndefined"));
var _isString = _interopRequireDefault(require("lodash/isString"));
var _isNumber = _interopRequireDefault(require("lodash/isNumber"));
var _findIndex = _interopRequireDefault(require("lodash/findIndex"));
var _pickBy = _interopRequireDefault(require("lodash/pickBy"));
var _getPosition = _interopRequireDefault(require("dom-lib/getPosition"));
var _scrollTop = _interopRequireDefault(require("dom-lib/scrollTop"));
var _getHeight = _interopRequireDefault(require("dom-lib/getHeight"));
var _get = _interopRequireDefault(require("lodash/get"));
var _classnames = _interopRequireDefault(require("classnames"));
var _Windowing = require("../../internals/Windowing");
var _shallowEqual = _interopRequireDefault(require("../../utils/shallowEqual"));
var _utils = require("../../utils");
var _ListItemGroup = _interopRequireDefault(require("./ListItemGroup"));
var _getDataGroupBy = require("../../utils/getDataGroupBy");
var _useCombobox2 = _interopRequireDefault(require("./hooks/useCombobox"));
var _this = void 0;
var Listbox = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _props$data = props.data,
    data = _props$data === void 0 ? [] : _props$data,
    group = props.group,
    groupBy = props.groupBy,
    _props$maxHeight = props.maxHeight,
    maxHeight = _props$maxHeight === void 0 ? 320 : _props$maxHeight,
    _props$activeItemValu = props.activeItemValues,
    activeItemValues = _props$activeItemValu === void 0 ? [] : _props$activeItemValu,
    _props$disabledItemVa = props.disabledItemValues,
    disabledItemValues = _props$disabledItemVa === void 0 ? [] : _props$disabledItemVa,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'listbox' : _props$classPrefix,
    _props$valueKey = props.valueKey,
    valueKey = _props$valueKey === void 0 ? 'value' : _props$valueKey,
    _props$labelKey = props.labelKey,
    labelKey = _props$labelKey === void 0 ? 'label' : _props$labelKey,
    virtualized = props.virtualized,
    listProps = props.listProps,
    virtualizedListRef = props.listRef,
    className = props.className,
    style = props.style,
    focusItemValue = props.focusItemValue,
    listItemClassPrefix = props.listItemClassPrefix,
    ListItem = props.listItemAs,
    listItemProps = props.listItemProps,
    _props$rowHeight = props.rowHeight,
    rowHeight = _props$rowHeight === void 0 ? 36 : _props$rowHeight,
    _props$rowGroupHeight = props.rowGroupHeight,
    rowGroupHeight = _props$rowGroupHeight === void 0 ? 48 : _props$rowGroupHeight,
    renderMenuGroup = props.renderMenuGroup,
    renderMenuItem = props.renderMenuItem,
    onGroupTitleClick = props.onGroupTitleClick,
    onSelect = props.onSelect,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, ["data", "group", "groupBy", "maxHeight", "activeItemValues", "disabledItemValues", "classPrefix", "valueKey", "labelKey", "virtualized", "listProps", "listRef", "className", "style", "focusItemValue", "listItemClassPrefix", "listItemAs", "listItemProps", "rowHeight", "rowGroupHeight", "renderMenuGroup", "renderMenuItem", "onGroupTitleClick", "onSelect"]);
  var _useClassNames = (0, _utils.useClassNames)(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    prefix = _useClassNames.prefix,
    merge = _useClassNames.merge;
  var classes = merge(className, withClassPrefix('items', {
    grouped: group
  }));
  var _useCombobox = (0, _useCombobox2.default)(),
    id = _useCombobox.id,
    labelId = _useCombobox.labelId,
    popupType = _useCombobox.popupType,
    multiple = _useCombobox.multiple;
  var menuBodyContainerRef = (0, _react.useRef)(null);
  var listRef = (0, _react.useRef)(null);
  var _useState = (0, _react.useState)([]),
    foldedGroupKeys = _useState[0],
    setFoldedGroupKeys = _useState[1];
  var handleGroupTitleClick = (0, _utils.useEventCallback)(function (key, event) {
    var nextGroupKeys = foldedGroupKeys.filter(function (item) {
      return item !== key;
    });
    if (nextGroupKeys.length === foldedGroupKeys.length) {
      nextGroupKeys.push(key);
    }
    setFoldedGroupKeys(nextGroupKeys);
    onGroupTitleClick === null || onGroupTitleClick === void 0 ? void 0 : onGroupTitleClick(event);
  });
  var handleSelect = (0, _utils.useEventCallback)(function (item, value, event, checked) {
    onSelect === null || onSelect === void 0 ? void 0 : onSelect(value, item, event, checked);
  });
  var getRowHeight = function getRowHeight(list, index) {
    var item = list[index];
    if (group && item[_getDataGroupBy.KEY_GROUP] && index !== 0) {
      return rowGroupHeight;
    }
    return rowHeight;
  };
  (0, _react.useEffect)(function () {
    var container = menuBodyContainerRef.current;
    if (!container) {
      return;
    }
    var activeItem = container.querySelector("." + prefix('item-focus'));
    if (!activeItem) {
      activeItem = container.querySelector("." + prefix('item-active'));
    }
    if (!activeItem) {
      return;
    }
    var position = (0, _getPosition.default)(activeItem, container);
    var sTop = (0, _scrollTop.default)(container);
    var sHeight = (0, _getHeight.default)(container);
    if (sTop > position.top) {
      (0, _scrollTop.default)(container, Math.max(0, position.top - 20));
    } else if (position.top > sTop + sHeight) {
      (0, _scrollTop.default)(container, Math.max(0, position.top - sHeight + 32));
    }
  }, [focusItemValue, menuBodyContainerRef, prefix]);
  var filteredItems = group ? data.filter(function (item) {
    var _item$parent;
    // Display group title items
    if (item[_getDataGroupBy.KEY_GROUP]) return true;

    // Display items under the unfolded group
    // FIXME-Doma
    // `groupBy` is bound to be string when `group` is true
    // because `group` is actually redundant as a prop
    // It could simply be derived from `groupBy` value
    var groupValue = (0, _get.default)(item, groupBy, '') || ( // FIXME-Doma
    // Usage of `item.parent` is strongly discouraged
    // It's only here for legacy support
    // Remove once `item.parent` is completely removed across related components
    (_item$parent = item.parent) === null || _item$parent === void 0 ? void 0 : _item$parent[_getDataGroupBy.KEY_GROUP_TITLE]);
    return !foldedGroupKeys.includes(groupValue);
  }) : data;
  var rowCount = filteredItems.length;
  var renderItem = function renderItem(_ref) {
    var _ref$index = _ref.index,
      index = _ref$index === void 0 ? 0 : _ref$index,
      style = _ref.style,
      data = _ref.data,
      itemData = _ref.item;
    var item = itemData || data[index];
    var value = item[valueKey];
    var label = item[labelKey];
    if ((0, _isUndefined.default)(label) && !item[_getDataGroupBy.KEY_GROUP]) {
      throw Error("labelKey \"" + labelKey + "\" is not defined in \"data\" : " + index);
    }

    // Use `value` in keys when If `value` is string or number
    var itemKey = (0, _isString.default)(value) || (0, _isNumber.default)(value) ? value : index;

    /**
     * Render <ListboxGroup>
     * when if `group` is enabled
     */
    if (group && item[_getDataGroupBy.KEY_GROUP]) {
      var groupValue = item[_getDataGroupBy.KEY_GROUP_TITLE];
      // TODO: grouped options should be owned by group
      return /*#__PURE__*/_react.default.createElement(_ListItemGroup.default, {
        style: style,
        classPrefix: 'picker-menu-group',
        className: (0, _classnames.default)({
          folded: foldedGroupKeys.some(function (key) {
            return key === groupValue;
          })
        }),
        key: "group-" + groupValue,
        onClick: handleGroupTitleClick.bind(null, groupValue)
      }, renderMenuGroup ? renderMenuGroup(groupValue, item) : groupValue);
    } else if ((0, _isUndefined.default)(value) && !(0, _isUndefined.default)(item[_getDataGroupBy.KEY_GROUP])) {
      throw Error("valueKey \"" + valueKey + "\" is not defined in \"data\" : " + index + " ");
    }
    var disabled = disabledItemValues === null || disabledItemValues === void 0 ? void 0 : disabledItemValues.some(function (disabledValue) {
      return (0, _shallowEqual.default)(disabledValue, value);
    });
    var active = activeItemValues === null || activeItemValues === void 0 ? void 0 : activeItemValues.some(function (v) {
      return (0, _shallowEqual.default)(v, value);
    });
    var focus = !(0, _isUndefined.default)(focusItemValue) && (0, _shallowEqual.default)(focusItemValue, value);
    return /*#__PURE__*/_react.default.createElement(ListItem, (0, _extends2.default)({
      "aria-posinset": index + 1,
      "aria-setsize": rowCount,
      style: style,
      key: itemKey,
      disabled: disabled,
      active: active,
      focus: focus,
      value: value,
      classPrefix: listItemClassPrefix,
      onSelect: handleSelect.bind(null, item)
    }, (0, _pickBy.default)(listItemProps, function (v) {
      return v !== undefined;
    })), renderMenuItem ? renderMenuItem(label, item) : label);
  };
  (0, _utils.useMount)(function () {
    var _listRef$current, _listRef$current$scro;
    var itemIndex = (0, _findIndex.default)(filteredItems, function (item) {
      return item[valueKey] === (activeItemValues === null || activeItemValues === void 0 ? void 0 : activeItemValues[0]);
    });
    (_listRef$current = listRef.current) === null || _listRef$current === void 0 ? void 0 : (_listRef$current$scro = _listRef$current.scrollToItem) === null || _listRef$current$scro === void 0 ? void 0 : _listRef$current$scro.call(_listRef$current, itemIndex);
  });
  return /*#__PURE__*/_react.default.createElement("div", (0, _extends2.default)({
    role: "listbox",
    id: id + "-" + popupType,
    "aria-labelledby": labelId,
    "aria-multiselectable": multiple
  }, rest, {
    className: classes,
    ref: (0, _utils.mergeRefs)(menuBodyContainerRef, ref),
    style: (0, _extends2.default)({}, style, {
      maxHeight: maxHeight
    })
  }), virtualized ? /*#__PURE__*/_react.default.createElement(_Windowing.AutoSizer, {
    defaultHeight: maxHeight,
    style: {
      width: 'auto',
      height: 'auto'
    }
  }, function (_ref2) {
    var height = _ref2.height;
    return /*#__PURE__*/_react.default.createElement(_Windowing.List, (0, _extends2.default)({
      as: _Windowing.VariableSizeList,
      ref: (0, _utils.mergeRefs)(listRef, virtualizedListRef),
      height: height || maxHeight,
      itemCount: rowCount,
      itemData: filteredItems,
      itemSize: getRowHeight.bind(_this, filteredItems)
    }, listProps), renderItem);
  }) : filteredItems.map(function (item, index) {
    return renderItem({
      index: index,
      item: item
    });
  }));
});
Listbox.displayName = 'Listbox';
var _default = Listbox;
exports.default = _default;