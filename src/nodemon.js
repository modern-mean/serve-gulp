'use strict';

import gulp from 'gulp';
import nodemon from 'gulp-nodemon';

let nodemonInstance;

function start(done) {
  nodemonInstance = nodemon({
    //TODO this is hacky because i am in a hurry
    script: '*/modern-mean-core-material/dist/server/app/server.js',
    watch: ['noop'],
  });
  return done();
}
start.displayName = 'serve:nodemon:start';

function restart(done) {
  nodemonInstance.restart();
  return nodemonInstance.on('start', function () {
    return done();
  });
}
restart.displayName = 'serve:nodemon:restart';

export { start, restart };
