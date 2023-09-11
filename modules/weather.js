const API_KEY = "d38c916768759cb41db22c9f17960236";
const BASE_URL = "https://api.openweathermap.org/data/2.5"; //https://api.openweathermap.org/data/2.5/weather?units=metric&q=kabul&appid=d38c916768759cb41db22c9f17960236

const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + "/" + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  return fetch(url).then((res) => res.json());
};

const formatCurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;

  const { main: details, icon } = weather[0];

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise,
    weather,
    speed,
  };
};

const formatForecastWeather = (data) => {
  let { timezone, daily, hourly } = data;
  daily = daily.slice(1, 6).map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "ccc"),
      temp: d.temp.day,
      icon: d.weather[0].icon,
    };
  });
  hourly = hourly.slice(1, 6).map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
      temp: d.temp.day,
      icon: d.weather[0].icon,
    };
  });
  return { timezone, daily, hourly };
};
const getformattedWeadtherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData(
    "weather",
    searchParams
  ).then(formatCurrentWeather);

  const { lat, lon } = formattedCurrentWeather;

  const formattedForecastWeather = await getWeatherData("onecall", {
    lat,
    lon,
    exclude: "current, minutely,alerts",
    units: searchParams,
  }).then(formatForecastWeather);
  return {...formattedCurrentWeather, ...formattedForecastWeather};
};

const formatToLocalTime = (
    secs,
    zone,
    format = "cccc, dd lll yyyy' | Local time: 'hh:mm a"
) => DateTime.formSeconds(secs).setZone(zone).toformat(format);

export default getformattedWeadtherData;

// export async function fetchWeatherData(cityName) {
//     try {
//         const response = await fetch(BASE_URL + cityName + `&appid=${API_KEY}`);
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

// const HOURLY_URL = 'https://api.open-meteo.com/v1/dwd-icon?hourly=temperature_2m,weathercode&timeformat=unixtime&timezone=America%2FLos_Angeles';

// export async function fetchWeatherDataHourl(lat, lng) {
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
