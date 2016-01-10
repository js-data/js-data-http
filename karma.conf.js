var customLaunchers = {
	bs_ie9_windows7: {
		base: 'BrowserStack',
		browser: 'ie',
		browser_version: '9.0',
		os: 'Windows',
		os_version: '7'
	}
};

var browsers = ['PhantomJS'];
if (
	process.env.BROWSERSTACK_USERNAME &&
	process.env.BROWSERSTACK_ACCESS_KEY
) {
	browsers = browsers.concat(Object.keys(customLaunchers));
}

module.exports = function (config) {
	config.set({
		// base path, that will be used to resolve files and exclude
		basePath: './',
		frameworks: ['sinon', 'chai', 'mocha'],
		plugins: [
			// these plugins will be require() by Karma
			'karma-sinon',
			'karma-mocha',
			'karma-chai',
			'karma-chrome-launcher',
			'karma-phantomjs-launcher',
			'karma-firefox-launcher',
			'karma-coverage',
			'karma-browserstack-launcher',
			'karma-junit-reporter'
		],
		autoWatch: false,
		autoWatchBatchDelay: 4000,
		browsers: browsers,

		// list of files / patterns to load in the browser
		files: [
			'node_modules/es6-promise/dist/es6-promise.js',
			'node_modules/js-data/dist/js-data.js',
			'dist/js-data-http.js',
			'karma.start.js',
			'test/browser/**/*.js'
		],

		reporters: ['dots', 'coverage', 'junit'],

		preprocessors: {
			'dist/js-data-http.js': ['coverage']
		},

		// optionally, configure the reporter
		coverageReporter: {
			type: 'lcov',
			dir: 'coverage/'
		},

    // the default configuration
    junitReporter: {
      outputDir: process.env.CIRCLE_TEST_REPORTS || 'junit',
      outputFile: undefined,
      suite: 'js-data-http',
      useBrowserName: false
    },

		browserStack: {
			username: process.env.BROWSERSTACK_USERNAME,
			accessKey: process.env.BROWSERSTACK_ACCESS_KEY
		},

		customLaunchers: customLaunchers,

		browserNoActivityTimeout: 30000,

		// web server port
		port: 9876,

module.exports = function (config) {
  config.set({
    basePath: './',
    frameworks: ['sinon', 'chai', 'mocha'],
    plugins: [
      'karma-sinon',
      'karma-mocha',
      'karma-chai',
      'karma-phantomjs-launcher',
      'karma-browserstack-launcher',
      'karma-junit-reporter'
    ],
    autoWatch: false,
    browsers: browsers,
    files: [
      'node_modules/es6-promise/dist/es6-promise.js',
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
    reporters: ['dots', 'junit'],
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
