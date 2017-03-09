var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');

// sass编译css, 添加浏览器前缀, 压缩css
gulp.task('css', function() {
  return gulp.src('public/src/css/*.scss')
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(autoprefixer())
    .pipe(cssnano())
    .pipe(gulp.dest('public/stylesheets/'))
})

gulp.task('autocss', function() {
  gulp.watch('public/src/css/*.scss', ['css']);
})

// 压缩js
gulp.task('js', function() {
  return gulp.src(['public/src/js/*.js', '! public/src/js/*.min.js'])
    .pipe(uglify())
    .pipe(gulp.dest('public/javascripts/'))
})

gulp.task('autojs', function() {
  gulp.watch(['public/src/js/*.js', '! public/src/js/*.min.js'], ['js'])
})

gulp.task('default', ['autocss', 'autojs', 'css', 'js'])
