'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _taggedTemplateLiteralLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteralLoose"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _pick = _interopRequireDefault(require("lodash/pick"));
var _on = _interopRequireDefault(require("dom-lib/on"));
var _getAnimationEnd = _interopRequireDefault(require("dom-lib/getAnimationEnd"));
var _Modal = _interopRequireWildcard(require("../internals/Overlay/Modal"));
var _Bounce = _interopRequireDefault(require("../Animation/Bounce"));
var _utils = require("../utils");
var _ModalDialog = _interopRequireWildcard(require("./ModalDialog"));
var _ModalContext = require("./ModalContext");
var _ModalBody = _interopRequireDefault(require("./ModalBody"));
var _ModalHeader = _interopRequireDefault(require("./ModalHeader"));
var _ModalTitle = _interopRequireDefault(require("./ModalTitle"));
var _ModalFooter = _interopRequireDefault(require("./ModalFooter"));
var _utils2 = require("./utils");
var _useUniqueId = _interopRequireDefault(require("../utils/useUniqueId"));
var _propTypes2 = require("../internals/propTypes");
var _DrawerContext = _interopRequireDefault(require("../Drawer/DrawerContext"));
var _templateObject, _templateObject2;
var modalSizes = ['xs', 'sm', 'md', 'lg', 'full'];
/**
 * The `Modal` component is used to show content in a layer above the app.
 * @see https://rsuitejs.com/components/modal
 */
var Modal = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _prefix;
  var className = props.className,
    children = props.children,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'modal' : _props$classPrefix,
    dialogClassName = props.dialogClassName,
    backdropClassName = props.backdropClassName,
    _props$backdrop = props.backdrop,
    backdrop = _props$backdrop === void 0 ? true : _props$backdrop,
    dialogStyle = props.dialogStyle,
    _props$animation = props.animation,
    animation = _props$animation === void 0 ? _Bounce.default : _props$animation,
    open = props.open,
    _props$size = props.size,
    size = _props$size === void 0 ? 'sm' : _props$size,
    full = props.full,
    _props$dialogAs = props.dialogAs,
    Dialog = _props$dialogAs === void 0 ? _ModalDialog.default : _props$dialogAs,
    animationProps = props.animationProps,
    _props$animationTimeo = props.animationTimeout,
    animationTimeout = _props$animationTimeo === void 0 ? 300 : _props$animationTimeo,
    _props$overflow = props.overflow,
    overflow = _props$overflow === void 0 ? true : _props$overflow,
    onClose = props.onClose,
    onEntered = props.onEntered,
    onEntering = props.onEntering,
    onExited = props.onExited,
    _props$role = props.role,
    role = _props$role === void 0 ? 'dialog' : _props$role,
    idProp = props.id,
    ariaLabelledby = props['aria-labelledby'],
    ariaDescribedby = props['aria-describedby'],
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, ["className", "children", "classPrefix", "dialogClassName", "backdropClassName", "backdrop", "dialogStyle", "animation", "open", "size", "full", "dialogAs", "animationProps", "animationTimeout", "overflow", "onClose", "onEntered", "onEntering", "onExited", "role", "id", "aria-labelledby", "aria-describedby"]);
  var inClass = {
    in: open && !animation
  };
  var _useClassNames = (0, _utils.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix;
  var _useState = (0, _react.useState)(false),
    shake = _useState[0],
    setShake = _useState[1];
  var classes = merge(className, prefix((_prefix = {
    full: full
  }, _prefix[size] = modalSizes.includes(size), _prefix)));
  var dialogRef = (0, _react.useRef)(null);
  var transitionEndListener = (0, _react.useRef)();

  // Render Modal as Drawer
  var _ref = (0, _react.useContext)(_DrawerContext.default) || {},
    _ref$isDrawer = _ref.isDrawer,
    isDrawer = _ref$isDrawer === void 0 ? false : _ref$isDrawer; // The style of the Modal body will be updated with the size of the window or container.
  var _useBodyStyles = (0, _utils2.useBodyStyles)(dialogRef, {
      overflow: overflow,
      drawer: isDrawer,
      prefix: prefix,
      size: size
    }),
    bodyStyles = _useBodyStyles[0],
    onChangeBodyStyles = _useBodyStyles[1],
    onDestroyEvents = _useBodyStyles[2];
  var dialogId = (0, _useUniqueId.default)('dialog-', idProp);
  var modalContextValue = (0, _react.useMemo)(function () {
    return {
      dialogId: dialogId,
      onModalClose: onClose,
      getBodyStyles: function getBodyStyles() {
        return bodyStyles;
      }
    };
  }, [dialogId, onClose, bodyStyles]);
  var handleExited = (0, _react.useCallback)(function (node) {
    var _transitionEndListene;
    onExited === null || onExited === void 0 ? void 0 : onExited(node);
    onDestroyEvents();
    (_transitionEndListene = transitionEndListener.current) === null || _transitionEndListene === void 0 ? void 0 : _transitionEndListene.off();
    transitionEndListener.current = null;
  }, [onDestroyEvents, onExited]);
  var handleEntered = (0, _react.useCallback)(function (node) {
    onEntered === null || onEntered === void 0 ? void 0 : onEntered(node);
    onChangeBodyStyles();
  }, [onChangeBodyStyles, onEntered]);
  var handleEntering = (0, _react.useCallback)(function (node) {
    onEntering === null || onEntering === void 0 ? void 0 : onEntering(node);
    onChangeBodyStyles(true);
  }, [onChangeBodyStyles, onEntering]);
  var backdropClick = _react.default.useRef();
  var handleMouseDown = (0, _react.useCallback)(function (event) {
    backdropClick.current = event.target === event.currentTarget;
  }, []);
  var handleBackdropClick = (0, _react.useCallback)(function (event) {
    // Ignore click events from non-backdrop.
    // fix: https://github.com/rsuite/rsuite/issues/3394
    if (!backdropClick.current) {
      return;
    }

    // Ignore click events from dialog.
    if (event.target === dialogRef.current) {
      return;
    }

    // Ignore click events from dialog children.
    if (event.target !== event.currentTarget) {
      return;
    }

    // When the value of `backdrop` is `static`, a jitter animation will be added to the dialog when clicked.
    if (backdrop === 'static') {
      setShake(true);
      if (!transitionEndListener.current && dialogRef.current) {
        //fix: https://github.com/rsuite/rsuite/blob/a93d13c14fb20cc58204babe3331d3c3da3fe1fd/src/Modal/styles/index.less#L59
        transitionEndListener.current = (0, _on.default)(dialogRef.current, (0, _getAnimationEnd.default)(), function () {
          setShake(false);
        });
      }
      return;
    }
    onClose === null || onClose === void 0 ? void 0 : onClose(event);
  }, [backdrop, onClose]);
  (0, _utils.useWillUnmount)(function () {
    var _transitionEndListene2;
    (_transitionEndListene2 = transitionEndListener.current) === null || _transitionEndListene2 === void 0 ? void 0 : _transitionEndListene2.off();
  });
  var sizeKey = 'width';
  if (isDrawer) {
    var _ref2 = animationProps || {},
      placement = _ref2.placement; // The width or height of the drawer depends on the placement.
    sizeKey = placement === 'top' || placement === 'bottom' ? 'height' : 'width';
  }
  return /*#__PURE__*/_react.default.createElement(_ModalContext.ModalContext.Provider, {
    value: modalContextValue
  }, /*#__PURE__*/_react.default.createElement(_Modal.default, (0, _extends2.default)({}, rest, {
    ref: ref,
    backdrop: backdrop,
    open: open,
    onClose: onClose,
    className: prefix(_templateObject || (_templateObject = (0, _taggedTemplateLiteralLoose2.default)(["wrapper"]))),
    onEntered: handleEntered,
    onEntering: handleEntering,
    onExited: handleExited,
    backdropClassName: merge(prefix(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteralLoose2.default)(["backdrop"]))), backdropClassName, inClass),
    containerClassName: prefix({
      open: open,
      'has-backdrop': backdrop
    }),
    transition: animation ? animation : undefined,
    animationProps: animationProps,
    dialogTransitionTimeout: animationTimeout,
    backdropTransitionTimeout: 150,
    onClick: backdrop ? handleBackdropClick : undefined,
    onMouseDown: handleMouseDown
  }), function (transitionProps, transitionRef) {
    var _ref3;
    var transitionClassName = transitionProps.className,
      transitionRest = (0, _objectWithoutPropertiesLoose2.default)(transitionProps, ["className"]);
    return /*#__PURE__*/_react.default.createElement(Dialog, (0, _extends2.default)({
      role: role,
      id: dialogId,
      "aria-labelledby": ariaLabelledby !== null && ariaLabelledby !== void 0 ? ariaLabelledby : dialogId + "-title",
      "aria-describedby": ariaDescribedby,
      style: (_ref3 = {}, _ref3[sizeKey] = modalSizes.includes(size) ? undefined : size, _ref3)
    }, transitionRest, (0, _pick.default)(rest, Object.keys(_ModalDialog.modalDialogPropTypes)), {
      ref: (0, _utils.mergeRefs)(dialogRef, transitionRef),
      classPrefix: classPrefix,
      className: merge(classes, transitionClassName, prefix({
        shake: shake
      })),
      dialogClassName: dialogClassName,
      dialogStyle: dialogStyle
    }), children);
  }));
});
Modal.Body = _ModalBody.default;
Modal.Header = _ModalHeader.default;
Modal.Title = _ModalTitle.default;
Modal.Footer = _ModalFooter.default;
Modal.Dialog = _ModalDialog.default;
Modal.displayName = 'Modal';
Modal.propTypes = (0, _extends2.default)({}, _Modal.modalPropTypes, {
  animation: _propTypes.default.any,
  animationTimeout: _propTypes.default.number,
  classPrefix: _propTypes.default.string,
  dialogClassName: _propTypes.default.string,
  size: _propTypes.default.oneOfType([(0, _propTypes2.oneOf)(modalSizes), _propTypes.default.number, _propTypes.default.string]),
  dialogStyle: _propTypes.default.object,
  dialogAs: _propTypes.default.elementType,
  full: (0, _propTypes2.deprecatePropType)(_propTypes.default.bool, 'Use size="full" instead.'),
  overflow: _propTypes.default.bool
});
var _default = Modal;
exports.default = _default;