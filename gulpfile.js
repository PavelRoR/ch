var gulp = require('gulp'),
//	pug = require('gulp-pug'),
	autoprefixer = require('autoprefixer'),
	cssnext = require('cssnext'),
	precss = require('precss'),
	postcss = require('gulp-postcss'),
	watch = require('gulp-watch'),
	browserSync = require('browser-sync').create(),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	styl = require('gulp-stylus'),
	 validator = require('gulp-html'),
	imagemin = require('gulp-imagemin'),
	rigger = require('gulp-rigger'),
//	 htmlmin = require('gulp-htmlmin'),
	varuncss = require('gulp-uncss'),
	nano = require('gulp-cssnano'),
	uncss = require('gulp-uncss');

gulp.task('html', function () {
	return gulp.src('app/html/*.html')
		.pipe(rigger())
		.pipe(gulp.dest('app/'))
		.pipe(browserSync.reload({
			stream: true
		}))
});

//gulp.task('minify', function () {
//	return gulp.src('app/index.html')
//		.pipe(htmlmin({
//			collapseWhitespace: true
//		}))
//		.pipe(gulp.dest('dist/'))
//});

// gulp.task('pug', function buildHTML() {
//     return gulp.src('app/pug/index.pug')
//         .pipe(pug())
//         .pipe(gulp.dest('app/'))
//         .pipe(gulp.dest('dist/'))
//         .pipe(browserSync.reload({ stream: true }))
// });

 gulp.task('styl', function() {
     return gulp.src('app/styl/*.styl')
         .pipe(styl({
             compress: true
         }))
         .pipe(gulp.dest('app/css'))
         .pipe(browserSync.reload({ stream: true }))
 });

gulp.task('cssconcat', function () {
	return gulp.src('app/css/*.css')
		 .pipe(concat('styles.css'))
		 .pipe(uncss({
		     html: ['index.html', 'app/index.html']
		 }))
		.pipe(nano())
		.pipe(gulp.dest('dist/css'))
});

gulp.task('css', function () {
	var processors = [
        autoprefixer({
			browsers: ['last 9 versions']
		}),
        cssnext,
        precss
    ];
	return gulp.src('app/css/*.css')
		.pipe(postcss(processors))
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.reload({
			stream: true
		}))
});

gulp.task('watch', ['browser-sync', 'css', 'html', 'styl','scripts'], function () {
	 gulp.watch('app/html/*.html', ['html'])
	gulp.watch('app/css/*.css', ['css'], browserSync.reload)
	 gulp.watch('app/styl/*.styl', ['styl'])
	gulp.watch('app/js/*.js', browserSync.reload)
});


gulp.task('browser-sync', function () {
	browserSync.init({
		server: {
			baseDir: "app"
		}
	});
});

gulp.task('scripts', function () {
	return gulp.src('app/js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'))
	.pipe(browserSync.reload({ stream: true }))
});

 gulp.task('fonts', function() {
     gulp.src('app/fonts/*')
         .pipe(gulp.dest('dist/fonts'))
 });


gulp.task('image', function () {
	gulp.src('app/img/*')
		 .pipe(imagemin({
		     progressive: true,
		     svgoPlugins: [{ removeViewBox: false }],
		     interlaced: true,
		     optimizationLevel: 3
		 }))
		.pipe(gulp.dest('dist/img'))
		.pipe(browserSync.reload({
			stream: true
		}))
	gulp.watch('app/img/*', ['image'])
});


gulp.task('default', ['cssconcat', 'css', 'watch', 'browser-sync', 'scripts', 'image', 'fonts', 'html']);