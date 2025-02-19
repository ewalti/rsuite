'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import React, { useRef, useImperativeHandle, useCallback, useMemo } from 'react';
import { VariableSizeList } from 'react-window';
import { useCustom } from '../../utils';
/**
 * This component renders a virtualized list of elements with either fixed or dynamic heights.
 *
 * @private
 */
var List = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var rowHeight = props.rowHeight,
    _props$as = props.as,
    Component = _props$as === void 0 ? VariableSizeList : _props$as,
    itemSizeProp = props.itemSize,
    rest = _objectWithoutPropertiesLoose(props, ["rowHeight", "as", "itemSize"]);
  var listRef = useRef(null);
  var _useCustom = useCustom(),
    rtl = _useCustom.rtl;
  useImperativeHandle(ref, function () {
    return {
      resetAfterIndex: function resetAfterIndex(index, shouldForceUpdate) {
        var _listRef$current, _listRef$current$rese;
        (_listRef$current = listRef.current) === null || _listRef$current === void 0 ? void 0 : (_listRef$current$rese = _listRef$current.resetAfterIndex) === null || _listRef$current$rese === void 0 ? void 0 : _listRef$current$rese.call(_listRef$current, index, shouldForceUpdate);
      },
      scrollTo: function scrollTo(scrollOffset) {
        var _listRef$current2, _listRef$current2$scr;
        (_listRef$current2 = listRef.current) === null || _listRef$current2 === void 0 ? void 0 : (_listRef$current2$scr = _listRef$current2.scrollTo) === null || _listRef$current2$scr === void 0 ? void 0 : _listRef$current2$scr.call(_listRef$current2, scrollOffset);
      },
      scrollToItem: function scrollToItem(index, align) {
        var _listRef$current3, _listRef$current3$scr;
        (_listRef$current3 = listRef.current) === null || _listRef$current3 === void 0 ? void 0 : (_listRef$current3$scr = _listRef$current3.scrollToItem) === null || _listRef$current3$scr === void 0 ? void 0 : _listRef$current3$scr.call(_listRef$current3, index, align);
      },
      scrollToRow: function scrollToRow(index) {
        var _listRef$current4, _listRef$current4$scr;
        (_listRef$current4 = listRef.current) === null || _listRef$current4 === void 0 ? void 0 : (_listRef$current4$scr = _listRef$current4.scrollToItem) === null || _listRef$current4$scr === void 0 ? void 0 : _listRef$current4$scr.call(_listRef$current4, index);
      }
    };
  });
  var setRowHeight = useCallback(function (index) {
    return typeof rowHeight === 'function' ? rowHeight({
      index: index
    }) : rowHeight || 0;
  }, [rowHeight]);
  var itemSize = useMemo(function () {
    if (typeof itemSizeProp === 'function') return itemSizeProp;
    return function () {
      return itemSizeProp;
    };
  }, [itemSizeProp]);
  var compatibleProps = _extends({
    itemSize: itemSize
  }, rest);
  if (rowHeight) {
    compatibleProps.itemSize = Component === VariableSizeList ? setRowHeight : rowHeight;
  }
  return /*#__PURE__*/React.createElement(Component, _extends({
    ref: listRef,
    direction: rtl ? 'rtl' : 'ltr'
  }, compatibleProps));
});
export default List;