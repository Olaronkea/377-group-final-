const AIRVISUAL_API_KEY = "033c8c7e-2f34-4d7d-9733-41674959f321";
const ZIPCODE_API_KEY = "A6rOtIbcmigcbm2kMV6fk7Mzl9gsuWNajPhfSyazeX2RcotDqP6P9fU93JpK4NrQ";


document.getElementById('submit-btn').addEventListener('click', async () => {
  const zip = document.getElementById('zip-input').value.trim();
  if (!zip) {
    alert('Please enter a ZIP code.');
    return;
  }


  try {
    const locationData = await fetchLocationData(zip);
    const { latitude, longitude, city, state, country } = locationData;
    console.log('location data', locationData)


    fetchWeatherData(latitude, longitude);


    fetchAirQualityData(city, state, country, AIRVISUAL_API_KEY);


    updateMap(latitude, longitude);


    document.getElementById('city').innerText = `${city}`;
    document.getElementById('state').innerText = `${state}`;


  } catch (error) {
    console.error('Error:', error);
    alert('Unable to fetch data. Please try again.');
  }
});



async function fetchLocationData(zip) {
  const zipApiUrl = `https://api.zippopotam.us/us/${zip}`;
  const response = await fetch(zipApiUrl);
  if (!response.ok) throw new Error(`ZIP API error: ${response.status}`);
  const data = await response.json();
  country = data['country abbreviation'];
  console.log('data', data)
  const { latitude, longitude, 'place name': city, state } = data.places[0];
  return { latitude, longitude, city, state, country };
}


async function fetchWeatherData(latitude, longitude) {
  const weatherApiUrl = `https://api.weather.gov/points/${latitude},${longitude}`;
  try {
    const response = await fetch(weatherApiUrl);
    const data = await response.json();
    const forecastUrl = data.properties.forecast;

    const forecastResponse = await fetch(forecastUrl);
    const forecastData = await forecastResponse.json();
    const currentWeather = forecastData.properties.periods[0];

    document.getElementById('temp').innerText = currentWeather.temperature;
    document.getElementById('wind-speed').innerText = currentWeather.windSpeed;
    document.getElementById('forecast').innerText = currentWeather.shortForecast;
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}



async function fetchAirQualityData(city, state, country, AIRVISUAL_API_KEY) {
  const airQualityApiUrl = `http://api.airvisual.com/v2/city?city=${encodeURIComponent(city)}&state=${encodeURIComponent(state)}&country=${encodeURIComponent(country) + 'A'}&key=${AIRVISUAL_API_KEY}`;

  try {
    const response = await fetch(airQualityApiUrl);

    if (!response.ok) throw new Error(`AirVisual API error: ${response.status}`);
    const data = await response.json();
    console.log(data)

    const aqi = data.data.current.pollution.aqius
    const pressure = data.data.current.weather.pr
    const humidity = data.data.current.weather.hu
    const pollutant = data.data.current.pollution.mainus
    document.getElementById('aqi').innerText = aqi
    document.getElementById('pressure').innerText = pressure
    document.getElementById('humidity').innerText = humidity
    document.getElementById('pollutant').innerText = pollutant
  } catch (error) {
    console.error('Error fetching air quality data:', error);
  }
}




function updateMap(latitude, longitude) {
  const mapIframe = document.getElementById('map');
  mapIframe.src = `https://www.google.com/maps?q=${latitude},${longitude}&z=12&output=embed`;
}

const map = L.map('map').setView([37.8, -96], 4);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '© OpenStreetMap'
}).addTo(map);

let marker;


function updateMap(latitude, longitude) {

  map.setView([latitude, longitude], 10);

  if (marker) {
    map.removeLayer(marker);
  }

  marker = L.marker([latitude, longitude]).addTo(map);
}


document.getElementById('submit-btn').addEventListener('click', async () => {
  const zip = document.getElementById('zip-input').value.trim();
  if (!zip) {
    alert('Please enter a ZIP code.');
    return;
  }


  const zipApiUrl = `https://api.zippopotam.us/us/${zip}`;
  try {
    const response = await fetch(zipApiUrl);
    if (!response.ok) throw new Error(`ZIP API error: ${response.status}`);
    const data = await response.json();

    const { latitude, longitude } = data.places[0];
    const city = data.places[0]['place name'];
    const state = data.places[0]['state'];


    updateMap(latitude, longitude);

  } catch (error) {
    console.error('Error fetching ZIP code location:', error);
    alert('Unable to fetch location data. Please try again.');
  }
});