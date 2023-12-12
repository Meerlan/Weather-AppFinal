import React, { useState, useEffect } from "react";
import CurrentWeather from "./components/current-weather/current-weather";
import { INSIGHT_WEATHER_API_URL } from "./Api";

function App() {
    const [currentWeather, setCurrentWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await fetch(INSIGHT_WEATHER_API_URL);
                if (!response.ok) {
                    throw new Error(`Failed to fetch data. Status: ${response.status}`);
                }

                const weatherData = await response.json();
                setCurrentWeather(weatherData);
            } catch (error) {
                console.error("Error fetching InSight Mars Weather data", error);
                setError("Error fetching weather data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchWeatherData();
    }, []);

    console.log(currentWeather);

    return (
        <div className="container">
            {loading && <p>Loading...</p>}
            {!loading && error && <p>{error}</p>}
            {!loading && !error && currentWeather && (
                <CurrentWeather data={currentWeather} />
            )}
        </div>
    );
}

export default App;
