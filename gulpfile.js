var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    htmlmin = require('gulp-htmlmin'),
    imagemin = require('gulp-imagemin'),
    compass = require('gulp-compass'),
    clean = require('gulp-clean'),
    runSequence = require('run-sequence');

var config = {
    'src': './src',
    'dest': './dist',
    'html': {
        'src': './src/*.html',
        'dest': './dist/'
    },
    'js': {
        'src': [
            './node_modules/jquery/dist/jquery.min.js',
            './node_modules/jquery-migrate/dist/jquery-migrate.min.js',
            './node_modules/slick-carousel/slick/slick.min.js',
            './src/js/lib/classie.js',
            './src/js/lib/borderMenu.js',
            './src/js/*.js'
        ],
        'dest': './dist/js'
    },

    'img': {
        'dest': './dist/images/',
        'src': './src/images/*'
    },

    'compass': {
        'dest': './dist/styles/css',
        'src': './src/styles/sass/*.scss'
    },
    'css': {
        'dest': './dist/styles/css/lib',
        'src': './src/styles/css/lib/*.css'
    },

    'font': {
        'dest': './dist/styles/fonts',
        'src': './src/styles/fonts/**/*'
    }
};


gulp.task('minify:html', function () {
    return gulp.src(config.html.src)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(config.html.dest));
});


gulp.task('minify:img', function () {
        return gulp.src(config.img.src)
            .pipe(imagemin())
            .pipe(gulp.dest(config.img.dest));
    }
);

gulp.task('compass', function () {
    gulp.src(config.compass.src)
        .pipe(compass({
            config_file: './src/styles/config.rb',
            css: './src/styles/css',
            sass: './src/styles/sass'
        }))
        .pipe(autoprefixer({
            browsers: '> 5%'
        }))
        .pipe(cssnano())
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest(config.compass.dest));
});

gulp.task('minify:js', function () {
    return gulp.src(config.js.src)
        .pipe(concat('app.min.js'))
        .pipe(uglify().on('error', function (e) {
            console.log(e);
        }))
        .pipe(gulp.dest(config.js.dest));
});

gulp.task('clean', function () {
    return gulp.src(config.dest, {read: false})
        .pipe(clean());
});


gulp.task('font', function () {
    return gulp.src(config.font.src)
        .pipe(gulp.dest(config.font.dest));
});

// Clean first than other tasks;

gulp.task('build', function () {
    runSequence(['clean'],
        ['minify:html', 'minify:img', 'compass', 'minify:js', 'font']
    )
});


// ------------------------------------------------------------------
// ------------------------------------------------------------------
