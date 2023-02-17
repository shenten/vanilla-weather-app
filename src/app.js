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
   let descriptionElemnt = document.querySelector("#description");
   let humidityElement = document.querySelector("#humidity");
   let windElement = document.querySelector("#wind");
   let dateElement = document.querySelector("#date");
   
   temperatureElement.innerHTML = Math.round(response.data.temperature.current);
   cityElement.innerHTML = response.data.city;
   descriptionElemnt.innerHTML = response.data.condition.description;
   humidityElement.innerHTML = response.data.temperature.humidity;
   windElement.innerHTML = response.data.wind.speed;
   dateElement.innerHTML = formatDate(response.data.time * 1000);

}
let city = "London"
let apiKey = `t95eob0fafd730717b08ab0a804ec543`;
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);

