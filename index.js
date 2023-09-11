import getformattedWeadtherData from "./modules/weather.js";

const fetchWeather = async () => {
    const data = await getformattedWeadtherData( {q: "kabul"});
    console.log(data)
}
fetchWeather()

// import { fetchWeatherData } from "./modules/weather.js";
// // import { fetchWeatherDataHourl } from "./modules/weather.js";
// import { geocode } from "./modules/geocoding.js";

// const searchBox = document.getElementById("search-input");
// const searchBtn = document.getElementById("search-btn");
// const weatherIcon = document.getElementById("hero-icon");


// let cityName; 
// searchBtn.addEventListener("click", () => {
//     cityName = searchBox.value;
//     fetchData()
//     getCoordinatesForLocation(cityName)
//     // fetchDatahourly()
    
// })
// async function fetchData() {
//     try {
//         const weatherData = await fetchWeatherData(cityName);
//         console.log(weatherData);
//         document.getElementById("hero-city").textContent = weatherData.name;
//         document.getElementById("hero-description").textContent = weatherData.weather[0].description;
//         document.getElementById("hero-degree").innerHTML = Math.round(weatherData.main.temp) + `C&deg;`;
//          // Construct the weather icon URL dynamically
//          const iconUrl = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

//          // Update the weatherIcon src attribute
//          weatherIcon.src = iconUrl;

        
//     } catch (error) {

//     }
// } ;
// async function fetchWeatherDataHourl(lat, lng) {
//     try {
//         const hourlyUrl = `https://api.open-meteo.com/v1/dwd-icon?hourly=temperature_2m,weathercode&timeformat=unixtime&timezone=America%2FLos_Angeles&latitude=${lat}&longitude=${lng}`;
//         const response = await fetch(hourlyUrl);
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error('Fetch error:', error);
//         throw error;
//     }
// }
// async function fetchDatahourly() {
   
//     try {
//         const weatherData = await fetchWeatherDataHourl(lat, lng);
//         console.log(weatherData);
//         console.log("working")

        
//     } catch (error) {

//     }
// }  ;

// async function getCoordinatesForLocation(locationName) {
//     try {
//         const coordinates = await geocode(locationName);
//         console.log(`Coordinates for ${locationName}: Lat: ${coordinates.lat}, Lng: ${coordinates.lng}`);
//         fetchDatahourly(coordinates.lat, coordinates.lng);
//     } catch (error) {
//         console.error('Geocoding error:', error);
//     }
// }

