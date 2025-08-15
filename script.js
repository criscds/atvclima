const apiKey = "3f9775b525d04855b87201254251308";

const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherResult = document.getElementById('weather-result');
const errorMessage = document.getElementById('error-message');

const cityName = document.getElementById('city-name');
const localTime = document.getElementById('local-time');
const weatherIcon = document.getElementById('icon-weather'); // Corrigido aqui
const temperature = document.getElementById('temperature');
const condition = document.getElementById('condition');
const feelsLike = document.getElementById('feels-like');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const pressure = document.getElementById('pressure');
const visibility = document.getElementById('visibility');
const uvIndex = document.getElementById('uv-index');

async function fetchWeather(city) {
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no&lang=pt`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.message);
        }

        cityName.innerText = `${data.location.name} - ${data.location.country}`;
        localTime.innerText = `Horário Local: ${data.location.localtime}`;
        weatherIcon.src = "https:" + data.current.condition.icon;
        weatherIcon.alt = data.current.condition.text;
        temperature.innerText = `${data.current.temp_c}°C`;
        condition.innerText = data.current.condition.text;
        feelsLike.innerText = `${data.current.feelslike_c}°C`;
        humidity.innerText = `${data.current.humidity}%`;
        windSpeed.innerText = `${data.current.wind_kph} km/h`;
        pressure.innerText = `${data.current.pressure_mb} mb`;
        visibility.innerText = `${data.current.vis_km} km`;
        uvIndex.innerText = `${data.current.uv}`;

        weatherResult.classList.remove('hidden');
        errorMessage.classList.add('hidden');
    } catch (error) {
        weatherResult.classList.add('hidden');
        errorMessage.classList.remove('hidden');
        errorMessage.innerHTML = `<p>Erro: ${error.message}. Tente novamente.</p>`;
    }
}

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        alert("Por favor, digite o nome de uma cidade.");
    }
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) {
            fetchWeather(city);
        } else {
            alert("Por favor, digite o nome de uma cidade.");
        }
    }
});
