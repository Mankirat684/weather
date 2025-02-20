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
  .then((searchquery)=>{
    let gifpromise = fetchgif(searchquery);
    gifpromise.then((data)=>{
        console.log(data);
        let img = document.createElement("img");
        img.src = data.data[0].images.original.url;
        showgif.innerHTML = "";
        showgif.appendChild(img);
    })
  })  
  document.querySelector(".search").value = "";

 
});
let isCelsius = false;
let toggleUnit = document.querySelector(".changeunit");

toggleUnit.addEventListener("click",()=>{
    if(isCelsius){
        toggleUnit.innerText = "Change to °C";
        isCelsius = false;
        weather.then((data)=>{displayweather(data);});
    }else{
        toggleUnit.innerText = "Change to °F";
        isCelsius = true;
        weather.then((data)=>{displayweather(data);});
    }
})
let displayweather = function(data){
    let weatherdiv = document.querySelector(".weather");
    weatherdiv.innerHTML = "";
    if(isCelsius){
        let temp = Math.round((Number(data.currentConditions.temp) - 32) * 5/9)+""+ "°C";
        let currenttemp = document.createElement("div");
        currenttemp.innerText = `Current Temperature: ${(temp)}`;
        weatherdiv.appendChild(currenttemp);
        let description = document.createElement("div");
        description.innerText = `Description: ${data.currentConditions.conditions}`;
        let windSpeed = document.createElement("div");
        windSpeed.innerText = `Wind Speed: ${data.currentConditions.windspeed} km/h`;
        let humidity = document.createElement("div");
        humidity.innerText = `Humidity: ${data.currentConditions.humidity}%`;
        let address = document.createElement("div");    
        address.innerText = `Address: ${data.resolvedAddress}`;
address.classList.add("address")
        weatherdiv.appendChild(description);
        weatherdiv.appendChild(windSpeed);
        weatherdiv.appendChild(humidity);
        weatherdiv.appendChild(address);
    }else{
        let currenttemp = document.createElement("div");
        let temp = data.currentConditions.temp +""+ "°F";
        currenttemp.innerText = `Current Temperature: ${temp}`;
        weatherdiv.appendChild(currenttemp);
        let description = document.createElement("div");
        description.innerText = `Description: ${data.currentConditions.conditions}`;
        let windSpeed = document.createElement("div");
        windSpeed.innerText = `Wind Speed: ${data.currentConditions.windspeed} km/h`;
        let humidity = document.createElement("div");
        humidity.innerText = `Humidity: ${data.currentConditions.humidity}%`;
        let address = document.createElement("div");    
        address.innerText = `Address: ${data.resolvedAddress}`;
        weatherdiv.appendChild(description);
        weatherdiv.appendChild(windSpeed);
        weatherdiv.appendChild(humidity);
        weatherdiv.appendChild(address);
    }
}

