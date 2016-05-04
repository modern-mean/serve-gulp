'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.livereload = exports.all = exports.server = exports.client = undefined;

var _gulpLivereload = require('gulp-livereload');

var _gulpLivereload2 = _interopRequireDefault(_gulpLivereload);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function client(done) {
  let watchFiles = ['./modules/*/client/**/*', '!**/*.constants.js', '!**/*.values.js'];
  _gulpLivereload2.default.listen();
  let watcher = gulp.watch(watchFiles);
  watcher.on('change', function (filepath, stats) {
    let pathArr = filepath.split('/');
    let modulePath = pathArr[0] + '/' + pathArr[1];
    let gulpFile = './' + modulePath + '/gulpfile.babel.js';
    exec('gulp --gulpfile ' + gulpFile + ' client', function (error, stdout, stderr) {
      console.log(stdout);
      gulp.series(gulp.parallel(build.modules, build.images), build.inject, restart, livereloadChanged)();
    });
  });

  return done();
}
client.displayName = 'serve:watch:client';

function server(done) {
  let watchFiles = ['./modules/*/server/**/*'];
  let watcher = gulp.watch(watchFiles);
  watcher.on('change', function (filepath, stats) {
    let pathArr = filepath.split('/');
    let modulePath = pathArr[0] + '/' + pathArr[1];
    let gulpFile = './' + modulePath + '/gulpfile.babel.js';
    exec('gulp --gulpfile ' + gulpFile + ' server', function (error, stdout, stderr) {
      console.log(stdout);
      gulp.series(build.inject, restart)();
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

let all = gulp.parallel(client, server);
all.displayName = 'serve:watch:all';

exports.client = client;
exports.server = server;
exports.all = all;
exports.livereload = livereloadChanged;