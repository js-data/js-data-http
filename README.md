<img src="https://raw.githubusercontent.com/js-data/js-data/master/js-data.png" alt="js-data logo" title="js-data" align="right" width="96" height="96" />

# js-data-http

[![Slack Status][sl_b]][sl_l]
[![npm version][npm_b]][npm_l]
[![Circle CI][circle_b]][circle_l]
[![npm downloads][dn_b]][dn_l]
[![Coverage Status][cov_b]][cov_l]
[![Codacy][cod_b]][cod_l]

This repo contains HTTP adapters for [js-data](http://www.js-data.io/):

- js-data-http - HTTP (XHR, includes [axios][axios]) adapter for js-data in the
browser. Capable of using `window.fetch` instead of axios.
- js-data-fetch - Same as js-data-http but doesn't include axios and will use
`window.fetch` if available and if you don't provide your own http library.
- js-data-http-node - Same as js-data-http but runs on Node.js. Depends on axios
and will use axios unless you provide a different http library.

Tested on IE9, Chrome 46, Firefox 41 & Safari 7.1 using
<img src="https://raw.githubusercontent.com/js-data/js-data-localstorage/master/bs.jpg" alt="bs logo" title="browserstack" width="150" height="35" style="vertical-align: middle" />

## Table of contents

* [Quick start](#quick-start)
* [Dependencies](#dependencies)
* [Documentation](#documentation)
* [API Reference](#api-reference)
* [Support](#support)
* [Community](#community)
* [Contributing](#contributing)
* [License](#license)

## Quick Start

#### Browser

`bower install --save js-data js-data-http` or `npm install --save js-data js-data-http`.

__ES6__

```js
const adapter = new DSHttpAdapter()

class Base extends JSData.Model {}
Base.registerAdapter('http', adapter, { default: true })

class School extends Model {}
class Student extends Model {}

// "School" and "Student" will now use the http adapter by default
```

__ES5__

```js
var adapter = new DSHttpAdapter()

var Base = JSData.Model.extend({}, { name: 'Base' })
Base.registerAdapter('http', adapter, { default: true })

var School = Base.extend({}, { name: 'School' })
var Student = Base.extend({}, { name: 'Student' })

// "School" and "Student" will now use the http adapter by default
```

#### Node.js

`npm install --save axios js-data js-data-http-node`

__ES6__

```js
import {Model} from 'js-data'
import DSHttpAdapter from 'js-data-http-node'

const adapter = new DSHttpAdapter()

class Base extends Model {}
Base.registerAdapter('http', adapter, { default: true })

class School extends Model {}
class Student extends Model {}

// "School" and "Student" will now use the http adapter by default
```

__ES5__

```js
var JSData = require('js-data')
var Model = JSData.Model
var DSHttpAdapter = require('js-data-http-node')

var adapter = new DSHttpAdapter()

var Base = Model.extend({}, { name: 'Base' })
Base.registerAdapter('http', adapter, { default: true })

var School = Base.extend({}, { name: 'School' })
var Student = Base.extend({}, { name: 'Student' })

// "School" and "Student" will now use the http adapter by default
```

## Dependencies

`js-data-http` bundles axios and depends on `js-data`. `js-data-fetch` depends
on `js-data`. `js-data-http-node` depends on `js-data` and optionally axios.

See [JSData's dependencies](https://github.com/js-data/js-data/blob/master/README.md#dependencies).

## Documentation
- [Getting Started with js-data](http://www.js-data.io/docs/home)
- [js-data-http](http://www.js-data.io/docs/js-data-http)
- [CHANGELOG.md](https://github.com/js-data/js-data-http/blob/master/CHANGELOG.md)

## API Reference
- [DS](http://www.js-data.io/docs/ds)
- [DSHttpAdapter](http://www.js-data.io/docs/dshttpadapter)

## Support

Support questions are handled via [Stack Overflow][so], [Slack][sl_l], and the
[Mailing List][ml]. Ask your questions there.

## Community
- [Stack Overflow][so]
- [Slack chat][sl_l]
- [Announcements](http://www.js-data.io/blog)
- [Mailing List][ml]
- [Issue Tracker](https://github.com/js-data/js-data-http/issues)
- [GitHub](https://github.com/js-data/js-data-http)
- [Contributing Guide](https://github.com/js-data/js-data-http/blob/master/CONTRIBUTING.md)

## Contributing

First, support is handled via the [Slack Channel][sl_l] and the
[Mailing List][ml]. Ask your questions there.

When submitting issues on GitHub, please include as much detail as possible to
make debugging quick and easy.

- good - Your versions of js-data, js-data-http, etc., relevant console logs/error,
code examples that revealed the issue
- better - A [plnkr](http://plnkr.co/), [fiddle](http://jsfiddle.net/), or
[bin](http://jsbin.com/?html,output) that demonstrates the issue
- best - A Pull Request that fixes the issue, including test coverage for the
issue and the fix

#### Pull Requests

1. Contribute to the issue/discussion that is the reason you'll be developing in
the first place
1. Fork js-data-http
1. `git clone git@github.com:<you>/js-data-http.git`
1. `cd js-data-http; npm install;`
1. Write your code, including relevant documentation and tests
1. Run `npm test` (build and test)
1. Your code will be linted and checked for formatting, the tests will be run
1. The `dist/` folder & files will be generated, do NOT commit `dist/*`! They
will be committed when a release is cut.
1. Submit your PR and we'll review!
1. Thanks!

### License

The MIT License (MIT)

Copyright (c) 2014-2016 Jason Dobry

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

[sl_b]: http://slack.js-data.io/badge.svg
[sl_l]: http://slack.js-data.io
[so]: http://stackoverflow.com/questions/tagged/jsdata
[npm_b]: https://img.shields.io/npm/v/js-data-http.svg?style=flat
[npm_l]: https://www.npmjs.org/package/js-data-http
[circle_b]: https://img.shields.io/circleci/project/js-data/js-data-http/master.svg?style=flat
[circle_l]: https://circleci.com/gh/js-data/js-data-http/tree/master
[dn_b]: https://img.shields.io/npm/dm/js-data-http.svg?style=flat
[dn_l]: https://www.npmjs.org/package/js-data-http
[cov_b]: https://img.shields.io/coveralls/js-data/js-data-http/master.svg?style=flat
[cov_l]: https://coveralls.io/github/js-data/js-data-http?branch=master
[cod_b]: https://img.shields.io/codacy/3931bbd8d838463297f70640aa78251b.svg
[cod_l]: https://www.codacy.com/app/jasondobry/js-data-http/dashboard
[axios]: https://github.com/mzabriskie/axios
[ml]: https://groups.io/org/groupsio/jsdata