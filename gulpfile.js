gulp = require("gulp");
sass = require("gulp-sass");

gulp.task('copy', function(){
  gulp.src([
    'bower_components/angular/angular.js',
    'bower_components/modernizr/modernizr.js',
    'bower_components/jquery/dist/jquery.js',
    'bower_components/foundation/js/foundation.js',
    'node_modules/angular-resource/angular-resource.js',
    'node_modules/angular-route/angular-route.js',
    'client/client.js',
    'client/tm-ctrl.js',
    'client/tm-service.js',
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
  ])
  .pipe(
    gulp.dest('public/stylesheets/')
  )
});

gulp.task('sass', function(){
  gulp.src('./client/stylesheets/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/stylesheets/'));
});

gulp.task('watch', function(){
  gulp.watch(['client/client.js'], ['default']);
  gulp.watch(['client/stylesheets/**/*.scss'], ['sass']);
});


gulp.task('default', ['copy', 'copy-css', 'sass', 'watch']);
