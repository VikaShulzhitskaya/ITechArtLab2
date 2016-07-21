window.utils = (function(exports) { 
	"use strict";

	function partial(func) {
		var slice = Array.prototype.slice;
		var args = slice.call(arguments, 1);

		return function() {
			var innerArgs = slice.call(arguments);

			return func.apply(null, args.concat(innerArgs));
		};
	}

	function curring(func) {
		var expectedArgsCount = func.length;
		var params = [];

		return function repeater(arg) {
			params.push(arg);

			if(params.length >= expectedArgsCount) {
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
			initVal = func(initVal, currentVal , i, arr);
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
			if(func(arr[i], i, arr)){
				filteredArray.push(arr[i]);
			}
		}

		return filteredArray;
	}

	function lazy(func){
		var args = Array.prototype.slice.call(arguments, 1);

		return function() {
			return func.apply(null, args);
		};
	}

	function memoization(func){
		var cacheMap = {};

		return function () {
			var key = JSON.stringify(arguments);
			if(cacheMap[key]){
				return cacheMap[key];
			}
			return cacheMap[key] = func.apply(null, arguments);
		};
	}

	function inherit(Child, Parent){
		Child.prototype = Object.create(Parent.prototype);
		Child.prototype.constructor = Child;
		Child._super = Parent;
	}

	function getClass(value) {
		return Object.prototype.toString.call(value).slice(8, -1);
	}

	function isArray(value){
		return getClass(value) === 'Array';
	}

	function isBoolean(value){
		return getClass(value) === 'Boolean';
	}

	function isDate(value){
		return getClass(value) === 'Date';
	}

	function isNumber(value){
		return getClass(value) === 'Number';
	}

	function isString(value){
		return getClass(value) === 'String';
	}

	function isFunction(value){
		return getClass(value) === 'Function';
	}

	function isUndefined(value){
		return getClass(value) === 'Undefined';
	}

	function isNull(value){
		return getClass(value) === 'Null';
	}

	function isObject(value){
		return !isNull(value) && (typeof(value) === 'object');
	}

	function first(arr){
		if( arr ){
			return arr[0];
		}
	}

	function last(arr){
		if(arr && arr.length){
			return arr[arr.length - 1];
		}
	}

	function skip(arr, number){
		return arr.slice(number); 
	}

	function take(arr, number){
		return arr.slice(0,number);
	}

	function asChain(arr){
		var array = arr.slice();
		return {
			skip: function(number){
				array = skip(array,number);
				return this;
			},
			take: function(number){
				array = take(array,number);
				return this;
			},
			getValue(){
				return array;
			}
		};
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

	return exports;
})({});