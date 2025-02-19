'use client';
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _get = _interopRequireDefault(require("lodash/get"));
var _Collapse = _interopRequireDefault(require("../Animation/Collapse"));
var _utils = require("../utils");
var _PanelGroup = require("../PanelGroup");
var _AccordionButton = _interopRequireDefault(require("./AccordionButton"));
/**
 * The `Panel` component is used to display content that can be collapsed.
 * @see https://rsuitejs.com/components/panel
 */
var Panel = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    bodyFill = props.bodyFill,
    bordered = props.bordered,
    children = props.children,
    className = props.className,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'panel' : _props$classPrefix,
    caretAs = props.caretAs,
    collapsibleProp = props.collapsible,
    defaultExpanded = props.defaultExpanded,
    disabled = props.disabled,
    eventKey = props.eventKey,
    expandedProp = props.expanded,
    header = props.header,
    headerRole = props.headerRole,
    _props$panelRole = props.panelRole,
    panelRole = _props$panelRole === void 0 ? 'region' : _props$panelRole,
    shaded = props.shaded,
    idProp = props.id,
    onEnter = props.onEnter,
    onEntered = props.onEntered,
    onEntering = props.onEntering,
    onExit = props.onExit,
    onExited = props.onExited,
    onExiting = props.onExiting,
    onSelect = props.onSelect,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, ["as", "bodyFill", "bordered", "children", "className", "classPrefix", "caretAs", "collapsible", "defaultExpanded", "disabled", "eventKey", "expanded", "header", "headerRole", "panelRole", "shaded", "id", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "onSelect"]);
  var id = (0, _utils.useUniqueId)('rs-', idProp);
  var panelId = id + "-panel";
  var btnId = id + "-btn";
  var _useClassNames = (0, _utils.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix,
    withClassPrefix = _useClassNames.withClassPrefix;
  var _ref = (0, _react.useContext)(_PanelGroup.PanelGroupContext) || {},
    accordion = _ref.accordion,
    activeKey = _ref.activeKey,
    onGroupSelect = _ref.onGroupSelect;
  var _useControlled = (0, _utils.useControlled)(expandedProp, defaultExpanded || typeof activeKey !== 'undefined' && activeKey === eventKey),
    expandedState = _useControlled[0],
    setExpanded = _useControlled[1];
  var collapsible = collapsibleProp;
  var expanded = expandedState;
  if (accordion) {
    collapsible = true;
  }
  if (collapsible) {
    if (typeof activeKey !== 'undefined' && activeKey !== eventKey) {
      expanded = false;
    }
  }
  (0, _react.useEffect)(function () {
    if (accordion && typeof activeKey !== 'undefined') {
      setExpanded(activeKey === eventKey);
    }
  }, [accordion, activeKey, eventKey, setExpanded]);
  var handleSelect = (0, _utils.useEventCallback)(function (event) {
    onSelect === null || onSelect === void 0 ? void 0 : onSelect(eventKey, event);
    onGroupSelect === null || onGroupSelect === void 0 ? void 0 : onGroupSelect(eventKey, event);
    setExpanded(!expanded);
  });
  var renderBody = (0, _utils.useEventCallback)(function (bodyProps) {
    var classes = prefix('body', {
      'body-fill': bodyFill
    });
    return /*#__PURE__*/_react.default.createElement("div", (0, _extends2.default)({}, bodyProps, {
      className: classes
    }), children);
  });
  var renderCollapsibleBody = function renderCollapsibleBody() {
    return /*#__PURE__*/_react.default.createElement(_Collapse.default, {
      in: expanded,
      onEnter: onEnter,
      onEntering: onEntering,
      onEntered: onEntered,
      onExit: onExit,
      onExiting: onExiting,
      onExited: onExited
    }, function (transitionProps, ref) {
      var className = transitionProps.className,
        rest = (0, _objectWithoutPropertiesLoose2.default)(transitionProps, ["className"]);
      return /*#__PURE__*/_react.default.createElement("div", (0, _extends2.default)({}, rest, {
        className: merge(className, prefix('collapse')),
        ref: ref
      }), renderBody({
        role: panelRole,
        id: panelId,
        'aria-labelledby': btnId
      }));
    });
  };
  var renderHeading = function renderHeading() {
    if (!header) {
      return null;
    }
    var headerElement;
    if (! /*#__PURE__*/_react.default.isValidElement(header) || Array.isArray(header)) {
      headerElement = /*#__PURE__*/_react.default.createElement("span", {
        className: prefix('title')
      }, header);
    } else {
      var _className = merge(prefix('title'), (0, _get.default)(header, 'props.className'));
      headerElement = /*#__PURE__*/_react.default.cloneElement(header, {
        className: _className
      });
    }
    return /*#__PURE__*/_react.default.createElement("h2", {
      className: prefix('header')
    }, collapsible ? /*#__PURE__*/_react.default.createElement(_AccordionButton.default, {
      id: btnId,
      role: headerRole,
      caretAs: caretAs,
      controlId: panelId,
      disabled: disabled,
      expanded: expanded,
      onClick: handleSelect
    }, headerElement) : headerElement);
  };
  var classes = merge(className, withClassPrefix({
    in: expanded,
    collapsible: collapsible,
    bordered: bordered,
    shaded: shaded
  }));
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({}, rest, {
    ref: ref,
    className: classes,
    id: idProp
  }), renderHeading(), collapsible ? renderCollapsibleBody() : renderBody());
});
Panel.displayName = 'Panel';
Panel.propTypes = {
  collapsible: _propTypes.default.bool,
  bordered: _propTypes.default.bool,
  shaded: _propTypes.default.bool,
  bodyFill: _propTypes.default.bool,
  header: _propTypes.default.any,
  defaultExpanded: _propTypes.default.bool,
  expanded: _propTypes.default.bool,
  eventKey: _propTypes.default.any,
  panelRole: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  children: _propTypes.default.node,
  onSelect: _propTypes.default.func,
  onEnter: _propTypes.default.func,
  onEntering: _propTypes.default.func,
  onEntered: _propTypes.default.func,
  onExit: _propTypes.default.func,
  onExiting: _propTypes.default.func,
  onExited: _propTypes.default.func,
  className: _propTypes.default.string
};
var _default = Panel;
exports.default = _default;