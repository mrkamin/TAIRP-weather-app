const API_KEY = "4f22cdc9d623822b65f661daedf0a20c";
const BASE_URL =
  "https://api.openweathermap.org/data/2.5/forecast?q=kabul&appid=";

async function fetchData() {
  try {
    const response = await fetch(BASE_URL + API_KEY + "&units=mitric");

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
    const hourlyForecastContainer = document.querySelector(".swiper-wrapper");
    hourlyForecast.forEach((hourlyData) => {
      const hourlySlide = document.createElement("div");
      hourlySlide.classList.add("swiper-slide");

      const htmlContent = `
        <div class="hourly-data">
          <p>${hourlyData.hour}:00</p>
          <p>${hourlyData.date}</p>
          <img src="${hourlyData.iconUrl}" alt="Weather Icon">
          <p>${hourlyData.temperature}°C</p>
        </div>
      `;
      hourlySlide.innerHTML = htmlContent;
      hourlyForecastContainer.appendChild(hourlySlide);
    });
  } catch (error) {
    // Handle any errors that occurred during the fetch
    console.error("Fetch error:", error);
  }
}

// Call the fetchData function when the module is imported
fetchData();
