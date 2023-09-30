import {
  API_KEY, BASE_URL, DAILY_API_KEY, DAILY_BASE_URL,
} from './api.js';
import {
  errorMassage,
  dailyForcostContainer,
  currentForcastContainer,
  cityName,
  weatherCondation,
  temp,
  icon,
  realFeel,
  humidity,
  windSpeed,
  visibility,
} from './varaibles.js';

function displayError(message) {
  errorMassage.innerHTML = `<p class="error">${message}</p>`;
}

async function FetchData(location, unit) {
  try {
    const apiUnit = unit === 'imperial' ? 'imperial' : 'metric';
    const rescurrent = await fetch(
      `${BASE_URL + location}&appid=${API_KEY}&units=${apiUnit}`,
    );

    if (!rescurrent.ok) {
      throw new Error(`HTTP errro! Status: ${rescurrent.status}`);
    }

    const currentData = await rescurrent.json();
    currentForcastContainer.innerHTML = '';

    cityName.textContent = currentData.city.name;
    weatherCondation.textContent = currentData.list[0].weather[0].description;
    temp.innerHTML = `${currentData.list[0].main.temp.toFixed(0)
    }&deg;${
      unit === 'imperial' ? 'F' : 'C'}`;
    const iconCode = currentData.list[0].weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    icon.innerHTML = `<img id="hero-icon" src="${iconUrl}" alt="Weather Icon">`;

    // Create an array to store hourly weather data
    const hourlyForecast = currentData.list.map((hourlyData) => ({
      hour: new Date(hourlyData.dt * 1000).getHours(),
      date: new Date(hourlyData.dt * 1000).toLocaleDateString(),
      temperature:
          `${hourlyData.main.temp.toFixed(0)
          }&deg;${
            unit === 'imperial' ? 'F' : 'C'}`, // Display units,
      iconUrl: `https://openweathermap.org/img/wn/${hourlyData.weather[0].icon}@2x.png`,
    }));

    // eslint-disable-next-line
      const swiper = new Swiper('.swiper-container', {
      slidesPerView: '3',
      spaceBetween: 0,
      breakpoints: {
        // Customize when Swiper should change number of slides
        768: {
          slidesPerView: 4, // For screens with width >= 768px, show 3 slides
        },
        992: {
          slidesPerView: 5, // For screens with width >= 992px, show 4 slides
        },
        1200: {
          slidesPerView: 6, // For screens with width >= 1200px, show 5 slides
        },
      },
    });

    // Populate the slider with hourly weather data

    hourlyForecast.forEach((hourlyData) => {
      const hourlySlide = document.createElement('div');
      hourlySlide.classList.add('swiper-slide');

      const htmlContent = `
              <div class="hourly-data">
                <p class="color-secondary">${hourlyData.hour}:00</p>
                <img src="${hourlyData.iconUrl}" alt="Weather Icon">
                <p class="font-size">${hourlyData.temperature}</p>
              </div>
            `;
      hourlySlide.innerHTML = htmlContent;
      currentForcastContainer.appendChild(hourlySlide);
    });

    realFeel.innerHTML = `${currentData.list[0].main.feels_like.toFixed(0)}&deg;`;
    humidity.textContent = `${currentData.list[0].main.humidity.toFixed(0)}%`;
    const windSpeedMetersPerSecond = currentData.list[0].wind.speed;
    const windSpeedKmPerHour = windSpeedMetersPerSecond * 3.6;
    windSpeed.innerHTML = `${windSpeedKmPerHour.toFixed(0)}km/h`;
    const visibilitycurent = currentData.list[0].visibility;
    const visibilityKm = visibilitycurent / 1000;
    visibility.innerHTML = `${visibilityKm.toFixed(0)}Km/h`;

    const resdaily = await fetch(
      `${DAILY_BASE_URL + location}&key=${DAILY_API_KEY}&units=${unit}`,
    );

    if (!resdaily.ok) {
      throw new Error(`HTTP errro! Status: ${resdaily.status}`);
    }

    const dailyData = await resdaily.json();
    dailyForcostContainer.innerHTML = '';

    const dailyForecastData = dailyData.data;

    dailyForecastData.forEach((dailyData) => {
      const dailyContainer = document.createElement('div');
      dailyContainer.classList.add('daily-forecast-container');

      const dayOfWeek = new Date(dailyData.datetime).toLocaleDateString(
        'en-US',
        {
          weekday: 'short',
        },
      );
      const iconCode = dailyData.weather.icon;
      const { description } = dailyData.weather;
      const maxTemp = dailyData.max_temp;
      const minTemp = dailyData.min_temp;

      const htmlContent = `
              <p class="day color-secondary">${dayOfWeek}</p>
                <div class="icon-desc">
                  <div class="icon"><img src="https://www.weatherbit.io/static/img/icons/${iconCode}.png" alt=" Icon"></div>
                  <p class="description">${description}</p>
                </div>
                <p class="temp">${maxTemp.toFixed(0)} / ${minTemp.toFixed(0)}</p>
              `;
      dailyContainer.innerHTML = htmlContent;
      dailyForcostContainer.appendChild(dailyContainer);
    });
  } catch (error) {
    displayError(error.message);
  }
}

export default FetchData;