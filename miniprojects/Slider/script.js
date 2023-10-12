"use strict";

const img = document.getElementsByClassName("center");
const nextBtn = document.querySelector("#right");
const backBtn = document.querySelector("#left");
const counterText = document.getElementsByClassName("counterText")[0];
const downBtn = document.getElementsByClassName("download")[0];
let n = 0;

const timer = 
setInterval(function() {
    next()
  }, 5000);

const next = function() {

    hide();

    if (n < img.length - 1) {
        n = n + 1;
        tgl();
    } else if (n === img.length - 1) {
        n = 0;
        tgl();
    }

}

const back = function() {

    hide();

    if (n === 0) {
        n = n + img.length - 1;
        tgl();
    } else if (n <= img.length - 1) {
        n = n - 1;
        tgl();
    }

}

const tgl = function() {
    img[n].classList.remove("hidden");
    img[n].classList.add("current");
    counterText.innerHTML = `${n+1} / ${img.length}`;
    downBtn.href = `img${[n+1]}.png`;
}

const hide = function() {
    img[n].classList.add("hidden");
    img[n].classList.remove("current");
    counterText.innerHTML = `${n+1} / ${img.length}`;
}

nextBtn.addEventListener("click", next)
backBtn.addEventListener("click", back)