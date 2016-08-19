'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watch = exports.nodemon = exports.forever = undefined;

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _forever = require('./dist/forever');

var forever = _interopRequireWildcard(_forever);

var _nodemon = require('./dist/nodemon');

var nodemon = _interopRequireWildcard(_nodemon);

var _watch = require('./dist/watch');

var watch = _interopRequireWildcard(_watch);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.forever = forever;
exports.nodemon = nodemon;
exports.watch = watch;