
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
  compiler = require('webpack'),
  webpack = require('webpack-stream')

//Enter syntax sass or scss
let syntax = 'scss';

//Write path to scripts-files in array which will be concat

let jsFiles = ['dev/scripts/first.js', 'dev/scripts/second.js'];

//PATH TO FILES
// let path = {
//   css: {
//     input: 'dev/' + syntax + '/main.' + syntax,
//     watcher: 'dev/' + syntax + '/**/*.' + syntax,
//     dev: 'dev/css/',
//     public: 'public/css'
//   },
//   images: {
//     dev: 'dev/img/**/*.*',
//     public: 'public/img/'
//   },
//   svg: {
//     dev: 'dev/icons/**/*.svg',
//     public: 'public/icons/'
//   },
//   js: {
//     dev: 'dev/js',
//     public: 'public/js',
//     watcher: 'dev/scripts/**/*.js'
//   },
//   fonts: {
//     dev: 'dev/fonts/**/*.*',
//     public: 'public/fonts/'
//   },
//   html: {
//     dev: 'dev/*.html',
//     public: 'public/'
//   }
// };


//CSS TASKS

//CSS task with source maps
function devCSS() {
  return gulp.src('./dev/scss/main.scss')
    .pipe( sourceMap.init() )
    .pipe( sass( {outputStyle: 'compressed'} ).on( 'error', sass.logError ) )
    .pipe( postcss( [autoprefixer, cssnano] ) )
    .pipe( mmq( {log: true} ) )
    .pipe( gulp.dest( './public/' ) )
    .pipe( browser.reload({stream: true}) )
    .pipe( sourceMap.write() )
    .pipe( gulp.dest( 'public/' ) );
}

//CSS task without source maps
function publicCSS() {
  return gulp.src( './dev/scss/main.scss' )
    .pipe( sass( {outputStyle: 'compressed'} ).on( 'error', sass.logError ) )
    .pipe( postcss( [autoprefixer, cssnano] ) )
    .pipe( mmq( {log: true} ) )
    .pipe( gulp.dest( './build/css/' ) );
}

//JS task with source maps
function devJS() {
  return gulp.src('dev/js/index.js')
  .pipe(webpack(require('./webpack.config.js'), compiler, function(err, stats) {
    /* Use stats to do more things if needed */
  }))
  .pipe(gulp.dest('public/'));
}


// function publicJS() {
//   return gulp.src( jsFiles, {base: 'dev/scripts'} )
//     .pipe( concat( 'main.js' ) )
//     .pipe( uglify() )
//     .pipe( gulp.dest( path.js.public ) );
// }

//Optimize images
function optimizeImages() {
  return gulp.src( path.images.dev )
    .pipe( image() )
    .pipe( gulp.dest( path.images.public ) );
}

//Optimize svg
function optimizeSVG() {
  return gulp.src( path.svg.dev )
    .pipe( svgmin() )
    .pipe( gulp.dest( path.svg.public ) );
}

//Copy fonts in public folder
function font() {
  return gulp.src( './' )
    .pipe( gulp.dest( path.fonts.public ) );
}

//HTML minification for public folder
function htmlMin() {
  return gulp.src( './dev/index.html' )
    .pipe( html() )
    .pipe( gulp.dest('./build/' ) );
}

//Before new build clean public folder
function clean() {
  return del( ['./build/'] );
}
function copyHTML() {
 return gulp.src('./dev/index.html').pipe(gulp.dest('./public/'));
}

function watch() {
  gulp.watch( './dev/scss/*.scss', devCSS );
  gulp.watch( 'dev/*.js', devJS );
}

function browserSync() {
  browser.init( {
    server: "./public/"
  } );

  gulp.watch( './dev/index.html' ).on("change", browser.reload);

}

let build = gulp.series( clean, gulp.parallel( publicCSS, devJS, htmlMin ) );
let beforeServer = gulp.parallel(copyHTML, devCSS, devJS);
let dev = gulp.series( beforeServer, gulp.parallel( browserSync, watch ));

//exports['name task for call in cli'] = nameFunctionTask
exports.styles = devCSS;
exports.optimizeImages = optimizeImages;
exports.optimizeSVG = optimizeSVG;
exports.clean = clean;
exports.watch = watch;
exports.build = build;
exports.js = devJS;

exports.default = dev;