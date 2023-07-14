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
     document.querySelector("#temp").innerHTML = 
     Math.round(response.data.temperature.current);
    document.querySelector("#wind").innerHTML = 
    Math.round(response.data.wind.speed);
    let iconElement = document.querySelector("#icon");
    console.log(response.data.condition.icon_url);
    iconElement.setAttribute("src", ` ${response.data.condition.icon_url} `);
   
    document.querySelector("#humidity").innerHTML = 
    Math.round(response.data.temperature.humidity);
    
   document.querySelector("#city").innerHTML =
   response.data.city;
    
    document.querySelector("#description").innerHTML =
    response.data.condition.description;
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
  
  
  //let iconElement = document.querySelector("#icon");
  //console.log(response.data.condition.icon_url);
 //iconElement.setAttribute("src", `${response.data.condition.icon_url}`);
  
  
  

  