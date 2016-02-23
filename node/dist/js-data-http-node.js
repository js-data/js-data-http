(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("js-data"), require("axios"));
	else if(typeof define === 'function' && define.amd)
		define(["js-data", "axios"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("js-data"), require("axios")) : factory(root["js-data"], root["axios"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) {
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
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	/* global fetch:true Headers:true Request:true */
	var axios = __webpack_require__(2);
	var _ = _jsData.utils._;
	var addHiddenPropsToTarget = _jsData.utils.addHiddenPropsToTarget;
	var copy = _jsData.utils.copy;
	var deepMixIn = _jsData.utils.deepMixIn;
	var extend = _jsData.utils.extend;
	var fillIn = _jsData.utils.fillIn;
	var forOwn = _jsData.utils.forOwn;
	var isArray = _jsData.utils.isArray;
	var isFunction = _jsData.utils.isFunction;
	var isNumber = _jsData.utils.isNumber;
	var isObject = _jsData.utils.isObject;
	var isSorN = _jsData.utils.isSorN;
	var isString = _jsData.utils.isString;
	var isUndefined = _jsData.utils.isUndefined;
	var resolve = _jsData.utils.resolve;
	var reject = _jsData.utils.reject;
	var toJson = _jsData.utils.toJson;
	
	
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
	
	  forOwn(params, function (val, key) {
	    if (val === null || typeof val === 'undefined') {
	      return;
	    }
	    if (!isArray(val)) {
	      val = [val];
	    }
	
	    val.forEach(function (v) {
	      if (window.toString.call(v) === '[object Date]') {
	        v = v.toISOString();
	      } else if (isObject(v)) {
	        v = toJson(v);
	      }
	      parts.push(encode(key) + '=' + encode(v));
	    });
	  });
	
	  if (parts.length > 0) {
	    url += (url.indexOf('?') === -1 ? '?' : '&') + parts.join('&');
	  }
	
	  return url;
	}
	
	var noop = function noop() {
	  var self = this;
	
	  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	    args[_key2] = arguments[_key2];
	  }
	
	  var opts = args[args.length - 1];
	  self.dbg.apply(self, [opts.op].concat(args));
	};
	
	var noop2 = function noop2() {
	  var self = this;
	
	  for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	    args[_key3] = arguments[_key3];
	  }
	
	  var opts = args[args.length - 2];
	  self.dbg.apply(self, [opts.op].concat(args));
	};
	
	var DEFAULTS = {
	  // Default and user-defined settings
	  /**
	   * @name HttpAdapter#basePath
	   * @type {string}
	   */
	  basePath: '',
	
	  /**
	   * @name HttpAdapter#debug
	   * @type {boolean}
	   * @default false
	   */
	  debug: false,
	
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
	
	  // Default values for arguments
	  opts || (opts = {});
	
	  fillIn(self, opts);
	  fillIn(self, DEFAULTS);
	}
	
	addHiddenPropsToTarget(HttpAdapter.prototype, {
	  /**
	   * @name HttpAdapter#afterCreate
	   * @method
	   * @param {Object} mapper
	   * @param {Object} props
	   * @param {Object} opts
	   * @param {Object} data
	   */
	  afterCreate: noop2,
	
	  /**
	   * @name HttpAdapter#afterCreateMany
	   * @method
	   * @param {Object} mapper
	   * @param {Object} records
	   * @param {Object} opts
	   * @param {Object} data
	   */
	  afterCreateMany: noop2,
	
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
	   * @name HttpAdapter#afterDestroy
	   * @method
	   * @param {Object} mapper
	   * @param {(string|number)} id
	   * @param {Object} opts
	   * @param {Object} data
	   */
	  afterDestroy: noop2,
	
	  /**
	   * @name HttpAdapter#afterDestroyAll
	   * @method
	   * @param {Object} mapper
	   * @param {(string|number)} id
	   * @param {Object} opts
	   * @param {Object} data
	   */
	  afterDestroyAll: noop2,
	
	  /**
	   * @name HttpAdapter#afterFind
	   * @method
	   * @param {Object} mapper
	   * @param {(string|number)} id
	   * @param {Object} opts
	   * @param {Object} data
	   */
	  afterFind: noop2,
	
	  /**
	   * @name HttpAdapter#afterFindAll
	   * @method
	   * @param {Object} mapper
	   * @param {(string|number)} id
	   * @param {Object} opts
	   * @param {Object} data
	   */
	  afterFindAll: noop2,
	
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
	   * @name HttpAdapter#afterUpdate
	   * @method
	   * @param {Object} mapper
	   * @param {(string|number)} id
	   * @param {Object} props
	   * @param {Object} opts
	   * @param {Object} data
	   */
	  afterUpdate: noop2,
	
	  /**
	   * @name HttpAdapter#afterUpdateAll
	   * @method
	   * @param {Object} mapper
	   * @param {Object} props
	   * @param {Object} query
	   * @param {Object} opts
	   * @param {Object} data
	   */
	  afterUpdateAll: noop2,
	
	  /**
	   * @name HttpAdapter#afterUpdateMany
	   * @method
	   * @param {Object} mapper
	   * @param {Object} records
	   * @param {Object} opts
	   * @param {Object} data
	   */
	  afterUpdateMany: noop2,
	
	  /**
	   * @name HttpAdapter#beforeCreate
	   * @method
	   * @param {Object} mapper
	   * @param {Object} props
	   * @param {Object} opts
	   */
	  beforeCreate: noop,
	
	  /**
	   * @name HttpAdapter#beforeCreateMany
	   * @method
	   * @param {Object} mapper
	   * @param {Object} records
	   * @param {Object} opts
	   */
	  beforeCreateMany: noop,
	
	  /**
	   * @name HttpAdapter#beforeDEL
	   * @method
	   * @param {Object} url
	   * @param {Object} config
	   * @param {Object} opts
	   */
	  beforeDEL: noop,
	
	  /**
	   * @name HttpAdapter#beforeDestroy
	   * @method
	   * @param {Object} mapper
	   * @param {(string|number)} id
	   * @param {Object} opts
	   */
	  beforeDestroy: noop,
	
	  /**
	   * @name HttpAdapter#beforeDestroyAll
	   * @method
	   * @param {Object} mapper
	   * @param {Object} query
	   * @param {Object} opts
	   */
	  beforeDestroyAll: noop,
	
	  /**
	   * @name HttpAdapter#beforeFind
	   * @method
	   * @param {Object} mapper
	   * @param {(string|number)} id
	   * @param {Object} opts
	   */
	  beforeFind: noop,
	
	  /**
	   * @name HttpAdapter#beforeFindAll
	   * @method
	   * @param {Object} mapper
	   * @param {Object} query
	   * @param {Object} opts
	   */
	  beforeFindAll: noop,
	
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
	
	  /**
	   * @name HttpAdapter#beforeUpdate
	   * @method
	   * @param {Object} mapper
	   * @param {(string|number)} id
	   * @param {Object} props
	   * @param {Object} opts
	   */
	  beforeUpdate: noop,
	
	  /**
	   * @name HttpAdapter#beforeUpdateAll
	   * @method
	   * @param {Object} mapper
	   * @param {Object} props
	   * @param {Object} query
	   * @param {Object} opts
	   */
	  beforeUpdateAll: noop,
	
	  /**
	   * @name HttpAdapter#beforeUpdateMany
	   * @method
	   * @param {Object} mapper
	   * @param {Object} records
	   * @param {Object} opts
	   */
	  beforeUpdateMany: noop,
	
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
	    var op = undefined;
	    opts = opts ? copy(opts) : {};
	    opts.params || (opts.params = {});
	    opts.params = self.queryTransform(mapper, opts.params, opts);
	    opts.suffix = isUndefined(opts.suffix) ? mapper.suffix : opts.suffix;
	
	    // beforeCreate lifecycle hook
	    op = opts.op = 'beforeCreate';
	    return resolve(self[op](mapper, props, opts)).then(function () {
	      op = opts.op = 'create';
	      self.dbg(op, mapper, props, opts);
	      return self.POST(self.getPath('create', mapper, props, opts), self.serialize(mapper, props, opts), opts);
	    }).then(function (response) {
	      return self.deserialize(mapper, response, opts);
	    }).then(function (data) {
	      // afterCreate lifecycle hook
	      op = opts.op = 'afterCreate';
	      return resolve(self[op](mapper, props, opts, data)).then(function (_data) {
	        // Allow re-assignment from lifecycle hook
	        return isUndefined(_data) ? data : _data;
	      });
	    });
	  },
	
	
	  /**
	   * Create multiple new records in batch.
	   *
	   * @name HttpAdapter#createMany
	   * @method
	   * @param {Object} mapper The mapper.
	   * @param {Array} records Array of property objects to send as the payload.
	   * @param {Object} [opts] Configuration options.
	   * @param {string} [opts.params] TODO
	   * @param {string} [opts.suffix={@link HttpAdapter#suffix}] TODO
	   * @return {Promise}
	   */
	  createMany: function createMany(mapper, records, opts) {
	    var self = this;
	    var op = undefined;
	    opts = opts ? copy(opts) : {};
	    opts.params || (opts.params = {});
	    opts.params = self.queryTransform(mapper, opts.params, opts);
	    opts.suffix = isUndefined(opts.suffix) ? mapper.suffix : opts.suffix;
	
	    // beforeCreateMany lifecycle hook
	    op = opts.op = 'beforeCreateMany';
	    return resolve(self[op](mapper, records, opts)).then(function () {
	      op = opts.op = 'createMany';
	      self.dbg(op, mapper, records, opts);
	      return self.POST(self.getPath('createMany', mapper, null, opts), self.serialize(mapper, records, opts), opts);
	    }).then(function (response) {
	      return self.deserialize(mapper, response, opts);
	    }).then(function (data) {
	      // afterCreateMany lifecycle hook
	      op = opts.op = 'afterCreateMany';
	      return resolve(self[op](mapper, records, opts, data)).then(function (_data) {
	        // Allow re-assignment from lifecycle hook
	        return isUndefined(_data) ? data : _data;
	      });
	    });
	  },
	
	
	  /**
	   * Call {@link HttpAdapter#log} at the "debug" level.
	   *
	   * @name HttpAdapter#dbg
	   * @method
	   * @param {...*} [args] Args passed to {@link HttpAdapter#log}.
	   */
	  dbg: function dbg() {
	    for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
	      args[_key4] = arguments[_key4];
	    }
	
	    this.log.apply(this, ['debug'].concat(args));
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
	    var op = undefined;
	    config || (config = {});
	    opts || (opts = {});
	    config.url = url || config.url;
	    config.method = config.method || 'delete';
	
	    // beforeDEL lifecycle hook
	    op = opts.op = 'beforeDEL';
	    return resolve(self[op](url, config, opts)).then(function (_config) {
	      // Allow re-assignment from lifecycle hook
	      config = isUndefined(_config) ? config : _config;
	      op = opts.op = 'DEL';
	      self.dbg(op, url, config, opts);
	      return self.HTTP(config, opts);
	    }).then(function (response) {
	      // afterDEL lifecycle hook
	      op = opts.op = 'afterDEL';
	      return resolve(self[op](url, config, opts, response)).then(function (_response) {
	        // Allow re-assignment from lifecycle hook
	        return isUndefined(_response) ? response : _response;
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
	    if (isFunction(opts.deserialize)) {
	      return opts.deserialize(mapper, response, opts);
	    }
	    if (isFunction(mapper.deserialize)) {
	      return mapper.deserialize(mapper, response, opts);
	    }
	    if (opts.raw) {
	      return response;
	    }
	    return response ? 'data' in response ? response.data : response : response;
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
	    var op = undefined;
	    opts = opts ? copy(opts) : {};
	    opts.params || (opts.params = {});
	    opts.params = self.queryTransform(mapper, opts.params, opts);
	    opts.suffix = isUndefined(opts.suffix) ? mapper.suffix : opts.suffix;
	
	    // beforeDestroy lifecycle hook
	    op = opts.op = 'beforeDestroy';
	    return resolve(self[op](mapper, id, opts)).then(function () {
	      op = opts.op = 'destroy';
	      self.dbg(op, mapper, id, opts);
	      return self.DEL(self.getPath('destroy', mapper, id, opts), opts);
	    }).then(function (response) {
	      return self.deserialize(mapper, response, opts);
	    }).then(function (data) {
	      // afterDestroy lifecycle hook
	      op = opts.op = 'afterDestroy';
	      return resolve(self[op](mapper, id, opts, data)).then(function (_data) {
	        // Allow re-assignment from lifecycle hook
	        return isUndefined(_data) ? data : _data;
	      });
	    });
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
	    var op = undefined;
	    query || (query = {});
	    opts = opts ? copy(opts) : {};
	    opts.params || (opts.params = {});
	    deepMixIn(opts.params, query);
	    opts.params = self.queryTransform(mapper, opts.params, opts);
	    opts.suffix = isUndefined(opts.suffix) ? mapper.suffix : opts.suffix;
	
	    // beforeDestroyAll lifecycle hook
	    op = opts.op = 'beforeDestroyAll';
	    return resolve(self.beforeDestroyAll(mapper, query, opts)).then(function () {
	      op = opts.op = 'destroyAll';
	      self.dbg(op, mapper, query, opts);
	      return self.DEL(self.getPath('destroyAll', mapper, null, opts), opts);
	    }).then(function (response) {
	      return self.deserialize(mapper, response, opts);
	    }).then(function (data) {
	      // afterDestroyAll lifecycle hook
	      op = opts.op = 'afterDestroyAll';
	      return resolve(self[op](mapper, query, opts, data)).then(function (_data) {
	        // Allow re-assignment from lifecycle hook
	        return isUndefined(_data) ? data : _data;
	      });
	    });
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
	      requestConfig.body = toJson(config.data);
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
	    var op = undefined;
	    opts = opts ? copy(opts) : {};
	    opts.params || (opts.params = {});
	    opts.params = self.queryTransform(mapper, opts.params, opts);
	    opts.suffix = isUndefined(opts.suffix) ? mapper.suffix : opts.suffix;
	
	    // beforeFind lifecycle hook
	    op = opts.op = 'beforeFind';
	    return resolve(self[op](mapper, id, opts)).then(function () {
	      op = opts.op = 'find';
	      self.dbg(op, mapper, id, opts);
	      return self.GET(self.getPath('find', mapper, id, opts), opts);
	    }).then(function (response) {
	      return self.deserialize(mapper, response, opts);
	    }).then(function (data) {
	      // afterFind lifecycle hook
	      op = opts.op = 'afterFind';
	      return resolve(self[op](mapper, id, opts, data)).then(function (_data) {
	        // Allow re-assignment from lifecycle hook
	        return isUndefined(_data) ? data : _data;
	      });
	    });
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
	    var op = undefined;
	    query || (query = {});
	    opts = opts ? copy(opts) : {};
	    opts.params || (opts.params = {});
	    opts.suffix = isUndefined(opts.suffix) ? mapper.suffix : opts.suffix;
	    deepMixIn(opts.params, query);
	    opts.params = self.queryTransform(mapper, opts.params, opts);
	
	    // beforeFindAll lifecycle hook
	    op = opts.op = 'beforeFindAll';
	    return resolve(self[op](mapper, query, opts)).then(function () {
	      op = opts.op = 'findAll';
	      self.dbg(op, mapper, query, opts);
	      return self.GET(self.getPath('findAll', mapper, opts.params, opts), opts);
	    }).then(function (response) {
	      return self.deserialize(mapper, response, opts);
	    }).then(function (data) {
	      // afterFindAll lifecycle hook
	      op = opts.op = 'afterFindAll';
	      return resolve(self[op](mapper, query, opts, data)).then(function (_data) {
	        // Allow re-assignment from lifecycle hook
	        return isUndefined(_data) ? data : _data;
	      });
	    });
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
	    var op = undefined;
	    config || (config = {});
	    opts || (opts = {});
	    config.url = url || config.url;
	    config.method = config.method || 'get';
	
	    // beforeGET lifecycle hook
	    op = opts.op = 'beforeGET';
	    return resolve(self[op](url, config, opts)).then(function (_config) {
	      // Allow re-assignment from lifecycle hook
	      config = isUndefined(_config) ? config : _config;
	      op = opts.op = 'GET';
	      self.dbg(op, url, config, opts);
	      return self.HTTP(config, opts);
	    }).then(function (response) {
	      // afterGET lifecycle hook
	      op = opts.op = 'afterGET';
	      return resolve(self[op](url, config, opts, response)).then(function (_response) {
	        // Allow re-assignment from lifecycle hook
	        return isUndefined(_response) ? response : _response;
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
	    opts.params || (opts.params = {});
	
	    var endpoint = opts.hasOwnProperty('endpoint') ? opts.endpoint : mapper.endpoint;
	    var parents = mapper.parents || (mapper.parent ? _defineProperty({}, mapper.parent, {
	      key: mapper.parentKey,
	      field: mapper.parentField
	    }) : {});
	
	    forOwn(parents, function (parent, parentName) {
	      var item = undefined;
	      var parentKey = parent.key;
	      var parentField = parent.field;
	      var parentDef = mapper.getResource(parentName);
	      var parentId = opts.params[parentKey];
	
	      if (parentId === false || !parentKey || !parentDef) {
	        if (parentId === false) {
	          delete opts.params[parentKey];
	        }
	        return false;
	      } else {
	        delete opts.params[parentKey];
	
	        if (isString(id) || isNumber(id)) {
	          item = mapper.get(id);
	        } else if (isObject(id)) {
	          item = id;
	        }
	
	        if (item) {
	          parentId = parentId || item[parentKey] || (item[parentField] ? item[parentField][parentDef.idAttribute] : null);
	        }
	
	        if (parentId) {
	          var _ret = function () {
	            delete opts.endpoint;
	            var _opts = {};
	            forOwn(opts, function (value, key) {
	              _opts[key] = value;
	            });
	            _(_opts, parentDef);
	            endpoint = makePath(self.getEndpoint(parentDef, parentId, _opts, parentId, endpoint));
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
	    var args = [opts.basePath === undefined ? mapper.basePath === undefined ? self.basePath : mapper.basePath : opts.basePath, self.getEndpoint(mapper, isString(id) || isNumber(id) || method === 'create' ? id : null, opts)];
	    if (method === 'find' || method === 'update' || method === 'destroy') {
	      args.push(id);
	    }
	    return makePath.apply(_jsData.utils, args);
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
	    config = copy(config);
	    config = deepMixIn(config, self.httpConfig);
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
	        return reject(data);
	      }
	    }
	
	    if (!self.http) {
	      throw new Error('You have not configured this adapter with an http library!');
	    }
	
	    return resolve(self.beforeHTTP(config, opts)).then(function (_config) {
	      config = _config || config;
	      if (hasFetch && (self.useFetch || opts.useFetch || !self.http)) {
	        return self.fetch(config, opts).then(logResponse, logResponse);
	      }
	      return self.http(config).then(logResponse, logResponse).catch(function (err) {
	        return self.responseError(err, config, opts);
	      });
	    }).then(function (response) {
	      return resolve(self.afterHTTP(config, opts, response)).then(function (_response) {
	        return _response || response;
	      });
	    });
	  },
	
	
	  /**
	   * Log the provided arguments at the specified leve.
	   *
	   * @name HttpAdapter#log
	   * @method
	   * @param {string} level Log level.
	   * @param {...*} [args] Arguments to log.
	   */
	  log: function log(level) {
	    for (var _len5 = arguments.length, args = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
	      args[_key5 - 1] = arguments[_key5];
	    }
	
	    if (level && !args.length) {
	      args.push(level);
	      level = 'debug';
	    }
	    if (level === 'debug' && !this.debug) {
	      return;
	    }
	    var prefix = level.toUpperCase() + ': (HttpAdapter)';
	    if (console[level]) {
	      var _console2;
	
	      (_console2 = console)[level].apply(_console2, [prefix].concat(args));
	    } else {
	      var _console3;
	
	      (_console3 = console).log.apply(_console3, [prefix].concat(args));
	    }
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
	    var op = undefined;
	    config || (config = {});
	    opts || (opts = {});
	    config.url = url || config.url;
	    config.data = data || config.data;
	    config.method = config.method || 'post';
	
	    // beforePOST lifecycle hook
	    op = opts.op = 'beforePOST';
	    return resolve(self[op](url, data, config, opts)).then(function (_config) {
	      // Allow re-assignment from lifecycle hook
	      config = isUndefined(_config) ? config : _config;
	      op = opts.op = 'POST';
	      self.dbg(op, url, data, config, opts);
	      return self.HTTP(config, opts);
	    }).then(function (response) {
	      // afterPOST lifecycle hook
	      op = opts.op = 'afterPOST';
	      return resolve(self[op](url, data, config, opts, response)).then(function (_response) {
	        // Allow re-assignment from lifecycle hook
	        return isUndefined(_response) ? response : _response;
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
	    var op = undefined;
	    config || (config = {});
	    opts || (opts = {});
	    config.url = url || config.url;
	    config.data = data || config.data;
	    config.method = config.method || 'put';
	
	    // beforePUT lifecycle hook
	    op = opts.op = 'beforePUT';
	    return resolve(self[op](url, data, config, opts)).then(function (_config) {
	      // Allow re-assignment from lifecycle hook
	      config = isUndefined(_config) ? config : _config;
	      op = opts.op = 'PUT';
	      self.dbg(op, url, data, config, opts);
	      return self.HTTP(config, opts);
	    }).then(function (response) {
	      // afterPUT lifecycle hook
	      op = opts.op = 'afterPUT';
	      return resolve(self[op](url, data, config, opts, response)).then(function (_response) {
	        // Allow re-assignment from lifecycle hook
	        return isUndefined(_response) ? response : _response;
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
	    if (isFunction(opts.queryTransform)) {
	      return opts.queryTransform(mapper, params, opts);
	    }
	    if (isFunction(mapper.queryTransform)) {
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
	    return reject(err);
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
	    if (isFunction(opts.serialize)) {
	      return opts.serialize(mapper, data, opts);
	    }
	    if (isFunction(mapper.serialize)) {
	      return mapper.serialize(mapper, data, opts);
	    }
	    return data;
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
	    var op = undefined;
	    opts = opts ? copy(opts) : {};
	    opts.params || (opts.params = {});
	    opts.params = self.queryTransform(mapper, opts.params, opts);
	    opts.suffix = isUndefined(opts.suffix) ? mapper.suffix : opts.suffix;
	
	    // beforeUpdate lifecycle hook
	    op = opts.op = 'beforeUpdate';
	    return resolve(self[op](mapper, id, props, opts)).then(function () {
	      op = opts.op = 'update';
	      self.dbg(op, mapper, id, props, opts);
	      return self.PUT(self.getPath('update', mapper, id, opts), self.serialize(mapper, props, opts), opts);
	    }).then(function (response) {
	      return self.deserialize(mapper, response, opts);
	    }).then(function (data) {
	      // afterUpdate lifecycle hook
	      op = opts.op = 'afterUpdate';
	      return resolve(self[op](mapper, id, props, opts, data)).then(function (_data) {
	        // Allow re-assignment from lifecycle hook
	        return isUndefined(_data) ? data : _data;
	      });
	    });
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
	    var op = undefined;
	    query || (query = {});
	    opts = opts ? copy(opts) : {};
	    opts.params || (opts.params = {});
	    deepMixIn(opts.params, query);
	    opts.params = self.queryTransform(mapper, opts.params, opts);
	    opts.suffix = isUndefined(opts.suffix) ? mapper.suffix : opts.suffix;
	
	    // beforeUpdateAll lifecycle hook
	    op = opts.op = 'beforeUpdateAll';
	    return resolve(self[op](mapper, props, query, opts)).then(function () {
	      op = opts.op = 'updateAll';
	      self.dbg(op, mapper, props, query, opts);
	      return self.PUT(self.getPath('updateAll', mapper, null, opts), self.serialize(mapper, props, opts), opts);
	    }).then(function (response) {
	      return self.deserialize(mapper, response, opts);
	    }).then(function (data) {
	      // afterUpdateAll lifecycle hook
	      op = opts.op = 'afterUpdateAll';
	      return resolve(self[op](mapper, props, query, opts, data)).then(function (_data) {
	        // Allow re-assignment from lifecycle hook
	        return isUndefined(_data) ? data : _data;
	      });
	    });
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
	    var op = undefined;
	    opts = opts ? copy(opts) : {};
	    opts.params || (opts.params = {});
	    opts.params = self.queryTransform(mapper, opts.params, opts);
	    opts.suffix = isUndefined(opts.suffix) ? mapper.suffix : opts.suffix;
	
	    // beforeUpdateMany lifecycle hook
	    op = opts.op = 'beforeUpdateMany';
	    return resolve(self[op](mapper, records, opts)).then(function () {
	      op = opts.op = 'updateMany';
	      self.dbg(op, mapper, records, opts);
	      return self.PUT(self.getPath('updateMany', mapper, null, opts), self.serialize(mapper, records, opts), opts);
	    }).then(function (response) {
	      return self.deserialize(mapper, response, opts);
	    }).then(function (data) {
	      // afterUpdateMany lifecycle hook
	      op = opts.op = 'afterUpdateMany';
	      return resolve(self[op](mapper, records, opts, data)).then(function (_data) {
	        // Allow re-assignment from lifecycle hook
	        return isUndefined(_data) ? data : _data;
	      });
	    });
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
	  if (!name || !isString(name)) {
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
	      return reject(err);
	    };
	    mapper[name] = function (id, _opts) {
	      var self = this;
	      if (isObject(id)) {
	        _opts = id;
	      }
	      _opts = _opts || {};
	      var adapter = self.getAdapter(opts.adapter || self.defaultAdapter || 'http');
	      var config = {};
	      fillIn(config, opts);
	      if (!_opts.hasOwnProperty('endpoint') && config.endpoint) {
	        _opts.endpoint = config.endpoint;
	      }
	      if (typeof _opts.getEndpoint === 'function') {
	        config.url = _opts.getEndpoint(self, _opts);
	      } else {
	        var _args = [_opts.basePath || self.basePath || adapter.basePath, adapter.getEndpoint(self, isSorN(id) ? id : null, _opts)];
	        if (isSorN(id)) {
	          _args.push(id);
	        }
	        _args.push(opts.pathname || name);
	        config.url = makePath.apply(null, _args);
	      }
	      config.method = config.method || 'GET';
	      config.mapper = self.name;
	      deepMixIn(config)(_opts);
	      return resolve(config).then(_opts.request || opts.request).then(function (config) {
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
	    forOwn(mapper, function (value, key) {
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
	HttpAdapter.extend = extend;
	
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
	  full: '<%= pkg.version %>',
	  major: parseInt('<%= major %>', 10),
	  minor: parseInt('<%= minor %>', 10),
	  patch: parseInt('<%= patch %>', 10),
	  alpha:  true ? '<%= alpha %>' : false,
	  beta:  true ? '<%= beta %>' : false
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
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=js-data-http-node.js.map