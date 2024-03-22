import React, { useEffect, useState } from 'react';
import './Forecast.css';
import clear_icon from "../Assests/clear.png";
import cloud_icon from "../Assests/cloud.png";
import drizzle_icon from "../Assests/drizzle.png";
import rain_icon from "../Assests/rain.png";
import snow_icon from "../Assests/snow.png";

const api_key = "037801e525acc86cf8c189da8468446e";

const Forecast = ({ city }) => {
    const [forecastData, setForecastData] = useState([]);

    useEffect(() => {
        const fetchForecast = async () => {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api_key}&units=metric`);
                const data = await response.json();
                console.log("Forecast API response:", data);
                setForecastData(data.list);
            } catch (error) {
                console.error('Error fetching forecast data:', error);
            }
        };

        if (city) {
            fetchForecast();
        }
    }, [city]);

    if (!city) {
        return <div>Error: City information not available</div>;
    }

    // Group forecast data by day
    const groupForecastByDay = () => {
        const groupedForecast = {};
        forecastData.forEach(forecast => {
            const date = forecast.dt_txt.split(' ')[0];
            if (!groupedForecast[date]) {
                groupedForecast[date] = [];
            }
            groupedForecast[date].push(forecast);
        });
        return Object.values(groupedForecast);
    };

    // Get weather icon based on weather condition
    const getWeatherIcon = (weatherIconCode) => {
        switch (weatherIconCode) {
            case "01d":
            case "01n":
                return clear_icon;
            case "02d":
            case "02n":
            case "03d":
            case "03n":
                return cloud_icon;
            case "04d":
            case "04n":
                return drizzle_icon;
            case "09d":
            case "09n":
            case "10d":
            case "10n":
                return rain_icon;
            case "13d":
            case "13n":
                return snow_icon;
            default:
                return clear_icon;
        }
    };

    return (
        <div className="forecast-container">
            <h2>Weather Forecast for {city}</h2>
            <div className="ladder-container">
                {groupForecastByDay().slice(0, 5).map((dayForecast, index) => (
                    <div key={index} className="ladder-step">
                        <h3>{new Date(dayForecast[0].dt_txt).toLocaleDateString()}</h3>
                        <div className="ladder-weather">
                            {dayForecast.map((forecast, i) => (
                                <div key={i} className="weather-item">
                                    <img src={getWeatherIcon(forecast.weather[0].icon)} alt="Weather Icon" />
                                    <div>{forecast.main.temp} °C</div>
                                    <div className="weather-item-time">{forecast.dt_txt.split(' ')[1]}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Forecast;
