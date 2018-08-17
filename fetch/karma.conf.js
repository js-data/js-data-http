var browsers = ['PhantomJS']

var customLaunchers = {
  sl_chrome: {
    base: 'SauceLabs',
    browserName: 'chrome',
    platform: 'Windows 10',
    version: 'latest'
  },
  sl_firefox: {
    base: 'SauceLabs',
    browserName: 'firefox',
    platform: 'Windows 10',
    version: 'latest'
  },
  sl_safari_9: {
    base: 'SauceLabs',
    browserName: 'safari',
    platform: 'OS X 10.11',
    version: '9.0'
  },
  sl_edge: {
    base: 'SauceLabs',
    browserName: 'microsoftedge',
    platform: 'Windows 10',
    version: 'latest'
  },
  sl_ie_11: {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    platform: 'Windows 8.1',
    version: '11'
  },
  sl_ie_10: {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    platform: 'Windows 2012',
    version: '10'
  },
  sl_ie_9: {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    platform: 'Windows 2008',
    version: '9'
  },
  sl_android_5: {
    base: 'SauceLabs',
    browserName: 'android',
    platform: 'Linux',
    version: '5.1'
  }
}

if (process.env.SAUCE_USERNAME && process.env.SAUCE_ACCESS_KEY) {
  browsers = browsers.concat(Object.keys(customLaunchers))
}

module.exports = function (config) {
  config.set({
    basePath: '../',
    frameworks: ['sinon', 'chai', 'mocha'],
    plugins: [
      'karma-sinon',
      'karma-mocha',
      'karma-chai',
      'karma-phantomjs-launcher',
      'karma-sauce-launcher'
    ],
    autoWatch: false,
    browsers: browsers,
    files: [
      'node_modules/babel-polyfill/dist/polyfill.js',
      'node_modules/whatwg-fetch/fetch.js',
      'node_modules/js-data/dist/js-data.js',
      'fetch/dist/js-data-fetch.js',
      'fetch/karma.start.js',
      'test/*.test.js'
    ],
    sauceLabs: {
      testName: 'JSDataHttp fetch Tests',
      public: 'public',
      recordVideo: false,
      recordScreenshots: false,
      build: process.env.CIRCLE_BUILD_NUM ? ('circle-' + process.env.CIRCLE_BUILD_NUM) : ('local-' + new Date().getTime())
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
