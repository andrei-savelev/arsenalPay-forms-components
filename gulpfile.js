const gulp = require('gulp');
const jade = require('gulp-jade');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const browserify = require('browserify');
const babelify = require('babelify');
const browserSync = require('browser-sync');
const gulpConfig = require('config.gulp');

// run server
gulp.task('webserver', function () {
    browserSync(gulpConfig.browserSyncConfig);
});

gulp.task('build:js', function (done) {
    browserify({entries: gulpConfig.src.js, extensions: ['.jsx'], debug: true})
        .transform('babelify', {presets: ['es2015', 'react']})
        .bundle()
        .on('error',gutil.log)
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(gulpConfig.build.js));
    done()
});

gulp.task('style:build', function (done) {
    gulp.src(gulpConfig.src.style)
        .pipe(plumber())
        .pipe(sass())
        .on('error',gutil.log)
        .pipe(postcss( prefixer({
            browsers: ['last 2 versions']
        }) ))
        .pipe(cssmin())
        .pipe(plumber.stop())
        .pipe(gulp.dest(gulpConfig.build.css))
        .pipe(reload({stream: true}));
    done();
});

gulp.task('build:html', function(done) {
    var YOUR_LOCALS = {};

    gulp.src(gulpConfig.src.html)
        .pipe(jade({
            locals: YOUR_LOCALS
        }))
        .on('error',gutil.log)
        .pipe(gulp.dest(gulpConfig.build.html));
    done();
});

gulp.task('build', [
    'js:build',
    'style:build',
    'html:build'
]);

gulp.task('watch', function(done){
    gulp.watch([gulpConfig.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    gulp.watch([gulpConfig.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    gulp.watch([gulpConfig.watch.js], function(event, cb) {
        gulp.start('js:build');
    });

    done();
});

gulp.task('default', ['build', 'webserver', 'watch']);