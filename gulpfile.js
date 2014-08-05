var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');
var gulpMultinject = require('gulp-multinject');
var gulpif = require('gulp-if');
var rename = require("gulp-rename");
var gutil = require('gulp-util');
var browserify = require('gulp-browserify');
var compass = require('gulp-compass');
var wait = require('gulp-wait');
var watch = require('gulp-watch');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var reactify = require('reactify');


var js_build_name = 'build';
var css_build_name = 'build';
var develop = false;
var distFolder = 'dist';

gulp.task('clean', function () {
    return gulp.src(['./' + distFolder + '/**'], {
        read: false
    }).pipe(clean());
});

gulp.task('fonts', function () {
    return gulp.src(['./src/fonts/**']).pipe(gulp.dest(distFolder + '/public/css/fonts/'));
});

gulp.task('favicon', function () {
    return gulp.src(['./src/favicon.ico']).pipe(gulp.dest(distFolder + '/public'));
});


gulp.task('img', function () {
    return gulp.src(['./src/img/**']).pipe(gulp.dest(distFolder + '/public/img'));
});

gulp.task('layout', function () {
    return gulp.src(['./src/layout.jade'])
        .pipe(gulpMultinject([
                'js/' + js_build_name + '.js',
            ],
            'body'
        ))
        .pipe(gulpMultinject([
                'css/' + css_build_name + '.css',
            ],
            'head'
        ))

    .pipe(gulp.dest(distFolder));
});


gulp.task('browser_scripts', function () {

    if (!develop) {
        js_build_name = 'build_' + (new Date()).getTime();
    }

    return gulp.src('./src/js/browser/app.js', {
        read: false
    }).pipe(browserify({
        ignore: [
            './lib-cov/ajax',
            './lib-cov/validators',
            'modella-mongo',
            'modella-resource',
            'node-jsx',
            // 'emitter'
        ],
        transform: ['reactify'],
        shim: {
            isArray: {
                path: 'components/yields-isarray/index.js',
                exports: 'isArray'
            },
            props: {
                path: 'components/component-props/index.js',
                exports: null
            },
            emitter: {
                path: 'node_modules/emitter-component/index.js',
                exports: null
            },
            'is-browser': {
                path: 'node_modules/is-browser/client.js',
                exports: null
            }

        },
        debug: false
    }))
        .pipe(rename(js_build_name + '.js'))
        .pipe(gulp.dest('./' + distFolder + '/public/js'));
});

gulp.task('styles', function () {

    if (!develop) {
        css_build_name = 'build_' + (new Date()).getTime();
    }

    return gulp.src('./src/scss/styles.scss')
        .pipe(compass({
            config_file: './config.rb',
            sass: './src/scss',
            css: './dist/public/css'
        }))
        .pipe(rename(css_build_name + '.css'))
        .pipe(gulp.dest('./' + distFolder + '/public/css'));

});

gulp.task('nodemon', function () {
    nodemon({
        script: 'src/js/server/app.js',
        // ext: 'js css html',
        //watch: ['dist/**/*']
    });
});

gulp.task('watch_browser_scripts', function () {
    gulp.watch(['./src/js/browser/**/*', './src/js/shared/**/*'], ['browser_scripts']);
});

gulp.task('watch_styles', function () {
    gulp.watch('./src/scss/**/*', ['styles']);
});

gulp.task('watch_layout', function () {
    gulp.watch('./src/layout.jade', ['layout']);
});

gulp.task('watch_builded', function () {
    var server = livereload();
    gulp.watch('./dist/public/**/*').on('change', function (file) {
        setTimeout(function () {
            server.changed(file.path);
        }, 500);
    });
});

gulp.task('default', function () {
    develop = true;
    runSequence('build', 'nodemon', ['watch_browser_scripts', 'watch_styles', 'watch_layout', 'watch_builded'])
});

gulp.task('build', function (cb) {
    runSequence('clean', ['fonts', 'img', 'favicon', 'styles', 'browser_scripts', 'layout'], cb);
});
