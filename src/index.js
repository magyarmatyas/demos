const darkModeSwitch = document.querySelector("#dark-mode-switch");
const main = document.querySelector("#main");
const landingPage = document.querySelector("#landing-page");
const changeLangBtn = document.querySelector("#change-lang");
const arrowDown = document.querySelector("#arrow-down");
let userLang = navigator.language || navigator.userLanguage;
const particles = document.querySelector("#particles-js");
const navbar = document.querySelector("#header");
const faviconEl = document.querySelector('link[rel="icon"]');

if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  document.documentElement.classList.add("dark");
  faviconEl.setAttribute("href", "../assets/favicon-dark.ico");
  particlesJS.load("particles-js", `../assets/particles.json`);
} else {
  faviconEl.setAttribute("href", "../assets/favicon-light.ico");
  particlesJS.load("particles-js", "../assets/particles-light.json");
}

darkModeSwitch.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
});

arrowDown.addEventListener("click", () => {
  document.body.classList.remove("overflow-hidden");
  navbar.scrollIntoView({
    behavior: "smooth",
  });

  setTimeout(() => {
    landingPage.classList.add("hidden");
    particles.classList.add("hidden");
    navbar.scrollIntoView({ behavior: "smooth" });
  }, 800);
  setTimeout(() => {
    navbar.classList.remove("relative");
    navbar.classList.add("sticky");
  }, 801);
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
