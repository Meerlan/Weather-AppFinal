import React, { useState, useEffect } from "react";
import { WbSunny, BeachAccess, Cloud, Opacity, Grain, FilterDrama, Brightness5, Brightness6 } from '@mui/icons-material';
import "./WeatherCard.css";

const WeatherCard = ({ data }) => {
    const [backgroundImages, setBackgroundImages] = useState([]);
    const solKeys = Object.keys(data);
    const firstSolKey = solKeys.length > 0 ? solKeys[0] : null;
    const airTemperature = firstSolKey ? data[firstSolKey]?.AT : null;
    const windSpeed = firstSolKey ? data[firstSolKey]?.HWS : null;
    const atmosphericPressure = firstSolKey ? data[firstSolKey]?.PRE : null;
    const windDirection = firstSolKey ? data[firstSolKey]?.WD : null;
    const season = firstSolKey ? data[firstSolKey]?.Season : null;
    const humidity = firstSolKey ? data[firstSolKey]?.HUM?.av : null;

    const sunrise = "06:30 AM";
    const sunset = "05:45 PM";

    const [backgroundImage, setBackgroundImage] = useState("https://images3.alphacoders.com/254/2545.jpg");

    useEffect(() => {
        setBackgroundImage("https://images3.alphacoders.com/254/2545.jpg");
    }, []);

    return (
        <div className="weather-card" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', minHeight: '100vh' }} >
            {airTemperature ? (
                <>
                    <div className="background-slideshow">
                        {backgroundImages.map((imageUrl, index) => (
                            <div
                                key={index}
                                className="background-image"
                                style={{ backgroundImage: `url(${imageUrl})` }}
                            />
                        ))}
                    </div>
                    <h1 style={{ textAlign: "center", color: "white" }}>Mars Weather App</h1>

                    <div className="box">
                        <div className="temperature-section">
                            <p className="temperature">
                                <Brightness6 fontSize="small" /> {airTemperature?.av}°C
                            </p>
                            <p className="feels-like">
                                <BeachAccess fontSize="small" /> Feels like {airTemperature?.ct}°C
                            </p>
                        </div>
                        <div className="details-section">
                            <p className="wind">
                                <FilterDrama fontSize="small" /> Wind: {windSpeed?.av} m/s
                            </p>
                            <p className="pressure">
                                <Grain fontSize="small" /> Pressure: {atmosphericPressure?.av} hPa
                            </p>
                            <p className="wind-direction">
                                <Cloud fontSize="small" /> Wind Direction: {windDirection?.most_common?.compass_point}
                            </p>
                            <p className="season">
                                <Brightness5 fontSize="small" /> Season: {season}
                            </p>
                            <p className="humidity">
                                <Opacity fontSize="small" /> Humidity: {humidity}%
                            </p>
                            <p className="sunrise">
                                <WbSunny fontSize="small" /> Sunrise: {sunrise}
                            </p>
                            <p className="sunset">
                                <Brightness5 fontSize="small" /> Sunset: {sunset}
                            </p>
                        </div>
                    </div>
                </>
            ) : (
                <p>No weather data available.</p>
            )}
        </div>
    );
};

export default WeatherCard;
