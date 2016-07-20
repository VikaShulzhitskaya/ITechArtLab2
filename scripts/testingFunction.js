"use strict";

function averageOfEvenNumbers(arr){
	var evenArray = window.utils.filter(arr, isEven);
	var arraySum = window.utils.linear(evenArray, add);

	return  arraySum / evenArray.length;
}

function anyNumberOfParametersMultiplicator(){
	var sum = 0;

	for (var i = 0, length = arguments.length; i < length; i += 1) {
		sum += arguments[i];
	}

	return sum;
}

function anyNumberOfParametersMultiplicatorLinear() {
	var args = Array.prototype.slice.call(arguments);

	return window.utils.linear(args, multiplicate);
}

function greeting(title, name) {
	return "Hello, " + title + " " + name;
}

function sum5(a, b, c, d, e) {
	return a + b + c + d + e;
}

function add(a, b) {
	return a + b;
}

function nameLength(name) {
	return name.length;
}

function multiplicate(a, b){
	return a * b;
}

function isEven(number){
	return number % 2 == 0;
}

