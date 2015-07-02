let JSData = require('js-data');
let axios = null;

try {
  axios = require('axios');
} catch (e) {
}

let { DSUtils } = JSData;
let { deepMixIn, removeCircular, copy, makePath, isString, isNumber } = DSUtils;

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
    this.http = options.http || axios;
  }

  getEndpoint(resourceConfig, id, options) {
    options = options || {};
    options.params = options.params || {};

    let item;
    let parentKey = resourceConfig.parentKey;
    let endpoint = options.hasOwnProperty('endpoint') ? options.endpoint : resourceConfig.endpoint;
    let parentField = resourceConfig.parentField;
    let parentDef = resourceConfig.getResource(resourceConfig.parent);
    let parentId = options.params[parentKey];

    if (parentId === false || !parentKey || !parentDef) {
      if (parentId === false) {
        delete options.params[parentKey];
      }
      return endpoint;
    } else {
      delete options.params[parentKey];

      if (DSUtils._sn(id)) {
        item = resourceConfig.get(id);
      } else if (DSUtils._o(id)) {
        item = id;
      }

      if (item) {
        parentId = parentId || item[parentKey] || (item[parentField] ? item[parentField][parentDef.idAttribute] : null);
      }

      if (parentId) {
        delete options.endpoint;
        let _options = {};
        DSUtils.forOwn(options, (value, key) => {
          _options[key] = value;
        });
        return DSUtils.makePath(this.getEndpoint(parentDef, parentId, DSUtils._(parentDef, _options)), parentId, endpoint);
      } else {
        return endpoint;
      }
    }
  }

  getPath(method, resourceConfig, id, options) {
    let _this = this;
    options = options || {};
    let args = [
      options.basePath || _this.defaults.basePath || resourceConfig.basePath,
      this.getEndpoint(resourceConfig, (isString(id) || isNumber(id) || method === 'create') ? id : null, options)
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
    config.method = config.method.toUpperCase();
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
        return DSUtils.Promise.reject(data);
      }
    }

    if (!this.http) {
      throw new Error('You have not configured this adapter with an http library!');
    }

    return this.http(config).then(logResponse, logResponse);
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
        return !item ? DSUtils.Promise.reject(new Error('Not Found!')) : item;
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

module.exports = DSHttpAdapter;

