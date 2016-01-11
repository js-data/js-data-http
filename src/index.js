/* global fetch:true Headers:true Request:true */
const axios = require('axios')
import {utils} from 'js-data'
const {
  _,
  copy,
  deepMixIn,
  extend,
  fillIn,
  forOwn,
  isArray,
  isFunction,
  isNumber,
  isObject,
  isSorN,
  isString,
  resolve,
  reject,
  toJson
} = utils

let hasFetch = false

try {
  hasFetch = window && window.fetch
} catch (e) {}

function isValidString (value) {
  return (value != null && value !== '')
}
function join (items, separator) {
  separator || (separator = '')
  return items.filter(isValidString).join(separator)
}
function makePath (...args) {
  let result = join(args, '/')
  return result.replace(/([^:\/]|^)\/{2,}/g, '$1/')
}

function encode (val) {
  return encodeURIComponent(val)
    .replace(/%40/gi, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

function buildUrl (url, params) {
  if (!params) {
    return url
  }

  const parts = []

  forOwn(params, function (val, key) {
    if (val === null || typeof val === 'undefined') {
      return
    }
    if (!isArray(val)) {
      val = [val]
    }

    val.forEach(function (v) {
      if (window.toString.call(v) === '[object Date]') {
        v = v.toISOString()
      } else if (isObject(v)) {
        v = toJson(v)
      }
      parts.push(`${encode(key)}=${encode(v)}`)
    })
  })

  if (parts.length > 0) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + parts.join('&')
  }

  return url
}

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
}

fillIn(DSHttpAdapter.prototype, {
  /**
   * Lifecycle hook called by {@link DSHttpAdapter#create}. If this method
   * returns a promise then {@link DSHttpAdapter#create} will wait for the
   * promise to resolve before continuing. If this method returns any other
   * value or the promise resolves with a value, then {@link DSHttpAdapter#create}
   * will resolve with that same value.
   *
   * @memberof DSHttpAdapter
   * @instance
   * @param {Object} Model The `Model` argument passed to {@link DSHttpAdapter#create}.
   * @param {Object} props The `props` argument passed to {@link DSHttpAdapter#create}.
   * @param {Object} opts The `opts` argument passed to {@link DSHttpAdapter#create}.
   * @param {Object} data The `data` value that {@link DSHttpAdapter#create} will return.
   */
  afterCreate () {},

  /**
   * Lifecycle hook called by {@link DSHttpAdapter#createMany}. If this method
   * returns a promise then {@link DSHttpAdapter#createMany} will wait for the
   * promise to resolve before continuing. If this method returns any other
   * value or the promise resolves with a value, then {@link DSHttpAdapter#createMany}
   * will resolve with that same value.
   *
   * @memberof DSHttpAdapter
   * @instance
   * @param {Object} Model The `Model` argument passed to {@link DSHttpAdapter#createMany}.
   * @param {Object} models The `models` argument passed to {@link DSHttpAdapter#createMany}.
   * @param {Object} opts The `opts` argument passed to {@link DSHttpAdapter#createMany}.
   * @param {Object} data The `data` value that {@link DSHttpAdapter#createMany} will return.
   */
  afterCreateMany () {},

  /**
   * Lifecycle hook called by {@link DSHttpAdapter#DEL}. If this method
   * returns a promise then {@link DSHttpAdapter#DEL} will wait for the
   * promise to resolve before continuing. If this method returns any other
   * value or the promise resolves with a value, then {@link DSHttpAdapter#DEL}
   * will resolve with that same value.
   *
   * @memberof DSHttpAdapter
   * @instance
   * @param {string} url The `url` argument passed to {@link DSHttpAdapter#DEL}.
   * @param {Object} config The `config` argument passed to {@link DSHttpAdapter#DEL}.
   * @param {Object} opts The `opts` argument passed to {@link DSHttpAdapter#DEL}.
   * @param {Object} response The `response` value that {@link DSHttpAdapter#DEL} will return.
   */
  afterDEL () {},

  /**
   * Lifecycle hook called by {@link DSHttpAdapter#destroy}. If this method
   * returns a promise then {@link DSHttpAdapter#destroy} will wait for the
   * promise to resolve before continuing. If this method returns any other
   * value or the promise resolves with a value, then {@link DSHttpAdapter#destroy}
   * will resolve with that same value.
   *
   * @memberof DSHttpAdapter
   * @instance
   * @param {Object} Model The `Model` argument passed to {@link DSHttpAdapter#destroy}.
   * @param {(string|number)} id The `id` argument passed to {@link DSHttpAdapter#destroy}.
   * @param {Object} opts The `opts` argument passed to {@link DSHttpAdapter#destroy}.
   * @param {Object} data The `data` value that {@link DSHttpAdapter#destroy} will return.
   */
  afterDestroy () {},

  /**
   * Lifecycle hook called by {@link DSHttpAdapter#destroyAll}. If this method
   * returns a promise then {@link DSHttpAdapter#destroyAll} will wait for the
   * promise to resolve before continuing. If this method returns any other
   * value or the promise resolves with a value, then {@link DSHttpAdapter#destroyAll}
   * will resolve with that same value.
   *
   * @memberof DSHttpAdapter
   * @instance
   * @param {Object} Model The `Model` argument passed to {@link DSHttpAdapter#destroyAll}.
   * @param {(string|number)} id The `id` argument passed to {@link DSHttpAdapter#destroyAll}.
   * @param {Object} opts The `opts` argument passed to {@link DSHttpAdapter#destroyAll}.
   * @param {Object} data The `data` value that {@link DSHttpAdapter#destroyAll} will return.
   */
  afterDestroyAll () {},

  /**
   * Lifecycle hook called by {@link DSHttpAdapter#find}. If this method
   * returns a promise then {@link DSHttpAdapter#find} will wait for the
   * promise to resolve before continuing. If this method returns any other
   * value or the promise resolves with a value, then {@link DSHttpAdapter#find}
   * will resolve with that same value.
   *
   * @memberof DSHttpAdapter
   * @instance
   * @param {Object} Model The `Model` argument passed to {@link DSHttpAdapter#find}.
   * @param {(string|number)} id The `id` argument passed to {@link DSHttpAdapter#find}.
   * @param {Object} opts The `opts` argument passed to {@link DSHttpAdapter#find}.
   * @param {Object} data The `data` value that {@link DSHttpAdapter#find} will return.
   */
  afterFind () {},

  /**
   * Lifecycle hook called by {@link DSHttpAdapter#findAll}. If this method
   * returns a promise then {@link DSHttpAdapter#findAll} will wait for the
   * promise to resolve before continuing. If this method returns any other
   * value or the promise resolves with a value, then {@link DSHttpAdapter#findAll}
   * will resolve with that same value.
   *
   * @memberof DSHttpAdapter
   * @instance
   * @param {Object} Model The `Model` argument passed to {@link DSHttpAdapter#findAll}.
   * @param {(string|number)} id The `id` argument passed to {@link DSHttpAdapter#findAll}.
   * @param {Object} opts The `opts` argument passed to {@link DSHttpAdapter#findAll}.
   * @param {Object} data The `data` value that {@link DSHttpAdapter#findAll} will return.
   */
  afterFindAll () {},

  /**
   * Lifecycle hook called by {@link DSHttpAdapter#GET}. If this method
   * returns a promise then {@link DSHttpAdapter#GET} will wait for the
   * promise to resolve before continuing. If this method returns any other
   * value or the promise resolves with a value, then {@link DSHttpAdapter#GET}
   * will resolve with that same value.
   *
   * @memberof DSHttpAdapter
   * @instance
   * @param {string} url The `url` argument passed to {@link DSHttpAdapter#GET}.
   * @param {Object} config The `config` argument passed to {@link DSHttpAdapter#GET}.
   * @param {Object} opts The `opts` argument passed to {@link DSHttpAdapter#GET}.
   * @param {Object} response The `response` value that {@link DSHttpAdapter#GET} will return.
   */
  afterGET () {},

  /**
   * Lifecycle hook called by {@link DSHttpAdapter#HTTP}. If this method
   * returns a promise then {@link DSHttpAdapter#HTTP} will wait for the
   * promise to resolve before continuing. If this method returns any other
   * value or the promise resolves with a value, then {@link DSHttpAdapter#HTTP}
   * will resolve with that same value.
   *
   * @memberof DSHttpAdapter
   * @instance
   * @param {Object} config The `config` argument passed to {@link DSHttpAdapter#HTTP}.
   * @param {Object} opts The `opts` argument passed to {@link DSHttpAdapter#HTTP}.
   * @param {Object} response The `response` value that {@link DSHttpAdapter#HTTP} will return.
   */
  afterHTTP () {},

  /**
   * Lifecycle hook called by {@link DSHttpAdapter#POST}. If this method
   * returns a promise then {@link DSHttpAdapter#POST} will wait for the
   * promise to resolve before continuing. If this method returns any other
   * value or the promise resolves with a value, then {@link DSHttpAdapter#POST}
   * will resolve with that same value.
   *
   * @memberof DSHttpAdapter
   * @instance
   * @param {string} url The `url` argument passed to {@link DSHttpAdapter#POST}.
   * @param {Object} data The `data` argument passed to {@link DSHttpAdapter#POST}.
   * @param {Object} config The `config` argument passed to {@link DSHttpAdapter#POST}.
   * @param {Object} opts The `opts` argument passed to {@link DSHttpAdapter#POST}.
   * @param {Object} response The `response` value that {@link DSHttpAdapter#POST} will return.
   */
  afterPOST () {},

  /**
   * Lifecycle hook called by {@link DSHttpAdapter#PUT}. If this method
   * returns a promise then {@link DSHttpAdapter#PUT} will wait for the
   * promise to resolve before continuing. If this method returns any other
   * value or the promise resolves with a value, then {@link DSHttpAdapter#PUT}
   * will resolve with that same value.
   *
   * @memberof DSHttpAdapter
   * @instance
   * @param {string} url The `url` argument passed to {@link DSHttpAdapter#PUT}.
   * @param {Object} data The `data` argument passed to {@link DSHttpAdapter#PUT}.
   * @param {Object} config The `config` argument passed to {@link DSHttpAdapter#PUT}.
   * @param {Object} opts The `opts` argument passed to {@link DSHttpAdapter#PUT}.
   * @param {Object} response The `response` value that {@link DSHttpAdapter#PUT} will return.
   */
  afterPUT () {},

  /**
   * Lifecycle hook called by {@link DSHttpAdapter#update}. If this method
   * returns a promise then {@link DSHttpAdapter#update} will wait for the
   * promise to resolve before continuing. If this method returns any other
   * value or the promise resolves with a value, then {@link DSHttpAdapter#update}
   * will resolve with that same value.
   *
   * @memberof DSHttpAdapter
   * @instance
   * @param {Object} Model The `Model` argument passed to {@link DSHttpAdapter#update}.
   * @param {(string|number)} id The `id` argument passed to {@link DSHttpAdapter#update}.
   * @param {Object} props The `props` argument passed to {@link DSHttpAdapter#update}.
   * @param {Object} opts The `opts` argument passed to {@link DSHttpAdapter#update}.
   * @param {Object} data The `data` value that {@link DSHttpAdapter#update} will return.
   */
  afterUpdate () {},

  /**
   * Lifecycle hook called by {@link DSHttpAdapter#updateAll}. If this method
   * returns a promise then {@link DSHttpAdapter#updateAll} will wait for the
   * promise to resolve before continuing. If this method returns any other
   * value or the promise resolves with a value, then {@link DSHttpAdapter#updateAll}
   * will resolve with that same value.
   *
   * @memberof DSHttpAdapter
   * @instance
   * @param {Object} Model The `Model` argument passed to {@link DSHttpAdapter#updateAll}.
   * @param {Object} props The `props` argument passed to {@link DSHttpAdapter#updateAll}.
   * @param {Object} query The `query` argument passed to {@link DSHttpAdapter#updateAll}.
   * @param {Object} opts The `opts` argument passed to {@link DSHttpAdapter#updateAll}.
   * @param {Object} data The `data` value that {@link DSHttpAdapter#updateAll} will return.
   */
  afterUpdateAll () {},

  /**
   * Lifecycle hook called by {@link DSHttpAdapter#updateMany}. If this method
   * returns a promise then {@link DSHttpAdapter#updateMany} will wait for the
   * promise to resolve before continuing. If this method returns any other
   * value or the promise resolves with a value, then {@link DSHttpAdapter#updateMany}
   * will resolve with that same value.
   *
   * @memberof DSHttpAdapter
   * @instance
   * @param {Object} Model The `Model` argument passed to {@link DSHttpAdapter#updateMany}.
   * @param {Object} models The `models` argument passed to {@link DSHttpAdapter#updateMany}.
   * @param {Object} opts The `opts` argument passed to {@link DSHttpAdapter#updateMany}.
   * @param {Object} data The `data` value that {@link DSHttpAdapter#updateMany} will return.
   */
  afterUpdateMany () {},

  /**
   * Lifecycle hook called by {@link DSHttpAdapter#create}. If this method
   * returns a promise then {@link DSHttpAdapter#create} will wait for the
   * promise to resolve before continuing.
   *
   * @memberof DSHttpAdapter
   * @instance
   * @param {Object} Model The `Model` argument passed to {@link DSHttpAdapter#create}.
   * @param {Object} props The `props` argument passed to {@link DSHttpAdapter#create}.
   * @param {Object} opts The `opts` argument passed to {@link DSHttpAdapter#create}.
   */
  beforeCreate () {},

  /**
   * Lifecycle hook called by {@link DSHttpAdapter#createMany}. If this method
   * returns a promise then {@link DSHttpAdapter#createMany} will wait for the
   * promise to resolve before continuing.
   *
   * @memberof DSHttpAdapter
   * @instance
   * @param {Object} Model The `Model` argument passed to {@link DSHttpAdapter#createMany}.
   * @param {Object} models The `models` argument passed to {@link DSHttpAdapter#createMany}.
   * @param {Object} opts The `opts` argument passed to {@link DSHttpAdapter#createMany}.
   */
  beforeCreateMany () {},

  /**
   * Lifecycle hook called by {@link DSHttpAdapter#DEL}. If this method
   * returns a promise then {@link DSHttpAdapter#DEL} will wait for the
   * promise to resolve before continuing. If this method returns any other
   * value or the promise resolves with a value, then {@link DSHttpAdapter#create}
   * will resolve with that same value, then the `config` argument passed to
   * {@link DSHttpAdapter#DEL} will be replaced by the value.
   *
   * @memberof DSHttpAdapter
   * @instance
   * @param {Object} url The `url` argument passed to {@link DSHttpAdapter#DEL}.
   * @param {Object} config The `config` argument passed to {@link DSHttpAdapter#DEL}.
   * @param {Object} opts The `opts` argument passed to {@link DSHttpAdapter#DEL}.
   */
  beforeDEL () {},

  /**
   * Lifecycle hook called by {@link DSHttpAdapter#destroy}. If this method
   * returns a promise then {@link DSHttpAdapter#destroy} will wait for the
   * promise to resolve before continuing.
   *
   * @memberof DSHttpAdapter
   * @instance
   * @param {Object} Model The `Model` argument passed to {@link DSHttpAdapter#destroy}.
   * @param {(string|number)} id The `id` argument passed to {@link DSHttpAdapter#destroy}.
   * @param {Object} opts The `opts` argument passed to {@link DSHttpAdapter#destroy}.
   */
  beforeDestroy () {},

  /**
   * Lifecycle hook called by {@link DSHttpAdapter#destroyAll}. If this method
   * returns a promise then {@link DSHttpAdapter#destroyAll} will wait for the
   * promise to resolve before continuing.
   *
   * @memberof DSHttpAdapter
   * @instance
   * @param {Object} Model The `Model` argument passed to {@link DSHttpAdapter#destroyAll}.
   * @param {Object} query The `query` argument passed to {@link DSHttpAdapter#destroyAll}.
   * @param {Object} opts The `opts` argument passed to {@link DSHttpAdapter#destroyAll}.
   */
  beforeDestroyAll () {},

  /**
   * Lifecycle hook called by {@link DSHttpAdapter#find}. If this method
   * returns a promise then {@link DSHttpAdapter#find} will wait for the
   * promise to resolve before continuing.
   *
   * @memberof DSHttpAdapter
   * @instance
   * @param {Object} Model The `Model` argument passed to {@link DSHttpAdapter#find}.
   * @param {(string|number)} id The `id` argument passed to {@link DSHttpAdapter#find}.
   * @param {Object} opts The `opts` argument passed to {@link DSHttpAdapter#find}.
   */
  beforeFind () {},

  /**
   * Lifecycle hook called by {@link DSHttpAdapter#findAll}. If this method
   * returns a promise then {@link DSHttpAdapter#findAll} will wait for the
   * promise to resolve before continuing.
   *
   * @memberof DSHttpAdapter
   * @instance
   * @param {Object} Model The `Model` argument passed to {@link DSHttpAdapter#findAll}.
   * @param {Object} query The `query` argument passed to {@link DSHttpAdapter#findAll}.
   * @param {Object} opts The `opts` argument passed to {@link DSHttpAdapter#findAll}.
   */
  beforeFindAll () {},

  /**
   * Lifecycle hook called by {@link DSHttpAdapter#GET}. If this method
   * returns a promise then {@link DSHttpAdapter#GET} will wait for the
   * promise to resolve before continuing. If this method returns any other
   * value or the promise resolves with a value, then {@link DSHttpAdapter#create}
   * will resolve with that same value, then the `config` argument passed to
   * {@link DSHttpAdapter#GET} will be replaced by the value.
   *
   * @memberof DSHttpAdapter
   * @instance
   * @param {Object} url The `url` argument passed to {@link DSHttpAdapter#GET}.
   * @param {Object} config The `config` argument passed to {@link DSHttpAdapter#GET}.
   * @param {Object} opts The `opts` argument passed to {@link DSHttpAdapter#GET}.
   */
  beforeGET () {},

  /**
   * Lifecycle hook called by {@link DSHttpAdapter#HTTP}. If this method
   * returns a promise then {@link DSHttpAdapter#HTTP} will wait for the
   * promise to resolve before continuing. If this method returns any other
   * value or the promise resolves with a value, then {@link DSHttpAdapter#create}
   * will resolve with that same value, then the `config` argument passed to
   * {@link DSHttpAdapter#HTTP} will be replaced by the value.
   *
   * @memberof DSHttpAdapter
   * @instance
   * @param {Object} config The `config` argument passed to {@link DSHttpAdapter#HTTP}.
   * @param {Object} opts The `opts` argument passed to {@link DSHttpAdapter#HTTP}.
   */
  beforeHTTP () {},

  /**
   * Lifecycle hook called by {@link DSHttpAdapter#POST}. If this method
   * returns a promise then {@link DSHttpAdapter#POST} will wait for the
   * promise to resolve before continuing. If this method returns any other
   * value or the promise resolves with a value, then {@link DSHttpAdapter#create}
   * will resolve with that same value, then the `config` argument passed to
   * {@link DSHttpAdapter#POST} will be replaced by the value.
   *
   * @memberof DSHttpAdapter
   * @instance
   * @param {Object} url The `url` argument passed to {@link DSHttpAdapter#POST}.
   * @param {Object} data The `data` argument passed to {@link DSHttpAdapter#POST}.
   * @param {Object} config The `config` argument passed to {@link DSHttpAdapter#POST}.
   * @param {Object} opts The `opts` argument passed to {@link DSHttpAdapter#POST}.
   */
  beforePOST () {},

  /**
   * Lifecycle hook called by {@link DSHttpAdapter#PUT}. If this method
   * returns a promise then {@link DSHttpAdapter#PUT} will wait for the
   * promise to resolve before continuing. If this method returns any other
   * value or the promise resolves with a value, then {@link DSHttpAdapter#create}
   * will resolve with that same value, then the `config` argument passed to
   * {@link DSHttpAdapter#PUT} will be replaced by the value.
   *
   * @memberof DSHttpAdapter
   * @instance
   * @param {Object} url The `url` argument passed to {@link DSHttpAdapter#PUT}.
   * @param {Object} data The `data` argument passed to {@link DSHttpAdapter#PUT}.
   * @param {Object} config The `config` argument passed to {@link DSHttpAdapter#PUT}.
   * @param {Object} opts The `opts` argument passed to {@link DSHttpAdapter#PUT}.
   */
  beforePUT () {},

  /**
   * Lifecycle hook called by {@link DSHttpAdapter#update}. If this method
   * returns a promise then {@link DSHttpAdapter#update} will wait for the
   * promise to resolve before continuing.
   *
   * @memberof DSHttpAdapter
   * @instance
   * @param {Object} Model The `Model` argument passed to {@link DSHttpAdapter#update}.
   * @param {(string|number)} id The `id` argument passed to {@link DSHttpAdapter#update}.
   * @param {Object} props The `props` argument passed to {@link DSHttpAdapter#update}.
   * @param {Object} opts The `opts` argument passed to {@link DSHttpAdapter#update}.
   */
  beforeUpdate () {},

  /**
   * Lifecycle hook called by {@link DSHttpAdapter#updateAll}. If this method
   * returns a promise then {@link DSHttpAdapter#updateAll} will wait for the
   * promise to resolve before continuing.
   *
   * @memberof DSHttpAdapter
   * @instance
   * @param {Object} Model The `Model` argument passed to {@link DSHttpAdapter#updateAll}.
   * @param {Object} props The `props` argument passed to {@link DSHttpAdapter#updateAll}.
   * @param {Object} query The `query` argument passed to {@link DSHttpAdapter#updateAll}.
   * @param {Object} opts The `opts` argument passed to {@link DSHttpAdapter#updateAll}.
   */
  beforeUpdateAll () {},

  /**
   * Lifecycle hook called by {@link DSHttpAdapter#updateMany}. If this method
   * returns a promise then {@link DSHttpAdapter#updateMany} will wait for the
   * promise to resolve before continuing.
   *
   * @memberof DSHttpAdapter
   * @instance
   * @param {Object} Model The `Model` argument passed to {@link DSHttpAdapter#updateMany}.
   * @param {Object} models The `models` argument passed to {@link DSHttpAdapter#updateMany}.
   * @param {Object} opts The `opts` argument passed to {@link DSHttpAdapter#updateMany}.
   */
  beforeUpdateMany () {},

  /**
   * Create a new the entity from the provided `props`.
   *
   * {@link DSHttpAdapter#beforeCreate} will be called before calling
   * {@link DSHttpAdapter#POST}.
   * {@link DSHttpAdapter#afterCreate} will be called after calling
   * {@link DSHttpAdapter#POST}.
   *
   * @memberof DSHttpAdapter
   * @instance
   * @param {Object} Model The Model.
   * @param {Object} props Properties to send as the payload.
   * @param {Object} [opts] Configuration options.
   * @param {string} [opts.params] TODO
   * @param {string} [opts.suffix={@link DSHttpAdapter#suffix}] TODO
   * @return {Promise}
   */
  create (Model, props, opts) {
    const self = this
    opts = opts ? copy(opts) : {}
    opts.params || (opts.params = {})
    opts.params = self.queryTransform(Model, opts.params, opts)
    opts.suffix || (opts.suffix = Model.suffix)
    opts.op = 'create'
    self.dbg(opts.op, Model, props, opts)
    return resolve(self.beforeCreate(Model, props, opts)).then(function () {
      return self.POST(
        self.getPath('create', Model, props, opts),
        self.serialize(Model, props, opts),
        opts
      )
    }).then(function (response) {
      return self.deserialize(Model, response, opts)
    }).then(function (data) {
      return resolve(self.afterCreate(Model, props, opts, data)).then(function (_data) {
        return _data || data
      })
    })
  },

  /**
   * Create multiple new entities in batch.
   *
   * {@link DSHttpAdapter#beforeCreateMany} will be called before calling
   * {@link DSHttpAdapter#POST}.
   * {@link DSHttpAdapter#afterCreateMany} will be called after calling
   * {@link DSHttpAdapter#POST}.
   *
   * @memberof DSHttpAdapter
   * @instance
   * @param {Object} Model The Model.
   * @param {Array} models Array of property objects to send as the payload.
   * @param {Object} [opts] Configuration options.
   * @param {string} [opts.params] TODO
   * @param {string} [opts.suffix={@link DSHttpAdapter#suffix}] TODO
   * @return {Promise}
   */
  createMany (Model, models, opts) {
    const self = this
    opts = opts ? copy(opts) : {}
    opts.params || (opts.params = {})
    opts.params = self.queryTransform(Model, opts.params, opts)
    opts.suffix || (opts.suffix = Model.suffix)
    opts.op = 'createMany'
    self.dbg(opts.op, Model, models, opts)
    return resolve(self.beforeCreateMany(Model, models, opts)).then(function () {
      return self.POST(
        self.getPath('createMany', Model, null, opts),
        self.serialize(Model, models, opts),
        opts
      )
    }).then(function (response) {
      return self.deserialize(Model, response, opts)
    }).then(function (data) {
      return resolve(self.afterCreateMany(Model, models, opts, data)).then(function (_data) {
        return _data || data
      })
    })
  },

  /**
   * Call {@link DSHttpAdapter#log} at the "debug" level.
   *
   * @memberof DSHttpAdapter
   * @instance
   * @param {...*} [args] Args passed to {@link DSHttpAdapter#log}.
   */
  dbg (...args) {
    this.log('debug', ...args)
  },

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

  /**
   * Transform the server response object into the payload that will be returned
   * to JSData.
   *
   * @memberof DSHttpAdapter
   * @instance
   * @param {Object} Model The Model used for the operation.
   * @param {Object} response Response object from {@link DSHttpAdapter#HTTP}.
   * @param {Object} opts Configuration options.
   * @return {(Object|Array)} Deserialized data.
   */
  deserialize (Model, response, opts) {
    opts || (opts = {})
    if (isFunction(opts.deserialize)) {
      return opts.deserialize(Model, response, opts)
    }
    if (isFunction(Model.deserialize)) {
      return Model.deserialize(Model, response, opts)
    }
    if (opts.raw) {
      return response
    }
    return response ? ('data' in response ? response.data : response) : response
  },

  /**
   * Destroy the entity with the given primary key.
   *
   * {@link DSHttpAdapter#beforeDestroy} will be called before calling
   * {@link DSHttpAdapter#DEL}.
   * {@link DSHttpAdapter#afterDestroy} will be called after calling
   * {@link DSHttpAdapter#DEL}.
   *
   * @memberof DSHttpAdapter
   * @instance
   * @param {Object} Model The Model.
   * @param {(string|number)} id Primary key of the entity to destroy.
   * @param {Object} [opts] Configuration options.
   * @param {string} [opts.params] TODO
   * @param {string} [opts.suffix={@link DSHttpAdapter#suffix}] TODO
   * @return {Promise}
   */
  destroy (Model, id, opts) {
    const self = this
    opts = opts ? copy(opts) : {}
    opts.params || (opts.params = {})
    opts.params = self.queryTransform(Model, opts.params, opts)
    opts.suffix || (opts.suffix = Model.suffix)
    opts.op = 'destroy'
    self.dbg(opts.op, Model, id, opts)
    return resolve(self.beforeDestroy(Model, id, opts)).then(function () {
      return self.DEL(
        self.getPath('destroy', Model, id, opts),
        opts
      )
    }).then(function (response) {
      return self.deserialize(Model, response, opts)
    }).then(function (data) {
      return resolve(self.afterDestroy(Model, id, opts, data)).then(function (_data) {
        return _data || data
      })
    })
  },

  /**
   * Destroy the entities that match the selection `query`.
   *
   * {@link DSHttpAdapter#beforeDestroyAll} will be called before calling
   * {@link DSHttpAdapter#DEL}.
   * {@link DSHttpAdapter#afterDestroyAll} will be called after calling
   * {@link DSHttpAdapter#DEL}.
   *
   * @memberof DSHttpAdapter
   * @instance
   * @param {Object} Model The Model.
   * @param {Object} query Selection query.
   * @param {Object} [opts] Configuration options.
   * @param {string} [opts.params] TODO
   * @param {string} [opts.suffix={@link DSHttpAdapter#suffix}] TODO
   * @return {Promise}
   */
  destroyAll (Model, query, opts) {
    const self = this
    query || (query = {})
    opts = opts ? copy(opts) : {}
    opts.params || (opts.params = {})
    deepMixIn(opts.params, query)
    opts.params = self.queryTransform(Model, opts.params, opts)
    opts.suffix || (opts.suffix = Model.suffix)
    opts.op = 'destroyAll'
    self.dbg(opts.op, Model, query, opts)
    return resolve(self.beforeDestroyAll(Model, query, opts)).then(function () {
      return self.DEL(
        self.getPath('destroyAll', Model, null, opts),
        opts
      )
    }).then(function (response) {
      return self.deserialize(Model, response, opts)
    }).then(function (data) {
      return resolve(self.afterDestroyAll(Model, query, opts, data)).then(function (_data) {
        return _data || data
      })
    })
  },

  /**
   * Log an error.
   *
   * @memberof DSHttpAdapter
   * @instance
   * @param {...*} [args] Arguments to log.
   */
  error (...args) {
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

    if (config.data) {
      requestConfig.body = toJson(config.data)
    }

    return fetch(new Request(buildUrl(config.url, config.params), requestConfig)).then(function (response) {
      response.config = {
        method: config.method,
        url: config.url
      }
      return response.json().then(function (data) {
        response.data = data
        return response
      })
    })
  },

  /**
   * Retrieve the entity with the given primary key.
   *
   * {@link DSHttpAdapter#beforeFind} will be called before calling
   * {@link DSHttpAdapter#GET}.
   * {@link DSHttpAdapter#afterFind} will be called after calling
   * {@link DSHttpAdapter#GET}.
   *
   * @memberof DSHttpAdapter
   * @instance
   * @param {Object} Model The Model.
   * @param {(string|number)} id Primary key of the entity to retrieve.
   * @param {Object} [opts] Configuration options.
   * @param {string} [opts.params] TODO
   * @param {string} [opts.suffix={@link DSHttpAdapter#suffix}] TODO
   * @return {Promise}
   */
  find (Model, id, opts) {
    const self = this
    opts = opts ? copy(opts) : {}
    opts.params || (opts.params = {})
    opts.params = self.queryTransform(Model, opts.params, opts)
    opts.suffix || (opts.suffix = Model.suffix)
    opts.op = 'find'
    self.dbg(opts.op, Model, id, opts)
    return resolve(self.beforeFind(Model, id, opts)).then(function () {
      return self.GET(
        self.getPath('find', Model, id, opts),
        opts
      )
    }).then(function (response) {
      return self.deserialize(Model, response, opts)
    }).then(function (data) {
      return resolve(self.afterFind(Model, id, opts, data)).then(function (_data) {
        return _data || data
      })
    })
  },

  /**
   * Retrieve the entities that match the selection `query`.
   *
   * {@link DSHttpAdapter#beforeFindAll} will be called before calling
   * {@link DSHttpAdapter#GET}.
   * {@link DSHttpAdapter#afterFindAll} will be called after calling
   * {@link DSHttpAdapter#GET}.
   *
   * @memberof DSHttpAdapter
   * @instance
   * @param {Object} Model The Model.
   * @param {Object} query Selection query.
   * @param {Object} [opts] Configuration options.
   * @param {string} [opts.params] TODO
   * @param {string} [opts.suffix={@link DSHttpAdapter#suffix}] TODO
   * @return {Promise}
   */
  findAll (Model, query, opts) {
    const self = this
    query || (query = {})
    opts = opts ? copy(opts) : {}
    opts.params || (opts.params = {})
    opts.suffix || (opts.suffix = Model.suffix)
    opts.op = 'findAll'
    self.dbg(opts.op, Model, query, opts)
    deepMixIn(opts.params, query)
    opts.params = self.queryTransform(Model, opts.params, opts)
    return resolve(self.beforeFindAll(Model, query, opts)).then(function () {
      return self.GET(
        self.getPath('findAll', Model, opts.params, opts),
        opts
      )
    }).then(function (response) {
      return self.deserialize(Model, response, opts)
    }).then(function (data) {
      return resolve(self.afterFindAll(Model, query, opts, data)).then(function (_data) {
        return _data || data
      })
    })
  },

  /**
   * { function_description }
   *
   * @memberof DSHttpAdapter
   * @instance
   * @param {string} url The url for the request.
   * @param {Object} config Request configuration options.
   * @param {Object} [opts] Configuration options.
   * @return {Promise}
   */
  GET (url, config, opts) {
    const self = this
    config || (config = {})
    config.url = url || config.url
    config.method = config.method || 'get'
    return resolve(self.beforeGET(url, config, opts)).then(function (_config) {
      config = _config || config
      return self.HTTP(config, opts)
    }).then(function (response) {
      return resolve(self.afterGET(url, config, opts, response)).then(function (_response) {
        return _response || response
      })
    })
  },

  /**
   * @memberof DSHttpAdapter
   * @instance
   * @param {*} Model { description }
   * @param {*} id { description }
   * @param {boolean} opts { description }
   * @return {string} Full path.
   */
  getEndpoint (Model, id, opts) {
    opts || (opts = {})
    opts.params || (opts.params = {})

    let item
    const parentKey = Model.parentKey
    const endpoint = opts.hasOwnProperty('endpoint') ? opts.endpoint : Model.endpoint
    let parentField = Model.parentField
    const parentDef = Model.parent ? Model.getResource(Model.parent) : undefined
    let parentId = opts.params[parentKey]

    if (parentId === false || !parentKey || !parentDef) {
      if (parentId === false) {
        delete opts.params[parentKey]
      }
      return endpoint
    } else {
      delete opts.params[parentKey]

      if (isString(id) || isNumber(id)) {
        item = Model.get(id)
      } else if (isObject(id)) {
        item = id
      }

      if (item) {
        parentId = parentId || item[parentKey] || (item[parentField] ? item[parentField][parentDef.idAttribute] : null)
      }

      if (parentId) {
        delete opts.endpoint
        const _opts = {}
        forOwn(opts, function (value, key) {
          _opts[key] = value
        })
        _(_opts, parentDef)
        return makePath(this.getEndpoint(parentDef, parentId, _opts, parentId, endpoint))
      } else {
        return endpoint
      }
    }
  },

  /**
   * @memberof DSHttpAdapter
   * @instance
   * @param {string} method TODO
   * @param {*} Model TODO
   * @param {(string|number)?} id TODO
   * @param {Object} opts Configuration options.
   */
  getPath (method, Model, id, opts) {
    const self = this
    opts || (opts = {})
    const args = [
      opts.basePath === undefined ? (Model.basePath === undefined ? self.basePath : Model.basePath) : opts.basePath,
      self.getEndpoint(Model, (isString(id) || isNumber(id) || method === 'create') ? id : null, opts)
    ]
    if (method === 'find' || method === 'update' || method === 'destroy') {
      args.push(id)
    }
    return makePath.apply(utils, args)
  },

  /**
   * Make an Http request.
   *
   * @memberof DSHttpAdapter
   * @instance
   * @param {Object} config Request configuration options.
   * @param {Object} [opts] Configuration options.
   * @return {Promise}
   */
  HTTP (config, opts) {
    const self = this
    const start = new Date()
    opts || (opts = {})
    config = copy(config)
    config = deepMixIn(config, self.httpConfig)
    if (self.forceTrailingSlash && config.url[config.url.length - 1] !== '/') {
      config.url += '/'
    }
    config.method = config.method.toUpperCase()
    const suffix = config.suffix || opts.suffix || self.suffix
    if (suffix && config.url.substr(config.url.length - suffix.length) !== suffix) {
      config.url += suffix
    }

    function logResponse (data) {
      const str = `${start.toUTCString()} - ${config.method.toUpperCase()} ${config.url} - ${data.status} ${(new Date().getTime() - start.getTime())}ms`
      if (data.status >= 200 && data.status < 300) {
        if (self.log) {
          self.dbg('debug', str, data)
        }
        return data
      } else {
        if (self.error) {
          self.error(`'FAILED: ${str}`, data)
        }
        return reject(data)
      }
    }

    if (!self.http) {
      throw new Error('You have not configured this adapter with an http library!')
    }

    return resolve(self.beforeHTTP(config, opts)).then(function (_config) {
      config = _config || config
      if (hasFetch && (self.useFetch || opts.useFetch || !self.http)) {
        return self.fetch(config, opts).then(logResponse, logResponse)
      }
      return self.http(config).then(logResponse, logResponse).catch(function (err) {
        return self.responseError(err, config, opts)
      })
    }).then(function (response) {
      return resolve(self.afterHTTP(config, opts, response)).then(function (_response) {
        return _response || response
      })
    })
  },

  /**
   * Log the provided arguments at the specified leve.
   *
   * @memberof DSHttpAdapter
   * @instance
   * @param {string} level Log level.
   * @param {...*} [args] Arguments to log.
   */
  log (level, ...args) {
    if (level && !args.length) {
      args.push(level)
      level = 'debug'
    }
    if (level === 'debug' && !this.debug) {
      return
    }
    const prefix = `${level.toUpperCase()}: (${this.name})`
    if (console[level]) {
      console[level](prefix, ...args)
    } else {
      console.log(prefix, ...args)
    }
  },

  /**
   * { function_description }
   *
   * @memberof DSHttpAdapter
   * @instance
   * @param {*} url { description }
   * @param {*} data { description }
   * @param {*} config { description }
   * @param {Object} [opts] Configuration options.
   * @return {Promise}
   */
  POST (url, data, config, opts) {
    const self = this
    config || (config = {})
    config.url = url || config.url
    config.data = data || config.data
    config.method = config.method || 'post'
    return resolve(self.beforePOST(url, data, config, opts)).then(function (_config) {
      config = _config || config
      return self.HTTP(config, opts)
    }).then(function (response) {
      return resolve(self.afterPOST(url, data, config, opts, response)).then(function (_response) {
        return _response || response
      })
    })
  },

  /**
   * { function_description }
   *
   * @memberof DSHttpAdapter
   * @instance
   * @param {*} url { description }
   * @param {*} data { description }
   * @param {*} config { description }
   * @param {Object} [opts] Configuration options.
   * @return {Promise}
   */
  PUT (url, data, config, opts) {
    const self = this
    config || (config = {})
    config.url = url || config.url
    config.data = data || config.data
    config.method = config.method || 'put'
    return resolve(self.beforePUT(url, data, config, opts)).then(function (_config) {
      config = _config || config
      return self.HTTP(config, opts)
    }).then(function (response) {
      return resolve(self.afterPUT(url, data, config, opts, response)).then(function (_response) {
        return _response || response
      })
    })
  },

  /**
   * { function_description }
   *
   * @memberof DSHttpAdapter
   * @instance
   * @param {*} Model { description }
   * @param {*} params { description }
   * @param {*} opts { description }
   * @return {*} Transformed params.
   */
  queryTransform (Model, params, opts) {
    opts || (opts = {})
    if (isFunction(opts.queryTransform)) {
      return opts.queryTransform(Model, params, opts)
    }
    if (isFunction(Model.queryTransform)) {
      return Model.queryTransform(Model, params, opts)
    }
    return params
  },

  /**
   * Error handler invoked when the promise returned by {@link DSHttpAdapter#http}
   * is rejected. Default implementation is to just return the error wrapped in
   * a rejected Promise, aka rethrow the error. {@link DSHttpAdapter#http} is
   * called by {@link DSHttpAdapter#HTTP}.
   *
   * @memberof DSHttpAdapter
   * @instance
   * @param {*} err The error that {@link DSHttpAdapter#http} rejected with.
   * @param {*} config The `config` argument that was passed to {@link DSHttpAdapter#HTTP}.
   * @param {*} opts The `opts` argument that was passed to {@link DSHttpAdapter#HTTP}.
   * @return {Promise}
   */
  responseError (err, config, opts) {
    return reject(err)
  },

  /**
   * { function_description }
   *
   * @memberof DSHttpAdapter
   * @instance
   * @param {*} Model { description }
   * @param {*} data { description }
   * @param {*} opts { description }
   * @return {*} Serialized data.
   */
  serialize (Model, data, opts) {
    opts || (opts = {})
    if (isFunction(opts.serialize)) {
      return opts.serialize(Model, data, opts)
    }
    if (isFunction(Model.serialize)) {
      return Model.serialize(Model, data, opts)
    }
    return data
  },

  /**
   * { function_description }
   *
   * @memberof DSHttpAdapter
   * @instance
   * @param {*} Model { description }
   * @param {*} id { description }
   * @param {*} props { description }
   * @param {Object} [opts] Configuration options.
   * @return {Promise}
   */
  update (Model, id, props, opts) {
    const self = this
    opts = opts ? copy(opts) : {}
    opts.params || (opts.params = {})
    opts.params = self.queryTransform(Model, opts.params, opts)
    opts.suffix || (opts.suffix = Model.suffix)
    opts.op = 'update'
    self.dbg(opts.op, Model, id, props, opts)
    return resolve(self.beforeUpdate(Model, id, props, opts)).then(function () {
      return self.PUT(
        self.getPath('update', Model, id, opts),
        self.serialize(Model, props, opts),
        opts
      )
    }).then(function (response) {
      return self.deserialize(Model, response, opts)
    }).then(function (data) {
      return resolve(self.afterUpdate(Model, id, props, opts, data)).then(function (_data) {
        return _data || data
      })
    })
  },

  /**
   * { function_description }
   *
   * @memberof DSHttpAdapter
   * @instance
   * @param {*} Model { description }
   * @param {*} props { description }
   * @param {*} query { description }
   * @param {Object} [opts] Configuration options.
   * @return {Promise}
   */
  updateAll (Model, props, query, opts) {
    const self = this
    query || (query = {})
    opts = opts ? copy(opts) : {}
    opts.params || (opts.params = {})
    deepMixIn(opts.params, query)
    opts.params = self.queryTransform(Model, opts.params, opts)
    opts.suffix || (opts.suffix = Model.suffix)
    opts.op = 'updateAll'
    self.dbg(opts.op, Model, props, query, opts)
    return resolve(self.beforeUpdateAll(Model, props, query, opts)).then(function () {
      return self.PUT(
        self.getPath('updateAll', Model, null, opts),
        self.serialize(Model, props, opts),
        opts
      )
    }).then(function (response) {
      return self.deserialize(Model, response, opts)
    }).then(function (data) {
      return resolve(self.afterUpdateAll(Model, props, query, opts, data)).then(function (_data) {
        return _data || data
      })
    })
  },

  /**
   * Update multiple entities in batch.
   *
   * {@link DSHttpAdapter#beforeUpdateMany} will be called before calling
   * {@link DSHttpAdapter#PUT}.
   * {@link DSHttpAdapter#afterUpdateMany} will be called after calling
   * {@link DSHttpAdapter#PUT}.
   *
   * @memberof DSHttpAdapter
   * @instance
   * @param {Object} Model The Model.
   * @param {Array} models Array of property objects to send as the payload.
   * @param {Object} [opts] Configuration options.
   * @param {string} [opts.params] TODO
   * @param {string} [opts.suffix={@link DSHttpAdapter#suffix}] TODO
   * @return {Promise}
   */
  updateMany (Model, models, opts) {
    const self = this
    opts = opts ? copy(opts) : {}
    opts.params || (opts.params = {})
    opts.params = self.queryTransform(Model, opts.params, opts)
    opts.suffix || (opts.suffix = Model.suffix)
    opts.op = 'updateMany'
    self.dbg(opts.op, Model, models, opts)
    return resolve(self.beforeUpdateMany(Model, models, opts)).then(function () {
      return self.PUT(
        self.getPath('updateMany', Model, null, opts),
        self.serialize(Model, models, opts),
        opts
      )
    }).then(function (response) {
      return self.deserialize(Model, response, opts)
    }).then(function (data) {
      return resolve(self.afterUpdateMany(Model, models, opts, data)).then(function (_data) {
        return _data || data
      })
    })
  }
})

/**
 * Add an Http actions to a Model.
 *
 * @name DSHttpAdapter.addAction
 * @method
 * @param {string} name Name of the new action.
 * @param {Object} [opts] Action configuration
 * @param {string} [opts.adapter]
 * @param {string} [opts.pathname]
 * @param {Function} [opts.request]
 * @param {Function} [opts.response]
 * @param {Function} [opts.responseError]
 * @return {Function} Decoration function, which should be passed the Model to
 * decorate when invoked.
 */
DSHttpAdapter.addAction = function (name, opts) {
  if (!name || !isString(name)) {
    throw new TypeError('action(name[, opts]): Expected: string, Found: ' + typeof name)
  }
  return function (Model) {
    if (Model[name]) {
      throw new Error('action(name[, opts]): ' + name + ' already exists on target!')
    }
    opts.request = opts.request || function (config) { return config }
    opts.response = opts.response || function (response) { return response }
    opts.responseError = opts.responseError || function (err) { return reject(err) }
    Model[name] = function (id, _opts) {
      if (isObject(id)) {
        _opts = id
      }
      _opts = _opts || {}
      let adapter = this.getAdapter(opts.adapter || this.defaultAdapter || 'http')
      let config = {}
      fillIn(config, opts)
      if (!_opts.hasOwnProperty('endpoint') && config.endpoint) {
        _opts.endpoint = config.endpoint
      }
      if (typeof _opts.getEndpoint === 'function') {
        config.url = _opts.getEndpoint(this, _opts)
      } else {
        let args = [
          _opts.basePath || this.basePath || adapter.defaults.basePath,
          adapter.getEndpoint(this, isSorN(id) ? id : null, _opts)
        ]
        if (isSorN(id)) {
          args.push(id)
        }
        args.push(opts.pathname || name)
        config.url = makePath.apply(null, args)
      }
      config.method = config.method || 'GET'
      config.modelName = this.name
      deepMixIn(config)(_opts)
      return resolve(config)
        .then(_opts.request || opts.request)
        .then(function (config) { return adapter.HTTP(config) })
        .then(function (data) {
          if (data && data.config) {
            data.config.modelName = this.name
          }
          return data
        })
        .then(_opts.response || opts.response, _opts.responseError || opts.responseError)
    }
    return Model
  }
}

/**
 * Add multiple Http actions to a Model. See {@link DSHttpAdapter.addAction} for
 * action configuration options.
 *
 * @name DSHttpAdapter.addActions
 * @method
 * @param {Object.<string, Object>} opts Object where the key is an action name
 * and the value is the configuration for the action.
 * @return {Function} Decoration function, which should be passed the Model to
 * decorate when invoked.
 */
DSHttpAdapter.addActions = function (opts) {
  opts || (opts = {})
  return function (Model) {
    forOwn(Model, function (value, key) {
      DSHttpAdapter.addAction(key, value)(Model)
    })
    return Model
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
