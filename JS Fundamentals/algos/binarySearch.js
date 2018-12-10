// Given an array of sorted numbers and a value (also a number), return whether the array contains that value. 
// Return the index position of the value if it exists and -1 if it does not exist. 

function binarySearch(arr, value) {
  var min = arr[0]
  var max = arr.length - 1;
  var guess;

  while (max >= min) {
    guess = Math.floor((min + max) / 2);
    if (arr[guess] === value) {
      return guess;
    } else if (arr[guess] > value) {
      max = guess - 1;
    } else {
      min = guess + 1;
    }
  }

  return -1;
}

var arr = [1, 3, 8, 10, 12, 15, 17, 20, 22, 34, 38, 40, 50, 52, 78, 87, 90, 91, 92, 94, 200];
console.log(binarySearch(arr, 93));
