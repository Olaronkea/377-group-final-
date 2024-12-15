YourAQ

Project Description:

Our web application will allow users to input their geographic location such as their city, state or zip code and with that be able to see real time air quality data for that particular area. The data will be presented using an interactive map, as well as using charts as a visualization showing pollutant levels. Our system will also help display tips for health safety based on the air quality index.

This project will be most compatible with Windows browsers, however, other desktop browser will most likely work as well.

Developer Manual:

This manual provides instructions for setting up the air quality and weather data web application


Project setup 
Prerequisites
	•	Node.js(v14 or later) and npm installed
	•	Access to API keys for IQAir and ZipcodeAPI

Step 1 Clone the Repository 
Clone repository to your local machine using this command
 
git clone https://github.com/Olaronke/377-group-final-
cd your-project-directory

Step 2 Install dependencies 
Navigate to the project directory and install required dependencies 

npm install

This command will install the following libraries 

React(for handling dynamic updates)
Leaflet.js or mapbox(for mapping)
Chart.js(for creating data visualizations)
Axios(for handling API requests)
Express(for server-side handling)

Step 3 Set up API keys 
To fetch air quality and weather data, you'll need api keys for iqair and zipcodeapi
	1	Register for IQair and ZipcodeAPI accounts to obtain your API keys
	2	Create a .env file in the root of the project and add your keys:

IQAIR_API_KEY=your-iqair-api-key
ZIPCODE_API_KEY=your-zipcode-api-key

Step 4 Running the Application Locally 

Npm start 

This will start the development server and open the app in your browser at http://localhost:3000

Step 5 Running Tests 
To run any tests you have written for the application 

Npm test

This command will execute the tests using the configured testing framework 



