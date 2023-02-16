
function displayTemperature(response){
    console.log(response);
   let temperatureElement = document.querySelector("#temperature");
   temperatureElement.innerHTML = Math.round(response.data.temperature.current);
   let cityElement = document.querySelector("#city");
   cityElement.innerHTML = response.data.city;
   let descriptionElemnt = document.querySelector("#description");
   descriptionElemnt.innerHTML = response.data.condition.description;
   let humidityElement = document.querySelector("#humidity");
   humidityElement.innerHTML = response.data.temperature.humidity;
   let windElement = document.querySelector("#wind");
   windElement.innerHTML = response.data.wind.speed.;
}

apiKey = `t95eob0fafd730717b08ab0a804ec543`;
apiUrl = `https://api.shecodes.io/weather/v1/current?query=${"london"}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);

