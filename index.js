import { fetchWeatherData } from "./modules/weather.js";

(async () => {
    try {
        const weatherData = await fetchWeatherData();
        console.log(weatherData);
    } catch (error) {

    }
}) ();