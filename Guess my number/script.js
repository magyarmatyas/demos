'use strict';
const btnGuess = document.getElementsByClassName("check")[0];
const btnAgain = document.getElementsByClassName("again")[0];


let nmb = "";
let inpGuess = "";
let msg = "";
let crctNmb = "";
let scr = document.getElementsByClassName("score")[0]
let highscr = document.getElementsByClassName("highscore")[0]

const random = function() {
    let min = Math.ceil(1);
    let max = Math.floor(21);
    nmb = Math.floor(Math.random() * (max - min) + min);
    console.log(nmb);
    
}
random();

const again = function() {
    inpGuess = document.getElementsByClassName("guess")[0].value;
    msg = document.getElementsByClassName("message")[0];
    crctNmb = document.getElementsByClassName("number")[0];
    crctNmb.innerHTML = "?";
    msg.innerHTML = "Start guessing...";
    document.body.style.backgroundColor = "#222";
    scr.innerHTML = 20;
    btnGuess.addEventListener("click", check);
    random();
}

const check = function() {
    inpGuess = document.getElementsByClassName("guess")[0].value;
    msg = document.getElementsByClassName("message")[0];
    crctNmb = document.getElementsByClassName("number")[0];
    if (Number(inpGuess) < Number(nmb)) {
        msg.innerHTML = "Too low!";
        scr.innerHTML = Number(scr.innerHTML)-1;
    } else if (Number(inpGuess) > Number(nmb)){
        msg.innerHTML = "Too high!";
        scr.innerHTML = Number(scr.innerHTML)-1;
    } else if (Number(inpGuess) === Number(nmb)) {
        msg.innerHTML = "Correct number!";
        crctNmb.innerHTML = nmb;
        document.body.style.backgroundColor = "Green";
        btnGuess.removeEventListener("click", check);
        if (Number(scr.innerHTML) > highscr.innerHTML) {
        highscr.innerHTML = Number(scr.innerHTML);
        };
    }
}

btnGuess.addEventListener("click", check);
btnAgain.addEventListener("click", again);
document.getElementsByClassName("guess")[0].addEventListener("keypress", function(enter) {
    if (enter.key === "Enter") {
        check();
    }
})