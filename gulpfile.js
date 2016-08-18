'use strict'
var gulp = require('gulp'),
    jade = require('gulp-jade'),
    sass = require('gulp-sass'),
    concatCss = require('gulp-concat-css'),
    concat = require('gulp-concat'),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    clean = require('gulp-clean'),
    notify = require('gulp-notify'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync').create();

gulp.task('compress', function (cb) {
  //var comparisons {beautify}
  pump([
        gulp.src('app/js/*.js'),
        uglify(),
        rename({suffix: '.min'}),
        gulp.dest('dist/js')
    ],
    cb
  );
});

gulp.task('serve', function() {
  browserSync.init({
    server: "dist/"
  });
  return browserSync.watch('dist/').on('change', browserSync.reload);
});

gulp.task('jade', function() {
  return gulp.src('app/jade/*.jade').pipe(jade({
    pretty: true
  }).on('error', notify.onError())).pipe(gulp.dest('dist'));
});

gulp.task('sass', function() {
  return gulp.src('app/sass/*.sass').pipe(sass({
    //outputStyle: 'expanded'
    outputStyle: 'compressed'
  }).on('error', notify.onError()))
  .pipe(autoprefixer('last 2 version', '> 1%', 'IE 9'))
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('dist/css'));
});

gulp.task('compress:pr', function (cb) {
  var options = {
    mangle: false,
    compress: false,
    output: { beautify: true }
  }
  pump([
        gulp.src('app/js/*.js'),
        uglify(options),
        //rename({suffix: '.min'}),
        gulp.dest('dist/js')
    ],
    cb
  );
});

gulp.task('sass:pr', function() {
  return gulp.src('app/sass/*.sass').pipe(sass({
    outputStyle: 'expanded'
  }).on('error', notify.onError()))
  .pipe(autoprefixer('last 2 version', '> 1%', 'IE 9'))
  //.pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('dist/css'));
});

gulp.task('watch', function() {
  gulp.watch('app/jade/**/*.jade', ['jade']);
  gulp.watch('app/sass/*.sass', ['sass']);
  gulp.watch('app/js/*.js', ['compress']);
});


gulp.task('vendor:css', function() {
  return gulp.src('dist/lib/**/**/*.css')
  .pipe(concatCss('dist/css/bundle.css'))
  .pipe(gulp.dest('out/'))
  .pipe(concatCss('dist/css/bundle.min.css'))
  .pipe(cleanCSS())
  .pipe(gulp.dest('out/'));
});

gulp.task('vendor:js', function(cb) {
      pump([
          gulp.src('dist/lib/**/**/*.js'),
          uglify(),
          //rename({suffix: '.min'}),
          concat('all.js'),
          gulp.dest('dist/js')
      ],
      cb
    )
});



gulp.task('production', ['sass:pr', 'compress:pr']);
gulp.task('default', ['jade', 'sass', 'compress', 'watch', 'serve']);

