"use strict";

let binary = document.getElementById("binInput").value;
let result = document.getElementById("result");
let digits = binary.toString().split("");
let decimal = "";
const bin = ["0", "1"];
const computeBtn = document.getElementById("computeBtn");

const compute = function() {
    binary = document.getElementById("binInput").value;
    digits = binary.toString().split("");

    if (isBin(bin, digits) === true) {

    for(let p = 0; p <= (digits.length)-1; p++) {
    let i = Number((digits.length)-1-p);
    let nmb = digits[i];
    if(nmb === "1") {
        digits[i] = Math.pow(2, p);
    } else if (nmb === "0") {
        digits[i] = 0;
    }
};  

decimal = digits.reduce((a, b) => a + b, 0);
result.innerHTML = `The decimal is ${decimal}`;

} else {
    result.innerHTML = `Not binary!`;
}
}

function isBin(array1, array2){
    return array2.every(elem => array1.includes(elem))
  }

computeBtn.addEventListener("click", compute);
document.getElementById("binInput").addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      compute();
    }
});