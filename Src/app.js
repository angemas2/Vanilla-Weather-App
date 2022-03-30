function showTemp(response) {
  let city = document.querySelector("#current-city");
  let currentTemp = document.querySelector("#current-temp");
  let description = document.querySelector("#description");
  let feelsLike = document.querySelector("#feels-like");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind-speed");

  city.innerHTML = response.data.name;
  currentTemp.innerHTML = Math.round(response.data.main.temp);
  description.innerHTML = response.data.weather[0].description;
  feelsLike.innerHTML = Math.round(response.data.main.feels_like);
  humidity.innerHTML = response.data.main.humidity;
  windSpeed.innerHTML = response.data.wind.speed;
  iconindex = response.data.weather[0].icon;
  iconurl = `http://openweathermap.org/img/wn/${iconindex}@4x.png`;
  document.getElementById("current-emoji").src = iconurl;
}

let apiKey = "c0ed04c902a245721bb289e92dca75fe";
let city = "Singapore";
let units = "metric";
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

axios.get(url).then(showTemp);
