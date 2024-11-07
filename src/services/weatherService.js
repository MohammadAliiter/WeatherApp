const API_KEY = '1f87e955c2c39dec3be3edf6711301f7';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeatherData = async (city) => {
  const currentResponse = await fetch(
    `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
  );
  if (!currentResponse.ok) {
    throw new Error('Failed to fetch current weather data');
  }
  const currentData = await currentResponse.json();

  const forecastResponse = await fetch(
    `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
  );
  if (!forecastResponse.ok) {
    throw new Error('Failed to fetch forecast data');
  }
  const forecastData = await forecastResponse.json();

  return {
    city: currentData.name,
    current: {
      temp: currentData.main.temp,
      description: currentData.weather[0].description,
      icon: currentData.weather[0].icon,
    },
    forecast: forecastData.list
      .filter((item, index) => index % 8 === 0)
      .slice(0, 5)
      .map((item) => ({
        date: item.dt_txt,
        temp: item.main.temp,
        description: item.weather[0].description,
        icon: item.weather[0].icon,
      })),
  };
};