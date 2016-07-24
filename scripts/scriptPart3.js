var j = {
  name: "H",
  type: "X",
  size: {
    top: {
      top1: 23,
      top2: 24
    },
    bottom: 100,
    middle: 120
  },
  b: {
    a: "s",
    v: "w"
  },
  suprime: [{
    a: 1,
    b: 1
  }, {
    a: 2,
    b: 3
  }]
};

var j2 = {
  name: "H",
  type: "X",
  size: {
    top: 90,
    bottom: 100,
    middle: 120
  },
  b: {
    a: "s",
    v: "w"
  },
  suprime: [{
    a: 1,
    b: 3
  }, {
    a: 2,
    b: 3
  }]
};

utils.traverseWidth(j, showSheet);

utils.traverseDepth(j, showSheet);

alert(utils.deepCompare(j, j2));
alert(utils.deepCompare(j, j));

function showSheet(key, val, path) {
  console.log(key + " " + val);
}