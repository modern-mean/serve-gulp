'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.restart = exports.start = undefined;

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _gulpNodemon = require('gulp-nodemon');

var _gulpNodemon2 = _interopRequireDefault(_gulpNodemon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let nodemonInstance;

function start(done) {
  nodemonInstance = (0, _gulpNodemon2.default)({
    //TODO this is hacky because i am in a hurry
    script: '*/modern-mean-core-material/dist/server/app/server.js',
    watch: ['noop']
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

exports.start = start;
exports.restart = restart;