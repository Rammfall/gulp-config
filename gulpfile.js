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

 const rename = require('gulp-rename');
 const webpack = require('webpack');
 const webpackStream = require('webpack-stream');

//Enter syntax sass or scss
let syntax = 'scss';

//PATH TO FILES
let path = {
  css: {
    src: 'app/src/styles/main.' + syntax,
    watcher: 'app/src/styles/*.' + syntax,
    dev: 'app/dev/styles',
    public: 'public/css'
  },
  images: {
    src: 'app/src/images/*.*',
    dev: 'app/dev/images/',
    public: 'app/dev/images/'
  },
  svg: {
    dev: 'app/icons/**/*.svg',
    public: 'public/icons/'
  },
  js: {
    src: 'app/src/js/main.js',
    dev: 'app/dev/js/',
    public: 'public/js',
    watcher: 'app/scripts/**/*.js'
  },
  fonts: {
    dev: 'app/fonts/**/*.*',
    public: 'public/fonts/'
  },
  html: {
    src: 'app/src/*.html',
    dev: 'app/dev/',
    public: 'app/dev/'
  }
};

//CSS TASKS

//CSS task with source maps
function devCSS() {
  return gulp.src(path.css.src)
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
  return gulp.src(path.css.src)
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(postcss([autoprefixer, cssnano]))
    .pipe(mmq({log: true}))
    .pipe(gulp.dest(path.css.public));
}

//JS task with source maps
function devJS() {
  return gulp.src(path.js.src)
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

// function publicJS() {
//     return gulp.src( jsFiles, {base: 'app/scripts'} )
//       .pipe( concat( 'main.js' ) )
//       .pipe(babel({
//         presets: ['@babel/preset-env'],
//         plugins: [
//           "@babel/plugin-proposal-class-properties",
//         ]
//       }))
//       .pipe( uglify() )
//       .pipe( gulp.dest( path.js.public ) );
//   }

//Optimize images
function optimizeImages() {
  return gulp.src(path.images.src)
    .pipe(image())
    .pipe(gulp.dest(path.images.dev));
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
  return gulp.src(path.html.src)
    .pipe(html())
    .pipe(gulp.dest(path.html.dev));
}

//Before new build clean public folder
function clean() {
  return del(['public/**/']);
}

function watch() {
  gulp.watch(path.css.watcher, devCSS);
  gulp.watch(path.js.src, devJS);
  gulp.watch(path.html.src, htmlMin);
}

function browserSync() {
  browser.init({
    server: "./app/dev/"
  });

  gulp.watch(path.html.dev).on("change", browser.reload);
  gulp.watch(path.js.watcher).on("change", browser.reload);
}

// let build = gulp.series(clean, gulp.parallel(publicCSS, publicJS, font, optimizeImages, optimizeSVG, htmlMin));
let beforeServer = gulp.parallel(htmlMin, devCSS, devJS, optimizeImages);
let dev = gulp.series(beforeServer, gulp.parallel(browserSync, watch));

//exports['name task for call in cli'] = nameFunctionTask
exports.styles = devCSS;
exports.optimizeImages = optimizeImages;
exports.optimizeSVG = optimizeSVG;
exports.clean = clean;
exports.watch = watch;
// exports.build = build;
// exports.js = publicJS;

function check() {
  return console.log(process.env.NODE_ENV);
}

exports.default = dev;
exports.check = check;