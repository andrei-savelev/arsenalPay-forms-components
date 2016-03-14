const es          = require('event-stream');
const gulp        = require('gulp');
const jade        = require('gulp-jade');
const sass        = require('gulp-sass');
const gutil       = require('gulp-util');
const rename      = require('gulp-rename');
const source      = require('vinyl-source-stream');
const gulpIf      = require('gulp-if');
const uglify      = require('gulp-uglify');
const cssmin      = require('gulp-cssnano');
const plumber     = require('gulp-plumber');
const postcss     = require('gulp-postcss');
const prefixer    = require('autoprefixer');
const babelify    = require('babelify');
const gulpConfig  = require('./config.gulp');
const browserify  = require('browserify');
const sourcemaps  = require('gulp-sourcemaps');
const browserSync = require('browser-sync');
const reload      = browserSync.reload;

// run server
gulp.task('webserver', function () {
    browserSync( gulpConfig.browserSyncConfig );
});

gulp.task('js:build', function () {
    var files = gulpConfig.src.js;

    var tasks = files.map(function (entry) {
        var outputFile = entry.split('/').pop();

        return browserify({
            entries: entry,
            extensions: ['.jsx'],
            debug: true
        }).transform( 'babelify', {presets: ['es2015', 'react']} )
            .bundle()
            .pipe( plumber() )
            .pipe( source(outputFile) )
            .pipe(rename({
                extname: '.bundle.js'
            }))
            .pipe( plumber.stop() )
            .pipe( uglify() )
            .pipe( gulp.dest(gulpConfig.build.js) )
            .pipe( reload( {stream: true} ) );
    });

    return es.merge.apply(null, tasks);
});

gulp.task('style:build', function (done) {
    gulp.src(gulpConfig.src.style)
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss([
            prefixer({
                browsers: ['last 2 versions']
            })
        ]))
        .pipe(cssmin())
        .pipe(plumber.stop())
        .pipe(gulp.dest(gulpConfig.build.css))
        .pipe(reload({stream: true}));
    done();
});

gulp.task('html:build', function(done) {
    var YOUR_LOCALS = {};

    gulp.src( gulpConfig.src.html )
        .pipe(jade({
            locals: YOUR_LOCALS
        }))
        .on('error',gutil.log)
        .pipe( gulp.dest(gulpConfig.build.html) )
        .pipe( reload({stream: true}) );
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
