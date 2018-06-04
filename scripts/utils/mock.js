const fs = require('fs');
const assert = require('assert');

const METHOD = ['get', 'post', 'put', 'delete'];
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
  return function mockHandler(...args) {
    const res = args[1];
    if (typeof value === 'function') {
      value(...args);
    } else {
      res.json(value);
    }
  };
}

function createProxy(devServer, path, target) {
  devServer.proxy = {
    ...devServer.proxy,
    [path]: {
      target,
      changeOrigin: true,
    },
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
    if (valueType === 'string') {
      createProxy(devServer, path, value);
    }
  })

  return function(app) {
    mockKeys.forEach(key => {
      const { method, path } = parseKey(key);
      if (typeof mockConfig[key] === 'string') {
        return false;
      }
      return app[method](path, createMockHandler(method, path, mockConfig[key]));
    });
  }
}
