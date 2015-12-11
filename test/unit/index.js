/* global JSData:true */
import {assert} from 'chai'

assert.objectsEqual = function (a, b, msg) {
  assert.deepEqual(
    JSON.parse(JSON.stringify(a)),
    JSON.parse(JSON.stringify(b)),
    msg || 'Expected objects or arrays to be equal'
  )
}

assert.fail = function (msg) {
  assert.equal(`should not reach this!: ${msg}`, 'failure')
}

export function init () {
  describe('DSHttpAdapter', function () {
    it('has all the right exports', function () {
      assert.isFunction(DSHttpAdapter.addAction, 'has the addAction decorator')
      assert.isFunction(DSHttpAdapter.addActions, 'has the addActions decorator')
      assert.isObject(DSHttpAdapter.version, 'has a version')
    })
  })
}

export const TYPES_EXCEPT_STRING = [123, 123.123, null, undefined, {}, [], true, false, function () {}]
export const TYPES_EXCEPT_STRING_OR_ARRAY = [123, 123.123, null, undefined, {}, true, false, function () {}]
export const TYPES_EXCEPT_STRING_OR_NUMBER = [null, undefined, {}, [], true, false, function () {}]
export const TYPES_EXCEPT_STRING_OR_OBJECT = [123, 123.123, null, undefined, [], true, false, function () {}]
export const TYPES_EXCEPT_STRING_OR_NUMBER_OBJECT = [null, undefined, [], true, false, function () {}]
export const TYPES_EXCEPT_ARRAY = ['string', 123, 123.123, null, undefined, {}, true, false, function () {}]
export const TYPES_EXCEPT_STRING_OR_ARRAY_OR_NUMBER = [null, undefined, {}, true, false, function () {}]
export const TYPES_EXCEPT_NUMBER = ['string', null, undefined, {}, [], true, false, function () {}]
export const TYPES_EXCEPT_OBJECT = ['string', 123, 123.123, null, undefined, true, false, function () {}]
export const TYPES_EXCEPT_BOOLEAN = ['string', 123, 123.123, null, undefined, {}, [], function () {}]
export const TYPES_EXCEPT_FUNCTION = ['string', 123, 123.123, null, undefined, {}, [], true, false]
