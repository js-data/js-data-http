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

To get started, visit __[http://js-data.io](http://www.js-data.io)__.

## Table of contents

* [Quick start](#quick-start)
* [Dependencies](#dependencies)
* [Guides and Tutorials](#guides-and-tutorials)
* [API Reference Docs](#api-reference-docs)
* [Community](#community)
* [Support](#support)
* [Contributing](#contributing)
* [License](#license)

## Quick Start
`npm install --save js-data js-data-http` or `bower install --save js-data js-data-http`.

`npm install --save axios js-data js-data-http-node`

__ES6__

```js
// Doesn't make much sense to use DataStore on the server
import {Container} from 'js-data'
import HttpAdapter from 'js-data-http-node'

const adapter = new HttpAdapter()
const container = new Container()

container.registerAdapter('http', adapter, { default: true })

container.defineMapper('school')
container.defineMapper('student')

container.find('school', 1).then(function (school) {
  // ...
})
```

## Dependencies

`js-data-http` bundles axios and depends on `js-data`. `js-data-fetch` depends
on `js-data`. `js-data-http-node` depends on `js-data` and optionally axios.

See [JSData's dependencies](https://github.com/js-data/js-data/blob/master/README.md#dependencies).

## Guides and Tutorials

[Get started at http://js-data.io](http://js-data.io)

## API Reference Docs

[Visit http://api.js-data.io](http://api.js-data.io).

## Community

[Explore the Community](http://js-data.io/docs/community).

## Support

[Find out how to Get Support](http://js-data.io/docs/support).

## Contributing

[Read the Contributing Guide](http://js-data.io/docs/contributing).

## License

The MIT License (MIT)

Copyright (c) 2014-2016 js-data-http project authors

* [LICENSE](https://github.com/js-data/js-data-http/blob/master/LICENSE)
* [AUTHORS](https://github.com/js-data/js-data-http/blob/master/AUTHORS)
* [CONTRIBUTORS](https://github.com/js-data/js-data-http/blob/master/CONTRIBUTORS)

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