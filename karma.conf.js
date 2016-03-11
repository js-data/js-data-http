var customLaunchers = {
  bs_ie9_windows7: {
    base: 'BrowserStack',
    browser: 'ie',
    browser_version: '9.0',
    os: 'Windows',
    os_version: '7'
  },
  bs_safari7_osxmavericks: {
    base: 'BrowserStack',
    browser: 'safari',
    browser_version: '7.1',
    os: 'OS X',
    os_version: 'Mavericks'
  },
  bs_firefox41_windows7: {
    base: 'BrowserStack',
    browser: 'firefox',
    browser_version: '41.0',
    os: 'Windows',
    os_version: '7'
  },
  bs_chrome46_windows7: {
    base: 'BrowserStack',
    browser: 'chrome',
    browser_version: '46.0',
    os: 'Windows',
    os_version: '7'
  }
}

var browsers = ['PhantomJS']
if (
  process.env.BROWSERSTACK_USERNAME &&
  process.env.BROWSERSTACK_ACCESS_KEY
) {
  browsers = browsers.concat(Object.keys(customLaunchers))
}

module.exports = function (config) {
  config.set({
    basePath: './',
    frameworks: ['sinon', 'chai', 'mocha'],
    plugins: [
      'karma-sinon',
      'karma-mocha',
      'karma-chai',
      'karma-phantomjs-launcher',
      'karma-browserstack-launcher'
    ],
    autoWatch: false,
    browsers: browsers,
    files: [
      'node_modules/babel-polyfill/dist/polyfill.js',
      'node_modules/js-data/dist/js-data.js',
      'dist/js-data-http.js',
      'karma.start.js',
      'test/*.test.js'
    ],
    browserStack: {
      username: process.env.BROWSERSTACK_USERNAME,
      accessKey: process.env.BROWSERSTACK_ACCESS_KEY
    },
    customLaunchers: customLaunchers,
    reporters: ['dots'],
    junitReporter: {
      outputDir: process.env.CIRCLE_TEST_REPORTS || 'junit',
      outputFile: undefined,
      suite: 'js-data-http',
      userBrowserName: false
    },
    port: 9876,
    runnerPort: 9100,
    colors: true,
    logLevel: config.LOG_INFO,
    browserNoActivityTimeout: 90000,
    captureTimeout: 90000,
    singleRun: true
  })
}
