let JSData = require('js-data')
let axios = null

try {
  axios = require('axios')
} catch (e) {}

let { DSUtils } = JSData
let { deepMixIn, removeCircular, copy, makePath, isString, isNumber } = DSUtils

function isUndefined (value) {
  return value === undefined
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

  log () {}

  error () {}
}

let defaultsPrototype = Defaults.prototype

defaultsPrototype.basePath = ''

defaultsPrototype.forceTrailingSlash = ''

defaultsPrototype.httpConfig = {}

defaultsPrototype.verbsUseBasePath = false

class DSHttpAdapter {
  constructor (options) {
    options || (options = {})
    this.defaults = new Defaults()
    if (console) {
      this.defaults.log = (a, b) => console[typeof console.info === 'function' ? 'info' : 'log'](a, b)
    }
    if (console) {
      this.defaults.error = (a, b) => console[typeof console.error === 'function' ? 'error' : 'log'](a, b)
    }
    deepMixIn(this.defaults, options)
    this.http = options.http || axios
  }

  getEndpoint (resourceConfig, id, options) {
    options || (options = {})
    options.params = isUndefined(options.params) ? {} : options.params

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
    options || (options = {})
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

    // blacklist `data` as it can be large and will take a lot of time to copy
    let payload = config.data
    let cache = config.cache
    let timeout = config.timeout
    config = copy(config, null, null, null, ['data', 'cache', 'timeout'])
    config = deepMixIn(config, _this.defaults.httpConfig)
    config.data = payload
    config.cache = cache
    config.timeout = timeout
    if (!('verbsUseBasePath' in config)) {
      config.verbsUseBasePath = _this.defaults.verbsUseBasePath
    }
    if (!config.urlOverride && config.verbsUseBasePath) {
      config.url = makePath(config.basePath || _this.defaults.basePath, config.url)
    }
    if (_this.defaults.forceTrailingSlash && config.url[config.url.length - 1] !== '/' && !config.urlOverride) {
      config.url += '/'
    }
    if (typeof config.data === 'object') {
      config.data = removeCircular(config.data)
    }
    config.method = config.method.toUpperCase()
    let suffix = isUndefined(config.suffix) ? _this.defaults.suffix : config.suffix
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

    if (!this.http) {
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
    options || (options = {})
    options.suffix = isUndefined(options.suffix) ? resourceConfig.suffix : options.suffix
    options.params = isUndefined(options.params) ? {} : copy(options.params)
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
    options || (options = {})
    options.suffix = isUndefined(options.suffix) ? resourceConfig.suffix : options.suffix
    options.params = isUndefined(options.params) ? {} : copy(options.params)
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
    options || (options = {})
    options.suffix = isUndefined(options.suffix) ? resourceConfig.suffix : options.suffix
    options.params = isUndefined(options.params) ? {} : copy(options.params)
    options.params = _this.defaults.queryTransform(resourceConfig, options.params)
    return _this.POST(
      _this.getPath('create', resourceConfig, attrs, options),
      options.serialize ? options.serialize(resourceConfig, attrs) : _this.defaults.serialize(resourceConfig, attrs),
      options
    ).then((data) => (options.deserialize ? options.deserialize : _this.defaults.deserialize)(resourceConfig, data))
  }

  update (resourceConfig, id, attrs, options) {
    let _this = this
    options || (options = {})
    options.suffix = isUndefined(options.suffix) ? resourceConfig.suffix : options.suffix
    options.params = isUndefined(options.params) ? {} : copy(options.params)
    options.params = _this.defaults.queryTransform(resourceConfig, options.params)
    return _this.PUT(
      _this.getPath('update', resourceConfig, id, options),
      options.serialize ? options.serialize(resourceConfig, attrs) : _this.defaults.serialize(resourceConfig, attrs),
      options
    ).then((data) => (options.deserialize ? options.deserialize : _this.defaults.deserialize)(resourceConfig, data))
  }

  updateAll (resourceConfig, attrs, params, options) {
    let _this = this
    options || (options = {})
    options.suffix = isUndefined(options.suffix) ? resourceConfig.suffix : options.suffix
    options.params = isUndefined(options.params) ? {} : copy(options.params)
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
    options || (options = {})
    options.suffix = isUndefined(options.suffix) ? resourceConfig.suffix : options.suffix
    options.params = isUndefined(options.params) ? {} : copy(options.params)
    options.params = _this.defaults.queryTransform(resourceConfig, options.params)
    return _this.DEL(
      _this.getPath('destroy', resourceConfig, id, options),
      options
    ).then((data) => (options.deserialize ? options.deserialize : _this.defaults.deserialize)(resourceConfig, data))
  }

  destroyAll (resourceConfig, params, options) {
    let _this = this
    options || (options = {})
    options.suffix = isUndefined(options.suffix) ? resourceConfig.suffix : options.suffix
    options.params = isUndefined(options.params) ? {} : copy(options.params)
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

DSHttpAdapter.version = {
  full: '<%= pkg.version %>',
  major: parseInt('<%= major %>', 10),
  minor: parseInt('<%= minor %>', 10),
  patch: parseInt('<%= patch %>', 10),
  alpha: '<%= alpha %>' !== 'false' ? '<%= alpha %>' : false,
  beta: '<%= beta %>' !== 'false' ? '<%= beta %>' : false
}

module.exports = DSHttpAdapter
