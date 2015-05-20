gulp = require("gulp");

gulp.task('copy', function(){
  gulp.src([
    'bower_components/angular/angular.js',
    'bower_components/modernizr/modernizr.js',
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


gulp.task('watch', function(){
  gulp.watch(['client/client.js'], ['default']);
});

gulp.task('default', ['copy', 'copy-css', 'watch']);
