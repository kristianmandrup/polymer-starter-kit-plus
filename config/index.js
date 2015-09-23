module.exports = {
  // Autoprefixer
  autoprefixer: require('./auto-prefixer'),
  // BrowserSync
  browserSync: require('./browser-sync'),
  deploy: require('./deploy'),
  // PageSpeed Insights
  // Please feel free to use the `nokey` option to try out PageSpeed
  // Insights as part of your build process. For more frequent use,
  // we recommend registering for your own API key. For more info:
  // https://developers.google.com/speed/docs/insights/v1/getting_started
  pageSpeed: require('./page-speed'),
  // Polymer Theme
  // Set theme also in file app/elements/elements.html
  // <link rel="import" href="../themes/default-theme/theme.html">
  theme: 'default-theme'
};
