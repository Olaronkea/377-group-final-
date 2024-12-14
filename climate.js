
const AIRVISUAL_API_KEY = "033c8c7e-2f34-4d7d-9733-41674959f321";
const ZIPCODE_API_KEY = "A6rOtIbcmigcbm2kMV6fk7Mzl9gsuWNajPhfSyazeX2RcotDqP6P9fU93JpK4NrQ";

const zip1 = "90210"; // Beverly Hills
const zip2 = "10001"; // New York City

// Fetch weather and air quality data
fetch(`http://api.airvisual.com/v2/city?city=Los%20Angeles&state=California&country=USA&key=${AIRVISUAL_API_KEY}`)
  .then(response => {
    if (!response.ok) throw new Error(`AirVisual API error: ${response.status}`);
    return response.json();
  })
  .then(data => {
    console.log("AirVisual API Data:", data);
  })
  .catch(error => console.error("Error fetching AirVisual data:", error));

// Fetch distance between zip codes
fetch(`https://zipcodeapi.com/rest/${ZIPCODE_API_KEY}/distance.json/${zip1}/${zip2}/mile`)
  .then(response => {
    if (!response.ok) throw new Error(`ZipCode API error: ${response.status}`);
    return response.json();
  })
  .then(data => {
    console.log("ZipCode API Data:", data);
    // Process and display distance data here
  })
  .catch(error => console.error("Error fetching ZipCode data:", error));

// Placeholder for your third API
fetch('/api/future-endpoint')
  .then(response => {
    if (!response.ok) throw new Error(`Future API error: ${response.status}`);
    return response.json();
  })
  .then(data => {
    console.log("Future API Data:", data);
    // Process future endpoint data here
  })
  .catch(error => console.error("Error fetching future API data:", error));

// Function to fetch location data based on coordinates
function fetchLocationByCoordinates(latitude, longitude) {
  fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
    .then(response => {
      if (!response.ok) throw new Error(`Reverse Geocode API error: ${response.status}`);
      return response.json();
    })
    .then(data => {
      console.log("Reverse Geocode API Data:", data);
      const city = data.city || "Unknown City";
      const state = data.principalSubdivision || "Unknown State";
      console.log(`City: ${city}, State: ${state}`);

      // Check if the elements exist before updating
      const cityInput = document.getElementById("city-input");
      const stateInput = document.getElementById("state-input");
      if (cityInput) cityInput.value = city;
      if (stateInput) stateInput.value = state;
    })
    .catch(error => console.error("Error fetching location:", error));
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      fetchLocationByCoordinates(latitude, longitude);
    },
    (error) => {
      console.error("Error getting user location:", error);
    }
  );
} else {
  console.error("Geolocation is not supported by this browser.");
}

