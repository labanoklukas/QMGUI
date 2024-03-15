import React, { useState } from 'react';
import './WeatherApp.css';

import search_icon from "../Assests/search.png";
import clear_icon from "../Assests/clear.png";
import cloud_icon from "../Assests/cloud.png";
import drizzle_icon from "../Assests/drizzle.png";
import rain_icon from "../Assests/rain.png";
import snow_icon from "../Assests/snow.png";
import wind_icon from "../Assests/wind.png";
import humidity_icon from "../Assests/humidity.png";

export const WeatherApp = () => {
    const api_key = "037801e525acc86cf8c189da8468446e";

    const [wicon,setWicon] = useState(cloud_icon);

    const search = async () => {
      const element = document.getElementsByClassName("cityInput");
      if (element[0].value === "") {
          return 0;
      }
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
  
      try {
          const response = await fetch(url);
          const data = await response.json();
          console.log("API response:", data);
  
          const humidity = document.getElementsByClassName("humidity-percent");
          const wind = document.getElementsByClassName("wind-rate");
          const temperature = document.getElementsByClassName("weather-temp");
          const location = document.getElementsByClassName("weather-location");
  
          if (data.main) {
              humidity[0].innerHTML = data.main.humidity;
              temperature[0].innerHTML = data.main.temp;
          } else {
              console.error("Main data not found in API response.");
          }
  
          if (data.wind) {
              wind[0].innerHTML = data.wind.speed;
          } else {
              console.error("Wind data not found in API response.");
          }
  
          if (data.name) {
              location[0].innerHTML = data.name;
          } else {
              console.error("Location data not found in API response.");
          }
  
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
  
      } catch (error) {
          console.error('Error fetching data:', error);
      }

    }

    return (
        <div className='container'>
            <div className="top-bar">
                <input type="text" className="cityInput" placeholder='Search' />
                <div className='search-icon' onClick={search}>
                    <img src={search_icon} alt="" />
                </div>
            </div>
            <div className="weather-image">
                <img src={cloud_icon} alt="" />
            </div>
            <div className="weather-temp">24°C</div>
            <div className="weather-location">London</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="humidity-percent">64%</div>
                        <div className='text'>Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="wind-rate">18 km/h</div>
                        <div className='text'>Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherApp;