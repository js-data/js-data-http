const axios = require('axios')
import {utils} from 'js-data'
const {
  _,
  copy,
  deepMixIn,
  fillIn,
  forOwn,
  isArray,
  isNumber,
  isObject,
  isSorN,
  isString,
  // removeCircular,
  resolve,
  reject,
  toJson
} = utils

let hasFetch = false

try {
  hasFetch = window && window.fetch
} catch (e) {}

function isValidString (value) {
  return (value != null && value !== '') // jshint ignore:line
}
function join (items, separator = '') {
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
}

function buildUrl (url, params) {
  if (!params) {
    return url
  }

  var parts = []

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
      parts.push(encode(key) + '=' + encode(v))
    })
  })

  if (parts.length > 0) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + parts.join('&')
  }

  return url
}

class Defaults {
  queryTransform (resourceConfig, params) {
    return params
  }

  deserialize (resourceConfig, data) {
    return data ? ('data' in data ? data.data : data) : data
  }

  serialize (resourceConfig, data) {
    return data
  }

  log () {

  }

  error () {

  }
}

const defaultsPrototype = Defaults.prototype

defaultsPrototype.basePath = ''

defaultsPrototype.forceTrailingSlash = ''

defaultsPrototype.httpConfig = {}

defaultsPrototype.useFetch = false

class DSHttpAdapter {
  constructor (options) {
    options = options || {}
    this.defaults = new Defaults()
    this.http = options.http || axios
    delete options.http
    if (console) {
      this.defaults.log = (a, b) => console[typeof console.info === 'function' ? 'info' : 'log'](a, b)
    }
    if (console) {
      this.defaults.error = (a, b) => console[typeof console.error === 'function' ? 'error' : 'log'](a, b)
    }
    deepMixIn(this.defaults, options)

    if (this.defaults.useFetch && hasFetch) {
      this.defaults.deserialize = function (resourceConfig, response) {
        return response.json()
      }
      this.http = config => {
        const requestConfig = {
          method: config.method,
          // turn the plain headers object into the Fetch Headers object
          headers: new Headers(config.headers)
        }

        if (config.data) {
          requestConfig.body = toJson(config.data)
        }

        return fetch(new Request(buildUrl(config.url, config.params), requestConfig))
          .then(function (response) {
            response.config = {
              method: config.method,
              url: config.url
            }
            return response
          })
      }
    }
  }

  getEndpoint (resourceConfig, id, options) {
    options || (options = {})
    options.params || (options.params = {})

    let item
    const parentKey = resourceConfig.parentKey
    const endpoint = options.hasOwnProperty('endpoint') ? options.endpoint : resourceConfig.endpoint
    let parentField = resourceConfig.parentField
    const parentDef = resourceConfig.getResource(resourceConfig.parent)
    let parentId = options.params[parentKey]

    if (parentId === false || !parentKey || !parentDef) {
      if (parentId === false) {
        delete options.params[parentKey]
      }
      return endpoint
    } else {
      delete options.params[parentKey]

      if (isString(id) || isNumber(id)) {
        item = resourceConfig.get(id)
      } else if (isObject(id)) {
        item = id
      }

      if (item) {
        parentId = parentId || item[parentKey] || (item[parentField] ? item[parentField][parentDef.idAttribute] : null)
      }

      if (parentId) {
        delete options.endpoint
        const _options = {}
        forOwn(options, function (value, key) {
          _options[key] = value
        })
        _(_options, parentDef)
        return makePath(this.getEndpoint(parentDef, parentId, _options, parentId, endpoint))
      } else {
        return endpoint
      }
    }
  }

  getPath (method, resourceConfig, id, options) {
    const _this = this
    options || (options = {})
    const args = [
      options.basePath || _this.defaults.basePath || resourceConfig.basePath,
      this.getEndpoint(resourceConfig, (isString(id) || isNumber(id) || method === 'create') ? id : null, options)
    ]
    if (method === 'find' || method === 'update' || method === 'destroy') {
      args.push(id)
    }
    return makePath.apply(utils, args)
  }

  HTTP (config) {
    const _this = this
    const start = new Date()
    config = copy(config)
    config = deepMixIn(config, _this.defaults.httpConfig)
    if (_this.defaults.forceTrailingSlash && config.url[config.url.length - 1] !== '/') {
      config.url += '/'
    }
    // if (typeof config.data === 'object') {
    //   config.data = removeCircular(config.data)
    // }
    config.method = config.method.toUpperCase()
    const suffix = config.suffix || _this.defaults.suffix
    if (suffix && config.url.substr(config.url.length - suffix.length) !== suffix) {
      config.url += suffix
    }

    function logResponse (data) {
      const str = `${start.toUTCString()} - ${config.method.toUpperCase()} ${config.url} - ${data.status} ${(new Date().getTime() - start.getTime())}ms`
      if (data.status >= 200 && data.status < 300) {
        if (_this.defaults.log) {
          _this.defaults.log(str, data)
        }
        return data
      } else {
        if (_this.defaults.error) {
          _this.defaults.error(`'FAILED: ${str}`, data)
        }
        return reject(data)
      }
    }

    if (!this.http) {
      throw new Error('You have not configured this adapter with an http library!')
    }

    return this.http(config).then(logResponse, logResponse)
  }

  GET (url, config) {
    config || (config = {})
    if (!('method' in config)) {
      config.method = 'get'
    }
    return this.HTTP(deepMixIn(config, {
      url
    }))
  }

  POST (url, attrs, config) {
    config || (config = {})
    if (!('method' in config)) {
      config.method = 'post'
    }
    return this.HTTP(deepMixIn(config, {
      url,
      data: attrs
    }))
  }

  PUT (url, attrs, config) {
    config || (config = {})
    if (!('method' in config)) {
      config.method = 'put'
    }
    return this.HTTP(deepMixIn(config, {
      url,
      data: attrs || {}
    }))
  }

  DEL (url, config) {
    config || (config = {})
    if (!('method' in config)) {
      config.method = 'delete'
    }
    return this.HTTP(deepMixIn(config, {
      url
    }))
  }

  find (resourceConfig, id, options) {
    const _this = this
    options = options ? copy(options) : {}
    options.suffix = options.suffix || resourceConfig.suffix
    options.params || (options.params = {})
    options.params = _this.defaults.queryTransform(resourceConfig, options.params)
    return _this.GET(
      _this.getPath('find', resourceConfig, id, options),
      options
    ).then(data => {
      let item = (options.deserialize ? options.deserialize : _this.defaults.deserialize)(resourceConfig, data)
      return !item ? reject(new Error('Not Found!')) : item
    })
  }

  findAll (resourceConfig, params, options) {
    const _this = this
    options = options ? copy(options) : {}
    options.suffix = options.suffix || resourceConfig.suffix
    options.params || (options.params = {})
    if (params) {
      params = _this.defaults.queryTransform(resourceConfig, params)
      deepMixIn(options.params, params)
    }
    return _this.GET(
      _this.getPath('findAll', resourceConfig, params, options),
      options
    ).then(data => (options.deserialize ? options.deserialize : _this.defaults.deserialize)(resourceConfig, data))
  }

  create (resourceConfig, attrs, options) {
    const _this = this
    options = options ? copy(options) : {}
    options.suffix = options.suffix || resourceConfig.suffix
    options.params || (options.params = {})
    options.params = _this.defaults.queryTransform(resourceConfig, options.params)
    return _this.POST(
      _this.getPath('create', resourceConfig, attrs, options),
      options.serialize ? options.serialize(resourceConfig, attrs) : _this.defaults.serialize(resourceConfig, attrs),
      options
    ).then(data => (options.deserialize ? options.deserialize : _this.defaults.deserialize)(resourceConfig, data))
  }

  update (resourceConfig, id, attrs, options) {
    const _this = this
    options = options ? copy(options) : {}
    options.suffix = options.suffix || resourceConfig.suffix
    options.params || (options.params = {})
    options.params = _this.defaults.queryTransform(resourceConfig, options.params)
    return _this.PUT(
      _this.getPath('update', resourceConfig, id, options),
      options.serialize ? options.serialize(resourceConfig, attrs) : _this.defaults.serialize(resourceConfig, attrs),
      options
    ).then(data => (options.deserialize ? options.deserialize : _this.defaults.deserialize)(resourceConfig, data))
  }

  updateAll (resourceConfig, attrs, params, options) {
    const _this = this
    options = options ? copy(options) : {}
    options.suffix = options.suffix || resourceConfig.suffix
    options.params || (options.params = {})
    if (params) {
      params = _this.defaults.queryTransform(resourceConfig, params)
      deepMixIn(options.params, params)
    }
    return this.PUT(
      _this.getPath('updateAll', resourceConfig, attrs, options),
      options.serialize ? options.serialize(resourceConfig, attrs) : _this.defaults.serialize(resourceConfig, attrs),
      options
    ).then(data => (options.deserialize ? options.deserialize : _this.defaults.deserialize)(resourceConfig, data))
  }

  destroy (resourceConfig, id, options) {
    const _this = this
    options = options ? copy(options) : {}
    options.suffix = options.suffix || resourceConfig.suffix
    options.params || (options.params = {})
    options.params = _this.defaults.queryTransform(resourceConfig, options.params)
    return _this.DEL(
      _this.getPath('destroy', resourceConfig, id, options),
      options
    ).then(data => (options.deserialize ? options.deserialize : _this.defaults.deserialize)(resourceConfig, data))
  }

  destroyAll (resourceConfig, params, options) {
    const _this = this
    options = options ? copy(options) : {}
    options.suffix = options.suffix || resourceConfig.suffix
    options.params || (options.params = {})
    if (params) {
      params = _this.defaults.queryTransform(resourceConfig, params)
      deepMixIn(options.params, params)
    }
    return this.DEL(
      _this.getPath('destroyAll', resourceConfig, params, options),
      options
    ).then(data => (options.deserialize ? options.deserialize : _this.defaults.deserialize)(resourceConfig, data))
  }
}

DSHttpAdapter.addAction = function (name, opts) {
  if (!name || !isString(name)) {
    throw new TypeError('action(name[, opts]): Expected: string, Found: ' + typeof name)
  }
  return function (target) {
    if (target[name]) {
      throw new Error('action(name[, opts]): ' + name + ' already exists on target!')
    }
    opts.request = opts.request || function (config) { return config }
    opts.response = opts.response || function (response) { return response }
    opts.responseError = opts.responseError || function (err) { return reject(err) }
    target[name] = function (id, _opts) {
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
    return target
  }
}

DSHttpAdapter.addActions = function (opts) {
  opts || (opts = {})
  return function (target) {
    forOwn(target, function (value, key) {
      DSHttpAdapter.addAction(key, value)(target)
    })
    return target
  }
}

DSHttpAdapter.version = {
  full: '<%= pkg.version %>',
  major: parseInt('<%= major %>', 10),
  minor: parseInt('<%= minor %>', 10),
  patch: parseInt('<%= patch %>', 10),
  alpha: '<%= alpha %>' !== 'false' ? '<%= alpha %>' : false,
  beta: '<%= beta %>' !== 'false' ? '<%= beta %>' : false
}

module.exports = DSHttpAdapter
