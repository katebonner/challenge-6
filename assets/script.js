var city = {
    lat: 40.73,
    lon: -74.00
}

var getWeather = function(city) {
    // FORMAT THE OPEN WEATHER MAP API URL
    var lat = city.lat;
    var lon = city.lon;
    var units = "metric";
    var key = "0d36cf1eac97c7615ce2fe5b1d9f0b12";
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=" + units + "&appid=" + key;

    // GET WEATHER DATA
    var getWeatherData = function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                console.log(data.current.weather[0].icon);
                currentWeatherData = {
                    name: data.timezone,
                    epochDate: data.current.dt,
                    weatherIcon: data.current.weather[0].icon,
                    temp: data.temp,
                    humidity: data.humidity,
                    windSpeed: data.wind_speed,
                    uvIndex: data.uvi
                }
            })
        }
        else {
            alert("city not found")
        }
    }

    // MAKE API CALL
    fetch(apiUrl)
        .then(getWeatherData)
        .catch(function(error){
            alert("error: unable to connect to server")
        });
 };

getWeather(city)