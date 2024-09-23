const latitude = 57.7089;
const longitude = 11.9746;
const smhiUrl = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${longitude}/lat/${latitude}/data.json`;

function fetchSMHIWeather() {
  console.log('Fetching weather from SMHI...');
  fetch(smhiUrl)
    .then(function (response) {
      console.log('Received response from SMHI');
      return response.json();
    })
    .then(function (data) {
      console.log('Parsed SMHI data:', data);
      const temperature = data.timeSeries[0].parameters.find(function (param) {
        return param.name === 't';
      }).values[0];
      const windSpeed = data.timeSeries[0].parameters.find(function (param) {
        return param.name === 'ws';
      }).values[0];
      const weatherSymbol = data.timeSeries[0].parameters.find(function (param) {
        return param.name === 'Wsymb2';
      }).values[0];

      console.log('Temperature: ' + temperature + '°C, Wind Speed: ' + windSpeed + ' m/s');
      document.getElementById('temperature').textContent = temperature + '°C';
      document.getElementById('wind').textContent = 'Wind: ' + windSpeed + ' m/s';
      updateWeatherIcon(weatherSymbol);
    })
    .catch(function (error) {
      console.log('Error fetching SMHI data:', error);
      document.getElementById('temperature').textContent = 'Failed to load data';
    });
}

function updateWeatherIcon(symbol) {
  const weatherIcon = document.getElementById('weather-icon');
  console.log('Updating weather icon with symbol:', symbol);
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
  console.log('Weather icon updated:', weatherIcon.className);
}

function debounce(func, delay) {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      func.apply(context, args);
    }, delay);
    console.log('Debounce triggered, delay:', delay);
  };
}

const fetchWeather = debounce(function (city) {
  console.log('Fetching weather for:', city);

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

  console.log('Fetching weather from OpenWeatherMap with URL:', fullUrl);
  fetch(fullUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.cod === 200) {
        document.querySelector('#weather h2').textContent = data.name;
        document.getElementById('temperature').textContent = data.main.temp + '°C';
        document.getElementById('wind').textContent = 'Wind: ' + data.wind.speed + ' m/s';
        updateWeatherIcon(data.weather[0].icon);
      } else {
        document.querySelector('#weather h2').textContent = 'City not found';
        document.getElementById('temperature').textContent = '';
        document.getElementById('wind').textContent = '';
        document.getElementById('weather-icon').style.display = 'none';
      }
    })
    .catch(function (error) {
      console.log('Error fetching weather data:', error);
    });
}, 2000);

document.getElementById('city-input').addEventListener('input', function () {
  const city = this.value;
  console.log('User input:', city);
  if (city.length > 2) {
    fetchWeather(city);
  }
});

function updateWeatherIcon(iconCode) {
  const weatherIcon = document.getElementById('weather-icon');
  const iconUrl = 'http://openweathermap.org/img/wn/' + iconCode + '@2x.png';
  weatherIcon.src = iconUrl;
  weatherIcon.style.display = 'block';
}

window.onload = fetchSMHIWeather;
