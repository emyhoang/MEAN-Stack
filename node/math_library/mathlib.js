module.exports = {
  add: function (num1, num2) {
    return num1 + num2
  },
  multiply: function (num1, num2) {
    return num1 * num2
  },
  square: function (num1) {
    return num1 * num1
  },
  random: function (num1, num2) {
    return Math.floor(Math.random() * num1 + num2)
  },
  sort: function (arr) {
    var len = arr.length;
    for (var i = len - 1; i >= 0; i--) {
      for (var j = 1; j <= i; j++) {
        if (arr[j - 1] > arr[j]) {
          var temp = arr[j - 1];
          arr[j - 1] = arr[j];
          arr[j] = temp;
        }
      }
    }
    return arr;
  }
};

