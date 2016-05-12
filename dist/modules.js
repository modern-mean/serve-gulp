'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.link = exports.inject = exports.images = exports.application = exports.build = exports.install = undefined;

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _gulpConcat = require('gulp-concat');

var _gulpConcat2 = _interopRequireDefault(_gulpConcat);

var _gulpDebug = require('gulp-debug');

var _gulpDebug2 = _interopRequireDefault(_gulpDebug);

var _gulpFilter = require('gulp-filter');

var _gulpFilter2 = _interopRequireDefault(_gulpFilter);

var _gulpRename = require('gulp-rename');

var _gulpRename2 = _interopRequireDefault(_gulpRename);

var _gulpInject = require('gulp-inject');

var _gulpInject2 = _interopRequireDefault(_gulpInject);

var _mapStream = require('map-stream');

var _mapStream2 = _interopRequireDefault(_mapStream);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _gulpIgnore = require('gulp-ignore');

var _gulpIgnore2 = _interopRequireDefault(_gulpIgnore);

var _gulpInstall = require('gulp-install');

var _gulpInstall2 = _interopRequireDefault(_gulpInstall);

var _child_process = require('child_process');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function buildFilter(file) {
  if (process.env.MEAN_BUILD_FORCE === 'true') {
    return false;
  }

  let filepath = _path2.default.parse(file.path);

  if (filepath.base === 'bower.json') {
    return _fs2.default.existsSync(filepath.dir + '/bower_components');
  } else if (filepath.base === 'package.json') {
    return _fs2.default.existsSync(filepath.dir + '/node_modules');
  }
}

function install(done) {
  return _gulp2.default.src(['./moduledev/modern-mean-*/bower.json', './moduledev/modern-mean-*/package.json']).pipe(_gulpIgnore2.default.exclude(buildFilter)).pipe((0, _gulpInstall2.default)());
}
install.displayName = 'modules:install';

function build(done) {
  return _gulp2.default.src(['./moduledev/modern-mean-*/gulpfile.babel.js']).pipe((0, _mapStream2.default)(function (file, cb) {
    const child = (0, _child_process.spawn)('gulp', ['--gulpfile', file.path, 'watch'], { env: process.env, stdio: ['inherit', 'inherit', 'inherit', 'ipc'], detached: true });
    child.unref();
    child.on('message', data => {
      return done();
    });
  }));
}
build.displayName = 'modules:build';

function link() {
  return _gulp2.default.src(['./moduledev/modern-mean-*']).pipe(_gulp2.default.symlink('./node_modules'));
}
link.displayName = 'modules:link';

function application() {
  let angular = (0, _gulpFilter2.default)(['**/angular.js'], { restore: true });
  let bootloader = (0, _gulpFilter2.default)(['**/bootloader.js'], { restore: true });
  let applicationJS = (0, _gulpFilter2.default)(['**/application.js'], { restore: true });
  let applicationCSS = (0, _gulpFilter2.default)(['**/application.css'], { restore: true });
  let vendorJS = (0, _gulpFilter2.default)(['**/vendor.js'], { restore: true });
  let vendorCSS = (0, _gulpFilter2.default)(['**/vendor.css'], { restore: true });
  let templates = (0, _gulpFilter2.default)(['**/templates.js'], { restore: true });

  let modules = [];

  return _gulp2.default.src(['./node_modules/modern-mean-*/dist/client/**/*.{js,css}']).pipe(angular).pipe((0, _gulpRename2.default)('angular.js')).pipe(angular.restore).pipe(bootloader).pipe((0, _gulpRename2.default)('bootloader.js')).pipe(bootloader.restore).pipe(applicationJS).pipe((0, _gulpConcat2.default)('application.js')).pipe(applicationJS.restore).pipe(templates).pipe((0, _gulpConcat2.default)('templates.js')).pipe(templates.restore).pipe(vendorJS).pipe((0, _gulpConcat2.default)('vendor.js')).pipe(vendorJS.restore).pipe(applicationCSS).pipe((0, _gulpConcat2.default)('application.css')).pipe(applicationCSS.restore).pipe(vendorCSS).pipe((0, _gulpConcat2.default)('vendor.css')).pipe(vendorCSS.restore).pipe(_gulp2.default.dest('./public/dist'));
}
application.displayName = 'application';

function images() {
  return _gulp2.default.src(['./node_modules/modern-mean-*/dist/client/img/**/*']).pipe((0, _gulpRename2.default)(function (path) {
    let dir = path.dirname.split('/');
    path.dirname = dir[0];
    if (dir.length > 3) {
      let i;
      for (i = 4; i < dir.length; i += 1) {
        path.dirname += '/' + dir[i];
      }
    }
    return path;
  })).pipe(_gulp2.default.dest('./public/dist/img'));
}
images.displayName = 'serve:modules:images';

function inject() {
  //TODO this is hacky cause I am in a hurry
  return _gulp2.default.src(['./node_modules/modern-mean-core-server/dist/server/views/material.html']).pipe((0, _gulpInject2.default)(_gulp2.default.src(['./public/dist/**/*.{js,css}'], { read: false }), {
    ignorePath: '/public'
  })).pipe(_gulp2.default.dest('./node_modules/modern-mean-core-server/dist/server/views/'));
}
inject.displayName = 'serve:modules:inject';

exports.install = install;
exports.build = build;
exports.application = application;
exports.images = images;
exports.inject = inject;
exports.link = link;