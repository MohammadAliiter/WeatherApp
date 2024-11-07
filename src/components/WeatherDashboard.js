import React, { useState, useEffect } from 'react';
import SearchComponent from './SearchComponent';
import WeatherDisplay from './WeatherDisplay';
import FavoriteComponent from './FavoriteComponent';
import TemperatureToggle from './TemperatureToggle';
import { getWeatherData } from '../services/weatherService';
import { getFavorites } from '../services/favoriteService';
import styles from '../styles/WeatherDashboard.module.css';

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [isCelsius, setIsCelsius] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const lastSearchedCity = localStorage.getItem('lastSearchedCity');
    if (lastSearchedCity) {
      handleSearch(lastSearchedCity);
    }
    loadFavorites();
  }, []);

  const handleSearch = async (city) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getWeatherData(city);
      setWeatherData(data);
      localStorage.setItem('lastSearchedCity', city);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
    }
    setIsLoading(false);
  };

  const loadFavorites = async () => {
    try {
      const favoriteCities = await getFavorites();
      setFavorites(favoriteCities);
    } catch (err) {
      console.error('Failed to load favorites:', err);
    }
  };

  const handleToggleUnit = () => {
    setIsCelsius(!isCelsius);
  };

  return (
    <div className={styles.weatherDashboard}>
      <h1 className={styles.title}>Weather Dashboard</h1>
      <div className={styles.controls}>
        <SearchComponent onSearch={handleSearch} />
        <TemperatureToggle isCelsius={isCelsius} onToggle={handleToggleUnit} />
      </div>
      {isLoading && <div className={styles.loading}>Loading...</div>}
      {error && <div className={styles.error}>{error}</div>}
      {weatherData && (
        <WeatherDisplay weatherData={weatherData} isCelsius={isCelsius} />
      )}
      <FavoriteComponent
        favorites={favorites}
        onSelectFavorite={handleSearch}
        onFavoritesChange={loadFavorites}
      />
    </div>
  );
};

export default WeatherDashboard;