/*!
* js-data-http-node
* @version 3.0.0-alpha.1 - Homepage <http://www.js-data.io/docs/dshttpadapter>
* @author Jason Dobry <jason.dobry@gmail.com>
* @copyright (c) 2014-2015 Jason Dobry
* @license MIT <https://github.com/js-data/js-data-http/blob/master/LICENSE>
*
* @overview Node.js HTTP adapter for js-data.
*/
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("js-data"), require("axios"));
	else if(typeof define === 'function' && define.amd)
		define(["js-data", "axios"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("js-data"), require("axios")) : factory(root["js-data"], root["axios"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _jsData = __webpack_require__(2);

	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var axios = __webpack_require__(3);
	var _ = _jsData.utils._;
	var copy = _jsData.utils.copy;
	var deepMixIn = _jsData.utils.deepMixIn;
	var fillIn = _jsData.utils.fillIn;
	var forOwn = _jsData.utils.forOwn;
	var isArray = _jsData.utils.isArray;
	var isNumber = _jsData.utils.isNumber;
	var isObject = _jsData.utils.isObject;
	var isSorN = _jsData.utils.isSorN;
	var isString = _jsData.utils.isString;
	var
	// removeCircular,
	resolve = _jsData.utils.resolve;
	var reject = _jsData.utils.reject;
	var toJson = _jsData.utils.toJson;

	var hasFetch = false;

	try {
	  hasFetch = window && window.fetch;
	} catch (e) {}

	function isValidString(value) {
	  return value != null && value !== ''; // jshint ignore:line
	}
	function join(items) {
	  var separator = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

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
	  return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+');
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

	var Defaults = (function () {
	  function Defaults() {
	    _classCallCheck(this, Defaults);
	  }

	  _createClass(Defaults, [{
	    key: 'queryTransform',
	    value: function queryTransform(resourceConfig, params) {
	      return params;
	    }
	  }, {
	    key: 'deserialize',
	    value: function deserialize(resourceConfig, data) {
	      return data ? 'data' in data ? data.data : data : data;
	    }
	  }, {
	    key: 'serialize',
	    value: function serialize(resourceConfig, data) {
	      return data;
	    }
	  }, {
	    key: 'log',
	    value: function log() {}
	  }, {
	    key: 'error',
	    value: function error() {}
	  }]);

	  return Defaults;
	})();

	var defaultsPrototype = Defaults.prototype;

	defaultsPrototype.basePath = '';

	defaultsPrototype.forceTrailingSlash = '';

	defaultsPrototype.httpConfig = {};

	defaultsPrototype.useFetch = false;

	var DSHttpAdapter = (function () {
	  function DSHttpAdapter(options) {
	    _classCallCheck(this, DSHttpAdapter);

	    options = options || {};
	    this.defaults = new Defaults();
	    this.http = options.http || axios;
	    delete options.http;
	    if (console) {
	      this.defaults.log = function (a, b) {
	        return console[typeof console.info === 'function' ? 'info' : 'log'](a, b);
	      };
	    }
	    if (console) {
	      this.defaults.error = function (a, b) {
	        return console[typeof console.error === 'function' ? 'error' : 'log'](a, b);
	      };
	    }
	    deepMixIn(this.defaults, options);

	    if (this.defaults.useFetch && hasFetch) {
	      this.defaults.deserialize = function (resourceConfig, response) {
	        return response.json();
	      };
	      this.http = function (config) {
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
	          return response;
	        });
	      };
	    }
	  }

	  _createClass(DSHttpAdapter, [{
	    key: 'getEndpoint',
	    value: function getEndpoint(resourceConfig, id, options) {
	      var _this2 = this;

	      options || (options = {});
	      options.params || (options.params = {});

	      var item = undefined;
	      var parentKey = resourceConfig.parentKey;
	      var endpoint = options.hasOwnProperty('endpoint') ? options.endpoint : resourceConfig.endpoint;
	      var parentField = resourceConfig.parentField;
	      var parentDef = resourceConfig.getResource(resourceConfig.parent);
	      var parentId = options.params[parentKey];

	      if (parentId === false || !parentKey || !parentDef) {
	        if (parentId === false) {
	          delete options.params[parentKey];
	        }
	        return endpoint;
	      } else {
	        delete options.params[parentKey];

	        if (isString(id) || isNumber(id)) {
	          item = resourceConfig.get(id);
	        } else if (isObject(id)) {
	          item = id;
	        }

	        if (item) {
	          parentId = parentId || item[parentKey] || (item[parentField] ? item[parentField][parentDef.idAttribute] : null);
	        }

	        if (parentId) {
	          var _ret = (function () {
	            delete options.endpoint;
	            var _options = {};
	            forOwn(options, function (value, key) {
	              _options[key] = value;
	            });
	            _(_options, parentDef);
	            return {
	              v: makePath(_this2.getEndpoint(parentDef, parentId, _options, parentId, endpoint))
	            };
	          })();

	          if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	        } else {
	          return endpoint;
	        }
	      }
	    }
	  }, {
	    key: 'getPath',
	    value: function getPath(method, resourceConfig, id, options) {
	      var _this = this;
	      options || (options = {});
	      var args = [options.basePath || _this.defaults.basePath || resourceConfig.basePath, this.getEndpoint(resourceConfig, isString(id) || isNumber(id) || method === 'create' ? id : null, options)];
	      if (method === 'find' || method === 'update' || method === 'destroy') {
	        args.push(id);
	      }
	      return makePath.apply(_jsData.utils, args);
	    }
	  }, {
	    key: 'HTTP',
	    value: function HTTP(config) {
	      var _this = this;
	      var start = new Date();
	      config = copy(config);
	      config = deepMixIn(config, _this.defaults.httpConfig);
	      if (_this.defaults.forceTrailingSlash && config.url[config.url.length - 1] !== '/') {
	        config.url += '/';
	      }
	      // if (typeof config.data === 'object') {
	      //   config.data = removeCircular(config.data)
	      // }
	      config.method = config.method.toUpperCase();
	      var suffix = config.suffix || _this.defaults.suffix;
	      if (suffix && config.url.substr(config.url.length - suffix.length) !== suffix) {
	        config.url += suffix;
	      }

	      function logResponse(data) {
	        var str = start.toUTCString() + ' - ' + config.method.toUpperCase() + ' ' + config.url + ' - ' + data.status + ' ' + (new Date().getTime() - start.getTime()) + 'ms';
	        if (data.status >= 200 && data.status < 300) {
	          if (_this.defaults.log) {
	            _this.defaults.log(str, data);
	          }
	          return data;
	        } else {
	          if (_this.defaults.error) {
	            _this.defaults.error('\'FAILED: ' + str, data);
	          }
	          return reject(data);
	        }
	      }

	      if (!this.http) {
	        throw new Error('You have not configured this adapter with an http library!');
	      }

	      return this.http(config).then(logResponse, logResponse);
	    }
	  }, {
	    key: 'GET',
	    value: function GET(url, config) {
	      config || (config = {});
	      if (!('method' in config)) {
	        config.method = 'get';
	      }
	      return this.HTTP(deepMixIn(config, {
	        url: url
	      }));
	    }
	  }, {
	    key: 'POST',
	    value: function POST(url, attrs, config) {
	      config || (config = {});
	      if (!('method' in config)) {
	        config.method = 'post';
	      }
	      return this.HTTP(deepMixIn(config, {
	        url: url,
	        data: attrs
	      }));
	    }
	  }, {
	    key: 'PUT',
	    value: function PUT(url, attrs, config) {
	      config || (config = {});
	      if (!('method' in config)) {
	        config.method = 'put';
	      }
	      return this.HTTP(deepMixIn(config, {
	        url: url,
	        data: attrs || {}
	      }));
	    }
	  }, {
	    key: 'DEL',
	    value: function DEL(url, config) {
	      config || (config = {});
	      if (!('method' in config)) {
	        config.method = 'delete';
	      }
	      return this.HTTP(deepMixIn(config, {
	        url: url
	      }));
	    }
	  }, {
	    key: 'find',
	    value: function find(resourceConfig, id, options) {
	      var _this = this;
	      options = options ? copy(options) : {};
	      options.suffix = options.suffix || resourceConfig.suffix;
	      options.params || (options.params = {});
	      options.params = _this.defaults.queryTransform(resourceConfig, options.params);
	      return _this.GET(_this.getPath('find', resourceConfig, id, options), options).then(function (data) {
	        var item = (options.deserialize ? options.deserialize : _this.defaults.deserialize)(resourceConfig, data);
	        return !item ? reject(new Error('Not Found!')) : item;
	      });
	    }
	  }, {
	    key: 'findAll',
	    value: function findAll(resourceConfig, params, options) {
	      var _this = this;
	      options = options ? copy(options) : {};
	      options.suffix = options.suffix || resourceConfig.suffix;
	      options.params || (options.params = {});
	      if (params) {
	        params = _this.defaults.queryTransform(resourceConfig, params);
	        deepMixIn(options.params, params);
	      }
	      return _this.GET(_this.getPath('findAll', resourceConfig, params, options), options).then(function (data) {
	        return (options.deserialize ? options.deserialize : _this.defaults.deserialize)(resourceConfig, data);
	      });
	    }
	  }, {
	    key: 'create',
	    value: function create(resourceConfig, attrs, options) {
	      var _this = this;
	      options = options ? copy(options) : {};
	      options.suffix = options.suffix || resourceConfig.suffix;
	      options.params || (options.params = {});
	      options.params = _this.defaults.queryTransform(resourceConfig, options.params);
	      return _this.POST(_this.getPath('create', resourceConfig, attrs, options), options.serialize ? options.serialize(resourceConfig, attrs) : _this.defaults.serialize(resourceConfig, attrs), options).then(function (data) {
	        return (options.deserialize ? options.deserialize : _this.defaults.deserialize)(resourceConfig, data);
	      });
	    }
	  }, {
	    key: 'update',
	    value: function update(resourceConfig, id, attrs, options) {
	      var _this = this;
	      options = options ? copy(options) : {};
	      options.suffix = options.suffix || resourceConfig.suffix;
	      options.params || (options.params = {});
	      options.params = _this.defaults.queryTransform(resourceConfig, options.params);
	      return _this.PUT(_this.getPath('update', resourceConfig, id, options), options.serialize ? options.serialize(resourceConfig, attrs) : _this.defaults.serialize(resourceConfig, attrs), options).then(function (data) {
	        return (options.deserialize ? options.deserialize : _this.defaults.deserialize)(resourceConfig, data);
	      });
	    }
	  }, {
	    key: 'updateAll',
	    value: function updateAll(resourceConfig, attrs, params, options) {
	      var _this = this;
	      options = options ? copy(options) : {};
	      options.suffix = options.suffix || resourceConfig.suffix;
	      options.params || (options.params = {});
	      if (params) {
	        params = _this.defaults.queryTransform(resourceConfig, params);
	        deepMixIn(options.params, params);
	      }
	      return this.PUT(_this.getPath('updateAll', resourceConfig, attrs, options), options.serialize ? options.serialize(resourceConfig, attrs) : _this.defaults.serialize(resourceConfig, attrs), options).then(function (data) {
	        return (options.deserialize ? options.deserialize : _this.defaults.deserialize)(resourceConfig, data);
	      });
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy(resourceConfig, id, options) {
	      var _this = this;
	      options = options ? copy(options) : {};
	      options.suffix = options.suffix || resourceConfig.suffix;
	      options.params || (options.params = {});
	      options.params = _this.defaults.queryTransform(resourceConfig, options.params);
	      return _this.DEL(_this.getPath('destroy', resourceConfig, id, options), options).then(function (data) {
	        return (options.deserialize ? options.deserialize : _this.defaults.deserialize)(resourceConfig, data);
	      });
	    }
	  }, {
	    key: 'destroyAll',
	    value: function destroyAll(resourceConfig, params, options) {
	      var _this = this;
	      options = options ? copy(options) : {};
	      options.suffix = options.suffix || resourceConfig.suffix;
	      options.params || (options.params = {});
	      if (params) {
	        params = _this.defaults.queryTransform(resourceConfig, params);
	        deepMixIn(options.params, params);
	      }
	      return this.DEL(_this.getPath('destroyAll', resourceConfig, params, options), options).then(function (data) {
	        return (options.deserialize ? options.deserialize : _this.defaults.deserialize)(resourceConfig, data);
	      });
	    }
	  }]);

	  return DSHttpAdapter;
	})();

	DSHttpAdapter.addAction = function (name, opts) {
	  if (!name || !isString(name)) {
	    throw new TypeError('action(name[, opts]): Expected: string, Found: ' + (typeof name === 'undefined' ? 'undefined' : _typeof(name)));
	  }
	  return function (target) {
	    if (target[name]) {
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
	    target[name] = function (id, _opts) {
	      if (isObject(id)) {
	        _opts = id;
	      }
	      _opts = _opts || {};
	      var adapter = this.getAdapter(opts.adapter || this.defaultAdapter || 'http');
	      var config = {};
	      fillIn(config, opts);
	      if (!_opts.hasOwnProperty('endpoint') && config.endpoint) {
	        _opts.endpoint = config.endpoint;
	      }
	      if (typeof _opts.getEndpoint === 'function') {
	        config.url = _opts.getEndpoint(this, _opts);
	      } else {
	        var args = [_opts.basePath || this.basePath || adapter.defaults.basePath, adapter.getEndpoint(this, isSorN(id) ? id : null, _opts)];
	        if (isSorN(id)) {
	          args.push(id);
	        }
	        args.push(opts.pathname || name);
	        config.url = makePath.apply(null, args);
	      }
	      config.method = config.method || 'GET';
	      config.modelName = this.name;
	      deepMixIn(config)(_opts);
	      return resolve(config).then(_opts.request || opts.request).then(function (config) {
	        return adapter.HTTP(config);
	      }).then(function (data) {
	        if (data && data.config) {
	          data.config.modelName = this.name;
	        }
	        return data;
	      }).then(_opts.response || opts.response, _opts.responseError || opts.responseError);
	    };
	    return target;
	  };
	};

	DSHttpAdapter.addActions = function (opts) {
	  opts || (opts = {});
	  return function (target) {
	    forOwn(target, function (value, key) {
	      DSHttpAdapter.addAction(key, value)(target);
	    });
	    return target;
	  };
	};

	DSHttpAdapter.version = {
	  full: '3.0.0-alpha.1',
	  major: parseInt('3', 10),
	  minor: parseInt('0', 10),
	  patch: parseInt('0', 10),
	  alpha:  true ? '1' : false,
	  beta:  true ? 'false' : false
	};

	module.exports = DSHttpAdapter;

/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }
/******/ ])
});
;