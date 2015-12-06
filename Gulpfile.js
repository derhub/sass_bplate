'use strict';

require('es6-promise').polyfill();

var gulp         = require('gulp'),
    uglify       = require('gulp-uglify'),
    rename       = require('gulp-rename'),
    sourcemaps   = require('gulp-sourcemaps'),
    plumber      = require('gulp-plumber'),
    livereload   = require('gulp-livereload'),
    compass      = require('gulp-compass'),
    mqpacker     = require('css-mqpacker'),
    csswring     = require('csswring'),
    autoprefixer = require('autoprefixer'),
    minifycss    = require('gulp-minify-css'),
    postcss      = require('gulp-postcss'),
		notify			 = require('gulp-notify');

var EXPRESS_PORT = 4000;
var DIR = 'template';

var files = {
		html: DIR + '**/*.html'
};

var filesInput = {
	js: 'js/*.js',
	css: 'sass/**/*.scss'
};

var filesOutput = {
	js: './dist/js',
	css: './dist/css'
};


gulp.task('server', function(done) {
  var express = require('express');
  var app = express();

	app.use(express.static(__dirname + '/' + DIR));

	var serve = app.listen(EXPRESS_PORT, function () {
     done();
		 var host = serve.address().address;
	   console.log('Server up listening at http://%s:%s', host, EXPRESS_PORT);
  });

});

gulp.task('styles', function() {

	var processors = [
		autoprefixer({ browsers: [
			'> 1%',
      'last 2 versions',
      'firefox >= 4',
      'safari 7',
      'safari 8',
      'IE 8',
      'IE 9',
      'IE 10',
      'IE 11'
		] }),
    mqpacker,
		csswring
	];

	gulp.src(filesInput.css)
		.pipe(plumber())

		//compass
		.pipe(compass({
      // config: './config.rb',
			css: filesOutput.css,
			sass: filesOutput.sass
    }))

		//compile
		.pipe(sourcemaps.init())
			.pipe(postcss(processors))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(filesOutput.css))
		//live reload
		.pipe(livereload());

});


// Scripts
// Uglifies js scripts
gulp.task('scripts', function() {

	gulp.src(filesInput.js)
		.pipe(plumber())

		.pipe(rename({
			suffix: '.min'
		}))

		.pipe(sourcemaps.init())
		  .pipe(uglify())
		.pipe(sourcemaps.write('.'))

		.pipe(gulp.dest(filesOutput.js))
		.pipe(livereload());

});

gulp.task('html', function() {
  gulp.src(files.html)
    .pipe(livereload());
});

gulp.task('watch', function() {

	gulp.watch(filesInput.js, ['scripts']);
	gulp.watch('./config.rb', ['styles']);
	gulp.watch('./sass/**/*', ['styles']);
	gulp.watch(files.html, ['html']);

	livereload.listen();
});

gulp.task('default', ['scripts', 'styles', 'html', 'server', 'watch']);
