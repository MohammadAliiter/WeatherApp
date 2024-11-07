import React from 'react';
import styles from '../styles/WeatherDisplay.module.css';

const WeatherDisplay = ({ weatherData, isCelsius }) => {
  const { current, forecast, city } = weatherData;

  const convertTemp = (temp) => {
    if (isCelsius) {
      return Math.round(temp);
    }
    return Math.round((temp * 9) / 5 + 32);
  };

  return (
    <div className={styles.weatherDisplay}>
      <h2 className={styles.cityName}>{city}</h2>
      <div className={styles.currentWeather}>
        <img
          src={`http://openweathermap.org/img/wn/${current.icon}@2x.png`}
          alt={current.description}
          className={styles.weatherIcon}
        />
        <p className={styles.temperature}>
          {convertTemp(current.temp)}°{isCelsius ? 'C' : 'F'}
        </p>
        <p className={styles.description}>{current.description}</p>
      </div>
      <div className={styles.forecast}>
        {forecast.map((day, index) => (
          <div key={index} className={styles.forecastDay}>
            <p className={styles.forecastDate}>
              {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
            </p>
            <img
              src={`http://openweathermap.org/img/wn/${day.icon}.png`}
              alt={day.description}
              className={styles.forecastIcon}
            />
            <p className={styles.forecastTemp}>
              {convertTemp(day.temp)}°{isCelsius ? 'C' : 'F'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherDisplay;