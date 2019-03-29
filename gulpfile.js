const autoprefixer = require('autoprefixer');
const browser = require('browser-sync');
const cssnano = require('cssnano');
const del = require('del');
const {src, dest, watch, parallel, series} = require('gulp');
const html = require('gulp-htmlmin');
const image = require('gulp-image');
const mmq = require('gulp-merge-media-queries');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const sourceMap = require('gulp-sourcemaps');
const svgmin = require('gulp-svgmin');
const babel = require('gulp-babel');
const stylelint = require('stylelint');
const gulpif = require('gulp-if');
const less = require('gulp-less');

const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


const development = !process.argv.includes('--prod');



console.log('development', development);

//Enter syntax sass or scss

let syntax = 'scss';


//Write path to scripts-files in array which will be concat

let lpName = '';
let directories = {
  src: "./app/src/",
  dev: "./app/dev/",
  public: "./app/public/"
};

//PATH TO FILES
let path = {
  css: {
    src: directories.src + 'styles/main.' + syntax,
    watcher: directories.src + 'styles/*.' + syntax,
    dev: directories.dev + 'styles/',
    public: directories.public + 'styles'
  },
  images: {
    src: directories.src + 'images/**/*.*',
    dev: directories.dev + 'images/',
    public: directories.public + 'images/'
  },
  svg: {
    src: directories.src + 'icons/**/*.svg',
    dev: directories.dev + 'icons/',
    public: directories.public + 'icons/'
  },
  js: {
    watcher: directories.src + 'js/**/*.js',
    src: directories.src + 'js/main.js',
    dev: directories.dev + 'js/',
    public: directories.public + 'js/'
  },
  fonts: {
    src: directories.src + 'fonts/**/*.*',
    dev: directories.dev + 'fonts/',
    public: directories.public + 'fonts/'
  },
  html: {
    src: directories.src + '*.html',
    dev: directories.dev,
    public: directories.public
  }
};

//CSS TASK

function CSS() {

  let preprocessors = {
    sass:  sass().on('error', sass.logError),
    scss:  sass().on('error', sass.logError),
    less:  less()
  };

  return src(path.css.src)
    .pipe(gulpif(development, sourceMap.init()))
    .pipe(preprocessors[syntax])
    .pipe(mmq())
    .pipe(gulpif(development, postcss([autoprefixer]), postcss([autoprefixer, cssnano])))
    .pipe(gulpif(development, sourceMap.write()))
    .pipe(gulpif(development, dest(path.css.dev), dest(path.css.public)))
    .pipe(gulpif(development, browser.stream()))
}

//LINTER IS DEVELOP

function linter() {
  return src(path.css.watcher)
    .pipe(postcss(linter('./stylelint.config.js')));
}

//JS TASK

function JS() {
  return src(path.js.src)
    .pipe(webpackStream({
      output: {
        path: development ?  __dirname + directories.dev + 'js/' : __dirname + directories.public + 'js/',
        filename: 'main.js',
      },
      devtool: development ? 'source-map' : '',
      module: {
        rules: [
          {
            test: /\.(js)$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            query: {
              presets: ['@babel/env']
            }
          }
        ]
      },
      optimization: {
        minimizer: [
            new UglifyJsPlugin({
            test: /\.js(\?.*)?$/i,
            sourceMap: true,
            extractComments: true
          })
        ],
      },
    }))
    .pipe(gulpif(development, dest(path.js.dev), dest(path.js.public)))
}

//OPTIMIZE IMAGE TASK

function optimizeImages() {
  return src(path.images.src)
    .pipe(gulpif(!development, image()))
    .pipe(gulpif(development, dest(path.images.dev), dest(path.images.public)))
}

//OPTIMIZE ICONS

function optimizeSVG() {
  return src(path.svg.src)
    .pipe(gulpif(!development, svgmin()))
    .pipe(gulpif(development, dest(path.svg.dev), dest(path.svg.public)));
}

//FONT TASK

function font() {
  return src(path.fonts.src)
    .pipe(gulpif(development, dest(path.fonts.dev), dest(path.fonts.public)));
}

//HTML MINIFICATION TASK

function htmlMin() {
  return src(path.html.src)
    .pipe(gulpif(!development, html({collapseWhitespace: true} )))
    .pipe(gulpif(development, dest(path.html.dev), dest(path.html.public)));
}

//CLEAN DIRECTORIES

function clean() {
  return del(['public/**/']);
}

function watchers() {
  watch(path.css.watcher, CSS);
  watch(path.js.watcher, JS);
  watch(path.html.src, htmlMin);
}

function browserSync() {
  browser.init({
    server: directories.dev
  });

  watch(path.html.src).on("change", browser.reload);
  watch(path.js.watcher).on("change", browser.reload);
}

let beforeServer = parallel(htmlMin, CSS, JS, optimizeImages, optimizeSVG, font);
let dev = development ? series(beforeServer, parallel(browserSync, watchers)) : beforeServer;

//exports['name task for call in cli'] = nameFunctionTask

exports.default = dev;