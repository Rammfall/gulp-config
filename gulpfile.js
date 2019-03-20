const autoprefixer = require('autoprefixer');
const browser = require('browser-sync');
const cssnano = require('cssnano');
const del = require('del');
const gulp = require('gulp');
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
const rename = require('gulp-rename');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const development = !process.argv.includes('--prod');

console.log('development', development);

//Enter syntax sass or scss

let syntax = 'less';

let preprocessors = {
  sass: sass().on('error', sass.logError),
  scss: sass().on('error', sass.logError),
  less: less()
};

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
    watcher: directories.src + 'js/**/*.*',
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
  return gulp.src(path.css.src)
    .pipe(gulpif(development, sourceMap.init()))
    .pipe(preprocessors[syntax])
    .pipe(mmq())
    .pipe(gulpif(development, postcss([autoprefixer]), postcss([autoprefixer, cssnano])))
    .pipe(gulpif(development, sourceMap.write()))
    .pipe(gulpif(development, gulp.dest(path.css.dev), gulp.dest(path.css.public)))
    .pipe(gulpif(development, browser.stream()))
}

//LINTER IS DEVELOP

function linter() {
  return gulp.src(path.css.watcher)
    .pipe(postcss(linter('./stylelint.config.js')));
}

//JS TASK

function JS() {
  return gulp.src(path.js.src)
    .pipe(webpackStream({
      output: {
        path: development ? __dirname + '/app/dev/js/' : __dirname + '/app/public/js/',
        filename: development ? 'main.js' : 'main.min.js',
      },
      devtool: development ? 'source-map' : '',
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
      plugins: [
        new webpack.optimize.UglifyJsPlugin({
          include: /\.min\.js$/,
          minimize: true
        }),
        new HtmlWebpackPlugin({
          inject: true,
          filename: './../index.html',
          template: './app/src/index.html'
        })
      ],
    }))
    .pipe(gulpif(development, gulp.dest(path.js.dev), gulp.dest(path.js.public)))
}

//OPTIMIZE IMAGE TASK

function optimizeImages() {
  return gulp.src(path.images.src)
    .pipe(gulpif(!development, image()))
    .pipe(gulpif(development, gulp.dest(path.images.dev), gulp.dest(path.images.public)))
}

//OPTIMIZE ICONS

function optimizeSVG() {
  return gulp.src(path.svg.src)
    .pipe(gulpif(!development, svgmin()))
    .pipe(gulpif(development, gulp.dest(path.svg.dev), gulp.dest(path.svg.public)));
}

//FONT TASK

function font() {
  return gulp.src(path.fonts.src)
    .pipe(gulpif(development, gulp.dest(path.fonts.dev), gulp.dest(path.fonts.public)));
}

//HTML MINIFICATION TASK

function htmlMin() {
  return gulp.src(path.html.src)
    .pipe(gulpif(!development, html({collapseWhitespace: true} )))
    .pipe(gulpif(development, gulp.dest(path.html.public), gulp.dest(path.html.public)));
}

//CLEAN DIRECTORIES

function clean() {
  return del(['public/**/']);
}

function watch() {
  gulp.watch(path.css.watcher, CSS);
  gulp.watch(path.js.watcher, JS);
  gulp.watch(path.html.src, htmlMin);
}

function browserSync() {
  browser.init({
    server: directories.dev
  });

  gulp.watch(path.html.src).on("change", browser.reload);
  gulp.watch(path.js.src).on("change", browser.reload);
}

let beforeServer = gulp.parallel(CSS, JS, optimizeImages, optimizeSVG, font);
let dev = development ? gulp.series(beforeServer, gulp.parallel(browserSync, watch)) : beforeServer;

//exports['name task for call in cli'] = nameFunctionTask

exports.default = dev;