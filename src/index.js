/* global fetch:true Headers:true Request:true */

import {utils} from 'js-data'
import axios from '../node_modules/axios/dist/axios'
import {
  Adapter,
  noop,
  noop2
} from '../node_modules/js-data-adapter/src/index'

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

  utils.forOwn(params, function (val, key) {
    if (val === null || typeof val === 'undefined') {
      return
    }
    if (!utils.isArray(val)) {
      val = [val]
    }

    val.forEach(function (v) {
      if (window.toString.call(v) === '[object Date]') {
        v = v.toISOString()
      } else if (utils.isObject(v)) {
        v = utils.toJson(v)
      }
      parts.push(`${encode(key)}=${encode(v)}`)
    })
  })

  if (parts.length > 0) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + parts.join('&')
  }

  return url
}

const DEFAULTS = {
  // Default and user-defined settings
  /**
   * @name HttpAdapter#basePath
   * @type {string}
   */
  basePath: '',

  /**
   * @name HttpAdapter#forceTrailingSlash
   * @type {boolean}
   * @default false
   */
  forceTrailingSlash: false,

  /**
   * @name HttpAdapter#http
   * @type {Function}
   */
  http: axios,

  /**
   * @name HttpAdapter#httpConfig
   * @type {Object}
   */
  httpConfig: {},

  /**
   * @name HttpAdapter#suffix
   * @type {string}
   */
  suffix: '',

  /**
   * @name HttpAdapter#useFetch
   * @type {boolean}
   * @default false
   */
  useFetch: false
}

/**
 * HttpAdapter class.
 *
 * @class HttpAdapter
 * @extends Adapter
 * @param {Object} [opts] Configuration options.
 * @param {string} [opts.basePath=''] TODO
 * @param {boolean} [opts.debug=false] TODO
 * @param {boolean} [opts.forceTrailingSlash=false] TODO
 * @param {Object} [opts.http=axios] TODO
 * @param {Object} [opts.httpConfig={}] TODO
 * @param {string} [opts.suffix=''] TODO
 * @param {boolean} [opts.useFetch=false] TODO
 */
export function HttpAdapter (opts) {
  utils.classCallCheck(this, HttpAdapter)

  opts || (opts = {})
  // Fill in any missing options with the defaults
  utils.fillIn(opts, DEFAULTS)
  Adapter.call(this, opts)
}

/**
 * @name module:js-data-http.HttpAdapter
 * @see HttpAdapter
 */

Adapter.extend({
  constructor: HttpAdapter,

  /**
   * @name HttpAdapter#afterDEL
   * @method
   * @param {string} url
   * @param {Object} config
   * @param {Object} opts
   * @param {Object} response
   */
  afterDEL: noop2,

  /**
   * @name HttpAdapter#afterGET
   * @method
   * @param {string} url
   * @param {Object} config
   * @param {Object} opts
   * @param {Object} response
   */
  afterGET: noop2,

  /**
   * @name HttpAdapter#afterHTTP
   * @method
   * @param {Object} config
   * @param {Object} opts
   * @param {Object} response
   */
  afterHTTP: noop2,

  /**
   * @name HttpAdapter#afterPOST
   * @method
   * @param {string} url
   * @param {Object} data
   * @param {Object} config
   * @param {Object} opts
   * @param {Object} response
   */
  afterPOST: noop2,

  /**
   * @name HttpAdapter#afterPUT
   * @method
   * @param {string} url
   * @param {Object} data
   * @param {Object} config
   * @param {Object} opts
   * @param {Object} response
   */
  afterPUT: noop2,

  /**
   * @name HttpAdapter#beforeDEL
   * @method
   * @param {Object} url
   * @param {Object} config
   * @param {Object} opts
   */
  beforeDEL: noop,

  /**
   * @name HttpAdapter#beforeGET
   * @method
   * @param {Object} url
   * @param {Object} config
   * @param {Object} opts
   */
  beforeGET: noop,

  /**
   * @name HttpAdapter#beforeHTTP
   * @method
   * @param {Object} config
   * @param {Object} opts
   */
  beforeHTTP: noop,

  /**
   * @name HttpAdapter#beforePOST
   * @method
   * @param {Object} url
   * @param {Object} data
   * @param {Object} config
   * @param {Object} opts
   */
  beforePOST: noop,

  /**
   * @name HttpAdapter#beforePUT
   * @method
   * @param {Object} url
   * @param {Object} data
   * @param {Object} config
   * @param {Object} opts
   */
  beforePUT: noop,

  _count (mapper, query, opts) {
    return this.GET(
      this.getPath('count', mapper, opts.params, opts),
      opts
    ).then((response) => this._end(mapper, opts, response))
  },

  _create (mapper, props, opts) {
    return this.POST(
      this.getPath('create', mapper, props, opts),
      this.serialize(mapper, props, opts),
      opts
    ).then((response) => this._end(mapper, opts, response))
  },

  _createMany (mapper, props, opts) {
    return this.POST(
      this.getPath('createMany', mapper, null, opts),
      this.serialize(mapper, props, opts),
      opts
    ).then((response) => this._end(mapper, opts, response))
  },

  _destroy (mapper, id, opts) {
    return this.DEL(
      this.getPath('destroy', mapper, id, opts),
      opts
    ).then((response) => this._end(mapper, opts, response))
  },

  _destroyAll (mapper, query, opts) {
    return this.DEL(
      this.getPath('destroyAll', mapper, null, opts),
      opts
    ).then((response) => this._end(mapper, opts, response))
  },

  _end (mapper, opts, response) {
    return [this.deserialize(mapper, response, opts), response]
  },

  _find (mapper, id, opts) {
    return this.GET(
      this.getPath('find', mapper, id, opts),
      opts
    ).then((response) => this._end(mapper, opts, response))
  },

  _findAll (mapper, query, opts) {
    return this.GET(
      this.getPath('findAll', mapper, opts.params, opts),
      opts
    ).then((response) => this._end(mapper, opts, response))
  },

  _sum (mapper, field, query, opts) {
    return this.GET(
      this.getPath('sum', mapper, opts.params, opts),
      opts
    ).then((response) => this._end(mapper, opts, response))
  },

  _update (mapper, id, props, opts) {
    return this.PUT(
      this.getPath('update', mapper, id, opts),
      this.serialize(mapper, props, opts),
      opts
    ).then((response) => this._end(mapper, opts, response))
  },

  _updateAll (mapper, props, query, opts) {
    return this.PUT(
      this.getPath('updateAll', mapper, null, opts),
      this.serialize(mapper, props, opts),
      opts
    ).then((response) => this._end(mapper, opts, response))
  },

  _updateMany (mapper, records, opts) {
    return this.PUT(
      this.getPath('updateMany', mapper, null, opts),
      this.serialize(mapper, records, opts),
      opts
    ).then((response) => this._end(mapper, opts, response))
  },

  /**
   * Retrieve the number of records that match the selection `query`.
   *
   * @name HttpAdapter#count
   * @method
   * @param {Object} mapper The mapper.
   * @param {Object} query Selection query.
   * @param {Object} [opts] Configuration options.
   * @param {string} [opts.params] TODO
   * @param {string} [opts.suffix={@link HttpAdapter#suffix}] TODO
   * @return {Promise}
   */
  count (mapper, query, opts) {
    query || (query = {})
    opts || (opts = {})
    opts.params = this.getParams(opts)
    opts.params.count = true
    opts.suffix = this.getSuffix(mapper, opts)
    utils.deepMixIn(opts.params, query)
    opts.params = this.queryTransform(mapper, opts.params, opts)
    return Adapter.prototype.count.call(this, mapper, query, opts)
  },

  /**
   * Create a new the record from the provided `props`.
   *
   * @name HttpAdapter#create
   * @method
   * @param {Object} mapper The mapper.
   * @param {Object} props Properties to send as the payload.
   * @param {Object} [opts] Configuration options.
   * @param {string} [opts.params] TODO
   * @param {string} [opts.suffix={@link HttpAdapter#suffix}] TODO
   * @return {Promise}
   */
  create (mapper, props, opts) {
    opts || (opts = {})
    opts.params = this.getParams(opts)
    opts.params = this.queryTransform(mapper, opts.params, opts)
    opts.suffix = this.getSuffix(mapper, opts)
    return Adapter.prototype.create.call(this, mapper, props, opts)
  },

  /**
   * Create multiple new records in batch.
   *
   * @name HttpAdapter#createMany
   * @method
   * @param {Object} mapper The mapper.
   * @param {Array} props Array of property objects to send as the payload.
   * @param {Object} [opts] Configuration options.
   * @param {string} [opts.params] TODO
   * @param {string} [opts.suffix={@link HttpAdapter#suffix}] TODO
   * @return {Promise}
   */
  createMany (mapper, props, opts) {
    opts || (opts = {})
    opts.params = this.getParams(opts)
    opts.params = this.queryTransform(mapper, opts.params, opts)
    opts.suffix = this.getSuffix(mapper, opts)
    return Adapter.prototype.createMany.call(this, mapper, props, opts)
  },

  /**
   * Make an Http request to `url` according to the configuration in `config`.
   *
   * @name HttpAdapter#DEL
   * @method
   * @param {string} url Url for the request.
   * @param {Object} [config] Http configuration that will be passed to
   * {@link HttpAdapter#HTTP}.
   * @param {Object} [opts] Configuration options.
   * @return {Promise}
   */
  DEL (url, config, opts) {
    let op
    config || (config = {})
    opts || (opts = {})
    config.url = url || config.url
    config.method = config.method || 'delete'

    // beforeDEL lifecycle hook
    op = opts.op = 'beforeDEL'
    return utils.resolve(this[op](url, config, opts))
      .then((_config) => {
        // Allow re-assignment from lifecycle hook
        config = _config === undefined ? config : _config
        op = opts.op = 'DEL'
        this.dbg(op, url, config, opts)
        return this.HTTP(config, opts)
      })
      .then((response) => {
        // afterDEL lifecycle hook
        op = opts.op = 'afterDEL'
        return utils.resolve(this[op](url, config, opts, response))
          .then((_response) => _response === undefined ? response : _response)
      })
  },

  /**
   * Transform the server response object into the payload that will be returned
   * to JSData.
   *
   * @name HttpAdapter#deserialize
   * @method
   * @param {Object} mapper The mapper used for the operation.
   * @param {Object} response Response object from {@link HttpAdapter#HTTP}.
   * @param {Object} opts Configuration options.
   * @return {(Object|Array)} Deserialized data.
   */
  deserialize (mapper, response, opts) {
    opts || (opts = {})
    if (utils.isFunction(opts.deserialize)) {
      return opts.deserialize(mapper, response, opts)
    }
    if (utils.isFunction(mapper.deserialize)) {
      return mapper.deserialize(mapper, response, opts)
    }
    if (response && response.hasOwnProperty('data')) {
      return response.data
    }
    return response
  },

  /**
   * Destroy the record with the given primary key.
   *
   * @name HttpAdapter#destroy
   * @method
   * @param {Object} mapper The mapper.
   * @param {(string|number)} id Primary key of the record to destroy.
   * @param {Object} [opts] Configuration options.
   * @param {string} [opts.params] TODO
   * @param {string} [opts.suffix={@link HttpAdapter#suffix}] TODO
   * @return {Promise}
   */
  destroy (mapper, id, opts) {
    opts || (opts = {})
    opts.params = this.getParams(opts)
    opts.params = this.queryTransform(mapper, opts.params, opts)
    opts.suffix = this.getSuffix(mapper, opts)
    return Adapter.prototype.destroy.call(this, mapper, id, opts)
  },

  /**
   * Destroy the records that match the selection `query`.
   *
   * @name HttpAdapter#destroyAll
   * @method
   * @param {Object} mapper The mapper.
   * @param {Object} query Selection query.
   * @param {Object} [opts] Configuration options.
   * @param {string} [opts.params] TODO
   * @param {string} [opts.suffix={@link HttpAdapter#suffix}] TODO
   * @return {Promise}
   */
  destroyAll (mapper, query, opts) {
    query || (query = {})
    opts || (opts = {})
    opts.params = this.getParams(opts)
    utils.deepMixIn(opts.params, query)
    opts.params = this.queryTransform(mapper, opts.params, opts)
    opts.suffix = this.getSuffix(mapper, opts)
    return Adapter.prototype.destroyAll.call(this, mapper, query, opts)
  },

  /**
   * Log an error.
   *
   * @name HttpAdapter#error
   * @method
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
   * @name HttpAdapter#fetch
   * @method
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
      requestConfig.body = utils.toJson(config.data)
    }

    return fetch(new Request(buildUrl(config.url, config.params), requestConfig))
      .then((response) => {
        response.config = {
          method: config.method,
          url: config.url
        }
        return response.json()
          .then((data) => {
            response.data = data
            return response
          })
      })
  },

  /**
   * Retrieve the record with the given primary key.
   *
   * @name HttpAdapter#find
   * @method
   * @param {Object} mapper The mapper.
   * @param {(string|number)} id Primary key of the record to retrieve.
   * @param {Object} [opts] Configuration options.
   * @param {string} [opts.params] TODO
   * @param {string} [opts.suffix={@link HttpAdapter#suffix}] TODO
   * @return {Promise}
   */
  find (mapper, id, opts) {
    opts || (opts = {})
    opts.params = this.getParams(opts)
    opts.params = this.queryTransform(mapper, opts.params, opts)
    opts.suffix = this.getSuffix(mapper, opts)
    return Adapter.prototype.find.call(this, mapper, id, opts)
  },

  /**
   * Retrieve the records that match the selection `query`.
   *
   * @name HttpAdapter#findAll
   * @method
   * @param {Object} mapper The mapper.
   * @param {Object} query Selection query.
   * @param {Object} [opts] Configuration options.
   * @param {string} [opts.params] TODO
   * @param {string} [opts.suffix={@link HttpAdapter#suffix}] TODO
   * @return {Promise}
   */
  findAll (mapper, query, opts) {
    query || (query = {})
    opts || (opts = {})
    opts.params = this.getParams(opts)
    opts.suffix = this.getSuffix(mapper, opts)
    utils.deepMixIn(opts.params, query)
    opts.params = this.queryTransform(mapper, opts.params, opts)
    return Adapter.prototype.findAll.call(this, mapper, query, opts)
  },

  /**
   * TODO
   *
   * @name HttpAdapter#GET
   * @method
   * @param {string} url The url for the request.
   * @param {Object} config Request configuration options.
   * @param {Object} [opts] Configuration options.
   * @return {Promise}
   */
  GET (url, config, opts) {
    let op
    config || (config = {})
    opts || (opts = {})
    config.url = url || config.url
    config.method = config.method || 'get'

    // beforeGET lifecycle hook
    op = opts.op = 'beforeGET'
    return utils.resolve(this[op](url, config, opts))
      .then((_config) => {
        // Allow re-assignment from lifecycle hook
        config = _config === undefined ? config : _config
        op = opts.op = 'GET'
        this.dbg(op, url, config, opts)
        return this.HTTP(config, opts)
      })
      .then((response) => {
        // afterGET lifecycle hook
        op = opts.op = 'afterGET'
        return utils.resolve(this[op](url, config, opts, response))
          .then((_response) => _response === undefined ? response : _response)
      })
  },

  /**
   * @name HttpAdapter#getEndpoint
   * @method
   * @param {Object} mapper TODO
   * @param {*} id TODO
   * @param {boolean} opts TODO
   * @return {string} Full path.
   */
  getEndpoint (mapper, id, opts) {
    opts || (opts = {})
    opts.params = utils.isUndefined(opts.params) ? {} : opts.params
    const relationList = mapper.relationList || []
    let endpoint = utils.isUndefined(opts.endpoint) ? (utils.isUndefined(mapper.endpoint) ? mapper.name : mapper.endpoint) : opts.endpoint

    relationList.forEach((def) => {
      if (def.type !== 'belongsTo' || !def.parent) {
        return
      }
      let item
      const parentKey = def.foreignKey
      const parentDef = def.getRelation()
      let parentId = opts.params[parentKey]

      if (parentId === false || !parentKey || !parentDef) {
        if (parentId === false) {
          delete opts.params[parentKey]
        }
        return false
      } else {
        delete opts.params[parentKey]

        if (utils.isObject(id)) {
          item = id
        }

        if (item) {
          parentId = parentId || def.getForeignKey(item) || (def.getLocalField(item) ? utils.get(def.getLocalField(item), parentDef.idAttribute) : null)
        }

        if (parentId) {
          delete opts.endpoint
          const _opts = {}
          utils.forOwn(opts, (value, key) => {
            _opts[key] = value
          })
          utils._(_opts, parentDef)
          endpoint = makePath(this.getEndpoint(parentDef, parentId, _opts), parentId, endpoint)
          return false
        }
      }
    })

    return endpoint
  },

  /**
   * @name HttpAdapter#getPath
   * @method
   * @param {string} method TODO
   * @param {Object} mapper TODO
   * @param {(string|number)?} id TODO
   * @param {Object} opts Configuration options.
   */
  getPath (method, mapper, id, opts) {
    opts || (opts = {})
    const args = [
      opts.basePath === undefined ? (mapper.basePath === undefined ? this.basePath : mapper.basePath) : opts.basePath,
      this.getEndpoint(mapper, (utils.isString(id) || utils.isNumber(id) || method === 'create') ? id : null, opts)
    ]
    if (method === 'find' || method === 'update' || method === 'destroy') {
      args.push(id)
    }
    return makePath.apply(utils, args)
  },

  getParams (opts) {
    opts || (opts = {})
    if (opts.params === undefined) {
      return {}
    }
    return utils.copy(opts.params)
  },

  getSuffix (mapper, opts) {
    opts || (opts = {})
    if (opts.suffix === undefined) {
      if (mapper.suffix === undefined) {
        return this.suffix
      }
      return mapper.suffix
    }
    return opts.suffix
  },

  /**
   * Make an Http request.
   *
   * @name HttpAdapter#HTTP
   * @method
   * @param {Object} config Request configuration options.
   * @param {Object} [opts] Configuration options.
   * @return {Promise}
   */
  HTTP (config, opts) {
    const start = new Date()
    opts || (opts = {})
    const payload = config.data
    const cache = config.cache
    const timeout = config.timeout
    config = utils.copy(config, null, null, null, ['data', 'cache', 'timeout'])
    config = utils.deepMixIn(config, this.httpConfig)
    config.data = payload
    config.cache = cache
    config.timeout = timeout
    if (this.forceTrailingSlash && config.url[config.url.length - 1] !== '/') {
      config.url += '/'
    }
    config.method = config.method.toUpperCase()
    const suffix = config.suffix || opts.suffix || this.suffix
    if (suffix && config.url.substr(config.url.length - suffix.length) !== suffix) {
      config.url += suffix
    }

    const logResponse = (data) => {
      const str = `${start.toUTCString()} - ${config.method.toUpperCase()} ${config.url} - ${data.status} ${(new Date().getTime() - start.getTime())}ms`
      if (data.status >= 200 && data.status < 300) {
        if (this.log) {
          this.dbg('debug', str, data)
        }
        return data
      } else {
        if (this.error) {
          this.error(`'FAILED: ${str}`, data)
        }
        return utils.reject(data)
      }
    }

    if (!this.http) {
      throw new Error('You have not configured this adapter with an http library!')
    }

    return utils.resolve(this.beforeHTTP(config, opts))
      .then((_config) => {
        config = _config || config
        if (hasFetch && (this.useFetch || opts.useFetch || !this.http)) {
          return this.fetch(config, opts).then(logResponse, logResponse)
        }
        return this.http(config).then(logResponse, logResponse)
          .catch((err) => this.responseError(err, config, opts))
      })
      .then((response) => {
        return utils.resolve(this.afterHTTP(config, opts, response))
          .then((_response) => _response === undefined ? response : _response)
      })
  },

  /**
   * TODO
   *
   * @name HttpAdapter#POST
   * @method
   * @param {*} url TODO
   * @param {Object} data TODO
   * @param {Object} config TODO
   * @param {Object} [opts] Configuration options.
   * @return {Promise}
   */
  POST (url, data, config, opts) {
    let op
    config || (config = {})
    opts || (opts = {})
    config.url = url || config.url
    config.data = data || config.data
    config.method = config.method || 'post'

    // beforePOST lifecycle hook
    op = opts.op = 'beforePOST'
    return utils.resolve(this[op](url, data, config, opts))
      .then((_config) => {
        // Allow re-assignment from lifecycle hook
        config = _config === undefined ? config : _config
        op = opts.op = 'POST'
        this.dbg(op, url, data, config, opts)
        return this.HTTP(config, opts)
      })
      .then((response) => {
        // afterPOST lifecycle hook
        op = opts.op = 'afterPOST'
        return utils.resolve(this[op](url, data, config, opts, response))
          .then((_response) => _response === undefined ? response : _response)
      })
  },

  /**
   * TODO
   *
   * @name HttpAdapter#PUT
   * @method
   * @param {*} url TODO
   * @param {Object} data TODO
   * @param {Object} config TODO
   * @param {Object} [opts] Configuration options.
   * @return {Promise}
   */
  PUT (url, data, config, opts) {
    let op
    config || (config = {})
    opts || (opts = {})
    config.url = url || config.url
    config.data = data || config.data
    config.method = config.method || 'put'

    // beforePUT lifecycle hook
    op = opts.op = 'beforePUT'
    return utils.resolve(this[op](url, data, config, opts))
      .then((_config) => {
        // Allow re-assignment from lifecycle hook
        config = _config === undefined ? config : _config
        op = opts.op = 'PUT'
        this.dbg(op, url, data, config, opts)
        return this.HTTP(config, opts)
      })
      .then((response) => {
        // afterPUT lifecycle hook
        op = opts.op = 'afterPUT'
        return utils.resolve(this[op](url, data, config, opts, response))
          .then((_response) => _response === undefined ? response : _response)
      })
  },

  /**
   * TODO
   *
   * @name HttpAdapter#queryTransform
   * @method
   * @param {Object} mapper TODO
   * @param {*} params TODO
   * @param {*} opts TODO
   * @return {*} Transformed params.
   */
  queryTransform (mapper, params, opts) {
    opts || (opts = {})
    if (utils.isFunction(opts.queryTransform)) {
      return opts.queryTransform(mapper, params, opts)
    }
    if (utils.isFunction(mapper.queryTransform)) {
      return mapper.queryTransform(mapper, params, opts)
    }
    return params
  },

  /**
   * Error handler invoked when the promise returned by {@link HttpAdapter#http}
   * is rejected. Default implementation is to just return the error wrapped in
   * a rejected Promise, aka rethrow the error. {@link HttpAdapter#http} is
   * called by {@link HttpAdapter#HTTP}.
   *
   * @name HttpAdapter#responseError
   * @method
   * @param {*} err The error that {@link HttpAdapter#http} rejected with.
   * @param {Object} config The `config` argument that was passed to {@link HttpAdapter#HTTP}.
   * @param {*} opts The `opts` argument that was passed to {@link HttpAdapter#HTTP}.
   * @return {Promise}
   */
  responseError (err, config, opts) {
    return utils.reject(err)
  },

  /**
   * TODO
   *
   * @name HttpAdapter#serialize
   * @method
   * @param {Object} mapper TODO
   * @param {Object} data TODO
   * @param {*} opts TODO
   * @return {*} Serialized data.
   */
  serialize (mapper, data, opts) {
    opts || (opts = {})
    if (utils.isFunction(opts.serialize)) {
      return opts.serialize(mapper, data, opts)
    }
    if (utils.isFunction(mapper.serialize)) {
      return mapper.serialize(mapper, data, opts)
    }
    return data
  },

  /**
   * Retrieve the sum of the field of the records that match the selection query.
   *
   * @name HttpAdapter#sum
   * @method
   * @param {Object} mapper The mapper.
   * @param {string} field The field to sum.
   * @param {Object} query Selection query.
   * @param {Object} [opts] Configuration options.
   * @param {string} [opts.params] TODO
   * @param {string} [opts.suffix={@link HttpAdapter#suffix}] TODO
   * @return {Promise}
   */
  sum (mapper, field, query, opts) {
    query || (query = {})
    opts || (opts = {})
    if (!utils.utils.isString(field)) {
      throw new Error('field must be a string!')
    }
    opts.params = this.getParams(opts)
    opts.params.sum = field
    opts.suffix = this.getSuffix(mapper, opts)
    utils.deepMixIn(opts.params, query)
    opts.params = this.queryTransform(mapper, opts.params, opts)
    return Adapter.prototype.sum.call(this, mapper, field, query, opts)
  },

  /**
   * TODO
   *
   * @name HttpAdapter#update
   * @method
   * @param {Object} mapper TODO
   * @param {*} id TODO
   * @param {*} props TODO
   * @param {Object} [opts] Configuration options.
   * @return {Promise}
   */
  update (mapper, id, props, opts) {
    opts || (opts = {})
    opts.params = this.getParams(opts)
    opts.params = this.queryTransform(mapper, opts.params, opts)
    opts.suffix = this.getSuffix(mapper, opts)
    return Adapter.prototype.update.call(this, mapper, id, props, opts)
  },

  /**
   * TODO
   *
   * @name HttpAdapter#updateAll
   * @method
   * @param {Object} mapper TODO
   * @param {Object} props TODO
   * @param {Object} query TODO
   * @param {Object} [opts] Configuration options.
   * @return {Promise}
   */
  updateAll (mapper, props, query, opts) {
    query || (query = {})
    opts || (opts = {})
    opts.params = this.getParams(opts)
    utils.deepMixIn(opts.params, query)
    opts.params = this.queryTransform(mapper, opts.params, opts)
    opts.suffix = this.getSuffix(mapper, opts)
    return Adapter.prototype.updateAll.call(this, mapper, props, query, opts)
  },

  /**
   * Update multiple records in batch.
   *
   * {@link HttpAdapter#beforeUpdateMany} will be called before calling
   * {@link HttpAdapter#PUT}.
   * {@link HttpAdapter#afterUpdateMany} will be called after calling
   * {@link HttpAdapter#PUT}.
   *
   * @name HttpAdapter#updateMany
   * @method
   * @param {Object} mapper The mapper.
   * @param {Array} records Array of property objects to send as the payload.
   * @param {Object} [opts] Configuration options.
   * @param {string} [opts.params] TODO
   * @param {string} [opts.suffix={@link HttpAdapter#suffix}] TODO
   * @return {Promise}
   */
  updateMany (mapper, records, opts) {
    opts || (opts = {})
    opts.params = this.getParams(opts)
    opts.params = this.queryTransform(mapper, opts.params, opts)
    opts.suffix = this.getSuffix(mapper, opts)
    return Adapter.prototype.updateMany.call(this, mapper, records, opts)
  }
})

/**
 * Add an Http actions to a mapper.
 *
 * @example
 * // CommonJS
 * var JSData = require('js-data')
 * // It is recommended to use DataStore in the browser
 * var DataStore = JSData.DataStore
 *
 * var JSDataHttp = require('js-data-http')
 * var HttpAdapter = JSDataHttp.HttpAdapter
 * var addAction = JSDataHttp.addAction
 *
 * var adapter = new HttpAdapter()
 * var store = new DataStore()
 *
 * store.registerAdapter('http', adapter, { default: true })
 * store.defineMapper('school')
 *
 * // GET /reports/schools/:school_id/teachers
 * addAction('getTeacherReports', {
 *   basePath: 'reports/schools',
 *   pathname: 'teachers',
 *   method: 'GET'
 * })(store.getMapper('school'))
 *
 * // /reports/schools/1234/teachers
 * store.getMapper('school').getTeacherReports(1234).then(function (response) {
 *   // ...
 * })
 *
 * @name module:js-data-http.addAction
 * @method
 * @param {string} name Name of the new action.
 * @param {Object} [opts] Action configuration
 * @param {string} [opts.adapter]
 * @param {string} [opts.pathname]
 * @param {Function} [opts.request]
 * @param {Function} [opts.response]
 * @param {Function} [opts.responseError]
 * @return {Function} Decoration function, which should be passed the mapper to
 * decorate when invoked.
 */
export function addAction (name, opts) {
  if (!name || !utils.isString(name)) {
    throw new TypeError('action(name[, opts]): Expected: string, Found: ' + typeof name)
  }
  return function (mapper) {
    if (mapper[name]) {
      throw new Error('action(name[, opts]): ' + name + ' already exists on target!')
    }
    opts.request = opts.request || function (config) { return config }
    opts.response = opts.response || function (response) { return response }
    opts.responseError = opts.responseError || function (err) { return utils.reject(err) }
    mapper[name] = function (id, _opts) {
      if (utils.isObject(id)) {
        _opts = id
      }
      _opts = _opts || {}
      let adapter = this.getAdapter(opts.adapter || this.defaultAdapter || 'http')
      let config = {}
      utils.fillIn(config, opts)
      if (!_opts.hasOwnProperty('endpoint') && config.endpoint) {
        _opts.endpoint = config.endpoint
      }
      if (typeof _opts.getEndpoint === 'function') {
        config.url = _opts.getEndpoint(this, _opts)
      } else {
        let args = [
          _opts.basePath || this.basePath || adapter.basePath,
          adapter.getEndpoint(this, utils.isSorN(id) ? id : null, _opts)
        ]
        if (utils.isSorN(id)) {
          args.push(id)
        }
        args.push(opts.pathname || name)
        config.url = makePath.apply(null, args)
      }
      config.method = config.method || 'GET'
      config.mapper = this.name
      utils.deepMixIn(config, _opts)
      return utils.resolve(config)
        .then(_opts.request || opts.request)
        .then((config) => adapter.HTTP(config))
        .then((data) => {
          if (data && data.config) {
            data.config.mapper = this.name
          }
          return data
        })
        .then(_opts.response || opts.response, _opts.responseError || opts.responseError)
    }
    return mapper
  }
}

/**
 * Add multiple Http actions to a mapper. See {@link HttpAdapter.addAction} for
 * action configuration options.
 *
 * @example
 * // CommonJS
 * var JSData = require('js-data')
 * // It is recommended to use DataStore in the browser
 * var DataStore = JSData.DataStore
 *
 * var JSDataHttp = require('js-data-http')
 * var HttpAdapter = JSDataHttp.HttpAdapter
 * var addActions = JSDataHttp.addActions
 *
 * var adapter = new HttpAdapter()
 * var store = new DataStore()
 *
 * store.registerAdapter('http', adapter, { default: true })
 * store.defineMapper('school')
 *
 * addActions({
 *   // GET /reports/schools/:school_id/teachers
 *   getTeacherReports: {
 *     basePath: 'reports/schools',
 *     pathname: 'teachers',
 *     method: 'GET'
 *   }
 * })(store.getMapper('school'))
 *
 * // /reports/schools/1234/teachers
 * store.getMapper('school').getTeacherReports(1234).then(function (response) {
 *   // ...
 * })
 *
 * @name module:js-data-http.addActions
 * @method
 * @param {Object.<string, Object>} opts Object where the key is an action name
 * and the value is the configuration for the action.
 * @return {Function} Decoration function, which should be passed the mapper to
 * decorate when invoked.
 */
export function addActions (opts) {
  opts || (opts = {})
  return function (mapper) {
    utils.forOwn(opts, function (value, key) {
      addAction(key, value)(mapper)
    })
    return mapper
  }
}

/**
 * Details of the current version of the `js-data-http` module.
 *
 * @name module:js-data-http.version
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
export const version = '<%= version %>'

/**
 * Registered as `js-data-http` in NPM and Bower. The build of `js-data-http`
 * that works on Node.js is registered in NPM as `js-data-http-node`. The build
 * of `js-data-http` that does not bundle `axios` is registered in NPM and Bower
 * as `js-data-fetch`.
 *
 * @example <caption>Script tag</caption>
 * var HttpAdapter = window.JSDataHttp.HttpAdapter
 * var adapter = new HttpAdapter()
 *
 * @example <caption>CommonJS</caption>
 * var HttpAdapter = require('js-data-Http').HttpAdapter
 * var adapter = new HttpAdapter()
 *
 * @example <caption>ES2015 Modules</caption>
 * import {HttpAdapter} from 'js-data-Http'
 * const adapter = new HttpAdapter()
 *
 * @example <caption>AMD</caption>
 * define('myApp', ['js-data-Http'], function (JSDataHttp) {
 *   var HttpAdapter = JSDataHttp.HttpAdapter
 *   var adapter = new HttpAdapter()
 *
 *   // ...
 * })
 *
 * @module js-data-http
 */

/**
 * Create a subclass of this HttpAdapter:
 * @example <caption>HttpAdapter.extend</caption>
 * // Normally you would do: import {HttpAdapter} from 'js-data-http'
 * // or: import {HttpAdapter} from 'js-data-http-node'
 * const JSDataHttp = require('js-data-http-node@3.0.0-beta.8')
 * const {HttpAdapter} = JSDataHttp
 * console.log('Using JSDataHttp v' + JSDataHttp.version.full)
 *
 * // Extend the class using ES2015 class syntax.
 * class CustomHttpAdapterClass extends HttpAdapter {
 *   foo () { return 'bar' }
 *   static beep () { return 'boop' }
 * }
 * const customHttpAdapter = new CustomHttpAdapterClass()
 * console.log(customHttpAdapter.foo())
 * console.log(CustomHttpAdapterClass.beep())
 *
 * // Extend the class using alternate method.
 * const OtherHttpAdapterClass = HttpAdapter.extend({
 *   foo () { return 'bar' }
 * }, {
 *   beep () { return 'boop' }
 * })
 * const otherHttpAdapter = new OtherHttpAdapterClass()
 * console.log(otherHttpAdapter.foo())
 * console.log(OtherHttpAdapterClass.beep())
 *
 * // Extend the class, providing a custom constructor.
 * function AnotherHttpAdapterClass () {
 *   HttpAdapter.call(this)
 *   this.created_at = new Date().getTime()
 * }
 * HttpAdapter.extend({
 *   constructor: AnotherHttpAdapterClass,
 *   foo () { return 'bar' }
 * }, {
 *   beep () { return 'boop' }
 * })
 * const anotherHttpAdapter = new AnotherHttpAdapterClass()
 * console.log(anotherHttpAdapter.created_at)
 * console.log(anotherHttpAdapter.foo())
 * console.log(AnotherHttpAdapterClass.beep())
 *
 * @method HttpAdapter.extend
 * @param {Object} [props={}] Properties to add to the prototype of the
 * subclass.
 * @param {Object} [props.constructor] Provide a custom constructor function
 * to be used as the subclass itself.
 * @param {Object} [classProps={}] Static properties to add to the subclass.
 * @returns {Constructor} Subclass of this HttpAdapter class.
 * @since 3.0.0
 */
