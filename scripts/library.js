window.utils = (function (exports) {
  "use strict";

  function partial(func) {
    var slice = Array.prototype.slice;
    var args = slice.call(arguments, 1);

    return function () {
      var innerArgs = slice.call(arguments);

      return func.apply(null, args.concat(innerArgs));
    };
  }

  function curring(func) {
    var expectedArgsCount = func.length;
    var params = [];

    return function repeater(arg) {
      params.push(arg);

      if (params.length >= expectedArgsCount) {
        return func.apply(null, params);
      }
      return repeater;
    };
  }

  function linear(arr, func, initVal) {
    var currentVal;
    var i;

    if (initVal === undefined) {
      initVal = arr[0];
      i = 1;
    } else {
      i = 0;
    }
    for (i, length = arr.length; i < length; i += 1) {
      currentVal = arr[i];
      initVal = func(initVal, currentVal, i, arr);
    }

    return initVal;
  }

  function map(arr, func) {
    var returnedArray = [];

    for (var i = 0, length = arr.length; i < length; i += 1) {
      returnedArray.push(func(arr[i], i, arr));
    }

    return returnedArray;
  }

  function filter(arr, func) {
    var filteredArray = [];

    for (var i = 0, length = arr.length; i < length; i += 1) {
      if (func(arr[i], i, arr)) {
        filteredArray.push(arr[i]);
      }
    }

    return filteredArray;
  }

  function lazy(func) {
    var args = Array.prototype.slice.call(arguments, 1);

    return function () {
      return func.apply(null, args);
    };
  }

  function memoization(func) {
    var cacheMap = {};

    return function () {
      var key = JSON.stringify(arguments);
      if (cacheMap[key]) {
        return cacheMap[key];
      }
      return cacheMap[key] = func.apply(null, arguments);
    };
  }

  function inherit(Child, Parent) {
    Child.prototype = Object.create(Parent.prototype);
    Child.prototype.constructor = Child;
    Child._super = Parent;
  }

  function getClass(value) {
    return Object.prototype.toString.call(value).slice(8, -1);
  }

  function isArray(value) {
    return getClass(value) === 'Array';
  }

  function isBoolean(value) {
    return getClass(value) === 'Boolean';
  }

  function isDate(value) {
    return getClass(value) === 'Date';
  }

  function isNumber(value) {
    return getClass(value) === 'Number';
  }

  function isString(value) {
    return getClass(value) === 'String';
  }

  function isFunction(value) {
    return getClass(value) === 'Function';
  }

  function isUndefined(value) {
    return getClass(value) === 'Undefined';
  }

  function isNull(value) {
    return getClass(value) === 'Null';
  }

  function isObject(value) {
    return !isNull(value) && (typeof (value) === 'object');
  }

  function first(arr) {
    if (arr) {
      return arr[0];
    }
  }

  function last(arr) {
    if (arr && arr.length) {
      return arr[arr.length - 1];
    }
  }

  function skip(arr, number) {
    return arr.slice(number);
  }

  function take(arr, number) {
    return arr.slice(0, number);
  }

  function asChain(arr) {
    var array = arr.slice();
    return {
      skip: function (number) {
        array = skip(array, number);
        return this;
      },
      take: function (number) {
        array = take(array, number);
        return this;
      },
      getValue() {
        return array;
      }
    };
  }

  function Node(key, val, path) {
    this.key = key;
    this.val = val;
    this.path = path;
  }

  // bypassing the object in width

  function traverseWidth(obj, callback) {
    var queue = [new Node(null, obj, null)];

    while (queue.length) {
      var node = queue.shift();

      if (isObject(node.val)) {
        var keys = Object.keys(node.val);
        var value = node.val;

        for (var i = 0, length = keys.length; i < length; i += 1) {
          var path = [];

          if (node.path) {
            path.push.apply(path, node.path);
          }

          path.push(node.key);
          queue.push(new Node(keys[i], value[keys[i]], path));
        }
      } else {
        callback(node.key, node.val, node.path);
      }
    }
  }

  // bypassing the object in depth

  function traverseDepth(obj, callback) {
    depthFirst((new Node(null, obj, null)), callback);
  }

  function depthFirst(node, callback) {
    var keys = Object.keys(node.val);
    var value = node.val;

    for (var i = 0, length = keys.length; i < length; i += 1) {
      var path = [];

      if (node.path) {
        path.push.apply(path, node.path);
      }

      path.push(node.key);
      if (isObject(value[keys[i]])) {
        depthFirstSearch((new Node(keys[i], value[keys[i]], path)), callback);
      } else {
        callback(keys[i], value[keys[i]], path);
      }
    }
  }

  //deep comparison of two objects

  function deepCompare(firstObj, secondObject) {
    if (!isObject(firstObj) && !isObject(secondObject)) {

      return firstObj === secondObject;
    } else {
      var isEqual = true;
      var keysFirstObj = Object.keys(firstObj);
      var keysSecondObject = Object.keys(secondObject);

      if (keysFirstObj.length != keysSecondObject.length) {
        return false;
      }

      for (var i = 0, length = keysFirstObj.length; i < length; i += 1) {
        if (!isEqual) {
          break;
        }

        if (secondObject.hasOwnProperty(keysFirstObj[i])) {
          isEqual = deepCompare(firstObj[keysFirstObj[i]], secondObject[keysFirstObj[i]]);
        } else {
          isEqual = false;
        }
      }

      return isEqual;
    }
  }

  //deep clone of two object

  function deepClone(obj) {
    var newObj = isArray(obj) ? [] : {};

    if (!isObject(obj)) {
      newObj = obj;
    } else {

      var keys = Object.keys(obj);

      for (var i = 0, length = keys.length; i < length; i += 1) {
        if (isObject(obj[keys[i]])) {
          newObj[keys[i]] = deepClone(obj[keys[i]]);
        } else {
          newObj[keys[i]] = obj[keys[i]];
        }
      }
    }

    return newObj;
  }

  exports.isArray = isArray;
  exports.isBoolean = isBoolean;
  exports.isDate = isDate;
  exports.isNumber = isNumber;
  exports.isString = isString;
  exports.isFunction = isFunction;
  exports.isUndefined = isUndefined;
  exports.isNull = isNull;
  exports.isObject = isObject;
  exports.first = first;
  exports.last = last;
  exports.skip = skip;
  exports.take = take;
  exports.asChain = asChain;
  exports.partial = partial;
  exports.curring = curring;
  exports.inherit = inherit;
  exports.linear = linear;
  exports.map = map;
  exports.filter = filter;
  exports.lazy = lazy;
  exports.memoization = memoization;
  exports.traverseWidth = traverseWidth;
  exports.traverseDepth = traverseDepth;
  exports.deepCompare = deepCompare;
  exports.deepClone = deepClone;

  return exports;

})({});