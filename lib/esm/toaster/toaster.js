'use client';
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import ToastContainer from './ToastContainer';
var defaultContainerId = 'default';
var containers = new Map();

/**
 * Create a container by Id.
 * @param containerId
 * @param options
 */
function createContainer(_x, _x2) {
  return _createContainer.apply(this, arguments);
}
/**
 * Get the container by ID. Use default ID when ID is not available.
 * @param containerId
 */
function _createContainer() {
  _createContainer = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(containerId, props) {
    var _yield$ToastContainer, container;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return ToastContainer.getInstance(props);
          case 2:
            _yield$ToastContainer = _context.sent;
            container = _yield$ToastContainer[0];
            containers.set(containerId || defaultContainerId, container);
            return _context.abrupt("return", container);
          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _createContainer.apply(this, arguments);
}
function getContainer(containerId) {
  if (containers.size == 0) {
    return null;
  }
  return containers.get(containerId || defaultContainerId);
}
var toaster = function toaster(message) {
  return toaster.push(message);
};
toaster.push = function (message, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options,
    containerId = _options.placement,
    restOptions = _objectWithoutPropertiesLoose(_options, ["placement"]);
  var container = getContainer(containerId);
  if (container !== null && container !== void 0 && container.current) {
    return container.current.push(message, restOptions);
  }
  return createContainer(containerId !== null && containerId !== void 0 ? containerId : '', options).then(function (ref) {
    var _ref$current;
    return (_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.push(message, restOptions);
  });
};
toaster.remove = function (key) {
  containers.forEach(function (c) {
    var _c$current;
    return (_c$current = c.current) === null || _c$current === void 0 ? void 0 : _c$current.remove(key);
  });
};
toaster.clear = function () {
  containers.forEach(function (c) {
    var _c$current2;
    return (_c$current2 = c.current) === null || _c$current2 === void 0 ? void 0 : _c$current2.clear();
  });
};
export default toaster;