'use strict';

// Transform styles with PostCSS
module.exports = function ($, config, gulp, merge) { return function () {
  var postcssAutoprefixer = require('autoprefixer');
  var postcssCssMqpacker = require('css-mqpacker');
  var postcssCustomMedia = require('postcss-custom-media');
  var postcssDiscardEmpty = require('postcss-discard-empty');
  var postcssImport = require('postcss-import');
  var postcssNesting = require('postcss-nesting');
  var postcssReporter = require('postcss-reporter');
  var postcssPlugins = [
    // Transform @import rules by inlining content
    postcssImport(),
    // Transform W3C CSS Custom Media Queries
    postcssCustomMedia(),
    // Unwrap nested rules, following CSS Nesting Module Level 3 specification
    postcssNesting(),
    // Pack same CSS media query rules into one media query rule
    postcssCssMqpacker(),
    // Add vendor prefixes to CSS rules using values from "Can I Use"
    postcssAutoprefixer(config.autoprefixer),
    // Remove empty rules, selectors & media queries
    postcssDiscardEmpty(),
    postcssReporter({
      clearMessages: true
    })
  ];

  var themes = gulp.src([
      'app/themes/' + config.theme + '/*.html',
      '!app/themes/' + config.theme + '/icons.html'
    ])
    .pipe($.plumber({
      handleError: function (error) {
        console.log(error);
        // For gulp.watch
        // http://blog.ibangspacebar.com/handling-errors-with-gulp-watch-and-gulp-plumber/
        this.emit('end');
      }
    }))
    .pipe($.changed('dist/themes/' + config.theme))
    .pipe($.sourcemaps.init())
    .pipe($.htmlPostcss(postcssPlugins))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('.tmp/themes/' + config.theme))
    .pipe($.size({title: 'Copy transformed styles to .tmp/themes dir:'}))
    .pipe(gulp.dest('dist/themes/' + config.theme))
    .pipe($.size({title: 'Copy transformed styles to dist/themes dir:'}));

  var elements = gulp.src([
      'app/elements/**/*.html',
      '!app/elements/include',
      '!app/elements/elements.html',
      '!app/elements/routing.html'
    ])
    .pipe($.plumber({
      handleError: function (error) {
        console.log(error);
        // For gulp.watch
        // http://blog.ibangspacebar.com/handling-errors-with-gulp-watch-and-gulp-plumber/
        this.emit('end');
      }
    }))
    .pipe($.changed('dist/elements'))
    .pipe($.sourcemaps.init())
    .pipe($.htmlPostcss(postcssPlugins))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('.tmp/elements'))
    .pipe($.size({title: 'Copy transformed styles to .tmp/elements dir:'}))
    .pipe(gulp.dest('dist/elements'))
    .pipe($.size({title: 'Copy transformed styles to dist/elements dir:'}));

  return merge(themes, elements);
};};
