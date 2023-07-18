function formatDate (timestamp){
let date = new Date(timestamp);

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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response){
  console.log (response);
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = '<div class="row">';
  forecast.forEach(function(forecastDay, index) {
  if (index  < 6) {
  forecastHTML = forecastHTML +
  `
    <div class="col-2" >
      <div class="weather-forecast-date">${formatDay(forecastDay.time)}</div>
      <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon}.png" alt="" width="45">
      <div class="weather-forecast-temperatures">
      <span class="weather-forecast-max">${Math.round(forecastDay.temperature.maximum)}°C</span>
        <span class="weather-forecast-min">${Math.round(forecastDay.temperature.minimum)}°C</span>
        </div>
    </div>
    
  </div>
  `;
  }
  });


forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
}

 function getForecast (coordinates) {
  let apiKey = "e852e002t3a2a44o7a23fa349fd1bcd4";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
 axios.get(apiUrl).then(displayForecast);
}

function searchCity(city) {
  let apiKey = "e852e002t3a2a44o7a23fa349fd1bcd4";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
event.preventDefault();
let city = document.querySelector("#search-input").value;
searchCity(city);
}

  function showWeather(response) {
    console.log(response.data);
  
    document.querySelector("#wind").innerHTML = 
    Math.round(response.data.wind.speed);

    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute("src", ` ${response.data.condition.icon_url} `);

    document.querySelector("#humidity").innerHTML = 
    Math.round(response.data.temperature.humidity); 

   document.querySelector("#city").innerHTML =
   response.data.city; 

    document.querySelector("#description").innerHTML =
    response.data.condition.description;

    let currentDate = document.querySelector("h1#date");
    currentDate.innerHTML = formatDate(response.data.time * 1000);

     document.querySelector("#temp").innerHTML = Math.round(response.data.temperature.current);
     getForecast(response.data.coordinates);

  }
  
  let citySearch = document.querySelector("#search-form");
  citySearch.addEventListener("submit", handleSubmit);
  
  function retrievePosition(position) {
    let apiKey = "e852e002t3a2a44o7a23fa349fd1bcd4";
    let lat = position.coordinates.latitude;
    let lon = position.coordinates.longitude;
    let url = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
    axios.get(url).then(showWeather);
  }
  
  function currentPosition(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(retrievePosition);
  }
  
  
  
let theLocation = document.querySelector("#current-location");
  theLocation.addEventListener("click", currentPosition);
  
  searchCity("London");
  
  
  displayForecast ();

  