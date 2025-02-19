'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Collapse from '../Animation/Collapse';
import { useClassNames, useControlled, useUniqueId, useEventCallback } from '../utils';
import { PanelGroupContext } from '../PanelGroup';
import AccordionButton from './AccordionButton';
/**
 * The `Panel` component is used to display content that can be collapsed.
 * @see https://rsuitejs.com/components/panel
 */
var Panel = /*#__PURE__*/React.forwardRef(function (props, ref) {
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
    rest = _objectWithoutPropertiesLoose(props, ["as", "bodyFill", "bordered", "children", "className", "classPrefix", "caretAs", "collapsible", "defaultExpanded", "disabled", "eventKey", "expanded", "header", "headerRole", "panelRole", "shaded", "id", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "onSelect"]);
  var id = useUniqueId('rs-', idProp);
  var panelId = id + "-panel";
  var btnId = id + "-btn";
  var _useClassNames = useClassNames(classPrefix),
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix,
    withClassPrefix = _useClassNames.withClassPrefix;
  var _ref = useContext(PanelGroupContext) || {},
    accordion = _ref.accordion,
    activeKey = _ref.activeKey,
    onGroupSelect = _ref.onGroupSelect;
  var _useControlled = useControlled(expandedProp, defaultExpanded || typeof activeKey !== 'undefined' && activeKey === eventKey),
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
  useEffect(function () {
    if (accordion && typeof activeKey !== 'undefined') {
      setExpanded(activeKey === eventKey);
    }
  }, [accordion, activeKey, eventKey, setExpanded]);
  var handleSelect = useEventCallback(function (event) {
    onSelect === null || onSelect === void 0 ? void 0 : onSelect(eventKey, event);
    onGroupSelect === null || onGroupSelect === void 0 ? void 0 : onGroupSelect(eventKey, event);
    setExpanded(!expanded);
  });
  var renderBody = useEventCallback(function (bodyProps) {
    var classes = prefix('body', {
      'body-fill': bodyFill
    });
    return /*#__PURE__*/React.createElement("div", _extends({}, bodyProps, {
      className: classes
    }), children);
  });
  var renderCollapsibleBody = function renderCollapsibleBody() {
    return /*#__PURE__*/React.createElement(Collapse, {
      in: expanded,
      onEnter: onEnter,
      onEntering: onEntering,
      onEntered: onEntered,
      onExit: onExit,
      onExiting: onExiting,
      onExited: onExited
    }, function (transitionProps, ref) {
      var className = transitionProps.className,
        rest = _objectWithoutPropertiesLoose(transitionProps, ["className"]);
      return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
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
    if (! /*#__PURE__*/React.isValidElement(header) || Array.isArray(header)) {
      headerElement = /*#__PURE__*/React.createElement("span", {
        className: prefix('title')
      }, header);
    } else {
      var _className = merge(prefix('title'), get(header, 'props.className'));
      headerElement = /*#__PURE__*/React.cloneElement(header, {
        className: _className
      });
    }
    return /*#__PURE__*/React.createElement("h2", {
      className: prefix('header')
    }, collapsible ? /*#__PURE__*/React.createElement(AccordionButton, {
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
  return /*#__PURE__*/React.createElement(Component, _extends({}, rest, {
    ref: ref,
    className: classes,
    id: idProp
  }), renderHeading(), collapsible ? renderCollapsibleBody() : renderBody());
});
Panel.displayName = 'Panel';
Panel.propTypes = {
  collapsible: PropTypes.bool,
  bordered: PropTypes.bool,
  shaded: PropTypes.bool,
  bodyFill: PropTypes.bool,
  header: PropTypes.any,
  defaultExpanded: PropTypes.bool,
  expanded: PropTypes.bool,
  eventKey: PropTypes.any,
  panelRole: PropTypes.string,
  classPrefix: PropTypes.string,
  children: PropTypes.node,
  onSelect: PropTypes.func,
  onEnter: PropTypes.func,
  onEntering: PropTypes.func,
  onEntered: PropTypes.func,
  onExit: PropTypes.func,
  onExiting: PropTypes.func,
  onExited: PropTypes.func,
  className: PropTypes.string
};
export default Panel;