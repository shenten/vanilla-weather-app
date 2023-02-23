function formatDate(timestamp){
    let date = new Date();
    let hours = date.getHours();
     if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday" ]
    let day = days[date.getDay()]; 
    return `${day} ${hours}:${minutes}`;
    
}

function getForecast(coordinates) {
    let apiKey = `t95eob0fafd730717b08ab0a804ec543`;
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`
    axios.get(apiUrl).then(displayForecast)

}

function displayTemperature(response){
  
   let temperatureElement = document.querySelector("#temperature");
   let cityElement = document.querySelector("#city");
   let descriptionElement = document.querySelector("#description");
   let humidityElement = document.querySelector("#humidity");
   let windElement = document.querySelector("#wind");
   let dateElement = document.querySelector("#date");
   let iconElement = document.querySelector("#icon");
   celciusTemperature = response.data.temperature.current;
   
   temperatureElement.innerHTML = Math.round(celciusTemperature);
   cityElement.innerHTML = response.data.city;
   descriptionElement.innerHTML = response.data.condition.description;
   humidityElement.innerHTML = response.data.temperature.humidity;
   windElement.innerHTML = response.data.wind.speed;
   dateElement.innerHTML = formatDate(response.data.time * 1000);
   iconElement.setAttribute("src", response.data.condition.icon_url)
   iconElement.setAttribute("alt", response.data.condition.icon)

   getForecast(response.data.coordinates);
  
}


function search(city){
let apiKey = `t95eob0fafd730717b08ab0a804ec543`;
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);

}

function handleSubmit(event){
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
   search(cityInputElement.value);
}



function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  if (!forecast || forecast.length === 0) {
    forecastElement.innerHTML = "<div>No forecast available.</div>";
    return;
  }

  let forecastHTML = "<div class='row'>";
  let daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let today = new Date();
  for (let i = 1; i < 6; i++) {
    let date = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);
    let weekday = daysOfWeek[date.getDay()];
    let day = forecast[i - 1];
    forecastHTML += `<div class="col-2">
      <div class="weather-forecast-date">${weekday}</div>
      <div><img src="${day.condition.icon_url}" /></div>
      <div class="weather-forecast-temperatures">
        <span class="weather-forecast-temperature-maximum">${Math.round(day.temperature.maximum)}</span>°
        <span class="weather-forecast-temperature-minimum">${Math.round(day.temperature.minimum)}</span>°
      </div>
    </div>`;
  }
  forecastHTML += "</div>";
  forecastElement.innerHTML = forecastHTML;
}


let celciusTemperature = null;



let form = document.querySelector("#search-form")
form.addEventListener("submit", handleSubmit)

search("London")
