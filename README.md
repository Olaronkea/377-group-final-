YourAQ

Project Description:

Our web application will allow users to input their geographic location such as their city, state or zip code and with that be able to see real time air quality data for that particular area. The data will be presented using an interactive map, as well as using charts as a visualization showing pollutant levels. Our system will also help display tips for health safety based on the air quality index.

This project will be most compatible with Windows browsers, however, other desktop browsers will most likely work as well.

Developer Manual:

This manual provides instructions for setting up the air quality and weather data web application
Project setup 

Prerequisites

Node.js(v14 or later) and npm installed
Access to API keys for IQAir and ZipcodeAPI
Modern web browser 

Step 1 Clone the Repository 
Clone repository to your local machine using this command
 
git clone https://github.com/Olaronke/377-group-final-  (repository url)
cd <repository-name>

Step 2 Install dependencies 
Navigate to the project directory and install required dependencies 

npm install

Set up environment variables:

Create a .env file in the root directory.

Add the following variables:

AIRVISUAL_API_KEY=your_airvisual_api_key
ZIPCODE_API_KEY=your_zipcode_api_key

Ensure the required APIs are accessible.

Step 4 Running the Application Locally 

npm start 

This will start the development server and open the app in your browser at http://localhost:3000

Step 5 Running Tests 
To run any tests you have written for the application 

Build the application:

npm run build

Deploy the build directory to your production server or hosting platform.

npm test

This command will execute the tests using the configured testing framework 


API Endpoints

Overview

This application uses several APIs to fetch air quality and geographic data. Below are the available endpoints:

GET /air-quality

Description: Fetches air quality data for a specific city.

Query Parameters:

city: The city name (required).

state: The state name (required).

country: The country name (optional).

Response:

{
  "status": "success",
  "data": {
    "city": "Los Angeles",
    "state": "California",
    "aqi": 42
  }
}

GET /distance

Description: Fetches the distance between two zip codes.

Query Parameters:

zip1: First zip code (required).

zip2: Second zip code (required).

Response:

{
  "status": "success",
  "distance": 2794.8
}

GET /location

Description: Fetches geographic details based on latitude and longitude.

Query Parameters:

latitude: Latitude coordinate (required).

longitude: Longitude coordinate (required).

Response:

{
  "city": "New York",
  "state": "New York"
}

Known Bugs and Future Development

Known bugs 
Api failures
Occurs when external api rates exceed
Workaround: add api keys with higher quotas or implement caching 

Geolocation errors 
Some browsers may block geolocation requests 
Workaround: Provide manual input fields for city or zipcode 

Future developments 

Feature enhancements 
Add user accounts for personalized air quality alerts 
Allow users to save multiple locations 

Performance Improvements 
Implement weather forecasts for better planning  

Additional Apis
Integrate weather forecasts for better planning 

Ui/Ux Improvements 
Add animations to improve interactivity 
Develop a mobile responsive design 
