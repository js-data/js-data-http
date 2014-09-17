// Setup global test variables
var dsHttpAdapter, User;

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
  User = {
    relationFields: [],
    class: 'User',
    idAttribute: 'id'
  };
  dsHttpAdapter = new DSHttpAdapter();
});
