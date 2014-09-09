var gulp             = require('gulp'),
    compass          = require('gulp-compass'),
    autoprefixer     = require('gulp-autoprefixer'),
    minifycss        = require('gulp-minify-css'),
    concatcss       = require('gulp-concat-css'),
    uglify           = require('gulp-uglify'),
    rename           = require('gulp-rename'),
    concat           = require('gulp-concat'),
    notify           = require('gulp-notify'),
//    livereload       = require('gulp-livereload'),
    plumber          = require('gulp-plumber'),
    path             = require('path'),
    spritesmith      = require('gulp.spritesmith'),
    imagemin         = require('gulp-imagemin');



//the title and icon that will be used for the Grunt notifications
var notifyInfo = {
    title: 'Gulp',
    icon: path.join(__dirname, 'gulp.png')
};

//error notification settings for plumber
var plumberErrorHandler = { errorHandler: notify.onError({
    title: notifyInfo.title,
    icon: notifyInfo.icon,
    message: "Error: <%= error.message %>"
})};


var jsPath = "script";
var cssPath = "css";
var scssPath = "scss";
var imagePath = "img";
var imagedestPath = "build/img";


var paths = {
    sass : [scssPath + '/main.scss']
}


gulp.task('styles', function() {

    return gulp.src(paths.sass)
        .pipe(plumber(plumberErrorHandler))
        .pipe(compass({
            css: cssPath,
            sass: scssPath
        }))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest(cssPath))
        .pipe(concatcss('main.css'))
        .pipe(gulp.dest(cssPath + '/build'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest('build/css'));

});

gulp.task('minifycss', function() {
    return gulp.src(cssPath + '/*.css')
        .pipe(plumber(plumberErrorHandler))
        .pipe(minifycss())
        .pipe(gulp.dest('build/css'))
});


gulp.task('scripts', function() {
    return gulp.src(jsPath+'/*.js')
        .pipe(plumber(plumberErrorHandler))
        .pipe(concat('main.js'))
        .pipe(gulp.dest(jsPath))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('build/script'));
});

gulp.task('sprite', function () {
    var spriteData = gulp.src(imagePath+'/icons/*.png').pipe(spritesmith({
        imgName: 'icons.png',
        cssName: 'icons.css',
        algorithm: "binary-tree",
        engine: 'pngsmith',
        cssTemplate: 'icons.mustache',
        padding: 0
    }));
    spriteData.img.pipe(gulp.dest(imagePath));
    spriteData.css.pipe(gulp.dest(cssPath));

    var spriteData2 = gulp.src(imagePath+'/icons@2/*.png').pipe(spritesmith({
        imgName: 'icons@2.png',
        cssName: 'icons@2.css',
        algorithm: "binary-tree",
        engine: 'pngsmith',
        cssTemplate: 'icons.mustache',
        padding: 0
    }));
    spriteData2.img.pipe(gulp.dest(imagePath));
    spriteData2.css.pipe(gulp.dest(cssPath));
});


gulp.task('imagemin', function () {
    return gulp.src(imagePath+'/*.png')
        .pipe(imagemin({
            optimizationLevel: 3
        }))
        .pipe(gulp.dest(imagedestPath));
});

gulp.task('watch', function() {
    gulp.watch([scssPath + '/*.sass', scssPath + '/*.scss'], ['styles']);
    gulp.watch(imagePath + '/*', ['sprite']);
   gulp.watch(jsPath + '/*.js', ['scripts']);
});


gulp.task('build', ['styles', 'scripts', 'sprite']);
