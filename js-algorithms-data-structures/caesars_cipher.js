print=console.log;
function rot13(str) { // LBH QVQ VG!
    let alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase();

    let rx = /[A-Z]+/;  // filter actual letters
    let letters = str.split("");
    print(`letters = ${letters}`);

    let output = [];
    let ii = 0;
    letters.forEach((letter) => {
    //   print(`${ii}, ${letter}`);
      if (rx.test(letter)) {
        // print(`${letter} OK. Found match: ${letter.match(rx)}`)
        let ind = alphabet.indexOf(letter);
        // print(`index of letter ${letter} = ${ind}`)
        let shiftInd = (ind + 13) % 26;
        // print(`shifted index = ${shiftInd}; shifted letter = ${alphabet[shiftInd]}`)
        output.push(alphabet[shiftInd]);
      } else {
        // do nothing
        output.push(letter);
      }
      ii++;      
    })

    return output.join("");
}

// Change the inputs below to test
let out = rot13("SERR PBQR PNZC");
print(out);