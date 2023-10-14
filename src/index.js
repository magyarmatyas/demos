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
document.documentElement.lang =
  navigator.language.slice(0, -3) || navigator.userLanguage.slice(0, -3);
const email = document.querySelector("#email_add");
const message = document.querySelector("#message");
let fullName = document.querySelectorAll(".full_name");

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
    ? (changeLangBtn.innerText = "hu") &&
      (email.placeholder = "Email address") &&
      (document.querySelectorAll(".phone_number")[0].placeholder =
        "Phone number") &&
      (document.querySelectorAll(".phone_number")[1].placeholder =
        "Phone number") &&
      (message.placeholder = "Message") &&
      (document.querySelectorAll(".full_name")[0].placeholder = "Full name") &&
      (document.querySelectorAll(".full_name")[1].placeholder = "Full name") &&
      (document.documentElement.lang = "en")
    : (changeLangBtn.innerText = "en") &&
      (email.placeholder = "Email cím") &&
      (document.querySelectorAll(".phone_number")[0].placeholder =
        "Telefonszám") &&
      (document.querySelectorAll(".phone_number")[1].placeholder =
        "Telefonszám") &&
      (message.placeholder = "Üzenet") &&
      (document.querySelectorAll(".full_name")[0].placeholder = "Teljes név") &&
      (document.querySelectorAll(".full_name")[1].placeholder = "Teljes név") &&
      (document.documentElement.lang = "hu");
};

changeLangBtn.addEventListener("click", changeLang);

if (userLang === "hu-HU" || userLang === "hu") {
  changeLang();
}

links.forEach((link) => {
  link.addEventListener("click", () => {
    let page = link.id.slice(0, -4);
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
  if (document.querySelectorAll(".full_name")[0].value === "") {
    fullName = document.querySelectorAll(".full_name")[1];
    phone_number = document.querySelectorAll(".phone_number")[1];
  } else {
    fullName = document.querySelectorAll(".full_name")[0];
    phone_number = document.querySelectorAll(".phone_number")[0];
  }
  const params = {
    name: fullName.value,
    email: email.value,
    phone_number: phone_number.value,
    message: message.value,
  };
  if (
    params.name === "" ||
    params.email === "" ||
    params.phone_number === "" ||
    params.message === ""
  ) {
    document.documentElement.lang === "en"
      ? alert("Please fill out all the fields!")
      : alert("Kérlek, töltsd ki az összes mezőt!");
    return;
  } else if (params.name.length < 3) {
    document.documentElement.lang === "en"
      ? alert("Please enter a valid name!")
      : alert("Kérlek, adj meg egy érvényes nevet!");
    return;
  } else if (params.phone_number.length < 9) {
    document.documentElement.lang === "en"
      ? alert("Please enter a valid phone number!")
      : alert("Kérlek, adj meg egy érvényes telefonszámot!");
    return;
  } else if (!params.email.includes("@") || !params.email.includes(".")) {
    document.documentElement.lang === "en"
      ? alert("Please enter a valid email address!")
      : alert("Kérlek, adj meg egy érvényes email címet!");
    return;
  } else if (params.message.length < 10) {
    document.documentElement.lang === "en"
      ? alert("Please enter a longer message!")
      : alert("Kérlek, írj egy hosszabb üzenetet!");
    return;
  } else {
    emailjs
      .send("service_0sje2rc", "template_a8a8pka", params)
      .then(function (res) {
        if (res.status === 400) {
          document.documentElement.lang === "en"
            ? alert("Something went wrong, please try again later!")
            : alert("Hiba történt, kérlek próbáld újra később!");
        } else if (res.status === 200) {
          document.documentElement.lang === "en"
            ? alert("Your message has been sent successfully!")
            : alert("Az üzeneted sikeresen elküldve!");
        }
      })
      .then(function (res) {
        fullName.value = "";
        email.value = "";
        phone_number.value = "";
        message.value = "";
      });
  }
};
