function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

function displayForcast(response) {
  let forcastElement = document.querySelector("#forcast");
  let forcastHtml = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forcastHtml =
      forcastHtml +
      `
        <div class="card border-primary mb-3" style="width: 20rem">
          <div class="card-body text-info">
              <h5 class="card-title">${day}</h5>
              <div class="rainy"></div>
              <span class="card-text text-warning max-temp">12° | </span>
              <span class="card-text text-warning min-temp">12°</span>
          </div>
        </div>
  `;
  });

  forcastHtml = forcastHtml + `</div>`;
  forcastElement.innerHTML = forcastHtml;
  console.log(response.data.daily);
}

function getForcast(coordinates) {
  let apiKey = "066e6846e09ae10d49fa3612a2af48a3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForcast);
}

function showWeather(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#temperature-degree").innerHTML = `${Math.round(
    response.data.main.temp
  )}°C`;

  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity : ${response.data.main.humidity}`;
  document.querySelector("#wind-speed").innerHTML = `Wind : ${Math.round(
    response.data.wind.speed
  )} km/h`;

  document.querySelector(
    "#visibility"
  ).innerHTML = `visibility : ${response.data.visibility}`;

  document.querySelector("#description-weather").innerHTML =
    response.data.weather[0].main;

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  celsiusTemp = response.data.main.temp;

  getForcast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "066e6846e09ae10d49fa3612a2af48a3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#exampleDataList").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "066e6846e09ae10d49fa3612a2af48a3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 19;
}

function convertToFahrenheit() {
  let temperatureElement = document.querySelector("#temperature-degree");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = `${Math.round(fahrenheitTemp)}°F`;
}

function convertToCelcius() {
  let temperatureElement = document.querySelector("#temperature-degree");
  temperatureElement.innerHTML = `${Math.round(celsiusTemp)}°C`;
}

let celsiusTemp = null;
let dateElement = document.querySelector("#current-date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#search-box");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#location");
currentLocationButton.addEventListener("click", getCurrentLocation);

let iconElement = document.querySelector("#icon");

let fahrenheitButton = document.querySelector("#fahrenheit-degree");
fahrenheitButton.addEventListener("click", convertToFahrenheit);

let celciusButton = document.querySelector("#celcius-degree");
celciusButton.addEventListener("click", convertToCelcius);
searchCity("Ilam");
