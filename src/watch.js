'use strict';

import gulp from 'gulp';
import livereload from 'gulp-livereload';
import lodash from 'lodash';
import { exec } from 'child_process';
import { client as buildClient, server as buildServer } from 'modern-mean-build-gulp/dist/modules';
import { inject } from './modules';
import { restart } from './nodemon';

function client(done) {
  try {
    let watchFiles = ['./moduledev/modern-mean-users-material/src/client/run/users.client.run.authcheck.js', '!**/*.constants.js', '!**/*.values.js'];
    livereload.listen();
    let watcher = gulp.watch(watchFiles);
    watcher.on('change', function(filepath, stats) {
      let pathArr = filepath.split('/');
      let modulePath = pathArr[0] + '/' + pathArr[1];
      let gulpFile = './' + modulePath + '/gulpfile.babel.js';
      exec('gulp --gulpfile ' + gulpFile + ' client', function(error, stdout, stderr) {
        console.log(stdout);
        gulp.series(buildClient.build)();
      })
      .on('exit', () => {
        //gulp.series(inject, restart, livereloadChanged)();
        return done();
      });
    });
  } catch(err) {
    console.log(err);
  }



}
client.displayName = 'serve:watch:client';

function server(done) {
  let watchFiles = ['./modulesdev/*/src/server/**/*'];
  let watcher = gulp.watch(watchFiles);
  console.log(watcher);
  watcher.on('change', function(filepath, stats) {
    console.log(filepath)
    let pathArr = filepath.split('/');
    let modulePath = pathArr[0] + '/' + pathArr[1];
    let gulpFile = './' + modulePath + '/gulpfile.babel.js';
    exec('gulp --gulpfile ' + gulpFile + ' server', function(error, stdout, stderr) {
      console.log(stdout);
      gulp.series(build.inject, restart)();
    });
  });

  return done();

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
