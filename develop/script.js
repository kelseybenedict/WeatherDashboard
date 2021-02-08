// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
var weatherIcons = {
    sunny: "☀️",
    cloudy: "☁",
    partlySunny: "⛅",
    rainy: "🌧",
    snowy: "❄️",
    stormy: "⛈",
    windy: "🌬",
    foggy: "🌫",
}
// var date = moment().format('MMMM Do YYYY');
// console.log(date)
var searchBtn = document.getElementById("searchButton");
var recentCities = document.getElementById("recentCities");
var mainDisplay = document.getElementById("mainDisplay");
var searchedCities = [];
let lat;
let long;
var nameOfCity = document.getElementById("cityName");
let temperature = document.getElementById("temp");
let humidity = document.getElementById("humidity");
let windSpeed = document.getElementById("windspeed");
let uv = document.getElementById("uv");
let weatherArray = [];


// function to search for city
function searchCity(event) {
    // purpose is to have an api call for current and future weather conditions
    event.preventDefault();
    // getting value from input box
    var city = document.querySelector("#city").value.trim();
    //console.log("input value: " + city);
    // using a http get request
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    var requestURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b5afdd7ae8d071c9c6eeca44924bd997`
    fetch(requestURL, requestOptions)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            lat = data.coord.lat;
            long = data.coord.lon;
            cityName = data.name
            oneCallAPI()
        })
    // adding city entered by user to an array
    searchedCities.push(city);
    // storing that array in local storage
    window.localStorage.setItem("cities", JSON.stringify(searchedCities));
    //storeCity();
    // display list of cities from local storage
    function displayStorage() {
        searchedCities = JSON.parse(localStorage.getItem("cities"))
        var cityHistory = document.createElement("div");
        cityHistory.classList.add("dropdown-item");
        cityHistory.textContent = city;
        recentCities.appendChild(cityHistory);
    };
    displayStorage();

};

// function to call One Call API to get UV index
function oneCallAPI() {
    var oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=imperial&exclude=minutely,hourly&appid=b5afdd7ae8d071c9c6eeca44924bd997`
    fetch(oneCallUrl)
        .then(function (response) {
            return response.json();
    })
        .then(function (data) {
            //console.log("NEW", data)
            var weatherInfo = {
                weatherDesc: data.current.weather[0].description,
                temp: data.current.temp,
                name: cityName,
                humidity: data.current.humidity,
                wind: data.current.wind_speed,
                uvIndex: data.current.uvi
            }
            weatherArray = Object.values(weatherInfo)
            console.log("my weather", weatherArray)
            showCity();
        }) 
       
            
}
// TO DO: do the same thing from lines 59-62 to extract my weather info and display it in jumbotron
// google index values 

// function to display city weather info and date in jumbotron
function showCity() {
    // I want to display city name, date, icon for weather, temperature, humidity,
    // wind speed, and UV index
    
    var name = document.createElement("h3");
   
    if (weatherArray[0].includes("cloud")){
        name.textContent = weatherArray[2] + weatherIcons.cloudy;
    } else if ((weatherArray[0].includes("sun")) || (weatherArray[0].includes("clear"))){
        name.textContent = weatherArray[2] + weatherIcons.sunny;
    }
    else if (weatherArray[0].includes("part")){
        name.textContent = weatherArray[2] + weatherIcons.partlySunny;
    }
    else if (weatherArray[0].includes("wind")){
        name.textContent = weatherArray[2] + weatherIcons.windy;
    }
    else if (weatherArray[0].includes("snow")){
        name.textContent = weatherArray[2] + weatherIcons.snowy;
    }
    else if (weatherArray[0].includes("thunder")){
        name.textContent = weatherArray[2] + weatherIcons.stormy;
    }
    else if (weatherArray[0].includes("rain")){
        name.textContent = weatherArray[2] + weatherIcons.rainy;
    }
    else if (weatherArray[0].includes("fog")){
        name.textContent = weatherArray[2] + weatherIcons.foggy;
    }// add current date and icon;
    var temp = document.createElement("p");
    temp.textContent = "Temperature: " + weatherArray[1] + " ºF";
    var hum = document.createElement("p");
    hum.textContent = "Humidity: " + weatherArray[3] + "%";
    var wind = document.createElement("p");
    wind.textContent = "Wind speed: " + weatherArray[4] + " MPH";
    var uvi = document.createElement("p");
    uvi.textContent = "UV Index: " + weatherArray[5];



    console.log("display", weatherArray);
    nameOfCity.appendChild(name);
    temperature.appendChild(temp);
    humidity.appendChild(hum);
    windSpeed.appendChild(wind);
    uv.appendChild(uvi);


};

// function to change UV index color based on number
function uvIndex() {

};

// function to update 5 day forecast
function showForecast() {

};

// event listener for search button
searchBtn.addEventListener("click", searchCity);


