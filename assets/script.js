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

// DISPLAY CURRENT WEATHER DATA
var displayCurrentWeather = function(data) {

    //CREATE DIVS
    var cardDiv = document.createElement("div");
    cardDiv.setAttribute("class", "current-weather");
    var cityHeading = document.createElement("h1");
    cityHeading.setAttribute("class", "city-heading");
    var locallyStoredCity = localStorage.getItem("city");
    cityHeading.textContent = locallyStoredCity;
    var currentDate = document.createElement("h2");
    currentDate.setAttribute("class", "current-date");
    currentDate.textContent = getTheDate(0);
    var weatherIcon = document.createElement("img");
    weatherIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + ".png");
    var currentWeatherList = document.createElement("div");
    currentWeatherList.setAttribute("class", "current-weather-list");
    var temp = document.createElement("p");
    temp.setAttribute("class", "temp");
    temp.textContent = "Temperature: " + data.current.temp;
    var humidity = document.createElement("p");
    humidity.setAttribute("class", "humidity");
    humidity.textContent = "Humidity: " + data.current.humidity;
    var windSpeed = document.createElement("p");
    windSpeed.setAttribute("class", "windSpeed");
    windSpeed.textContent = "Wind Speed: "+ data.current.wind_speed;
    var uvIndex = document.createElement("p");
    uvIndex.setAttribute("class", "uvIndex");
    uvIndex.textContent = "UV Index: " + data.current.uvi;

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
    console.log("data: " + data);
    console.log("index: " + i);
    //CREATE DIVS
    var forcastCardDiv = document.createElement("div");
    forcastCardDiv.setAttribute("class", "forcast-weather");
    var forcastDate = document.createElement("h2")
    forcastDate.setAttribute("class", "forcast-date");
    forcastDate.textContent = getTheDate(i);
    var forcastIcon = document.createElement("img");
    forcastIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png");
    var forcastTemp = document.createElement("p");
    forcastTemp.setAttribute("class", "forcast-temp");
    forcastTemp.textContent = "Temperature: " + data.temp.day;
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

// GET WEATHER FUNCTION
var getWeather = function(city) {
    var locationUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + key;
    localStorage.setItem("city", city);
    fetch(locationUrl)
        .then(function(response) {
            response.json().then(function(data) {
                var lat = data[0].lat;
                var long = data[0].lon;
                var units = "metric";
                var weatherUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&units=" + units + "&appid=" + key;
                fetch(weatherUrl).then(function(response){
                    response.json().then (function(data) {
                        console.log(data);
                        // DISPLAY CURRENT WEATHER
                        displayCurrentWeather(data);
                        
                        // DISPLAY 5 DAY FORCAST
                        for (i = 1 ; i < 6 ; i++){
                            displayForcast(data.daily[i], i);
                            console.log(data.daily[i]);
                        }
                    })
                })
            })
        })
        .catch(function(error) {
            console.log('failed to connect to server')
        })

}

getWeather("New York City")
