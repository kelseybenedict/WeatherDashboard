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
let forecastArray1 = [];
let day1 = document.getElementById("dayOne");
let day2 = document.getElementById("dayTwo"); 
let day3 = document.getElementById("dayThree"); 
let day4 = document.getElementById("dayFour");
let day5 = document.getElementById("dayFive");


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
        // recording latitude and longitude to give oneCallAPI
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
    showForecast();

};

// function to call One Call API to get UV index and other criteria
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

    if (weatherArray[0].includes("cloud")) {
        name.textContent = weatherArray[2] + weatherIcons.cloudy;
    } else if ((weatherArray[0].includes("sun")) || (weatherArray[0].includes("clear"))) {
        name.textContent = weatherArray[2] + weatherIcons.sunny;
    }
    else if (weatherArray[0].includes("part")) {
        name.textContent = weatherArray[2] + weatherIcons.partlySunny;
    }
    else if (weatherArray[0].includes("wind")) {
        name.textContent = weatherArray[2] + weatherIcons.windy;
    }
    else if (weatherArray[0].includes("snow")) {
        name.textContent = weatherArray[2] + weatherIcons.snowy;
    }
    else if (weatherArray[0].includes("thunder")) {
        name.textContent = weatherArray[2] + weatherIcons.stormy;
    }
    else if (weatherArray[0].includes("rain")|| weatherArray[0].includes("shower") || weatherArray[0].includes("drizzle")) {
        name.textContent = weatherArray[2] + weatherIcons.rainy;
    }
    else if (weatherArray[0].includes("fog")) {
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

    nameOfCity.appendChild(name);
    temperature.appendChild(temp);
    humidity.appendChild(hum);
    windSpeed.appendChild(wind);
    uv.appendChild(uvi);
    uvIndex();


};

// function to change UV index color based on number
function uvIndex() {
    if (weatherArray[5] <= 3) {
        uv.classList.add("low");
    }
    else if ((weatherArray[5] > 3) && (weatherArray[5] <= 6)) {
        uv.classList.add("moderate");
    }
    else if (weatherArray[5] > 6) {
        uv.classList.add("high");
    }
};

// function to update 5 day forecast
function showForecast() {
    city = document.querySelector("#city").value.trim();
    var forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=b5afdd7ae8d071c9c6eeca44924bd997`
    fetch(forecast)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var forecastCity = data.city.name;
            var forecastDay1 = {
                temp: data.list[0].main.temp,
                hum: data.list[0].main.humidity
            }
            var forecastDay2 = {
                temp: data.list[1].main.temp,
                hum: data.list[1].main.humidity
            }
            var forecastDay2 = {
                temp: data.list[2].main.temp,
                hum: data.list[2].main.humidity
            }
            var forecastDay2 = {
                temp: data.list[3].main.temp,
                hum: data.list[3].main.humidity
            }
            var forecastDay2 = {
                temp: data.list[4].main.temp,
                hum: data.list[4].main.humidity
            }
            forecastArray1 = Object.values(forecastDay1)
        })
        if (cityName === window.forecastCity){
            var forecastTemp = document.createElement("p");
            forecastTemp.textContent = forecastArray1;
            day1.appendChild(forecastTemp)
        }
}

// event listener for search button
searchBtn.addEventListener("click", searchCity);


