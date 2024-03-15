"use strict";

import { lista } from "./szavak.js";
import { adatok } from "./adatok.js";

const szo1 = document.getElementById("szo1");
const szo2 = document.getElementById("szo2");
const szo3 = document.getElementById("szo3");
const szavak = [szo1, szo2, szo3];
const startGomb = document.getElementById("startGomb");
const input = document.getElementById("input1");
const ellenorzesGomb = document.getElementById("ellenorzes");
const vege = document.getElementById("vege");
const feladat = document.getElementById("feladat");
const insightDiv = document.getElementById("insight");
const bevitel = document.getElementById("bevitel");

let szavakIndex = 0;

const start = function () {
  startGomb.style.display = "none";
  bevitel.style.display = "block";
  szavak.forEach((szo, i) => {
    szo.textContent = lista[szavakIndex].szavak[i];
  });
};

const insight = function () {
  feladat.style.display = "none";
  bevitel.style.display = "none";
  insightDiv.style.display = "block";
  console.log(adatok);
};

const ellenorzes = function () {
  const megfejtes = input.value;
  if (megfejtes === lista[szavakIndex].megfejtes) {
    lista[szavakIndex].volt = true;
    adatok.helyes += 1;
    console.log("helyes");
  } else {
    console.log("nem helyes");
  }
  szavakIndex++;
  input.value = "";
  console.log(adatok);
  insight();
};

ellenorzesGomb.addEventListener("click", ellenorzes);
startGomb.addEventListener("click", start);

addEventListener("keyup", function (e) {
  if (e.key === "Enter" && bevitel.style.display === "block") {
    ellenorzes();
  }
});
addEventListener("keyup", function (e) {
  if (e.code === "Space" && startGomb.style.display !== "none") {
    start();
  }
});

addEventListener("keyup", function (e) {
  if (
    (e.code === "KeyI" || e.code === "KeyE") &&
    insightDiv.style.display === "block"
  ) {
    insightDiv.style.display = "none";
    feladat.style.display = "block";
    bevitel.style.display = "block";
    if (e.code === "KeyI") {
      adatok.insight++;
    }
    console.log(e.key);
    console.log(adatok);
    if (szavakIndex < lista.length) {
      szavak.forEach((szo, i) => {
        szo.textContent = lista[szavakIndex].szavak[i];
      });
    } else {
      feladat.style.display = "none";
      bevitel.style.display = "none";
      vege.innerHTML = "Vége!";
    }
  }
});

console.log(adatok);
