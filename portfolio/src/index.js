const darkModeSwitch = document.querySelector("#dark-mode-switch");
const main = document.querySelector("#main");
const landingPage = document.querySelector("#landing-page");
const changeLangBtn = document.querySelector("#change-lang");
const arrowDown = document.querySelector("#arrow-down");
let userLang = navigator.language || navigator.userLanguage;
const particles = document.querySelector("#particles-js");

if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  document.documentElement.classList.add("dark");
  particlesJS.load("particles-js", `../assets/particles.json`);
} else {
  particlesJS.load("particles-js", "../assets/particles-light.json");
}

darkModeSwitch.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
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
    particles.classList.add("hidden");
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
  changeLangBtn.innerText === "en"
    ? (changeLangBtn.innerText = "hu")
    : (changeLangBtn.innerText = "en");
};

changeLangBtn.addEventListener("click", changeLang);

if (userLang === "hu-HU" || userLang === "hu") {
  changeLang();
}
