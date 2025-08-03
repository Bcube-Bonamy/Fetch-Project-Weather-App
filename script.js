const weatherForm = document.querySelector('.weatherForm');
const cityInput = document.querySelector('.cityInput');
const card = document.querySelector('.card');


 weatherForm.addEventListener('submit', async e => {
    e.preventDefault();

    const city = cityInput.value;

    if (city) {
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);

        }catch (error) {
            console.error("Error fetching weather data:", error);
            displayError(error)
        }

    }else{
        displayError("Please enter a city name");
    }

 });

 async function getWeatherData(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${}`;

    const response = await fetch(apiUrl);

    console.log(response);

    if (!response.ok) {
        throw new Error("Could not fetch weather data. Please check the city name.");
    }else{
        return response.json();
    }
 };

 function displayWeatherInfo(data){
    console.log(data);

    let cityDisplay = document.querySelector('.cityDisplay');
    cityDisplay.textContent = data.name;

    let temperatureDisplay = document.querySelector('.temperatureDisplay');
    let tempC = data.main.temp - 273.15;
    temperatureDisplay.textContent = tempC + "°C";

    let humidityDisplay = document.querySelector('.humidityDisplay');
    humidityDisplay.textContent = "Humidity: " + data.main.humidity + "%";

    let descriptionDisplay = document.querySelector('.descriptionDisplay');
    descriptionDisplay.textContent = data.weather[0].description;

    let weatherEmojiDisplay = document.querySelector('.weatherEmoji');
    weatherEmojiDisplay.textContent = getWeatherEmoji(data.weather[0].id);
 };

 function getWeatherEmoji(weatherId){
    if (weatherId >= 200 && weatherId < 300) {
        return "🌩️"; // Thunderstorm
    } else if (weatherId >= 300 && weatherId < 600) {
        return "🌧️"; // Drizzle/Rain
    } else if (weatherId >= 600 && weatherId < 700) {
        return "❄️"; // Snow
    } else if (weatherId >= 700 && weatherId < 800) {
        return "🌫️"; // Atmosphere/Fog
    } else if (weatherId === 800) {
        return "☀️"; // Clear sky
    } else if (weatherId > 800) {
        return "☁️"; // Clouds
    }
    return "🌍"; // Default emoji for unknown weather
 };

 function displayError(error){
    const errorDisplay = document.querySelector('.errorDisplay');
    errorDisplay.style.display = 'block';
    errorDisplay.textContent = error;
 };