const supabaseUrl = 'https://vudosidgtarntcrdkwez.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1ZG9zaWRndGFybnRjcmRrd2V6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQxODUzODMsImV4cCI6MjA0OTc2MTM4M30.WEfJ9I32AMbv_LTVYo7dDQEZC1Ha1ggueFt5Vxo4sQ4';

const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

const signupButton = document.getElementById("signup-button");
const loginButton = document.getElementById("login-button");
const updateZipcodeButton = document.getElementById("update-zipcode-button");

const userInfoSection = document.getElementById("user-info");
const usernameDisplay = document.getElementById("username-display");
const zipcodeDisplay = document.getElementById("zipcode-display");
const updateZipcodeInput = document.getElementById("update-zipcode");

// Signup Functionality
signupButton.addEventListener("click", async () => {
    const email = document.getElementById("signup-email").value;
    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;
    const zipcode = document.getElementById("signup-zipcode").value;

    if (email && username && password && zipcode) {
        const { data, error } = await supabaseClient.from('users').insert([
            { email, username, password, zipcode }
        ]);

        if (error) {
            alert(`Error signing up: ${error.message}`);
        } else {
            alert('Sign-up successful!');
        }
    } else {
        alert('Please fill in all fields.');
    }
});

// Login Functionality
loginButton.addEventListener("click", async () => {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    if (username && password) {
        const { data, error } = await supabaseClient
            .from('users')
            .select('username, zipcode')
            .eq('username', username)
            .eq('password', password);

        if (error) {
            alert(`Error logging in: ${error.message}`);
        } else if (data.length === 0) {
            alert('Invalid username or password.');
        } else {
            // Replace page content with the main page HTML
            document.documentElement.innerHTML = `
              <!DOCTYPE html>
              <html lang="en">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Main Page - Air Quality & Weather</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.css">
                <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
                <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
                <link rel="stylesheet" href="final.css">
              </head>
              <body>
                <header>
                  <div class="logo">Weather & AQI</div>
                  <nav>
                    <a href="home.html">Home</a>
                    <a href="about.html">About</a>
                    <a href="functionality.html">Functionality</a>
                  </nav>
                  <div class="search-bar">
                    <input type="text" id="zip-input" placeholder="Enter ZIP code">
                    <button id="submit-btn">Check Weather & Air Quality</button>
                  </div>
                </header>
                <main class="main-section">
                  <div class="current-data">
                    <div class="data-section" id="weather-section">
                      <h3>Weather</h3>
                      <p>Temperature: <span id="temp">--</span> &#8457;</p>
                      <p>Humidity: <span id="humidity">--</span>%</p>
                      <p>Wind Speed: <span id="wind-speed">--</span> mph</p>
                      <p>Forecast: <span id="forecast">--</span></p>
                      <p><b>City: </b><span id='city'></span></p>
                      <p><b>State: </b><span id="state"></span></p>
                    </div>
                    <div class="data-section" id="air-quality-section">
                      <h3>Air Quality</h3>
                      <p>AQI: <span id="aqi">--</span></p>
                      <p>Atmospheric Pressure: <span id="pressure">--</span> hPa</p>
                      <p>Main Pollutant: <span id="pollutant">--</span></p>
                    </div>
                  </div>
                  <div class="map">
                    <h3>Interactive Map</h3>
                    <div id="map" style="height: 400px; border-radius: 8px;"></div>
                  </div>
                </main>
                <footer>
                  <p>Powered by <a href="https://airvisual.com">AirVisual API</a> and <a href="https://zipcodeapi.com">ZipCode API</a></p>
                  <p><a href="#">About</a> | <a href="#">Help</a></p>
                </footer>
                <script src="climate.js"></script>
              </body>
              </html>
            `;
        }
    } else {
        alert('Please fill in all fields.');
    }
});
// Update Zipcode Functionality
updateZipcodeButton.addEventListener("click", async () => {
    const newZipcode = updateZipcodeInput.value;
    const username = usernameDisplay.textContent;

    if (newZipcode) {
        const { data, error } = await supabaseClient
            .from('users')
            .update({ zipcode: newZipcode })
            .eq('username', username);

        if (error) {
            alert(`Error updating zipcode: ${error.message}`);
        } else {
            alert('Zipcode updated successfully!');
            zipcodeDisplay.textContent = newZipcode;
            updateZipcodeInput.value = '';
        }
    } else {
        alert('Please enter a new zipcode.');
    }
});
