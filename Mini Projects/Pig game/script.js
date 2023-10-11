'use strict';

const dice = document.querySelector(".dice");
const score0 = document.getElementById("score--0");
const score1 = document.getElementById("score--1");
let curr0 = document.getElementById("current--0");
let curr1 = document.getElementById("current--1");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
let rollValue = "";
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
let active = document.querySelector(".player--active");
let activeCurr = active.querySelector(".current-score");
let activeScore = active.querySelector(".score");
const audioRoll = new Audio('roll.mp3');
const audioWin = new Audio('win.wav');


const swtchPlr = function() {
    active = document.querySelector(".player--active");
    activeCurr = active.querySelector(".current-score");
    activeScore = active.querySelector(".score");
}

const def = function() {
    dice.style.display = "none";
    score0.textContent = "0";
    score1.textContent = "0";
    curr0.textContent = "0";
    curr1.textContent = "0";
}
def();

const swtch = function() {
    player0.classList.toggle("player--active");
    player1.classList.toggle("player--active");
    swtchPlr();
}

const roll = function() {
    rollValue = Math.floor(Math.random() * (6 - 1 + 1) + 1);
    dice.src = `dice-${rollValue}.png`
    dice.style.display = "block";
    activeCurr.innerHTML = Number(activeCurr.innerHTML) + rollValue;
    if (rollValue === 1) {
        activeCurr.innerHTML = 0;
        swtch();
    }
    audioRoll.play();
    console.log(rollValue);
}

const hold = function() {
    activeScore.innerHTML = Number(activeScore.innerHTML) + Number(activeCurr.innerHTML);
    activeCurr.innerHTML = 0;
    swtch();
    if (Number(score0.innerHTML) >= "100") {
        audioWin.play();
        alert("Játékos 1 nyert!")
        newGame();
    } else if (Number(score1.innerHTML) >= "100") {
        audioWin.play();
        alert("Játékos 2 nyert!")
        newGame();
    }
}

const newGame = function() {
    def();
    player1 === active ? swtch() : null;
}

btnRoll.addEventListener("click", roll);
btnHold.addEventListener("click", hold);
btnNew.addEventListener("click", newGame);