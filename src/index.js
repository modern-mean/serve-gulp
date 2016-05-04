'use strict';

import gulp from 'gulp';
import del from 'del';
import * as forever from './forever';
import * as modules from './modules';
import * as nodemon from './nodemon';
import * as watch from './watch';

function clean() {
  return del([
    './public/dist'
  ]);
}
clean.displayName = 'serve:clean';
gulp.task(clean);

export { forever, modules, nodemon, watch, clean };
