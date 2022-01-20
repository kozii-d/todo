const {
    src,
    dest,
    parallel,
    series,
    watch
} = require('gulp');

const browsersync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const del = require('del');
const webpack = require('webpack-stream');



const dist = "./dist";

function copyHtml() {
    return src('./src/index.html')
    .pipe(dest(dist))
    .pipe(browsersync.stream());
}

function buildScss() {
    return src("./src/scss/style.scss")
    .pipe(sass())
    .pipe(dest(dist))
    .pipe(browsersync.stream());
}

function buildJS() {
    return src("./src/js/main.js")
    .pipe(webpack({
        mode: 'development',
        output: {
            filename: 'script.js'
        },
        watch: false,
        devtool: "source-map",
        module: {
            rules: [
              {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: [['@babel/preset-env', {
                        debug: true,
                        corejs: 3,
                        useBuiltIns: "usage"
                    }]]
                  }
                }
              }
            ]
          }
    }))
    .pipe(dest(dist))
    .on("end", browsersync.reload);
}

function watchFiles () {
    browsersync.init({
        server: {
            baseDir: './dist/'
        },
        port: 4000,
        notify: true
    });
    watch('./src/scss/**/*.scss', buildScss);
    watch('./src/**/*.js', buildJS);
    watch('src/**/*.html', copyHtml);
}


function prodScss() {
    return src("./src/scss/style.scss")
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 10 versions'],
        grid: true,
        cascade: false
    }))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(dest('dist'));
}

function prodJS() {
    return src("./src/js/main.js")
    .pipe(webpack({
        mode: 'production',
        output: {
            filename: 'script.js'
        },
        module: {
            rules: [
              {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: [['@babel/preset-env', {
                        corejs: 3,
                        useBuiltIns: "usage"
                    }]]
                  }
                }
              }
            ]
          }
    }))
    .pipe(dest('dist'));
}

function cleanDist() {
    return del('dist/**', {force: true});
}

exports.prod = series(cleanDist, copyHtml, parallel(prodScss, prodJS));
exports.default = parallel(watchFiles, parallel(copyHtml, buildScss, buildJS));