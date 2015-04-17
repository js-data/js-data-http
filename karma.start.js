// Setup global test variables
var dsHttpAdapter, User, Post, datastore, DSUtils, queryTransform, p1, p2, p3, p4, p5;

// Helper globals
var fail = function (msg) {
  if (msg instanceof Error) {
    console.log(msg.stack);
  } else {
    assert.equal('should not reach this!: ' + msg, 'failure');
  }
};
var TYPES_EXCEPT_STRING = [123, 123.123, null, undefined, {}, [], true, false, function () {
}];
var TYPES_EXCEPT_STRING_OR_ARRAY = [123, 123.123, null, undefined, {}, true, false, function () {
}];
var TYPES_EXCEPT_STRING_OR_OBJECT = [123, 123.123, null, undefined, [], true, false, function () {
}];
var TYPES_EXCEPT_STRING_OR_NUMBER_OBJECT = [null, undefined, [], true, false, function () {
}];
var TYPES_EXCEPT_ARRAY = ['string', 123, 123.123, null, undefined, {}, true, false, function () {
}];
var TYPES_EXCEPT_STRING_OR_NUMBER = [null, undefined, {}, [], true, false, function () {
}];
var TYPES_EXCEPT_STRING_OR_ARRAY_OR_NUMBER = [null, undefined, {}, true, false, function () {
}];
var TYPES_EXCEPT_NUMBER = ['string', null, undefined, {}, [], true, false, function () {
}];
var TYPES_EXCEPT_OBJECT = ['string', 123, 123.123, null, undefined, true, false, function () {
}];
var TYPES_EXCEPT_BOOLEAN = ['string', 123, 123.123, null, undefined, {}, [], function () {
}];
var TYPES_EXCEPT_FUNCTION = ['string', 123, 123.123, null, undefined, {}, [], true, false];

// Setup before each test
beforeEach(function () {
  var JSData;
  if (!window && typeof module !== 'undefined' && module.exports) {
    JSData = require('js-data');
  } else {
    JSData = window.JSData;
  }

  queryTransform = function (resourceName, query) {
    queryTransform.callCount += 1;
    return query;
  };

  DSUtils = JSData.DSUtils;
  datastore = new JSData.DS();

  User = datastore.defineResource('user');
  Post = datastore.defineResource({
    name: 'posts',
    basePath: 'api'
  });
  dsHttpAdapter = new DSHttpAdapter({
    queryTransform: queryTransform
  });
  datastore.registerAdapter('http', dsHttpAdapter, { default: true });

  queryTransform.callCount = 0;

  p1 = { author: 'John', age: 30, id: 5 };
  p2 = { author: 'Sally', age: 31, id: 6 };
  p3 = { author: 'Mike', age: 32, id: 7 };
  p4 = { author: 'Adam', age: 33, id: 8 };
  p5 = { author: 'Adam', age: 33, id: 9 };

  try {
    this.xhr = sinon.useFakeXMLHttpRequest();
    // Create an array to store requests
    var requests = this.requests = [];
    // Keep references to created requests
    this.xhr.onCreate = function (xhr) {
      requests.push(xhr);
    };
  } catch (err) {
    console.error(err);
  }
});

afterEach(function () {
  // Restore the global timer functions to their native implementations
  try {
    this.xhr.restore();
  } catch (err) {
    console.error(err);
  }
});
