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

let time = `${now.getHours()} : ${now.getMinutes()}`;
let currentTime = document.querySelector("#time");
let changeAmPm = document.querySelector("#ampm");
changeAmPm.innerHTML = ampm();
currentTime.innerHTML = `${time} `;

function changeDegrees(event) {
  event.preventDefault();
  let fahrenheitToC = document.querySelector("#temp-today");
  let tempToday = 52;
  fahrenheitToC.innerHTML = `${Math.round((tempToday - 32) * (5 / 9))} °C`;
  let changeBack = document.querySelector("#change-degrees");
  changeBack.innerHTML = `Change to °F`;
}
let clickChangeDegree = document.querySelector("#change-degrees");
clickChangeDegree.addEventListener("click", changeDegrees);

function showCurrentTemp(response) {
  let tempCurrent = Math.round(response.data.main.temp);
  let tempNow = document.querySelector("#temp-today");
  tempNow.innerHTML = `${tempCurrent} °F`;
  let description = document.querySelector("#description-today");
  description.innerHTML = response.data.weather[0].description;
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
  let tempGeo = Math.round(response.data.main.temp);
  let tempNowGeo = document.querySelector("#temp-today");
  tempNowGeo.innerHTML = `${tempGeo} °F`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.name}`;
  let description = document.querySelector("#description-today");
  description.innerHTML = response.data.weather[0].description;
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
