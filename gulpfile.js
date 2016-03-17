'use strict';

const gulp          = require('gulp');
const path          = require('path');
const jade          = require('gulp-jade');
const sass          = require('gulp-sass');
const gutil         = require('gulp-util');
const img64         = require('gulp-img64');
const named         = require('vinyl-named');
const gulpIf        = require('gulp-if');
const notify        = require('gulp-notify');
const uglify        = require('gulp-uglify');
const cssmin        = require('gulp-cssnano');
const plumber       = require('gulp-plumber');
const postcss       = require('gulp-postcss');
const prefixer      = require('autoprefixer');
const gulpConfig    = require('./config.gulp');
const sourcemaps    = require('gulp-sourcemaps');
const browserSync   = require('browser-sync');
const reload        = browserSync.reload;
const webpackStream = require('webpack-stream');
const webpack       = webpackStream.webpack;

const isDevelopment = !process.env.NODE_ENV || !process.env.NODE_ENV == 'development';

/**
 * Запуск сервера с liveReload
 */
gulp.task('webserver', function () {
    browserSync( gulpConfig.browserSyncConfig );
});

/**
 * Задача для сборки и минификации js
 */
gulp.task('js:build', function () {

    var options = {
        // watch: isDevelopment,
        devtool: null,
        module: {
            loaders: [
                {
                    test: /\.jsx?$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel-loader'
                },
                {
                    test: /\.(png|jpg|gif)$/,
                    loader: "url-loader"
                }
            ]
        },
        plugins: new webpack.NoErrorsPlugin()
    };

    return gulp.src( gulpConfig.src.js )
        .pipe(plumber())
        .pipe(named())
        .pipe(webpackStream( options ))
        .pipe(uglify())
        .pipe( plumber.stop() )
        .pipe(gulp.dest(gulpConfig.build.js))
        .pipe(reload({stream: true}));
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
        .pipe( plumber() )
        .pipe(jade({
            locals: YOUR_LOCALS
        }))
        .pipe(img64())
        .pipe( plumber.stop() )
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
