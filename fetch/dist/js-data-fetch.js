/*!
* js-data-fetch
* @version 3.0.0-alpha.2 - Homepage <http://www.js-data.io/docs/dshttpadapter>
* @author Jason Dobry <jason.dobry@gmail.com>
* @copyright (c) 2014-2016 Jason Dobry
* @license MIT <https://github.com/js-data/js-data-http/blob/master/LICENSE>
*
* @overview Fetch HTTP (XHR) adapter for js-data in the browser.
*/
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("js-data"), require("undefined"));
	else if(typeof define === 'function' && define.amd)
		define(["js-data", "undefined"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("js-data"), require("undefined")) : factory(root["js-data"], root["undefined"]);
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

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _jsData = __webpack_require__(2);

	/* global fetch:true Headers:true Request:true */
	var axios = __webpack_require__(3);
	var _ = _jsData.utils._;
	var copy = _jsData.utils.copy;
	var deepMixIn = _jsData.utils.deepMixIn;
	var fillIn = _jsData.utils.fillIn;
	var forOwn = _jsData.utils.forOwn;
	var isArray = _jsData.utils.isArray;
	var isFunction = _jsData.utils.isFunction;
	var isNumber = _jsData.utils.isNumber;
	var isObject = _jsData.utils.isObject;
	var isSorN = _jsData.utils.isSorN;
	var isString = _jsData.utils.isString;
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
	function DSHttpAdapter(opts) {
	  var self = this;

	  // Default values for arguments
	  opts || (opts = {});

	  // Default and user-defined settings
	  self.basePath = opts.basePath === undefined ? '' : opts.basePath;
	  self.debug = opts.debug === undefined ? false : opts.debug;
	  self.forceTrailingSlash = opts.forceTrailingSlash === undefined ? false : opts.forceTrailingSlash;
	  self.http = opts.http === undefined ? axios : opts.http;
	  self.httpConfig = opts.httpConfig === undefined ? {} : opts.httpConfig;
	  self.suffix = opts.suffix === undefined ? '' : opts.suffix;
	  self.useFetch = opts.useFetch === undefined ? false : opts.useFetch;

	  // Use "window.fetch" if available and the user asks for it
	  if (hasFetch && (self.useFetch || self.http === undefined)) {}
	}

	fillIn(DSHttpAdapter, {
	  beforeCreate: function beforeCreate() {},
	  create: function create(Model, props, opts) {
	    var self = this;
	    opts = opts ? copy(opts) : {};
	    opts.params || (opts.params = {});
	    opts.params = self.queryTransform(Model, opts.params, opts);
	    opts.op = 'create';
	    self.dbg(opts.op, Model, props, opts);
	    return resolve(self.beforeCreate(Model, props, opts)).then(function () {
	      return self.POST(self.getPath('create', Model, props, opts), self.serialize(Model, props, opts), opts);
	    }).then(function (response) {
	      return self.deserialize(Model, response, opts);
	    }).then(function (data) {
	      return resolve(self.afterCreate(Model, data, opts)).then(function (_data) {
	        return _data || data;
	      });
	    });
	  },
	  afterCreate: function afterCreate() {},
	  dbg: function dbg() {
	    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	      args[_key2] = arguments[_key2];
	    }

	    this.log.apply(this, ['debug'].concat(args));
	  },
	  beforeDEL: function beforeDEL() {},
	  DEL: function DEL(url, config, opts) {
	    var self = this;
	    config || (config = {});
	    config.url = url || config.url;
	    config.method = config.method || 'delete';
	    return resolve(self.beforeDEL(url, config, opts)).then(function (_config) {
	      config = _config || config;
	      return self.HTTP(config, opts);
	    }).then(function (response) {
	      return resolve(self.afterDEL(url, config, opts, response)).then(function (_response) {
	        return _response || response;
	      });
	    });
	  },
	  afterDEL: function afterDEL() {},
	  deserialize: function deserialize(Model, data, opts) {
	    opts || (opts = {});
	    if (isFunction(opts.deserialize)) {
	      return opts.deserialize(Model, data, opts);
	    }
	    if (opts.raw) {
	      return data;
	    }
	    return data ? 'data' in data ? data.data : data : data;
	  },
	  beforeDestroy: function beforeDestroy() {},
	  destroy: function destroy(Model, id, opts) {
	    var self = this;
	    opts = opts ? copy(opts) : {};
	    opts.params || (opts.params = {});
	    opts.params = self.queryTransform(Model, opts.params, opts);
	    opts.op = 'destroy';
	    self.dbg(opts.op, Model, id, opts);
	    return resolve(self.beforeDestroy(Model, id, opts)).then(function () {
	      return self.DEL(self.getPath('destroy', Model, id, opts), opts);
	    }).then(function (response) {
	      return self.deserialize(Model, response, opts);
	    }).then(function (data) {
	      return resolve(self.afterDestroy(Model, id, data, opts)).then(function (_data) {
	        return _data || data;
	      });
	    });
	  },
	  beforeDestroyAll: function beforeDestroyAll() {},
	  destroyAll: function destroyAll(Model, query, opts) {
	    var self = this;
	    query || (query = {});
	    opts = opts ? copy(opts) : {};
	    opts.params || (opts.params = {});
	    opts.op = 'destroy';
	    self.dbg(opts.op, Model, query, opts);
	    deepMixIn(opts.params, query);
	    opts.params = self.queryTransform(Model, opts.params, opts);
	    return resolve(self.beforeDestroyAll(Model, query, opts)).then(function () {
	      return self.DEL(self.getPath('destroyAll', Model, query, opts), opts);
	    }).then(function (response) {
	      return self.deserialize(Model, response, opts);
	    }).then(function (data) {
	      return resolve(self.afterDestroyAll(Model, query, data, opts)).then(function (_data) {
	        return _data || data;
	      });
	    });
	  },
	  error: function error() {
	    if (console) {
	      var _console;

	      (_console = console)[typeof console.error === 'function' ? 'error' : 'log'].apply(_console, arguments);
	    }
	  },
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
	  beforeFind: function beforeFind() {},
	  find: function find(Model, id, opts) {
	    var self = this;
	    opts = opts ? copy(opts) : {};
	    opts.params || (opts.params = {});
	    opts.params = self.queryTransform(Model, opts.params, opts);
	    opts.op = 'find';
	    self.dbg(opts.op, Model, id, opts);
	    return resolve(self.beforeFind(Model, id, opts)).then(function () {
	      return self.GET(self.getPath('find', Model, id, opts), opts);
	    }).then(function (response) {
	      return self.deserialize(Model, response, opts);
	    }).then(function (data) {
	      return resolve(self.afterFind(Model, id, data, opts)).then(function (_data) {
	        return _data || data;
	      });
	    });
	  },
	  afterFind: function afterFind() {},
	  findAll: function findAll(Model, query, opts) {
	    var self = this;
	    query || (query = {});
	    opts = opts ? copy(opts) : {};
	    opts.params || (opts.params = {});
	    opts.op = 'findAll';
	    self.dbg(opts.op, Model, query, opts);
	    deepMixIn(opts.params, query);
	    opts.params = self.queryTransform(Model, opts.params, opts);
	    return resolve(self.beforeFindAll(Model, query, opts)).then(function () {
	      return self.GET(self.getPath('findAll', Model, query, opts), opts);
	    }).then(function (response) {
	      return self.deserialize(Model, response, opts);
	    }).then(function (data) {
	      return resolve(self.afterFindAll(Model, query, data, opts)).then(function (_data) {
	        return _data || data;
	      });
	    });
	  },
	  beforeGET: function beforeGET() {},
	  GET: function GET(url, config, opts) {
	    var self = this;
	    config || (config = {});
	    config.url = url || config.url;
	    config.method = config.method || 'get';
	    return resolve(self.beforeGET(url, config, opts)).then(function (_config) {
	      config = _config || config;
	      return self.HTTP(config, opts);
	    }).then(function (response) {
	      return resolve(self.afterGET(url, config, opts, response)).then(function (_response) {
	        return _response || response;
	      });
	    });
	  },
	  afterGET: function afterGET() {},
	  getEndpoint: function getEndpoint(Model, id, opts) {
	    var _this = this;

	    opts || (opts = {});
	    opts.params || (opts.params = {});

	    var item = undefined;
	    var parentKey = Model.parentKey;
	    var endpoint = opts.hasOwnProperty('endpoint') ? opts.endpoint : Model.endpoint;
	    var parentField = Model.parentField;
	    var parentDef = Model.getResource(Model.parent);
	    var parentId = opts.params[parentKey];

	    if (parentId === false || !parentKey || !parentDef) {
	      if (parentId === false) {
	        delete opts.params[parentKey];
	      }
	      return endpoint;
	    } else {
	      delete opts.params[parentKey];

	      if (isString(id) || isNumber(id)) {
	        item = Model.get(id);
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
	          return {
	            v: makePath(_this.getEndpoint(parentDef, parentId, _opts, parentId, endpoint))
	          };
	        }();

	        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	      } else {
	        return endpoint;
	      }
	    }
	  },
	  getPath: function getPath(method, Model, id, opts) {
	    var self = this;
	    opts || (opts = {});
	    var args = [opts.basePath === undefined ? self.basePath : opts.basePath, self.getEndpoint(Model, isString(id) || isNumber(id) || method === 'create' ? id : null, opts)];
	    if (method === 'find' || method === 'update' || method === 'destroy') {
	      args.push(id);
	    }
	    return makePath.apply(_jsData.utils, args);
	  },
	  beforeHTTP: function beforeHTTP() {},
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

	    return resolve(self.beforeHTTP(config)).then(function (_config) {
	      config = _config || config;
	      if (hasFetch && (self.useFetch || opts.useFetch || !self.http)) {
	        return self.fetch(config, opts).then(logResponse, logResponse);
	      }
	      return self.http(config).then(logResponse, logResponse);
	    }).then(function (response) {
	      return resolve(self.afterHTTP(config, response)).then(function (_response) {
	        return _response || response;
	      });
	    });
	  },
	  afterHTTP: function afterHTTP() {},
	  queryTransform: function queryTransform(Model, params, opts) {
	    return params;
	  },
	  serialize: function serialize(Model, data, opts) {
	    opts || (opts = {});
	    if (isFunction(opts.serialize)) {
	      return opts.serialize(Model, data, opts);
	    }
	    return data;
	  },
	  log: function log(level) {
	    for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	      args[_key3 - 1] = arguments[_key3];
	    }

	    if (level && !args.length) {
	      args.push(level);
	      level = 'debug';
	    }
	    if (level === 'debug' && !this.debug) {
	      return;
	    }
	    var prefix = level.toUpperCase() + ': (' + this.name + ')';
	    if (console[level]) {
	      var _console2;

	      (_console2 = console)[level].apply(_console2, [prefix].concat(args));
	    } else {
	      var _console3;

	      (_console3 = console).log.apply(_console3, [prefix].concat(args));
	    }
	  },
	  beforePOST: function beforePOST() {},
	  POST: function POST(url, data, config, opts) {
	    var self = this;
	    config || (config = {});
	    config.url = url || config.url;
	    config.data = data || config.data;
	    config.method = config.method || 'post';
	    return resolve(self.beforePOST(url, data, config, opts)).then(function (_config) {
	      config = _config || config;
	      return self.HTTP(config, opts);
	    }).then(function (response) {
	      return resolve(self.afterPOST(url, data, config, opts, response)).then(function (_response) {
	        return _response || response;
	      });
	    });
	  },
	  afterPOST: function afterPOST() {},
	  beforePUT: function beforePUT() {},
	  PUT: function PUT(url, data, config, opts) {
	    var self = this;
	    config || (config = {});
	    config.url = url || config.url;
	    config.data = data || config.data;
	    config.method = config.method || 'put';
	    return resolve(self.beforePUT(url, data, config, opts)).then(function (_config) {
	      config = _config || config;
	      return self.HTTP(config, opts);
	    }).then(function (response) {
	      return resolve(self.afterPUT(url, data, config, opts, response)).then(function (_response) {
	        return _response || response;
	      });
	    });
	  },
	  afterPUT: function afterPUT() {},
	  update: function update(Model, id, props, opts) {
	    var self = this;
	    opts = opts ? copy(opts) : {};
	    opts.params || (opts.params = {});
	    opts.params = self.queryTransform(Model, opts.params, opts);
	    opts.op = 'update';
	    self.dbg(opts.op, Model, id, props, opts);
	    return resolve(self.beforeUpdate(Model, id, props, opts)).then(function () {
	      return self.POST(self.getPath('update', Model, id, opts), self.serialize(Model, props, opts), opts);
	    }).then(function (response) {
	      return self.deserialize(Model, response, opts);
	    }).then(function (data) {
	      return resolve(self.afterUpdate(Model, id, props, opts, data)).then(function (_data) {
	        return _data || data;
	      });
	    });
	  },
	  updateAll: function updateAll(Model, props, query, opts) {
	    var self = this;
	    query || (query = {});
	    opts = opts ? copy(opts) : {};
	    opts.params || (opts.params = {});
	    opts.op = 'updateAll';
	    self.dbg(opts.op, Model, props, query, opts);
	    deepMixIn(opts.params, query);
	    opts.params = self.queryTransform(Model, opts.params, opts);
	    return resolve(self.beforeUpdateAll(Model, props, query, opts)).then(function () {
	      return self.PUT(self.getPath('updateAll', Model, query, opts), opts);
	    }).then(function (response) {
	      return self.deserialize(Model, response, opts);
	    }).then(function (data) {
	      return resolve(self.afterUpdateAll(Model, props, query, opts, data)).then(function (_data) {
	        return _data || data;
	      });
	    });
	  }
	});

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
	        var _args = [_opts.basePath || this.basePath || adapter.defaults.basePath, adapter.getEndpoint(this, isSorN(id) ? id : null, _opts)];
	        if (isSorN(id)) {
	          _args.push(id);
	        }
	        _args.push(opts.pathname || name);
	        config.url = makePath.apply(null, _args);
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
	  full: '3.0.0-alpha.2',
	  major: parseInt('3', 10),
	  minor: parseInt('0', 10),
	  patch: parseInt('0', 10),
	  alpha:  true ? '2' : false,
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

	module.exports = undefined;

/***/ }
/******/ ])
});
;