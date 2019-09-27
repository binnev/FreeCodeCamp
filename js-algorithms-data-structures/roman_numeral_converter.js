print=console.log;

function getIndices(digit) {
    // function describing Roman numeral composition rules regardless of number size
    // (i.e. works for ones, tens, hundreds, thousands...)
    switch (digit) {
        case 0: return [];            // zero
        case 1: return [0];           // e.g. I (current base)
        case 2: return [0, 0];        // e.g. II
        case 3: return [0, 0, 0];     // e.g. III
        case 4: return [0, 1];        // e.g. IV (1 means next larger symbol)
        case 5: return [1];           // e.g. V
        case 6: return [1, 0];        // e.g. VI
        case 7: return [1, 0, 0];     // e.g. VII
        case 8: return [1, 0, 0, 0];  // e.g. VIII
        case 9: return [0, 2];        // e.g. IX (2 means larger symbol after 1)
    }
}

function composeNumeral(column, digit) {
    // digit is the number to be turned into numerals e.g. 9
    // column is the position of the digit: 0=ones; 1=tens; 2=hundreds; 3=thousands
    // for digit=8 and column=2 this function will create a numeral for 800
    
    let numerals = ["I", "V", "X", "L", "C", "D", "M"];
    // get indices describing relative positions of symbols for this numeral
    let indices = getIndices(digit); 
    // add column for context (are we dealing with ones, hundreds, thousands?)
    indices = indices.map((i) => i+column*2) // *2 to skip five, fifty, etc.
    // compose numeral string
    return indices.map((i) => numerals[i]).join("");
}

function convertToRoman(num) {
    if (num > 9999) {return undefined} // can't do big numbers
    
    // convert number to an array of digits, starting with the ones
    let digits = String(num).split("").map(x => parseInt(x, 10)).reverse()
    let numerals = [];
    let column = 0;  // refers to the column in the number e.g. 1 = "tens" 
    // for each digit, get its numeral string
    digits.forEach((digit) => { 
        numerals.push(composeNumeral(column, digit)); 
        column++; // increment by 2 to jump from ones to tens (not fives)
    })
    // stitch numerals together and return
    return numerals.reverse().join("");
}

let out = convertToRoman(3604);
print(out);