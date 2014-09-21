var JSData;
if (!window && typeof module !== 'undefined' && module.exports) {
  JSData = require('js-data');
} else {
  JSData = window.JSData;
}

var makePath = JSData.DSUtils.makePath;
var deepMixIn = JSData.DSUtils.deepMixIn;
var http = require('axios');

function Defaults() {

}

var defaultsPrototype = Defaults.prototype;

defaultsPrototype.queryTransform = function (resourceName, params) {
  return params;
};

defaultsPrototype.httpConfig = {};

defaultsPrototype.log = console ? console.log : function () {
};

defaultsPrototype.deserialize = function (resourceName, data) {
  return data ? ('data' in data ? data.data : data) : data;
};

defaultsPrototype.serialize = function (resourceName, data) {
  return data;
};

function DSHttpAdapter(options) {
  this.defaults = new Defaults();
  deepMixIn(this.defaults, options);
}

var dsHttpAdapterPrototype = DSHttpAdapter.prototype;

dsHttpAdapterPrototype.HTTP = function (config, resourceConfig) {
  var _this = this;
  var start = new Date().getTime();
  var deserialize;
  if (config.deserialize) {
    deserialize = config.deserialize;
    delete config.deserialize;
  } else {
    deserialize = _this.defaults.deserialize;
  }
  resourceConfig = resourceConfig || {};
  config = deepMixIn(config, this.defaults.httpConfig);
  return http(config).then(function (data) {
    if (_this.defaults.log) {
      var args = Array.prototype.slice.call(arguments);
      args.unshift(data.config.method + ' request: ' + data.config.url + ' Time taken: ' + (new Date().getTime() - start) + 'ms');
      _this.defaults.log.apply(_this.defaults.log, args);
    }
    return deserialize(resourceConfig.name, data);
  });
};

dsHttpAdapterPrototype.GET = function (url, config, resourceConfig) {
  config = config || {};
  if (!('method' in config)) {
    config.method = 'get';
  }
  return this.HTTP(deepMixIn(config, {
    url: url
  }), resourceConfig);
};

dsHttpAdapterPrototype.POST = function (url, attrs, config, resourceConfig) {
  config = config || {};
  if (!('method' in config)) {
    config.method = 'post';
  }
  return this.HTTP(deepMixIn(config, {
    url: url,
    data: attrs
  }), resourceConfig);
};

dsHttpAdapterPrototype.PUT = function (url, attrs, config, resourceConfig) {
  config = config || {};
  if (!('method' in config)) {
    config.method = 'put';
  }
  return this.HTTP(deepMixIn(config, {
    url: url,
    data: attrs || {}
  }), resourceConfig);
};

dsHttpAdapterPrototype.DEL = function (url, config, resourceConfig) {
  config = config || {};
  if (!('method' in config)) {
    config.method = 'delete';
  }
  return this.HTTP(deepMixIn(config, {
    url: url
  }), resourceConfig);
};

dsHttpAdapterPrototype.find = function (resourceConfig, id, options) {
  options = options || {};
  return this.GET(
    makePath(options.baseUrl || resourceConfig.baseUrl, resourceConfig.getEndpoint(id, options), id),
    options,
    resourceConfig
  );
};

dsHttpAdapterPrototype.findAll = function (resourceConfig, params, options) {
  options = options || {};
  options.params = options.params || {};
  if (params) {
    params = this.defaults.queryTransform(resourceConfig.name, params);
    deepMixIn(options.params, params);
  }
  return this.GET(
    makePath(options.baseUrl || resourceConfig.baseUrl, resourceConfig.getEndpoint(null, options)),
    options,
    resourceConfig
  );
};

dsHttpAdapterPrototype.create = function (resourceConfig, attrs, options) {
  var _this = this;
  options = options || {};
  return this.POST(
    makePath(options.baseUrl || resourceConfig.baseUrl, resourceConfig.getEndpoint(attrs, options)),
    options.serialize ? options.serialize(resourceConfig.name, attrs) : _this.defaults.serialize(resourceConfig.name, attrs),
    options,
    resourceConfig
  );
};

dsHttpAdapterPrototype.update = function (resourceConfig, id, attrs, options) {
  var _this = this;
  options = options || {};
  return this.PUT(
    makePath(options.baseUrl || resourceConfig.baseUrl, resourceConfig.getEndpoint(id, options), id),
    options.serialize ? options.serialize(resourceConfig.name, attrs) : _this.defaults.serialize(resourceConfig.name, attrs),
    options,
    resourceConfig
  );
};

dsHttpAdapterPrototype.updateAll = function (resourceConfig, attrs, params, options) {
  var _this = this;
  options = options || {};
  options.params = options.params || {};
  if (params) {
    params = this.defaults.queryTransform(resourceConfig.name, params);
    deepMixIn(options.params, params);
  }
  return this.PUT(
    makePath(options.baseUrl || resourceConfig.baseUrl, resourceConfig.getEndpoint(null, options)),
    options.serialize ? options.serialize(resourceConfig.name, attrs) : _this.defaults.serialize(resourceConfig.name, attrs),
    options,
    resourceConfig
  );
};

dsHttpAdapterPrototype.destroy = function (resourceConfig, id, options) {
  options = options || {};
  return this.DEL(
    makePath(options.baseUrl || resourceConfig.baseUrl, resourceConfig.getEndpoint(id, options), id),
    options,
    resourceConfig
  );
};

dsHttpAdapterPrototype.destroyAll = function (resourceConfig, params, options) {
  options = options || {};
  options.params = options.params || {};
  if (params) {
    params = this.defaults.queryTransform(resourceConfig.name, params);
    deepMixIn(options.params, params);
  }
  return this.DEL(
    makePath(options.baseUrl || resourceConfig.baseUrl, resourceConfig.getEndpoint(null, options)),
    options,
    resourceConfig
  );
};

module.exports = DSHttpAdapter;

