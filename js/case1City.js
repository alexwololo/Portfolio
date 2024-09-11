document.getElementById('city-input').addEventListener('input', function () {
  const city = this.value;

  if (city.length > 2) {
    console.log('User input: ' + city);

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

    console.log('Fetching data from: ' + fullUrl);

    fetch(fullUrl)
      .then(function (response) {
        console.log('API response received');
        return response.json();
      })
      .then(function (data) {
        console.log('Weather data from OpenWeatherMap:', data);

        if (data.cod === 200) {
          const temperature = data.main.temp;
          const windSpeed = data.wind.speed;
          const description = data.weather[0].description;

          console.log('Temperature: ' + temperature);
          console.log('Wind Speed: ' + windSpeed);
          console.log('Description: ' + description);

          document.getElementById('city-result').textContent =
            'City: ' +
            data.name +
            ', Temperature: ' +
            temperature +
            '°C, Wind Speed: ' +
            windSpeed +
            ' m/s, Description: ' +
            description;
        } else {
          console.log('City not found');
          document.getElementById('city-result').textContent = 'City not found.';
        }
      })
      .catch(function (error) {
        console.log('Error occurred:', error);
        document.getElementById('city-result').textContent = 'Failed to fetch weather data.';
      });
  }
});
