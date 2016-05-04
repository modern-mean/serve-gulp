'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clean = exports.watch = exports.nodemon = exports.modules = exports.forever = undefined;

var _del = require('del');

var _del2 = _interopRequireDefault(_del);

var _forever = require('./forever');

var forever = _interopRequireWildcard(_forever);

var _modules = require('./modules');

var modules = _interopRequireWildcard(_modules);

var _nodemon = require('./nodemon');

var nodemon = _interopRequireWildcard(_nodemon);

var _watch = require('./watch');

var watch = _interopRequireWildcard(_watch);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function clean() {
  return (0, _del2.default)(['./public/dist']);
}
clean.displayName = 'serve:clean';
gulp.task(clean);

exports.forever = forever;
exports.modules = modules;
exports.nodemon = nodemon;
exports.watch = watch;
exports.clean = clean;