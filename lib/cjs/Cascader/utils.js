'use client';
"use strict";

exports.__esModule = true;
exports.getColumnsAndPaths = getColumnsAndPaths;
exports.usePaths = usePaths;
var _react = require("react");
var _treeUtils = require("../utils/treeUtils");
/**
 * Calculate columns to be displayed:
 *
 * - Every ancestor level of activeItem should be displayed
 * - The level that activeItem is at should be displayed
 * - If activeItem is a parent node, its child level should be displayed
 *
 * @param items
 * @param value
 * @param options
 * @returns
 */
function getColumnsAndPaths(items, pathTarget, options) {
  var getParent = options.getParent,
    getChildren = options.getChildren;
  if (!pathTarget) {
    return {
      columns: [items],
      path: []
    };
  }
  var columns = [];
  var path = [pathTarget];
  var children = getChildren(pathTarget);
  if (children && children.length > 0) {
    columns.unshift(children);
  }
  for (var parent = getParent(pathTarget); !!parent; parent = getParent(parent)) {
    var _getChildren;
    columns.unshift((_getChildren = getChildren(parent)) !== null && _getChildren !== void 0 ? _getChildren : []);
    path.unshift(parent);
  }
  columns.unshift(items);
  return {
    columns: columns,
    path: path
  };
}
/**
 * Caculate following 3 things
 *
 * - The columns of items to be displayed
 * - The path towards the current focused item
 * - The path towards the current selected item (referred to by Cascader's value)
 *
 * @param params
 * @returns
 */
function usePaths(_ref) {
  var data = _ref.data,
    activeItem = _ref.activeItem,
    selectedItem = _ref.selectedItem,
    getParent = _ref.getParent,
    getChildren = _ref.getChildren;
  var pathTowardsSelectedItem = (0, _react.useMemo)(function () {
    return (0, _treeUtils.getPathTowardsItem)(selectedItem, getParent);
  }, [getParent, selectedItem]);
  var _useMemo = (0, _react.useMemo)(function () {
      return getColumnsAndPaths(data, activeItem, {
        getParent: getParent,
        getChildren: getChildren
      });
    }, [data, activeItem, getParent, getChildren]),
    columnsToDisplay = _useMemo.columns,
    pathTowardsActiveItem = _useMemo.path;
  return {
    columnsToDisplay: columnsToDisplay,
    pathTowardsSelectedItem: pathTowardsSelectedItem,
    pathTowardsActiveItem: pathTowardsActiveItem
  };
}