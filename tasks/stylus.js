'use strict';

// Compile Stylus to CSS
module.exports = function ($, config, gulp) { return function () {
  var stylus = require('gulp-stylus');

  // =========================================================
  // Load Stylus plugins you wish to use
  // =========================================================

  // POST CSS
  // var poststylus = require('poststylus');
  // var clearfix = require('postcss-clearfix')
  // var responsiveType = require('postcss-responsive-type')
  // var rucksack = require('rucksack-css');
  // var position = require('postcss-position');
  // var lost = require('lost');

  // STYLUS
  // var autoprefixer = require('autoprefixer-stylus');
  // var axis = require('axis')
  // var rupture = require('rupture');
  // var fluidity = require('fluidity');
  // var typographic = require('typographic');
  // var jeet = require('jeet');
  // var nib = require('nib');

  // INSTALL plugins
  // npm i --save-dev typographic fluidity rupture nib axis heet

  // =========================================================
  // Enable specific Stylus plugins
  // =========================================================
  var stylusPlugins = [];
  // var stylusPlugins = [
  //  nib(), fluidity(), axis(), rupture(), jeet(),
  //  autoprefixer(), typographic(),
  //  poststylus([rucksack(), lost(), position(), clearfix(), responsiveType()])
  // ];

  var stylusOpts = config.stylus || {'include css': true, use: stylusPlugins};

  return gulp.src([
      'app/{themes,elements}/**/*.{styl}'
    ])
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe(stylus(stylusOpts))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('.tmp'))
    .pipe(gulp.dest('dist'));
};};
