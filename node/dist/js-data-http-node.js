'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsData = require('js-data');
var jsDataAdapter = require('js-data-adapter');

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
};

var axios = require('axios');
var hasFetch = false;

try {
  hasFetch = window && window.fetch;
} catch (e) {}

function isValidString(value) {
  return value != null && value !== '';
}
function join(items, separator) {
  separator || (separator = '');
  return items.filter(isValidString).join(separator);
}
function makePath() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var result = join(args, '/');
  return result.replace(/([^:\/]|^)\/{2,}/g, '$1/');
}

function encode(val) {
  return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
}

function buildUrl(url, params) {
  if (!params) {
    return url;
  }

  var parts = [];

  jsData.utils.forOwn(params, function (val, key) {
    if (val === null || typeof val === 'undefined') {
      return;
    }
    if (!jsData.utils.isArray(val)) {
      val = [val];
    }

    val.forEach(function (v) {
      if (toString.call(v) === '[object Date]') {
        v = v.toISOString();
      } else if (jsData.utils.isObject(v)) {
        v = jsData.utils.toJson(v);
      }
      parts.push(encode(key) + '=' + encode(v));
    });
  });

  if (parts.length > 0) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + parts.join('&');
  }

  return url;
}

var DEFAULTS = {
  /**
   * Set a base path in order to use absolute URLs instead of relative URLs.
   *
   * @example
   * const httpAdapter = new HttpAdapter({
   *   basePath: 'https://mydomain.com'
   * });
   *
   * @name HttpAdapter#basePath
   * @type {string}
   * @since 3.0.0
   */
  basePath: '',

  /**
   * Ensure that the request url has a trailing forward slash.
   *
   * @name HttpAdapter#forceTrailingSlash
   * @type {boolean}
   * @default false
   * @since 3.0.0
   */
  forceTrailingSlash: false,

  /**
   * The HTTP function that actually makes the HTTP request. By default this is
   * `axios`.
   *
   * @name HttpAdapter#http
   * @type {function}
   * @since 3.0.0
   * @see http://www.js-data.io/docs/js-data-http#using-a-custom-http-library
   */
  http: axios,

  /**
   * Default configuration options to be mixed into the `config` argument passed
   * to {@link HttpAdapter#http}.
   *
   * @name HttpAdapter#httpConfig
   * @type {object}
   * @since 3.0.0
   */
  httpConfig: {},

  /**
   * Add a suffix to the request url, e.g. ".json".
   *
   * @name HttpAdapter#suffix
   * @type {string}
   * @since 3.0.0
   */
  suffix: '',

  /**
   * Use `window.fetch` if available.
   *
   * @name HttpAdapter#useFetch
   * @type {boolean}
   * @default false
   * @since 3.0.0
   * @see http://www.js-data.io/docs/js-data-http#using-windowfetch
   */
  useFetch: false
};

/**
 * HttpAdapter class.
 *
 * @example
 * import { DataStore } from 'js-data';
 * import { HttpAdapter } from 'js-data-http';
 *
 * const httpAdapter = new HttpAdapter();
 * const store = new DataStore();
 *
 * store.registerAdapter('http', httpAdapter, { 'default': true });
 *
 * store.defineMapper('school');
 * store.defineMapper('student');
 *
 * // GET /school/1
 * store.find('school', 1).then((school) => {
 *   console.log('school');
 * });
 *
 * @class HttpAdapter
 * @extends Adapter
 * @param {object} [opts] Configuration options.
 * @param {string} [opts.basePath=''] See {@link HttpAdapter#basePath}.
 * @param {boolean} [opts.debug=false]  See {@link HttpAdapter#debug}.
 * @param {boolean} [opts.forceTrailingSlash=false]  See {@link HttpAdapter#forceTrailingSlash}.
 * @param {object} [opts.http=axios] See {@link HttpAdapter#http}.
 * @param {object} [opts.httpConfig={}] See {@link HttpAdapter#httpConfig}.
 * @param {string} [opts.suffix=''] See {@link HttpAdapter#suffix}.
 * @param {boolean} [opts.useFetch=false] See {@link HttpAdapter#useFetch}.
 * @see http://www.js-data.io/docs/js-data-http
 */
function HttpAdapter(opts) {
  jsData.utils.classCallCheck(this, HttpAdapter);

  opts || (opts = {});
  // Fill in any missing options with the defaults
  jsData.utils.fillIn(opts, DEFAULTS);
  jsDataAdapter.Adapter.call(this, opts);
}

/**
 * @name module:js-data-http.HttpAdapter
 * @see HttpAdapter
 */

jsDataAdapter.Adapter.extend({
  constructor: HttpAdapter,

  /**
   * @name HttpAdapter#afterDEL
   * @method
   * @param {string} url
   * @param {object} config
   * @param {object} opts
   * @param {object} response
   */
  afterDEL: jsDataAdapter.noop2,

  /**
   * @name HttpAdapter#afterGET
   * @method
   * @param {string} url
   * @param {object} config
   * @param {object} opts
   * @param {object} response
   */
  afterGET: jsDataAdapter.noop2,

  /**
   * @name HttpAdapter#afterHTTP
   * @method
   * @param {object} config
   * @param {object} opts
   * @param {object} response
   */
  afterHTTP: jsDataAdapter.noop2,

  /**
   * @name HttpAdapter#afterPOST
   * @method
   * @param {string} url
   * @param {object} data
   * @param {object} config
   * @param {object} opts
   * @param {object} response
   */
  afterPOST: jsDataAdapter.noop2,

  /**
   * @name HttpAdapter#afterPUT
   * @method
   * @param {string} url
   * @param {object} data
   * @param {object} config
   * @param {object} opts
   * @param {object} response
   */
  afterPUT: jsDataAdapter.noop2,

  /**
   * @name HttpAdapter#beforeDEL
   * @method
   * @param {object} url
   * @param {object} config
   * @param {object} opts
   */
  beforeDEL: jsDataAdapter.noop,

  /**
   * @name HttpAdapter#beforeGET
   * @method
   * @param {object} url
   * @param {object} config
   * @param {object} opts
   */
  beforeGET: jsDataAdapter.noop,

  /**
   * @name HttpAdapter#beforeHTTP
   * @method
   * @param {object} config
   * @param {object} opts
   */
  beforeHTTP: jsDataAdapter.noop,

  /**
   * @name HttpAdapter#beforePOST
   * @method
   * @param {object} url
   * @param {object} data
   * @param {object} config
   * @param {object} opts
   */
  beforePOST: jsDataAdapter.noop,

  /**
   * @name HttpAdapter#beforePUT
   * @method
   * @param {object} url
   * @param {object} data
   * @param {object} config
   * @param {object} opts
   */
  beforePUT: jsDataAdapter.noop,

  _count: function _count(mapper, query, opts) {
    var _this = this;

    return this.GET(this.getPath('count', mapper, opts.params, opts), opts).then(function (response) {
      return _this._end(mapper, opts, response);
    });
  },
  _create: function _create(mapper, props, opts) {
    var _this2 = this;

    return this.POST(this.getPath('create', mapper, props, opts), this.serialize(mapper, props, opts), opts).then(function (response) {
      return _this2._end(mapper, opts, response);
    });
  },
  _createMany: function _createMany(mapper, props, opts) {
    var _this3 = this;

    return this.POST(this.getPath('createMany', mapper, null, opts), this.serialize(mapper, props, opts), opts).then(function (response) {
      return _this3._end(mapper, opts, response);
    });
  },
  _destroy: function _destroy(mapper, id, opts) {
    var _this4 = this;

    return this.DEL(this.getPath('destroy', mapper, id, opts), opts).then(function (response) {
      return _this4._end(mapper, opts, response);
    });
  },
  _destroyAll: function _destroyAll(mapper, query, opts) {
    var _this5 = this;

    return this.DEL(this.getPath('destroyAll', mapper, null, opts), opts).then(function (response) {
      return _this5._end(mapper, opts, response);
    });
  },
  _end: function _end(mapper, opts, response) {
    return [this.deserialize(mapper, response, opts), response];
  },
  _find: function _find(mapper, id, opts) {
    var _this6 = this;

    return this.GET(this.getPath('find', mapper, id, opts), opts).then(function (response) {
      return _this6._end(mapper, opts, response);
    });
  },
  _findAll: function _findAll(mapper, query, opts) {
    var _this7 = this;

    return this.GET(this.getPath('findAll', mapper, opts.params, opts), opts).then(function (response) {
      return _this7._end(mapper, opts, response);
    });
  },
  _sum: function _sum(mapper, field, query, opts) {
    var _this8 = this;

    return this.GET(this.getPath('sum', mapper, opts.params, opts), opts).then(function (response) {
      return _this8._end(mapper, opts, response);
    });
  },
  _update: function _update(mapper, id, props, opts) {
    var _this9 = this;

    return this.PUT(this.getPath('update', mapper, id, opts), this.serialize(mapper, props, opts), opts).then(function (response) {
      return _this9._end(mapper, opts, response);
    });
  },
  _updateAll: function _updateAll(mapper, props, query, opts) {
    var _this10 = this;

    return this.PUT(this.getPath('updateAll', mapper, null, opts), this.serialize(mapper, props, opts), opts).then(function (response) {
      return _this10._end(mapper, opts, response);
    });
  },
  _updateMany: function _updateMany(mapper, records, opts) {
    var _this11 = this;

    return this.PUT(this.getPath('updateMany', mapper, null, opts), this.serialize(mapper, records, opts), opts).then(function (response) {
      return _this11._end(mapper, opts, response);
    });
  },


  /**
   * Retrieve the number of records that match the selection `query`.
   *
   * @name HttpAdapter#count
   * @method
   * @param {object} mapper The mapper.
   * @param {object} query Selection query.
   * @param {object} [opts] Configuration options.
   * @param {string} [opts.params] Querystring parameters.
   * @param {string} [opts.suffix={@link HttpAdapter#suffix}] See {@link HttpAdapter#suffix}.
   * @return {Promise}
   */
  count: function count(mapper, query, opts) {
    query || (query = {});
    opts || (opts = {});
    opts.params = this.getParams(opts);
    opts.params.count = true;
    opts.suffix = this.getSuffix(mapper, opts);
    jsData.utils.deepMixIn(opts.params, query);
    opts.params = this.queryTransform(mapper, opts.params, opts);
    return jsDataAdapter.Adapter.prototype.count.call(this, mapper, query, opts);
  },


  /**
   * Create a new the record from the provided `props`.
   *
   * @name HttpAdapter#create
   * @method
   * @param {object} mapper The mapper.
   * @param {object} props Properties to send as the payload.
   * @param {object} [opts] Configuration options.
   * @param {string} [opts.params] Querystring parameters.
   * @param {string} [opts.suffix={@link HttpAdapter#suffix}] See {@link HttpAdapter#suffix}.
   * @return {Promise}
   */
  create: function create(mapper, props, opts) {
    opts || (opts = {});
    opts.params = this.getParams(opts);
    opts.params = this.queryTransform(mapper, opts.params, opts);
    opts.suffix = this.getSuffix(mapper, opts);
    return jsDataAdapter.Adapter.prototype.create.call(this, mapper, props, opts);
  },


  /**
   * Create multiple new records in batch.
   *
   * @name HttpAdapter#createMany
   * @method
   * @param {object} mapper The mapper.
   * @param {array} props Array of property objects to send as the payload.
   * @param {object} [opts] Configuration options.
   * @param {string} [opts.params] Querystring parameters.
   * @param {string} [opts.suffix={@link HttpAdapter#suffix}] See {@link HttpAdapter#suffix}.
   * @return {Promise}
   */
  createMany: function createMany(mapper, props, opts) {
    opts || (opts = {});
    opts.params = this.getParams(opts);
    opts.params = this.queryTransform(mapper, opts.params, opts);
    opts.suffix = this.getSuffix(mapper, opts);
    return jsDataAdapter.Adapter.prototype.createMany.call(this, mapper, props, opts);
  },


  /**
   * Make an Http request to `url` according to the configuration in `config`.
   *
   * @name HttpAdapter#DEL
   * @method
   * @param {string} url Url for the request.
   * @param {object} [config] Http configuration that will be passed to
   * {@link HttpAdapter#HTTP}.
   * @param {object} [opts] Configuration options.
   * @return {Promise}
   */
  DEL: function DEL(url, config, opts) {
    var _this12 = this;

    var op = void 0;
    config || (config = {});
    opts || (opts = {});
    config.url = url || config.url;
    config.method = config.method || 'delete';

    // beforeDEL lifecycle hook
    op = opts.op = 'beforeDEL';
    return jsData.utils.resolve(this[op](url, config, opts)).then(function (_config) {
      // Allow re-assignment from lifecycle hook
      config = _config === undefined ? config : _config;
      op = opts.op = 'DEL';
      _this12.dbg(op, url, config, opts);
      return _this12.HTTP(config, opts);
    }).then(function (response) {
      // afterDEL lifecycle hook
      op = opts.op = 'afterDEL';
      return jsData.utils.resolve(_this12[op](url, config, opts, response)).then(function (_response) {
        return _response === undefined ? response : _response;
      });
    });
  },


  /**
   * Transform the server response object into the payload that will be returned
   * to JSData.
   *
   * @name HttpAdapter#deserialize
   * @method
   * @param {object} mapper The mapper used for the operation.
   * @param {object} response Response object from {@link HttpAdapter#HTTP}.
   * @param {object} opts Configuration options.
   * @return {(object|array)} Deserialized data.
   */
  deserialize: function deserialize(mapper, response, opts) {
    opts || (opts = {});
    if (jsData.utils.isFunction(opts.deserialize)) {
      return opts.deserialize(mapper, response, opts);
    }
    if (jsData.utils.isFunction(mapper.deserialize)) {
      return mapper.deserialize(mapper, response, opts);
    }
    if (response && response.hasOwnProperty('data')) {
      return response.data;
    }
    return response;
  },


  /**
   * Destroy the record with the given primary key.
   *
   * @name HttpAdapter#destroy
   * @method
   * @param {object} mapper The mapper.
   * @param {(string|number)} id Primary key of the record to destroy.
   * @param {object} [opts] Configuration options.
   * @param {string} [opts.params] Querystring parameters.
   * @param {string} [opts.suffix={@link HttpAdapter#suffix}] See {@link HttpAdapter#suffix}.
   * @return {Promise}
   */
  destroy: function destroy(mapper, id, opts) {
    opts || (opts = {});
    opts.params = this.getParams(opts);
    opts.params = this.queryTransform(mapper, opts.params, opts);
    opts.suffix = this.getSuffix(mapper, opts);
    return jsDataAdapter.Adapter.prototype.destroy.call(this, mapper, id, opts);
  },


  /**
   * Destroy the records that match the selection `query`.
   *
   * @name HttpAdapter#destroyAll
   * @method
   * @param {object} mapper The mapper.
   * @param {object} query Selection query.
   * @param {object} [opts] Configuration options.
   * @param {string} [opts.params] Querystring parameters.
   * @param {string} [opts.suffix={@link HttpAdapter#suffix}] See {@link HttpAdapter#suffix}.
   * @return {Promise}
   */
  destroyAll: function destroyAll(mapper, query, opts) {
    query || (query = {});
    opts || (opts = {});
    opts.params = this.getParams(opts);
    jsData.utils.deepMixIn(opts.params, query);
    opts.params = this.queryTransform(mapper, opts.params, opts);
    opts.suffix = this.getSuffix(mapper, opts);
    return jsDataAdapter.Adapter.prototype.destroyAll.call(this, mapper, query, opts);
  },


  /**
   * Log an error.
   *
   * @name HttpAdapter#error
   * @method
   * @param {...*} [args] Arguments to log.
   */
  error: function error() {
    if (console) {
      var _console;

      (_console = console)[typeof console.error === 'function' ? 'error' : 'log'].apply(_console, arguments);
    }
  },


  /**
   * Make an Http request using `window.fetch`.
   *
   * @name HttpAdapter#fetch
   * @method
   * @param {object} config Request configuration.
   * @param {object} config.data Payload for the request.
   * @param {string} config.method Http method for the request.
   * @param {object} config.headers Headers for the request.
   * @param {object} config.params Querystring for the request.
   * @param {string} config.url Url for the request.
   */
  fetch: function (_fetch) {
    function fetch(_x) {
      return _fetch.apply(this, arguments);
    }

    fetch.toString = function () {
      return _fetch.toString();
    };

    return fetch;
  }(function (config) {
    var requestConfig = {
      method: config.method,
      // turn the plain headers object into the Fetch Headers object
      headers: new Headers(config.headers || {})
    };

    if (config.data) {
      requestConfig.body = jsData.utils.toJson(config.data);
    }

    return fetch(buildUrl(config.url, config.params), requestConfig).then(function (response) {
      response.config = {
        method: config.method,
        url: config.url
      };
      return response.json().then(function (data) {
        response.data = data;
        return response;
      });
    });
  }),


  /**
   * Retrieve the record with the given primary key.
   *
   * @name HttpAdapter#find
   * @method
   * @param {object} mapper The mapper.
   * @param {(string|number)} id Primary key of the record to retrieve.
   * @param {object} [opts] Configuration options.
   * @param {string} [opts.params] Querystring parameters.
   * @param {string} [opts.suffix={@link HttpAdapter#suffix}] See {@link HttpAdapter#suffix}.
   * @return {Promise}
   */
  find: function find(mapper, id, opts) {
    opts || (opts = {});
    opts.params = this.getParams(opts);
    opts.params = this.queryTransform(mapper, opts.params, opts);
    opts.suffix = this.getSuffix(mapper, opts);
    return jsDataAdapter.Adapter.prototype.find.call(this, mapper, id, opts);
  },


  /**
   * Retrieve the records that match the selection `query`.
   *
   * @name HttpAdapter#findAll
   * @method
   * @param {object} mapper The mapper.
   * @param {object} query Selection query.
   * @param {object} [opts] Configuration options.
   * @param {string} [opts.params] Querystring parameters.
   * @param {string} [opts.suffix={@link HttpAdapter#suffix}] See {@link HttpAdapter#suffix}.
   * @return {Promise}
   */
  findAll: function findAll(mapper, query, opts) {
    query || (query = {});
    opts || (opts = {});
    opts.params = this.getParams(opts);
    opts.suffix = this.getSuffix(mapper, opts);
    jsData.utils.deepMixIn(opts.params, query);
    opts.params = this.queryTransform(mapper, opts.params, opts);
    return jsDataAdapter.Adapter.prototype.findAll.call(this, mapper, query, opts);
  },


  /**
   * Make a GET request.
   *
   * @name HttpAdapter#GET
   * @method
   * @param {string} url The url for the request.
   * @param {object} config Request configuration options.
   * @param {object} [opts] Configuration options.
   * @return {Promise}
   */
  GET: function GET(url, config, opts) {
    var _this13 = this;

    var op = void 0;
    config || (config = {});
    opts || (opts = {});
    config.url = url || config.url;
    config.method = config.method || 'get';

    // beforeGET lifecycle hook
    op = opts.op = 'beforeGET';
    return jsData.utils.resolve(this[op](url, config, opts)).then(function (_config) {
      // Allow re-assignment from lifecycle hook
      config = _config === undefined ? config : _config;
      op = opts.op = 'GET';
      _this13.dbg(op, url, config, opts);
      return _this13.HTTP(config, opts);
    }).then(function (response) {
      // afterGET lifecycle hook
      op = opts.op = 'afterGET';
      return jsData.utils.resolve(_this13[op](url, config, opts, response)).then(function (_response) {
        return _response === undefined ? response : _response;
      });
    });
  },


  /**
   * @name HttpAdapter#getEndpoint
   * @method
   * @param {object} mapper The Mapper.
   * @param {*} id The primary key, if any.
   * @param {boolean} opts Configuration options.
   * @return {string} Full path.
   */
  getEndpoint: function getEndpoint(mapper, id, opts) {
    var _this14 = this;

    opts || (opts = {});
    opts.params = jsData.utils.isUndefined(opts.params) ? {} : opts.params;
    var relationList = mapper.relationList || [];
    var endpoint = jsData.utils.isUndefined(opts.endpoint) ? jsData.utils.isUndefined(mapper.endpoint) ? mapper.name : mapper.endpoint : opts.endpoint;

    relationList.forEach(function (def) {
      if (def.type !== 'belongsTo' || !def.parent) {
        return;
      }
      var item = void 0;
      var parentKey = def.foreignKey;
      var parentDef = def.getRelation();
      var parentId = opts.params[parentKey];

      if (parentId === false || !parentKey || !parentDef) {
        if (parentId === false) {
          delete opts.params[parentKey];
        }
        return false;
      } else {
        delete opts.params[parentKey];

        if (jsData.utils.isObject(id)) {
          item = id;
        }

        if (item) {
          parentId = parentId || def.getForeignKey(item) || (def.getLocalField(item) ? jsData.utils.get(def.getLocalField(item), parentDef.idAttribute) : null);
        }

        if (parentId) {
          var _ret = function () {
            delete opts.endpoint;
            var _opts = {};
            jsData.utils.forOwn(opts, function (value, key) {
              _opts[key] = value;
            });
            jsData.utils._(_opts, parentDef);
            endpoint = makePath(_this14.getEndpoint(parentDef, parentId, _opts), parentId, endpoint);
            return {
              v: false
            };
          }();

          if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
        }
      }
    });

    return endpoint;
  },


  /**
   * @name HttpAdapter#getPath
   * @method
   * @param {string} method The method being executed.
   * @param {object} mapper The Mapper.
   * @param {(string|number)?} id The primary key, if any.
   * @param {object} opts Configuration options.
   */
  getPath: function getPath(method, mapper, id, opts) {
    opts || (opts = {});
    var args = [opts.basePath === undefined ? mapper.basePath === undefined ? this.basePath : mapper.basePath : opts.basePath, this.getEndpoint(mapper, jsData.utils.isString(id) || jsData.utils.isNumber(id) || method === 'create' ? id : null, opts)];
    if (method === 'find' || method === 'update' || method === 'destroy') {
      args.push(id);
    }
    return makePath.apply(jsData.utils, args);
  },
  getParams: function getParams(opts) {
    opts || (opts = {});
    if (opts.params === undefined) {
      return {};
    }
    return jsData.utils.copy(opts.params);
  },
  getSuffix: function getSuffix(mapper, opts) {
    opts || (opts = {});
    if (opts.suffix === undefined) {
      if (mapper.suffix === undefined) {
        return this.suffix;
      }
      return mapper.suffix;
    }
    return opts.suffix;
  },


  /**
   * Make an Http request.
   *
   * @name HttpAdapter#HTTP
   * @method
   * @param {object} config Request configuration options.
   * @param {object} [opts] Configuration options.
   * @return {Promise}
   */
  HTTP: function HTTP(config, opts) {
    var _this15 = this;

    var start = new Date();
    opts || (opts = {});
    var payload = config.data;
    var cache = config.cache;
    var timeout = config.timeout;
    config = jsData.utils.copy(config, null, null, null, ['data', 'cache', 'timeout']);
    config = jsData.utils.deepMixIn(config, this.httpConfig);
    config.data = payload;
    config.cache = cache;
    config.timeout = timeout;
    if (this.forceTrailingSlash && config.url[config.url.length - 1] !== '/') {
      config.url += '/';
    }
    config.method = config.method.toUpperCase();
    var suffix = config.suffix || opts.suffix || this.suffix;
    if (suffix && config.url.substr(config.url.length - suffix.length) !== suffix) {
      config.url += suffix;
    }

    var logResponse = function logResponse(data) {
      var str = start.toUTCString() + ' - ' + config.method.toUpperCase() + ' ' + config.url + ' - ' + data.status + ' ' + (new Date().getTime() - start.getTime()) + 'ms';
      if (data.status >= 200 && data.status < 300) {
        if (_this15.log) {
          _this15.dbg(str, data);
        }
        return data;
      } else {
        if (_this15.error) {
          _this15.error('\'FAILED: ' + str, data);
        }
        return jsData.utils.reject(data);
      }
    };

    if (!this.http) {
      throw new Error('You have not configured this adapter with an http library!');
    }

    return jsData.utils.resolve(this.beforeHTTP(config, opts)).then(function (_config) {
      config = _config || config;
      if (hasFetch && (_this15.useFetch || opts.useFetch || !_this15.http)) {
        return _this15.fetch(config, opts).then(logResponse, logResponse);
      }
      return _this15.http(config).then(logResponse, logResponse).catch(function (err) {
        return _this15.responseError(err, config, opts);
      });
    }).then(function (response) {
      return jsData.utils.resolve(_this15.afterHTTP(config, opts, response)).then(function (_response) {
        return _response === undefined ? response : _response;
      });
    });
  },


  /**
   * Make a POST request.
   *
   * @name HttpAdapter#POST
   * @method
   * @param {*} url The url for the request.
   * @param {object} data Payload for the request.
   * @param {object} config Request configuration options.
   * @param {object} [opts] Configuration options.
   * @return {Promise}
   */
  POST: function POST(url, data, config, opts) {
    var _this16 = this;

    var op = void 0;
    config || (config = {});
    opts || (opts = {});
    config.url = url || config.url;
    config.data = data || config.data;
    config.method = config.method || 'post';

    // beforePOST lifecycle hook
    op = opts.op = 'beforePOST';
    return jsData.utils.resolve(this[op](url, data, config, opts)).then(function (_config) {
      // Allow re-assignment from lifecycle hook
      config = _config === undefined ? config : _config;
      op = opts.op = 'POST';
      _this16.dbg(op, url, data, config, opts);
      return _this16.HTTP(config, opts);
    }).then(function (response) {
      // afterPOST lifecycle hook
      op = opts.op = 'afterPOST';
      return jsData.utils.resolve(_this16[op](url, data, config, opts, response)).then(function (_response) {
        return _response === undefined ? response : _response;
      });
    });
  },


  /**
   * Make a PUT request.
   *
   * @name HttpAdapter#PUT
   * @method
   * @param {*} url The url for the request.
   * @param {object} data Payload for the request.
   * @param {object} config Request configuration options.
   * @param {object} [opts] Configuration options.
   * @return {Promise}
   */
  PUT: function PUT(url, data, config, opts) {
    var _this17 = this;

    var op = void 0;
    config || (config = {});
    opts || (opts = {});
    config.url = url || config.url;
    config.data = data || config.data;
    config.method = config.method || 'put';

    // beforePUT lifecycle hook
    op = opts.op = 'beforePUT';
    return jsData.utils.resolve(this[op](url, data, config, opts)).then(function (_config) {
      // Allow re-assignment from lifecycle hook
      config = _config === undefined ? config : _config;
      op = opts.op = 'PUT';
      _this17.dbg(op, url, data, config, opts);
      return _this17.HTTP(config, opts);
    }).then(function (response) {
      // afterPUT lifecycle hook
      op = opts.op = 'afterPUT';
      return jsData.utils.resolve(_this17[op](url, data, config, opts, response)).then(function (_response) {
        return _response === undefined ? response : _response;
      });
    });
  },


  /**
   * Transform the querystring object before it is serialized. This doesn't do
   * anything by default.
   *
   * @name HttpAdapter#queryTransform
   * @method
   * @param {object} mapper The Mapper that triggered the request.
   * @param {*} params The querystring object.
   * @param {*} opts Configuration options
   * @return {*} Transformed params.
   */
  queryTransform: function queryTransform(mapper, params, opts) {
    opts || (opts = {});
    if (jsData.utils.isFunction(opts.queryTransform)) {
      return opts.queryTransform(mapper, params, opts);
    }
    if (jsData.utils.isFunction(mapper.queryTransform)) {
      return mapper.queryTransform(mapper, params, opts);
    }
    return params;
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
   * @param {object} config The `config` argument that was passed to {@link HttpAdapter#HTTP}.
   * @param {*} opts The `opts` argument that was passed to {@link HttpAdapter#HTTP}.
   * @return {Promise}
   */
  responseError: function responseError(err, config, opts) {
    return jsData.utils.reject(err);
  },


  /**
   * Serialize request data. This doesn't do anything by default.
   *
   * @name HttpAdapter#serialize
   * @method
   * @param {object} mapper The Mapper that triggered the request.
   * @param {object} data The request payload.
   * @param {*} opts Configuration options.
   * @return {*} Serialized data.
   */
  serialize: function serialize(mapper, data, opts) {
    opts || (opts = {});
    if (jsData.utils.isFunction(opts.serialize)) {
      return opts.serialize(mapper, data, opts);
    }
    if (jsData.utils.isFunction(mapper.serialize)) {
      return mapper.serialize(mapper, data, opts);
    }
    return data;
  },


  /**
   * Retrieve the sum of the field of the records that match the selection query.
   *
   * @name HttpAdapter#sum
   * @method
   * @param {object} mapper The mapper.
   * @param {string} field The field to sum.
   * @param {object} query Selection query.
   * @param {object} [opts] Configuration options.
   * @param {string} [opts.params] Querystring parameters.
   * @param {string} [opts.suffix={@link HttpAdapter#suffix}] See {@link HttpAdapter#suffix}.
   * @return {Promise}
   */
  sum: function sum(mapper, field, query, opts) {
    query || (query = {});
    opts || (opts = {});
    if (!jsData.utils.isString(field)) {
      throw new Error('field must be a string!');
    }
    opts.params = this.getParams(opts);
    opts.params.sum = field;
    opts.suffix = this.getSuffix(mapper, opts);
    jsData.utils.deepMixIn(opts.params, query);
    opts.params = this.queryTransform(mapper, opts.params, opts);
    return jsDataAdapter.Adapter.prototype.sum.call(this, mapper, field, query, opts);
  },


  /**
   * Perform an update. Makes a PUT request by default.
   *
   * @name HttpAdapter#update
   * @method
   * @param {object} mapper The Mapper for the request.
   * @param {*} id The primary key of the record being updated.
   * @param {*} props The update payload.
   * @param {object} [opts] Configuration options.
   * @return {Promise}
   */
  update: function update(mapper, id, props, opts) {
    opts || (opts = {});
    opts.params = this.getParams(opts);
    opts.params = this.queryTransform(mapper, opts.params, opts);
    opts.suffix = this.getSuffix(mapper, opts);
    return jsDataAdapter.Adapter.prototype.update.call(this, mapper, id, props, opts);
  },


  /**
   * Perform an update against records that match the selection query. Makes a
   * PUT request by default.
   *
   * @name HttpAdapter#updateAll
   * @method
   * @param {object} mapper The Mapper for the request.
   * @param {object} props The update payload.
   * @param {object} query The selection query. See {@link http://www.js-data.io/docs/query-syntax}.
   * @param {object} [opts] Configuration options.
   * @return {Promise}
   */
  updateAll: function updateAll(mapper, props, query, opts) {
    query || (query = {});
    opts || (opts = {});
    opts.params = this.getParams(opts);
    jsData.utils.deepMixIn(opts.params, query);
    opts.params = this.queryTransform(mapper, opts.params, opts);
    opts.suffix = this.getSuffix(mapper, opts);
    return jsDataAdapter.Adapter.prototype.updateAll.call(this, mapper, props, query, opts);
  },


  /**
   * Update multiple individual records in a batch.
   *
   * @name HttpAdapter#updateMany
   * @method
   * @param {object} mapper The Mapper for the request.
   * @param {array} records Array of property objects to send as the payload.
   * Each must contain the primary key of the record to be updated.
   * @param {object} [opts] Configuration options.
   * @param {string} [opts.params] Querystring parameters.
   * @param {string} [opts.suffix={@link HttpAdapter#suffix}] See {@link HttpAdapter#suffix}.
   * @return {Promise}
   */
  updateMany: function updateMany(mapper, records, opts) {
    opts || (opts = {});
    opts.params = this.getParams(opts);
    opts.params = this.queryTransform(mapper, opts.params, opts);
    opts.suffix = this.getSuffix(mapper, opts);
    return jsDataAdapter.Adapter.prototype.updateMany.call(this, mapper, records, opts);
  }
});

/**
 * Add an Http actions to a mapper.
 *
 * @example
 * // CommonJS
 * var JSData = require('js-data');
 * // It is recommended to use DataStore in the browser
 * var DataStore = JSData.DataStore;
 *
 * var JSDataHttp = require('js-data-http');
 * var HttpAdapter = JSDataHttp.HttpAdapter;
 * var addAction = JSDataHttp.addAction;
 *
 * var httpAdapter = new HttpAdapter();
 * var store = new DataStore();
 *
 * store.registerAdapter('http', httpAdapter, { 'default': true });
 * store.defineMapper('school');
 *
 * // GET /reports/schools/:school_id/teachers
 * addAction('getTeacherReports', {
 *   endpoint: 'reports/schools',
 *   pathname: 'teachers',
 *   method: 'GET'
 * })(store.getMapper('school'));
 *
 * // /reports/schools/1234/teachers
 * store.getMapper('school').getTeacherReports(1234).then((response) => {
 *   // ...
 * });
 *
 * @name module:js-data-http.addAction
 * @method
 * @param {string} name Name of the new action.
 * @param {object} [opts] Action configuration
 * @param {string} [opts.adapter="http"] The name of the adapter to use.
 * @param {string} [opts.pathname] Set the action's pathname.
 * @param {function} [opts.request] Specify a request handler to be executed
 * before the request is made.
 * @param {function} [opts.response] Specify a response handler to be executed
 * after the response is received.
 * @param {function} [opts.responseError] Specify an error handler to be
 * executed on error.
 * @return {function} Decoration function, which should be passed the mapper to
 * decorate when invoked.
 */
function addAction(name, opts) {
  if (!name || !jsData.utils.isString(name)) {
    throw new TypeError('action(name[, opts]): Expected: string, Found: ' + (typeof name === 'undefined' ? 'undefined' : _typeof(name)));
  }
  return function (mapper) {
    if (mapper[name]) {
      throw new Error('action(name[, opts]): ' + name + ' already exists on target!');
    }
    opts.request = opts.request || function (config) {
      return config;
    };
    opts.response = opts.response || function (response) {
      return response;
    };
    opts.responseError = opts.responseError || function (err) {
      return jsData.utils.reject(err);
    };
    mapper[name] = function (id, _opts) {
      var _this18 = this;

      _opts = _opts || {};
      if (jsData.utils.isObject(id)) {
        _opts = id;
      }
      jsData.utils.fillIn(_opts, opts);
      var adapter = this.getAdapter(_opts.adapter || this.defaultAdapter || 'http');
      var config = {};
      config.mapper = this.name;
      jsData.utils.deepMixIn(config, _opts);
      config.method = config.method || 'GET';
      if (typeof _opts.getEndpoint === 'function') {
        config.url = _opts.getEndpoint(this, _opts);
      } else {
        var args = [_opts.basePath || this.basePath || adapter.basePath, adapter.getEndpoint(this, id, _opts)];
        if (jsData.utils.isSorN(id)) {
          args.push(id);
        }
        args.push(opts.pathname || name);
        config.url = makePath.apply(null, args);
      }
      return jsData.utils.resolve(config).then(_opts.request).then(function (config) {
        return adapter.HTTP(config);
      }).then(function (data) {
        if (data && data.config) {
          data.config.mapper = _this18.name;
        }
        return data;
      }).then(_opts.response, _opts.responseError);
    };
    return mapper;
  };
}

/**
 * Add multiple Http actions to a mapper. See {@link HttpAdapter.addAction} for
 * action configuration options.
 *
 * @example
 * // CommonJS
 * var JSData = require('js-data');
 * // It is recommended to use DataStore in the browser
 * var DataStore = JSData.DataStore;
 *
 * var JSDataHttp = require('js-data-http');
 * var HttpAdapter = JSDataHttp.HttpAdapter;
 * var addActions = JSDataHttp.addActions;
 *
 * var httpAdapter = new HttpAdapter();
 * var store = new DataStore();
 *
 * store.registerAdapter('http', httpAdapter, { 'default': true });
 * store.defineMapper('school');
 *
 * addActions({
 *   // GET /reports/schools/:school_id/teachers
 *   getTeacherReports: {
 *     basePath: 'reports/schools',
 *     pathname: 'teachers',
 *     method: 'GET'
 *   }
 * })(store.getMapper('school'));
 *
 * // /reports/schools/1234/teachers
 * store.getMapper('school').getTeacherReports(1234).then((response) => {
 *   // ...
 * });
 *
 * @name module:js-data-http.addActions
 * @method
 * @param {object.<string, object>} opts Object where the key is an action name
 * and the value is the configuration for the action.
 * @return {function} Decoration function, which should be passed the mapper to
 * decorate when invoked.
 */
function addActions(opts) {
  opts || (opts = {});
  return function (mapper) {
    jsData.utils.forOwn(opts, function (value, key) {
      addAction(key, value)(mapper);
    });
    return mapper;
  };
}

/**
 * Details of the current version of the `js-data-http` module.
 *
 * @name module:js-data-http.version
 * @type {object}
 * @property {string} version.full The full semver value.
 * @property {number} version.major The major version number.
 * @property {number} version.minor The minor version number.
 * @property {number} version.patch The patch version number.
 * @property {(string|boolean)} version.alpha The alpha version value,
 * otherwise `false` if the current version is not alpha.
 * @property {(string|boolean)} version.beta The beta version value,
 * otherwise `false` if the current version is not beta.
 */
var version = {
  full: '3.0.0-rc.3',
  major: 3,
  minor: 0,
  patch: 0
};

exports.HttpAdapter = HttpAdapter;
exports.addAction = addAction;
exports.addActions = addActions;
exports.version = version;
//# sourceMappingURL=js-data-http-node.js.map
