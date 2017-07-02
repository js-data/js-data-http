/*!
* js-data-http
* @version 3.0.0 - Homepage <https://github.com/js-data/js-data-http>
* @copyright (c) 2014-2016 js-data-http project authors
* @license MIT <https://github.com/js-data/js-data-http/blob/master/LICENSE>
*
* @overview HTTP (XHR) adapter for js-data in the browser.
*/
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('js-data')) :
	typeof define === 'function' && define.amd ? define('js-data-http', ['exports', 'js-data'], factory) :
	(factory((global.JSDataHttp = global.JSDataHttp || {}),global.JSData));
}(this, (function (exports,jsData) { 'use strict';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var axios = createCommonjsModule(function (module, exports) {
/* axios v0.16.2 | (c) 2017 by Matt Zabriskie */
(function webpackUniversalModuleDefinition(root, factory) {
	module.exports = factory();
})(commonjsGlobal, function() {
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

	module.exports = __webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils$$1 = __webpack_require__(2);
	var bind = __webpack_require__(3);
	var Axios = __webpack_require__(5);
	var defaults = __webpack_require__(6);
	
	/**
	 * Create an instance of Axios
	 *
	 * @param {Object} defaultConfig The default config for the instance
	 * @return {Axios} A new instance of Axios
	 */
	function createInstance(defaultConfig) {
	  var context = new Axios(defaultConfig);
	  var instance = bind(Axios.prototype.request, context);
	
	  // Copy axios.prototype to instance
	  utils$$1.extend(instance, Axios.prototype, context);
	
	  // Copy context to instance
	  utils$$1.extend(instance, context);
	
	  return instance;
	}
	
	// Create the default instance to be exported
	var axios = createInstance(defaults);
	
	// Expose Axios class to allow class inheritance
	axios.Axios = Axios;
	
	// Factory for creating new instances
	axios.create = function create(instanceConfig) {
	  return createInstance(utils$$1.merge(defaults, instanceConfig));
	};
	
	// Expose Cancel & CancelToken
	axios.Cancel = __webpack_require__(23);
	axios.CancelToken = __webpack_require__(24);
	axios.isCancel = __webpack_require__(20);
	
	// Expose all/spread
	axios.all = function all(promises) {
	  return Promise.all(promises);
	};
	axios.spread = __webpack_require__(25);
	
	module.exports = axios;
	
	// Allow use of default import syntax in TypeScript
	module.exports.default = axios;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var bind = __webpack_require__(3);
	var isBuffer = __webpack_require__(4);
	
	/*global toString:true*/
	
	// utils is a library of generic helper functions non-specific to axios
	
	var toString = Object.prototype.toString;
	
	/**
	 * Determine if a value is an Array
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Array, otherwise false
	 */
	function isArray(val) {
	  return toString.call(val) === '[object Array]';
	}
	
	/**
	 * Determine if a value is an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
	 */
	function isArrayBuffer(val) {
	  return toString.call(val) === '[object ArrayBuffer]';
	}
	
	/**
	 * Determine if a value is a FormData
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an FormData, otherwise false
	 */
	function isFormData(val) {
	  return (typeof FormData !== 'undefined') && (val instanceof FormData);
	}
	
	/**
	 * Determine if a value is a view on an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
	 */
	function isArrayBufferView(val) {
	  var result;
	  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
	    result = ArrayBuffer.isView(val);
	  } else {
	    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
	  }
	  return result;
	}
	
	/**
	 * Determine if a value is a String
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a String, otherwise false
	 */
	function isString(val) {
	  return typeof val === 'string';
	}
	
	/**
	 * Determine if a value is a Number
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Number, otherwise false
	 */
	function isNumber(val) {
	  return typeof val === 'number';
	}
	
	/**
	 * Determine if a value is undefined
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if the value is undefined, otherwise false
	 */
	function isUndefined(val) {
	  return typeof val === 'undefined';
	}
	
	/**
	 * Determine if a value is an Object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Object, otherwise false
	 */
	function isObject(val) {
	  return val !== null && typeof val === 'object';
	}
	
	/**
	 * Determine if a value is a Date
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Date, otherwise false
	 */
	function isDate(val) {
	  return toString.call(val) === '[object Date]';
	}
	
	/**
	 * Determine if a value is a File
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a File, otherwise false
	 */
	function isFile(val) {
	  return toString.call(val) === '[object File]';
	}
	
	/**
	 * Determine if a value is a Blob
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Blob, otherwise false
	 */
	function isBlob(val) {
	  return toString.call(val) === '[object Blob]';
	}
	
	/**
	 * Determine if a value is a Function
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Function, otherwise false
	 */
	function isFunction(val) {
	  return toString.call(val) === '[object Function]';
	}
	
	/**
	 * Determine if a value is a Stream
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Stream, otherwise false
	 */
	function isStream(val) {
	  return isObject(val) && isFunction(val.pipe);
	}
	
	/**
	 * Determine if a value is a URLSearchParams object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
	 */
	function isURLSearchParams(val) {
	  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
	}
	
	/**
	 * Trim excess whitespace off the beginning and end of a string
	 *
	 * @param {String} str The String to trim
	 * @returns {String} The String freed of excess whitespace
	 */
	function trim(str) {
	  return str.replace(/^\s*/, '').replace(/\s*$/, '');
	}
	
	/**
	 * Determine if we're running in a standard browser environment
	 *
	 * This allows axios to run in a web worker, and react-native.
	 * Both environments support XMLHttpRequest, but not fully standard globals.
	 *
	 * web workers:
	 *  typeof window -> undefined
	 *  typeof document -> undefined
	 *
	 * react-native:
	 *  navigator.product -> 'ReactNative'
	 */
	function isStandardBrowserEnv() {
	  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
	    return false;
	  }
	  return (
	    typeof window !== 'undefined' &&
	    typeof document !== 'undefined'
	  );
	}
	
	/**
	 * Iterate over an Array or an Object invoking a function for each item.
	 *
	 * If `obj` is an Array callback will be called passing
	 * the value, index, and complete array for each item.
	 *
	 * If 'obj' is an Object callback will be called passing
	 * the value, key, and complete object for each property.
	 *
	 * @param {Object|Array} obj The object to iterate
	 * @param {Function} fn The callback to invoke for each item
	 */
	function forEach(obj, fn) {
	  // Don't bother if no value provided
	  if (obj === null || typeof obj === 'undefined') {
	    return;
	  }
	
	  // Force an array if not already something iterable
	  if (typeof obj !== 'object' && !isArray(obj)) {
	    /*eslint no-param-reassign:0*/
	    obj = [obj];
	  }
	
	  if (isArray(obj)) {
	    // Iterate over array values
	    for (var i = 0, l = obj.length; i < l; i++) {
	      fn.call(null, obj[i], i, obj);
	    }
	  } else {
	    // Iterate over object keys
	    for (var key in obj) {
	      if (Object.prototype.hasOwnProperty.call(obj, key)) {
	        fn.call(null, obj[key], key, obj);
	      }
	    }
	  }
	}
	
	/**
	 * Accepts varargs expecting each argument to be an object, then
	 * immutably merges the properties of each object and returns result.
	 *
	 * When multiple objects contain the same key the later object in
	 * the arguments list will take precedence.
	 *
	 * Example:
	 *
	 * ```js
	 * var result = merge({foo: 123}, {foo: 456});
	 * console.log(result.foo); // outputs 456
	 * ```
	 *
	 * @param {Object} obj1 Object to merge
	 * @returns {Object} Result of all merge properties
	 */
	function merge(/* obj1, obj2, obj3, ... */) {
	  var result = {};
	  function assignValue(val, key) {
	    if (typeof result[key] === 'object' && typeof val === 'object') {
	      result[key] = merge(result[key], val);
	    } else {
	      result[key] = val;
	    }
	  }
	
	  for (var i = 0, l = arguments.length; i < l; i++) {
	    forEach(arguments[i], assignValue);
	  }
	  return result;
	}
	
	/**
	 * Extends object a by mutably adding to it the properties of object b.
	 *
	 * @param {Object} a The object to be extended
	 * @param {Object} b The object to copy properties from
	 * @param {Object} thisArg The object to bind function to
	 * @return {Object} The resulting value of object a
	 */
	function extend(a, b, thisArg) {
	  forEach(b, function assignValue(val, key) {
	    if (thisArg && typeof val === 'function') {
	      a[key] = bind(val, thisArg);
	    } else {
	      a[key] = val;
	    }
	  });
	  return a;
	}
	
	module.exports = {
	  isArray: isArray,
	  isArrayBuffer: isArrayBuffer,
	  isBuffer: isBuffer,
	  isFormData: isFormData,
	  isArrayBufferView: isArrayBufferView,
	  isString: isString,
	  isNumber: isNumber,
	  isObject: isObject,
	  isUndefined: isUndefined,
	  isDate: isDate,
	  isFile: isFile,
	  isBlob: isBlob,
	  isFunction: isFunction,
	  isStream: isStream,
	  isURLSearchParams: isURLSearchParams,
	  isStandardBrowserEnv: isStandardBrowserEnv,
	  forEach: forEach,
	  merge: merge,
	  extend: extend,
	  trim: trim
	};


/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function bind(fn, thisArg) {
	  return function wrap() {
	    var args = new Array(arguments.length);
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }
	    return fn.apply(thisArg, args);
	  };
	};


/***/ },
/* 4 */
/***/ function(module, exports) {

	/*!
	 * Determine if an object is a Buffer
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	
	// The _isBuffer check is for Safari 5-7 support, because it's missing
	// Object.prototype.constructor. Remove this eventually
	module.exports = function (obj) {
	  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
	};
	
	function isBuffer (obj) {
	  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
	}
	
	// For Node v0.10 support. Remove this eventually.
	function isSlowBuffer (obj) {
	  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defaults = __webpack_require__(6);
	var utils$$1 = __webpack_require__(2);
	var InterceptorManager = __webpack_require__(17);
	var dispatchRequest = __webpack_require__(18);
	var isAbsoluteURL = __webpack_require__(21);
	var combineURLs = __webpack_require__(22);
	
	/**
	 * Create a new instance of Axios
	 *
	 * @param {Object} instanceConfig The default config for the instance
	 */
	function Axios(instanceConfig) {
	  this.defaults = instanceConfig;
	  this.interceptors = {
	    request: new InterceptorManager(),
	    response: new InterceptorManager()
	  };
	}
	
	/**
	 * Dispatch a request
	 *
	 * @param {Object} config The config specific for this request (merged with this.defaults)
	 */
	Axios.prototype.request = function request(config) {
	  /*eslint no-param-reassign:0*/
	  // Allow for axios('example/url'[, config]) a la fetch API
	  if (typeof config === 'string') {
	    config = utils$$1.merge({
	      url: arguments[0]
	    }, arguments[1]);
	  }
	
	  config = utils$$1.merge(defaults, this.defaults, { method: 'get' }, config);
	  config.method = config.method.toLowerCase();
	
	  // Support baseURL config
	  if (config.baseURL && !isAbsoluteURL(config.url)) {
	    config.url = combineURLs(config.baseURL, config.url);
	  }
	
	  // Hook up interceptors middleware
	  var chain = [dispatchRequest, undefined];
	  var promise = Promise.resolve(config);
	
	  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
	    chain.unshift(interceptor.fulfilled, interceptor.rejected);
	  });
	
	  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
	    chain.push(interceptor.fulfilled, interceptor.rejected);
	  });
	
	  while (chain.length) {
	    promise = promise.then(chain.shift(), chain.shift());
	  }
	
	  return promise;
	};
	
	// Provide aliases for supported request methods
	utils$$1.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, config) {
	    return this.request(utils$$1.merge(config || {}, {
	      method: method,
	      url: url
	    }));
	  };
	});
	
	utils$$1.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, data, config) {
	    return this.request(utils$$1.merge(config || {}, {
	      method: method,
	      url: url,
	      data: data
	    }));
	  };
	});
	
	module.exports = Axios;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils$$1 = __webpack_require__(2);
	var normalizeHeaderName = __webpack_require__(7);
	
	var DEFAULT_CONTENT_TYPE = {
	  'Content-Type': 'application/x-www-form-urlencoded'
	};
	
	function setContentTypeIfUnset(headers, value) {
	  if (!utils$$1.isUndefined(headers) && utils$$1.isUndefined(headers['Content-Type'])) {
	    headers['Content-Type'] = value;
	  }
	}
	
	function getDefaultAdapter() {
	  var adapter;
	  if (typeof XMLHttpRequest !== 'undefined') {
	    // For browsers use XHR adapter
	    adapter = __webpack_require__(8);
	  } else if (typeof process !== 'undefined') {
	    // For node use HTTP adapter
	    adapter = __webpack_require__(8);
	  }
	  return adapter;
	}
	
	var defaults = {
	  adapter: getDefaultAdapter(),
	
	  transformRequest: [function transformRequest(data, headers) {
	    normalizeHeaderName(headers, 'Content-Type');
	    if (utils$$1.isFormData(data) ||
	      utils$$1.isArrayBuffer(data) ||
	      utils$$1.isBuffer(data) ||
	      utils$$1.isStream(data) ||
	      utils$$1.isFile(data) ||
	      utils$$1.isBlob(data)
	    ) {
	      return data;
	    }
	    if (utils$$1.isArrayBufferView(data)) {
	      return data.buffer;
	    }
	    if (utils$$1.isURLSearchParams(data)) {
	      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
	      return data.toString();
	    }
	    if (utils$$1.isObject(data)) {
	      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
	      return JSON.stringify(data);
	    }
	    return data;
	  }],
	
	  transformResponse: [function transformResponse(data) {
	    /*eslint no-param-reassign:0*/
	    if (typeof data === 'string') {
	      try {
	        data = JSON.parse(data);
	      } catch (e) { /* Ignore */ }
	    }
	    return data;
	  }],
	
	  timeout: 0,
	
	  xsrfCookieName: 'XSRF-TOKEN',
	  xsrfHeaderName: 'X-XSRF-TOKEN',
	
	  maxContentLength: -1,
	
	  validateStatus: function validateStatus(status) {
	    return status >= 200 && status < 300;
	  }
	};
	
	defaults.headers = {
	  common: {
	    'Accept': 'application/json, text/plain, */*'
	  }
	};
	
	utils$$1.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
	  defaults.headers[method] = {};
	});
	
	utils$$1.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  defaults.headers[method] = utils$$1.merge(DEFAULT_CONTENT_TYPE);
	});
	
	module.exports = defaults;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils$$1 = __webpack_require__(2);
	
	module.exports = function normalizeHeaderName(headers, normalizedName) {
	  utils$$1.forEach(headers, function processHeader(value, name) {
	    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
	      headers[normalizedName] = value;
	      delete headers[name];
	    }
	  });
	};


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils$$1 = __webpack_require__(2);
	var settle = __webpack_require__(9);
	var buildURL = __webpack_require__(12);
	var parseHeaders = __webpack_require__(13);
	var isURLSameOrigin = __webpack_require__(14);
	var createError = __webpack_require__(10);
	var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(15);
	
	module.exports = function xhrAdapter(config) {
	  return new Promise(function dispatchXhrRequest(resolve, reject) {
	    var requestData = config.data;
	    var requestHeaders = config.headers;
	
	    if (utils$$1.isFormData(requestData)) {
	      delete requestHeaders['Content-Type']; // Let the browser set it
	    }
	
	    var request = new XMLHttpRequest();
	    var loadEvent = 'onreadystatechange';
	    var xDomain = false;
	
	    // For IE 8/9 CORS support
	    // Only supports POST and GET calls and doesn't returns the response headers.
	    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
	    if (("production") !== 'test' &&
	        typeof window !== 'undefined' &&
	        window.XDomainRequest && !('withCredentials' in request) &&
	        !isURLSameOrigin(config.url)) {
	      request = new window.XDomainRequest();
	      loadEvent = 'onload';
	      xDomain = true;
	      request.onprogress = function handleProgress() {};
	      request.ontimeout = function handleTimeout() {};
	    }
	
	    // HTTP basic authentication
	    if (config.auth) {
	      var username = config.auth.username || '';
	      var password = config.auth.password || '';
	      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
	    }
	
	    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);
	
	    // Set the request timeout in MS
	    request.timeout = config.timeout;
	
	    // Listen for ready state
	    request[loadEvent] = function handleLoad() {
	      if (!request || (request.readyState !== 4 && !xDomain)) {
	        return;
	      }
	
	      // The request errored out and we didn't get a response, this will be
	      // handled by onerror instead
	      // With one exception: request that using file: protocol, most browsers
	      // will return status as 0 even though it's a successful request
	      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
	        return;
	      }
	
	      // Prepare the response
	      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
	      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
	      var response = {
	        data: responseData,
	        // IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
	        status: request.status === 1223 ? 204 : request.status,
	        statusText: request.status === 1223 ? 'No Content' : request.statusText,
	        headers: responseHeaders,
	        config: config,
	        request: request
	      };
	
	      settle(resolve, reject, response);
	
	      // Clean up request
	      request = null;
	    };
	
	    // Handle low level network errors
	    request.onerror = function handleError() {
	      // Real errors are hidden from us by the browser
	      // onerror should only fire if it's a network error
	      reject(createError('Network Error', config, null, request));
	
	      // Clean up request
	      request = null;
	    };
	
	    // Handle timeout
	    request.ontimeout = function handleTimeout() {
	      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
	        request));
	
	      // Clean up request
	      request = null;
	    };
	
	    // Add xsrf header
	    // This is only done if running in a standard browser environment.
	    // Specifically not if we're in a web worker, or react-native.
	    if (utils$$1.isStandardBrowserEnv()) {
	      var cookies = __webpack_require__(16);
	
	      // Add xsrf header
	      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
	          cookies.read(config.xsrfCookieName) :
	          undefined;
	
	      if (xsrfValue) {
	        requestHeaders[config.xsrfHeaderName] = xsrfValue;
	      }
	    }
	
	    // Add headers to the request
	    if ('setRequestHeader' in request) {
	      utils$$1.forEach(requestHeaders, function setRequestHeader(val, key) {
	        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
	          // Remove Content-Type if data is undefined
	          delete requestHeaders[key];
	        } else {
	          // Otherwise add header to the request
	          request.setRequestHeader(key, val);
	        }
	      });
	    }
	
	    // Add withCredentials to request if needed
	    if (config.withCredentials) {
	      request.withCredentials = true;
	    }
	
	    // Add responseType to request if needed
	    if (config.responseType) {
	      try {
	        request.responseType = config.responseType;
	      } catch (e) {
	        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
	        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
	        if (config.responseType !== 'json') {
	          throw e;
	        }
	      }
	    }
	
	    // Handle progress if needed
	    if (typeof config.onDownloadProgress === 'function') {
	      request.addEventListener('progress', config.onDownloadProgress);
	    }
	
	    // Not all browsers support upload events
	    if (typeof config.onUploadProgress === 'function' && request.upload) {
	      request.upload.addEventListener('progress', config.onUploadProgress);
	    }
	
	    if (config.cancelToken) {
	      // Handle cancellation
	      config.cancelToken.promise.then(function onCanceled(cancel) {
	        if (!request) {
	          return;
	        }
	
	        request.abort();
	        reject(cancel);
	        // Clean up request
	        request = null;
	      });
	    }
	
	    if (requestData === undefined) {
	      requestData = null;
	    }
	
	    // Send the request
	    request.send(requestData);
	  });
	};


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var createError = __webpack_require__(10);
	
	/**
	 * Resolve or reject a Promise based on response status.
	 *
	 * @param {Function} resolve A function that resolves the promise.
	 * @param {Function} reject A function that rejects the promise.
	 * @param {object} response The response.
	 */
	module.exports = function settle(resolve, reject, response) {
	  var validateStatus = response.config.validateStatus;
	  // Note: status is not exposed by XDomainRequest
	  if (!response.status || !validateStatus || validateStatus(response.status)) {
	    resolve(response);
	  } else {
	    reject(createError(
	      'Request failed with status code ' + response.status,
	      response.config,
	      null,
	      response.request,
	      response
	    ));
	  }
	};


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var enhanceError = __webpack_require__(11);
	
	/**
	 * Create an Error with the specified message, config, error code, request and response.
	 *
	 * @param {string} message The error message.
	 * @param {Object} config The config.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 * @param {Object} [request] The request.
	 * @param {Object} [response] The response.
	 * @returns {Error} The created error.
	 */
	module.exports = function createError(message, config, code, request, response) {
	  var error = new Error(message);
	  return enhanceError(error, config, code, request, response);
	};


/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Update an Error with the specified config, error code, and response.
	 *
	 * @param {Error} error The error to update.
	 * @param {Object} config The config.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 * @param {Object} [request] The request.
	 * @param {Object} [response] The response.
	 * @returns {Error} The error.
	 */
	module.exports = function enhanceError(error, config, code, request, response) {
	  error.config = config;
	  if (code) {
	    error.code = code;
	  }
	  error.request = request;
	  error.response = response;
	  return error;
	};


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils$$1 = __webpack_require__(2);
	
	function encode(val) {
	  return encodeURIComponent(val).
	    replace(/%40/gi, '@').
	    replace(/%3A/gi, ':').
	    replace(/%24/g, '$').
	    replace(/%2C/gi, ',').
	    replace(/%20/g, '+').
	    replace(/%5B/gi, '[').
	    replace(/%5D/gi, ']');
	}
	
	/**
	 * Build a URL by appending params to the end
	 *
	 * @param {string} url The base of the url (e.g., http://www.google.com)
	 * @param {object} [params] The params to be appended
	 * @returns {string} The formatted url
	 */
	module.exports = function buildURL(url, params, paramsSerializer) {
	  /*eslint no-param-reassign:0*/
	  if (!params) {
	    return url;
	  }
	
	  var serializedParams;
	  if (paramsSerializer) {
	    serializedParams = paramsSerializer(params);
	  } else if (utils$$1.isURLSearchParams(params)) {
	    serializedParams = params.toString();
	  } else {
	    var parts = [];
	
	    utils$$1.forEach(params, function serialize(val, key) {
	      if (val === null || typeof val === 'undefined') {
	        return;
	      }
	
	      if (utils$$1.isArray(val)) {
	        key = key + '[]';
	      }
	
	      if (!utils$$1.isArray(val)) {
	        val = [val];
	      }
	
	      utils$$1.forEach(val, function parseValue(v) {
	        if (utils$$1.isDate(v)) {
	          v = v.toISOString();
	        } else if (utils$$1.isObject(v)) {
	          v = JSON.stringify(v);
	        }
	        parts.push(encode(key) + '=' + encode(v));
	      });
	    });
	
	    serializedParams = parts.join('&');
	  }
	
	  if (serializedParams) {
	    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
	  }
	
	  return url;
	};


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils$$1 = __webpack_require__(2);
	
	/**
	 * Parse headers into an object
	 *
	 * ```
	 * Date: Wed, 27 Aug 2014 08:58:49 GMT
	 * Content-Type: application/json
	 * Connection: keep-alive
	 * Transfer-Encoding: chunked
	 * ```
	 *
	 * @param {String} headers Headers needing to be parsed
	 * @returns {Object} Headers parsed into an object
	 */
	module.exports = function parseHeaders(headers) {
	  var parsed = {};
	  var key;
	  var val;
	  var i;
	
	  if (!headers) { return parsed; }
	
	  utils$$1.forEach(headers.split('\n'), function parser(line) {
	    i = line.indexOf(':');
	    key = utils$$1.trim(line.substr(0, i)).toLowerCase();
	    val = utils$$1.trim(line.substr(i + 1));
	
	    if (key) {
	      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
	    }
	  });
	
	  return parsed;
	};


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils$$1 = __webpack_require__(2);
	
	module.exports = (
	  utils$$1.isStandardBrowserEnv() ?
	
	  // Standard browser envs have full support of the APIs needed to test
	  // whether the request URL is of the same origin as current location.
	  (function standardBrowserEnv() {
	    var msie = /(msie|trident)/i.test(navigator.userAgent);
	    var urlParsingNode = document.createElement('a');
	    var originURL;
	
	    /**
	    * Parse a URL to discover it's components
	    *
	    * @param {String} url The URL to be parsed
	    * @returns {Object}
	    */
	    function resolveURL(url) {
	      var href = url;
	
	      if (msie) {
	        // IE needs attribute set twice to normalize properties
	        urlParsingNode.setAttribute('href', href);
	        href = urlParsingNode.href;
	      }
	
	      urlParsingNode.setAttribute('href', href);
	
	      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
	      return {
	        href: urlParsingNode.href,
	        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
	        host: urlParsingNode.host,
	        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
	        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
	        hostname: urlParsingNode.hostname,
	        port: urlParsingNode.port,
	        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
	                  urlParsingNode.pathname :
	                  '/' + urlParsingNode.pathname
	      };
	    }
	
	    originURL = resolveURL(window.location.href);
	
	    /**
	    * Determine if a URL shares the same origin as the current location
	    *
	    * @param {String} requestURL The URL to test
	    * @returns {boolean} True if URL shares the same origin, otherwise false
	    */
	    return function isURLSameOrigin(requestURL) {
	      var parsed = (utils$$1.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
	      return (parsed.protocol === originURL.protocol &&
	            parsed.host === originURL.host);
	    };
	  })() :
	
	  // Non standard browser envs (web workers, react-native) lack needed support.
	  (function nonStandardBrowserEnv() {
	    return function isURLSameOrigin() {
	      return true;
	    };
	  })()
	);


/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';
	
	// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js
	
	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
	
	function E() {
	  this.message = 'String contains an invalid character';
	}
	E.prototype = new Error;
	E.prototype.code = 5;
	E.prototype.name = 'InvalidCharacterError';
	
	function btoa(input) {
	  var str = String(input);
	  var output = '';
	  for (
	    // initialize result and counter
	    var block, charCode, idx = 0, map = chars;
	    // if the next str index does not exist:
	    //   change the mapping table to "="
	    //   check if d has no fractional digits
	    str.charAt(idx | 0) || (map = '=', idx % 1);
	    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
	    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
	  ) {
	    charCode = str.charCodeAt(idx += 3 / 4);
	    if (charCode > 0xFF) {
	      throw new E();
	    }
	    block = block << 8 | charCode;
	  }
	  return output;
	}
	
	module.exports = btoa;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils$$1 = __webpack_require__(2);
	
	module.exports = (
	  utils$$1.isStandardBrowserEnv() ?
	
	  // Standard browser envs support document.cookie
	  (function standardBrowserEnv() {
	    return {
	      write: function write(name, value, expires, path, domain, secure) {
	        var cookie = [];
	        cookie.push(name + '=' + encodeURIComponent(value));
	
	        if (utils$$1.isNumber(expires)) {
	          cookie.push('expires=' + new Date(expires).toGMTString());
	        }
	
	        if (utils$$1.isString(path)) {
	          cookie.push('path=' + path);
	        }
	
	        if (utils$$1.isString(domain)) {
	          cookie.push('domain=' + domain);
	        }
	
	        if (secure === true) {
	          cookie.push('secure');
	        }
	
	        document.cookie = cookie.join('; ');
	      },
	
	      read: function read(name) {
	        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
	        return (match ? decodeURIComponent(match[3]) : null);
	      },
	
	      remove: function remove(name) {
	        this.write(name, '', Date.now() - 86400000);
	      }
	    };
	  })() :
	
	  // Non standard browser env (web workers, react-native) lack needed support.
	  (function nonStandardBrowserEnv() {
	    return {
	      write: function write() {},
	      read: function read() { return null; },
	      remove: function remove() {}
	    };
	  })()
	);


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils$$1 = __webpack_require__(2);
	
	function InterceptorManager() {
	  this.handlers = [];
	}
	
	/**
	 * Add a new interceptor to the stack
	 *
	 * @param {Function} fulfilled The function to handle `then` for a `Promise`
	 * @param {Function} rejected The function to handle `reject` for a `Promise`
	 *
	 * @return {Number} An ID used to remove interceptor later
	 */
	InterceptorManager.prototype.use = function use(fulfilled, rejected) {
	  this.handlers.push({
	    fulfilled: fulfilled,
	    rejected: rejected
	  });
	  return this.handlers.length - 1;
	};
	
	/**
	 * Remove an interceptor from the stack
	 *
	 * @param {Number} id The ID that was returned by `use`
	 */
	InterceptorManager.prototype.eject = function eject(id) {
	  if (this.handlers[id]) {
	    this.handlers[id] = null;
	  }
	};
	
	/**
	 * Iterate over all the registered interceptors
	 *
	 * This method is particularly useful for skipping over any
	 * interceptors that may have become `null` calling `eject`.
	 *
	 * @param {Function} fn The function to call for each interceptor
	 */
	InterceptorManager.prototype.forEach = function forEach(fn) {
	  utils$$1.forEach(this.handlers, function forEachHandler(h) {
	    if (h !== null) {
	      fn(h);
	    }
	  });
	};
	
	module.exports = InterceptorManager;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils$$1 = __webpack_require__(2);
	var transformData = __webpack_require__(19);
	var isCancel = __webpack_require__(20);
	var defaults = __webpack_require__(6);
	
	/**
	 * Throws a `Cancel` if cancellation has been requested.
	 */
	function throwIfCancellationRequested(config) {
	  if (config.cancelToken) {
	    config.cancelToken.throwIfRequested();
	  }
	}
	
	/**
	 * Dispatch a request to the server using the configured adapter.
	 *
	 * @param {object} config The config that is to be used for the request
	 * @returns {Promise} The Promise to be fulfilled
	 */
	module.exports = function dispatchRequest(config) {
	  throwIfCancellationRequested(config);
	
	  // Ensure headers exist
	  config.headers = config.headers || {};
	
	  // Transform request data
	  config.data = transformData(
	    config.data,
	    config.headers,
	    config.transformRequest
	  );
	
	  // Flatten headers
	  config.headers = utils$$1.merge(
	    config.headers.common || {},
	    config.headers[config.method] || {},
	    config.headers || {}
	  );
	
	  utils$$1.forEach(
	    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
	    function cleanHeaderConfig(method) {
	      delete config.headers[method];
	    }
	  );
	
	  var adapter = config.adapter || defaults.adapter;
	
	  return adapter(config).then(function onAdapterResolution(response) {
	    throwIfCancellationRequested(config);
	
	    // Transform response data
	    response.data = transformData(
	      response.data,
	      response.headers,
	      config.transformResponse
	    );
	
	    return response;
	  }, function onAdapterRejection(reason) {
	    if (!isCancel(reason)) {
	      throwIfCancellationRequested(config);
	
	      // Transform response data
	      if (reason && reason.response) {
	        reason.response.data = transformData(
	          reason.response.data,
	          reason.response.headers,
	          config.transformResponse
	        );
	      }
	    }
	
	    return Promise.reject(reason);
	  });
	};


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils$$1 = __webpack_require__(2);
	
	/**
	 * Transform the data for a request or a response
	 *
	 * @param {Object|String} data The data to be transformed
	 * @param {Array} headers The headers for the request or response
	 * @param {Array|Function} fns A single function or Array of functions
	 * @returns {*} The resulting transformed data
	 */
	module.exports = function transformData(data, headers, fns) {
	  /*eslint no-param-reassign:0*/
	  utils$$1.forEach(fns, function transform(fn) {
	    data = fn(data, headers);
	  });
	
	  return data;
	};


/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function isCancel(value) {
	  return !!(value && value.__CANCEL__);
	};


/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Determines whether the specified URL is absolute
	 *
	 * @param {string} url The URL to test
	 * @returns {boolean} True if the specified URL is absolute, otherwise false
	 */
	module.exports = function isAbsoluteURL(url) {
	  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
	  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
	  // by any combination of letters, digits, plus, period, or hyphen.
	  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
	};


/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Creates a new URL by combining the specified URLs
	 *
	 * @param {string} baseURL The base URL
	 * @param {string} relativeURL The relative URL
	 * @returns {string} The combined URL
	 */
	module.exports = function combineURLs(baseURL, relativeURL) {
	  return relativeURL
	    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
	    : baseURL;
	};


/***/ },
/* 23 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * A `Cancel` is an object that is thrown when an operation is canceled.
	 *
	 * @class
	 * @param {string=} message The message.
	 */
	function Cancel(message) {
	  this.message = message;
	}
	
	Cancel.prototype.toString = function toString() {
	  return 'Cancel' + (this.message ? ': ' + this.message : '');
	};
	
	Cancel.prototype.__CANCEL__ = true;
	
	module.exports = Cancel;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Cancel = __webpack_require__(23);
	
	/**
	 * A `CancelToken` is an object that can be used to request cancellation of an operation.
	 *
	 * @class
	 * @param {Function} executor The executor function.
	 */
	function CancelToken(executor) {
	  if (typeof executor !== 'function') {
	    throw new TypeError('executor must be a function.');
	  }
	
	  var resolvePromise;
	  this.promise = new Promise(function promiseExecutor(resolve) {
	    resolvePromise = resolve;
	  });
	
	  var token = this;
	  executor(function cancel(message) {
	    if (token.reason) {
	      // Cancellation has already been requested
	      return;
	    }
	
	    token.reason = new Cancel(message);
	    resolvePromise(token.reason);
	  });
	}
	
	/**
	 * Throws a `Cancel` if cancellation has been requested.
	 */
	CancelToken.prototype.throwIfRequested = function throwIfRequested() {
	  if (this.reason) {
	    throw this.reason;
	  }
	};
	
	/**
	 * Returns an object that contains a new `CancelToken` and a function that, when called,
	 * cancels the `CancelToken`.
	 */
	CancelToken.source = function source() {
	  var cancel;
	  var token = new CancelToken(function executor(c) {
	    cancel = c;
	  });
	  return {
	    token: token,
	    cancel: cancel
	  };
	};
	
	module.exports = CancelToken;


/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Syntactic sugar for invoking a function and expanding an array for arguments.
	 *
	 * Common use case would be to use `Function.prototype.apply`.
	 *
	 *  ```js
	 *  function f(x, y, z) {}
	 *  var args = [1, 2, 3];
	 *  f.apply(null, args);
	 *  ```
	 *
	 * With `spread` this example can be re-written.
	 *
	 *  ```js
	 *  spread(function(x, y, z) {})([1, 2, 3]);
	 *  ```
	 *
	 * @param {Function} callback
	 * @returns {Function}
	 */
	module.exports = function spread(callback) {
	  return function wrap(arr) {
	    return callback.apply(null, arr);
	  };
	};


/***/ }
/******/ ])
});


});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};



















var defineProperty = function (obj, key, value) {
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





















var slicedToArray = function () {
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

var noop = function noop() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var opts = args[args.length - 1];
  this.dbg.apply(this, [opts.op].concat(args));
  return jsData.utils.resolve();
};

var noop2 = function noop2() {
  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  var opts = args[args.length - 2];
  this.dbg.apply(this, [opts.op].concat(args));
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

var withoutRelations = function withoutRelations(mapper, props, opts) {
  opts || (opts = {});
  opts.with || (opts.with = []);
  var relationFields = mapper.relationFields || [];
  var toStrip = relationFields.filter(function (value) {
    return opts.with.indexOf(value) === -1;
  });
  return jsData.utils.omit(props, toStrip);
};



/**
 * Response object used when `raw` is `true`. May contain other fields in
 * addition to `data`.
 *
 * @class Response
 */
function Response(data, meta, op) {
  meta || (meta = {});

  /**
   * Response data.
   *
   * @name Response#data
   * @type {*}
   */
  this.data = data;

  jsData.utils.fillIn(this, meta);

  /**
   * The operation for which the response was created.
   *
   * @name Response#op
   * @type {string}
   */
  this.op = op;
}

var DEFAULTS$1 = {
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

  /**
   * Abstract class meant to be extended by adapters.
   *
   * @class Adapter
   * @abstract
   * @extends Component
   * @param {Object} [opts] Configuration opts.
   * @param {boolean} [opts.debug=false] Whether to log debugging information.
   * @param {boolean} [opts.raw=false] Whether to return a more detailed response
   * object.
   */
};function Adapter(opts) {
  jsData.utils.classCallCheck(this, Adapter);
  jsData.Component.call(this, opts);
  opts || (opts = {});
  jsData.utils.fillIn(opts, DEFAULTS$1);
  jsData.utils.fillIn(this, opts);
}

jsData.Component.extend({
  constructor: Adapter,

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
   * @param {string} field The `field` argument passed to <a href="#sum__anchor">sum</a>.
   * @param {Object} query The `query` argument passed to <a href="#sum__anchor">sum</a>.
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
    var _this = this;

    var op = void 0;
    query || (query = {});
    opts || (opts = {});

    // beforeCount lifecycle hook
    op = opts.op = 'beforeCount';
    return jsData.utils.resolve(this[op](mapper, query, opts)).then(function () {
      // Allow for re-assignment from lifecycle hook
      op = opts.op = 'count';
      _this.dbg(op, mapper, query, opts);
      return jsData.utils.resolve(_this._count(mapper, query, opts));
    }).then(function (results) {
      var _results = slicedToArray(results, 2),
          data = _results[0],
          result = _results[1];

      result || (result = {});
      var response = new Response(data, result, op);
      response = _this.respond(response, opts);

      // afterCount lifecycle hook
      op = opts.op = 'afterCount';
      return jsData.utils.resolve(_this[op](mapper, query, opts, response)).then(function (_response) {
        return _response === undefined ? response : _response;
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
    var _this2 = this;

    var op = void 0;
    props || (props = {});
    opts || (opts = {});

    // beforeCreate lifecycle hook
    op = opts.op = 'beforeCreate';
    return jsData.utils.resolve(this[op](mapper, props, opts)).then(function (_props) {
      // Allow for re-assignment from lifecycle hook
      props = _props === undefined ? props : _props;
      props = withoutRelations(mapper, props, opts);
      op = opts.op = 'create';
      _this2.dbg(op, mapper, props, opts);
      return jsData.utils.resolve(_this2._create(mapper, props, opts));
    }).then(function (results) {
      var _results2 = slicedToArray(results, 2),
          data = _results2[0],
          result = _results2[1];

      result || (result = {});
      var response = new Response(data, result, 'create');
      response.created = data ? 1 : 0;
      response = _this2.respond(response, opts);

      // afterCreate lifecycle hook
      op = opts.op = 'afterCreate';
      return jsData.utils.resolve(_this2[op](mapper, props, opts, response)).then(function (_response) {
        return _response === undefined ? response : _response;
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
    var _this3 = this;

    var op = void 0;
    props || (props = {});
    opts || (opts = {});

    // beforeCreateMany lifecycle hook
    op = opts.op = 'beforeCreateMany';
    return jsData.utils.resolve(this[op](mapper, props, opts)).then(function (_props) {
      // Allow for re-assignment from lifecycle hook
      props = _props === undefined ? props : _props;
      props = props.map(function (record) {
        return withoutRelations(mapper, record, opts);
      });
      op = opts.op = 'createMany';
      _this3.dbg(op, mapper, props, opts);
      return jsData.utils.resolve(_this3._createMany(mapper, props, opts));
    }).then(function (results) {
      var _results3 = slicedToArray(results, 2),
          data = _results3[0],
          result = _results3[1];

      data || (data = []);
      result || (result = {});
      var response = new Response(data, result, 'createMany');
      response.created = data.length;
      response = _this3.respond(response, opts);

      // afterCreateMany lifecycle hook
      op = opts.op = 'afterCreateMany';
      return jsData.utils.resolve(_this3[op](mapper, props, opts, response)).then(function (_response) {
        return _response === undefined ? response : _response;
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
    var _this4 = this;

    var op = void 0;
    opts || (opts = {});

    // beforeDestroy lifecycle hook
    op = opts.op = 'beforeDestroy';
    return jsData.utils.resolve(this[op](mapper, id, opts)).then(function () {
      op = opts.op = 'destroy';
      _this4.dbg(op, mapper, id, opts);
      return jsData.utils.resolve(_this4._destroy(mapper, id, opts));
    }).then(function (results) {
      var _results4 = slicedToArray(results, 2),
          data = _results4[0],
          result = _results4[1];

      result || (result = {});
      var response = new Response(data, result, 'destroy');
      response = _this4.respond(response, opts);

      // afterDestroy lifecycle hook
      op = opts.op = 'afterDestroy';
      return jsData.utils.resolve(_this4[op](mapper, id, opts, response)).then(function (_response) {
        return _response === undefined ? response : _response;
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
    var _this5 = this;

    var op = void 0;
    query || (query = {});
    opts || (opts = {});

    // beforeDestroyAll lifecycle hook
    op = opts.op = 'beforeDestroyAll';
    return jsData.utils.resolve(this[op](mapper, query, opts)).then(function () {
      op = opts.op = 'destroyAll';
      _this5.dbg(op, mapper, query, opts);
      return jsData.utils.resolve(_this5._destroyAll(mapper, query, opts));
    }).then(function (results) {
      var _results5 = slicedToArray(results, 2),
          data = _results5[0],
          result = _results5[1];

      result || (result = {});
      var response = new Response(data, result, 'destroyAll');
      response = _this5.respond(response, opts);

      // afterDestroyAll lifecycle hook
      op = opts.op = 'afterDestroyAll';
      return jsData.utils.resolve(_this5[op](mapper, query, opts, response)).then(function (_response) {
        return _response === undefined ? response : _response;
      });
    });
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
    var _this6 = this;

    var relationDef = def.getRelation();

    if (jsData.utils.isObject(records) && !jsData.utils.isArray(records)) {
      var record = records;
      return this.find(relationDef, this.makeBelongsToForeignKey(mapper, def, record), __opts).then(function (relatedItem) {
        def.setLocalField(record, relatedItem);
      });
    } else {
      var keys = records.map(function (record) {
        return _this6.makeBelongsToForeignKey(mapper, def, record);
      }).filter(function (key) {
        return key;
      });
      return this.findAll(relationDef, {
        where: defineProperty({}, relationDef.idAttribute, {
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
    var _this7 = this;

    var op = void 0;
    opts || (opts = {});
    opts.with || (opts.with = []);

    // beforeFind lifecycle hook
    op = opts.op = 'beforeFind';
    return jsData.utils.resolve(this[op](mapper, id, opts)).then(function () {
      op = opts.op = 'find';
      _this7.dbg(op, mapper, id, opts);
      return jsData.utils.resolve(_this7._find(mapper, id, opts));
    }).then(function (results) {
      return _this7.loadRelationsFor(mapper, results, opts);
    }).then(function (_ref) {
      var _ref2 = slicedToArray(_ref, 2),
          record = _ref2[0],
          meta = _ref2[1];

      var response = new Response(record, meta, 'find');
      response.found = record ? 1 : 0;
      response = _this7.respond(response, opts);

      // afterFind lifecycle hook
      op = opts.op = 'afterFind';
      return jsData.utils.resolve(_this7[op](mapper, id, opts, response)).then(function (_response) {
        return _response === undefined ? response : _response;
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
    var _this8 = this;

    var op = void 0;
    opts || (opts = {});
    opts.with || (opts.with = []);

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
    return jsData.utils.resolve(this[op](mapper, query, opts)).then(function () {
      op = opts.op = 'findAll';
      _this8.dbg(op, mapper, query, opts);
      return jsData.utils.resolve(_this8._findAll(mapper, query, opts));
    }).then(function (results) {
      return _this8.loadRelationsFor(mapper, results, opts);
    }).then(function (_ref3) {
      var _ref4 = slicedToArray(_ref3, 2),
          records = _ref4[0],
          meta = _ref4[1];

      var response = new Response(records, meta, 'findAll');
      response.found = records.length;
      response = _this8.respond(response, opts);

      // afterFindAll lifecycle hook
      op = opts.op = 'afterFindAll';
      return jsData.utils.resolve(_this8[op](mapper, query, opts, response)).then(function (_response) {
        return _response === undefined ? response : _response;
      });
    });
  },
  loadRelationsFor: function loadRelationsFor(mapper, results, opts) {
    var _this9 = this;

    var _results6 = slicedToArray(results, 1),
        records = _results6[0];

    var tasks = [];

    if (records) {
      jsData.utils.forEachRelation(mapper, opts, function (def, __opts) {
        var task = void 0;
        if (def.foreignKey && (def.type === 'hasOne' || def.type === 'hasMany')) {
          if (def.type === 'hasOne') {
            task = _this9.loadHasOne(mapper, def, records, __opts);
          } else {
            task = _this9.loadHasMany(mapper, def, records, __opts);
          }
        } else if (def.type === 'hasMany' && def.localKeys) {
          task = _this9.loadHasManyLocalKeys(mapper, def, records, __opts);
        } else if (def.type === 'hasMany' && def.foreignKeys) {
          task = _this9.loadHasManyForeignKeys(mapper, def, records, __opts);
        } else if (def.type === 'belongsTo') {
          task = _this9.loadBelongsTo(mapper, def, records, __opts);
        }
        if (task) {
          tasks.push(task);
        }
      });
    }

    return jsData.utils.Promise.all(tasks).then(function () {
      return results;
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
    return opts[opt] === undefined ? jsData.utils.plainCopy(this[opt]) : jsData.utils.plainCopy(opts[opt]);
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
    var _this10 = this;

    var singular = false;

    if (jsData.utils.isObject(records) && !jsData.utils.isArray(records)) {
      singular = true;
      records = [records];
    }
    var IDs = records.map(function (record) {
      return _this10.makeHasManyForeignKey(mapper, def, record);
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
    return this.findAll(def.getRelation(), query, __opts).then(function (relatedItems) {
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
    var _this11 = this;

    var record = void 0;
    var relatedMapper = def.getRelation();

    if (jsData.utils.isObject(records) && !jsData.utils.isArray(records)) {
      record = records;
    }

    if (record) {
      return this.findAll(relatedMapper, {
        where: defineProperty({}, relatedMapper.idAttribute, {
          'in': this.makeHasManyLocalKeys(mapper, def, record)
        })
      }, __opts).then(function (relatedItems) {
        def.setLocalField(record, relatedItems);
      });
    } else {
      var localKeys = [];
      records.forEach(function (record) {
        localKeys = localKeys.concat(_this11.makeHasManyLocalKeys(mapper, def, record));
      });
      return this.findAll(relatedMapper, {
        where: defineProperty({}, relatedMapper.idAttribute, {
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
      });
    }
  },
  loadHasManyForeignKeys: function loadHasManyForeignKeys(mapper, def, records, __opts) {
    var _this12 = this;

    var relatedMapper = def.getRelation();
    var idAttribute = mapper.idAttribute;
    var record = void 0;

    if (jsData.utils.isObject(records) && !jsData.utils.isArray(records)) {
      record = records;
    }

    if (record) {
      return this.findAll(def.getRelation(), {
        where: defineProperty({}, def.foreignKeys, {
          'contains': this.makeHasManyForeignKeys(mapper, def, record)
        })
      }, __opts).then(function (relatedItems) {
        def.setLocalField(record, relatedItems);
      });
    } else {
      return this.findAll(relatedMapper, {
        where: defineProperty({}, def.foreignKeys, {
          'isectNotEmpty': records.map(function (record) {
            return _this12.makeHasManyForeignKeys(mapper, def, record);
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
    var _this13 = this;

    var op = void 0;
    if (!jsData.utils.isString(field)) {
      throw new Error('field must be a string!');
    }
    query || (query = {});
    opts || (opts = {});

    // beforeSum lifecycle hook
    op = opts.op = 'beforeSum';
    return jsData.utils.resolve(this[op](mapper, field, query, opts)).then(function () {
      // Allow for re-assignment from lifecycle hook
      op = opts.op = 'sum';
      _this13.dbg(op, mapper, field, query, opts);
      return jsData.utils.resolve(_this13._sum(mapper, field, query, opts));
    }).then(function (results) {
      var _results7 = slicedToArray(results, 2),
          data = _results7[0],
          result = _results7[1];

      result || (result = {});
      var response = new Response(data, result, op);
      response = _this13.respond(response, opts);

      // afterSum lifecycle hook
      op = opts.op = 'afterSum';
      return jsData.utils.resolve(_this13[op](mapper, field, query, opts, response)).then(function (_response) {
        return _response === undefined ? response : _response;
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
    var _this14 = this;

    props || (props = {});
    opts || (opts = {});
    var op = void 0;

    // beforeUpdate lifecycle hook
    op = opts.op = 'beforeUpdate';
    return jsData.utils.resolve(this[op](mapper, id, props, opts)).then(function (_props) {
      // Allow for re-assignment from lifecycle hook
      props = _props === undefined ? props : _props;
      props = withoutRelations(mapper, props, opts);
      op = opts.op = 'update';
      _this14.dbg(op, mapper, id, props, opts);
      return jsData.utils.resolve(_this14._update(mapper, id, props, opts));
    }).then(function (results) {
      var _results8 = slicedToArray(results, 2),
          data = _results8[0],
          result = _results8[1];

      result || (result = {});
      var response = new Response(data, result, 'update');
      response.updated = data ? 1 : 0;
      response = _this14.respond(response, opts);

      // afterUpdate lifecycle hook
      op = opts.op = 'afterUpdate';
      return jsData.utils.resolve(_this14[op](mapper, id, props, opts, response)).then(function (_response) {
        return _response === undefined ? response : _response;
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
    var _this15 = this;

    props || (props = {});
    query || (query = {});
    opts || (opts = {});
    var op = void 0;

    // beforeUpdateAll lifecycle hook
    op = opts.op = 'beforeUpdateAll';
    return jsData.utils.resolve(this[op](mapper, props, query, opts)).then(function (_props) {
      // Allow for re-assignment from lifecycle hook
      props = _props === undefined ? props : _props;
      props = withoutRelations(mapper, props, opts);
      op = opts.op = 'updateAll';
      _this15.dbg(op, mapper, props, query, opts);
      return jsData.utils.resolve(_this15._updateAll(mapper, props, query, opts));
    }).then(function (results) {
      var _results9 = slicedToArray(results, 2),
          data = _results9[0],
          result = _results9[1];

      data || (data = []);
      result || (result = {});
      var response = new Response(data, result, 'updateAll');
      response.updated = data.length;
      response = _this15.respond(response, opts);

      // afterUpdateAll lifecycle hook
      op = opts.op = 'afterUpdateAll';
      return jsData.utils.resolve(_this15[op](mapper, props, query, opts, response)).then(function (_response) {
        return _response === undefined ? response : _response;
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
    var _this16 = this;

    records || (records = []);
    opts || (opts = {});
    var op = void 0;
    var idAttribute = mapper.idAttribute;

    records = records.filter(function (record) {
      return jsData.utils.get(record, idAttribute);
    });

    // beforeUpdateMany lifecycle hook
    op = opts.op = 'beforeUpdateMany';
    return jsData.utils.resolve(this[op](mapper, records, opts)).then(function (_records) {
      // Allow for re-assignment from lifecycle hook
      records = _records === undefined ? records : _records;
      records = records.map(function (record) {
        return withoutRelations(mapper, record, opts);
      });
      op = opts.op = 'updateMany';
      _this16.dbg(op, mapper, records, opts);
      return jsData.utils.resolve(_this16._updateMany(mapper, records, opts));
    }).then(function (results) {
      var _results10 = slicedToArray(results, 2),
          data = _results10[0],
          result = _results10[1];

      data || (data = []);
      result || (result = {});
      var response = new Response(data, result, 'updateMany');
      response.updated = data.length;
      response = _this16.respond(response, opts);

      // afterUpdateMany lifecycle hook
      op = opts.op = 'afterUpdateMany';
      return jsData.utils.resolve(_this16[op](mapper, records, opts, response)).then(function (_response) {
        return _response === undefined ? response : _response;
      });
    });
  }
});

/**
 * Create a subclass of this Adapter:
 *
 * @example <caption>Adapter.extend</caption>
 * // Normally you would do: import {Adapter} from 'js-data'
 * const JSData = require('js-data@3.0.0-beta.10')
 * const {Adapter} = JSData
 * console.log('Using JSData v' + JSData.version.full)
 *
 * // Extend the class using ES2015 class syntax.
 * class CustomAdapterClass extends Adapter {
 *   foo () { return 'bar' }
 *   static beep () { return 'boop' }
 * }
 * const customAdapter = new CustomAdapterClass()
 * console.log(customAdapter.foo())
 * console.log(CustomAdapterClass.beep())
 *
 * // Extend the class using alternate method.
 * const OtherAdapterClass = Adapter.extend({
 *   foo () { return 'bar' }
 * }, {
 *   beep () { return 'boop' }
 * })
 * const otherAdapter = new OtherAdapterClass()
 * console.log(otherAdapter.foo())
 * console.log(OtherAdapterClass.beep())
 *
 * // Extend the class, providing a custom constructor.
 * function AnotherAdapterClass () {
 *   Adapter.call(this)
 *   this.created_at = new Date().getTime()
 * }
 * Adapter.extend({
 *   constructor: AnotherAdapterClass,
 *   foo () { return 'bar' }
 * }, {
 *   beep () { return 'boop' }
 * })
 * const anotherAdapter = new AnotherAdapterClass()
 * console.log(anotherAdapter.created_at)
 * console.log(anotherAdapter.foo())
 * console.log(AnotherAdapterClass.beep())
 *
 * @method Adapter.extend
 * @param {Object} [props={}] Properties to add to the prototype of the
 * subclass.
 * @param {Object} [props.constructor] Provide a custom constructor function
 * to be used as the subclass itself.
 * @param {Object} [classProps={}] Static properties to add to the subclass.
 * @returns {Constructor} Subclass of this Adapter class.
 */

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
  return result.replace(/([^:/]|^)\/{2,}/g, '$1/');
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

  hasFetch: hasFetch,

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
};function HttpAdapter(opts) {
  jsData.utils.classCallCheck(this, HttpAdapter);

  opts || (opts = {});
  // Fill in any missing options with the defaults
  jsData.utils.fillIn(opts, DEFAULTS);
  Adapter.call(this, opts);
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
   * @param {object} config
   * @param {object} opts
   * @param {object} response
   */
  afterDEL: noop2,

  /**
   * @name HttpAdapter#afterGET
   * @method
   * @param {string} url
   * @param {object} config
   * @param {object} opts
   * @param {object} response
   */
  afterGET: noop2,

  /**
   * @name HttpAdapter#afterHTTP
   * @method
   * @param {object} config
   * @param {object} opts
   * @param {object} response
   */
  afterHTTP: noop2,

  /**
   * @name HttpAdapter#afterPOST
   * @method
   * @param {string} url
   * @param {object} data
   * @param {object} config
   * @param {object} opts
   * @param {object} response
   */
  afterPOST: noop2,

  /**
   * @name HttpAdapter#afterPUT
   * @method
   * @param {string} url
   * @param {object} data
   * @param {object} config
   * @param {object} opts
   * @param {object} response
   */
  afterPUT: noop2,

  /**
   * @name HttpAdapter#beforeDEL
   * @method
   * @param {object} url
   * @param {object} config
   * @param {object} opts
   */
  beforeDEL: noop,

  /**
   * @name HttpAdapter#beforeGET
   * @method
   * @param {object} url
   * @param {object} config
   * @param {object} opts
   */
  beforeGET: noop,

  /**
   * @name HttpAdapter#beforeHTTP
   * @method
   * @param {object} config
   * @param {object} opts
   */
  beforeHTTP: noop,

  /**
   * @name HttpAdapter#beforePOST
   * @method
   * @param {object} url
   * @param {object} data
   * @param {object} config
   * @param {object} opts
   */
  beforePOST: noop,

  /**
   * @name HttpAdapter#beforePUT
   * @method
   * @param {object} url
   * @param {object} data
   * @param {object} config
   * @param {object} opts
   */
  beforePUT: noop,

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
    return Adapter.prototype.count.call(this, mapper, query, opts);
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
    return Adapter.prototype.create.call(this, mapper, props, opts);
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
    return Adapter.prototype.createMany.call(this, mapper, props, opts);
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
    return Adapter.prototype.destroy.call(this, mapper, id, opts);
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
    return Adapter.prototype.destroyAll.call(this, mapper, query, opts);
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
    return Adapter.prototype.find.call(this, mapper, id, opts);
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
    return Adapter.prototype.findAll.call(this, mapper, query, opts);
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
          delete opts.endpoint;
          var _opts = {};
          jsData.utils.forOwn(opts, function (value, key) {
            _opts[key] = value;
          });
          jsData.utils._(_opts, parentDef);
          endpoint = makePath(_this14.getEndpoint(parentDef, parentId, _opts), parentId, endpoint);
          return false;
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
    if (timeout !== undefined) {
      config.timeout = timeout;
    }
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
      if (this.useFetch || opts.useFetch) {
        if (!hasFetch) {
          throw new Error('Attempting to use window.fetch, but it is not available!');
        }
      } else {
        throw new Error('You have not configured this adapter with an http library!');
      }
    }

    return jsData.utils.resolve(this.beforeHTTP(config, opts)).then(function (_config) {
      config = _config || config;
      if (hasFetch && (_this15.useFetch || opts.useFetch || !_this15.http)) {
        return _this15.fetch(config, opts).then(logResponse, logResponse);
      }
      var httpConfig = jsData.utils.plainCopy(config);
      delete httpConfig.adapter;
      return _this15.http(httpConfig).then(logResponse, logResponse).catch(function (err) {
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
    return Adapter.prototype.sum.call(this, mapper, field, query, opts);
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
    return Adapter.prototype.update.call(this, mapper, id, props, opts);
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
    return Adapter.prototype.updateAll.call(this, mapper, props, query, opts);
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
    return Adapter.prototype.updateMany.call(this, mapper, records, opts);
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
  full: '3.0.0',
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
 * @example <caption>Script tag</caption>
 * var HttpAdapter = window.JSDataHttp.HttpAdapter;
 * var httpAdapter = new HttpAdapter();
 *
 * @example <caption>CommonJS</caption>
 * var HttpAdapter = require('js-data-Http').HttpAdapter;
 * var httpAdapter = new HttpAdapter();
 *
 * @example <caption>ES2015 Modules</caption>
 * import { HttpAdapter } from 'js-data-Http';
 * const httpAdapter = new HttpAdapter();
 *
 * @example <caption>AMD</caption>
 * define('myApp', ['js-data-Http'], function (JSDataHttp) {
 *   var HttpAdapter = JSDataHttp.HttpAdapter;
 *   var httpAdapter = new HttpAdapter();
 *
 *   // ...
 * });
 *
 * @module js-data-http
 */

/**
 * Create a subclass of this HttpAdapter:
 * @example <caption>HttpAdapter.extend</caption>
 * // Normally you would do: import { HttpAdapter } from 'js-data-http';
 * // or: import { HttpAdapter } from 'js-data-http-node';
 * const JSDataHttp = require('js-data-http-node');
 * const { HttpAdapter } = JSDataHttp;
 * console.log('Using JSDataHttp v' + JSDataHttp.version.full);
 *
 * // Extend the class using ES2015 class syntax.
 * class CustomHttpAdapterClass extends HttpAdapter {
 *   foo () { return 'bar'; }
 *   static beep () { return 'boop'; }
 * }
 * const customHttpAdapter = new CustomHttpAdapterClass();
 * console.log(customHttpAdapter.foo());
 * console.log(CustomHttpAdapterClass.beep());
 *
 * // Extend the class using alternate method.
 * const OtherHttpAdapterClass = HttpAdapter.extend({
 *   foo () { return 'bar'; }
 * }, {
 *   beep () { return 'boop'; }
 * })
 * const otherHttpAdapter = new OtherHttpAdapterClass();
 * console.log(otherHttpAdapter.foo());
 * console.log(OtherHttpAdapterClass.beep());
 *
 * // Extend the class, providing a custom constructor.
 * function AnotherHttpAdapterClass () {
 *   HttpAdapter.call(this);
 *   this.created_at = new Date().getTime();
 * }
 * HttpAdapter.extend({
 *   constructor: AnotherHttpAdapterClass,
 *   foo () { return 'bar'; }
 * }, {
 *   beep () { return 'boop'; }
 * })
 * const anotherHttpAdapter = new AnotherHttpAdapterClass();
 * console.log(anotherHttpAdapter.created_at);
 * console.log(anotherHttpAdapter.foo());
 * console.log(AnotherHttpAdapterClass.beep());
 *
 * @method HttpAdapter.extend
 * @param {object} [props={}] Properties to add to the prototype of the
 * subclass.
 * @param {object} [props.constructor] Provide a custom constructor function
 * to be used as the subclass itself.
 * @param {object} [classProps={}] Static properties to add to the subclass.
 * @returns {Constructor} Subclass of this HttpAdapter class.
 * @since 3.0.0
 */

exports.HttpAdapter = HttpAdapter;
exports.addAction = addAction;
exports.addActions = addActions;
exports.version = version;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=js-data-http.js.map
