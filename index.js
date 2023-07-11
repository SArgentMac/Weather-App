let date = new Date();

let hours = date.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
else 
{hours = `${hours}`;}

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

let formatDate = `${day} ${hours}:${minutes}`;

let currentDate = document.querySelector("h1#date");
currentDate.innerHTML = formatDate;

function search(event) {
    event.preventDefault();
    let changeCity = document.querySelector("#search-input");
    let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${changeCity.value}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather);
  }
  function showWeather(response) {
    console.log(response.data);
    let currentTemp = document.querySelector("#temp");
    let temperature = Math.round(response.data.main.temp);
    currentTemp.innerHTML = ` ${temperature}`;
    let windCurrent = Math.round(response.data.wind.speed);
    let windVal = document.querySelector("#wind");
    windVal.innerHTML = windCurrent;
    let humidity = Math.round(response.data.main.humidity);
    let humidityVal = document.querySelector("#humidity");
    humidityVal.innerHTML = humidity;
    let cityName = document.querySelector("#city");
    cityName.innerHTML = response.data.name;
  }
  
  let citySearch = document.querySelector("#search-form");
  citySearch.addEventListener("submit", search);
  
  function retrievePosition(position) {
    let apiKey = "80e98c1f9b189c5222b5d0b3dc2f051c";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(url).then(showWeather);
  }
  
  function currentPosition(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(retrievePosition);
  }
  
  let theLocation = document.querySelector("#current-location");
  theLocation.addEventListener("click", currentPosition);
  
  
  
  
  
  
  

  