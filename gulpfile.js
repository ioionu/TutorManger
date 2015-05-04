gulp = require("gulp");

gulp.task('copy', function(){
  gulp.src([
    'bower_components/angular/angular.js',
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

gulp.task('watch', function(){
  gulp.watch(['client/client.js'], ['default']);
});

gulp.task('default', ['copy', 'watch']);
