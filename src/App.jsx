import React, { useState } from "react";
import {
  useFetchWeatherByCityQuery,
  useFetchExtendedForecastQuery,
} from "./api/weatherApi";
import WeatherDetails from "./components/Weather/WeatherDetails";
import SearchBar from "./components/SearchBar";
import Header from "./components/Header";
import ExtendedForecast from "./components/ExtendedForecast";
import { SphereSpinner } from "react-spinners-kit";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [unit, setUnit] = useState("metric");

  // Fetch current weather data based on city and unit
  const {
    data: weatherData,
    error: weatherError,
    isLoading: weatherLoading,
  } = useFetchWeatherByCityQuery({ city, unit }, { skip: !city });

  // Fetch extended forecast data based on city and unit
  const {
    data: extendedForecast,
    error: forecastError,
    isLoading: forecastLoading,
  } = useFetchExtendedForecastQuery({ city, unit }, { skip: !city });

  // Toggle between metric and imperial units
  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === "metric" ? "imperial" : "metric"));
  };

  // Handle the city search form submission
  const handleCitySearch = (e) => {
    e.preventDefault();
    if (city) {
      setCity(city);
    }
  };

  return (
    <div className="background">
      <div className="box">
        <SearchBar
          city={city}
          setCity={setCity}
          handleCitySearch={handleCitySearch}
          loadings={weatherLoading}
        />

        <div className="current-weather-details-box">
          <Header unit={unit} toggleUnit={toggleUnit} />

          {/* Show loading spinner for weather data */}
          {weatherLoading && (
            <div className="loader">
              <SphereSpinner
                loading={weatherLoading}
                color="#2fa5ed"
                size={20}
              />
            </div>
          )}

          {/* Handle and display weather errors */}
          {weatherError && (
            <div className="error-msg">{weatherError.message}</div>
          )}

          {/* Display weather details if data is available */}
          {weatherData && (
            <WeatherDetails weatherData={weatherData} unit={unit} />
          )}

          {/* Show loading message for extended forecast */}
          {forecastLoading && <div>Loading forecast...</div>}

          {/* Handle and display forecast errors */}
          {forecastError && (
            <div className="error-msg">{forecastError.message}</div>
          )}

          {/* Display extended forecast if data is available */}
          {extendedForecast && (
            <ExtendedForecast extendedForecast={extendedForecast} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
