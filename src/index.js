/* global fetch:true Headers:true Request:true */
const axios = require('axios')
import {utils} from 'js-data'
const {
  _,
  copy,
  deepMixIn,
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
  self.basePath = opts.basePath === undefined ? '' : opts.basePath
  self.debug = opts.debug === undefined ? false : opts.debug
  self.forceTrailingSlash = opts.forceTrailingSlash === undefined ? false : opts.forceTrailingSlash
  self.http = opts.http === undefined ? axios : opts.http
  self.httpConfig = opts.httpConfig === undefined ? {} : opts.httpConfig
  self.suffix = opts.suffix === undefined ? '' : opts.suffix
  self.useFetch = opts.useFetch === undefined ? false : opts.useFetch

  // Use "window.fetch" if available and the user asks for it
  if (hasFetch && (self.useFetch || self.http === undefined)) {

  }
}

fillIn(DSHttpAdapter, {

  beforeCreate () {},

  create (Model, props, opts) {
    const self = this
    opts = opts ? copy(opts) : {}
    opts.params || (opts.params = {})
    opts.params = self.queryTransform(Model, opts.params, opts)
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
      return resolve(self.afterCreate(Model, data, opts)).then(function (_data) {
        return _data || data
      })
    })
  },

  afterCreate () {},

  dbg (...args) {
    this.log('debug', ...args)
  },

  beforeDEL () {},

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

  deserialize (Model, data, opts) {
    opts || (opts = {})
    if (isFunction(opts.deserialize)) {
      return opts.deserialize(Model, data, opts)
    }
    if (opts.raw) {
      return data
    }
    return data ? ('data' in data ? data.data : data) : data
  },

  beforeDestroy () {},

  destroy (Model, id, opts) {
    const self = this
    opts = opts ? copy(opts) : {}
    opts.params || (opts.params = {})
    opts.params = self.queryTransform(Model, opts.params, opts)
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
      return resolve(self.afterDestroy(Model, id, data, opts)).then(function (_data) {
        return _data || data
      })
    })
  },

  beforeDestroyAll () {},

  destroyAll (Model, query, opts) {
    const self = this
    query || (query = {})
    opts = opts ? copy(opts) : {}
    opts.params || (opts.params = {})
    opts.op = 'destroy'
    self.dbg(opts.op, Model, query, opts)
    deepMixIn(opts.params, query)
    opts.params = self.queryTransform(Model, opts.params, opts)
    return resolve(self.beforeDestroyAll(Model, query, opts)).then(function () {
      return self.DEL(
        self.getPath('destroyAll', Model, query, opts),
        opts
      )
    }).then(function (response) {
      return self.deserialize(Model, response, opts)
    }).then(function (data) {
      return resolve(self.afterDestroyAll(Model, query, data, opts)).then(function (_data) {
        return _data || data
      })
    })
  },

  error (...args) {
    if (console) {
      console[typeof console.error === 'function' ? 'error' : 'log'](...args)
    }
  },

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

  beforeFind () {},

  find (Model, id, opts) {
    const self = this
    opts = opts ? copy(opts) : {}
    opts.params || (opts.params = {})
    opts.params = self.queryTransform(Model, opts.params, opts)
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
      return resolve(self.afterFind(Model, id, data, opts)).then(function (_data) {
        return _data || data
      })
    })
  },

  afterFind () {},

  findAll (Model, query, opts) {
    const self = this
    query || (query = {})
    opts = opts ? copy(opts) : {}
    opts.params || (opts.params = {})
    opts.op = 'findAll'
    self.dbg(opts.op, Model, query, opts)
    deepMixIn(opts.params, query)
    opts.params = self.queryTransform(Model, opts.params, opts)
    return resolve(self.beforeFindAll(Model, query, opts)).then(function () {
      return self.GET(
        self.getPath('findAll', Model, query, opts),
        opts
      )
    }).then(function (response) {
      return self.deserialize(Model, response, opts)
    }).then(function (data) {
      return resolve(self.afterFindAll(Model, query, data, opts)).then(function (_data) {
        return _data || data
      })
    })
  },

  beforeGET () {},

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

  afterGET () {},

  getEndpoint (Model, id, opts) {
    opts || (opts = {})
    opts.params || (opts.params = {})

    let item
    const parentKey = Model.parentKey
    const endpoint = opts.hasOwnProperty('endpoint') ? opts.endpoint : Model.endpoint
    let parentField = Model.parentField
    const parentDef = Model.getResource(Model.parent)
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

  getPath (method, Model, id, opts) {
    const self = this
    opts || (opts = {})
    const args = [
      opts.basePath === undefined ? self.basePath : opts.basePath,
      self.getEndpoint(Model, (isString(id) || isNumber(id) || method === 'create') ? id : null, opts)
    ]
    if (method === 'find' || method === 'update' || method === 'destroy') {
      args.push(id)
    }
    return makePath.apply(utils, args)
  },

  beforeHTTP () {},

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

    return resolve(self.beforeHTTP(config)).then(function (_config) {
      config = _config || config
      if (hasFetch && (self.useFetch || opts.useFetch || !self.http)) {
        return self.fetch(config, opts).then(logResponse, logResponse)
      }
      return self.http(config).then(logResponse, logResponse)
    }).then(function (response) {
      return resolve(self.afterHTTP(config, response)).then(function (_response) {
        return _response || response
      })
    })
  },

  afterHTTP () {},

  queryTransform (Model, params, opts) {
    return params
  },

  serialize (Model, data, opts) {
    opts || (opts = {})
    if (isFunction(opts.serialize)) {
      return opts.serialize(Model, data, opts)
    }
    return data
  },

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

  beforePOST () {},

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

  afterPOST () {},

  beforePUT () {},

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

  afterPUT () {},

  update (Model, id, props, opts) {
    const self = this
    opts = opts ? copy(opts) : {}
    opts.params || (opts.params = {})
    opts.params = self.queryTransform(Model, opts.params, opts)
    opts.op = 'update'
    self.dbg(opts.op, Model, id, props, opts)
    return resolve(self.beforeUpdate(Model, id, props, opts)).then(function () {
      return self.POST(
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

  updateAll (Model, props, query, opts) {
    const self = this
    query || (query = {})
    opts = opts ? copy(opts) : {}
    opts.params || (opts.params = {})
    opts.op = 'updateAll'
    self.dbg(opts.op, Model, props, query, opts)
    deepMixIn(opts.params, query)
    opts.params = self.queryTransform(Model, opts.params, opts)
    return resolve(self.beforeUpdateAll(Model, props, query, opts)).then(function () {
      return self.PUT(
        self.getPath('updateAll', Model, query, opts),
        opts
      )
    }).then(function (response) {
      return self.deserialize(Model, response, opts)
    }).then(function (data) {
      return resolve(self.afterUpdateAll(Model, props, query, opts, data)).then(function (_data) {
        return _data || data
      })
    })
  }
})

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
