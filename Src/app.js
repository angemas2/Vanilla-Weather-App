function formatdate(timestamp) {
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let date = new Date(timestamp);
  let day = date.getDay();
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let min = date.getMinutes();
  if (min < 10) {
    min = `0${min}`;
  }
  let fulldate = `${weekdays[day]}, ${hour}:${min}`;
  return fulldate;
}

function showTemp(response) {
  let city = document.querySelector("#current-city");
  let currentTemp = document.querySelector("#current-temp");
  let description = document.querySelector("#description");
  let feelsLike = document.querySelector("#feels-like");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind-speed");
  let date = document.querySelector("#lastdate");

  celsiusTemp = response.data.main.temp;

  city.innerHTML = response.data.name;
  currentTemp.innerHTML = Math.round(response.data.main.temp);
  description.innerHTML = response.data.weather[0].description;
  feelsLike.innerHTML = Math.round(response.data.main.feels_like);
  humidity.innerHTML = response.data.main.humidity;
  windSpeed.innerHTML = response.data.wind.speed;
  iconindex = response.data.weather[0].icon;
  iconurl = `http://openweathermap.org/img/wn/${iconindex}@4x.png`;
  document.getElementById("current-emoji").src = iconurl;
  document.getElementById("current-emoji").alt =
    response.data.weather[0].description;
  date.innerHTML = formatdate(response.data.dt * 1000);
}

function search(city) {
  let apiKey = "c0ed04c902a245721bb289e92dca75fe";
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(url).then(showTemp);
}

function usersearch(event) {
  event.preventDefault();
  let usercity = document.querySelector("#user-city").value;
  search(usercity);
}

function showcelsiusTemp(event) {
  event.preventDefault();
  let temp = document.querySelector("#current-temp");
  let celsius = document.querySelector("#celsius");
  let fahrenheit = document.querySelector("#fahrenheit");
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  temp.innerHTML = Math.round(celsiusTemp);
}

function showfahrenheitTemp(event) {
  event.preventDefault();
  let temp = document.querySelector("#current-temp");
  let fahrenheit = document.querySelector("#fahrenheit");
  let celsius = document.querySelector("#celsius");
  fahrenheit.classList.add("active");
  celsius.classList.remove("active");
  temp.innerHTML = Math.round((celsiusTemp * 9) / 5 + 32);
}

let celsiusTemp = null;

let submit = document.querySelector("#search-city");
submit.addEventListener("submit", usersearch);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showcelsiusTemp);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showfahrenheitTemp);

search("Singapore");
