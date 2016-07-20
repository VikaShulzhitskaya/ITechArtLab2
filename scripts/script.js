"use strict";

var sayHiTo = utils.partial(greeting, "Ms");

alert(sayHiTo("Ann")); 
sayHiTo("Jane");

var curringFunction = utils.curring(sum5);
curringFunction(1)(2)(3)(4)(5);

var linearFunction = utils.linear([2,9,12], add, 2);

var mapFunction = utils.map(["Apple","Banana","JS"], nameLength);

var multiplicationResult = anyNumberOfParametersMultiplicatorLinear(1, 2, 3, 4, 5, 6, 7);

var averageOfEvenNumbers = averageOfEvenNumbers([1, 23, 2, 6, 12, 0]);

var lazyFunction = utils.lazy(sum5, 1, 2, 3, 4, 8);

lazyFunction();

var memoizationFactorial = utils.memoization(function (n) {
	return n ? n * memoizationFactorial(n-1) : 1;
});

function Shape(name){
	this.name = name;
}

Shape.prototype.calculatePerimeter = function(a, b){
	return 2 * (a + b);
}

Shape.prototype.calculateArea = function(a, b){
	return a * b;
}

function Rectangle(name, width, height){
	Rectangle._super.call(this, name);
	this.width = width;
	this.height = height;
}

window.utils.inherit(Rectangle, Shape);

Rectangle.prototype.calculatePerimeter = function(){
	return Shape.prototype.calculatePerimeter.call(this, this.width, this.height);
}

Rectangle.prototype.calculateArea = function(){
	return Shape.prototype.calculateArea.call(this, this.width, this.height);
}

function Square(name, sideLen){
	Square._super.call(this, name);
	this.sideLength = sideLen;
}

window.utils.inherit(Square, Shape);

Square.prototype.calculatePerimeter = function(){
	return Shape.prototype.calculatePerimeter.call(this, this.sideLength, this.sideLength);
}

Square.prototype.calculateArea = function(){
	return Shape.prototype.calculateArea.call(this, this.sideLength, this.sideLength);
}

var rect1 = new Rectangle("Rectangle1",4,5);
var rect2 = new Rectangle("Rectangle2",6,5);
var rect3 = new Rectangle("Rectangle3",2,10);
var sq1  = new Square("Square1",3);


function ShapeStore(){
	this.store = [];
}

ShapeStore.prototype.addObj = function(object){
	this.store.push(object);
}

ShapeStore.prototype.calculateTotalPerimeter = function(){
	var perimeter = 0;

	for (var i = 0, length = this.store.length; i < length; i += 1) {
		if(this.store[i] instanceof Rectangle){
			perimeter += this.store[i].calculatePerimeter();
		}
	}

	return perimeter;
}

ShapeStore.prototype.calculateTotalArea = function(){
	var area = 0;

	for (var i = 0, length = this.store.length; i < length; i += 1) {
		if(this.store[i] instanceof Square){
			area += this.store[i].calculateArea();
		}
	}

	return area;
}

var shapes = new ShapeStore();
shapes.addObj(rect1);
shapes.addObj(rect2);
shapes.addObj(rect3);
shapes.addObj(sq1);

var totalPerimeter = shapes.calculateTotalPerimeter();
var totalArea = shapes.calculateTotalArea();