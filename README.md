<img src="https://raw.githubusercontent.com/js-data/js-data/master/js-data.png" alt="js-data logo" title="js-data" align="right" width="96" height="96" />

# js-data-http

[![Slack Status][sl_b]][sl_l]
[![npm version][npm_b]][npm_l]
[![npm downloads][dn_b]][dn_l]
[![Circle CI][circle_b]][circle_l]
[![Coverage Status][cov_b]][cov_l]

This repo contains HTTP adapters for [js-data](http://www.js-data.io/):

- js-data-http - HTTP (XHR, includes [`axios`][axios]) adapter for JSData in the
browser. Capable of using `window.fetch` instead of axios. __Only works in the browser__.
- js-data-fetch - Same as `js-data-http` but _does not_ include `axios` and will use
`window.fetch` if available and if you don't provide your own http library.
- js-data-http-node - Same as `js-data-http` but runs on Node.js. Depends on `axios`
and will use `axios` unless you provide a different http library.

Tested on IE9, Chrome 46, Firefox 41 & Safari 7.1 using
<img src="https://raw.githubusercontent.com/js-data/js-data-localstorage/master/bs.jpg" alt="bs logo" title="browserstack" width="150" height="35" style="vertical-align: middle" />

To get started, visit the main website at __[http://js-data.io](http://www.js-data.io)__.

## Links

* [Quick start](http://www.js-data.io/v3.0/docs/home#quick-start) - Get started in 5 minutes
* [Guides and Tutorials](http://www.js-data.io/v3.0/docs/home) - Learn how to use JSData
* [HttpAdapter Guide](http://www.js-data.io/v3.0/docs/js-data-http) - Learn how to use the HttpAdapter
* [API Reference Docs](http://api.js-data.io) - Explore components, methods, options, etc.
* [Community & Support](http://js-data.io/docs/community) - Find solutions and chat with the community
* [General Contributing Guide](http://js-data.io/docs/contributing) - Give back and move the project forward
  * [Contributing to js-data-http](https://github.com/js-data/js-data-http/blob/master/.github/CONTRIBUTING.md)

## License

The MIT License (MIT)

Copyright (c) 2014-2016 js-data-http project authors

* [LICENSE](https://github.com/js-data/js-data-http/blob/master/LICENSE)
* [AUTHORS](https://github.com/js-data/js-data-http/blob/master/AUTHORS)
* [CONTRIBUTORS](https://github.com/js-data/js-data-http/blob/master/CONTRIBUTORS)

[sl_b]: http://slack.js-data.io/badge.svg
[sl_l]: http://slack.js-data.io
[npm_b]: https://img.shields.io/npm/v/js-data-http.svg?style=flat
[npm_l]: https://www.npmjs.org/package/js-data-http
[dn_b]: https://img.shields.io/npm/dm/js-data-http.svg?style=flat
[dn_l]: https://www.npmjs.org/package/js-data-http
[circle_b]: https://img.shields.io/circleci/project/js-data/js-data-http/master.svg?style=flat
[circle_l]: https://circleci.com/gh/js-data/js-data-http/tree/master
[cov_b]: https://img.shields.io/codecov/c/github/js-data/js-data-http/3.0.svg?style=flat
[cov_l]: https://codecov.io/github/js-data/js-data-http
