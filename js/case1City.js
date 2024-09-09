document.getElementById('city-input').addEventListener('input', function () {
  const city = this.value;

  if (city.length > 2) {
    console.log(`Searching for city: ${city}`);
    // call geocoding API to get the city's longitude and latitude
    (function () {
      const _0x45a7 = [
        'https://api.openweathermap.org/data/2.5/weather?q=',
        '&appid=',
        'f0668052f5750494140689f353580f70',
      ];
      const apiKey = _0x45a7[2];

      fetch(_0x45a7[0] + city + _0x45a7[1] + apiKey)
        .then(function (response) {
          console.log('OpenWeatherMap response:', response);
          return response.json();
        })
        .then(function (data) {
          console.log('OpenWeatherMap data:', data);
          const lat = data.coord.lat;
          const lon = data.coord.lon;

          console.log(`Latitude: ${lat}, Longitude: ${lon}`);

          // use SMHI API to get weather data based on longitude and latitude
          const smhiUrl = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${lon}/lat/${lat}/data.json`;
          fetch(smhiUrl)
            .then(function (response) {
              console.log('SMHI response:', response);
              return response.json();
            })
            .then(function (weatherData) {
              console.log('SMHI weather data:', weatherData);
              const temperature = weatherData.timeSeries[0].parameters.find(function (param) {
                return param.name === 't';
              }).values[0];
              const windSpeed = weatherData.timeSeries[0].parameters.find(function (param) {
                return param.name === 'ws';
              }).values[0];

              console.log(`Temperature: ${temperature}°C, Wind Speed: ${windSpeed} m/s`);

              document.getElementById(
                'city-result'
              ).textContent = `City: ${data.name}, Temperature: ${temperature}°C, Wind speed: ${windSpeed} m/s`;
            })
            .catch(function (error) {
              console.error('Error fetching data from SMHI:', error);
              document.getElementById('city-result').textContent =
                'Could not fetch weather data from SMHI.';
            });
        })
        .catch(function (error) {
          console.error('Error fetching data from OpenWeatherMap:', error);
          document.getElementById('city-result').textContent = 'City not found.';
        });
    })();
  }
});
