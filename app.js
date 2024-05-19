// Weather App using OpenWeatherMap API

// API key
const apiKey = "a19d0e27b17434ce6471ea4f53a5a74a";
let searchBtn = document.getElementById("searchBtn");
let weatherBox = document.querySelector(".weather-box");
let searchInput = document.getElementById("searchInput");
let weatherimg = document.getElementById("weatherimg");

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
                <h2>${res.name}</h2><br>
                <p>${res.weather[0].description}</p><br>
                <p>${res.weather[0].main}</p><br>
                <p>Temperature: ${res.main.temp}°C</p><br>
                <p>Humidity: ${res.main.humidity}%</p><br>
                <p>Wind Speed: ${res.wind.speed} m/s</p><br>
                <p>Wind Degree: ${res.wind.deg}°</p>
            `;
            switch (res.weather[0].main) {
                case 'Clear':
                    weatherimg.style.backgroundImage = "url('./assets/clearsky.jpg')";
                    break;
                case 'Clouds':
                    weatherimg.style.backgroundImage = "url('./assets/clouds.jpg')";
                    break;
                case 'Rain':
                    weatherimg.style.backgroundImage = "url('./assets/rain.jpg')";
                    break;
                case 'Snow':
                    weatherimg.style.backgroundImage = "url('./assets/snow.jpg')";
                    break;
                case 'Thunderstorm':
                    weatherimg.style.backgroundImage = "url('./assets/thunderstorm.jpg')";
                    break;
                case 'Broken clouds':
                    weatherimg.style.backgroundImage = "url('./assets/brokenclouds.jpg')";
                    break;
                case 'Fog':
                    weatherimg.style.backgroundImage = "url('./assets/fog.jpg')";
                    break;
                default:
                    weatherimg.style.backgroundImage = "none";
                    break;
            }
        })
        .catch((error) => {
            console.error(error);
            weatherBox.innerHTML = `<p>Oops! ${cityName} not found.</p>`;
            weatherimg.style.backgroundImage = "none";
    
        });
}

searchBtn.addEventListener("click", function() {
    const cityName = searchInput.value; // Get the value from the input field
    if (!cityName) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Enter a City Name",
        });
    } else {
        gettingData(cityName);
    }
});

// Initial fetch for a default city
gettingData("Karachi");

if (navigator.geolocation) {
    // Get the current position
    navigator.geolocation.getCurrentPosition(function(position) {
        // Get the latitude and longitude
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        console.log("Latitude: " + latitude + ", Longitude: " + longitude);
    });
} else {
    console.log("Geolocation is not supported by this browser.");
}
