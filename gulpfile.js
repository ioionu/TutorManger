var gulp = require("gulp");
var sass = require("gulp-sass");
var Server = require('karma').Server;

gulp.task('copy', function(){
  gulp.src([
    'node_modules/angular/angular.js',
    'bower_components/modernizr/modernizr.js',
    'bower_components/jquery/dist/jquery.js',
    'bower_components/jqueryui-timepicker-addon/dist/jquery-ui-sliderAccess.js',
    'bower_components/jqueryui-timepicker-addon/dist/jquery-ui-timepicker-addon.js',
    'bower_components/stripe-angular/stripe-angular.js',
    'bower_components/foundation/js/foundation.js',
    'bower_components/foundation/js/foundation/foundation.alert.js',
    'bower_components/foundation/js/foundation/foundation.joyride.js',
    'node_modules/angular-resource/angular-resource.js',
    'node_modules/angular-route/angular-route.js',
    'node_modules/angular-messages/angular-messages.js',
    'node_modules/angular-local-storage/dist/angular-local-storage.js',
    'node_modules/card.js/dist/card.js',
    'client/client.js',
    'client/lib.js',
    'client/tm-ctrl.js',
    'client/tm-service.js',
    'client/tm-filters.js'
  ])
  .pipe(
    gulp.dest('public/javascripts/')
  );
});

gulp.task('copy-css', function(){
  gulp.src([
    'bower_components/foundation/css/normalize.css',
    'bower_components/foundation/css/normalize.css.map',
    'bower_components/foundation/css/foundation.css',
    'bower_components/foundation/css/foundation.css.map',
    'bower_components/jqueryui-timepicker-addon/dist/jquery-ui-timepicker-addon.css'
  ])
  .pipe(
    gulp.dest('public/stylesheets/')
  );
});

gulp.task('sass', function(){
  gulp.src('./client/stylesheets/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/stylesheets/'));
});

gulp.task('watch', function(){
  gulp.watch(['client/**/*.js'], ['default']);
  gulp.watch(['client/stylesheets/**/*.scss'], ['sass']);
});

/**
 * Run tests
 */
gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/spec/karma.conf.js',
    singleRun: false
  }, done).start();
});

/**
 * Run tests
 */
gulp.task('travistest', function (done) {
  new Server({
    configFile: __dirname + '/spec/karma.conf.js',
    singleRun: true
  }, done).start();
});


gulp.task('default', ['copy', 'copy-css', 'sass', 'test', 'watch']);
