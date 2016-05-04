'use strict';

import gulp from 'gulp';
import concat from 'gulp-concat';
import debug from 'gulp-debug';
import filter from 'gulp-filter';
import rename from 'gulp-rename';
import ginject from 'gulp-inject';
import map from 'map-stream';
import path from 'path';
import fs from 'fs';
import ignore from 'gulp-ignore';
import ginstall from 'gulp-install';
import { exec } from 'child_process';


function buildFilter(file) {
  if (process.env.MEAN_BUILD_FORCE === 'true') {
    return false;
  }

  let filepath = path.parse(file.path);

  if (filepath.base === 'bower.json') {
    return fs.existsSync(filepath.dir + '/bower_components');
  } else if (filepath.base === 'package.json') {
    return fs.existsSync(filepath.dir + '/node_modules');
  }
}

function install(done) {
  return gulp.src(['./node_modules/modern-mean-*/bower.json', './node_modules/modern-mean-*/package.json'])
          .pipe(ignore.exclude(buildFilter))
          .pipe(ginstall())
          .pipe(debug());
}
install.displayName = 'modules:install';

function build() {
  return gulp.src(['./node_modules/modern-mean-*/gulpfile.babel.js'])
          .pipe(map(function (file, cb) {
            exec('gulp --gulpfile ' + file.path, function(error, stdout, stderr) {
              console.log(stdout);
              cb();
            });
          }));
}
build.displayName = 'modules:build';

function application() {
  let angular = filter(['**/angular.js'], { restore: true });
  let bootloader = filter(['**/bootloader.js'], { restore: true });
  let applicationJS = filter(['**/application.js'], { restore: true });
  let applicationCSS = filter(['**/application.css'], { restore: true });
  let vendorJS = filter(['**/vendor.js'], { restore: true });
  let vendorCSS = filter(['**/vendor.css'], { restore: true });
  let templates = filter(['**/templates.js'], { restore: true });

  let modules = [];

  return gulp.src(['./node_modules/modern-mean-*/dist/client/**/*.{js,css}'])
          .pipe(debug())
          .pipe(angular)
          .pipe(rename('angular.js'))
          .pipe(angular.restore)
          .pipe(bootloader)
          .pipe(rename('bootloader.js'))
          .pipe(bootloader.restore)
          .pipe(applicationJS)
          .pipe(concat('application.js'))
          .pipe(applicationJS.restore)
          .pipe(templates)
          .pipe(concat('templates.js'))
          .pipe(templates.restore)
          .pipe(vendorJS)
          .pipe(concat('vendor.js'))
          .pipe(vendorJS.restore)
          .pipe(applicationCSS)
          .pipe(concat('application.css'))
          .pipe(applicationCSS.restore)
          .pipe(vendorCSS)
          .pipe(concat('vendor.css'))
          .pipe(vendorCSS.restore)
          .pipe(gulp.dest('./public/dist'));
}
application.displayName = 'application';

function images() {
  return gulp.src(['./node_modules/modern-mean-*/dist/client/img/**/*'])
          .pipe(rename(function (path) {
            let dir = path.dirname.split('/');
            path.dirname = dir[0];
            if (dir.length > 3) {
              let i;
              for(i = 4; i < dir.length; i += 1) {
                path.dirname += '/' + dir[i];
              }
            }
            return path;
          }))
          .pipe(gulp.dest('./public/dist/img'));
}
images.displayName = 'serve:modules:images';

function inject() {
  //TODO this is hacky cause I am in a hurry
  return gulp.src(['./node_modules/modern-mean-core-material/dist/server/views/index.server.view.html'])
    .pipe(ginject(gulp.src(['public/dist/angular.js', 'public/dist/bootloader.js', 'public/dist/**/*.{js,css}'], {read: false}), {
      ignorePath: '/public'
    }))
    .pipe(gulp.dest('.'));
}
inject.displayName = 'serve:modules:inject';


export { install, build, application, images, inject };
