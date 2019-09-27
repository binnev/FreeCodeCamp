print=console.log;
function palindrome(str) {
  str = ""+str; // force string copy
  // remove all non-alphabetic characters
  let rx = /[^A-Za-z0-9]+/gi;
  str = str.replace(rx, "").toLowerCase();
  print(`str with the bad chars removed: ${str}`)
  let reversed = str.split("").reverse().join("");

  return str === reversed;
}



let out = palindrome("A man, a plan, a canal. Panama");
print(out);
