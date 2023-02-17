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
  
}

function displayTemperatureForecast(response){

    let temperatureElementHigh = document.querySelector("#highTemp");
    temperatureElementHigh.innerHTML = Math.round(response.data.daily[0].temperature.maximum);
    let temperatureElementLow = document.querySelector("#lowTemp");
    temperatureElementLow.innerHTML = Math.round(response.data.daily[0].temperature.minimum);
}

function search(city){
let apiKey = `t95eob0fafd730717b08ab0a804ec543`;
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
let apiUrlForecast = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`
axios.get(apiUrl).then(displayTemperature);
axios.get(apiUrlForecast).then(displayTemperatureForecast);
}

function handleSubmit(event){
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
   search(cityInputElement.value);
}

function displayFareheitTemp(event){
    event.preventDefault();
    celciusLink.classList.remove("active");
    farenheitLink.classList.add("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celciusTemperature * 9/5 + 32);
}

function displayCelciusTemp(event){
    event.preventDefault();
    farenheitLink.classList.remove("active");
    celciusLink.classList.add("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celciusTemperature);
}

let celciusTemperature = null;

let farenheitLink = document.querySelector("#farenheit");
farenheitLink.addEventListener("click", displayFareheitTemp);

let celciusLink = document.querySelector("#celcius");
celciusLink.addEventListener("click", displayCelciusTemp);

let form = document.querySelector("#search-form")
form.addEventListener("submit", handleSubmit)

search("London")