// Given a string, write a function that will determine whether the braces  
// - including parentheses (), square brackets [], and curly brackets {} - within the string are valid. 
// That means that any braces within other braces must close before the outer set closes.

// HINT: Keep in mind that you may use arrays and objects to keep your information organized!
// Example: bracesValid("{{()}}[]") returns true because the inner braces close before the outer braces. Each opening brace has a matching closing brace.
// Example:  bracesValid("{(})") returns false because the curly braces close before the parentheses, which starts within the curly braces, had a chance to close.

function isValid(str) {
  var valBraces = { ']': '[', '}': '{', ']': '[' };
  var stack = [];


  for (var i = 0; i < str.length; i++) {
    if (str[i] === '[' || str[i] === '{' || str[i] === '[') {
      stack.push(str[i]);
    } else if (valBraces[str[i]]) {
      if (valbraces[str[i]] === stack[stack.length - 1]) {
        stack.pop();
      } else {
        return false;
      }
    }
    if (stack.length > 0) {
      return false;
    }
    return true;
  }


  isValid("{{()}}[]");
