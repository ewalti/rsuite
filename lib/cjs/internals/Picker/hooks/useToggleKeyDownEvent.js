'use client';
"use strict";

exports.__esModule = true;
exports.default = void 0;
var _utils = require("../../../utils");
/**
 * A hook to control the toggle keyboard operation
 * @param props
 */
var useToggleKeyDownEvent = function useToggleKeyDownEvent(props) {
  var _props$toggle = props.toggle,
    toggle = _props$toggle === void 0 ? true : _props$toggle,
    trigger = props.trigger,
    target = props.target,
    overlay = props.overlay,
    searchInput = props.searchInput,
    active = props.active,
    readOnly = props.readOnly,
    disabled = props.disabled,
    loading = props.loading,
    onExit = props.onExit,
    onOpen = props.onOpen,
    onClose = props.onClose,
    onKeyDown = props.onKeyDown,
    onMenuKeyDown = props.onMenuKeyDown,
    onMenuPressEnter = props.onMenuPressEnter,
    onMenuPressBackspace = props.onMenuPressBackspace;
  var handleClose = (0, _utils.useEventCallback)(function () {
    var _trigger$current, _trigger$current$clos, _trigger$current2, _trigger$current2$foc;
    (_trigger$current = trigger.current) === null || _trigger$current === void 0 ? void 0 : (_trigger$current$clos = _trigger$current.close) === null || _trigger$current$clos === void 0 ? void 0 : _trigger$current$clos.call(_trigger$current);

    // The focus is on the trigger button after closing
    (_trigger$current2 = trigger.current) === null || _trigger$current2 === void 0 ? void 0 : (_trigger$current2$foc = _trigger$current2.focus) === null || _trigger$current2$foc === void 0 ? void 0 : _trigger$current2$foc.call(_trigger$current2);
    onClose === null || onClose === void 0 ? void 0 : onClose();
  });
  var handleOpen = (0, _utils.useEventCallback)(function () {
    var _trigger$current3, _trigger$current3$ope;
    (_trigger$current3 = trigger.current) === null || _trigger$current3 === void 0 ? void 0 : (_trigger$current3$ope = _trigger$current3.open) === null || _trigger$current3$ope === void 0 ? void 0 : _trigger$current3$ope.call(_trigger$current3);
    onOpen === null || onOpen === void 0 ? void 0 : onOpen();
  });
  var handleToggleDropdown = (0, _utils.useEventCallback)(function () {
    if (active) {
      handleClose();
      return;
    }
    handleOpen();
  });
  var onToggle = (0, _utils.useEventCallback)(function (event) {
    // Keyboard events should not be processed when readOnly and disabled are set.
    if (readOnly || disabled || loading) {
      return;
    }
    if (event.target === (target === null || target === void 0 ? void 0 : target.current)) {
      // enter
      if (toggle && event.key === _utils.KEY_VALUES.ENTER) {
        handleToggleDropdown();
      }

      // delete
      if (event.key === _utils.KEY_VALUES.BACKSPACE) {
        onExit === null || onExit === void 0 ? void 0 : onExit(event);
      }
    }
    if (overlay !== null && overlay !== void 0 && overlay.current) {
      // The keyboard operation callback on the menu.
      onMenuKeyDown === null || onMenuKeyDown === void 0 ? void 0 : onMenuKeyDown(event);
      if (event.key === _utils.KEY_VALUES.ENTER) {
        onMenuPressEnter === null || onMenuPressEnter === void 0 ? void 0 : onMenuPressEnter(event);
      }

      /**
       * There is no callback when typing the Backspace key in the search box.
       * The default is to remove search keywords
       */
      if (event.key === _utils.KEY_VALUES.BACKSPACE && event.target !== (searchInput === null || searchInput === void 0 ? void 0 : searchInput.current)) {
        onMenuPressBackspace === null || onMenuPressBackspace === void 0 ? void 0 : onMenuPressBackspace(event);
      }

      // The search box gets focus when typing characters and numbers.
      if (event.key.length === 1 && /\w/.test(event.key)) {
        var _event$target;
        // Exclude Input
        // eg: <SelectPicker renderExtraFooter={() => <Input />} />
        if (((_event$target = event.target) === null || _event$target === void 0 ? void 0 : _event$target.tagName) !== 'INPUT') {
          var _searchInput$current;
          searchInput === null || searchInput === void 0 ? void 0 : (_searchInput$current = searchInput.current) === null || _searchInput$current === void 0 ? void 0 : _searchInput$current.focus();
        }
      }
    }
    if (event.key === _utils.KEY_VALUES.ESC || event.key === _utils.KEY_VALUES.TAB) {
      handleClose();
    }

    // Native event callback
    onKeyDown === null || onKeyDown === void 0 ? void 0 : onKeyDown(event);
  });
  return onToggle;
};
var _default = useToggleKeyDownEvent;
exports.default = _default;