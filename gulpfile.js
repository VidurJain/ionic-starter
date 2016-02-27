var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var templateCache = require("gulp-angular-templatecache");
var rename = require('gulp-rename');
var sh = require('shelljs');

var jsRoot = "www/js/";
var angularRoot = jsRoot + 'angular/';

var paths = {
  sass: ['./scss/**/*.scss'],
  scriptsAngularPath : [
      angularRoot + 'app.js',
      angularRoot + 'app.config.js',
      angularRoot + 'controllers/**/*.js',
      angularRoot + 'directives/**/*.js',
      angularRoot + 'services/**/*.js'
  ],
  angularTemplates : [
    angularRoot + 'views/**/*.html'
  ]
};

gulp.task('default', ['sass', 'scriptsAngular', 'angularTemplates']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('scriptsAngular', function () {
    gulp.src(paths.scriptsAngularPath)
        .pipe(concat('angular-app.js'))
        .pipe(gulp.dest('www/js/'))
});

gulp.task('angularTemplates', function () {
  gulp.src(paths.angularTemplates)
    .pipe(templateCache('templates.js', { module:'templates', standalone:true, root: 'templates/'}))
    .pipe(gulp.dest('www/js/'))
    //.pipe(uglify())
    //.on('error', onError)
    //.pipe(rename({ extname: '.min.js' }))
    //.pipe(gulp.dest('./static/js/'));
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.scriptsAngularPath, ['scriptsAngular']);
  gulp.watch(paths.angularTemplates, ['angularTemplates']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
