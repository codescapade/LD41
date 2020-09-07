var gulp = require('gulp');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var typescript = require('gulp-typescript');
var livereload = require('gulp-livereload');
var browserify = require('browserify');
var watchify = require('watchify');
var tsify = require('tsify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var paths = {
  pages: ['src/*.html'],
  libs: ['src/libs/phaser.min.js'],
  assets: ['src/assets/**/*']
};

var watchedBrowserify = watchify(
  browserify({
    basedir: '.',
    debug: true,
    entries: ['src/main.ts'],
    cache: {},
    packageCache: {}
  })
  .plugin(tsify)
)
.transform('babelify', {
  presets: ['es2015'],
  extensions: ['.ts']
});

function bundle () {
  return watchedBrowserify
      .bundle()
      .on('error', function (err) {
        gutil.log('Browserify error:', err);
        this.emit('end');
      })
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('dist'))
      .pipe(livereload({ start: true }));
}

gulp.task('copy-html', function () {
  return gulp.src(paths.pages)
      .pipe(gulp.dest('dist'));
});

gulp.task('copy-libs', function () {
  return gulp.src(paths.libs)
      .pipe(gulp.dest('dist/libs'));
});

gulp.task('copy-assets', function () {
  return gulp.src(paths.assets)
      .pipe(gulp.dest('dist/assets'));
});

gulp.task('copy', gulp.series('copy-html', 'copy-libs', 'copy-assets'));
gulp.task('watch', gulp.series('copy-html', 'copy-libs', 'copy-assets'), bundle);
watchedBrowserify.on('update', bundle);
watchedBrowserify.on('log', gutil.log);
watchedBrowserify.on('error', gutil.log);