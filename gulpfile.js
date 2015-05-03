gulp = require("gulp");

gulp.task('copy', function(){
  gulp.src([
    'bower_components/angular/angular.js',
    'public/javascripts/app.js'
  ])
  .pipe(
    gulp.dest('dist/js/')
  );
});

gulp.task('watch', function(){
  gulp.watch(['public/javascripts/app.js'], ['default']);
});

gulp.task('default', ['copy', 'watch']);
