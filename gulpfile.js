// Sass configuration
var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var concatCss = require('gulp-concat-css');

gulp.task('sass', function () {
    gulp.src(['*.scss',
        'src/**/**/**/*.scss',
        'src/**/**/**/**/*.scss',
        'src/**/**/**/**/**/*.scss',])
        .pipe(sass())
        .pipe(postcss([autoprefixer({ browsers: ['last 2 versions'] })]))
        .pipe(sourcemaps.write())
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest(function (file) {
            return file.base;
        }))
});


gulp.task('default', function () {
    gulp.watch(['*.scss',
        'src/**/**/**/*.scss',
        'src/**/**/**/**/*.scss',
        'src/**/**/**/**/**/*.scss',], ['sass']);

});