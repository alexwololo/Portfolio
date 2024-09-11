const latitude = 57.7089;
const longitude = 11.9746;
const smhiUrl = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${longitude}/lat/${latitude}/data.json`;

function fetchSMHIWeather() {
  console.log('Fetching weather from SMHI...');
  fetch(smhiUrl)
    .then((response) => response.json())
    .then((data) => {
      const temperature = data.timeSeries[0].parameters.find((param) => param.name === 't')
        .values[0];
      const windSpeed = data.timeSeries[0].parameters.find((param) => param.name === 'ws')
        .values[0];
      const weatherSymbol = data.timeSeries[0].parameters.find((param) => param.name === 'Wsymb2')
        .values[0];

      console.log(`Temperature: ${temperature}°C, Wind Speed: ${windSpeed} m/s`);
      document.getElementById('temperature').textContent = `${temperature}°C`;
      document.getElementById('wind').textContent = `Wind: ${windSpeed} m/s`;
      updateWeatherIcon(weatherSymbol);
    })
    .catch((error) => {
      console.log('Error fetching SMHI data:', error);
      document.getElementById('temperature').textContent = 'Failed to load data';
    });
}

function updateWeatherIcon(symbol) {
  const weatherIcon = document.getElementById('weather-icon');
  if (symbol === 1) {
    weatherIcon.className = 'fas fa-sun';
  } else if (symbol >= 2 && symbol <= 3) {
    weatherIcon.className = 'fas fa-cloud-sun';
  } else if (symbol === 4) {
    weatherIcon.className = 'fas fa-cloud';
  } else if (symbol === 5 || symbol === 9) {
    weatherIcon.className = 'fas fa-cloud-showers-heavy';
  } else if (symbol === 7 || symbol === 10) {
    weatherIcon.className = 'fas fa-snowflake';
  } else if (symbol === 6 || symbol === 11) {
    weatherIcon.className = 'fas fa-bolt';
  } else {
    weatherIcon.className = 'fas fa-cloud';
  }
}

document.getElementById('city-input').addEventListener('input', function () {
  const city = this.value;
  if (city.length > 2) {
    console.log(`Searching for city: ${city}`);

    const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
    const apiKeyParts = [
      '0',
      '7',
      '6',
      '9',
      'c',
      'a',
      'd',
      'b',
      'e',
      'f',
      '3',
      '0',
      '9',
      'e',
      '9',
      'a',
      '5',
      '5',
      '3',
      '9',
      'f',
      '3',
      'a',
      '0',
      '0',
      '2',
      '7',
      'd',
      '1',
      '6',
      '6',
      '3',
    ];
    const apiKey = apiKeyParts.join('');
    const fullUrl = baseUrl + city + '&appid=' + apiKey + '&units=metric';

    console.log('Fetching weather from OpenWeatherMap...');
    fetch(fullUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.cod === 200) {
          const temperature = data.main.temp;
          const windSpeed = data.wind.speed;
          const description = data.weather[0].description;

          console.log(
            `City: ${data.name}, Temperature: ${temperature}°C, Wind Speed: ${windSpeed} m/s, Description: ${description}`
          );
          document.querySelector('h2').textContent = `Weather in ${data.name}`;
          document.getElementById('temperature').textContent = `${temperature}°C`;
          document.getElementById('wind').textContent = `Wind: ${windSpeed} m/s`;
          updateWeatherIconOpenWeather(data.weather[0].icon);
        } else {
          console.log('City not found');
        }
      })
      .catch((error) => {
        console.log('Error fetching data from OpenWeatherMap:', error);
      });
  }
});

function updateWeatherIconOpenWeather(iconCode) {
  const weatherIcon = document.getElementById('weather-icon');
  const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  weatherIcon.src = iconUrl;
}

window.onload = fetchSMHIWeather;
