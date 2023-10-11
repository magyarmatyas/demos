const darkModeSwitch = document.querySelector("#dark-mode-switch");
const arrowDown = document.querySelector("#arrow-down");
const main = document.querySelector("#main");
const landingPage = document.querySelector("#landing-page");
const changeLangBtn = document.querySelector("#change-lang");
let userLang = navigator.language || navigator.userLanguage;

if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  document.documentElement.classList.add("dark");
}

if (document.documentElement.classList.contains("dark")) {
  darkModeSwitch.src = "../assets/lightmode.png";
  arrowDown.src = "../assets/arrow-down-light.png";
} else {
  darkModeSwitch.src = "../assets/darkmode.png";
  arrowDown.src = "../assets/arrow-down-dark.png";
}

darkModeSwitch.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
  document.documentElement.classList.contains("dark")
    ? (darkModeSwitch.src = "../assets/lightmode.png") &&
      (arrowDown.src = "../assets/arrow-down-light.png")
    : (darkModeSwitch.src = "../assets/darkmode.png") &&
      (arrowDown.src = "../assets/arrow-down-dark.png");
});

arrowDown.addEventListener("click", () => {
  document.body.classList.remove("overflow-hidden");
  main.scrollIntoView({
    behavior: "smooth",
    block: "nearest",
    inline: "start",
  });
  setTimeout(() => {
    landingPage.classList.add("hidden");
    main.scrollIntoView({ behavior: "smooth" });
  }, 800);
});

window.onbeforeunload = function () {
  landingPage.classList.remove("hidden");
  window.scrollTo(0, 0);
};

const changeLang = function () {
  document.querySelectorAll(".lang-en").forEach((el) => {
    el.classList.toggle("hidden");
    el.classList.toggle("flex");
  });
  document.querySelectorAll(".lang-hu").forEach((el) => {
    el.classList.toggle("hidden");
    el.classList.toggle("flex");
  });
  changeLang.innerText === "en"
    ? (changeLangBtn.innerText = "hu")
    : (changeLangBtn.innerText = "en");
};

changeLangBtn.addEventListener("click", changeLang);

if (userLang === "hu-HU") {
  changeLang();
}
