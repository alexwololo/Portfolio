// Latitude & longitude for Göteborg
const latitude = 57.7089;
const longitude = 11.9746;
const url = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${longitude}/lat/${latitude}/data.json`;

async function fetchWeather() {
  try {
    const response = await fetch(url);
    const data = await response.json();

    const temperature = data.timeSeries[0].parameters.find((param) => param.name === 't').values[0];
    const windSpeed = data.timeSeries[0].parameters.find((param) => param.name === 'ws').values[0];

    document.getElementById('temperature').textContent = `${temperature}°C`;
    document.getElementById('wind').textContent = `Wind: ${windSpeed} m/s`;

    // Update weather icon (description is a number in 'Wsymb2')
    const weatherSymbol = data.timeSeries[0].parameters.find((param) => param.name === 'Wsymb2')
      .values[0];
    updateWeatherIcon(weatherSymbol);
  } catch (error) {
    console.log('Error fetching weather data:', error);
    document.getElementById('temperature').textContent = 'Failed to load data';
  }
}

function updateWeatherIcon(weatherSymbol) {
  const weatherIcon = document.getElementById('weather-icon');

  // Different weather symbols with icons
  if (weatherSymbol === 1) {
    weatherIcon.className = 'fas fa-sun'; // Clear sky
  } else if (weatherSymbol >= 2 && weatherSymbol <= 3) {
    weatherIcon.className = 'fas fa-cloud-sun'; // Partly cloudy
  } else if (weatherSymbol === 4) {
    weatherIcon.className = 'fas fa-cloud'; // Cloudy
  } else if (weatherSymbol === 5 || weatherSymbol === 9) {
    weatherIcon.className = 'fas fa-cloud-showers-heavy'; // Rain
  } else if (weatherSymbol === 7 || weatherSymbol === 10) {
    weatherIcon.className = 'fas fa-snowflake'; // Snow
  } else if (weatherSymbol === 6 || weatherSymbol === 11) {
    weatherIcon.className = 'fas fa-bolt'; // Thunderstorm
  } else {
    weatherIcon.className = 'fas fa-cloud'; // Default to cloudy
  }
}

fetchWeather();

/**
 * https://opendata.smhi.se/apidocs/
 *
 * SMHI's API might not include a weather description (like "clear sky" or "cloudy"), so if the description is missing, you can * use a default value such as "Clear sky"
 *
 * Wsymb2 is a parameter used by the SMHI API to represent different weather conditions using numbers. Each number corresponds * to a specific weather situation, like clear sky, cloudy, rain, snow, etc.
 *
 * Example:
 * 1: Clear sky (sunny)
 * 2: Partly cloudy
 * 3: Mostly cloudy
 */
