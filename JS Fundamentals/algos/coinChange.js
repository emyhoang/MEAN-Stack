// Write a function that creates and returns an object.

// Given a number of US cents, return the optimal configuration 
// (meaning the largest denominations possible) of coins in an object. 
// Use dollars, quarters, dimes, nickels, and pennies.

// Example: coinChange(312) returns 
// {dollars: 3, dimes: 1, pennies: 2}

function coinChange(cents) {
  var coins = { dollars: 0, quarters: 0, dimes: 0, nickels: 0, pennies: 0 }
  coins.dollars = Math.floor(cents / 100);
  cents %= 100;
  coins.quarters = Math.floor(cents / 25);
  cents %= 25;
  coins.dimes = Math.floor(cents / 10);
  cents %= 10;
  coins.nickels = Math.floor(cents / 5);
  cents %= 5;
  coins.p = cents
  return coins;
}
coinChange(312);
