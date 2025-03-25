import React, { useEffect, useRef, useState } from 'react';
import './Weather.css';
import search from '../assets/search.png';
import humidity from '../assets/humidity.png';
import wind from '../assets/wind.png';

const Weather = () => {
  const [weather, setWeather] = useState(null);

  const inputRef = useRef()

  const searchCity = async (city) => {
    if (!city){
        city = 'New Delhi'
        return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;
      const res = await fetch(url);
      const data = await res.json();
      setWeather({
        humidity: data.main.humidity,
        wind: data.wind.speed,
        temp: Math.floor(data.main.temp),
        city: data.name,
        icon: data.weather[0].icon,
        weathermain: data.weather[0].main,
      });
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    searchCity('New Delhi');
  }, []);

  return (
    <div className='weather'>
      <div className='search-bar'>
        <input ref={inputRef} type='text' placeholder='Search...' />
        <img src={search} alt='' onClick={()=>searchCity(inputRef.current.value)} />
      </div>

      {weather && (
        <>
          {weather.icon && (
            <img
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt='Weather Icon'
              className='weathericon'
            />
          )}
            <p className='weather-main'>{weather.weathermain}</p>

          <p className='temp'>{weather.temp}°C</p>
          <p className='cityName'>{weather.city}</p>
          <div className='weather-data'>
            <div className='col'>
              <img src={humidity} alt='Humidity' />
              <div>
                <p>{weather.humidity} %</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className='col'>
              <img src={wind} alt='Wind' />
              <div>
                <p>{weather.wind} Km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;