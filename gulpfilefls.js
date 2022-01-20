const dist = "dist";
const src = "src";

const path = {
    build: {
        html: dist + "/",
        css: dist + "/css",
        js: dist + "/js",
        img: dist + "/img",
        fonts: dist + "/fonts"
    },
    src: {
        html: src + "/*.html",
        css: src + "/scss/style.scss",
        js: src + "/js/script.js",
        img: src + "/img/**/*.{jpg, png, svg, gif, ico, webp}",
        fonts: src + "/fonts/*.ttf"
    },
    watch: {
        html: src + "/**/*.html",
        css: src + "/scss/**/*.scss",
        js: src + "/js/**/*.js",
        img: src + "/img/**/*.{jpg, png, svg, gif, ico, webp}"
    },
    clean: "./" + dist + "/"
};

const {srcc, dest} = require('gulp'),
    gulp = require('gulp'),
    browsersync = require("browser-sync").create();

function browserSync(params) {
    browsersync.init({
        server: {
            baseDir: "./" + dist + "/"
        },
        port: 4000,
        notify: false
    });
}

function html() {
    return src(path.src.html)
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream());
}

const build = gulp.series(html);
const watch = gulp.parallel(build, browserSync);

exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;


