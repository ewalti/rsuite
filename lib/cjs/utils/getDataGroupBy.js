'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.getDataGroupBy = getDataGroupBy;
exports.KEY_GROUP_TITLE = exports.KEY_GROUP = void 0;
var _groupBy2 = _interopRequireDefault(require("lodash/groupBy"));
var _treeUtils = require("../utils/treeUtils");
var hasSymbol = typeof Symbol === 'function';
var KEY_GROUP = hasSymbol ? Symbol('_$grouped') : '_$grouped';
exports.KEY_GROUP = KEY_GROUP;
var KEY_GROUP_TITLE = 'groupTitle';
exports.KEY_GROUP_TITLE = KEY_GROUP_TITLE;
function getDataGroupBy(data, key, sort) {
  var groupMap = (0, _groupBy2.default)(data, key);
  var isSort = typeof sort === 'function';
  var groups = Object.entries(groupMap).map(function (_ref) {
    var _ref2;
    var groupTitle = _ref[0],
      children = _ref[1];
    return _ref2 = {
      children: isSort ? children.sort(sort(false)) : children
    }, _ref2[KEY_GROUP_TITLE] = groupTitle, _ref2[KEY_GROUP] = true, _ref2;
  });
  if (isSort) {
    groups.sort(sort(true));
  }

  // Use DFS traverse
  // Because I want the result to be [group, child, child, group, child, child]
  // rather than [group, group, child, child, child, child]
  return (0, _treeUtils.flattenTree)(groups, function (group) {
    return group.children;
  }, _treeUtils.WalkTreeStrategy.DFS);
}