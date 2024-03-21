import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Forecast.css';

const api_key = "037801e525acc86cf8c189da8468446e";

const Forecast = () => {

    return (
        <div className='container'>
            <h1>Forecast Page</h1>
            <Link to="/">Back</Link>
            <p>This is the Forecast page content.</p>
        </div>

    );
}
export default Forecast;
