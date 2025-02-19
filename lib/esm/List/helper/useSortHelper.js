'use client';
function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
import on from 'dom-lib/on';
import { useCallback, useRef, useState } from 'react';
import AutoScroller from './AutoScroller';
import { closestNode, getEdgeOffset, getScrollingParent, isContainInteractiveElement, setInlineStyles, setTransitionDuration, setTranslate3d } from './utils';
import { useIsMounted } from '../../utils';
import useManager from './useManager';
var helperElementClass = 'rs-list-item-helper';
var holderElementClass = 'rs-list-item-holder';
var useSortHelper = function useSortHelper(config) {
  var autoScroll = config.autoScroll,
    pressDelay = config.pressDelay,
    transitionDuration = config.transitionDuration,
    onSort = config.onSort,
    onSortEnd = config.onSortEnd,
    onSortMove = config.onSortMove,
    onSortStart = config.onSortStart;
  var _useState = useState(false),
    sorting = _useState[0],
    setSorting = _useState[1];
  var containerRef = useRef(null);
  var pressTimer = useRef();
  var _useManager = useManager(),
    listItemRegister = _useManager.listItemRegister,
    getManagedItem = _useManager.getManagedItem,
    getOrderedItems = _useManager.getOrderedItems;
  var isMounted = useIsMounted();

  /**
   * start dragging
   * */
  var handlePress = useCallback(function (mouseDownEvent, _targetNode, curManagedItem) {
    var _curManagedItem$info$, _curManagedItem$info$2, _activeNodeHelper;
    if (!isMounted()) return;
    // data
    var containerElement = containerRef.current;
    var activeNode = curManagedItem.node;
    var activeNodeOldIndex = (_curManagedItem$info$ = curManagedItem.info.index) !== null && _curManagedItem$info$ !== void 0 ? _curManagedItem$info$ : 0;
    var activeNodeNextIndex = (_curManagedItem$info$2 = curManagedItem.info.index) !== null && _curManagedItem$info$2 !== void 0 ? _curManagedItem$info$2 : 0;
    var activeNodeHolderTranslate = {
      x: 0,
      y: 0
    };
    var animatedNodesOffset = []; // all list item offset

    // init scroller
    var scrollContainer = getScrollingParent(containerElement) || containerElement;
    var initScroll = {
      x: scrollContainer.scrollLeft,
      y: scrollContainer.scrollTop
    };
    var autoScroller = new AutoScroller(scrollContainer, function (offset) {
      activeNodeHolderTranslate.x += offset.left;
      activeNodeHolderTranslate.y += offset.top;
    });
    var activeNodeBoundingClientRect = activeNode.getBoundingClientRect();
    var activeNodeOffsetEdge = getEdgeOffset(activeNode, containerElement);
    var activeNodeStyle = getComputedStyle(activeNode);
    var activeNodeHelper = activeNode.cloneNode(true);
    (_activeNodeHelper = activeNodeHelper) === null || _activeNodeHelper === void 0 ? void 0 : _activeNodeHelper.classList.add(helperElementClass);
    setInlineStyles(activeNodeHelper, {
      position: 'fixed',
      width: activeNodeBoundingClientRect.width + "px",
      height: activeNodeBoundingClientRect.height + "px",
      left: activeNodeBoundingClientRect.left - parseFloat(activeNodeStyle.marginLeft) + "px",
      top: activeNodeBoundingClientRect.top - parseFloat(activeNodeStyle.marginTop) + "px"
    });
    activeNode.classList.add(holderElementClass);
    document.body.appendChild(activeNodeHelper);
    var getContainerScrollDelta = function getContainerScrollDelta() {
      return {
        left: scrollContainer.scrollLeft - initScroll.x,
        top: scrollContainer.scrollTop - initScroll.y
      };
    };
    var getHolderTranslate = function getHolderTranslate() {
      return animatedNodesOffset.reduce(function (acc, item) {
        return {
          x: acc.x + item.x,
          y: acc.y + item.y
        };
      }, {
        x: 0,
        y: 0
      });
    };
    var sortMouseMoveListener = on(window, 'mousemove', function (mouseOverEvent) {
      // Update helper position
      var offset = {
        x: (mouseOverEvent === null || mouseOverEvent === void 0 ? void 0 : mouseOverEvent.pageX) || 0,
        y: (mouseOverEvent === null || mouseOverEvent === void 0 ? void 0 : mouseOverEvent.pageY) || 0
      };
      var containerScrollDelta = getContainerScrollDelta();
      var containerBoundingRect = scrollContainer.getBoundingClientRect();
      activeNodeHolderTranslate = {
        x: offset.x - mouseDownEvent.pageX,
        y: offset.y - mouseDownEvent.pageY
      };
      if (activeNodeHelper) {
        setTranslate3d(activeNodeHelper, activeNodeHolderTranslate);
      }

      // animate
      activeNodeNextIndex = -1;
      var listItemManagerRefs = getOrderedItems(curManagedItem.info.collection);
      var aTop = activeNodeOffsetEdge.top || 0;
      var cTop = containerScrollDelta.top || 0;
      var sortingOffsetY = aTop + activeNodeHolderTranslate.y + cTop;
      for (var i = 0, len = listItemManagerRefs.length; i < len; i++) {
        var _listItemManagerRefs$;
        var currentNode = listItemManagerRefs[i].node;
        var currentNodeIndex = (_listItemManagerRefs$ = listItemManagerRefs[i].info.index) !== null && _listItemManagerRefs$ !== void 0 ? _listItemManagerRefs$ : 0;
        var offsetY = activeNodeBoundingClientRect.height > currentNode.offsetHeight ? currentNode.offsetHeight / 2 : activeNodeBoundingClientRect.height / 2;
        var translate = {
          x: 0,
          y: 0
        };

        // If we haven't cached the node's offsetTop / offsetLeft value
        var curEdgeOffset = listItemManagerRefs[i].edgeOffset || getEdgeOffset(currentNode, containerElement);
        listItemManagerRefs[i].edgeOffset = curEdgeOffset;

        // Get a reference to the next node
        var prvNode = i > 0 && listItemManagerRefs[i - 1];
        var nextNode = i < len - 1 && listItemManagerRefs[i + 1];

        // Also cache the node's edge offset if needed.
        if (prvNode && !prvNode.edgeOffset) {
          prvNode.edgeOffset = getEdgeOffset(prvNode.node, containerElement);
        }
        if (nextNode && !nextNode.edgeOffset) {
          nextNode.edgeOffset = getEdgeOffset(nextNode.node, containerElement);
        }

        // If the node is the one we're currently animating, skip it
        if (currentNodeIndex === activeNodeOldIndex) {
          continue;
        }
        var curEdgeOffsetTop = curEdgeOffset.top || 0;
        if (prvNode && currentNodeIndex > activeNodeOldIndex && sortingOffsetY + offsetY >= curEdgeOffsetTop) {
          var _prvNode$edgeOffset;
          var yOffset = (((_prvNode$edgeOffset = prvNode.edgeOffset) === null || _prvNode$edgeOffset === void 0 ? void 0 : _prvNode$edgeOffset.top) || 0) - curEdgeOffsetTop;
          translate.y = yOffset;
          animatedNodesOffset[currentNodeIndex] = {
            x: 0,
            y: -yOffset
          };
          activeNodeNextIndex = currentNodeIndex;
        } else if (nextNode && currentNodeIndex < activeNodeOldIndex && sortingOffsetY <= curEdgeOffsetTop + offsetY) {
          var _nextNode$edgeOffset;
          var _yOffset = (((_nextNode$edgeOffset = nextNode.edgeOffset) === null || _nextNode$edgeOffset === void 0 ? void 0 : _nextNode$edgeOffset.top) || 0) - curEdgeOffsetTop;
          translate.y = _yOffset;
          animatedNodesOffset[currentNodeIndex] = {
            x: 0,
            y: -_yOffset
          };
          if (activeNodeNextIndex === -1) {
            activeNodeNextIndex = currentNodeIndex;
          }
        } else {
          animatedNodesOffset[currentNodeIndex] = {
            x: 0,
            y: 0
          };
        }
        setTransitionDuration(currentNode, transitionDuration);
        setTranslate3d(currentNode, translate);

        // translate holder
        setTranslate3d(activeNode, getHolderTranslate());
      }
      if (activeNodeNextIndex === -1) {
        activeNodeNextIndex = activeNodeOldIndex;
      }

      // auto scroll
      if (autoScroll) {
        autoScroller.update({
          width: activeNodeBoundingClientRect.width,
          height: activeNodeBoundingClientRect.height,
          translate: activeNodeHolderTranslate,
          maxTranslate: {
            x: 0,
            y: containerBoundingRect.top + containerBoundingRect.height - activeNodeBoundingClientRect.top - activeNodeBoundingClientRect.height / 2
          },
          minTranslate: {
            x: 0,
            y: containerBoundingRect.top - activeNodeBoundingClientRect.top - activeNodeBoundingClientRect.height / 2
          }
        });
      }
      onSortMove === null || onSortMove === void 0 ? void 0 : onSortMove({
        collection: curManagedItem.info.collection,
        node: activeNode,
        oldIndex: activeNodeOldIndex,
        newIndex: activeNodeNextIndex
      }, mouseOverEvent);
    }, {
      passive: false
    });
    var sortMouseEndListener = on(window, 'mouseup', function (event) {
      // Remove the event listeners
      sortMouseMoveListener.off();
      sortMouseEndListener.off();
      var holderTranslate = getHolderTranslate();
      var containerScrollDelta = getContainerScrollDelta();
      if (activeNodeHelper) {
        setTranslate3d(activeNodeHelper, {
          x: holderTranslate.x - (containerScrollDelta.left || 0),
          y: holderTranslate.y - (containerScrollDelta.top || 0)
        });
        setTransitionDuration(activeNodeHelper, transitionDuration);
      }

      // wait for animation
      setTimeout(function () {
        var _activeNodeHelper2, _activeNodeHelper2$pa;
        if (!isMounted()) return;
        // Remove the helper from the DOM
        (_activeNodeHelper2 = activeNodeHelper) === null || _activeNodeHelper2 === void 0 ? void 0 : (_activeNodeHelper2$pa = _activeNodeHelper2.parentNode) === null || _activeNodeHelper2$pa === void 0 ? void 0 : _activeNodeHelper2$pa.removeChild(activeNodeHelper);
        activeNodeHelper = null;

        // Remove redundant styles
        activeNode.classList.remove(holderElementClass);
        setTranslate3d(activeNode, null);
        animatedNodesOffset = [];
        for (var _iterator = _createForOfIteratorHelperLoose(getOrderedItems(curManagedItem.info.collection)), _step; !(_step = _iterator()).done;) {
          var item = _step.value;
          // Clear the cached offsetTop / offsetLeft value
          item.edgeOffset = null;

          // Remove the transforms / transitions
          var el = item.node;
          setTranslate3d(el, null);
          setTransitionDuration(el, null);
        }

        // Stop autoScroll
        autoScroller.clear();

        // Update manager state
        setSorting(false);

        // callbacks
        var callbackPayload = {
          collection: curManagedItem.info.collection,
          node: curManagedItem.node,
          newIndex: activeNodeNextIndex,
          oldIndex: activeNodeOldIndex
        };
        onSortEnd === null || onSortEnd === void 0 ? void 0 : onSortEnd(callbackPayload, event);
        onSort === null || onSort === void 0 ? void 0 : onSort(callbackPayload, event);
      }, transitionDuration);
    }, {
      passive: false
    });
    setSorting(true);
    // start callback
    onSortStart === null || onSortStart === void 0 ? void 0 : onSortStart({
      collection: curManagedItem.info.collection,
      node: activeNode,
      oldIndex: activeNodeOldIndex,
      newIndex: activeNodeNextIndex
    }, mouseDownEvent.nativeEvent);
  }, [autoScroll, getOrderedItems, isMounted, onSort, onSortEnd, onSortMove, onSortStart, transitionDuration]);

  /**
   * Determine whether to start dragging
   * */
  var handleStart = useCallback(function (mouseDownEvent) {
    var triggeredNode = mouseDownEvent.target;
    var targetNode = closestNode(triggeredNode, function (el) {
      return Boolean(getManagedItem(el));
    });
    var curManagedItem = getManagedItem(targetNode);
    if (
    // is not secondary button pressed
    mouseDownEvent.button !== 2 &&
    // is list item
    Boolean(curManagedItem) && !curManagedItem.info.disabled &&
    // is not sorting
    !sorting &&
    // is valid node
    targetNode instanceof HTMLElement &&
    // excludes interactive elements
    !targetNode.contains(closestNode(triggeredNode, isContainInteractiveElement))) {
      mouseDownEvent.preventDefault();
      pressTimer.current = setTimeout(handlePress, pressDelay, mouseDownEvent, targetNode, curManagedItem);
    }
  }, [getManagedItem, handlePress, pressDelay, sorting]);

  /**
   * Clear timer after drag
   * */
  var handleEnd = useCallback(function () {
    return clearTimeout(pressTimer.current);
  }, []);
  return {
    handleStart: handleStart,
    handleEnd: handleEnd,
    containerRef: containerRef,
    sorting: sorting,
    register: listItemRegister
  };
};
export default useSortHelper;