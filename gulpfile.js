/**
 * @author  : RAMGOLAM Sandeep
 * @date    : 09-09-2016
 */

var gulp = require('gulp');

/**
 * Import Dependencies
 *
 * */
var clean           = require('gulp-clean');
var concat          = require('gulp-concat');
var sass            = require('gulp-sass');
var runSequence     = require('run-sequence');
var rename          = require('gulp-rename');

/**
 * Define all Paths
 * */
var bases = {
    src: './.src/',
    dist: '../assets/'
};

var paths = {
    script: [

    ],
    scss : [
        '/scss/**/*.scss'
    ],
    css : [
        //'css/normalize.min.css',
        'css/compiled.css'
    ]
};



/**
 * @name Clean
 * @description
 * Deletes everything in the 'distribution' directory. Usually used before the directory is populated
 * */
gulp.task('_clean', function () {
    return gulp.src(bases.dist + 'js')
        .pipe(clean());
});
/**
 * @name Package
 * @description
 * Cleans the distribution directory and populates it again. *
 * */
gulp.task('default', ['_clean', '_concatcss']);

/*
 * Run Sequence
 */

function cb(){
    console.log('COMPLETED');
}

/*
 * 1. Run sass compiler
 * 2. Contactenate all css files of the project in specific sequence
 * 3. Sanitize the media queries using mq Packer
 */

gulp.task('_compile_css', function () {

    return gulp.src(bases.src + paths.scss)
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(rename('compiled.css'))
        .pipe(gulp.dest(bases.src + 'css'));
});

gulp.task('_concatcss', function() {
    return gulp.src(paths.css, {cwd: bases.src})
        .pipe(concat('main.css'))
        .pipe(gulp.dest('./assets/css/'));
});

gulp.task('build_css', function(cb) {
    runSequence('_compile_css', '_concatcss', cb);
});

gulp.task('css:watch', function () {
    gulp.watch('./.src/scss/**/*.scss', ['build_css']);
});