import gulp from 'gulp';
import lodash from 'lodash';
import { restart } from './nodemon';

let serverWatcher;

function server(done) {
  serverWatcher = gulp.watch(['./moduledev/**/dist/**/*'], gulp.series(restart));
  return done();
}
server.displayName = 'serve:watch:server';

export { server };
