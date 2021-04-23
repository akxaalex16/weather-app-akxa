let now = new Date();
let dayNow = document.querySelector("#day");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
dayNow.innerHTML = `${day} | `;

let date = now.getDate();
let currentMonthDate = document.querySelector("#month");
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
currentMonthDate.innerHTML = `${month} ${date} | `;

function ampm() {
  if (now.getHours() > 12) {
    return "PM";
  } else {
    return "AM";
  }
}

let changeAmPm = document.querySelector("#ampm");
changeAmPm.innerHTML = ampm();

function showCurrentTemp(response) {
  fahrenheitTemperature = Math.round(response.data.main.temp);
  let tempNow = document.querySelector("#temp-today");
  tempNow.innerHTML = fahrenheitTemperature;
  let description = document.querySelector("#description-today");
  description.innerHTML = response.data.weather[0].description;
  let currentTime = document.querySelector("#time");
  currentTime.innerHTML = formatTime(response.data.dt * 1000);
  let sunriseElement = document.querySelector("#sunrise");
  sunriseElement.innerHTML = formatTime(response.data.sys.sunrise * 1000);
  let sunsetElement = document.querySelector("#sunset");
  sunsetElement.innerHTML = formatTime(response.data.sys.sunset * 1000);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let pressureElement = document.querySelector("#pressure");
  pressureElement.innerHTML = response.data.main.pressure;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function formatTime(timestamp) {
  let date = new Date(timestamp);
  let hour = [
    12,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
  ];

  let hours = hour[date.getHours()];
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = ` ${hours}`;
  }
  return `${hours}:${minutes}`;
}

function submitSearch(event) {
  event.preventDefault();
  let clickSearch = document.querySelector("#search-input");
  let city = document.querySelector("#city-search");
  city.innerHTML = `${clickSearch.value}`;
  let apiKey = "be198470a78f0753a3ca8949b9b72e9e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${clickSearch.value}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showCurrentTemp, submitSearch);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", submitSearch);

function showCurrentTempGeo(response) {
  fahrenheitTemperature = Math.round(response.data.main.temp);
  let tempNowGeo = document.querySelector("#temp-today");
  tempNowGeo.innerHTML = fahrenheitTemperature;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.name}`;
  let description = document.querySelector("#description-today");
  description.innerHTML = response.data.weather[0].description;
  let currentTime = document.querySelector("#time");
  currentTime.innerHTML = formatTime(response.data.dt * 1000);
  let sunriseElement = document.querySelector("#sunrise");
  sunriseElement.innerHTML = formatTime(response.data.sys.sunrise * 1000);
  let sunsetElement = document.querySelector("#sunset");
  sunsetElement.innerHTML = formatTime(response.data.sys.sunset * 1000);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let pressureElement = document.querySelector("#pressure");
  pressureElement.innerHTML = response.data.main.pressure;
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKeyGeo = "24d9a33aebe5b34c9d080e57021b03e3";
  let apiUrlGeo = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKeyGeo}&units=imperial`;
  axios.get(apiUrlGeo).then(showCurrentTempGeo);
}

function clickCurrentButton(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let clickCurrent = document.querySelector("#current-button");
clickCurrent.addEventListener("click", clickCurrentButton);

function celsiusTemp(event) {
  event.preventDefault();
  let celsiusTemperature = (fahrenheitTemperature - 32) * (5 / 9);
  let tempElement = document.querySelector("#temp-today");
  tempElement.innerHTML = Math.round(celsiusTemperature);
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", celsiusTemp);

function fahrenheitTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp-today");
  tempElement.innerHTML = Math.round(fahrenheitTemperature);
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", fahrenheitTemp);

let fahrenheitTemperature = null;
