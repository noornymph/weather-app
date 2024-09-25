import React from "react";
import TemperatureCard from "./TemperatureCard";
import InfoCard from "./InfoCard";
import { droplet, activity, wind } from "react-icons-kit/feather";

const WeatherDetails = ({ weatherData, unit }) => {
  const {
    name: cityName,
    main: {
      temp,
      feels_like: feelsLike,
      humidity,
      pressure,
      temp_min: tempMin,
      temp_max: tempMax,
    },
    wind: { speed: windSpeed },
    weather,
  } = weatherData;

  const { description, icon } = weather[0];
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <div className="weather-details-container">
      <div className="details">
        <h4 className="city-name">{cityName}</h4>
        <div className="icon-and-temp">
          <img src={iconUrl} alt="weather icon" />
          <h1>{temp}&deg;</h1>
        </div>
        <h4 className="description">{description}</h4>
      </div>

      <div className="metrices">
        <h4>Feels like {feelsLike}&deg;</h4>
        <TemperatureCard tempMin={tempMin} tempMax={tempMax} />
        <InfoCard icon={droplet} label="Humidity" value={humidity} unit="%" />
        <InfoCard
          icon={activity}
          label="Pressure"
          value={pressure}
          unit="hPa"
        />
        <InfoCard icon={wind} label="Wind" value={windSpeed} unit="kph" />
      </div>
    </div>
  );
};

export default WeatherDetails;
