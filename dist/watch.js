'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.server = undefined;

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _nodemon = require('./nodemon');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let serverWatcher;

function server(done) {
  serverWatcher = _gulp2.default.watch(['./moduledev/**/dist/**/*'], _gulp2.default.series(_nodemon.restart));
  return done();
}
server.displayName = 'serve:watch:server';

exports.server = server;