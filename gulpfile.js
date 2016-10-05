"use strict";

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
	sass = require('gulp-sass'),
	maps = require('gulp-sourcemaps'),
	 del = require('del'),
imagemin = require('gulp-imagemin');

gulp.task('concatScripts', function(){
	return gulp.src([
		'js/global.js',
		'js/circle/autogrow.js',
		'js/circle/circle.js'
		])
	.pipe(maps.init())
	.pipe(concat('app.js'))
	.pipe(maps.write('./'))
	.pipe(gulp.dest('js'));
});

gulp.task('scripts', ['concatScripts'], function(){
	return gulp.src('js/app.js')
		.pipe(uglify())
		.pipe(rename('app.min.js'))
		.pipe(gulp.dest('dist/scripts'));
});

gulp.task('styles', function(){
	return gulp.src('sass/global.scss')
		.pipe(maps.init())
		.pipe(sass())
		.pipe(maps.write('./'))
		.pipe(gulp.dest('dist/styles'));
});

gulp.task('images', function(){
	return gulp.src('images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/content'));
});

gulp.task('clean', function(){
	del(['dist', 'js/app*.js*']);
});

gulp.task('build', ['scripts', 'styles', 'images']);

gulp.task('default', ['clean'], function(){
	gulp.start('build');
});



