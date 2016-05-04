import livereload from 'gulp-livereload';
import lodash from 'lodash';

function client(done) {
  let watchFiles = ['./modules/*/client/**/*', '!**/*.constants.js', '!**/*.values.js'];
  livereload.listen();
  let watcher = gulp.watch(watchFiles);
  watcher.on('change', function(filepath, stats) {
    let pathArr = filepath.split('/');
    let modulePath = pathArr[0] + '/' + pathArr[1];
    let gulpFile = './' + modulePath + '/gulpfile.babel.js';
    exec('gulp --gulpfile ' + gulpFile + ' client', function(error, stdout, stderr) {
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
  watcher.on('change', function(filepath, stats) {
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

export { client, server, livereloadChanged as livereload };
