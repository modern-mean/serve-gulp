'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watch = exports.nodemon = exports.modules = exports.forever = undefined;

var _forever = require('./forever');

var forever = _interopRequireWildcard(_forever);

var _modules = require('./modules');

var modules = _interopRequireWildcard(_modules);

var _nodemon = require('./nodemon');

var nodemon = _interopRequireWildcard(_nodemon);

var _watch = require('./watch');

var watch = _interopRequireWildcard(_watch);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.forever = forever;
exports.modules = modules;
exports.nodemon = nodemon;
exports.watch = watch;