window.utils = (function(exports){

	"use strict";

	function getClass(obj) {
		return Object.prototype.toString.call(obj).slice(8, -1);
	}

	function isArray(obj){
		if(getClass(obj) === 'Array'){
			return true;
		}
		return false;
	}

	function isBoolean(obj){
		if(getClass(obj) === 'Boolean'){
			return true;
		}
		return false;
	}

	function isDate(obj){
		if(getClass(obj) === 'Date'){
			return true;
		}
		return false;
	}

	function isNumber(obj){
		if(getClass(obj) === 'Number'){
			return true;
		}
		return false;
	}

	function isString(obj){
		if(getClass(obj) === 'String'){
			return true;
		}
		return false;
	}

	function isFunction(obj){
		if(getClass(obj) === 'Function'){
			return true;
		}
		return false;
	}

	function isUndefined(obj){
		if(getClass(obj) === 'Undefined'){
			return true;
		}
		return false;
	}

	function isNull(obj){
		if(getClass(obj) === 'Null'){
			return true;
		}
		return false;
	}

	function first(arr){
		if( arr ){
			return arr[0];
		}
		return undefined;
	}

	function last(arr){
		if(arr){
			var length = arr.length;
			if(length){
				return arr[length-1];
			}
		}
		return undefined;
	}

	function skip(arr, number){
		var length = arr.length;
		var part = arr.slice(number,length);

		return part; 
	}

	function take(arr, number){
		var length = arr.length;
		var part = arr.slice(0,number);
		return part;
	}

	function asChain(arr){
		var array = arr.slice();
		return{
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
	exports.first = first;
	exports.last = last;
	exports.skip = skip;
	exports.take = take;
	exports.asChain = asChain;

	return exports;


})({});