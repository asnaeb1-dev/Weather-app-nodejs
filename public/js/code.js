let input = document.querySelector('input')
let button = document.querySelector('button');
let weather_details  = document.getElementsByClassName('weather-details')
let weatherDisplay = document.getElementById('weather-info');

button.addEventListener('click', (event) => {
    fetch('http://localhost:3000/weather?address=' + input.value)
        .then(response => response.json())
        .then(json => {
            if(json.main.temp !== undefined){

                weather_details[0].innerHTML = `Temperature: ${convertToC(json.main.temp)}°C`;
                weather_details[1].innerHTML = `Humidity: ${json.main.humidity}%`;
                weather_details[2].innerHTML = `Winds: ${json.wind.speed}km/h`;
                weather_details[3].innerHTML = `Pressure: ${json.main.pressure} bar`;
                weather_details[4].innerHTML = `Weather: ${json.weather[0].main}`;
                weather_details[5].innerHTML = `Lat/Lon: ${json.coord.lat}N/${json.coord.lon}E`;
            }else{
                weatherDisplay.innerHTML = "Sorry! Couldn't get weather report for "+input.value;
            }
        })
        .catch(err => {
            console.log(err.message)
            weatherDisplay.innerHTML = "Sorry! Couldn't get weather report for "+input.value;
        })
})

const convertToC = (temp) => Math.round(temp - 273.15)
