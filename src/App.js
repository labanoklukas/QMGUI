import React from 'react';
import './App.css';
import { Router, Route, } from 'react-router-dom';
import WeatherApp from './WeatherApp/WeatherApp.jsx';
import Forecast from './Forecast/Forecast.jsx';
import Snow from './Snow/Snow.jsx';


const App = () => {
  return (
    <div className="background">
      <div className='blurBackdrop'>
        <Router>
          <Route exact path = "/" component={WeatherApp} />
          <Route path = "/forecast" component={Forecast} />
          <Route path = "/Snow" component={Snow} />
        </Router>
      </div>
    </div>
  );
}

export default App;