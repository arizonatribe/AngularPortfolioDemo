(function() {
  'use strict';

  describe('Testing Shared module exists', function() {
    var sharedModule;

    beforeEach(function() {
      sharedModule = angular.module('folio.shared');
    });

    it('Should be registered', function() {
      expect(sharedModule).toBeDefined();
    });
  });

  describe('Testing underscore mixins', function() {
    var _, _s, fakeData,
            fakeObject = {
              myString: 'test sentence',
              myNumber: 101,
              myBoolean: true,
              myArray: ['lorem', 'ipsum', 'dolor', 'sit', 'amet']
            },
            fakeLargeObject = {
              myUndefined: undefined,
              myNull: null,
              myString: 'test sentence',
              myEmptyString: '',
              myNumber: 101,
              myBoolean: true,
              myArray: ['lorem', 'ipsum', 'dolor', 'sit', 'amet'],
              myEmptyArray: [],
              myNestedObject: {
                myNestedProperty: true,
                myNestedBlankProperty: ''
              },
              myEmptyNestedObject: {},
              myDate: new Date(),
              myFunction: function() {
                return;
              }
            };

    beforeEach(module('folio.unit-testing.fakeData'));
    beforeEach(module('folio.shared'));

    beforeEach(inject(function($injector, _fakeData_) {
      _ = $injector.get('_');
      _s = $injector.get('_s');
      fakeData = _fakeData_;
    }));

    it('Should be registered', function() {
      expect(_).toBeDefined();
    });

    it('Should include several methods', function() {
      expect(_.coalesce).toBeDefined();
      expect(_.isNullOrUndefined).toBeDefined();
      expect(_.generateUUID).toBeDefined();
      expect(_.isBadGuid).toBeDefined();
      expect(_.makeInconsistentGuidsUniform).toBeDefined();
      expect(_.updateObject).toBeDefined();
      expect(_.cleanupObject).toBeDefined();
      expect(_.fullClone).toBeDefined();
      expect(_.isEmptyField).toBeDefined();
      expect(_.isRealObject).toBeDefined();
      expect(_.objectToURI).toBeDefined();
      expect(_.objectToParam).toBeDefined();
      expect(_.randomString).toBeDefined();
    });

    it('Should coalesce successfully', function() {
      expect(_.coalesce()).toBeNull();
      expect(_.coalesce(undefined, null)).toBeNull();
      expect(_.coalesce('a')).toEqual('a');
      expect(_.coalesce({prop: 'a'})).toEqual({prop: 'a'});
      expect(_.coalesce(null, {prop: 'a'})).toEqual({prop: 'a'});
      expect(_.coalesce('a', {prop: 'a'})).toEqual('a');
    });

    it('Should test for null or undefined values', function() {
      var testVal;

      // Expecting to be evaluated as null/undefined
      expect(_.isNullOrUndefined(null)).toBeTruthy();
      expect(_.isNullOrUndefined(undefined)).toBeTruthy();
      expect(_.isNullOrUndefined(testVal)).toBeTruthy();

      // Expecting to be evaluated as NOT null/undefined
      expect(_.isNullOrUndefined('A value')).toBeFalsy();
      expect(_.isNullOrUndefined({})).toBeFalsy();
      expect(_.isNullOrUndefined({val: 'A value'})).toBeFalsy();
    });

    it('Should generate proper guids', function() {
      var numberOfTests = 200;

      while (numberOfTests) {
        expect(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(_.generateUUID())).toBeTruthy();
        numberOfTests--;
      }
    });

    it('Should verify a guid with hyphens', function() {
      expect(_.isBadGuid('79706600-2c79-47d3-91af-d7fcf61800c9')).toBeTruthy();
    });

    it('Should de-hyphenate and object with hyphenated guids', function() {
      var testItems = _.fullClone(fakeData.fakeItems),
          checkField = function(field) {
            expect(_.isBadGuid(field)).toBeFalsy();
          },
          checkObject = function(obj) {
            if (obj instanceof Object) {
              Object.getOwnPropertyNames(obj).forEach(function(val) {
                  if (obj[val] instanceof Array) {
                    checkArray(obj[val]);
                  } else if (obj[val] instanceof Object && !(obj[val] instanceof Function)) {
                    checkObject(obj[val]);
                  } else {
                    checkField(obj[val]);
                  }
                });
            }
          },
          checkArray = function(arr) {
            if (arr instanceof Array) {
              arr.forEach(function(val) {
                  if (val instanceof Array) {
                    checkArray(val);
                  } else if (val instanceof Object && !(val instanceof Function)) {
                    checkObject(val);
                  } else {
                    checkField(val);
                  }
                });
            }
          };

      testItems.forEach(function(value) {
        _.makeInconsistentGuidsUniform(value);
      });
      checkArray(testItems);
    });

    it('Should de-hyphenate an array of hyphenated guids', function() {
      var testItemIds = _.pluck(fakeData.fakeItems, 'ItemId'),
          checkField = function(field) {
            expect(_.isBadGuid(field)).toBeFalsy();
          },
          checkObject = function(obj) {
            if (obj instanceof Object) {
              Object.getOwnPropertyNames(obj).forEach(function(val) {
                  if (obj[val] instanceof Array) {
                    checkArray(obj[val]);
                  } else if (obj[val] instanceof Object) {
                    checkObject(obj[val]);
                  } else {
                    checkField(obj[val]);
                  }
                });
            } else if (obj instanceof Array) {
              checkArray(obj);
            } else if (typeof obj === 'string') {
              checkField(obj);
            }
          },
          checkArray = function(arr) {
            if (arr instanceof Array) {
              arr.forEach(function(val) {
                  if (val instanceof Object) {
                    checkObject(val);
                  } else {
                    checkField(val);
                  }
                });
            }
          };

      _.makeInconsistentGuidsUniform(testItemIds);
      checkArray(testItemIds);
    });

    it('Should overwrite the properties on one object with those from another', function() {
      var originalObject = _.fullClone(fakeData.fakeItems[0]),
          newObject = _.fullClone(fakeData.fakeItems[1]);

      expect(originalObject).not.toEqual(newObject);
      _.updateObject(originalObject, newObject);
      expect(originalObject).toEqual(newObject);
    });

    it('Should preserve the unique properties from original', function() {
      var originalObject = _.fullClone(fakeData.fakeItems[0]),
          newObject = _.fullClone(fakeData.fakeItems[1]);

      expect(originalObject).not.toEqual(newObject);

      originalObject.TestProperty = 'test';
      _.updateObject(originalObject, newObject, true);
      expect(originalObject).not.toEqual(newObject);
      expect(originalObject.TestProperty).toBeDefined();
    });

    it('Should overwrite the unique properties from original', function() {
      var originalObject = _.fullClone(fakeData.fakeItems[0]),
          newObject = _.fullClone(fakeData.fakeItems[1]);

      expect(originalObject).not.toEqual(newObject);

      originalObject.TestProperty = 'test';
      _.updateObject(originalObject, newObject);
      expect(originalObject).toEqual(newObject);
      expect(originalObject.TestProperty).toBeUndefined();
    });

    it('Should generate a random string of the specified length', function() {
      // Make sure we don't have a blank string now that we did specify the length
      expect(_.randomString(10)).not.toEqual('');

      // Make sure it generated as many characters as we asked for
      expect(_.randomString(20000).length).toEqual(20000);

      // Make sure it is a string
      expect(typeof _.randomString()).toEqual('string');

      // Make sure the random string is alpha-numeric
      expect(/^[0-9a-z]{200}$/i.test(_.randomString(200))).toBeTruthy();
    });

    it('Should fail to generate a random string if length is not specified', function() {
      expect(_.randomString()).toEqual('');
    });

    it('Should fail to generate a random string if specified length is not a valid number', function() {
      expect(_.randomString(null)).toEqual('');
      expect(_.randomString('abc')).toEqual('');
      expect(_.randomString(true)).toEqual('');
      expect(_.randomString({})).toEqual('');
      expect(_.randomString([])).toEqual('');
      expect(_.randomString(function() {
        return null;
      })).toEqual('');
    });

    it('Should fall back to the default alpha-numeric charset for the random string if specified charset does not represent a string or number', function() {
      expect(/^[0-9a-z]{10}$/i.test(_.randomString(10, null))).toBeTruthy();
      expect(/^[0-9a-z]{10}$/i.test(_.randomString(10, true))).toBeTruthy();
      expect(/^[0-9a-z]{10}$/i.test(_.randomString(10, {}))).toBeTruthy();
      expect(/^[0-9a-z]{10}$/i.test(_.randomString(10, []))).toBeTruthy();
      expect(/^[0-9a-z]{10}$/i.test(_.randomString(10, function() {
        return null;
      }))).toBeTruthy();
    });

    it('Should be flexible in generating a random number of a specified "length"', function() {
      var randomNumber = _.randomString(200, 9876543210);
      expect(/[+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?/.test(randomNumber)).toBeTruthy();
      expect(typeof randomNumber).toEqual('number');
    });

    it('Should fall back to the default alpha-numeric charset if zero is passed in as a char set', function() {
      expect(/^[0-9a-z]{200}$/i.test(_.randomString(200, 0))).toBeTruthy();
    });

    it('Should be flexible in generating a random negative number of a specified "length"', function() {
      var randomNumber = _.randomString(200, -9876543210);
      expect(/[+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?/.test(randomNumber)).toBeTruthy();
      expect(typeof randomNumber).toEqual('number');
    });

    it('Should generate a random string from the character set specified', function() {
      // Make sure it uses our character set now that we overrode the default alpha numeric set
      expect(/^[01rEm]{10}$/.test(_.randomString(10, '10rEm'))).toBeTruthy();
    });

    it('Should transform an object into a URI string', function() {
      var testObjString = 'myString=test sentence&myNumber=101&myBoolean=true&myArray=[lorem,ipsum,dolor,sit,amet]',
          testObjEncString = 'myString=test%20sentence&myNumber=101&myBoolean=true&myArray=%5Blorem%2Cipsum%2Cdolor%2Csit%2Camet%5D';

      expect(_.objectToURI(fakeObject)).toEqual(testObjEncString);
      expect(_.objectToURI(fakeObject, true)).toEqual(testObjString);
      expect(_.objectToURI('not an object')).toEqual('');
      expect(_.objectToURI(['not', 'an', 'object'], true)).toEqual('');
    });

    it('Should serialize an object into an encoded json string', function() {
      var testObjEncString = '%7BmyString%3A%22test%20sentence%22%2CmyNumber%3A101%2CmyBoolean%3Atrue%2CmyArray%3A%5B%22lorem%22%2C%22ipsum%22%2C%22dolor%22%2C%22sit%22%2C%22amet%22%5D%7D',
          testObjString = '{myString:"test sentence",myNumber:101,myBoolean:true,myArray:["lorem","ipsum","dolor","sit","amet"]}';

      expect(_.objectToParam(fakeObject, true)).toEqual(testObjString);
      expect(_.objectToParam(fakeObject)).toEqual(testObjEncString);
      expect(_.objectToParam('not an object')).toEqual('');
    });

    it('Should verify object key retrieval', function() {
      expect(_.keys(fakeLargeObject)).toEqual([
          'myUndefined',
          'myNull',
          'myString',
          'myEmptyString',
          'myNumber',
          'myBoolean',
          'myArray',
          'myEmptyArray',
          'myNestedObject',
          'myEmptyNestedObject',
          'myDate',
          'myFunction'
      ]);
    });

    it('Should verify object values retrieval', function() {
      expect(_.values(fakeLargeObject)).toEqual([
          fakeLargeObject.myUndefined,
          fakeLargeObject.myNull,
          fakeLargeObject.myString,
          fakeLargeObject.myEmptyString,
          fakeLargeObject.myNumber,
          fakeLargeObject.myBoolean,
          fakeLargeObject.myArray,
          fakeLargeObject.myEmptyArray,
          fakeLargeObject.myNestedObject,
          fakeLargeObject.myEmptyNestedObject,
          fakeLargeObject.myDate,
          fakeLargeObject.myFunction
      ]);
    });

    it('Should verify object key/value pair retrieval', function() {
      expect(_.pairs(fakeLargeObject)).toEqual([
          ['myUndefined', fakeLargeObject.myUndefined],
          ['myNull', fakeLargeObject.myNull],
          ['myString', fakeLargeObject.myString],
          ['myEmptyString', fakeLargeObject.myEmptyString],
          ['myNumber', fakeLargeObject.myNumber],
          ['myBoolean', fakeLargeObject.myBoolean],
          ['myArray', fakeLargeObject.myArray],
          ['myEmptyArray', fakeLargeObject.myEmptyArray],
          ['myNestedObject', fakeLargeObject.myNestedObject],
          ['myEmptyNestedObject', fakeLargeObject.myEmptyNestedObject],
          ['myDate', fakeLargeObject.myDate],
          ['myFunction', fakeLargeObject.myFunction]
      ]);
    });

    it('Should verify object omitting null and/or undefined values', function() {
      expect(_.keys(_.omit(fakeLargeObject, function(val) {
        return _.isNullOrUndefined(val);
      }))).toEqual([
          'myString',
          'myEmptyString',
          'myNumber',
          'myBoolean',
          'myArray',
          'myEmptyArray',
          'myNestedObject',
          'myEmptyNestedObject',
          'myDate',
          'myFunction'
      ]);
    });

    it('Should verify object omitting empty string values', function() {
      expect(_.keys(_.omit(fakeLargeObject, function(val) {
        return _.isString(val) && _.isEmpty(val);
      }))).toEqual([
          'myUndefined',
          'myNull',
          'myString',
          'myNumber',
          'myBoolean',
          'myArray',
          'myEmptyArray',
          'myNestedObject',
          'myEmptyNestedObject',
          'myDate',
          'myFunction'
      ]);
    });

    it('Should verify object omitting nested functions', function() {
      expect(_.keys(_.omit(fakeLargeObject, function(val) {
        return _.isFunction(val);
      }))).toEqual([
          'myUndefined',
          'myNull',
          'myString',
          'myEmptyString',
          'myNumber',
          'myBoolean',
          'myArray',
          'myEmptyArray',
          'myNestedObject',
          'myEmptyNestedObject',
          'myDate'
      ]);
    });

    it('Should verify object omitting boolean values', function() {
      expect(_.keys(_.omit(fakeLargeObject, function(val) {
        return _.isBoolean(val);
      }))).toEqual([
          'myUndefined',
          'myNull',
          'myString',
          'myEmptyString',
          'myNumber',
          'myArray',
          'myEmptyArray',
          'myNestedObject',
          'myEmptyNestedObject',
          'myDate',
          'myFunction'
      ]);
    });

    it('Should verify object omitting numeric values', function() {
      expect(_.keys(_.omit(fakeLargeObject, function(val) {
        return _.isNumber(val);
      }))).toEqual([
          'myUndefined',
          'myNull',
          'myString',
          'myEmptyString',
          'myBoolean',
          'myArray',
          'myEmptyArray',
          'myNestedObject',
          'myEmptyNestedObject',
          'myDate',
          'myFunction'
      ]);
    });

    it('Should verify object omitting date values', function() {
      expect(_.keys(_.omit(fakeLargeObject, function(val) {
        return _.isDate(val);
      }))).toEqual([
          'myUndefined',
          'myNull',
          'myString',
          'myEmptyString',
          'myNumber',
          'myBoolean',
          'myArray',
          'myEmptyArray',
          'myNestedObject',
          'myEmptyNestedObject',
          'myFunction'
      ]);
    });

    it('Should verify object omitting all empty values', function() {
      expect(_.keys(_.omit(fakeLargeObject, function(val) {
        return _.isEmpty(val);
      }))).toEqual([
          'myString',
          'myArray',
          'myNestedObject'
      ]);
    });

    it('Should verify object omitting empty strings/arrays, null/undefined values, or unknown enums', function() {
      var clonedObj = _.fullClone(fakeLargeObject);

      expect(clonedObj).toBeDefined();
      expect(clonedObj).not.toBeNull();

      clonedObj.myUnknownEnum = 'UNKNOWN';
      _.cleanupObject(clonedObj);
      expect(_.keys(clonedObj)).toEqual([
          'myString',
          'myNumber',
          'myBoolean',
          'myArray',
          'myNestedObject',
          'myDate',
          'myFunction'
      ]);
    });

    it('Should verify object empty field checking', function() {
      for (var i in fakeLargeObject) {
        if (_.has(fakeLargeObject, i)) {
          switch (i) {
            case 'myUndefined':
              expect(_.isEmptyField(fakeLargeObject[i])).toBeTruthy();
              break;
            case 'myNull':
              expect(_.isEmptyField(fakeLargeObject[i])).toBeTruthy();
              break;
            case 'myString':
              expect(_.isEmptyField(fakeLargeObject[i])).toBeFalsy();
              break;
            case 'myEmptyString':
              expect(_.isEmptyField(fakeLargeObject[i])).toBeTruthy();
              break;
            case 'myNumber':
              expect(_.isEmptyField(fakeLargeObject[i])).toBeFalsy();
              break;
            case 'myBoolean':
              expect(_.isEmptyField(fakeLargeObject[i])).toBeFalsy();
              break;
            case 'myArray':
              expect(_.isEmptyField(fakeLargeObject[i])).toBeFalsy();
              break;
            case 'myEmptyArray':
              expect(_.isEmptyField(fakeLargeObject[i])).toBeTruthy();
              break;
            case 'myNestedObject':
              expect(_.isEmptyField(fakeLargeObject[i])).toBeFalsy();
              break;
            case 'myEmptyNestedObject':
              expect(_.isEmptyField(fakeLargeObject[i])).toBeTruthy();
              break;
            case 'myDate':
              expect(_.isEmptyField(fakeLargeObject[i])).toBeFalsy();
              break;
            case 'myFunction':
              expect(_.isEmptyField(fakeLargeObject[i])).toBeFalsy();
              break;
          }
        }
      }
    });

    it('Should verify checking real objects', function() {
      for (var i in fakeLargeObject) {
        if (_.has(fakeLargeObject, i)) {
          switch (i) {
            case 'myUndefined':
              expect(_.isRealObject(fakeLargeObject[i])).toBeFalsy();
              break;
            case 'myNull':
              expect(_.isRealObject(fakeLargeObject[i])).toBeFalsy();
              break;
            case 'myString':
              expect(_.isRealObject(fakeLargeObject[i])).toBeFalsy();
              break;
            case 'myEmptyString':
              expect(_.isRealObject(fakeLargeObject[i])).toBeFalsy();
              break;
            case 'myNumber':
              expect(_.isRealObject(fakeLargeObject[i])).toBeFalsy();
              break;
            case 'myBoolean':
              expect(_.isRealObject(fakeLargeObject[i])).toBeFalsy();
              break;
            case 'myArray':
              expect(_.isRealObject(fakeLargeObject[i])).toBeFalsy();
              break;
            case 'myEmptyArray':
              expect(_.isRealObject(fakeLargeObject[i])).toBeFalsy();
              break;
            case 'myNestedObject':
              expect(_.isRealObject(fakeLargeObject[i])).toBeTruthy();
              break;
            case 'myEmptyNestedObject':
              expect(_.isRealObject(fakeLargeObject[i])).toBeTruthy();
              break;
            case 'myDate':
              expect(_.isRealObject(fakeLargeObject[i])).toBeFalsy();
              break;
            case 'myFunction':
              expect(_.isRealObject(fakeLargeObject[i])).toBeFalsy();
              break;
          }
        }
      }
    });

    it('Should verify instance of vs underscore type evaluation', function() {
      var obj = {},
          blankString = '',
          nonBlankString = 'string',
                myFunction = function() {
                  return;
                },
                myEmptyArray = [],
                myArray = [1, 2, 3];

      expect(_.isObject(obj)).toBeTruthy();
      expect(_.isObject(blankString)).toBeFalsy();
      expect(_.isObject(nonBlankString)).toBeFalsy();
      expect(_.isObject(myFunction)).toBeTruthy();
      expect(_.isObject(myEmptyArray)).toBeTruthy();
      expect(_.isObject(myArray)).toBeTruthy();

      expect(obj instanceof Object).toBeTruthy();
      expect(blankString instanceof Object).toBeFalsy();
      expect(nonBlankString instanceof Object).toBeFalsy();
      expect(myFunction instanceof Object).toBeTruthy();
      expect(myEmptyArray instanceof Object).toBeTruthy();
      expect(myArray instanceof Object).toBeTruthy();
    });

    it('Should verify simple clone of non-object/array members', function() {
      var testString = 'Abcdefg',
          testStringClone = _.clone(testString);
      testString = 'Hijklmn';

      expect(_.clone(testString)).not.toEqual(testStringClone);
    });

    it('Should verify full of non-object/array members', function() {
      var testClone = {
        prop1: 'yes',
        prop2: {
          prop2a: 'No',
          prop2b: true,
          prop2c: 1,
          prop2d: [
              {prop3: 'deep nested property'},
              {prop4: 'deep property'}
          ],
          prop2e: {
            prop5: 'test',
            prop6: {
              prop7: 'another nested value',
              prop8: [
                  1,
                  2,
                  3,
                  4,
                  5
              ]
            }
          }
        }
      },
      testCloneBrother = _.fullClone(testClone);

      expect(testClone).toEqual(_.fullClone(testClone));

      testClone.prop2.prop2e.prop6.prop8 = [9, 8, 7, 6];
      testClone.prop2.prop2d.push({prop9: 'another deep property'});

      expect(testClone).not.toEqual(testCloneBrother);
    });

    it('Should verify non-full clone of non-object/array members fails', function() {
      var testClone = {
        prop1: 'yes',
        prop2: {
          prop2a: 'No',
          prop2b: true,
          prop2c: 1,
          prop2d: [
              {prop3: 'deep nested property'},
              {prop4: 'deep property'}
          ],
          prop2e: {
            prop5: 'test',
            prop6: {
              prop7: 'another nested value',
              prop8: [
                  1,
                  2,
                  3,
                  4,
                  5
              ]
            }
          }
        }
      },
      testCloneBrother = _.clone(testClone);

      testClone.prop2.prop2e.prop6.prop8 = [9, 8, 7, 6];
      testClone.prop2.prop2d.push({prop9: 'another deep property'});

      expect(testClone).toEqual(testCloneBrother);
    });

    it('Should confirm evaulation of undefined values', function() {
      var val;

      expect(typeof val === 'undefined').toBeTruthy();
      expect(val).toBeFalsy();
    });

    it('Should confirm manual splitting of a string at case change', function() {
      expect(('TitleCase'.replace(/([A-Z]+(?=$|[A-Z][a-z])|[A-Z]?[a-z]+)/g, '$1 ')).replace(/[ \t]+$/, '')).toEqual('Title Case');
    });
  });
})();
