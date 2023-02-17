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
   windElement.innerHTML = response.data.wind.speed;
   let dateElement = document.querySelector("#date");
   dateElement.innerHTML = formatDate(response.data.time * 1000);
    console.log(response.data.time);
}

apiKey = `t95eob0fafd730717b08ab0a804ec543`;
apiUrl = `https://api.shecodes.io/weather/v1/current?query=${"erbil"}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);

