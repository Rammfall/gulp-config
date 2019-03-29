const autoprefixer = require('autoprefixer'),
  browser = require('browser-sync'),
  concat = require('gulp-concat'),
  cssnano = require('cssnano'),
  del = require('del'),
  gulp = require('gulp'),
  html = require('gulp-htmlmin'),
  image = require('gulp-image'),
  mmq = require('gulp-merge-media-queries'),
  postcss = require('gulp-postcss'),
  sass = require('gulp-sass'),
  sourceMap = require('gulp-sourcemaps'),
  uglify = require('gulp-uglify-es').default,
  svgmin = require('gulp-svgmin'),
  babel = require('gulp-babel'),
  stylelint = require('stylelint');


const webpack = require('webpack');
const webpackStream = require('webpack-stream');

//Enter syntax sass or scss
let syntax = 'scss';

//Write path to scripts-files in array which will be concat

let base = 'front-dev/';

//PATH TO FILES
let path = {
  css: {
    input: base + syntax + '/main.' + syntax,
    watcher: base + syntax + '/**/*.' + syntax,
    dev: base + 'css/',
    public: 'public/css'
  },
  images: {
    dev: base + 'img/**/*.*',
    public: 'public/img/'
  },
  svg: {
    dev: base + 'icons/**/*.svg',
    public: 'public/icons/'
  },
  js: {
    input: base + 'scripts/main.js',
    dev: base + 'js',
    public: 'public/js',
    watcher: base + 'scripts/**/*.js'
  },
  fonts: {
    dev: base + 'fonts/**/*.*',
    public: 'public/fonts/'
  },
  html: {
    dev: base + '*.html',
    public: 'public/'
  }
};


//CSS TASKS

//CSS task with source maps
function devCSS() {
  return gulp.src(path.css.input)
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(mmq())
    .pipe(postcss([autoprefixer, cssnano]))
    .pipe(gulp.dest(path.css.dev))
    .pipe(browser.stream());
}

function linter() {
  return gulp.src(path.css.watcher)
    .pipe(postcss(linter('./stylelint.config.js')));
}

//CSS task without source maps
function publicCSS() {
  return gulp.src(path.css.input)
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(postcss([autoprefixer, cssnano]))
    .pipe(mmq({log: true}))
    .pipe(gulp.dest(path.css.public));
}

//JS task with source maps
function devJS() {
  return gulp.src(path.js.input)
    .pipe(webpackStream({
      output: {
        filename: 'main.js',
      },
      module: {
        rules: [
          {
            test: /\.(js)$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            query: {
              presets: ['env']
            }
          }
        ]
      },
    }))
    .pipe(gulp.dest(path.js.dev));
}

function publicJS() {
  return gulp.src(path.js.input)
    .pipe(webpackStream({
      output: {
        filename: 'main.js',
      },
      module: {
        rules: [
          {
            test: /\.(js)$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            query: {
              presets: ['env']
            }
          }
        ]
      },
    }))
    .pipe(gulp.dest(path.js.dev));
}

//Optimize images
function optimizeImages() {
  return gulp.src(path.images.dev)
    .pipe(image())
    .pipe(gulp.dest(path.images.public));
}

//Optimize svg
function optimizeSVG() {
  return gulp.src(path.svg.dev)
    .pipe(svgmin())
    .pipe(gulp.dest(path.svg.public));
}

//Copy fonts in public folder
function font() {
  return gulp.src(path.fonts.dev)
    .pipe(gulp.dest(path.fonts.public));
}

//HTML minification for public folder
function htmlMin() {
  return gulp.src(path.html.dev)
    .pipe(html())
    .pipe(gulp.dest(path.html.public));
}

//Before new build clean public folder
function clean() {
  return del(['public/**/']);
}

function watch() {
  gulp.watch(path.css.watcher, devCSS);
  gulp.watch(path.js.watcher, devJS);
}

function browserSync() {
  browser.init({
    server: "./app/"
  });

  gulp.watch(path.html.dev).on("change", browser.reload);
  gulp.watch(path.js.watcher).on("change", browser.reload);
}

let build = gulp.series(clean, gulp.parallel(publicCSS, publicJS, font, optimizeImages, optimizeSVG, htmlMin));
let beforeServer = gulp.parallel(devCSS, devJS);
let dev = gulp.series(beforeServer, gulp.parallel(browserSync, watch));

//exports['name task for call in cli'] = nameFunctionTask
exports.styles = devCSS;
exports.optimizeImages = optimizeImages;
exports.optimizeSVG = optimizeSVG;
exports.clean = clean;
exports.watch = watch;
exports.build = build;
exports.js = publicJS;

exports.default = dev;