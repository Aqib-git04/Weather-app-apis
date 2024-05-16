// Weather App using OpenWeatherMap API

// API key
const apiKey = "a19d0e27b17434ce6471ea4f53a5a74a";
let searchBtn = document.getElementById("searchBtn");
let weatherBox = document.querySelector(".weather-box");
let searchInput = document.getElementById("searchInput");

function gettingData(cityName) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`)
       .then((res) => {
           if (!res.ok) {
               throw new Error("City not found");
           }
           return res.json();
       })
       .then((res) => {
           console.log(res, "Successfully fetched");
           // Update DOM elements with fetched data
           weatherBox.innerHTML = `
               <h2>${res.name}</h2></br>
               <p>${res.weather[0].description}</p></br></br>
               <p>Main: ${res.weather[0].main}</p></br></br>
               <p>Temperature: ${res.main.temp}°C</p></br></br>
               <p>Humidity: ${res.main.humidity}%</p></br></br>
               <p>Wind Speed: ${res.wind.speed} m/s</p></br></br>
               <p>Wind Degree: ${res.wind.deg}°</p></br></br>
           `;
       })
       .catch((error) => {
           console.error(error);
           weatherBox.innerHTML = `<p> Opps ${cityName} not found</p>`;
       });
}

searchBtn.addEventListener("click", function() {
    const cityName = searchInput.value; // Get the value from the input field
    if (!cityName)
         { 
      alert("Enter any city name")
         }
    else{
      gettingData(cityName);

        }
});


// Initial call to gettingData function to show weather for default city
gettingData("Karachi"); // You can set any default city here

// Check if the Geolocation API is available
if (navigator.geolocation) {
  // Get the current position
  navigator.geolocation.getCurrentPosition(function(position) {
    // Get the latitude and longitude from the position object
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    // Do something with the latitude and longitude, like display it on a map or use it for other purposes
    console.log("Latitude: " + latitude + ", Longitude: " + longitude);
  });
} else {
  // Geolocation is not supported by this browser
  console.log("Geolocation is not supported by this browser.");
}

