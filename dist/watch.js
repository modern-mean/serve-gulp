'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.livereload = exports.all = exports.server = exports.client = undefined;

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _gulpLivereload = require('gulp-livereload');

var _gulpLivereload2 = _interopRequireDefault(_gulpLivereload);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _child_process = require('child_process');

var _modules = require('./modules');

var _nodemon = require('./nodemon');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let clientWatcher, serverWatcher;

function client(done) {
  _gulpLivereload2.default.listen();
  clientWatcher = _gulp2.default.watch(['./moduledev/*/dist/client/**/*'], _gulp2.default.series(_modules.application, _nodemon.restart, livereloadChanged));
  return done();
}
client.displayName = 'serve:watch:client';

function server(done) {
  serverWatcher = _gulp2.default.watch(['./moduledev/modern-mean-users-material/dist/server/**/*'], _gulp2.default.series(_nodemon.restart, livereloadChanged));
  return done();
}
server.displayName = 'serve:watch:server';

function livereloadChanged(done) {
  setTimeout(function () {
    _gulpLivereload2.default.changed('Restart Client');
  }, 2000);
  return done();
}
livereloadChanged.displayName = 'serve:livereload';

let all = _gulp2.default.parallel(client, server);
all.displayName = 'serve:watch:all';

exports.client = client;
exports.server = server;
exports.all = all;
exports.livereload = livereloadChanged;