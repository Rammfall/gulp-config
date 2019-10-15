const autoprefixer = require('autoprefixer');
const webpackStream = require('webpack-stream');
const browser = require('browser-sync');
const cssnano = require('cssnano');
const del = require('del');
const { src, dest, watch, parallel, series } = require('gulp');
const html = require('gulp-htmlmin');
const image = require('gulp-image');
const mmq = require('gulp-merge-media-queries');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const sourceMap = require('gulp-sourcemaps');
const gulpif = require('gulp-if');
// const less = require('gulp-less');
const webp = require('gulp-webp');

const webpackConfig = require('./webpack.config');
const { path, lpName, directories, syntax } = require('./pathes');

const development = !process.argv.includes('--prod');

// eslint-disable-next-line no-console
console.log('development', development);

// JS TASK
function JS() {
  return src(path.js.src)
    .pipe(webpackStream(webpackConfig(development, directories)))
    .on('error',  function handleError(err)  {
      console.log('WEBPACK ERROR', err);
      this.emit('end');
    })
    .pipe(gulpif(development, dest(path.js.dev), dest(path.js.public)))
}


//  CSS TASK

function CSS() {
  const preprocessors = {
    sass: sass().on('error', sass.logError),
    scss: sass().on('error', sass.logError)
    // less: less()
  };

  return src(path.css.src)
    .pipe(gulpif(development, sourceMap.init()))
    .pipe(preprocessors[syntax])
    .pipe(mmq())
    .pipe(
      gulpif(
        development,
        postcss([autoprefixer, require('webp-in-css/plugin')]),
        postcss([autoprefixer, cssnano])
      )
    )
    .pipe(gulpif(development, sourceMap.write()))
    .pipe(gulpif(development, dest(path.css.dev), dest(path.css.public)))
    .pipe(gulpif(development, browser.stream()));
}

//  OPTIMIZE IMAGE TASK

function optimizeImages() {
  return src(path.images.src)
    .pipe(gulpif(!development, image()))
    .pipe(gulpif(development, dest(path.images.dev), dest(path.images.public)))
    .pipe(src(path.images.src))
    .pipe(webp())
    .pipe(
      gulpif(
        development,
        dest(path.images.dev),
        dest(path.images.public)
      )
    );
}

//  FONT TASK

function font() {
  return src(path.fonts.src).pipe(
    gulpif(development, dest(path.fonts.dev), dest(path.fonts.public))
  );
}

//  HTML MINIFICATION TASK

function htmlMin() {
  return src(path.html.src)
    .pipe(gulpif(!development, html({ collapseWhitespace: true })))
    .pipe(gulpif(development, dest(path.html.dev), dest(path.html.public)));
}

//  CLEAN DIRECTORIES

function clean() {
  return del([
    directories.dev + directories.icons,
    directories.dev + directories.images,
    directories.dev + directories.js,
    directories.dev + directories.fonts,
    directories.dev + directories.css
  ]);
}

function watchers() {
  watch(path.css.watcher, CSS);
  watch(path.html.src, htmlMin);
  watch(path.js.watcher, JS);
  watch(path.images.watcher, optimizeImages);
}

function browserSync() {
  browser.init({
    server: directories.dev
  });

  watch(path.html.src).on('change', browser.reload);
  watch(path.js.watcher).on('change', browser.reload);
}

const beforeServer = parallel(htmlMin, JS, CSS, optimizeImages, font);
const dev = development
  ? series(beforeServer, parallel(browserSync, watchers))
  : series(clean, beforeServer);

//  exports['name task for call in cli'] = nameFunctionTask

exports.default = dev;

