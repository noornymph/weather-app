import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeatherByCity, setCity } from "./redux/CitySlice";
import WeatherDetails from "./components/Weather/WeatherDetails";
import { SphereSpinner } from "react-spinners-kit";
import SearchBar from "./components/SearchBar";
import Header from "./components/Header";

function App() {
  const { city, weatherData, loading, error } = useSelector(
    (state) => state.city
  );
  const [unit, setUnit] = useState("metric");

  const dispatch = useDispatch();

  useEffect(() => {
    if (city) {
      fetchData();
    }
  }, [city, unit]);

  const toggleUnit = () => {
    setUnit(unit === "metric" ? "imperial" : "metric");
  };

  const fetchData = () => {
    dispatch(fetchWeatherByCity({ city, unit }));
  };

  const handleCitySearch = (e) => {
    e.preventDefault();
    if (city) {
      fetchData();
    }
  };

  return (
    <div className="background">
      <div className="box">
        {/* City search form */}
        <SearchBar
          city={city}
          setCity={(newCity) => dispatch(setCity(newCity))}
          handleCitySearch={handleCitySearch}
          loadings={loading}
        />

        <div className="current-weather-details-box">
          <Header unit={unit} toggleUnit={toggleUnit} />

          {/* Loading Spinner */}
          {loading && (
            <div className="loader">
              <SphereSpinner loading={loading} color="#2fa5ed" size={20} />
            </div>
          )}

          {/* Error Message */}
          {error && <div className="error-msg">{error}</div>}

          {/* Weather Details */}
          {weatherData && <WeatherDetails />}
        </div>
      </div>
    </div>
  );
}

export default App;
