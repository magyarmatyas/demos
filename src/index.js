const darkModeSwitch = document.querySelector("#dark-mode-switch");
const main = document.querySelector("#main");
const landingPage = document.querySelector("#landing-page");
const changeLangBtn = document.querySelector("#change-lang");
const arrowDown = document.querySelector("#arrow-down");
let userLang = navigator.language || navigator.userLanguage;
const particles = document.querySelector("#particles-js");
const navbar = document.querySelector("#header");
const faviconEl = document.querySelector('link[rel="icon"]');
const links = document.querySelector("#header").querySelectorAll("li");

if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  document.documentElement.classList.add("dark");
  faviconEl.setAttribute("href", "../assets/favicon-light.ico");
  particlesJS.load("particles-js", `../assets/particles.json`);
} else {
  faviconEl.setAttribute("href", "../assets/favicon-dark.ico");
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
  }, 850);
  setTimeout(() => {
    navbar.classList.remove("relative");
    navbar.classList.add("sticky");
  }, 851);
});

if (history.scrollRestoration) {
  history.scrollRestoration = "manual";
} else {
  window.onbeforeunload = function () {
    landingPage.classList.remove("hidden");
    window.scrollTo(0, 0);
  };
}

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

links.forEach((link) => {
  link.addEventListener("click", () => {
    let page = link.id.slice(0, -4);
    console.log(page);
    document
      .querySelector(`#` + `${page}`)
      .scrollIntoView({ behavior: "smooth" });
  });
});

function onlyNumberKey(evt) {
  let ASCIICode = evt.which ? evt.which : evt.keyCode;
  if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) return false;
  return true;
}

const sendMail = function () {
  let fullName;
  if (document.querySelectorAll(".full_name")[0].value === "") {
    fullName = document.querySelectorAll(".full_name")[1];
    phone_number = document.querySelectorAll(".phone_number")[1];
  } else {
    fullName = document.querySelectorAll(".full_name")[0];
    phone_number = document.querySelectorAll(".phone_number")[0];
  }
  const params = {
    name: fullName.value,
    email: document.querySelector("#email_add").value,
    phone_number: phone_number.value,
    message: document.querySelector("#message").value,
  };
  emailjs
    .send("service_0sje2rc", "template_a8a8pka", params, "zhaBB2mnl2EBe-bL2")
    .then(function (res) {
      alert("Your message has been sent successfully!");
    })
    .then(function (res) {
      fullName.value = "";
      document.querySelector("#email_add").value = "";
      phone_number.value = "";
      document.querySelector("#message").value = "";
    });
};
