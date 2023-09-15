const container = document.getElementById('weather-container');
const hamburgerMenu = document.getElementById('hamburger-menu');
const navMenu = document.getElementById('nav-menu');
const weatherIcon = document.getElementById('weather-icon');
const sunriseTime = document.getElementById('sunrise-time')
const sunsetTime = document.getElementById('sunset-time')



fetch(
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=168451996f01476589314aaee8750993"
)
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    console.log(json);
    const roundedTemperature = parseFloat(json.main.temp).toFixed(1);
  
    container.innerHTML += `
    <h1>${roundedTemperature} °C</h1>
    <h2>${json.name}</h2>
    <p>${json.weather[0].main}</p>
     
    <div id="sunrise-time"><p>Sunrise: ${json.sunriseTime},</p></div>
    <div id="sunset-time"><p>Sunset: ${json.sunsetTime}</p></div> 
  `;
  


    // Fetch the weather icon mappings from JSON file
    fetch("weatherIcons.json")
      .then((response) => response.json())
      .then((iconMappings) => {
        const currentWeatherMain = json.weather[0].main.toLowerCase();
        const iconFileName = iconMappings[currentWeatherMain] || iconMappings["default"];
        const iconURL = `design/design1/images/${iconFileName}`;
        weatherIcon.src = iconURL;
        weatherIcon.alt = currentWeatherMain;

     
      })
      .catch(error => console.error("Error fetching weatherIcons.json:", error));
  })
 

// Invoke the fetchWeatherData function to fetch and display weather data

hamburgerMenu.addEventListener("click", function () {
  console.log(`hamburger menu`);
  if (navMenu.style.display === "block") {
    navMenu.style.display = "none";
  } else {
    navMenu.style.display = "block";
  }
});

const displaySunriseSunset = (sunriseTimestamp, sunsetTimestamp) => {
  const sunriseDate = new Date(sunriseTimestamp * 1000); //shows the time in milliseconds
  const sunsetDate = new Date(sunsetTimestamp * 1000);

  const sunriseTime = `${sunriseDate.getHours()}:${sunriseDate.getMinutes().toString().padStart(2, '0')}`;
  const sunsetTime = `${sunsetDate.getHours()}:${sunsetDate.getMinutes().toString().padStart(2, '0')}`;

  
  console.log(`Sunrise: ${sunriseTime}, Sunset: ${sunsetTime}`);

  
  document.getElementById('sunrise-time').innerHTML = `<p>Sunrise: ${sunriseTime}</p>`;
  document.getElementById('sunset-time').innerHTML = `<p>Sunset: ${sunsetTime}</p>`;

}


fetch("https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=168451996f01476589314aaee8750993")
  .then(response => response.json())
  .then((json) => {
    if(json.sys) {
      displaySunriseSunset(json.sys.sunrise, json.sys.sunset);
    } else {
      console.error('sys property not found in the response:', json);
    }
  })
  .catch(error => console.error('Error:', error));

