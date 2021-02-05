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
var searchBtn = document.getElementById("searchButton");

// function to search for city
function searchCity(event) {
// purpose is to have an api call for current and future weather conditions
    event.preventDefault();
    var requestURL = "api.openweathermap.org/data/2.5/weather?q=${city}&appid=b5afdd7ae8d071c9c6eeca44924bd997"
    fetch(requestURL)
    
};

// store search in local storage
function storeCity(){

};
// display list of cities from local storage
function displayStorage(){

};

// function to display city weather info and date in jumbotron
function showCity(){

};

// function to change UV index color based on number
function uvIndex(){

};

// function to update 5 day forecast
function showForecast(){

};

// event listener for search button
searchBtn.addEventListener("click", searchCity);




