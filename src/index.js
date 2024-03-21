import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import WeatherApp from './WeatherApp/WeatherApp';
import Snow from './Snow/Snow';
import Forecast from "./Forecast/Forecast";
import TrailsAndLift from "./TrailsAndLift/TrailsAndLift";
import NotFoundPage from "./NotFoundPage";
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


document.querySelector('meta[name="viewport"]').setAttribute('content', 'width=device-width, initial-scale=1.0');

const router = createBrowserRouter([
  {
    path: "/",
    element: <WeatherApp />,
  },
  {
    path: "/snow",
    element: <Snow />,
  },
  {
    path: "/forecast",
    element: <Forecast />,
  },
  {
    path: "/trails-and-lifts",
    element: <TrailsAndLift />,
  },
  {
    element: <NotFoundPage/>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

reportWebVitals();
