import React, { useState, useEffect } from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import { INSIGHT_WEATHER_API_URL } from "../../Api";
import './current-weather.css';

function MarsWeatherApp() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(INSIGHT_WEATHER_API_URL);
        if (!response.ok) {
          throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }

        const weatherJson = await response.json();
        setWeatherData(weatherJson);
      } catch (error) {
        console.error("Error fetching Mars weather data", error);
        setError("Error fetching weather data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  return (
      <div className="mars-weather-app">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {weatherData && !loading && !error && <WeatherCard data={weatherData} />}
      </div>
  );
}

export default MarsWeatherApp;
