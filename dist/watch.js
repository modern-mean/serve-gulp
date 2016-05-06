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

var _modules = require('modern-mean-build-gulp/dist/modules');

var _modules2 = require('./modules');

var _nodemon = require('./nodemon');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function client(done) {
  try {
    let watchFiles = ['./moduledev/modern-mean-users-material/src/client/run/users.client.run.authcheck.js', '!**/*.constants.js', '!**/*.values.js'];
    _gulpLivereload2.default.listen();
    let watcher = _gulp2.default.watch(watchFiles);
    watcher.on('change', function (filepath, stats) {
      let pathArr = filepath.split('/');
      let modulePath = pathArr[0] + '/' + pathArr[1];
      let gulpFile = './' + modulePath + '/gulpfile.babel.js';
      (0, _child_process.exec)('gulp --gulpfile ' + gulpFile + ' client', function (error, stdout, stderr) {
        console.log(stdout);
        _gulp2.default.series(_modules.client.build)();
      }).on('exit', () => {
        //gulp.series(inject, restart, livereloadChanged)();
        return done();
      });
    });
  } catch (err) {
    console.log(err);
  }
}
client.displayName = 'serve:watch:client';

function server(done) {
  let watchFiles = ['./modulesdev/*/src/server/**/*'];
  let watcher = _gulp2.default.watch(watchFiles);
  console.log(watcher);
  watcher.on('change', function (filepath, stats) {
    console.log(filepath);
    let pathArr = filepath.split('/');
    let modulePath = pathArr[0] + '/' + pathArr[1];
    let gulpFile = './' + modulePath + '/gulpfile.babel.js';
    (0, _child_process.exec)('gulp --gulpfile ' + gulpFile + ' server', function (error, stdout, stderr) {
      console.log(stdout);
      _gulp2.default.series(build.inject, _nodemon.restart)();
    });
  });

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