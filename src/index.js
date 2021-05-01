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
  let city = document.querySelector("#city-search");
  city.innerHTML = response.data.name;
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
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
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

function search(city) {
  let apiKey = "be198470a78f0753a3ca8949b9b72e9e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showCurrentTemp);
}

function submitSearch(event) {
  event.preventDefault();
  let clickSearch = document.querySelector("#search-input");
  search(clickSearch.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", submitSearch);

function showCurrentTempGeo(response) {
  fahrenheitTemperature = Math.round(response.data.main.temp);
  let city = document.querySelector("#city-search");
  city.innerHTML = response.data.name;
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

  getForecast(response.data.coord);
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(response.data);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
                <div class="forecast-date">${formatDay(forecastDay.dt)}</div>
                <img
                  src="https://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt=""
                />
                <div class="forecast-temperature">
                  <span class="forecast-temp-max">${Math.round(
                    forecastDay.temp.max
                  )}°</span>
                  <span class="forecast-temp-min">${Math.round(
                    forecastDay.temp.min
                  )}°</span>
                </div>`;
    }
    forecastHTML = forecastHTML + `</div>`;
  });

  forecastElement.innerHTML = forecastHTML;

  let sunriseElement = document.querySelector("#sunrise");
  sunriseElement.innerHTML = formatTime(response.data.current.sunrise * 1000);
  let sunsetElement = document.querySelector("#sunset");
  sunsetElement.innerHTML = formatTime(response.data.current.sunset * 1000);
}

function getForecast(coordinates) {
  let apiKey = "62f239283b5ea0d92725df7914ca7b78";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

search("Los Angeles");
