let JSData = require('js-data')
let axios = null

try {
  axios = require('axios')
} catch (e) {}

let { DSUtils } = JSData
let { deepMixIn, removeCircular, copy, makePath, isString, isNumber } = DSUtils

/**
 * DSHttpAdapter class.
 * @class DSHttpAdapter
 * @alias DSHttpAdapter
 *
 * @param {Object} [opts] Configuration options.
 * @param {string} [opts.basePath='']
 * @param {boolean} [opts.debug=false]
 * @param {boolean} [opts.forceTrailingSlash=false]
 * @param {Object} [opts.http=axios]
 * @param {Object} [opts.httpConfig={}]
 * @param {string} [opts.suffix='']
 * @param {boolean} [opts.useFetch=false]
 */
function DSHttpAdapter (opts) {
  const self = this

  // Default values for arguments
  opts || (opts = {})

  // Default and user-defined settings
  /**
   * @name DSHttpAdapter#basePath
   * @type {string}
   */
  self.basePath = opts.basePath === undefined ? '' : opts.basePath

  /**
   * @name DSHttpAdapter#debug
   * @type {boolean}
   * @default false
   */
  self.debug = opts.debug === undefined ? false : opts.debug

  /**
   * @name DSHttpAdapter#forceTrailingSlash
   * @type {boolean}
   * @default false
   */
  self.forceTrailingSlash = opts.forceTrailingSlash === undefined ? false : opts.forceTrailingSlash

  /**
   * @name DSHttpAdapter#http
   * @type {Function}
   */
  self.http = opts.http === undefined ? axios : opts.http

  /**
   * @name DSHttpAdapter#httpConfig
   * @type {Object}
   */
  self.httpConfig = opts.httpConfig === undefined ? {} : opts.httpConfig

  /**
   * @name DSHttpAdapter#suffix
   * @type {string}
   */
  self.suffix = opts.suffix === undefined ? '' : opts.suffix

  /**
   * @name DSHttpAdapter#useFetch
   * @type {boolean}
   * @default false
   */
  self.useFetch = opts.useFetch === undefined ? false : opts.useFetch

  log () {}

  error () {}
}

let defaultsPrototype = Defaults.prototype

  /**
   * Make an Http request to `url` according to the configuration in `config`.
   *
   * {@link DSHttpAdapter#beforeDEL} will be called before calling
   * {@link DSHttpAdapter#HTTP}.
   * {@link DSHttpAdapter#afterDEL} will be called after calling
   * {@link DSHttpAdapter#HTTP}.
   *
   * @memberof DSHttpAdapter
   * @instance
   * @param {string} url Url for the request.
   * @param {Object} [config] Http configuration that will be passed to
   * {@link DSHttpAdapter#HTTP}.
   * @param {Object} [opts] Configuration options.
   * @return {Promise}
   */
  DEL (url, config, opts) {
    const self = this
    config || (config = {})
    config.url = url || config.url
    config.method = config.method || 'delete'
    return resolve(self.beforeDEL(url, config, opts)).then(function (_config) {
      config = _config || config
      return self.HTTP(config, opts)
    }).then(function (response) {
      return resolve(self.afterDEL(url, config, opts, response)).then(function (_response) {
        return _response || response
      })
    })
  },

  afterDEL () {},

defaultsPrototype.verbsUseBasePath = false

defaultsPrototype.useFetch = false;

class DSHttpAdapter {
  constructor (options) {
    options = options || {}
    this.defaults = new Defaults()
    if (console) {
      console[typeof console.error === 'function' ? 'error' : 'log'](...args)
    }
  },

  /**
   * Make an Http request using `window.fetch`.
   *
   * @memberof DSHttpAdapter
   * @instance
   * @param {Object} config Request configuration.
   * @param {Object} config.data Payload for the request.
   * @param {string} config.method Http method for the request.
   * @param {Object} config.headers Headers for the request.
   * @param {Object} config.params Querystring for the request.
   * @param {string} config.url Url for the request.
   * @param {Object} [opts] Configuration options.
   */
  fetch (config, opts) {
    const requestConfig = {
      method: config.method,
      // turn the plain headers object into the Fetch Headers object
      headers: new Headers(config.headers)
    }
    deepMixIn(this.defaults, options)
    this.http = options.http || axios
  }

  getEndpoint (resourceConfig, id, options) {
    options = options || {}
    options.params = options.params || {}

    let endpoint = options.hasOwnProperty('endpoint') ? options.endpoint : resourceConfig.endpoint
    let parents = resourceConfig.parents || (resourceConfig.parent ? {
      [resourceConfig.parent]: {
        key: resourceConfig.parentKey,
        field: resourceConfig.parentField
      }
    } : {})

    DSUtils.forOwn(parents, function (parent, parentName) {
      let item
      let parentKey = parent.key
      let parentField = parent.field
      let parentDef = resourceConfig.getResource(parentName)
      let parentId = options.params[parentKey]

      if (parentId === false || !parentKey || !parentDef) {
        if (parentId === false) {
          delete options.params[parentKey]
        }
      } else {
        delete options.params[parentKey]

        if (DSUtils._sn(id)) {
          item = resourceConfig.get(id)
        } else if (DSUtils._o(id)) {
          item = id
        }
        console.log('item', item)

        if (item) {
          parentId = parentId || item[parentKey] || (item[parentField] ? item[parentField][parentDef.idAttribute] : null)
        }

        if (parentId) {
          delete options.endpoint
          let _options = {}
          DSUtils.forOwn(options, (value, key) => {
            _options[key] = value
          })
          endpoint = DSUtils.makePath(this.getEndpoint(parentDef, parentId, DSUtils._(parentDef, _options)), parentId, endpoint)
        }
      }
    }, this)

    return endpoint
  }

  getPath (method, resourceConfig, id, options) {
    let _this = this
    options = options || {}
    if (isString(options.urlPath)) {
      return makePath.apply(DSUtils, [options.basePath || _this.defaults.basePath || resourceConfig.basePath, options.urlPath])
    } else {
      let args = [
        options.basePath || _this.defaults.basePath || resourceConfig.basePath,
        this.getEndpoint(resourceConfig, (isString(id) || isNumber(id) || method === 'create') ? id : null, options)
      ]
      if (method === 'find' || method === 'update' || method === 'destroy') {
        args.push(id)
      }
      return makePath.apply(DSUtils, args)
    }
  }

  HTTP (config) {
    let _this = this
    let start = new Date()
    config = copy(config)
    config = deepMixIn(config, _this.defaults.httpConfig)
    if (!('verbsUseBasePath' in config)) {
      config.verbsUseBasePath = _this.defaults.verbsUseBasePath
    }
    if (!config.urlOverride && config.verbsUseBasePath) {
      config.url = makePath(config.basePath || _this.defaults.basePath, config.url)
    }
    if (_this.defaults.forceTrailingSlash && config.url[config.url.length - 1] !== '/' && !config.urlOverride) {
      config.url += '/'
    }
    config.method = config.method.toUpperCase()
    let suffix = config.suffix || _this.defaults.suffix
    if (suffix && config.url.substr(config.url.length - suffix.length) !== suffix && !config.urlOverride) {
      config.url += suffix
    }

    // logs the HTTP response
    function logResponse (data, isRejection) {
      data = data || {}
      // examine the data object
      if (data instanceof Error) {
        // log the Error object
        _this.defaults.error(`FAILED: ${data.message || 'Unknown Error'}`, data)
        return DSUtils.Promise.reject(data)
      } else if (typeof data === 'object') {
        let str = `${start.toUTCString()} - ${config.method} ${config.url} - ${data.status} ${(new Date().getTime() - start.getTime())}ms`

        if (data.status >= 200 && data.status < 300 && !isRejection) {
          if (_this.defaults.log) {
            _this.defaults.log(str, data)
          }
          return data
        } else {
          if (_this.defaults.error) {
            _this.defaults.error(`FAILED: ${str}`, data)
          }
          return DSUtils.Promise.reject(data)
        }
      } else {
        // unknown type for 'data' that is not an Object or Error
        _this.defaults.error('FAILED', data)
        return DSUtils.Promise.reject(data)
      }
    }

    if (!self.http) {
      throw new Error('You have not configured this adapter with an http library!')
    }

    return this.http(config).then(logResponse, function (data) {
      return logResponse(data, true)
    })
  }

  GET (url, config) {
    config = config || {}
    config.method = config.method || 'get'
    config.urlOverride = !!config.url
    config.url = config.url || url
    return this.HTTP(config)
  }

  POST (url, attrs, config) {
    config = config || {}
    config.method = config.method || 'post'
    config.urlOverride = !!config.url
    config.url = config.url || url
    config.data = config.data || attrs
    return this.HTTP(config)
  }

  PUT (url, attrs, config) {
    config = config || {}
    config.method = config.method || 'put'
    config.urlOverride = !!config.url
    config.url = config.url || url
    config.data = config.data || attrs
    return this.HTTP(config)
  }

  DEL (url, config) {
    config = config || {}
    config.method = config.method || 'delete'
    config.urlOverride = !!config.url
    config.url = config.url || url
    return this.HTTP(config)
  }

  find (resourceConfig, id, options) {
    let _this = this
    options = options ? copy(options) : {}
    options.suffix = options.suffix || resourceConfig.suffix
    options.params = options.params || {}
    options.params = _this.defaults.queryTransform(resourceConfig, options.params)
    return _this.GET(
      _this.getPath('find', resourceConfig, id, options),
      options
    ).then((data) => {
      let item = (options.deserialize ? options.deserialize : _this.defaults.deserialize)(resourceConfig, data)
      return !item ? DSUtils.Promise.reject(new Error('Not Found!')) : item
    })
  }

  findAll (resourceConfig, params, options) {
    let _this = this
    options = options ? copy(options) : {}
    options.suffix = options.suffix || resourceConfig.suffix
    options.params = options.params || {}
    if (params) {
      params = _this.defaults.queryTransform(resourceConfig, params)
      deepMixIn(options.params, params)
    }
    return _this.GET(
      _this.getPath('findAll', resourceConfig, params, options),
      options
    ).then((data) => (options.deserialize ? options.deserialize : _this.defaults.deserialize)(resourceConfig, data))
  }

  create (resourceConfig, attrs, options) {
    let _this = this
    options = options ? copy(options) : {}
    options.suffix = options.suffix || resourceConfig.suffix
    options.params = options.params || {}
    options.params = _this.defaults.queryTransform(resourceConfig, options.params)
    return _this.POST(
      _this.getPath('create', resourceConfig, attrs, options),
      options.serialize ? options.serialize(resourceConfig, attrs) : _this.defaults.serialize(resourceConfig, attrs),
      options
    ).then((data) => (options.deserialize ? options.deserialize : _this.defaults.deserialize)(resourceConfig, data))
  }

  update (resourceConfig, id, attrs, options) {
    let _this = this
    options = options ? copy(options) : {}
    options.suffix = options.suffix || resourceConfig.suffix
    options.params = options.params || {}
    options.params = _this.defaults.queryTransform(resourceConfig, options.params)
    return _this.PUT(
      _this.getPath('update', resourceConfig, id, options),
      options.serialize ? options.serialize(resourceConfig, attrs) : _this.defaults.serialize(resourceConfig, attrs),
      options
    ).then((data) => (options.deserialize ? options.deserialize : _this.defaults.deserialize)(resourceConfig, data))
  }

  updateAll (resourceConfig, attrs, params, options) {
    let _this = this
    options = options ? copy(options) : {}
    options.suffix = options.suffix || resourceConfig.suffix
    options.params = options.params || {}
    if (params) {
      params = _this.defaults.queryTransform(resourceConfig, params)
      deepMixIn(options.params, params)
    }
    return this.PUT(
      _this.getPath('updateAll', resourceConfig, attrs, options),
      options.serialize ? options.serialize(resourceConfig, attrs) : _this.defaults.serialize(resourceConfig, attrs),
      options
    ).then((data) => (options.deserialize ? options.deserialize : _this.defaults.deserialize)(resourceConfig, data))
  }

  destroy (resourceConfig, id, options) {
    let _this = this
    options = options ? copy(options) : {}
    options.suffix = options.suffix || resourceConfig.suffix
    options.params = options.params || {}
    options.params = _this.defaults.queryTransform(resourceConfig, options.params)
    return _this.DEL(
      _this.getPath('destroy', resourceConfig, id, options),
      options
    ).then((data) => (options.deserialize ? options.deserialize : _this.defaults.deserialize)(resourceConfig, data))
  }

  destroyAll (resourceConfig, params, options) {
    let _this = this
    options = options ? copy(options) : {}
    options.suffix = options.suffix || resourceConfig.suffix
    options.params = options.params || {}
    if (params) {
      params = _this.defaults.queryTransform(resourceConfig, params)
      deepMixIn(options.params, params)
    }
    return this.DEL(
      _this.getPath('destroyAll', resourceConfig, params, options),
      options
    ).then((data) => (options.deserialize ? options.deserialize : _this.defaults.deserialize)(resourceConfig, data))
  }
}

/**
 * Alternative to ES6 class syntax for extending `DSHttpAdapter`.
 *
 * __ES6__:
 * ```javascript
 * class MyHttpAdapter extends DSHttpAdapter {
 *   deserialize (Model, data, opts) {
 *     const data = super.deserialize(Model, data, opts)
 *     data.foo = 'bar'
 *     return data
 *   }
 * }
 * ```
 *
 * __ES5__:
 * ```javascript
 * var instanceProps = {
 *   // override deserialize
 *   deserialize: function (Model, data, opts) {
 *     var Ctor = this.constructor
 *     var superDeserialize = (Ctor.__super__ || Object.getPrototypeOf(Ctor)).deserialize
 *     // call the super deserialize
 *     var data = superDeserialize(Model, data, opts)
 *     data.foo = 'bar'
 *     return data
 *   },
 *   say: function () { return 'hi' }
 * }
 * var classProps = {
 *   yell: function () { return 'HI' }
 * }
 *
 * var MyHttpAdapter = DSHttpAdapter.extend(instanceProps, classProps)
 * var adapter = new MyHttpAdapter()
 * adapter.say() // "hi"
 * MyHttpAdapter.yell() // "HI"
 * ```
 *
 * @name DSHttpAdapter.extend
 * @method
 * @param {Object} [instanceProps] Properties that will be added to the
 * prototype of the subclass.
 * @param {Object} [classProps] Properties that will be added as static
 * properties to the subclass itself.
 * @return {Object} Subclass of `DSHttpAdapter`.
 */
DSHttpAdapter.extend = extend

/**
 * Details of the current version of the `js-data-http` module.
 *
 * @name DSHttpAdapter.version
 * @type {Object}
 * @property {string} version.full The full semver value.
 * @property {number} version.major The major version number.
 * @property {number} version.minor The minor version number.
 * @property {number} version.patch The patch version number.
 * @property {(string|boolean)} version.alpha The alpha version value,
 * otherwise `false` if the current version is not alpha.
 * @property {(string|boolean)} version.beta The beta version value,
 * otherwise `false` if the current version is not beta.
 */
DSHttpAdapter.version = {
  full: '<%= pkg.version %>',
  major: parseInt('<%= major %>', 10),
  minor: parseInt('<%= minor %>', 10),
  patch: parseInt('<%= patch %>', 10),
  alpha: '<%= alpha %>' !== 'false' ? '<%= alpha %>' : false,
  beta: '<%= beta %>' !== 'false' ? '<%= beta %>' : false
}

/**
 * Registered as `js-data-http` in NPM and Bower. The build of `js-data-http`
 * that works on Node.js is registered in NPM as `js-data-http-node`. The build
 * of `js-data-http` that does not bundle `axios` is registered in NPM and Bower
 * as `js-data-fetch`.
 *
 * __Script tag__:
 * ```javascript
 * window.DSHttpAdapter
 * ```
 * __CommonJS__:
 * ```javascript
 * var DSHttpAdapter = require('js-data-http')
 * ```
 * __ES6 Modules__:
 * ```javascript
 * import DSHttpAdapter from 'js-data-http'
 * ```
 * __AMD__:
 * ```javascript
 * define('myApp', ['js-data-http'], function (DSHttpAdapter) { ... })
 * ```
 *
 * @module js-data-http
 */

module.exports = DSHttpAdapter
