const appBody = document.querySelector(".app");
const searchBtn = document.querySelector(".btn");
const input = document.querySelector(".searchbar");
const cityname = document.querySelector(".cityname");
const img = document.querySelector(".image");
const description = document.querySelector(".description");
const temp = document.querySelector(".temperature");
const humidity = document.querySelectorAll(".text")[0].querySelector("span");
const wind = document.querySelectorAll(".text")[1].querySelector("span");
const weatherbox = document.querySelector(".weatherbox");
const weatherdetails = document.querySelector(".weatherdetails");
const error = document.querySelector(".error");

input.value = '';

const searchWeather = () => {

    let isDay = "";

    const APIKey =  'e46be40a54b748fa932203304232509';
    fetch(`https://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${input.value}&aqi=no`).then(response => response.json()).then(json => {



    if (typeof json.error !== 'undefined' && json.error.code === 1006) {
        console.log('Error');
        document.querySelector(".weatherbox").style.display = "none";
        document.querySelector(".weatherdetails").style.display = "none";
        error.style.display = "flex";
        appBody.style.height = "600px";
      } else {

    if(input.value !== "") {
        error.style.display = "none";
        json.current.is_day ? appBody.style = "background-image: linear-gradient(to left top, #003182, #275ba4, #4e86c4, #7bb2e2, #aedeff)" : appBody.style = "background-image: linear-gradient(to left top, #1b283b, #26334c, #323e5d, #404a6f, #4f5581)";
        json.current.is_day ? isDay = "day" : isDay = "night";
        document.querySelector(".weatherbox").style.display = "block";
        document.querySelector(".weatherdetails").style.display = "flex";
        appBody.style.height = "600px";
        cityname.innerHTML = json.location.name;
        temp.innerHTML = `${json.current.temp_c} <span>°C</span>`;
        humidity.innerHTML = `${json.current.humidity}%`;
        wind.innerHTML = `${json.current.wind_kph} Km/h`;
        weatherbox.classList.add("fadeIn");
        weatherdetails.classList.add("fadeIn");
        }

    switch (json.current.condition.code) {
        case 1000:
            img.src = `weather/clear-${isDay}.png`;
            description.innerHTML = json.current.condition.text;
            break;
        case 1003:
        case 1006:
        case 1009:
            img.src = `weather/cloudy-${isDay}.png`;
            description.innerHTML = json.current.condition.text;
            break;
        case 1030:
        case 1135:
        case 1147:
            img.src = `weather/fog-${isDay}.png`;
            description.innerHTML = json.current.condition.text;
            break;
        case 1063:
        case 1180:
        case 1183:
        case 1186:
        case 1189:
        case 1192:
        case 1195:
        case 1198:
        case 1201:
            img.src = `weather/rain-${isDay}.png`;
            description.innerHTML = json.current.condition.text;
            break;
        case 1204:
        case 1207:
        case 1210:
        case 1213:
        case 1216:
        case 1219:
        case 1222:
        case 1225:
        case 1066:
        case 1069:
        case 1117:
        case 1114:
        case 1249:
        case 1252:
        case 1255:
        case 1258:
        case 1279:
        case 1282:
            img.src = `weather/snow-${isDay}.png`;
            description.innerHTML = json.current.condition.text;
            break;
        case 1072:
        case 1087:
        case 1150:
        case 1153:
        case 1168:
        case 1171:
            img.src = `weather/drizzle-${isDay}.png`;
            description.innerHTML = json.current.condition.text;
            break;
        case 1237:
        case 1261:
        case 1264:
            img.src = `weather/hail-${isDay}.png`;
            description.innerHTML = json.current.condition.text;
            break;
        case 1240:
        case 1243:
        case 1246:
            img.src = `weather/rainshower-${isDay}.png`
            description.innerHTML = json.current.condition.text;
            break;
        case 1273:
        case 1276:
            img.src = `weather/thunderstorm-${isDay}.png`
            description.innerHTML = json.current.condition.text;
            break;
        }
    }})
};

searchBtn.addEventListener("click", searchWeather);
input.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      searchWeather();
    }
});