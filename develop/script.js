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
var searchedCities = [];


// function to search for city
function searchCity(event) {
    // purpose is to have an api call for current and future weather conditions
    event.preventDefault();
    // getting value from input box
    var city = document.querySelector("#city").value.trim();
    console.log("input value: " + city);
    // using a http get request
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    var requestURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b5afdd7ae8d071c9c6eeca44924bd997`
    console.log(requestURL)
    fetch(requestURL, requestOptions)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            console.log("weather desc: " + data.weather[0].description)
        })
    // adding city entered by user to an array
    searchedCities.push(city);
    // storing that array in local storage
    window.localStorage.setItem("cities", JSON.stringify(searchedCities));
    //storeCity();
    function displayStorage() {
        searchedCities = JSON.parse(localStorage.getItem("cities"))
        var cityHistory = document.createElement("div");
        cityHistory.classList.add("dropdown-item");
        cityHistory.textContent = city;
        recentCities.appendChild(cityHistory);
    };
    displayStorage();


};

// store search in local storage
// function storeCity(){
//     window.localStorage.setItem("cities", JSON.stringify(city));
//     console.log("city", city)

// };
// display list of cities from local storage
// function displayStorage() {
//     // allScores = JSON.parse(localStorage.getItem("scoreboard"));
//     // allScores.forEach((element) => {
//     //     var scoreDiv = document.createElement("div");
//     //     scoreDiv.textContent = `Initials: ${element.initials}, Score: ${element.score} `
//     //     quiz.appendChild(scoreDiv);
//     searchedCities = JSON.parse(localStorage.getItem("cities"))
//     searchedCities.forEach((element) =>{
//         var cityHistory = document.createElement("div");
//         cityHistory.textContent = element.city;
//         console.log("city history: " + cityHistory)
//         recentCities.appendChild(cityHistory);
//     })


// };

// function to display city weather info and date in jumbotron
function showCity() {
    // I want to display city name, date, icon for weather, temperature, humidity,
    // wind speed, and UV index
};

// function to change UV index color based on number
function uvIndex() {

};

// function to update 5 day forecast
function showForecast() {

};

// event listener for search button
searchBtn.addEventListener("click", searchCity);


