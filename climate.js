// Define API keys
const AIRVISUAL_API_KEY = "033c8c7e-2f34-4d7d-9733-41674959f321";
const ZIPCODE_API_KEY = "A6rOtIbcmigcbm2kMV6fk7Mzl9gsuWNajPhfSyazeX2RcotDqP6P9fU93JpK4NrQ";

// Handle user input (ZIP code search)
document.getElementById('submit-btn').addEventListener('click', async () => {
  const zip = document.getElementById('zip-input').value.trim();
  if (!zip) {
    alert('Please enter a ZIP code.');
    return;
  }

  // Fetch weather and air quality data for the ZIP code
  try {
    const locationData = await fetchLocationData(zip);
    const { latitude, longitude, city, state } = locationData;

    // Fetch and display weather data
    fetchWeatherData(latitude, longitude);

    // Fetch and display air quality data
    fetchAirQualityData(city, state);

    // Update map view
    updateMap(latitude, longitude);

    // Display location details
    document.getElementById('weather-section').innerHTML += `
      <p><b>City:</b> ${city}</p>
      <p><b>State:</b> ${state}</p>
    `;
  } catch (error) {
    console.error('Error:', error);
    alert('Unable to fetch data. Please try again.');
  }
});

// Fetch location data for the ZIP code
// Fetch location data for the ZIP code
async function fetchLocationData(zip) {
    const zipApiUrl = `https://api.zippopotam.us/us/${zip}`;
    const response = await fetch(zipApiUrl);
    if (!response.ok) throw new Error(`ZIP API error: ${response.status}`);
    const data = await response.json();
    const { latitude, longitude, 'place name': city, state, country } = data.places[0];
    return { latitude, longitude, city, state, country };
  }
  
// Fetch and display weather data
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
    document.getElementById('humidity').innerText = currentWeather.relativeHumidity;
    document.getElementById('wind-speed').innerText = currentWeather.windSpeed;
    document.getElementById('forecast').innerText = currentWeather.shortForecast;
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

// Fetch and display air quality data
// Fetch and display air quality data using the AirVisual API
async function fetchAirQualityData(city, state, country) {
    const airQualityApiUrl = `http://api.airvisual.com/v2/station?station={{STATION_NAME}}&city=${encodeURIComponent(
      city
    )}&state=${encodeURIComponent(state)}&country=${encodeURIComponent(country)}&key=${AIRVISUAL_API_KEY}`;
  
    try {
      const response = await fetch(airQualityApiUrl);
      if (!response.ok) throw new Error(`AirVisual API error: ${response.status}`);
      const data = await response.json();
  
      // Ensure data exists before updating
      if (data && data.data && data.data.current) {
        const { current_aqi, o3 } = data.data.current.pollution;
  
        document.getElementById('aqi').innerText = current_aqi || '--';
        document.getElementById('pm25').innerText =
          data.data.current.pollution.pm25 || '--';
        document.getElementById('ozone').innerText = o3 || '--';
      } else {
        console.error('Error: Missing air quality data');
        alert('Unable to fetch air quality data');
      }
    } catch (error) {
      console.error('Error fetching air quality data:', error);
    }
  }
  
  

// Update map
function updateMap(latitude, longitude) {
  const mapIframe = document.getElementById('map');
  mapIframe.src = `https://www.google.com/maps?q=${latitude},${longitude}&z=12&output=embed`;
}
// Initialize Leaflet map
const map = L.map('map').setView([37.8, -96], 4); // Default view of the US

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '© OpenStreetMap'
}).addTo(map);

let marker; // Variable to hold the marker

// Function to update map and marker
function updateMap(latitude, longitude) {
  // Center the map on the new coordinates
  map.setView([latitude, longitude], 10);

  // If a marker exists, remove it
  if (marker) {
    map.removeLayer(marker);
  }

  // Add a new marker
  marker = L.marker([latitude, longitude]).addTo(map);
}

// Handle ZIP code input
document.getElementById('submit-btn').addEventListener('click', async () => {
  const zip = document.getElementById('zip-input').value.trim();
  if (!zip) {
    alert('Please enter a ZIP code.');
    return;
  }

  // Fetch location data for the ZIP code
  const zipApiUrl = `https://api.zippopotam.us/us/${zip}`;
  try {
    const response = await fetch(zipApiUrl);
    if (!response.ok) throw new Error(`ZIP API error: ${response.status}`);
    const data = await response.json();

    const { latitude, longitude } = data.places[0]; // Extract coordinates
    const city = data.places[0]['place name'];
    const state = data.places[0]['state'];

    // Update the map and display location info
    updateMap(latitude, longitude);


  } catch (error) {
    console.error('Error fetching ZIP code location:', error);
    alert('Unable to fetch location data. Please try again.');
  }
});

