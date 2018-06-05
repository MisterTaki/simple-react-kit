const fs = require('fs');
const assert = require('assert');

const METHOD = ['get', 'post', 'put', 'delete', 'proxy'];
const VALUE_TYPE = ['function', 'object', 'string'];

function parseKey(key) {
  let method = 'get';
  let path = key;

  if (key.indexOf(' ') > -1) {
    const splited = key.split(' ');
    method = splited[0].toLowerCase();
    path = splited[1];
  }

  return { method, path };
}

function createMockHandler(method, path, value) {
  return function mockHandler(req, res, next) {
    if (typeof value === 'function') {
      value(req, res, next);
    } else {
      res.json(value);
    }
  };
}

module.exports = function (devServer, mockFile, customBefore) {
  if (!fs.existsSync(mockFile)) {
    if (customBefore) {
      return customBefore;
    }
    return undefined;
  }

  const mockConfig = require(mockFile);

  const mockKeys = Object.keys(mockConfig);

  mockKeys.forEach(key => {
    const { method, path } = parseKey(key);
    if (METHOD.indexOf(method) < 0) {
      throw new Error(`method of ${key} is not valid`);
    }
    const value = mockConfig[key];
    const valueType = typeof value;
    if (VALUE_TYPE.indexOf(valueType) < 0) {
      throw new Error(`mock value of ${key} should be function or object or string, but got ${valueType}`);
    }
    if (method === 'proxy') {
      const proxyValue = valueType === 'string' ? {
        target: value,
        changeOrigin: true,
      } : valueType === 'object' ? value : value();

      devServer.proxy = {
        ...devServer.proxy,
        [path]: proxyValue,
      };
      return true;
    }
    if (valueType === 'string') {
      throw new Error(`mock value of ${key} should be function or object, but got string`);
    }
  })

  return function(app) {
    mockKeys.forEach(key => {
      const { method, path } = parseKey(key);
      if (method==='proxy') {
        return false;
      }
      return app[method](path, createMockHandler(method, path, mockConfig[key]));
    });
  }
}
