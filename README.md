<img src="https://raw.githubusercontent.com/js-data/js-data/master/js-data.png" alt="js-data logo" title="js-data" align="right" width="64" height="64" />

## js-data-http [![bower version](https://img.shields.io/bower/v/js-data-http.svg?style=flat-square)](https://www.npmjs.org/package/js-data-http) [![npm version](https://img.shields.io/npm/v/js-data-http.svg?style=flat-square)](https://www.npmjs.org/package/js-data-http) [![Circle CI](https://img.shields.io/circleci/project/js-data/js-data-http/master.svg?style=flat-square)](https://circleci.com/gh/js-data/js-data-http/tree/master) [![npm downloads](https://img.shields.io/npm/dm/js-data-http.svg?style=flat-square)](https://www.npmjs.org/package/js-data-http) [![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/js-data/js-data-http/blob/master/LICENSE)


http adapter for [js-data](http://www.js-data.io/).

### API Documentation
[DSHttpAdapter](http://www.js-data.io/docs/dshttpadapter)

__Latest Release:__ [![Latest Release](https://img.shields.io/github/release/js-data/js-data-http.svg?style=flat-square)](https://github.com/js-data/js-data-http/releases)

__Status:__

[![Dependency Status](https://img.shields.io/gemnasium/js-data/js-data-http.svg?style=flat-square)](https://gemnasium.com/js-data/js-data-http) [![Coverage Status](https://img.shields.io/coveralls/js-data/js-data-http/master.svg?style=flat-square)](https://coveralls.io/r/js-data/js-data-http?branch=master) [![Codacity](https://img.shields.io/codacy/3931bbd8d838463297f70640aa78251b.svg?style=flat-square)](https://www.codacy.com/public/jasondobry/js-data-http/dashboard) 

__Supported Platforms:__

[![node version](https://img.shields.io/badge/Node-0.10%2B-green.svg?style=flat-square)](https://github.com/js-data/js-data) [![browsers](https://img.shields.io/badge/Browser-Chrome%2CFirefox%2CSafari%2COpera%2CIE%209%2B%2CiOS%20Safari%207.1%2B%2CAndroid%20Browser%202.3%2B-green.svg?style=flat-square)](https://github.com/js-data/js-data)

### Quick Start
`bower install --save js-data js-data-http` or `npm install --save js-data js-data-http`.

Load `js-data-http.js` after `js-data.js`.

```js
var adapter = new DSHttpAdapter();

var store = new JSData.DS();
store.registerAdapter('http', adapter, { default: true });

// "store" will now use the http adapter for all async operations
```

### Changelog
[CHANGELOG.md](https://github.com/js-data/js-data-http/blob/master/CHANGELOG.md)

### Community
- [Mailing List](https://groups.io/org/groupsio/jsdata) - Ask your questions!
- [Issues](https://github.com/js-data/js-data-http/issues) - Found a bug? Feature request? Submit an issue!
- [GitHub](https://github.com/js-data/js-data-http) - View the source code for js-data.
- [Contributing Guide](https://github.com/js-data/js-data-http/blob/master/CONTRIBUTING.md)

### Contributing

First, feel free to contact me with questions. [Mailing List](https://groups.io/org/groupsio/jsdata). [Issues](https://github.com/js-data/js-data-http/issues).

1. Contribute to the issue that is the reason you'll be developing in the first place
1. Fork js-data-http
1. `git clone https://github.com/<you>/js-data-http.git`
1. `cd js-data-http; npm install; bower install;`
1. `grunt go` (builds and starts a watch)
1. (in another terminal) `grunt karma:dev` (runs the tests)
1. Write your code, including relevant documentation and tests
1. Submit a PR and we'll review

### License

The MIT License (MIT)

Copyright (c) 2014-2015 Jason Dobry

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

