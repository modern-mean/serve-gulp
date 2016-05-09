'use strict';

import gulp from 'gulp';
import livereload from 'gulp-livereload';
import lodash from 'lodash';
import { exec } from 'child_process';
import { inject, application } from './modules';
import { restart } from './nodemon';

function client(done) {
  livereload.listen();
  return gulp.watch(['./moduledev/modern-mean-users-material/dist/client/**/*'], gulp.series(application, restart, livereloadChanged));
}
client.displayName = 'serve:watch:client';

function server(done) {
  return gulp.watch(['./moduledev/modern-mean-users-material/dist/server/**/*'], gulp.series(restart, livereloadChanged));
}
server.displayName = 'serve:watch:server';

function livereloadChanged(done) {
  setTimeout(function () {
    livereload.changed('Restart Client');
  }, 2000);
  return done();
}
livereloadChanged.displayName = 'serve:livereload';

let all = gulp.parallel(client, server);
all.displayName = 'serve:watch:all';

export { client, server, all, livereloadChanged as livereload };
