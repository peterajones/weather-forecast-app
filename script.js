const weatherURL = "http://api.openweathermap.org/data/2.5/weather";
const forecastURL = "http://api.openweathermap.org/data/2.5/forecast";
const API_KEY = "f18ef6f1c2a4a0defca271fad600db1d";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

const shortDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

function activatePlacesSearch() {
  const input = document.getElementById("search_input");
  const options = {
    types: ["(cities)"]
  };
  const autocomplete = new google.maps.places.Autocomplete(input, options);
}

const getData = () => {
  let searchTerm = document.getElementById("search_input");
  let result = searchTerm.value.split(",");
  searchTerm.value = ""; // reset input field

  // get the chosen city's current weather
  fetch(`${weatherURL}/?q=${result}&APPID=${API_KEY}`).then(response => {
    if (response.status !== 200) {
      console.log(
        `Looks like there was a problem... STATUS CODE: ${response.status}`
      );
      const weatherOutput = document.getElementById("weatherOutput");
      weatherOutput.innerHTML = `
        <p class='error-msg'>Looks like there was a problem... Please try again.</p>
      `;
      const forecastOutput = document.getElementById("forecastOutput");
      forecastOutput.innerHTML = "";
      return;
    }
    response
      .json()
      .then(data => {
        appendWeather(data);
      })
      .catch(err => {
        console.log(err);
      });
  });
  const appendWeather = data => {
    let icon = data.weather[0].icon;
    let date = new Date();
    const weatherOutput = document.getElementById("weatherOutput");
    weatherOutput.innerHTML += `
    <h2>${data.name}, ${data.sys.country}</h2>
    <p class="date-time">
      ${days[date.getDay()]} 
      ${date.getDate()} 
      ${months[date.getMonth()]}. 
      ${(date.getHours() + 24) % 12 || 12}:${
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
    } 
      ${date.getHours() > 12 ? "PM" : "AM"}, 
      <span class="weather-conditions">${data.weather[0].description}</span>
    </p>
    <div class="current-weather-wrapper">
      <div class="row-1">
        <span class="currentTemp">${parseFloat(data.main.temp - 273.15).toFixed(
          1
        )}&#8451;</span>  
        <span class='weather-icon'><img src="http://openweathermap.org/img/wn/${icon}@2x.png" /></span>
      </div>
      
      <div class='row-2'>
        <span class="wind-speed">Wind: ${Math.round(
          data.wind.speed * 3.6
        )} Km/h</span>
        <span class="humidity">Humidity: ${data.main.humidity}%</span>
      </div>
    </div> 
    `;
  };

  // get the chosen city's 5 day forecast
  fetch(`${forecastURL}/?q=${result}&APPID=${API_KEY}`).then(response => {
    if (response.status !== 200) {
      console.log(
        `Looks like there was a problem... STATUS CODE: ${response.status}`
      );
      return;
    }
    response
      .json()
      .then(forecast => {
        appendForecast(forecast);
      })
      .catch(err => {
        console.log(err);
      });
  });
  const appendForecast = forecast => {
    const forecastOutput = document.getElementById("forecastOutput");
    forecastOutput.innerHTML += `
    <h4>5 day forecast</h4>
    <div class='forecast'>`;
    for (let i = 1; i < forecast.list.length; i++) {
      let day = new Date(forecast.list[i].dt * 1000).getDay();
      let date = new Date(forecast.list[i].dt * 1000).getDate();
      if (forecast.list[i].dt_txt.includes("12:00:00")) {
        forecastOutput.innerHTML += `
      <div class='day-data'>
        <div class='day'>
            ${shortDays[day]} 
            ${date < 10 ? "0" + date : date}
          </div>
          <div class='icon'>
            <img src="http://openweathermap.org/img/wn/${
              forecast.list[i].weather[0].icon
            }@2x.png" />
          </div>
          <div class='temps'>${parseFloat(
            forecast.list[i].main.temp - 273.15
          ).toFixed(1)}&#8451;
          </div>
        </div>
      </div>
      `;
      }
    }
    forecastOutput.innerHTML += `
    <footer>
      <div class="widget-left-menu__links"><span>Powered by </span><a href="//openweathermap.org/" target="_blank" class="widget-left-menu__link">OpenWeatherMap</a></div>
    </footer>`;
  };
};

// remove search input data, weather data + forecast data from page on :focus
let search_input = document.getElementById("search_input");
let fetched_data = document.getElementById("output");
search_input.onfocus = () => {
  weatherOutput.innerHTML = "";
  forecastOutput.innerHTML = "";
};
