const API_KEY = "4f22cdc9d623822b65f661daedf0a20c";
const BASE_URL =
  "https://api.openweathermap.org/data/2.5/forecast?q=";

  const DAILY_API_KEY = "ab9be3c2fcb74a4fa4504cba91b24fe9";
  const DAILY_BASE_URL = "https://api.weatherbit.io/v2.0/forecast/daily?city=";

  const DEFAULT_LOCATION = 'kabul'; // Default location if geolocation is not available


async function fetchData(location) {
  try {
    const response = await fetch(BASE_URL + location + `&appid=${API_KEY}`);
    const res = await fetch(DAILY_BASE_URL + location + `&key=${DAILY_API_KEY}`);
    
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      } 
      const dalyData = await res.json();
        console.log(dalyData);

        const footerContainer = document.querySelector(".footer-container");
    footerContainer.innerHTML = '';
        const dailyForecastData = dalyData.data; // Assuming the daily forecast data is stored in the 'data' property

        // Loop through the daily forecast data and create HTML elements for each day
        dailyForecastData.forEach((dayData) => {
          const dayContainer = document.createElement("div");
          dayContainer.classList.add("daily-forecast-container");
        
          const dayOfWeek = new Date(dayData.datetime).toLocaleDateString("en-US", {
            weekday: "short",
          });
          const iconCode = dayData.weather.icon;
          const description = dayData.weather.description;
          const maxTemp = dayData.max_temp;
          const minTemp = dayData.min_temp;
        
          const htmlContent = `
          
            <div class="day color-secondary">${dayOfWeek}</div>
            <div class="icon-desc">
              <div class="icon"><img src="https://www.weatherbit.io/static/img/icons/${iconCode}.png" alt=" Icon"></div>
              <div class="description">${description}</div>
            </div>
            <div class="temp">${maxTemp.toFixed(0)} / ${minTemp.toFixed(0)}</div>
          `;
        
          dayContainer.innerHTML = htmlContent;
          footerContainer.appendChild(dayContainer);
        });
        // Loop through the daily forecast data and create HTML elements for each day
      

    // Check if the response status is OK (status code 200)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Use the data in your module
    console.log(data);
    document.getElementById("hero-city").textContent = data.city.name;
    document.getElementById("hero-description").textContent =
      data.list[0].weather[0].description;
    const iconCode = data.list[0].weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    let heroImage = document.getElementById("hero-image");

    heroImage.innerHTML = `<img id="hero-icon" src="${iconUrl}" alt="Weather Icon">`;

    const temperatureKelvin = data.list[0].main.temp;
    const temperatureCelsius = temperatureKelvin - 273.15;
    document.getElementById(
      "hero-degree"
    ).innerHTML = `${temperatureCelsius.toFixed(0)}&deg;C`;

    const hourlyForecastContainer = document.querySelector(".swiper-wrapper");
    hourlyForecastContainer.innerHTML = '';

    // Create an array to store hourly weather data
    const hourlyForecast = data.list.map((hourlyData) => ({
      hour: new Date(hourlyData.dt * 1000).getHours(),
      date: new Date(hourlyData.dt * 1000).toLocaleDateString(),
      temperature: (hourlyData.main.temp - 273.15).toFixed(0),
      iconUrl: `https://openweathermap.org/img/wn/${hourlyData.weather[0].icon}@2x.png`,
    }));

    // Initialize Swiper.js slider
    const swiper = new Swiper(".swiper-container", {
      slidesPerView: "5",
      spaceBetween: 0,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });

    // Populate the slider with hourly weather data
    
    hourlyForecast.forEach((hourlyData) => {
      const hourlySlide = document.createElement("div");
      hourlySlide.classList.add("swiper-slide");

      const htmlContent = `
        <div class="hourly-data">
          <p class="color-secondary">${hourlyData.hour}:00</p>
          <img src="${hourlyData.iconUrl}" alt="Weather Icon">
          <p class="font-size">${hourlyData.temperature}°C</p>
        </div>
      `;
      hourlySlide.innerHTML = htmlContent;
      hourlyForecastContainer.appendChild(hourlySlide);
    });

    const felsLikeKelvin = data.list[0].main.feels_like;
    const felsLikeCelsius = felsLikeKelvin - 273.15;
    document.getElementById("real-feel").innerHTML = `${felsLikeCelsius.toFixed(0)}&deg;`;

    document.getElementById("humidity").innerHTML = `${data.list[0].main.humidity}%`
    const windSpeedMetersPerSecond = data.list[0].wind.speed;
    const windSpeedKmPerHour = windSpeedMetersPerSecond * 3.6;
    document.getElementById("wind-speed").innerHTML = `${windSpeedKmPerHour.toFixed(0)}km/h`

    const visibility = data.list[0].visibility;
    const visibilityKm = visibility / 1000;
    document.getElementById("visibility").innerHTML = `${visibilityKm.toFixed(0)}Km/h`
  } catch (error) {
    // Handle any errors that occurred during the fetch
    console.error("Fetch error:", error);
  }
}
// Add event listener to the search button
document.getElementById('search-btn').addEventListener('click', () => {
  const location = document.getElementById('search-input').value;
  fetchData(location);

});

window.onload(fetchData(DEFAULT_LOCATION))