gulp = require("gulp");
sass = require("gulp-sass");

gulp.task('copy', function(){
  gulp.src([
    'bower_components/angular/angular.js',
    'bower_components/modernizr/modernizr.js',
    'bower_components/jquery/dist/jquery.js',
    'bower_components/jquery/dist/jquery.js',
    'bower_components/stripe-angular/stripe-angular.js',
    'bower_components/foundation/js/foundation.js',
    'bower_components/foundation/js/foundation/foundation.alert.js',
    'bower_components/pickadate/lib/picker.js',
    'bower_components/pickadate/lib/picker.date.js',
    'bower_components/pickadate/lib/picker.time.js',
    'node_modules/angular-resource/angular-resource.js',
    'node_modules/angular-route/angular-route.js',
    'node_modules/card.js/dist/card.js',
    'client/client.js',
    'client/lib.js',
    'client/tm-ctrl.js',
    'client/tm-service.js',
    'client/tm-filters.js',
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
    'bower_components/pickadate/lib/themes/default.css',
    'bower_components/pickadate/lib/themes/default.date.css',
    'bower_components/pickadate/lib/themes/default.time.css'
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


gulp.task('default', ['copy', 'copy-css', 'sass', 'watch']);
