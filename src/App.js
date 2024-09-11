import React, { useState } from 'react';
import Weather from './Weatherresult';
import './App.css';

function App() {
  const API_KEY = "f5d03d339df54adabe6131740240309";
  const [cityInput, setCityInput] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState(""); 

  const handleCityInputChange = (e) => {
    setCityInput(e.target.value);
  };

  const getData = async () => {
    if (cityInput === "") return;
    try {
      const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityInput}&days=3&aqi=no&alerts=no`);
      
      if (!response.ok) {
        throw new Error("City not found"); 
      }

      const result = await response.json();
      setWeatherData(result.forecast.forecastday);
      setError(""); 
    } catch (error) {
      setWeatherData([]); 
      setError("City not found. Please check your input and try again."); 
    }
  };

  return (
    <div className="container">
      <div className="search">
        <input type="text" placeholder="Search a city..." onChange={handleCityInputChange} />
        <button onClick={getData}>Search</button>
      </div>
      {error && <p className="error">{error}</p>} 
      {weatherData.map(item => (
        <Weather 
          key={item.date} date={item.date} mintemp={item.day.mintemp_c} maxtemp={item.day.maxtemp_c} condition={item.day.condition.text} 
          icon={item.day.condition.icon} 
        />
      ))}
    </div>
  );
}

export default App;