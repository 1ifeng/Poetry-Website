var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('css', function() {
  return gulp.src('public/sass/*.scss')
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(gulp.dest('public/stylesheets/'))
})

gulp.task('autocss', function() {
  gulp.watch('public/sass/*.scss', ['css']);
})

gulp.task('default', ['autocss'])
