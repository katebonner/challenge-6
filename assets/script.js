// API KEY
var key = "0d36cf1eac97c7615ce2fe5b1d9f0b12";

// GET DATE
function getTheDate(day) {
    var currentdate = new Date(); 
    var dayDate = parseInt(day);
    var datetime = (currentdate.getMonth()+1) + "/"
                    + (currentdate.getDate() + dayDate) + "/"
                    + currentdate.getFullYear();
    return datetime
    }
   
// DIVS TO WHICH TO APPEND DATA
var searchDiv = document.querySelector("#search");
var currentDiv = document.querySelector("#current");
var forcastDiv = document.querySelector("#forcast");

// DISPLAY SEARCH BAR
var searchBar = document.createElement("input");
searchBar.setAttribute("class", "search-bar");
var searchBtn = document.createElement("Button");
searchBtn.setAttribute("class", "search-button")
searchBtn.textContent = "search";
searchDiv.appendChild(searchBar);
searchDiv.appendChild(searchBtn);

// GET RECENT SEARCH HISTORY
function allStorage() {
    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;
    while ( i-- ) {
        values.push(localStorage.getItem(keys[i]));
    }
    return values;
}

// DISPLAY RECENT SEARCH HISTORY
function displaySearch(){
    var recentSearch = allStorage();
    for (i = 0 ; i < recentSearch.length ; i++){
        var recentSearchEl = document.createElement("p");
        recentSearchEl.setAttribute("class", "search-element");
        recentSearchEl.textContent = recentSearch[i];
        searchDiv.appendChild(recentSearchEl);
    }
}

// // CLEAR RECENT SEARCH DIVS
var clearSearch = function() {
    var oldSearchElement = $(".search-element");
    oldSearchElement.remove();
}

// DISPLAY CURRENT WEATHER DATA
var displayCurrentWeather = function(data, city) {

    //CREATE DIVS
    var cardDiv = document.createElement("div");
    cardDiv.setAttribute("class", "current-weather col-12");
    var cityHeading = document.createElement("h2");
    cityHeading.setAttribute("class", "city-heading");
    var locallyStoredCity = localStorage.getItem(city);
    cityHeading.textContent = locallyStoredCity;
    var currentDate = document.createElement("h3");
    currentDate.setAttribute("class", "current-date");
    currentDate.textContent = getTheDate(0);
    var weatherIcon = document.createElement("img");
    weatherIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + data.current.weather[0].icon + ".png");
    weatherIcon.setAttribute("class", "current-weather-icon")
    var currentWeatherList = document.createElement("div");
    currentWeatherList.setAttribute("class", "current-weather-list");
    var temp = document.createElement("p");
    temp.setAttribute("class", "temp");
    temp.textContent = "Temp: " + data.current.temp;
    var humidity = document.createElement("p");
    humidity.setAttribute("class", "humidity");
    humidity.textContent = "Humidity: " + data.current.humidity;
    var windSpeed = document.createElement("p");
    windSpeed.setAttribute("class", "windSpeed");
    windSpeed.textContent = "Wind Speed: "+ data.current.wind_speed;
    var uvIndex = document.createElement("p");
    uvIndex.setAttribute("class", "uvIndex");
    uvIndex.textContent = "UV Index: " + data.current.uvi;
    
    // UV INDEX COLOR 
    if (data.current.uvi < 3.33) {
        uvIndex.style.backgroundColor = "#93ff07"
    }
    else if ((data.current.uvi >= 3.33) && (data.current.uvi < 6.66)){
        uvIndex.style.backgroundColor = "#ff7f07"
    }
    else {
        uvIndex.style.backgroundColor = "#ff0741"
    }

    //APPEND DIVS
    cardDiv.appendChild(cityHeading);
    cardDiv.appendChild(currentDate);
    currentWeatherList.appendChild(weatherIcon);
    currentWeatherList.appendChild(temp);
    currentWeatherList.appendChild(humidity);
    currentWeatherList.appendChild(windSpeed);
    currentWeatherList.appendChild(uvIndex);
    cardDiv.appendChild(currentWeatherList);
    currentDiv.appendChild(cardDiv);
}

// DISPLAY FORCAST
var displayForcast = function(data, i) {

    //CREATE DIVS
    var forcastCardDiv = document.createElement("div");
    forcastCardDiv.setAttribute("class", "forcast-weather col-md-2 col-5");
    var forcastDate = document.createElement("h6")
    forcastDate.setAttribute("class", "forcast-date");
    forcastDate.textContent = getTheDate(i);
    var forcastIcon = document.createElement("img");
    forcastIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png");
    var forcastTemp = document.createElement("p");
    forcastTemp.setAttribute("class", "forcast-temp");
    forcastTemp.textContent = "Temp: " + data.temp.day;
    var forcastWindSpeed = document.createElement("p");
    forcastWindSpeed.setAttribute("class", "forcast-wind-spped")
    forcastWindSpeed.textContent = "Wind Speed: " + data.wind_speed;
    var forcastHumidity = document.createElement("p");
    forcastHumidity.setAttribute("class", "forcast-humidity");
    forcastHumidity.textContent = "Humidity: " + data.humidity;

    //APPEND DIVS
    forcastCardDiv.appendChild(forcastDate);
    forcastCardDiv.appendChild(forcastIcon);
    forcastCardDiv.appendChild(forcastTemp);
    forcastCardDiv.appendChild(forcastWindSpeed);
    forcastCardDiv.appendChild(forcastHumidity);
    forcastDiv.appendChild(forcastCardDiv)
    
}

// CLEAR WEATHER
var clearWeather = function() {
    var oldCurrentElement = document.querySelector(".current-weather")
    var oldForcastElement = document.querySelector(".forcast-weather")
    if (oldCurrentElement && oldForcastElement) {
        currentDiv.removeChild(oldCurrentElement);
        forcastDiv.removeChild(oldForcastElement);
        for (i = 0 ; i < 4 ; i++) {
            var oldForcastElement = document.querySelector(".forcast-weather")
            forcastDiv.removeChild(oldForcastElement);
        }
    }
}

// GET WEATHER FUNCTION
var getWeather = function(city) {
    var locationUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + key;
    localStorage.setItem(city, city);
    fetch(locationUrl)
        .then(function(response) {
            response.json().then(function(data) {
                var lat = data[0].lat;
                var long = data[0].lon;
                var units = "metric";
                var weatherUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&units=" + units + "&appid=" + key;
                fetch(weatherUrl).then(function(response){
                    response.json().then (function(data) {
            
                        // DISPLAY CURRENT WEATHER
                        displayCurrentWeather(data, city);

                        // DISPLAY 5 DAY FORCAST
                        for (i = 1 ; i < 6 ; i++){
                            displayForcast(data.daily[i], i);
                        }
                    })
                })
            })
        })
        .catch(function(error) {
            alert('failed to connect to server');
        })

}
displaySearch();


function searchElementHandler(event){
    var target = $(event.target);
    console.log(target);
    var searchElementInput = event.target.textContent;
    console.log("target is search element")
    clearWeather();
    getWeather(searchElementInput);
    clearSearch();
    displaySearch();
    $(".search-element").click(searchElementHandler);
}

function searchButtonHandler(event){
        var searchInput = $(".search-bar").val();
        $(".search-bar").val("");
        console.log("target is search button")
        clearWeather();
        getWeather(searchInput);
        clearSearch();
        displaySearch();
        $(".search-element").click(searchElementHandler);
}

$(".search-element").click(searchElementHandler);
$(".search-button").click(searchButtonHandler);






