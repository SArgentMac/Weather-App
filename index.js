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
    let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
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
     Math.round(response.data.main.temp);
    
    document.querySelector("#temp-min").innerHTML =
     Math.round(response.data.main.temp_min);
    
    document.querySelector("#wind").innerHTML = 
    Math.round(response.data.wind.speed);
    
   
    document.querySelector("#humidity").innerHTML = 
    Math.round(response.data.main.humidity);
    
   document.querySelector("#city").innerHTML =
   response.data.name;
    
    document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  }
  
  let citySearch = document.querySelector("#search-form");
  citySearch.addEventListener("submit", handleSubmit);
  
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
  
  searchCity("London");
  
  
  
  
  
  

  