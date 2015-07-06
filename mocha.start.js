/*global assert:true */
'use strict';

require('es6-promise').polyfill();

var assert = require('chai').assert;
var mocha = require('mocha');
var sinon = require('sinon');
var JSData = require('js-data');
var http = require('http');
var DSHttpAdapter = require('./');

var dsHttpAdapter, User, Post, datastore, DSUtils, queryTransform, p1, p2, p3, p4, p5;

var globals = module.exports = {
  fail: function (msg) {
    assert.equal('should not reach this!: ' + msg, 'failure');
  },
  TYPES_EXCEPT_STRING: [123, 123.123, null, undefined, {}, [], true, false, function () {
  }],
  TYPES_EXCEPT_STRING_OR_ARRAY: [123, 123.123, null, undefined, {}, true, false, function () {
  }],
  TYPES_EXCEPT_STRING_OR_NUMBER: [null, undefined, {}, [], true, false, function () {
  }],
  TYPES_EXCEPT_STRING_OR_OBJECT: [123, 123.123, null, undefined, [], true, false, function () {
  }],
  TYPES_EXCEPT_STRING_OR_NUMBER_OBJECT: [null, undefined, [], true, false, function () {
  }],
  TYPES_EXCEPT_ARRAY: ['string', 123, 123.123, null, undefined, {}, true, false, function () {
  }],
  TYPES_EXCEPT_STRING_OR_ARRAY_OR_NUMBER: [null, undefined, {}, true, false, function () {
  }],
  TYPES_EXCEPT_NUMBER: ['string', null, undefined, {}, [], true, false, function () {
  }],
  TYPES_EXCEPT_OBJECT: ['string', 123, 123.123, null, undefined, true, false, function () {
  }],
  TYPES_EXCEPT_BOOLEAN: ['string', 123, 123.123, null, undefined, {}, [], function () {
  }],
  TYPES_EXCEPT_FUNCTION: ['string', 123, 123.123, null, undefined, {}, [], true, false],
  assert: assert,
  sinon: sinon,
  store: undefined,
  http: http
};

var test = new mocha();

var testGlobals = [];

beforeEach(function () {
  globals.queryTransform = queryTransform = function (resourceName, query) {
    queryTransform.callCount += 1;
    return query;
  };

  globals.DSUtils = DSUtils = JSData.DSUtils;
  datastore = new JSData.DS();

  globals.User = User = datastore.defineResource('user');
  globals.Post = Post = datastore.defineResource({
    name: 'posts',
    basePath: 'api'
  });
  globals.dsHttpAdapter = dsHttpAdapter = new DSHttpAdapter({
    queryTransform: queryTransform,
    http: require('axios'),
    basePath: 'http://localhost:4444/'
  });
  datastore.registerAdapter('http', dsHttpAdapter, { default: true });

  queryTransform.callCount = 0;

  globals.p1 = p1 = { author: 'John', age: 30, id: 5 };
  globals.p2 = p2 = { author: 'Sally', age: 31, id: 6 };
  globals.p3 = p3 = { author: 'Mike', age: 32, id: 7 };
  globals.p4 = p4 = { author: 'Adam', age: 33, id: 8 };
  globals.p5 = p5 = { author: 'Adam', age: 33, id: 9 };

  for (var key in globals) {
    global[key] = globals[key];
    testGlobals.push(globals[key]);
  }
  test.globals(testGlobals);
});
