window.utils = (function(exports) { 
	"use strict";

	function partial(func) {
		var slice = Array.prototype.slice;
		var args = slice.call(arguments, 1);
		var innerArgs;

		return function() {
			innerArgs = slice.call(arguments);

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