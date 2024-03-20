import React, { useEffect, useState } from 'react';
import './Snow.css';

const api_key = "037801e525acc86cf8c189da8468446e";

const Snow = () => {
    const [forecastData, setForecastData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchForecastData = async () => {
            const lat = 'YOUR_LATITUDE'; // Set latitude of the location
            const lon = 'YOUR_LONGITUDE'; // Set longitude of the location
            const cnt = 5; // Number of forecast data points to retrieve

            const Forecast_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=${cnt}&appid=${api_key}`;

            try {
                const response = await fetch(Forecast_URL);
                const data = await response.json();
                setForecastData(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchForecastData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className='container'>
            {/* Render forecast data here */}
            <h1>Forecast Data</h1>
        </div>
    );
};

export default Snow;
