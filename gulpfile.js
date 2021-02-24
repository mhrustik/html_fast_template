const gulp = require("gulp");
const gulp_concat = require("gulp-concat");
const gulp_autoprefixer = require("gulp-autoprefixer");
const gulp_clean_css = require("gulp-clean-css");
const sass = require("gulp-sass");
const gulp_uglify = require("gulp-uglify");
const del = require("del");
const browser_sync = require("browser-sync").create();
const gulp_imagemin = require('gulp-imagemin');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');
const imageminPngquant = require('imagemin-pngquant');

const css_files = [
    "./app/src/scss/*.scss"
];

const js_files = [
    "./app/src/js/jquery/dist/jquery.js",
    "./app/src/js/index.js"
];

const files = [
    "./app/*.html"
];

const fonts = [
    "./app/fonts/**/*"
];

const images = [
    "./app/images/*.jpg",
    "./app/images/*.jpeg",
    "./app/images/*.gif",
    "./app/images/*.png",
    "./app/images/*.svg"
];

//Development mode

function styles_dev() {
    return gulp.src(css_files)
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp_autoprefixer({
            overrideBrowserslist: ['last 4 versions'],
            cascade: false
        }))
        .pipe(gulp_concat("app.css"))
        .pipe(gulp_clean_css())
        .pipe(gulp.dest("./app/css"))
        .pipe(browser_sync.stream());
}

function scripts_dev() {
    return gulp.src(js_files)
        .pipe(gulp_concat("app.js"))
        .pipe(gulp_uglify({
            toplevel: true
        }))
        .pipe(gulp.dest("./app/js"))
        .pipe(browser_sync.stream());
}

function watch_dev() {
    browser_sync.init({
        server: {
            baseDir: "./app"
        }
    });

    gulp.watch("./app/src/scss/*.scss", styles_dev);
    gulp.watch("./app/src/js/**/*.js", scripts_dev);
    gulp.watch("./app/*.html").on('change', browser_sync.reload);
}

gulp.task("watch", gulp.parallel(styles_dev, scripts_dev, watch_dev));

//Production mode

function files_move() {
    return gulp.src(files)
        .pipe(gulp.dest("./build"))
}

function fonts_move() {
    return gulp.src(fonts)
        .pipe(gulp.dest("./build/fonts"))
}

function imagemin() {
    return gulp.src(images)
        .pipe(gulp_imagemin([
            gulp_imagemin.gifsicle({ interlaced: true, optimizationLevel: 5 }),
            gulp_imagemin.svgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false }
                ]
            }),
            imageminJpegRecompress({
                progressive: true,
                max: 80,
                min: 70
            }),
            imageminPngquant({ quality: '80' })
        ]))
        .pipe(gulp.dest("./build/images"))
        .pipe(browser_sync.stream());
}

function styles() {
    return gulp.src(css_files)
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp_autoprefixer({
            overrideBrowserslist: ['last 4 versions'],
            cascade: false
        }))
        .pipe(gulp_concat("app.css"))
        .pipe(gulp_clean_css())
        .pipe(gulp.dest("./build/css"))
        .pipe(browser_sync.stream());
}


function scripts() {
    return gulp.src(js_files)
        .pipe(gulp_concat("app.js"))
        .pipe(gulp_uglify({
            toplevel: true
        }))
        .pipe(gulp.dest("./build/js"))
        .pipe(browser_sync.stream());
}

function cleanBuild() {
    return del(["./build/*"])
}

gulp.task("styles", styles);
gulp.task("scripts", scripts);
gulp.task("build", gulp.series(cleanBuild, gulp.parallel(styles, scripts, files_move, fonts_move, imagemin)));