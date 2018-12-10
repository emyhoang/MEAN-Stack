// Create a function called fizzbuzz that accepts a parameter n. 
// Have the function log all the numbers from 1 to n in order with the following exceptions:

// If the number is divisible by both 3 and 5, log "FizzBuzz" instead of the number
// If the number is divisible by 3 but not by 5, log "Fizz" instead of the number
// If the number is divisible by 5 but not by 3, log "Buzz" instead of the number
// Example - fizzbuzz(15) would log the following (each element on its own line):
// 1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz
// Example - fizzbuzz("fifteen") would throw the following error:
// Parameter must be a positive number
// Example - fizzbuzz(15) would return the following string:
// 1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, Buzz, 11, Fizz, 13, 14, and FizzBuzz.

function fizzBuzz(n) {
  if (typeof n == "string") {
    throw "Parameter must be a positive number";
  }
  var i = 1;
  while (i <= n) {
    if (i % 3 == 0 && i % 5 == 0) {
      console.log('FizzBuzz')
    } else if (i % 3 == 0) {
      console.log('fizz')
    } else if (i % 5 == 0) {
      console.log('buzz')
    } else {
      console.log(i);
    }
    i++
  }
}
fizzBuzz("fivteen");
