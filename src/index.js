let JSData;

try {
  JSData = require('js-data');
} catch (e) {
}

if (!JSData) {
  try {
    JSData = window.JSData;
  } catch (e) {
  }
}

if (!JSData) {
  throw new Error('js-data must be loaded!');
}

let http = require('axios');
let DSUtils = JSData.DSUtils;
let deepMixIn = JSData.DSUtils.deepMixIn;
let removeCircular = JSData.DSUtils.removeCircular;
let copy = JSData.DSUtils.copy;
let makePath = JSData.DSUtils.makePath;
let isString = JSData.DSUtils.isString;
let isNumber = JSData.DSUtils.isNumber;
let P = DSUtils.Promise;

class Defaults {
  queryTransform(resourceConfig, params) {
    return params;
  }

  deserialize(resourceConfig, data) {
    return data ? ('data' in data ? data.data : data) : data;
  }

  serialize(resourceConfig, data) {
    return data;
  }

  log() {

  }

  error() {

  }
}

let defaultsPrototype = Defaults.prototype;

defaultsPrototype.basePath = '';

defaultsPrototype.forceTrailingSlash = '';

defaultsPrototype.httpConfig = {};

class DSHttpAdapter {
  constructor(options) {
    this.defaults = new Defaults();
    if (console) {
      this.defaults.log = (a, b) => console[typeof console.info === 'function' ? 'info' : 'log'](a, b);
    }
    if (console) {
      this.defaults.error = (a, b) => console[typeof console.error === 'function' ? 'error' : 'log'](a, b);
    }
    deepMixIn(this.defaults, options);
  }

  getPath(method, resourceConfig, id, options) {
    let _this = this;
    options = options || {};
    let args = [
      options.basePath || _this.defaults.basePath || resourceConfig.basePath,
      resourceConfig.getEndpoint((isString(id) || isNumber(id) || method === 'create') ? id : null, options)
    ];
    if (method === 'find' || method === 'update' || method === 'destroy') {
      args.push(id);
    }
    return makePath.apply(DSUtils, args);
  }

  HTTP(config) {
    let _this = this;
    let start = new Date();
    config = copy(config);
    config = deepMixIn(config, _this.defaults.httpConfig);
    if (_this.defaults.forceTrailingSlash && config.url[config.url.length - 1] !== '/') {
      config.url += '/';
    }
    if (typeof config.data === 'object') {
      config.data = removeCircular(config.data);
    }
    let suffix = config.suffix || _this.defaults.suffix;
    if (suffix && config.url.substr(config.url.length - suffix.length) !== suffix) {
      config.url += suffix;
    }

    function logResponse(data) {
      let str = `${start.toUTCString()} - ${data.config.method.toUpperCase()} ${data.config.url} - ${data.status} ${(new Date().getTime() - start.getTime())}ms`;
      if (data.status >= 200 && data.status < 300) {
        if (_this.defaults.log) {
          _this.defaults.log(str, data);
        }
        return data;
      } else {
        if (_this.defaults.error) {
          _this.defaults.error(`'FAILED: ${str}`, data);
        }
        throw data;
      }
    }

    return http(config).then(logResponse, logResponse);
  }

  GET(url, config) {
    config = config || {};
    if (!('method' in config)) {
      config.method = 'get';
    }
    return this.HTTP(deepMixIn(config, {
      url
    }));
  }

  POST(url, attrs, config) {
    config = config || {};
    if (!('method' in config)) {
      config.method = 'post';
    }
    return this.HTTP(deepMixIn(config, {
      url,
      data: attrs
    }));
  }

  PUT(url, attrs, config) {
    config = config || {};
    if (!('method' in config)) {
      config.method = 'put';
    }
    return this.HTTP(deepMixIn(config, {
      url,
      data: attrs || {}
    }));
  }

  DEL(url, config) {
    config = config || {};
    if (!('method' in config)) {
      config.method = 'delete';
    }
    return this.HTTP(deepMixIn(config, {
      url
    }));
  }

  find(resourceConfig, id, options) {
    let _this = this;
    options = options ? copy(options) : {};
    options.suffix = options.suffix || resourceConfig.suffix;
    options.params = options.params || {};
    options.params = _this.defaults.queryTransform(resourceConfig, options.params);
    return _this.GET(
      _this.getPath('find', resourceConfig, id, options),
      options
    ).then(data => {
        let item = (options.deserialize ? options.deserialize : _this.defaults.deserialize)(resourceConfig, data);
        return !item ? P.reject(new Error('Not Found!')) : item;
      });
  }

  findAll(resourceConfig, params, options) {
    let _this = this;
    options = options ? copy(options) : {};
    options.suffix = options.suffix || resourceConfig.suffix;
    options.params = options.params || {};
    if (params) {
      params = _this.defaults.queryTransform(resourceConfig, params);
      deepMixIn(options.params, params);
    }
    return _this.GET(
      _this.getPath('findAll', resourceConfig, params, options),
      options
    ).then(data => (options.deserialize ? options.deserialize : _this.defaults.deserialize)(resourceConfig, data));
  }

  create(resourceConfig, attrs, options) {
    let _this = this;
    options = options ? copy(options) : {};
    options.suffix = options.suffix || resourceConfig.suffix;
    options.params = options.params || {};
    options.params = _this.defaults.queryTransform(resourceConfig, options.params);
    return _this.POST(
      _this.getPath('create', resourceConfig, attrs, options),
      options.serialize ? options.serialize(resourceConfig, attrs) : _this.defaults.serialize(resourceConfig, attrs),
      options
    ).then(data => (options.deserialize ? options.deserialize : _this.defaults.deserialize)(resourceConfig, data));
  }

  update(resourceConfig, id, attrs, options) {
    let _this = this;
    options = options ? copy(options) : {};
    options.suffix = options.suffix || resourceConfig.suffix;
    options.params = options.params || {};
    options.params = _this.defaults.queryTransform(resourceConfig, options.params);
    return _this.PUT(
      _this.getPath('update', resourceConfig, id, options),
      options.serialize ? options.serialize(resourceConfig, attrs) : _this.defaults.serialize(resourceConfig, attrs),
      options
    ).then(data => (options.deserialize ? options.deserialize : _this.defaults.deserialize)(resourceConfig, data));
  }

  updateAll(resourceConfig, attrs, params, options) {
    let _this = this;
    options = options ? copy(options) : {};
    options.suffix = options.suffix || resourceConfig.suffix;
    options.params = options.params || {};
    if (params) {
      params = _this.defaults.queryTransform(resourceConfig, params);
      deepMixIn(options.params, params);
    }
    return this.PUT(
      _this.getPath('updateAll', resourceConfig, attrs, options),
      options.serialize ? options.serialize(resourceConfig, attrs) : _this.defaults.serialize(resourceConfig, attrs),
      options
    ).then(data => (options.deserialize ? options.deserialize : _this.defaults.deserialize)(resourceConfig, data));
  }

  destroy(resourceConfig, id, options) {
    let _this = this;
    options = options ? copy(options) : {};
    options.suffix = options.suffix || resourceConfig.suffix;
    options.params = options.params || {};
    options.params = _this.defaults.queryTransform(resourceConfig, options.params);
    return _this.DEL(
      _this.getPath('destroy', resourceConfig, id, options),
      options
    ).then(data => (options.deserialize ? options.deserialize : _this.defaults.deserialize)(resourceConfig, data));
  }

  destroyAll(resourceConfig, params, options) {
    let _this = this;
    options = options ? copy(options) : {};
    options.suffix = options.suffix || resourceConfig.suffix;
    options.params = options.params || {};
    if (params) {
      params = _this.defaults.queryTransform(resourceConfig, params);
      deepMixIn(options.params, params);
    }
    return this.DEL(
      _this.getPath('destroyAll', resourceConfig, params, options),
      options
    ).then(data => (options.deserialize ? options.deserialize : _this.defaults.deserialize)(resourceConfig, data));
  }
}

export default DSHttpAdapter;

