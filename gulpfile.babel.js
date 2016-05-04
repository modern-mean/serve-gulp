'use strict';

import gulp from 'gulp';
import babel from 'gulp-babel';
import del from 'del';

function build() {
  return gulp.src(['./src/**/*.js'])
    .pipe(babel())
    .pipe(gulp.dest('./dist'));
}
build.displayName = 'build';
gulp.task(build);

function clean() {
  return del([
    './public/dist'
  ]);
}
clean.displayName = 'clean';
gulp.task(clean);

//Gulp Default
//let defaultTask = gulp.series(modules.clean, modules.server.config, gulp.parallel(modules.client.build, modules.server.build));
let defaultTask = gulp.series(clean, build);
defaultTask.displayName = 'default';
gulp.task(defaultTask);
