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
var _omit2 = _interopRequireDefault(require("lodash/omit"));
var _Menu = _interopRequireDefault(require("../internals/Menu/Menu"));
var _MenuItem = _interopRequireDefault(require("../internals/Menu/MenuItem"));
var _Menubar = _interopRequireDefault(require("../internals/Menu/Menubar"));
var _propTypes = require("../internals/propTypes");
var _utils = require("../utils");
var _propTypes2 = _interopRequireDefault(require("prop-types"));
var _AngleLeft = _interopRequireDefault(require("@rsuite/icons/legacy/AngleLeft"));
var _AngleRight = _interopRequireDefault(require("@rsuite/icons/legacy/AngleRight"));
var _useCustom2 = _interopRequireDefault(require("../utils/useCustom"));
var _DropdownContext = _interopRequireDefault(require("./DropdownContext"));
var _Nav = _interopRequireDefault(require("../Nav"));
var _NavContext = _interopRequireDefault(require("../Nav/NavContext"));
var _warnOnce = _interopRequireDefault(require("../utils/warnOnce"));
var _templateObject, _templateObject2;
/**
 * The `<Dropdown.Menu>` API
 *
 * @description
 * Note the difference between this component and `<Menu>` component:
 * `<Menu>` is used for ARIA menu control logic and is used internally only.
 * This component is only used for supporting submenu syntax and is
 * assigned to Dropdown.Menu
 *
 * @example
 *
 * <Dropdown>
 *   <Dropdown.Item>Item 1</Dropdown.Item>
 *   <Dropdown.Menu title="Submenu">
 *     <Dropdown.Item>Sub item</Dropdown.Item>
 *   </Dropdown.Menu>
 * </Dropdown>
 */
var DropdownMenu = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var onToggle = props.onToggle,
    eventKey = props.eventKey,
    title = props.title,
    activeKey = props.activeKey,
    onSelect = props.onSelect,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'dropdown-menu' : _props$classPrefix,
    className = props.className,
    children = props.children,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, ["onToggle", "eventKey", "title", "activeKey", "onSelect", "classPrefix", "className", "children"]);
  var nav = (0, _react.useContext)(_NavContext.default);
  var dropdown = (0, _react.useContext)(_DropdownContext.default);
  var _useCustom = (0, _useCustom2.default)('DropdownMenu'),
    rtl = _useCustom.rtl;
  var handleToggleSubmenu = (0, _react.useCallback)(function (_, event) {
    onToggle === null || onToggle === void 0 ? void 0 : onToggle(eventKey, event);
  }, [eventKey, onToggle]);
  var _useClassNames = (0, _utils.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix,
    withClassPrefix = _useClassNames.withClassPrefix;
  var _useClassNames2 = (0, _utils.useClassNames)('dropdown-menu'),
    withMenuClassPrefix = _useClassNames2.withClassPrefix,
    mergeMenuClassName = _useClassNames2.merge;
  var _useClassNames3 = (0, _utils.useClassNames)('dropdown-item'),
    mergeItemClassNames = _useClassNames3.merge,
    withItemClassPrefix = _useClassNames3.withClassPrefix,
    prefixItemClassName = _useClassNames3.prefix;
  var contextValue = (0, _react.useMemo)(function () {
    return {
      activeKey: activeKey,
      onSelect: onSelect
    };
  }, [activeKey, onSelect]);

  // If rendered within a <Nav>
  // Suggest <Nav.Menu>
  if (nav) {
    (0, _warnOnce.default)('Usage of <Dropdown.Menu> within <Nav> is deprecated. Replace with <Nav.Menu>');
    return /*#__PURE__*/_react.default.createElement(_Nav.default.Menu, (0, _extends2.default)({
      ref: ref
    }, props));
  }

  // <Dropdown.Menu> is used outside of <Dropdown>
  // renders a vertical `menubar`
  if (!dropdown) {
    var classes = merge(className, withClassPrefix());
    return /*#__PURE__*/_react.default.createElement(_DropdownContext.default.Provider, {
      value: contextValue
    }, /*#__PURE__*/_react.default.createElement(_Menubar.default, {
      vertical: true
    }, function (menubar, menubarRef) {
      return /*#__PURE__*/_react.default.createElement("ul", (0, _extends2.default)({
        ref: (0, _utils.mergeRefs)(menubarRef, ref),
        className: classes
      }, menubar, rest), children);
    }));
  }

  // Parent menu exists. This is a submenu.
  // Should render a `menuitem` that controls this submenu.
  var _omit = (0, _omit2.default)(rest, ['trigger']),
    icon = _omit.icon,
    disabled = _omit.disabled,
    menuProps = (0, _objectWithoutPropertiesLoose2.default)(_omit, ["icon", "disabled"]);
  var Icon = rtl ? _AngleLeft.default : _AngleRight.default;
  return /*#__PURE__*/_react.default.createElement(_Menu.default, {
    openMenuOn: ['mouseover', 'click'],
    renderMenuButton: function renderMenuButton(_ref, buttonRef) {
      var open = _ref.open,
        menuButtonProps = (0, _objectWithoutPropertiesLoose2.default)(_ref, ["open"]);
      return /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
        disabled: disabled
      }, function (_ref2, menuitemRef) {
        var selected = _ref2.selected,
          active = _ref2.active,
          menuitem = (0, _objectWithoutPropertiesLoose2.default)(_ref2, ["selected", "active"]);
        var classes = mergeItemClassNames(className, prefixItemClassName(_templateObject || (_templateObject = (0, _taggedTemplateLiteralLoose2.default)(["toggle"]))), withItemClassPrefix({
          'with-icon': icon,
          open: open,
          active: selected,
          disabled: disabled,
          focus: active
        }));
        return /*#__PURE__*/_react.default.createElement("div", (0, _extends2.default)({
          ref: (0, _utils.mergeRefs)(buttonRef, menuitemRef),
          className: classes,
          "data-event-key": eventKey,
          "data-event-key-type": typeof eventKey
        }, menuitem, (0, _omit2.default)(menuButtonProps, ['role'])), icon && /*#__PURE__*/_react.default.cloneElement(icon, {
          className: prefix('menu-icon')
        }), title, /*#__PURE__*/_react.default.createElement(Icon, {
          className: prefix(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteralLoose2.default)(["toggle-icon"])))
        }));
      });
    },
    renderMenuPopup: function renderMenuPopup(_ref3, popupRef) {
      var open = _ref3.open,
        popupProps = (0, _objectWithoutPropertiesLoose2.default)(_ref3, ["open"]);
      var menuClassName = mergeMenuClassName(className, withMenuClassPrefix());
      return /*#__PURE__*/_react.default.createElement("ul", (0, _extends2.default)({
        ref: popupRef,
        className: menuClassName,
        hidden: !open
      }, popupProps, menuProps), children);
    },
    onToggleMenu: handleToggleSubmenu
  }, function (_ref4, menuContainerRef) {
    var open = _ref4.open,
      menuContainer = (0, _objectWithoutPropertiesLoose2.default)(_ref4, ["open"]);
    var classes = mergeItemClassNames(className, withItemClassPrefix({
      disabled: disabled,
      open: open,
      submenu: true
    }));
    return /*#__PURE__*/_react.default.createElement("li", (0, _extends2.default)({
      ref: (0, _utils.mergeRefs)(ref, menuContainerRef),
      className: classes
    }, menuContainer));
  });
});
DropdownMenu.displayName = 'Dropdown.Menu';
DropdownMenu.propTypes = {
  active: _propTypes2.default.bool,
  activeKey: _propTypes2.default.any,
  className: _propTypes2.default.string,
  children: _propTypes2.default.node,
  icon: _propTypes2.default.any,
  classPrefix: _propTypes2.default.string,
  pullLeft: _propTypes2.default.bool,
  title: _propTypes2.default.node,
  open: _propTypes2.default.bool,
  trigger: (0, _propTypes.oneOf)(['click', 'hover']),
  eventKey: _propTypes2.default.any,
  expanded: _propTypes2.default.bool,
  collapsible: _propTypes2.default.bool,
  onSelect: _propTypes2.default.func,
  onToggle: _propTypes2.default.func
};
var _default = DropdownMenu;
exports.default = _default;