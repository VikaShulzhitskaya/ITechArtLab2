var a = [1,2,4];
alert(utils.isArray(a));

var b = true;
alert(utils.isBoolean(b));
alert(utils.isBoolean(a));

var c = new Date();
alert(utils.isDate(c));

var e = 1;
alert(utils.isNumber(e));

var f = "This is string";
alert(utils.isString(f));

var h = function(){};
alert(utils.isFunction(h));

var u;
alert(utils.isUndefined(u));

var n = null;
alert(utils.isNull(n));

var firstA = utils.first(a);
var lastA = utils.last(a);

var g = [1,2,3,4,5,6,7,788];

var gskip = utils.skip(g,4);

var gtake = utils.take(g,3);


var d = utils.asChain(g).skip(4).take(3).getValue();