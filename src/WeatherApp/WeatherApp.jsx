import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './WeatherApp.css';
import Forecast from '../Forecast/Forecast';
import forecast_icon from "../Assests/calendar.webp"
import lift_icon from "../Assests/snow-lift.png"
import search_icon from "../Assests/search.png";
import clear_icon from "../Assests/clear.png";
import cloud_icon from "../Assests/cloud.png";
import drizzle_icon from "../Assests/drizzle.png";
import rain_icon from "../Assests/rain.png";
import snow_icon from "../Assests/snow.png";
import wind_icon from "../Assests/wind.png";
import humidity_icon from "../Assests/humidity.png";
import unavailable_icon from "../Assests/unavailable.png";

const api_key = "037801e525acc86cf8c189da8468446e";

const WeatherApp = () => {
    const [city, setCity] = useState('');
    const [wicon, setWicon] = useState(cloud_icon);
    const [wicon2, setWicon2] = useState(lift_icon);
    const [showForecast, setShowForecast] = useState(false);

    const search = async () => {
        const cityName = document.getElementsByClassName("cityInput");
        if (cityName[0].value === "") {
            return 0;
        }
        setCity(cityName[0].value);
        setShowForecast(true);
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName[0].value}&units=Metric&appid=${api_key}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log("API response:", data);

            const humidity = document.getElementsByClassName("humidity-percent");
            const wind = document.getElementsByClassName("wind-rate");
            const temperature = document.getElementsByClassName("weather-temp");
            const location = document.getElementsByClassName("weather-location");

            if (data.main) {
                humidity[0].innerHTML = data.main.humidity + "%";
                temperature[0].innerHTML = data.main.temp + "°C";
            } else {
                console.error("Main data not found in API response.");
            }

            if (data.wind) {
                wind[0].innerHTML = data.wind.speed + " km/h";

                // Check if wind speed is over 40mph (convert m/s to mph)
                if (data.wind.speed * 3.6 > 1) {
                    setWicon2(unavailable_icon); // Set unavailable icon if wind speed is over 40mph
                } else {
                    if (data.weather && data.weather.length > 0) {
                        const weatherIconCode = data.weather[0].icon;
                        console.log("Weather Icon Code:", weatherIconCode);

                        if (weatherIconCode === "01d" || weatherIconCode === "01n") {
                            setWicon(clear_icon);
                        } else if (weatherIconCode === "02d" || weatherIconCode === "02n") {
                            setWicon(cloud_icon);
                        } else if (weatherIconCode === "03d" || weatherIconCode === "03n") {
                            setWicon(drizzle_icon);
                        } else if (weatherIconCode === "04d" || weatherIconCode === "04n") {
                            setWicon(cloud_icon);
                        } else if (weatherIconCode === "09d" || weatherIconCode === "09n") {
                            setWicon(rain_icon);
                        } else if (weatherIconCode === "10d" || weatherIconCode === "10n") {
                            setWicon(rain_icon);
                        } else if (weatherIconCode === "13d" || weatherIconCode === "13n") {
                            setWicon(snow_icon);
                        } else {
                            setWicon(clear_icon);
                        }
                    } else {
                        console.error("Weather data not found in API response.");
                    }
                }
            } else {
                console.error("Wind data not found in API response.");
            }

            if (data.name) {
                location[0].innerHTML = data.name;
            } else {
                console.error("Location data not found in API response.");
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (
        <div className='background'>
            <div className='blurBackdrop'>
                <div className='mainBody'>  
                        <header className="searchBar">
                            <input type="text" className="cityInput" placeholder='Search' onKeyDown={(event) => { if (event.key === 'Enter') search(); }} />
                            <button className='searchIcon' onClick={search}>
                                <img src={search_icon} alt="" />
                            </button>
                        </header>
                        <body>
                            <div className='dataDisplay'>
                                <img className='locationWeatherIcon' src={wicon} alt= "Cloud-icon" />
                                <div className='locationTempStack'>
                                        <h2 className='location'></h2>

                                        <h1 className="weather-temp">--°C</h1>
                                    
                                </div>
                            </div>
                                <div className='dataDisplay'>
                                    <div className='horizontalStack'>
                                        <div className="element"> 
                                                <img src={humidity_icon} alt="" className="icon" />
                                                <div className="data">
                                                    <div className="humidity-percent">--%</div>
                                                    <div className='text'>Humidity</div>
                                                </div>
                                        </div>
                                            <div className="element">
                                                <img src={wind_icon} alt="" className="icon" />
                                                <div className="data">
                                                    <div className="wind-rate">-- km/h</div>
                                                    <div className='text'>Wind Speed</div>
                                                </div>
                                            </div>
                                    </div>
                                </div>
                           
                            <div className='dataDisplay displayWithBG'>
                                <h1 className='displayTitle'>Your Trip</h1>

                            </div>
                    
                        
                            {showForecast && <Forecast city={city} />}
                            <div className="widgetDisplay">
                                <div className='horizontalStack'>
                                    <div className="forecast-box widget">
                                        <Link to='forecast'>
                                            <img src={forecast_icon} className="image-center" alt="forecast icon" />
                                        </Link>
                                        <div className="box-text">Forecast</div>
                                    </div>
                                    <div className="snow-details-box widget">
                                        <Link to='snow'>
                                            <img src={snow_icon} className="image-center" alt="snow icon" />
                                        </Link>
                                        <div className="box-text">Snow Details</div>
                                    </div>
                                    <div className="lifts-and-trails-box widget">
                                        <Link to='trails-and-lifts'>
                                            <img src={wicon2} className="image-center" alt="lift icon" />
                                        </Link>
                                        <div className="box-text">Lifts and Trails</div>
                                    </div>
                                </div>    
                            </div>
                        </body>
                </div>
            </div>
        </div>
    );
}

export default WeatherApp;
