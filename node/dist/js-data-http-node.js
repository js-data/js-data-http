(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("js-data"), require("axios"));
	else if(typeof define === 'function' && define.amd)
		define(["js-data", "axios"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("js-data"), require("axios")) : factory(root["js-data"], root["axios"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _jsData = __webpack_require__(1);
	
	var _jsDataAdapter = __webpack_require__(2);
	
	var _jsDataAdapter2 = _interopRequireDefault(_jsDataAdapter);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/* global fetch:true Headers:true Request:true */
	var axios = __webpack_require__(3);
	
	
	var hasFetch = false;
	
	try {
	  hasFetch = window && window.fetch;
	} catch (e) {}
	
	var noop = function noop() {
	  var self = this;
	
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }
	
	  var opts = args[args.length - 1];
	  self.dbg.apply(self, [opts.op].concat(args));
	  return _jsData.utils.resolve();
	};
	
	var noop2 = function noop2() {
	  var self = this;
	
	  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	    args[_key2] = arguments[_key2];
	  }
	
	  var opts = args[args.length - 2];
	  self.dbg.apply(self, [opts.op].concat(args));
	  return _jsData.utils.resolve();
	};
	
	function isValidString(value) {
	  return value != null && value !== '';
	}
	function join(items, separator) {
	  separator || (separator = '');
	  return items.filter(isValidString).join(separator);
	}
	function makePath() {
	  for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	    args[_key3] = arguments[_key3];
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
	
	  _jsData.utils.forOwn(params, function (val, key) {
	    if (val === null || typeof val === 'undefined') {
	      return;
	    }
	    if (!_jsData.utils.isArray(val)) {
	      val = [val];
	    }
	
	    val.forEach(function (v) {
	      if (window.toString.call(v) === '[object Date]') {
	        v = v.toISOString();
	      } else if (_jsData.utils.isObject(v)) {
	        v = _jsData.utils.toJson(v);
	      }
	      parts.push(encode(key) + '=' + encode(v));
	    });
	  });
	
	  if (parts.length > 0) {
	    url += (url.indexOf('?') === -1 ? '?' : '&') + parts.join('&');
	  }
	
	  return url;
	}
	
	var __super__ = _jsDataAdapter2.default.prototype;
	
	var DEFAULTS = {
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
	};
	
	/**
	 * HttpAdapter class.
	 *
	 * @class HttpAdapter
	 * @param {Object} [opts] Configuration options.
	 * @param {string} [opts.basePath=''] TODO
	 * @param {boolean} [opts.debug=false] TODO
	 * @param {boolean} [opts.forceTrailingSlash=false] TODO
	 * @param {Object} [opts.http=axios] TODO
	 * @param {Object} [opts.httpConfig={}] TODO
	 * @param {string} [opts.suffix=''] TODO
	 * @param {boolean} [opts.useFetch=false] TODO
	 */
	function HttpAdapter(opts) {
	  var self = this;
	  opts || (opts = {});
	  _jsData.utils.fillIn(opts, DEFAULTS);
	  _jsDataAdapter2.default.call(self, opts);
	}
	
	// Setup prototype inheritance from Adapter
	HttpAdapter.prototype = Object.create(_jsDataAdapter2.default.prototype, {
	  constructor: {
	    value: HttpAdapter,
	    enumerable: false,
	    writable: true,
	    configurable: true
	  }
	});
	
	Object.defineProperty(HttpAdapter, '__super__', {
	  configurable: true,
	  value: _jsDataAdapter2.default
	});
	
	_jsData.utils.addHiddenPropsToTarget(HttpAdapter.prototype, {
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
	
	  _count: function _count(mapper, query, opts) {
	    var self = this;
	    return self.GET(self.getPath('count', mapper, opts.params, opts), opts).then(function (response) {
	      return self._end(mapper, opts, response);
	    });
	  },
	  _create: function _create(mapper, props, opts) {
	    var self = this;
	    return self.POST(self.getPath('create', mapper, props, opts), self.serialize(mapper, props, opts), opts).then(function (response) {
	      return self._end(mapper, opts, response);
	    });
	  },
	  _createMany: function _createMany(mapper, props, opts) {
	    var self = this;
	    return self.POST(self.getPath('createMany', mapper, null, opts), self.serialize(mapper, props, opts), opts).then(function (response) {
	      return self._end(mapper, opts, response);
	    });
	  },
	  _destroy: function _destroy(mapper, id, opts) {
	    var self = this;
	    return self.DEL(self.getPath('destroy', mapper, id, opts), opts).then(function (response) {
	      return self._end(mapper, opts, response);
	    });
	  },
	  _destroyAll: function _destroyAll(mapper, query, opts) {
	    var self = this;
	    return self.DEL(self.getPath('destroyAll', mapper, null, opts), opts).then(function (response) {
	      return self._end(mapper, opts, response);
	    });
	  },
	  _end: function _end(mapper, opts, response) {
	    return [this.deserialize(mapper, response, opts), response];
	  },
	  _find: function _find(mapper, id, opts) {
	    var self = this;
	    return self.GET(self.getPath('find', mapper, id, opts), opts).then(function (response) {
	      return self._end(mapper, opts, response);
	    });
	  },
	  _findAll: function _findAll(mapper, query, opts) {
	    var self = this;
	    return self.GET(self.getPath('findAll', mapper, opts.params, opts), opts).then(function (response) {
	      return self._end(mapper, opts, response);
	    });
	  },
	  _sum: function _sum(mapper, field, query, opts) {
	    var self = this;
	    return self.GET(self.getPath('sum', mapper, opts.params, opts), opts).then(function (response) {
	      return self._end(mapper, opts, response);
	    });
	  },
	  _update: function _update(mapper, id, props, opts) {
	    var self = this;
	    return self.PUT(self.getPath('update', mapper, id, opts), self.serialize(mapper, props, opts), opts).then(function (response) {
	      return self._end(mapper, opts, response);
	    });
	  },
	  _updateAll: function _updateAll(mapper, props, query, opts) {
	    var self = this;
	    return self.PUT(self.getPath('updateAll', mapper, null, opts), self.serialize(mapper, props, opts), opts).then(function (response) {
	      return self._end(mapper, opts, response);
	    });
	  },
	  _updateMany: function _updateMany(mapper, records, opts) {
	    var self = this;
	    return self.PUT(self.getPath('updateMany', mapper, null, opts), self.serialize(mapper, records, opts), opts).then(function (response) {
	      return self._end(mapper, opts, response);
	    });
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
	  count: function count(mapper, query, opts) {
	    var self = this;
	    query || (query = {});
	    opts || (opts = {});
	    opts.params = self.getParams(opts);
	    opts.params.count = true;
	    opts.suffix = self.getSuffix(mapper, opts);
	    _jsData.utils.deepMixIn(opts.params, query);
	    opts.params = self.queryTransform(mapper, opts.params, opts);
	
	    return __super__.count.call(self, mapper, query, opts);
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
	  create: function create(mapper, props, opts) {
	    var self = this;
	    opts || (opts = {});
	    opts.params = self.getParams(opts);
	    opts.params = self.queryTransform(mapper, opts.params, opts);
	    opts.suffix = self.getSuffix(mapper, opts);
	
	    return __super__.create.call(self, mapper, props, opts);
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
	  createMany: function createMany(mapper, props, opts) {
	    var self = this;
	    opts || (opts = {});
	    opts.params = self.getParams(opts);
	    opts.params = self.queryTransform(mapper, opts.params, opts);
	    opts.suffix = self.getSuffix(mapper, opts);
	
	    return __super__.createMany.call(self, mapper, props, opts);
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
	  DEL: function DEL(url, config, opts) {
	    var self = this;
	    var op = void 0;
	    config || (config = {});
	    opts || (opts = {});
	    config.url = url || config.url;
	    config.method = config.method || 'delete';
	
	    // beforeDEL lifecycle hook
	    op = opts.op = 'beforeDEL';
	    return _jsData.utils.resolve(self[op](url, config, opts)).then(function (_config) {
	      // Allow re-assignment from lifecycle hook
	      config = _jsData.utils.isUndefined(_config) ? config : _config;
	      op = opts.op = 'DEL';
	      self.dbg(op, url, config, opts);
	      return self.HTTP(config, opts);
	    }).then(function (response) {
	      // afterDEL lifecycle hook
	      op = opts.op = 'afterDEL';
	      return _jsData.utils.resolve(self[op](url, config, opts, response)).then(function (_response) {
	        // Allow re-assignment from lifecycle hook
	        return _jsData.utils.isUndefined(_response) ? response : _response;
	      });
	    });
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
	  deserialize: function deserialize(mapper, response, opts) {
	    opts || (opts = {});
	    if (_jsData.utils.isFunction(opts.deserialize)) {
	      return opts.deserialize(mapper, response, opts);
	    }
	    if (_jsData.utils.isFunction(mapper.deserialize)) {
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
	   * @param {Object} mapper The mapper.
	   * @param {(string|number)} id Primary key of the record to destroy.
	   * @param {Object} [opts] Configuration options.
	   * @param {string} [opts.params] TODO
	   * @param {string} [opts.suffix={@link HttpAdapter#suffix}] TODO
	   * @return {Promise}
	   */
	  destroy: function destroy(mapper, id, opts) {
	    var self = this;
	    opts || (opts = {});
	    opts.params = self.getParams(opts);
	    opts.params = self.queryTransform(mapper, opts.params, opts);
	    opts.suffix = self.getSuffix(mapper, opts);
	
	    return __super__.destroy.call(self, mapper, id, opts);
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
	  destroyAll: function destroyAll(mapper, query, opts) {
	    var self = this;
	    query || (query = {});
	    opts || (opts = {});
	    opts.params = self.getParams(opts);
	    _jsData.utils.deepMixIn(opts.params, query);
	    opts.params = self.queryTransform(mapper, opts.params, opts);
	    opts.suffix = self.getSuffix(mapper, opts);
	
	    return __super__.destroyAll.call(self, mapper, query, opts);
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
	   * @param {Object} config Request configuration.
	   * @param {Object} config.data Payload for the request.
	   * @param {string} config.method Http method for the request.
	   * @param {Object} config.headers Headers for the request.
	   * @param {Object} config.params Querystring for the request.
	   * @param {string} config.url Url for the request.
	   * @param {Object} [opts] Configuration options.
	   */
	  fetch: function (_fetch) {
	    function fetch(_x, _x2) {
	      return _fetch.apply(this, arguments);
	    }
	
	    fetch.toString = function () {
	      return _fetch.toString();
	    };
	
	    return fetch;
	  }(function (config, opts) {
	    var requestConfig = {
	      method: config.method,
	      // turn the plain headers object into the Fetch Headers object
	      headers: new Headers(config.headers)
	    };
	
	    if (config.data) {
	      requestConfig.body = _jsData.utils.toJson(config.data);
	    }
	
	    return fetch(new Request(buildUrl(config.url, config.params), requestConfig)).then(function (response) {
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
	   * @param {Object} mapper The mapper.
	   * @param {(string|number)} id Primary key of the record to retrieve.
	   * @param {Object} [opts] Configuration options.
	   * @param {string} [opts.params] TODO
	   * @param {string} [opts.suffix={@link HttpAdapter#suffix}] TODO
	   * @return {Promise}
	   */
	  find: function find(mapper, id, opts) {
	    var self = this;
	    opts || (opts = {});
	    opts.params = self.getParams(opts);
	    opts.params = self.queryTransform(mapper, opts.params, opts);
	    opts.suffix = self.getSuffix(mapper, opts);
	
	    return __super__.find.call(self, mapper, id, opts);
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
	  findAll: function findAll(mapper, query, opts) {
	    var self = this;
	    query || (query = {});
	    opts || (opts = {});
	    opts.params = self.getParams(opts);
	    opts.suffix = self.getSuffix(mapper, opts);
	    _jsData.utils.deepMixIn(opts.params, query);
	    opts.params = self.queryTransform(mapper, opts.params, opts);
	
	    return __super__.findAll.call(self, mapper, query, opts);
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
	  GET: function GET(url, config, opts) {
	    var self = this;
	    var op = void 0;
	    config || (config = {});
	    opts || (opts = {});
	    config.url = url || config.url;
	    config.method = config.method || 'get';
	
	    // beforeGET lifecycle hook
	    op = opts.op = 'beforeGET';
	    return _jsData.utils.resolve(self[op](url, config, opts)).then(function (_config) {
	      // Allow re-assignment from lifecycle hook
	      config = _jsData.utils.isUndefined(_config) ? config : _config;
	      op = opts.op = 'GET';
	      self.dbg(op, url, config, opts);
	      return self.HTTP(config, opts);
	    }).then(function (response) {
	      // afterGET lifecycle hook
	      op = opts.op = 'afterGET';
	      return _jsData.utils.resolve(self[op](url, config, opts, response)).then(function (_response) {
	        // Allow re-assignment from lifecycle hook
	        return _jsData.utils.isUndefined(_response) ? response : _response;
	      });
	    });
	  },
	
	
	  /**
	   * @name HttpAdapter#getEndpoint
	   * @method
	   * @param {Object} mapper TODO
	   * @param {*} id TODO
	   * @param {boolean} opts TODO
	   * @return {string} Full path.
	   */
	  getEndpoint: function getEndpoint(mapper, id, opts) {
	    var self = this;
	    opts || (opts = {});
	    opts.params = _jsData.utils.isUndefined(opts.params) ? {} : opts.params;
	    var relationList = mapper.relationList || [];
	    var endpoint = _jsData.utils.isUndefined(opts.endpoint) ? _jsData.utils.isUndefined(mapper.endpoint) ? mapper.name : mapper.endpoint : opts.endpoint;
	
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
	
	        if (_jsData.utils.isObject(id)) {
	          item = id;
	        }
	
	        if (item) {
	          parentId = parentId || def.getForeignKey(item) || (def.getLocalField(item) ? _jsData.utils.get(def.getLocalField(item), parentDef.idAttribute) : null);
	        }
	
	        if (parentId) {
	          var _ret = function () {
	            delete opts.endpoint;
	            var _opts = {};
	            _jsData.utils.forOwn(opts, function (value, key) {
	              _opts[key] = value;
	            });
	            _jsData.utils._(_opts, parentDef);
	            endpoint = makePath(self.getEndpoint(parentDef, parentId, _opts), parentId, endpoint);
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
	   * @param {string} method TODO
	   * @param {Object} mapper TODO
	   * @param {(string|number)?} id TODO
	   * @param {Object} opts Configuration options.
	   */
	  getPath: function getPath(method, mapper, id, opts) {
	    var self = this;
	    opts || (opts = {});
	    var args = [_jsData.utils.isUndefined(opts.basePath) ? _jsData.utils.isUndefined(mapper.basePath) ? self.basePath : mapper.basePath : opts.basePath, self.getEndpoint(mapper, _jsData.utils.isString(id) || _jsData.utils.isNumber(id) || method === 'create' ? id : null, opts)];
	    if (method === 'find' || method === 'update' || method === 'destroy') {
	      args.push(id);
	    }
	    return makePath.apply(_jsData.utils, args);
	  },
	  getParams: function getParams(opts) {
	    opts || (opts = {});
	    if (_jsData.utils.isUndefined(opts.params)) {
	      return {};
	    }
	    return _jsData.utils.copy(opts.params);
	  },
	  getSuffix: function getSuffix(mapper, opts) {
	    opts || (opts = {});
	    if (_jsData.utils.isUndefined(opts.suffix)) {
	      if (_jsData.utils.isUndefined(mapper.suffix)) {
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
	   * @param {Object} config Request configuration options.
	   * @param {Object} [opts] Configuration options.
	   * @return {Promise}
	   */
	  HTTP: function HTTP(config, opts) {
	    var self = this;
	    var start = new Date();
	    opts || (opts = {});
	    var payload = config.data;
	    var cache = config.cache;
	    var timeout = config.timeout;
	    config = _jsData.utils.copy(config, null, null, null, ['data', 'cache', 'timeout']);
	    config = _jsData.utils.deepMixIn(config, self.httpConfig);
	    config.data = payload;
	    config.cache = cache;
	    config.timeout = timeout;
	    if (self.forceTrailingSlash && config.url[config.url.length - 1] !== '/') {
	      config.url += '/';
	    }
	    config.method = config.method.toUpperCase();
	    var suffix = config.suffix || opts.suffix || self.suffix;
	    if (suffix && config.url.substr(config.url.length - suffix.length) !== suffix) {
	      config.url += suffix;
	    }
	
	    function logResponse(data) {
	      var str = start.toUTCString() + ' - ' + config.method.toUpperCase() + ' ' + config.url + ' - ' + data.status + ' ' + (new Date().getTime() - start.getTime()) + 'ms';
	      if (data.status >= 200 && data.status < 300) {
	        if (self.log) {
	          self.dbg('debug', str, data);
	        }
	        return data;
	      } else {
	        if (self.error) {
	          self.error('\'FAILED: ' + str, data);
	        }
	        return _jsData.utils.reject(data);
	      }
	    }
	
	    if (!self.http) {
	      throw new Error('You have not configured this adapter with an http library!');
	    }
	
	    return _jsData.utils.resolve(self.beforeHTTP(config, opts)).then(function (_config) {
	      config = _config || config;
	      if (hasFetch && (self.useFetch || opts.useFetch || !self.http)) {
	        return self.fetch(config, opts).then(logResponse, logResponse);
	      }
	      return self.http(config).then(logResponse, logResponse).catch(function (err) {
	        return self.responseError(err, config, opts);
	      });
	    }).then(function (response) {
	      return _jsData.utils.resolve(self.afterHTTP(config, opts, response)).then(function (_response) {
	        return _response || response;
	      });
	    });
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
	  POST: function POST(url, data, config, opts) {
	    var self = this;
	    var op = void 0;
	    config || (config = {});
	    opts || (opts = {});
	    config.url = url || config.url;
	    config.data = data || config.data;
	    config.method = config.method || 'post';
	
	    // beforePOST lifecycle hook
	    op = opts.op = 'beforePOST';
	    return _jsData.utils.resolve(self[op](url, data, config, opts)).then(function (_config) {
	      // Allow re-assignment from lifecycle hook
	      config = _jsData.utils.isUndefined(_config) ? config : _config;
	      op = opts.op = 'POST';
	      self.dbg(op, url, data, config, opts);
	      return self.HTTP(config, opts);
	    }).then(function (response) {
	      // afterPOST lifecycle hook
	      op = opts.op = 'afterPOST';
	      return _jsData.utils.resolve(self[op](url, data, config, opts, response)).then(function (_response) {
	        // Allow re-assignment from lifecycle hook
	        return _jsData.utils.isUndefined(_response) ? response : _response;
	      });
	    });
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
	  PUT: function PUT(url, data, config, opts) {
	    var self = this;
	    var op = void 0;
	    config || (config = {});
	    opts || (opts = {});
	    config.url = url || config.url;
	    config.data = data || config.data;
	    config.method = config.method || 'put';
	
	    // beforePUT lifecycle hook
	    op = opts.op = 'beforePUT';
	    return _jsData.utils.resolve(self[op](url, data, config, opts)).then(function (_config) {
	      // Allow re-assignment from lifecycle hook
	      config = _jsData.utils.isUndefined(_config) ? config : _config;
	      op = opts.op = 'PUT';
	      self.dbg(op, url, data, config, opts);
	      return self.HTTP(config, opts);
	    }).then(function (response) {
	      // afterPUT lifecycle hook
	      op = opts.op = 'afterPUT';
	      return _jsData.utils.resolve(self[op](url, data, config, opts, response)).then(function (_response) {
	        // Allow re-assignment from lifecycle hook
	        return _jsData.utils.isUndefined(_response) ? response : _response;
	      });
	    });
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
	  queryTransform: function queryTransform(mapper, params, opts) {
	    opts || (opts = {});
	    if (_jsData.utils.isFunction(opts.queryTransform)) {
	      return opts.queryTransform(mapper, params, opts);
	    }
	    if (_jsData.utils.isFunction(mapper.queryTransform)) {
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
	   * @param {Object} config The `config` argument that was passed to {@link HttpAdapter#HTTP}.
	   * @param {*} opts The `opts` argument that was passed to {@link HttpAdapter#HTTP}.
	   * @return {Promise}
	   */
	  responseError: function responseError(err, config, opts) {
	    return _jsData.utils.reject(err);
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
	  serialize: function serialize(mapper, data, opts) {
	    opts || (opts = {});
	    if (_jsData.utils.isFunction(opts.serialize)) {
	      return opts.serialize(mapper, data, opts);
	    }
	    if (_jsData.utils.isFunction(mapper.serialize)) {
	      return mapper.serialize(mapper, data, opts);
	    }
	    return data;
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
	  sum: function sum(mapper, field, query, opts) {
	    var self = this;
	    query || (query = {});
	    opts || (opts = {});
	    if (!_jsData.utils.utils.isString(field)) {
	      throw new Error('field must be a string!');
	    }
	    opts.params = self.getParams(opts);
	    opts.params.sum = field;
	    opts.suffix = self.getSuffix(mapper, opts);
	    _jsData.utils.deepMixIn(opts.params, query);
	    opts.params = self.queryTransform(mapper, opts.params, opts);
	
	    return __super__.sum.call(self, mapper, field, query, opts);
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
	  update: function update(mapper, id, props, opts) {
	    var self = this;
	    opts || (opts = {});
	    opts.params = self.getParams(opts);
	    opts.params = self.queryTransform(mapper, opts.params, opts);
	    opts.suffix = self.getSuffix(mapper, opts);
	
	    return __super__.update.call(self, mapper, id, props, opts);
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
	  updateAll: function updateAll(mapper, props, query, opts) {
	    var self = this;
	    query || (query = {});
	    opts || (opts = {});
	    opts.params = self.getParams(opts);
	    _jsData.utils.deepMixIn(opts.params, query);
	    opts.params = self.queryTransform(mapper, opts.params, opts);
	    opts.suffix = self.getSuffix(mapper, opts);
	
	    return __super__.updateAll.call(self, mapper, props, query, opts);
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
	  updateMany: function updateMany(mapper, records, opts) {
	    var self = this;
	    opts || (opts = {});
	    opts.params = self.getParams(opts);
	    opts.params = self.queryTransform(mapper, opts.params, opts);
	    opts.suffix = self.getSuffix(mapper, opts);
	
	    return __super__.updateMany.call(self, mapper, records, opts);
	  }
	});
	
	/**
	 * Add an Http actions to a mapper.
	 *
	 * @name HttpAdapter.addAction
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
	HttpAdapter.addAction = function (name, opts) {
	  if (!name || !_jsData.utils.isString(name)) {
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
	      return _jsData.utils.reject(err);
	    };
	    mapper[name] = function (id, _opts) {
	      var self = this;
	      if (_jsData.utils.isObject(id)) {
	        _opts = id;
	      }
	      _opts = _opts || {};
	      var adapter = self.getAdapter(opts.adapter || self.defaultAdapter || 'http');
	      var config = {};
	      _jsData.utils.fillIn(config, opts);
	      if (!_opts.hasOwnProperty('endpoint') && config.endpoint) {
	        _opts.endpoint = config.endpoint;
	      }
	      if (typeof _opts.getEndpoint === 'function') {
	        config.url = _opts.getEndpoint(self, _opts);
	      } else {
	        var _args = [_opts.basePath || self.basePath || adapter.basePath, adapter.getEndpoint(self, _jsData.utils.isSorN(id) ? id : null, _opts)];
	        if (_jsData.utils.isSorN(id)) {
	          _args.push(id);
	        }
	        _args.push(opts.pathname || name);
	        config.url = makePath.apply(null, _args);
	      }
	      config.method = config.method || 'GET';
	      config.mapper = self.name;
	      _jsData.utils.deepMixIn(config)(_opts);
	      return _jsData.utils.resolve(config).then(_opts.request || opts.request).then(function (config) {
	        return adapter.HTTP(config);
	      }).then(function (data) {
	        if (data && data.config) {
	          data.config.mapper = self.name;
	        }
	        return data;
	      }).then(_opts.response || opts.response, _opts.responseError || opts.responseError);
	    };
	    return mapper;
	  };
	};
	
	/**
	 * Add multiple Http actions to a mapper. See {@link HttpAdapter.addAction} for
	 * action configuration options.
	 *
	 * @name HttpAdapter.addActions
	 * @method
	 * @param {Object.<string, Object>} opts Object where the key is an action name
	 * and the value is the configuration for the action.
	 * @return {Function} Decoration function, which should be passed the mapper to
	 * decorate when invoked.
	 */
	HttpAdapter.addActions = function (opts) {
	  opts || (opts = {});
	  return function (mapper) {
	    _jsData.utils.forOwn(mapper, function (value, key) {
	      HttpAdapter.addAction(key, value)(mapper);
	    });
	    return mapper;
	  };
	};
	
	/**
	 * Alternative to ES6 class syntax for extending `HttpAdapter`.
	 *
	 * __ES6__:
	 * ```javascript
	 * class MyHttpAdapter extends HttpAdapter {
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
	 * var MyHttpAdapter = HttpAdapter.extend(instanceProps, classProps)
	 * var adapter = new MyHttpAdapter()
	 * adapter.say() // "hi"
	 * MyHttpAdapter.yell() // "HI"
	 * ```
	 *
	 * @name HttpAdapter.extend
	 * @method
	 * @param {Object} [instanceProps] Properties that will be added to the
	 * prototype of the subclass.
	 * @param {Object} [classProps] Properties that will be added as static
	 * properties to the subclass itself.
	 * @return {Object} Subclass of `HttpAdapter`.
	 */
	HttpAdapter.extend = _jsData.utils.extend;
	
	/**
	 * Details of the current version of the `js-data-http` module.
	 *
	 * @name HttpAdapter.version
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
	HttpAdapter.version = {
  beta: 2,
  full: '3.0.0-beta.2',
  major: 3,
  minor: 0,
  patch: 0
};
	
	/**
	 * Registered as `js-data-http` in NPM and Bower. The build of `js-data-http`
	 * that works on Node.js is registered in NPM as `js-data-http-node`. The build
	 * of `js-data-http` that does not bundle `axios` is registered in NPM and Bower
	 * as `js-data-fetch`.
	 *
	 * __Script tag__:
	 * ```javascript
	 * window.HttpAdapter
	 * ```
	 * __CommonJS__:
	 * ```javascript
	 * var HttpAdapter = require('js-data-http')
	 * ```
	 * __ES6 Modules__:
	 * ```javascript
	 * import HttpAdapter from 'js-data-http'
	 * ```
	 * __AMD__:
	 * ```javascript
	 * define('myApp', ['js-data-http'], function (HttpAdapter) { ... })
	 * ```
	 *
	 * @module js-data-http
	 */
	
	module.exports = HttpAdapter;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	(function (global, factory) {
	   true ? factory(__webpack_require__(1)) :
	  typeof define === 'function' && define.amd ? define('js-data-adapter', ['js-data'], factory) :
	  (factory(global.JSData));
	}(this, function (jsData) { 'use strict';
	
	  var babelHelpers = {};
	  babelHelpers.typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
	    return typeof obj;
	  } : function (obj) {
	    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
	  };
	
	  babelHelpers.defineProperty = function (obj, key, value) {
	    if (key in obj) {
	      Object.defineProperty(obj, key, {
	        value: value,
	        enumerable: true,
	        configurable: true,
	        writable: true
	      });
	    } else {
	      obj[key] = value;
	    }
	
	    return obj;
	  };
	
	  babelHelpers.slicedToArray = function () {
	    function sliceIterator(arr, i) {
	      var _arr = [];
	      var _n = true;
	      var _d = false;
	      var _e = undefined;
	
	      try {
	        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
	          _arr.push(_s.value);
	
	          if (i && _arr.length === i) break;
	        }
	      } catch (err) {
	        _d = true;
	        _e = err;
	      } finally {
	        try {
	          if (!_n && _i["return"]) _i["return"]();
	        } finally {
	          if (_d) throw _e;
	        }
	      }
	
	      return _arr;
	    }
	
	    return function (arr, i) {
	      if (Array.isArray(arr)) {
	        return arr;
	      } else if (Symbol.iterator in Object(arr)) {
	        return sliceIterator(arr, i);
	      } else {
	        throw new TypeError("Invalid attempt to destructure non-iterable instance");
	      }
	    };
	  }();
	
	  babelHelpers;
	
	  var noop = function noop() {
	    var self = this;
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    var opts = args[args.length - 1];
	    self.dbg.apply(self, [opts.op].concat(args));
	    return jsData.utils.resolve();
	  };
	
	  var noop2 = function noop2() {
	    var self = this;
	
	    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	      args[_key2] = arguments[_key2];
	    }
	
	    var opts = args[args.length - 2];
	    self.dbg.apply(self, [opts.op].concat(args));
	    return jsData.utils.resolve();
	  };
	
	  var unique = function unique(array) {
	    var seen = {};
	    var final = [];
	    array.forEach(function (item) {
	      if (item in seen) {
	        return;
	      }
	      final.push(item);
	      seen[item] = 0;
	    });
	    return final;
	  };
	
	  var withoutRelations = function withoutRelations(mapper, props) {
	    return jsData.utils.omit(props, mapper.relationFields || []);
	  };
	
	  var DEFAULTS = {
	    /**
	     * Whether to log debugging information.
	     *
	     * @name Adapter#debug
	     * @type {boolean}
	     * @default false
	     */
	    debug: false,
	
	    /**
	     * Whether to return a more detailed response object.
	     *
	     * @name Adapter#raw
	     * @type {boolean}
	     * @default false
	     */
	    raw: false
	  };
	
	  /**
	   * Abstract class meant to be extended by adapters.
	   *
	   * @class Adapter
	   * @abstract
	   * @param {Object} [opts] Configuration opts.
	   * @param {boolean} [opts.debug=false] Whether to log debugging information.
	   * @param {boolean} [opts.raw=false] Whether to return a more detailed response
	   * object.
	   */
	  function Adapter(opts) {
	    var self = this;
	    opts || (opts = {});
	    jsData.utils.fillIn(opts, DEFAULTS);
	    jsData.utils.fillIn(self, opts);
	  }
	
	  Adapter.reserved = ['orderBy', 'sort', 'limit', 'offset', 'skip', 'where'];
	
	  /**
	   * Response object used when `raw` is `true`. May contain other fields in
	   * addition to `data`.
	   *
	   * @typedef {Object} Response
	   * @property {Object} data Response data.
	   * @property {string} op The operation for which the response was created.
	   */
	  function Response(data, meta, op) {
	    var self = this;
	    meta || (meta = {});
	    self.data = data;
	    jsData.utils.fillIn(self, meta);
	    self.op = op;
	  }
	
	  Adapter.Response = Response;
	
	  /**
	   * Alternative to ES6 class syntax for extending `Adapter`.
	   *
	   * @name Adapter.extend
	   * @method
	   * @param {Object} [instanceProps] Properties that will be added to the
	   * prototype of the subclass.
	   * @param {Object} [classProps] Properties that will be added as static
	   * properties to the subclass itself.
	   * @return {Object} Subclass of `Adapter`.
	   */
	  Adapter.extend = jsData.utils.extend;
	
	  jsData.utils.addHiddenPropsToTarget(Adapter.prototype, {
	    /**
	     * Lifecycle method method called by <a href="#count__anchor">count</a>.
	     *
	     * Override this method to add custom behavior for this lifecycle hook.
	     *
	     * Returning a Promise causes <a href="#count__anchor">count</a> to wait for the Promise to resolve before continuing.
	     *
	     * If `opts.raw` is `true` then `response` will be a detailed response object, otherwise `response` will be the count.
	     *
	     * `response` may be modified. You can also re-assign `response` to another value by returning a different value or a Promise that resolves to a different value.
	     *
	     * A thrown error or rejected Promise will bubble up and reject the Promise returned by <a href="#count__anchor">count</a>.
	     *
	     * @name Adapter#afterCount
	     * @method
	     * @param {Object} mapper The `mapper` argument passed to <a href="#count__anchor">count</a>.
	     * @param {Object} props The `props` argument passed to <a href="#count__anchor">count</a>.
	     * @param {Object} opts The `opts` argument passed to <a href="#count__anchor">count</a>.
	     * @property {string} opts.op `afterCount`
	     * @param {Object|Response} response Count or {@link Response}, depending on the value of `opts.raw`.
	     */
	    afterCount: noop2,
	
	    /**
	     * Lifecycle method method called by <a href="#create__anchor">create</a>.
	     *
	     * Override this method to add custom behavior for this lifecycle hook.
	     *
	     * Returning a Promise causes <a href="#create__anchor">create</a> to wait for the Promise to resolve before continuing.
	     *
	     * If `opts.raw` is `true` then `response` will be a detailed response object, otherwise `response` will be the created record.
	     *
	     * `response` may be modified. You can also re-assign `response` to another value by returning a different value or a Promise that resolves to a different value.
	     *
	     * A thrown error or rejected Promise will bubble up and reject the Promise returned by <a href="#create__anchor">create</a>.
	     *
	     * @name Adapter#afterCreate
	     * @method
	     * @param {Object} mapper The `mapper` argument passed to <a href="#create__anchor">create</a>.
	     * @param {Object} props The `props` argument passed to <a href="#create__anchor">create</a>.
	     * @param {Object} opts The `opts` argument passed to <a href="#create__anchor">create</a>.
	     * @property {string} opts.op `afterCreate`
	     * @param {Object|Response} response Created record or {@link Response}, depending on the value of `opts.raw`.
	     */
	    afterCreate: noop2,
	
	    /**
	     * Lifecycle method method called by <a href="#createMany__anchor">createMany</a>.
	     *
	     * Override this method to add custom behavior for this lifecycle hook.
	     *
	     * Returning a Promise causes <a href="#createMany__anchor">createMany</a> to wait for the Promise to resolve before continuing.
	     *
	     * If `opts.raw` is `true` then `response` will be a detailed response object, otherwise `response` will be the created records.
	     *
	     * `response` may be modified. You can also re-assign `response` to another value by returning a different value or a Promise that resolves to a different value.
	     *
	     * A thrown error or rejected Promise will bubble up and reject the Promise returned by <a href="#createMany__anchor">createMany</a>.
	     *
	     * @name Adapter#afterCreate
	     * @method
	     * @param {Object} mapper The `mapper` argument passed to <a href="#createMany__anchor">createMany</a>.
	     * @param {Object[]} props The `props` argument passed to <a href="#createMany__anchor">createMany</a>.
	     * @param {Object} opts The `opts` argument passed to <a href="#createMany__anchor">createMany</a>.
	     * @property {string} opts.op `afterCreateMany`
	     * @param {Object[]|Response} response Created records or {@link Response}, depending on the value of `opts.raw`.
	     */
	    afterCreateMany: noop2,
	
	    /**
	     * Lifecycle method method called by <a href="#destroy__anchor">destroy</a>.
	     *
	     * Override this method to add custom behavior for this lifecycle hook.
	     *
	     * Returning a Promise causes <a href="#destroy__anchor">destroy</a> to wait for the Promise to resolve before continuing.
	     *
	     * If `opts.raw` is `true` then `response` will be a detailed response object, otherwise `response` will be `undefined`.
	     *
	     * `response` may be modified. You can also re-assign `response` to another value by returning a different value or a Promise that resolves to a different value.
	     *
	     * A thrown error or rejected Promise will bubble up and reject the Promise returned by <a href="#destroy__anchor">destroy</a>.
	     *
	     * @name Adapter#afterDestroy
	     * @method
	     * @param {Object} mapper The `mapper` argument passed to <a href="#destroy__anchor">destroy</a>.
	     * @param {(string|number)} id The `id` argument passed to <a href="#destroy__anchor">destroy</a>.
	     * @param {Object} opts The `opts` argument passed to <a href="#destroy__anchor">destroy</a>.
	     * @property {string} opts.op `afterDestroy`
	     * @param {undefined|Response} response `undefined` or {@link Response}, depending on the value of `opts.raw`.
	     */
	    afterDestroy: noop2,
	
	    /**
	     * Lifecycle method method called by <a href="#destroyAll__anchor">destroyAll</a>.
	     *
	     * Override this method to add custom behavior for this lifecycle hook.
	     *
	     * Returning a Promise causes <a href="#destroyAll__anchor">destroyAll</a> to wait for the Promise to resolve before continuing.
	     *
	     * If `opts.raw` is `true` then `response` will be a detailed response object, otherwise `response` will be `undefined`.
	     *
	     * `response` may be modified. You can also re-assign `response` to another value by returning a different value or a Promise that resolves to a different value.
	     *
	     * A thrown error or rejected Promise will bubble up and reject the Promise returned by <a href="#destroyAll__anchor">destroyAll</a>.
	     *
	     * @name Adapter#afterDestroyAll
	     * @method
	     * @param {Object} mapper The `mapper` argument passed to <a href="#destroyAll__anchor">destroyAll</a>.
	     * @param {Object} query The `query` argument passed to <a href="#destroyAll__anchor">destroyAll</a>.
	     * @param {Object} opts The `opts` argument passed to <a href="#destroyAll__anchor">destroyAll</a>.
	     * @property {string} opts.op `afterDestroyAll`
	     * @param {undefined|Response} response `undefined` or {@link Response}, depending on the value of `opts.raw`.
	     */
	    afterDestroyAll: noop2,
	
	    /**
	     * Lifecycle method method called by <a href="#find__anchor">find</a>.
	     *
	     * Override this method to add custom behavior for this lifecycle hook.
	     *
	     * Returning a Promise causes <a href="#find__anchor">find</a> to wait for the Promise to resolve before continuing.
	     *
	     * If `opts.raw` is `true` then `response` will be a detailed response object, otherwise `response` will be the found record, if any.
	     *
	     * `response` may be modified. You can also re-assign `response` to another value by returning a different value or a Promise that resolves to a different value.
	     *
	     * A thrown error or rejected Promise will bubble up and reject the Promise returned by <a href="#find__anchor">find</a>.
	     *
	     * @name Adapter#afterFind
	     * @method
	     * @param {Object} mapper The `mapper` argument passed to <a href="#find__anchor">find</a>.
	     * @param {(string|number)} id The `id` argument passed to <a href="#find__anchor">find</a>.
	     * @param {Object} opts The `opts` argument passed to <a href="#find__anchor">find</a>.
	     * @property {string} opts.op `afterFind`
	     * @param {Object|Response} response The found record or {@link Response}, depending on the value of `opts.raw`.
	     */
	    afterFind: noop2,
	
	    /**
	     * Lifecycle method method called by <a href="#findAll__anchor">findAll</a>.
	     *
	     * Override this method to add custom behavior for this lifecycle hook.
	     *
	     * Returning a Promise causes <a href="#findAll__anchor">findAll</a> to wait for the Promise to resolve before continuing.
	     *
	     * If `opts.raw` is `true` then `response` will be a detailed response object, otherwise `response` will be the found records, if any.
	     *
	     * `response` may be modified. You can also re-assign `response` to another value by returning a different value or a Promise that resolves to a different value.
	     *
	     * A thrown error or rejected Promise will bubble up and reject the Promise returned by <a href="#findAll__anchor">findAll</a>.
	     *
	     * @name Adapter#afterFindAll
	     * @method
	     * @param {Object} mapper The `mapper` argument passed to <a href="#findAll__anchor">findAll</a>.
	     * @param {Object} query The `query` argument passed to <a href="#findAll__anchor">findAll</a>.
	     * @param {Object} opts The `opts` argument passed to <a href="#findAll__anchor">findAll</a>.
	     * @property {string} opts.op `afterFindAll`
	     * @param {Object[]|Response} response The found records or {@link Response}, depending on the value of `opts.raw`.
	     */
	    afterFindAll: noop2,
	
	    /**
	     * Lifecycle method method called by <a href="#sum__anchor">sum</a>.
	     *
	     * Override this method to add custom behavior for this lifecycle hook.
	     *
	     * Returning a Promise causes <a href="#sum__anchor">sum</a> to wait for the Promise to resolve before continuing.
	     *
	     * If `opts.raw` is `true` then `response` will be a detailed response object, otherwise `response` will be the sum.
	     *
	     * `response` may be modified. You can also re-assign `response` to another value by returning a different value or a Promise that resolves to a different value.
	     *
	     * A thrown error or rejected Promise will bubble up and reject the Promise returned by <a href="#sum__anchor">sum</a>.
	     *
	     * @name Adapter#afterSum
	     * @method
	     * @param {Object} mapper The `mapper` argument passed to <a href="#sum__anchor">sum</a>.
	     * @param {Object} props The `props` argument passed to <a href="#sum__anchor">sum</a>.
	     * @param {Object} opts The `opts` argument passed to <a href="#sum__anchor">sum</a>.
	     * @property {string} opts.op `afterSum`
	     * @param {Object|Response} response Count or {@link Response}, depending on the value of `opts.raw`.
	     */
	    afterSum: noop2,
	
	    /**
	     * Lifecycle method method called by <a href="#update__anchor">update</a>.
	     *
	     * Override this method to add custom behavior for this lifecycle hook.
	     *
	     * Returning a Promise causes <a href="#update__anchor">update</a> to wait for the Promise to resolve before continuing.
	     *
	     * If `opts.raw` is `true` then `response` will be a detailed response object, otherwise `response` will be the updated record.
	     *
	     * `response` may be modified. You can also re-assign `response` to another value by returning a different value or a Promise that resolves to a different value.
	     *
	     * A thrown error or rejected Promise will bubble up and reject the Promise returned by <a href="#update__anchor">update</a>.
	     *
	     * @name Adapter#afterUpdate
	     * @method
	     * @param {Object} mapper The `mapper` argument passed to <a href="#update__anchor">update</a>.
	     * @param {(string|number)} id The `id` argument passed to <a href="#update__anchor">update</a>.
	     * @param {Object} props The `props` argument passed to <a href="#update__anchor">update</a>.
	     * @param {Object} opts The `opts` argument passed to <a href="#update__anchor">update</a>.
	     * @property {string} opts.op `afterUpdate`
	     * @param {Object|Response} response The updated record or {@link Response}, depending on the value of `opts.raw`.
	     */
	    afterUpdate: noop2,
	
	    /**
	     * Lifecycle method method called by <a href="#updateAll__anchor">updateAll</a>.
	     *
	     * Override this method to add custom behavior for this lifecycle hook.
	     *
	     * Returning a Promise causes <a href="#updateAll__anchor">updateAll</a> to wait for the Promise to resolve before continuing.
	     *
	     * If `opts.raw` is `true` then `response` will be a detailed response object, otherwise `response` will be the updated records, if any.
	     *
	     * `response` may be modified. You can also re-assign `response` to another value by returning a different value or a Promise that resolves to a different value.
	     *
	     * A thrown error or rejected Promise will bubble up and reject the Promise returned by <a href="#updateAll__anchor">updateAll</a>.
	     *
	     * @name Adapter#afterUpdateAll
	     * @method
	     * @param {Object} mapper The `mapper` argument passed to <a href="#updateAll__anchor">updateAll</a>.
	     * @param {Object} props The `props` argument passed to <a href="#updateAll__anchor">updateAll</a>.
	     * @param {Object} query The `query` argument passed to <a href="#updateAll__anchor">updateAll</a>.
	     * @param {Object} opts The `opts` argument passed to <a href="#updateAll__anchor">updateAll</a>.
	     * @property {string} opts.op `afterUpdateAll`
	     * @param {Object[]|Response} response The updated records or {@link Response}, depending on the value of `opts.raw`.
	     */
	    afterUpdateAll: noop2,
	
	    /**
	     * Lifecycle method method called by <a href="#updateMany__anchor">updateMany</a>.
	     *
	     * Override this method to add custom behavior for this lifecycle hook.
	     *
	     * Returning a Promise causes <a href="#updateMany__anchor">updateMany</a> to wait for the Promise to resolve before continuing.
	     *
	     * If `opts.raw` is `true` then `response` will be a detailed response object, otherwise `response` will be the updated records, if any.
	     *
	     * `response` may be modified. You can also re-assign `response` to another value by returning a different value or a Promise that resolves to a different value.
	     *
	     * A thrown error or rejected Promise will bubble up and reject the Promise returned by <a href="#updateMany__anchor">updateMany</a>.
	     *
	     * @name Adapter#afterUpdateMany
	     * @method
	     * @param {Object} mapper The `mapper` argument passed to <a href="#updateMany__anchor">updateMany</a>.
	     * @param {Object[]} records The `records` argument passed to <a href="#updateMany__anchor">updateMany</a>.
	     * @param {Object} opts The `opts` argument passed to <a href="#updateMany__anchor">updateMany</a>.
	     * @property {string} opts.op `afterUpdateMany`
	     * @param {Object[]|Response} response The updated records or {@link Response}, depending on the value of `opts.raw`.
	     */
	    afterUpdateMany: noop2,
	
	    /**
	     * Lifecycle method method called by <a href="#count__anchor">count</a>.
	     *
	     * Override this method to add custom behavior for this lifecycle hook.
	     *
	     * Returning a Promise causes <a href="#count__anchor">count</a> to wait for the Promise to resolve before continuing.
	     *
	     * A thrown error or rejected Promise will bubble up and reject the Promise returned by <a href="#count__anchor">count</a>.
	     *
	     * @name Adapter#beforeCount
	     * @method
	     * @param {Object} mapper The `mapper` argument passed to <a href="#count__anchor">count</a>.
	     * @param {Object} query The `query` argument passed to <a href="#count__anchor">count</a>.
	     * @param {Object} opts The `opts` argument passed to <a href="#count__anchor">count</a>.
	     * @property {string} opts.op `beforeCount`
	     */
	    beforeCount: noop,
	
	    /**
	     * Lifecycle method method called by <a href="#create__anchor">create</a>.
	     *
	     * Override this method to add custom behavior for this lifecycle hook.
	     *
	     * Returning a Promise causes <a href="#create__anchor">create</a> to wait for the Promise to resolve before continuing.
	     *
	     * `props` may be modified. You can also re-assign `props` to another value by returning a different value or a Promise that resolves to a different value.
	     *
	     * A thrown error or rejected Promise will bubble up and reject the Promise returned by <a href="#create__anchor">create</a>.
	     *
	     * @name Adapter#beforeCreate
	     * @method
	     * @param {Object} mapper The `mapper` argument passed to <a href="#create__anchor">create</a>.
	     * @param {Object} props The `props` argument passed to <a href="#create__anchor">create</a>.
	     * @param {Object} opts The `opts` argument passed to <a href="#create__anchor">create</a>.
	     * @property {string} opts.op `beforeCreate`
	     */
	    beforeCreate: noop,
	
	    /**
	     * Lifecycle method method called by <a href="#createMany__anchor">createMany</a>.
	     *
	     * Override this method to add custom behavior for this lifecycle hook.
	     *
	     * Returning a Promise causes <a href="#createMany__anchor">createMany</a> to wait for the Promise to resolve before continuing.
	     *
	     * `props` may be modified. You can also re-assign `props` to another value by returning a different value or a Promise that resolves to a different value.
	     *
	     * A thrown error or rejected Promise will bubble up and reject the Promise returned by <a href="#createMany__anchor">createMany</a>.
	     *
	     * @name Adapter#beforeCreateMany
	     * @method
	     * @param {Object} mapper The `mapper` argument passed to <a href="#createMany__anchor">createMany</a>.
	     * @param {Object[]} props The `props` argument passed to <a href="#createMany__anchor">createMany</a>.
	     * @param {Object} opts The `opts` argument passed to <a href="#createMany__anchor">createMany</a>.
	     * @property {string} opts.op `beforeCreateMany`
	     */
	    beforeCreateMany: noop,
	
	    /**
	     * Lifecycle method method called by <a href="#destroy__anchor">destroy</a>.
	     *
	     * Override this method to add custom behavior for this lifecycle hook.
	     *
	     * Returning a Promise causes <a href="#destroy__anchor">destroy</a> to wait for the Promise to resolve before continuing.
	     *
	     * A thrown error or rejected Promise will bubble up and reject the Promise returned by <a href="#destroy__anchor">destroy</a>.
	     *
	     * @name Adapter#beforeDestroy
	     * @method
	     * @param {Object} mapper The `mapper` argument passed to <a href="#destroy__anchor">destroy</a>.
	     * @param {(string|number)} id The `id` argument passed to <a href="#destroy__anchor">destroy</a>.
	     * @param {Object} opts The `opts` argument passed to <a href="#destroy__anchor">destroy</a>.
	     * @property {string} opts.op `beforeDestroy`
	     */
	    beforeDestroy: noop,
	
	    /**
	     * Lifecycle method method called by <a href="#destroyAll__anchor">destroyAll</a>.
	     *
	     * Override this method to add custom behavior for this lifecycle hook.
	     *
	     * Returning a Promise causes <a href="#destroyAll__anchor">destroyAll</a> to wait for the Promise to resolve before continuing.
	     *
	     * A thrown error or rejected Promise will bubble up and reject the Promise returned by <a href="#destroyAll__anchor">destroyAll</a>.
	     *
	     * @name Adapter#beforeDestroyAll
	     * @method
	     * @param {Object} mapper The `mapper` argument passed to <a href="#destroyAll__anchor">destroyAll</a>.
	     * @param {Object} query The `query` argument passed to <a href="#destroyAll__anchor">destroyAll</a>.
	     * @param {Object} opts The `opts` argument passed to <a href="#destroyAll__anchor">destroyAll</a>.
	     * @property {string} opts.op `beforeDestroyAll`
	     */
	    beforeDestroyAll: noop,
	
	    /**
	     * Lifecycle method method called by <a href="#find__anchor">find</a>.
	     *
	     * Override this method to add custom behavior for this lifecycle hook.
	     *
	     * Returning a Promise causes <a href="#find__anchor">find</a> to wait for the Promise to resolve before continuing.
	     *
	     * A thrown error or rejected Promise will bubble up and reject the Promise returned by <a href="#find__anchor">find</a>.
	     *
	     * @name Adapter#beforeFind
	     * @method
	     * @param {Object} mapper The `mapper` argument passed to <a href="#find__anchor">find</a>.
	     * @param {(string|number)} id The `id` argument passed to <a href="#find__anchor">find</a>.
	     * @param {Object} opts The `opts` argument passed to <a href="#find__anchor">find</a>.
	     * @property {string} opts.op `beforeFind`
	     */
	    beforeFind: noop,
	
	    /**
	     * Lifecycle method method called by <a href="#findAll__anchor">findAll</a>.
	     *
	     * Override this method to add custom behavior for this lifecycle hook.
	     *
	     * Returning a Promise causes <a href="#findAll__anchor">findAll</a> to wait for the Promise to resolve before continuing.
	     *
	     * A thrown error or rejected Promise will bubble up and reject the Promise returned by <a href="#findAll__anchor">findAll</a>.
	     *
	     * @name Adapter#beforeFindAll
	     * @method
	     * @param {Object} mapper The `mapper` argument passed to <a href="#findAll__anchor">findAll</a>.
	     * @param {Object} query The `query` argument passed to <a href="#findAll__anchor">findAll</a>.
	     * @param {Object} opts The `opts` argument passed to <a href="#findAll__anchor">findAll</a>.
	     * @property {string} opts.op `beforeFindAll`
	     */
	    beforeFindAll: noop,
	
	    /**
	     * Lifecycle method method called by <a href="#sum__anchor">sum</a>.
	     *
	     * Override this method to add custom behavior for this lifecycle hook.
	     *
	     * Returning a Promise causes <a href="#sum__anchor">sum</a> to wait for the Promise to resolve before continuing.
	     *
	     * A thrown error or rejected Promise will bubble up and reject the Promise returned by <a href="#sum__anchor">sum</a>.
	     *
	     * @name Adapter#beforeSum
	     * @method
	     * @param {Object} mapper The `mapper` argument passed to <a href="#sum__anchor">sum</a>.
	     * @param {Object} query The `query` argument passed to <a href="#sum__anchor">sum</a>.
	     * @param {Object} opts The `opts` argument passed to <a href="#sum__anchor">sum</a>.
	     * @property {string} opts.op `beforeSum`
	     */
	    beforeSum: noop,
	
	    /**
	     * Lifecycle method method called by <a href="#update__anchor">update</a>.
	     *
	     * Override this method to add custom behavior for this lifecycle hook.
	     *
	     * Returning a Promise causes <a href="#update__anchor">update</a> to wait for the Promise to resolve before continuing.
	     *
	     * `props` may be modified. You can also re-assign `props` to another value by returning a different value or a Promise that resolves to a different value.
	     *
	     * A thrown error or rejected Promise will bubble up and reject the Promise returned by <a href="#update__anchor">update</a>.
	     *
	     * @name Adapter#beforeUpdate
	     * @method
	     * @param {Object} mapper The `mapper` argument passed to <a href="#update__anchor">update</a>.
	     * @param {(string|number)} id The `id` argument passed to <a href="#update__anchor">update</a>.
	     * @param {Object} props The `props` argument passed to <a href="#update__anchor">update</a>.
	     * @param {Object} opts The `opts` argument passed to <a href="#update__anchor">update</a>.
	     * @property {string} opts.op `beforeUpdate`
	     */
	    beforeUpdate: noop,
	
	    /**
	     * Lifecycle method method called by <a href="#updateAll__anchor">updateAll</a>.
	     *
	     * Override this method to add custom behavior for this lifecycle hook.
	     *
	     * Returning a Promise causes <a href="#updateAll__anchor">updateAll</a> to wait for the Promise to resolve before continuing.
	     *
	     * `props` may be modified. You can also re-assign `props` to another value by returning a different value or a Promise that resolves to a different value.
	     *
	     * A thrown error or rejected Promise will bubble up and reject the Promise returned by <a href="#updateAll__anchor">updateAll</a>.
	     *
	     * @name Adapter#beforeUpdateAll
	     * @method
	     * @param {Object} mapper The `mapper` argument passed to <a href="#updateAll__anchor">updateAll</a>.
	     * @param {Object} props The `props` argument passed to <a href="#updateAll__anchor">updateAll</a>.
	     * @param {Object} query The `query` argument passed to <a href="#updateAll__anchor">updateAll</a>.
	     * @param {Object} opts The `opts` argument passed to <a href="#updateAll__anchor">updateAll</a>.
	     * @property {string} opts.op `beforeUpdateAll`
	     */
	    beforeUpdateAll: noop,
	
	    /**
	     * Lifecycle method method called by <a href="#updateMany__anchor">updateMany</a>.
	     *
	     * Override this method to add custom behavior for this lifecycle hook.
	     *
	     * Returning a Promise causes <a href="#updateMany__anchor">updateMany</a> to wait for the Promise to resolve before continuing.
	     *
	     * `props` may be modified. You can also re-assign `props` to another value by returning a different value or a Promise that resolves to a different value.
	     *
	     * A thrown error or rejected Promise will bubble up and reject the Promise returned by <a href="#updateMany__anchor">updateMany</a>.
	     *
	     * @name Adapter#beforeUpdateMany
	     * @method
	     * @param {Object} mapper The `mapper` argument passed to <a href="#updateMany__anchor">updateMany</a>.
	     * @param {Object[]} props The `props` argument passed to <a href="#updateMany__anchor">updateMany</a>.
	     * @param {Object} opts The `opts` argument passed to <a href="#updateMany__anchor">updateMany</a>.
	     * @property {string} opts.op `beforeUpdateMany`
	     */
	    beforeUpdateMany: noop,
	
	    /**
	     * Shortcut for `#log('debug'[, arg1[, arg2[, argn]]])`.
	     *
	     * @name Adapter#dbg
	     * @method
	     */
	    dbg: function dbg() {
	      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	        args[_key3] = arguments[_key3];
	      }
	
	      this.log.apply(this, ['debug'].concat(args));
	    },
	
	
	    /**
	     * Retrieve the number of records that match the selection query. Called by
	     * `Mapper#count`.
	     *
	     * @name Adapter#count
	     * @method
	     * @param {Object} mapper The mapper.
	     * @param {Object} [query] Selection query.
	     * @param {Object} [query.where] Filtering criteria.
	     * @param {string|Array} [query.orderBy] Sorting criteria.
	     * @param {string|Array} [query.sort] Same as `query.sort`.
	     * @param {number} [query.limit] Limit results.
	     * @param {number} [query.skip] Offset results.
	     * @param {number} [query.offset] Same as `query.skip`.
	     * @param {Object} [opts] Configuration options.
	     * @param {boolean} [opts.raw=false] Whether to return a more detailed
	     * response object.
	     * @return {Promise}
	     */
	    count: function count(mapper, query, opts) {
	      var self = this;
	      var op = void 0;
	      query || (query = {});
	      opts || (opts = {});
	
	      // beforeCount lifecycle hook
	      op = opts.op = 'beforeCount';
	      return jsData.utils.resolve(self[op](mapper, query, opts)).then(function () {
	        // Allow for re-assignment from lifecycle hook
	        op = opts.op = 'count';
	        self.dbg(op, mapper, query, opts);
	        return jsData.utils.resolve(self._count(mapper, query, opts));
	      }).then(function (results) {
	        var _results = babelHelpers.slicedToArray(results, 2);
	
	        var data = _results[0];
	        var result = _results[1];
	
	        result || (result = {});
	        var response = new Response(data, result, op);
	        response = self.respond(response, opts);
	
	        // afterCount lifecycle hook
	        op = opts.op = 'afterCount';
	        return jsData.utils.resolve(self[op](mapper, query, opts, response)).then(function (_response) {
	          // Allow for re-assignment from lifecycle hook
	          return jsData.utils.isUndefined(_response) ? response : _response;
	        });
	      });
	    },
	
	
	    /**
	     * Create a new record. Called by `Mapper#create`.
	     *
	     * @name Adapter#create
	     * @method
	     * @param {Object} mapper The mapper.
	     * @param {Object} props The record to be created.
	     * @param {Object} [opts] Configuration options.
	     * @param {boolean} [opts.raw=false] Whether to return a more detailed
	     * response object.
	     * @return {Promise}
	     */
	    create: function create(mapper, props, opts) {
	      var self = this;
	      var op = void 0;
	      props || (props = {});
	      opts || (opts = {});
	
	      // beforeCreate lifecycle hook
	      op = opts.op = 'beforeCreate';
	      return jsData.utils.resolve(self[op](mapper, props, opts)).then(function (_props) {
	        // Allow for re-assignment from lifecycle hook
	        props = jsData.utils.isUndefined(_props) ? props : _props;
	        props = withoutRelations(mapper, props);
	        op = opts.op = 'create';
	        self.dbg(op, mapper, props, opts);
	        return jsData.utils.resolve(self._create(mapper, props, opts));
	      }).then(function (results) {
	        var _results2 = babelHelpers.slicedToArray(results, 2);
	
	        var data = _results2[0];
	        var result = _results2[1];
	
	        result || (result = {});
	        var response = new Response(data, result, 'create');
	        response.created = data ? 1 : 0;
	        response = self.respond(response, opts);
	
	        // afterCreate lifecycle hook
	        op = opts.op = 'afterCreate';
	        return jsData.utils.resolve(self[op](mapper, props, opts, response)).then(function (_response) {
	          // Allow for re-assignment from lifecycle hook
	          return jsData.utils.isUndefined(_response) ? response : _response;
	        });
	      });
	    },
	
	
	    /**
	     * Create multiple records in a single batch. Called by `Mapper#createMany`.
	     *
	     * @name Adapter#createMany
	     * @method
	     * @param {Object} mapper The mapper.
	     * @param {Object} props The records to be created.
	     * @param {Object} [opts] Configuration options.
	     * @param {boolean} [opts.raw=false] Whether to return a more detailed
	     * response object.
	     * @return {Promise}
	     */
	    createMany: function createMany(mapper, props, opts) {
	      var self = this;
	      var op = void 0;
	      props || (props = {});
	      opts || (opts = {});
	
	      // beforeCreateMany lifecycle hook
	      op = opts.op = 'beforeCreateMany';
	      return jsData.utils.resolve(self[op](mapper, props, opts)).then(function (_props) {
	        // Allow for re-assignment from lifecycle hook
	        props = jsData.utils.isUndefined(_props) ? props : _props;
	        props = props.map(function (record) {
	          return withoutRelations(mapper, record);
	        });
	        op = opts.op = 'createMany';
	        self.dbg(op, mapper, props, opts);
	        return jsData.utils.resolve(self._createMany(mapper, props, opts));
	      }).then(function (results) {
	        var _results3 = babelHelpers.slicedToArray(results, 2);
	
	        var data = _results3[0];
	        var result = _results3[1];
	
	        data || (data = []);
	        result || (result = {});
	        var response = new Response(data, result, 'createMany');
	        response.created = data.length;
	        response = self.respond(response, opts);
	
	        // afterCreateMany lifecycle hook
	        op = opts.op = 'afterCreateMany';
	        return jsData.utils.resolve(self[op](mapper, props, opts, response)).then(function (_response) {
	          // Allow for re-assignment from lifecycle hook
	          return jsData.utils.isUndefined(_response) ? response : _response;
	        });
	      });
	    },
	
	
	    /**
	     * Destroy the record with the given primary key. Called by
	     * `Mapper#destroy`.
	     *
	     * @name Adapter#destroy
	     * @method
	     * @param {Object} mapper The mapper.
	     * @param {(string|number)} id Primary key of the record to destroy.
	     * @param {Object} [opts] Configuration options.
	     * @param {boolean} [opts.raw=false] Whether to return a more detailed
	     * response object.
	     * @return {Promise}
	     */
	    destroy: function destroy(mapper, id, opts) {
	      var self = this;
	      var op = void 0;
	      opts || (opts = {});
	
	      // beforeDestroy lifecycle hook
	      op = opts.op = 'beforeDestroy';
	      return jsData.utils.resolve(self[op](mapper, id, opts)).then(function () {
	        op = opts.op = 'destroy';
	        self.dbg(op, mapper, id, opts);
	        return jsData.utils.resolve(self._destroy(mapper, id, opts));
	      }).then(function (results) {
	        var _results4 = babelHelpers.slicedToArray(results, 2);
	
	        var data = _results4[0];
	        var result = _results4[1];
	
	        result || (result = {});
	        var response = new Response(data, result, 'destroy');
	        response = self.respond(response, opts);
	
	        // afterDestroy lifecycle hook
	        op = opts.op = 'afterDestroy';
	        return jsData.utils.resolve(self[op](mapper, id, opts, response)).then(function (_response) {
	          // Allow for re-assignment from lifecycle hook
	          return jsData.utils.isUndefined(_response) ? response : _response;
	        });
	      });
	    },
	
	
	    /**
	     * Destroy the records that match the selection query. Called by
	     * `Mapper#destroyAll`.
	     *
	     * @name Adapter#destroyAll
	     * @method
	     * @param {Object} mapper the mapper.
	     * @param {Object} [query] Selection query.
	     * @param {Object} [query.where] Filtering criteria.
	     * @param {string|Array} [query.orderBy] Sorting criteria.
	     * @param {string|Array} [query.sort] Same as `query.sort`.
	     * @param {number} [query.limit] Limit results.
	     * @param {number} [query.skip] Offset results.
	     * @param {number} [query.offset] Same as `query.skip`.
	     * @param {Object} [opts] Configuration options.
	     * @param {boolean} [opts.raw=false] Whether to return a more detailed
	     * response object.
	     * @return {Promise}
	     */
	    destroyAll: function destroyAll(mapper, query, opts) {
	      var self = this;
	      var op = void 0;
	      query || (query = {});
	      opts || (opts = {});
	
	      // beforeDestroyAll lifecycle hook
	      op = opts.op = 'beforeDestroyAll';
	      return jsData.utils.resolve(self[op](mapper, query, opts)).then(function () {
	        op = opts.op = 'destroyAll';
	        self.dbg(op, mapper, query, opts);
	        return jsData.utils.resolve(self._destroyAll(mapper, query, opts));
	      }).then(function (results) {
	        var _results5 = babelHelpers.slicedToArray(results, 2);
	
	        var data = _results5[0];
	        var result = _results5[1];
	
	        result || (result = {});
	        var response = new Response(data, result, 'destroyAll');
	        response = self.respond(response, opts);
	
	        // afterDestroyAll lifecycle hook
	        op = opts.op = 'afterDestroyAll';
	        return jsData.utils.resolve(self[op](mapper, query, opts, response)).then(function (_response) {
	          // Allow for re-assignment from lifecycle hook
	          return jsData.utils.isUndefined(_response) ? response : _response;
	        });
	      });
	    },
	
	
	    /**
	     * Return the foreignKey from the given record for the provided relationship.
	     *
	     * There may be reasons why you may want to override this method, like when
	     * the id of the parent doesn't exactly match up to the key on the child.
	     *
	     * Override with care.
	     *
	     * @name Adapter#makeHasManyForeignKey
	     * @method
	     * @return {*}
	     */
	    makeHasManyForeignKey: function makeHasManyForeignKey(mapper, def, record) {
	      return def.getForeignKey(record);
	    },
	
	
	    /**
	     * Return the localKeys from the given record for the provided relationship.
	     *
	     * Override with care.
	     *
	     * @name Adapter#makeHasManyLocalKeys
	     * @method
	     * @return {*}
	     */
	    makeHasManyLocalKeys: function makeHasManyLocalKeys(mapper, def, record) {
	      var localKeys = [];
	      var itemKeys = jsData.utils.get(record, def.localKeys) || [];
	      itemKeys = jsData.utils.isArray(itemKeys) ? itemKeys : Object.keys(itemKeys);
	      localKeys = localKeys.concat(itemKeys);
	      return unique(localKeys).filter(function (x) {
	        return x;
	      });
	    },
	
	
	    /**
	     * Return the foreignKeys from the given record for the provided relationship.
	     *
	     * Override with care.
	     *
	     * @name Adapter#makeHasManyForeignKeys
	     * @method
	     * @return {*}
	     */
	    makeHasManyForeignKeys: function makeHasManyForeignKeys(mapper, def, record) {
	      return jsData.utils.get(record, mapper.idAttribute);
	    },
	
	
	    /**
	     * Load a hasMany relationship.
	     *
	     * Override with care.
	     *
	     * @name Adapter#loadHasMany
	     * @method
	     * @return {Promise}
	     */
	    loadHasMany: function loadHasMany(mapper, def, records, __opts) {
	      var self = this;
	      var singular = false;
	
	      if (jsData.utils.isObject(records) && !jsData.utils.isArray(records)) {
	        singular = true;
	        records = [records];
	      }
	      var IDs = records.map(function (record) {
	        return self.makeHasManyForeignKey(mapper, def, record);
	      });
	      var query = {
	        where: {}
	      };
	      var criteria = query.where[def.foreignKey] = {};
	      if (singular) {
	        // more efficient query when we only have one record
	        criteria['=='] = IDs[0];
	      } else {
	        criteria['in'] = IDs.filter(function (id) {
	          return id;
	        });
	      }
	      return self.findAll(def.getRelation(), query, __opts).then(function (relatedItems) {
	        records.forEach(function (record) {
	          var attached = [];
	          // avoid unneccesary iteration when we only have one record
	          if (singular) {
	            attached = relatedItems;
	          } else {
	            relatedItems.forEach(function (relatedItem) {
	              if (jsData.utils.get(relatedItem, def.foreignKey) === record[mapper.idAttribute]) {
	                attached.push(relatedItem);
	              }
	            });
	          }
	          def.setLocalField(record, attached);
	        });
	      });
	    },
	    loadHasManyLocalKeys: function loadHasManyLocalKeys(mapper, def, records, __opts) {
	      var self = this;
	      var record = void 0;
	      var relatedMapper = def.getRelation();
	
	      if (jsData.utils.isObject(records) && !jsData.utils.isArray(records)) {
	        record = records;
	      }
	
	      if (record) {
	        return self.findAll(relatedMapper, {
	          where: babelHelpers.defineProperty({}, relatedMapper.idAttribute, {
	            'in': self.makeHasManyLocalKeys(mapper, def, record)
	          })
	        }, __opts).then(function (relatedItems) {
	          def.setLocalField(record, relatedItems);
	        });
	      } else {
	        var _ret = function () {
	          var localKeys = [];
	          records.forEach(function (record) {
	            localKeys = localKeys.concat(self.self.makeHasManyLocalKeys(mapper, def, record));
	          });
	          return {
	            v: self.findAll(relatedMapper, {
	              where: babelHelpers.defineProperty({}, relatedMapper.idAttribute, {
	                'in': unique(localKeys).filter(function (x) {
	                  return x;
	                })
	              })
	            }, __opts).then(function (relatedItems) {
	              records.forEach(function (item) {
	                var attached = [];
	                var itemKeys = jsData.utils.get(item, def.localKeys) || [];
	                itemKeys = jsData.utils.isArray(itemKeys) ? itemKeys : Object.keys(itemKeys);
	                relatedItems.forEach(function (relatedItem) {
	                  if (itemKeys && itemKeys.indexOf(relatedItem[relatedMapper.idAttribute]) !== -1) {
	                    attached.push(relatedItem);
	                  }
	                });
	                def.setLocalField(item, attached);
	              });
	              return relatedItems;
	            })
	          };
	        }();
	
	        if ((typeof _ret === 'undefined' ? 'undefined' : babelHelpers.typeof(_ret)) === "object") return _ret.v;
	      }
	    },
	    loadHasManyForeignKeys: function loadHasManyForeignKeys(mapper, def, records, __opts) {
	      var self = this;
	      var relatedMapper = def.getRelation();
	      var idAttribute = mapper.idAttribute;
	      var record = void 0;
	
	      if (jsData.utils.isObject(records) && !jsData.utils.isArray(records)) {
	        record = records;
	      }
	
	      if (record) {
	        return self.findAll(def.getRelation(), {
	          where: babelHelpers.defineProperty({}, def.foreignKeys, {
	            'contains': self.makeHasManyForeignKeys(mapper, def, record)
	          })
	        }, __opts).then(function (relatedItems) {
	          def.setLocalField(record, relatedItems);
	        });
	      } else {
	        return self.findAll(relatedMapper, {
	          where: babelHelpers.defineProperty({}, def.foreignKeys, {
	            'isectNotEmpty': records.map(function (record) {
	              return self.makeHasManyForeignKeys(mapper, def, record);
	            })
	          })
	        }, __opts).then(function (relatedItems) {
	          var foreignKeysField = def.foreignKeys;
	          records.forEach(function (record) {
	            var _relatedItems = [];
	            var id = jsData.utils.get(record, idAttribute);
	            relatedItems.forEach(function (relatedItem) {
	              var foreignKeys = jsData.utils.get(relatedItems, foreignKeysField) || [];
	              if (foreignKeys.indexOf(id) !== -1) {
	                _relatedItems.push(relatedItem);
	              }
	            });
	            def.setLocalField(record, _relatedItems);
	          });
	        });
	      }
	    },
	
	
	    /**
	     * Load a hasOne relationship.
	     *
	     * Override with care.
	     *
	     * @name Adapter#loadHasOne
	     * @method
	     * @return {Promise}
	     */
	    loadHasOne: function loadHasOne(mapper, def, records, __opts) {
	      if (jsData.utils.isObject(records) && !jsData.utils.isArray(records)) {
	        records = [records];
	      }
	      return this.loadHasMany(mapper, def, records, __opts).then(function () {
	        records.forEach(function (record) {
	          var relatedData = def.getLocalField(record);
	          if (jsData.utils.isArray(relatedData) && relatedData.length) {
	            def.setLocalField(record, relatedData[0]);
	          }
	        });
	      });
	    },
	
	
	    /**
	     * Return the foreignKey from the given record for the provided relationship.
	     *
	     * Override with care.
	     *
	     * @name Adapter#makeBelongsToForeignKey
	     * @method
	     * @return {*}
	     */
	    makeBelongsToForeignKey: function makeBelongsToForeignKey(mapper, def, record) {
	      return def.getForeignKey(record);
	    },
	
	
	    /**
	     * Load a belongsTo relationship.
	     *
	     * Override with care.
	     *
	     * @name Adapter#loadBelongsTo
	     * @method
	     * @return {Promise}
	     */
	    loadBelongsTo: function loadBelongsTo(mapper, def, records, __opts) {
	      var self = this;
	      var relationDef = def.getRelation();
	
	      if (jsData.utils.isObject(records) && !jsData.utils.isArray(records)) {
	        var _ret2 = function () {
	          var record = records;
	          return {
	            v: self.find(relationDef, self.makeBelongsToForeignKey(mapper, def, record), __opts).then(function (relatedItem) {
	              def.setLocalField(record, relatedItem);
	            })
	          };
	        }();
	
	        if ((typeof _ret2 === 'undefined' ? 'undefined' : babelHelpers.typeof(_ret2)) === "object") return _ret2.v;
	      } else {
	        var keys = records.map(function (record) {
	          return self.makeBelongsToForeignKey(mapper, def, record);
	        }).filter(function (key) {
	          return key;
	        });
	        return self.findAll(relationDef, {
	          where: babelHelpers.defineProperty({}, relationDef.idAttribute, {
	            'in': keys
	          })
	        }, __opts).then(function (relatedItems) {
	          records.forEach(function (record) {
	            relatedItems.forEach(function (relatedItem) {
	              if (relatedItem[relationDef.idAttribute] === record[def.foreignKey]) {
	                def.setLocalField(record, relatedItem);
	              }
	            });
	          });
	        });
	      }
	    },
	
	
	    /**
	     * Retrieve the record with the given primary key. Called by `Mapper#find`.
	     *
	     * @name Adapter#find
	     * @method
	     * @param {Object} mapper The mapper.
	     * @param {(string|number)} id Primary key of the record to retrieve.
	     * @param {Object} [opts] Configuration options.
	     * @param {boolean} [opts.raw=false] Whether to return a more detailed
	     * response object.
	     * @param {string[]} [opts.with=[]] Relations to eager load.
	     * @return {Promise}
	     */
	    find: function find(mapper, id, opts) {
	      var self = this;
	      var record = void 0,
	          op = void 0;
	      opts || (opts = {});
	      opts.with || (opts.with = []);
	
	      // beforeFind lifecycle hook
	      op = opts.op = 'beforeFind';
	      return jsData.utils.resolve(self[op](mapper, id, opts)).then(function () {
	        op = opts.op = 'find';
	        self.dbg(op, mapper, id, opts);
	        return jsData.utils.resolve(self._find(mapper, id, opts));
	      }).then(function (results) {
	        var _results6 = babelHelpers.slicedToArray(results, 1);
	
	        var _record = _results6[0];
	
	        if (!_record) {
	          return;
	        }
	        record = _record;
	        var tasks = [];
	
	        jsData.utils.forEachRelation(mapper, opts, function (def, __opts) {
	          var task = void 0;
	          if (def.foreignKey && (def.type === 'hasOne' || def.type === 'hasMany')) {
	            if (def.type === 'hasOne') {
	              task = self.loadHasOne(mapper, def, record, __opts);
	            } else {
	              task = self.loadHasMany(mapper, def, record, __opts);
	            }
	          } else if (def.type === 'hasMany' && def.localKeys) {
	            task = self.loadHasManyLocalKeys(mapper, def, record, __opts);
	          } else if (def.type === 'hasMany' && def.foreignKeys) {
	            task = self.loadHasManyForeignKeys(mapper, def, record, __opts);
	          } else if (def.type === 'belongsTo') {
	            task = self.loadBelongsTo(mapper, def, record, __opts);
	          }
	          if (task) {
	            tasks.push(task);
	          }
	        });
	
	        return Promise.all(tasks);
	      }).then(function () {
	        var response = new Response(record, {}, 'find');
	        response.found = record ? 1 : 0;
	        response = self.respond(response, opts);
	
	        // afterFind lifecycle hook
	        op = opts.op = 'afterFind';
	        return jsData.utils.resolve(self[op](mapper, id, opts, response)).then(function (_response) {
	          // Allow for re-assignment from lifecycle hook
	          return jsData.utils.isUndefined(_response) ? response : _response;
	        });
	      });
	    },
	
	
	    /**
	     * Retrieve the records that match the selection query.
	     *
	     * @name Adapter#findAll
	     * @method
	     * @param {Object} mapper The mapper.
	     * @param {Object} [query] Selection query.
	     * @param {Object} [query.where] Filtering criteria.
	     * @param {string|Array} [query.orderBy] Sorting criteria.
	     * @param {string|Array} [query.sort] Same as `query.sort`.
	     * @param {number} [query.limit] Limit results.
	     * @param {number} [query.skip] Offset results.
	     * @param {number} [query.offset] Same as `query.skip`.
	     * @param {Object} [opts] Configuration options.
	     * @param {boolean} [opts.raw=false] Whether to return a more detailed
	     * response object.
	     * @param {string[]} [opts.with=[]] Relations to eager load.
	     * @return {Promise}
	     */
	    findAll: function findAll(mapper, query, opts) {
	      var self = this;
	      opts || (opts = {});
	      opts.with || (opts.with = []);
	
	      var records = [];
	      var op = void 0;
	      var activeWith = opts._activeWith;
	
	      if (jsData.utils.isObject(activeWith)) {
	        var activeQuery = activeWith.query || {};
	        if (activeWith.replace) {
	          query = activeQuery;
	        } else {
	          jsData.utils.deepFillIn(query, activeQuery);
	        }
	      }
	
	      // beforeFindAll lifecycle hook
	      op = opts.op = 'beforeFindAll';
	      return jsData.utils.resolve(self[op](mapper, query, opts)).then(function () {
	        op = opts.op = 'findAll';
	        self.dbg(op, mapper, query, opts);
	        return jsData.utils.resolve(self._findAll(mapper, query, opts));
	      }).then(function (results) {
	        var _results7 = babelHelpers.slicedToArray(results, 1);
	
	        var _records = _results7[0];
	
	        _records || (_records = []);
	        records = _records;
	        var tasks = [];
	        jsData.utils.forEachRelation(mapper, opts, function (def, __opts) {
	          var task = void 0;
	          if (def.foreignKey && (def.type === 'hasOne' || def.type === 'hasMany')) {
	            if (def.type === 'hasMany') {
	              task = self.loadHasMany(mapper, def, records, __opts);
	            } else {
	              task = self.loadHasOne(mapper, def, records, __opts);
	            }
	          } else if (def.type === 'hasMany' && def.localKeys) {
	            task = self.loadHasManyLocalKeys(mapper, def, records, __opts);
	          } else if (def.type === 'hasMany' && def.foreignKeys) {
	            task = self.loadHasManyForeignKeys(mapper, def, records, __opts);
	          } else if (def.type === 'belongsTo') {
	            task = self.loadBelongsTo(mapper, def, records, __opts);
	          }
	          if (task) {
	            tasks.push(task);
	          }
	        });
	        return Promise.all(tasks);
	      }).then(function () {
	        var response = new Response(records, {}, 'findAll');
	        response.found = records.length;
	        response = self.respond(response, opts);
	
	        // afterFindAll lifecycle hook
	        op = opts.op = 'afterFindAll';
	        return jsData.utils.resolve(self[op](mapper, query, opts, response)).then(function (_response) {
	          // Allow for re-assignment from lifecycle hook
	          return jsData.utils.isUndefined(_response) ? response : _response;
	        });
	      });
	    },
	
	
	    /**
	     * Resolve the value of the specified option based on the given options and
	     * this adapter's settings. Override with care.
	     *
	     * @name Adapter#getOpt
	     * @method
	     * @param {string} opt The name of the option.
	     * @param {Object} [opts] Configuration options.
	     * @return {*} The value of the specified option.
	     */
	    getOpt: function getOpt(opt, opts) {
	      opts || (opts = {});
	      return jsData.utils.isUndefined(opts[opt]) ? jsData.utils.plainCopy(this[opt]) : jsData.utils.plainCopy(opts[opt]);
	    },
	
	
	    /**
	     * Logging utility method. Override this method if you want to send log
	     * messages to something other than the console.
	     *
	     * @name Adapter#log
	     * @method
	     * @param {string} level Log level.
	     * @param {...*} values Values to log.
	     */
	    log: function log(level) {
	      for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
	        args[_key4 - 1] = arguments[_key4];
	      }
	
	      if (level && !args.length) {
	        args.push(level);
	        level = 'debug';
	      }
	      if (level === 'debug' && !this.debug) {
	        return;
	      }
	      var prefix = level.toUpperCase() + ': (Adapter)';
	      if (console[level]) {
	        var _console;
	
	        (_console = console)[level].apply(_console, [prefix].concat(args));
	      } else {
	        var _console2;
	
	        (_console2 = console).log.apply(_console2, [prefix].concat(args));
	      }
	    },
	
	
	    /**
	     * Retrieve sum of the specified field of the records that match the selection
	     * query. Called by `Mapper#sum`.
	     *
	     * @name Adapter#sum
	     * @method
	     * @param {Object} mapper The mapper.
	     * @param {string} field By to sum.
	     * @param {Object} [query] Selection query.
	     * @param {Object} [query.where] Filtering criteria.
	     * @param {string|Array} [query.orderBy] Sorting criteria.
	     * @param {string|Array} [query.sort] Same as `query.sort`.
	     * @param {number} [query.limit] Limit results.
	     * @param {number} [query.skip] Offset results.
	     * @param {number} [query.offset] Same as `query.skip`.
	     * @param {Object} [opts] Configuration options.
	     * @param {boolean} [opts.raw=false] Whether to return a more detailed
	     * response object.
	     * @return {Promise}
	     */
	    sum: function sum(mapper, field, query, opts) {
	      var self = this;
	      var op = void 0;
	      if (!jsData.utils.isString(field)) {
	        throw new Error('field must be a string!');
	      }
	      query || (query = {});
	      opts || (opts = {});
	
	      // beforeSum lifecycle hook
	      op = opts.op = 'beforeSum';
	      return jsData.utils.resolve(self[op](mapper, field, query, opts)).then(function () {
	        // Allow for re-assignment from lifecycle hook
	        op = opts.op = 'sum';
	        self.dbg(op, mapper, field, query, opts);
	        return jsData.utils.resolve(self._sum(mapper, field, query, opts));
	      }).then(function (results) {
	        var _results8 = babelHelpers.slicedToArray(results, 2);
	
	        var data = _results8[0];
	        var result = _results8[1];
	
	        result || (result = {});
	        var response = new Response(data, result, op);
	        response = self.respond(response, opts);
	
	        // afterSum lifecycle hook
	        op = opts.op = 'afterSum';
	        return jsData.utils.resolve(self[op](mapper, field, query, opts, response)).then(function (_response) {
	          // Allow for re-assignment from lifecycle hook
	          return jsData.utils.isUndefined(_response) ? response : _response;
	        });
	      });
	    },
	
	
	    /**
	     * @name Adapter#respond
	     * @method
	     * @param {Object} response Response object.
	     * @param {Object} opts Configuration options.
	     * return {Object} If `opts.raw == true` then return `response`, else return
	     * `response.data`.
	     */
	    respond: function respond(response, opts) {
	      return this.getOpt('raw', opts) ? response : response.data;
	    },
	
	
	    /**
	     * Apply the given update to the record with the specified primary key. Called
	     * by `Mapper#update`.
	     *
	     * @name Adapter#update
	     * @method
	     * @param {Object} mapper The mapper.
	     * @param {(string|number)} id The primary key of the record to be updated.
	     * @param {Object} props The update to apply to the record.
	     * @param {Object} [opts] Configuration options.
	     * @param {boolean} [opts.raw=false] Whether to return a more detailed
	     * response object.
	     * @return {Promise}
	     */
	    update: function update(mapper, id, props, opts) {
	      var self = this;
	      props || (props = {});
	      opts || (opts = {});
	      var op = void 0;
	
	      // beforeUpdate lifecycle hook
	      op = opts.op = 'beforeUpdate';
	      return jsData.utils.resolve(self[op](mapper, id, props, opts)).then(function (_props) {
	        // Allow for re-assignment from lifecycle hook
	        props = jsData.utils.isUndefined(_props) ? props : _props;
	        op = opts.op = 'update';
	        self.dbg(op, mapper, id, props, opts);
	        return jsData.utils.resolve(self._update(mapper, id, props, opts));
	      }).then(function (results) {
	        var _results9 = babelHelpers.slicedToArray(results, 2);
	
	        var data = _results9[0];
	        var result = _results9[1];
	
	        result || (result = {});
	        var response = new Response(data, result, 'update');
	        response.updated = data ? 1 : 0;
	        response = self.respond(response, opts);
	
	        // afterUpdate lifecycle hook
	        op = opts.op = 'afterUpdate';
	        return jsData.utils.resolve(self[op](mapper, id, props, opts, response)).then(function (_response) {
	          // Allow for re-assignment from lifecycle hook
	          return jsData.utils.isUndefined(_response) ? response : _response;
	        });
	      });
	    },
	
	
	    /**
	     * Apply the given update to all records that match the selection query.
	     * Called by `Mapper#updateAll`.
	     *
	     * @name Adapter#updateAll
	     * @method
	     * @param {Object} mapper The mapper.
	     * @param {Object} props The update to apply to the selected records.
	     * @param {Object} [query] Selection query.
	     * @param {Object} [query.where] Filtering criteria.
	     * @param {string|Array} [query.orderBy] Sorting criteria.
	     * @param {string|Array} [query.sort] Same as `query.sort`.
	     * @param {number} [query.limit] Limit results.
	     * @param {number} [query.skip] Offset results.
	     * @param {number} [query.offset] Same as `query.skip`.
	     * @param {Object} [opts] Configuration options.
	     * @param {boolean} [opts.raw=false] Whether to return a more detailed
	     * response object.
	     * @return {Promise}
	     */
	    updateAll: function updateAll(mapper, props, query, opts) {
	      var self = this;
	      props || (props = {});
	      query || (query = {});
	      opts || (opts = {});
	      var op = void 0;
	
	      // beforeUpdateAll lifecycle hook
	      op = opts.op = 'beforeUpdateAll';
	      return jsData.utils.resolve(self[op](mapper, props, query, opts)).then(function (_props) {
	        // Allow for re-assignment from lifecycle hook
	        props = jsData.utils.isUndefined(_props) ? props : _props;
	        op = opts.op = 'updateAll';
	        self.dbg(op, mapper, props, query, opts);
	        return jsData.utils.resolve(self._updateAll(mapper, props, query, opts));
	      }).then(function (results) {
	        var _results10 = babelHelpers.slicedToArray(results, 2);
	
	        var data = _results10[0];
	        var result = _results10[1];
	
	        data || (data = []);
	        result || (result = {});
	        var response = new Response(data, result, 'updateAll');
	        response.updated = data.length;
	        response = self.respond(response, opts);
	
	        // afterUpdateAll lifecycle hook
	        op = opts.op = 'afterUpdateAll';
	        return jsData.utils.resolve(self[op](mapper, props, query, opts, response)).then(function (_response) {
	          // Allow for re-assignment from lifecycle hook
	          return jsData.utils.isUndefined(_response) ? response : _response;
	        });
	      });
	    },
	
	
	    /**
	     * Update the given records in a single batch. Called by `Mapper#updateMany`.
	     *
	     * @name Adapter#updateMany
	     * @method
	     * @param {Object} mapper The mapper.
	     * @param {Object[]} records The records to update.
	     * @param {Object} [opts] Configuration options.
	     * @param {boolean} [opts.raw=false] Whether to return a more detailed
	     * response object.
	     * @return {Promise}
	     */
	    updateMany: function updateMany(mapper, records, opts) {
	      var self = this;
	      records || (records = []);
	      opts || (opts = {});
	      var op = void 0;
	      var idAttribute = mapper.idAttribute;
	
	      records = records.filter(function (record) {
	        return jsData.utils.get(record, idAttribute);
	      });
	
	      // beforeUpdateMany lifecycle hook
	      op = opts.op = 'beforeUpdateMany';
	      return jsData.utils.resolve(self[op](mapper, records, opts)).then(function (_records) {
	        // Allow for re-assignment from lifecycle hook
	        records = jsData.utils.isUndefined(_records) ? records : _records;
	        records = records.map(function (record) {
	          return withoutRelations(mapper, record);
	        });
	        op = opts.op = 'updateMany';
	        self.dbg(op, mapper, records, opts);
	        return jsData.utils.resolve(self._updateMany(mapper, records, opts));
	      }).then(function (results) {
	        var _results11 = babelHelpers.slicedToArray(results, 2);
	
	        var data = _results11[0];
	        var result = _results11[1];
	
	        data || (data = []);
	        result || (result = {});
	        var response = new Response(data, result, 'updateMany');
	        response.updated = data.length;
	        response = self.respond(response, opts);
	
	        // afterUpdateMany lifecycle hook
	        op = opts.op = 'afterUpdateMany';
	        return jsData.utils.resolve(self[op](mapper, records, opts, response)).then(function (_response) {
	          // Allow for re-assignment from lifecycle hook
	          return jsData.utils.isUndefined(_response) ? response : _response;
	        });
	      });
	    }
	  });
	
	  module.exports = Adapter;
	
	}));
	//# sourceMappingURL=js-data-adapter.js.map

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=js-data-http-node.js.map