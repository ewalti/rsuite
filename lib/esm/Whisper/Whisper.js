'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import OverlayTrigger from '../internals/Overlay/OverlayTrigger';
import { createChainedFunction, placementPolyfill, PLACEMENT } from '../utils';
import { oneOf } from '../internals/propTypes';
import { CustomContext } from '../CustomProvider';
/**
 * The `Whisper` component is used to display a floating element.
 * It is usually used with the `Tooltip` and `Popover` components.
 *
 * @see https://rsuitejs.com/components/whisper
 */
var Whisper = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var onOpen = props.onOpen,
    onClose = props.onClose,
    onEntered = props.onEntered,
    onExited = props.onExited,
    _props$placement = props.placement,
    placement = _props$placement === void 0 ? 'right' : _props$placement,
    preventOverflow = props.preventOverflow,
    rest = _objectWithoutPropertiesLoose(props, ["onOpen", "onClose", "onEntered", "onExited", "placement", "preventOverflow"]);
  var context = useContext(CustomContext);
  return /*#__PURE__*/React.createElement(OverlayTrigger, _extends({}, rest, {
    ref: ref,
    preventOverflow: preventOverflow,
    placement: placementPolyfill(placement, context === null || context === void 0 ? void 0 : context.rtl),
    onEntered: createChainedFunction(onOpen, onEntered),
    onExited: createChainedFunction(onClose, onExited)
  }));
});
Whisper.displayName = 'Whisper';
Whisper.propTypes = {
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  onEntered: PropTypes.func,
  onExited: PropTypes.func,
  placement: oneOf(PLACEMENT),
  /**
   * Prevent floating element overflow
   */
  preventOverflow: PropTypes.bool,
  /**
   * Whether enable speaker follow cursor
   */
  followCursor: PropTypes.bool
};
export default Whisper;