function fetchData(location) {
  return fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/today?key=W58HSHB4PGYWTXWLGDAWT6NS8 `
  )
    .then(function (response) {
      return response.json();
    })
    .catch(function (error) {
      console.log(error);
    });
}
function fetchAqi(location) {
  return fetch(
    `https://api.waqi.info/feed/${location}/?token=a179dc3954f12fb05c29e0420156a27c387493ef`
  )
    .then(function (response) {
      return response.json();
    })
    .catch(function (error) {
      console.log(error);
    });
}
let showgif = document.querySelector(".showgif");
let searchbtn = document.querySelector(".searchbtn");
let weather = {};
let aqiJson = {};
searchbtn.addEventListener("click", function () {
  let search = document.querySelector(".search").value;
  let weatherdiv = document.querySelector(".weather");
  weatherdiv.innerHTML = "";
  aqiJson = fetchAqi(search);
  aqiJson
    .then((data) => {
      displayAqi(data);
      console.log(data);
    })
    .catch(function (error) {
      console.log(error);
    });
  weather = fetchData(search);
  weather
    .then((data) => {
      displayweather(data);
      console.log(data);
      // return data.currentConditions.icon;
    })
    .catch(function (error) {
      let weatherdiv = document.querySelector(".weather");
      weatherdiv.innerHTML = "";
      let err = document.createElement("div");
      err.innerText = "City not found";
      err.classList.add("error");
      weatherdiv.appendChild(err);
    });

  document.querySelector(".search").value = "";
});
let input = document.querySelector(".search");
input.addEventListener("keypress", function (event) {
  let search = input.value;
  if (event.key == "Enter" && search) {
    let weatherdiv = document.querySelector(".weather");
    weatherdiv.innerHTML = "";
    aqiJson = fetchAqi(search);
    aqiJson
      .then((data) => {
        displayAqi(data);
        console.log(data);
      })
      .catch(function (error) {
        console.log(error);
      });
    weather = fetchData(search);
    weather
      .then((data) => {
        displayweather(data);
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
      });
    document.querySelector(".search").value = "";
  }
});
let isCelsius = false;
let toggleUnit = document.querySelector(".changeunit");

toggleUnit.addEventListener("click", () => {
  unitbtntoggle();
  weather.then((data) => {
    displayweather(data);
  });
});

function unitbtntoggle() {
  if (isCelsius) {
    toggleUnit.innerText = "°C";
    isCelsius = false;
  } else {
    toggleUnit.innerText = "°F";
    isCelsius = true;
  }
}
unitbtntoggle();

let displayweather = function (data) {
  let weatherdiv = document.querySelector(".weather");

  if (isCelsius) {
    let temp = Math.round(((Number(data.currentConditions.temp) - 32) * 5) / 9);
    let currenttemp = document.createElement("div");
    currenttemp.innerHTML = ` ${temp}°<span>C</span>`;
    weatherdiv.appendChild(currenttemp);
    let description = document.createElement("div");
    description.innerText = `${data.currentConditions.conditions}`;
    let humidity = document.createElement("div");
    humidity.innerText = `Humidity: ${data.currentConditions.humidity}%`;
    let address = document.createElement("div");
    address.innerText = ` ${data.resolvedAddress}`;
    address.classList.add("address");
    humidity.classList.add("humidity");
    description.classList.add("description");
    currenttemp.classList.add("currenttemp");
    weatherdiv.appendChild(description);
    weatherdiv.appendChild(humidity);
    weatherdiv.appendChild(address);
  } else {
    let currenttemp = document.createElement("div");
    let temp = Math.floor(data.currentConditions.temp);
    currenttemp.innerHTML = ` ${temp}°<span>F</span>`;
    weatherdiv.appendChild(currenttemp);
    let description = document.createElement("div");
    description.innerText = ` ${data.currentConditions.conditions}`;
    let humidity = document.createElement("div");
    humidity.innerText = `Humidity: ${data.currentConditions.humidity}%`;
    let address = document.createElement("div");
    address.innerText = ` ${data.resolvedAddress}`;
    address.classList.add("address");
    humidity.classList.add("humidity");

    description.classList.add("description");
    currenttemp.classList.add("currenttemp");
    weatherdiv.appendChild(description);
    weatherdiv.appendChild(humidity);
    weatherdiv.appendChild(address);
  }
};
function displayAqi(data) {
  let weatherdiv = document.querySelector(".weather");
  let aqi = document.createElement("div");
  aqi.innerText = `AQI: ${data.data.aqi} `;
  aqi.classList.add("windspeed");
  weatherdiv.appendChild(aqi);

  console.log(data.data.aqi);
}

function defaultWeather() {
  let search = "delhi";
  let weatherdiv = document.querySelector(".weather");
  weatherdiv.innerHTML = "";
  weather = fetchData(search);
  weather.then((data) => {
    displayweather(data);
    console.log(data);
    return data.currentConditions.icon;
  });
  aqiJson = fetchAqi(search);
  aqiJson
    .then((data) => {
      displayAqi(data);
      console.log(data);
    })
    .catch(function (error) {
      console.log(error);
    });
  document.querySelector(".search").value = "";
}
defaultWeather();
