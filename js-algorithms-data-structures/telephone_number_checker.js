print=console.log;
function telephoneCheck(num) {
  /* regex explanation: 
    ^(1|1 )? :: at the start of the number, there can be a 1, a 1 
    followed by a space, or nothing. 
    
    (\(\d{3}\)(?!-)|\d{3}) :: either three digits inside parenteses 
    not followed by a dash, or three digits. 

    [-| ]?\d{3}[-| ]?\d{4}$ :: optional dash or space, 3 digits, 
    optional dash or space, 4 digits at the end of number.
  */
  let rx = /^(1|1 )?(\(\d{3}\)(?!-)|\d{3})[-| ]?\d{3}[-| ]?\d{4}$/;
  if (rx.test(num)) {
    return true;
  } else {
    return false;
  }
}

let num = "(555)5(55?)-5555";
let out = telephoneCheck(num);
print(`out = ${out}`);
