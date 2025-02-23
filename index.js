function fetchData(location){
  return  fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/today?key=W58HSHB4PGYWTXWLGDAWT6NS8 `
      )
        .then(function (response) {
           return response.json();
        })
        .catch(function (error) {
          console.log(error);
        });
}
function fetchgif(searchquery){
    const api_key = "rSdejONRQs4YBPCe8KYkqyiLUJSWaqB2";
    const url= `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${encodeURIComponent(searchquery)}&limit=1&rating=r&lang=en`
    return fetch(url)
    .then(function(response){
        return response.json();
    })
    .catch(function(error){
        console.log(error);
    });
}
let showgif = document.querySelector(".showgif");
let searchbtn = document.querySelector(".searchbtn");
let weather={};
searchbtn.addEventListener("click", function () {
  let search =  document.querySelector(".search").value;
  weather = fetchData(search);
  weather.then((data)=>{displayweather(data);
    console.log(data);
    return data.currentConditions.icon;
  })  
  .catch(function (error) {
    let weatherdiv = document.querySelector(".weather");
    weatherdiv.innerHTML = "";
    let err = document.createElement("div");
    err.innerText = "City not found"; 
    err.classList.add("error");
    weatherdiv.appendChild(err);
  })
  document.querySelector(".search").value = "";

 
});
let input = document.querySelector(".search");
input.addEventListener("keypress", function (event) {
  let search =  input.value;
  if (event.key == "Enter" &&search) {
    weather = fetchData(search);
    weather.then((data)=>{displayweather(data);
      console.log(data);
      return data.currentConditions.icon;
    })  
    .catch(function (error) {
      let weatherdiv = document.querySelector(".weather");
      weatherdiv.innerHTML = "";
      let err = document.createElement("div");
      err.innerText = "City not found"; 
      err.classList.add("error");
      weatherdiv.appendChild(err);
    })
    document.querySelector(".search").value = "";
  }
});
let isCelsius = false;
let toggleUnit = document.querySelector(".changeunit");

toggleUnit.addEventListener("click",()=>{
    unitbtntoggle()
    weather.then((data)=>{displayweather(data);});
})

function unitbtntoggle(){
    if(isCelsius){
        toggleUnit.innerText = "°C";
        isCelsius = false;
    }else{
        toggleUnit.innerText = "°F";
        isCelsius = true;
    }
}
unitbtntoggle();


let displayweather = function(data){
    let weatherdiv = document.querySelector(".weather");
    weatherdiv.innerHTML = "";
    if(isCelsius){
        let temp = Math.round((Number(data.currentConditions.temp) - 32) * 5/9);
        let currenttemp = document.createElement("div");
        currenttemp.innerHTML = ` ${temp}°<span>C</span>`;
        weatherdiv.appendChild(currenttemp);
        let description = document.createElement("div");
        description.innerText = `${data.currentConditions.conditions}`;
        let windSpeed = document.createElement("div");
        windSpeed.innerText = `Wind: ${data.currentConditions.windspeed} km/h`;
        let humidity = document.createElement("div");
        humidity.innerText = `Humidity: ${data.currentConditions.humidity}%`;
        let address = document.createElement("div");    
        address.innerText = ` ${data.resolvedAddress}`;
        address.classList.add("address");
        humidity.classList.add("humidity");
        windSpeed.classList.add("windspeed");
        description.classList.add("description");
        currenttemp.classList.add("currenttemp");
        weatherdiv.appendChild(description);
        weatherdiv.appendChild(windSpeed);
        weatherdiv.appendChild(humidity);
        weatherdiv.appendChild(address);
    }else{
        let currenttemp = document.createElement("div");
        let temp = Math.floor(data.currentConditions.temp);
        currenttemp.innerHTML = ` ${temp}°<span>F</span>`;
        weatherdiv.appendChild(currenttemp);
        let description = document.createElement("div");
        description.innerText = ` ${data.currentConditions.conditions}`;
        let windSpeed = document.createElement("div");
        windSpeed.innerText = `Wind: ${data.currentConditions.windspeed} km/h`;
        let humidity = document.createElement("div");
        humidity.innerText = `Humidity: ${data.currentConditions.humidity}%`;
        let address = document.createElement("div");    
        address.innerText = ` ${data.resolvedAddress}`;
        address.classList.add("address");
        humidity.classList.add("humidity");
        windSpeed.classList.add("windspeed");
        description.classList.add("description");
        currenttemp.classList.add("currenttemp");
        weatherdiv.appendChild(description);
        weatherdiv.appendChild(windSpeed);
        weatherdiv.appendChild(humidity);
        weatherdiv.appendChild(address);
    }
}

function defaultWeather() {
  let search =  "delhi"
  weather = fetchData(search);
  weather.then((data)=>{displayweather(data);
    console.log(data);
    return data.currentConditions.icon;
  })
  document.querySelector(".search").value = "";

 
};
defaultWeather()
