import { useState } from "react";
import "./Weather.css";


function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "77708546d35a4c0b1cb8eedc1641fbae"; 

  const getWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name!");
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.cod === "404") {
        setError("City not found!");
        setWeather(null);
        return;
      }

      if (data.cod === 401) {
        setError("Invalid API Key!");
        return;
      }

      setError("");
      setWeather(data);

    } catch (err) {
      setError("Error fetching weather!");
      setWeather(null);
    }
  };

  return (
   <div className="main">
      <div className="box">
        <h1>🌤️ Weather App</h1>

        <div className="row">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={getWeather}>Search</button>
        </div>

        {error && <p className="error">{error}</p>}

        {weather && weather.main && (
          <div className="info">
            <h2>{weather.name}</h2>
            <p>🌡 Temp: {weather.main.temp}°C</p>
            <p>☁ {weather.weather[0].description}</p>
            <p>💨 Wind: {weather.wind.speed} m/s</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Weather;
