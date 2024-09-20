import React from "react";
import TemperatureCard from "./TemperatureCard";
import InfoCard from "./InfoCard";
import { droplet } from "react-icons-kit/feather";
import { activity } from "react-icons-kit/feather";
import { wind } from "react-icons-kit/feather";
import ExtendedForecast from "../ExtendedForecast";
import { useSelector } from "react-redux";

const WeatherDetails = ({ unit }) => {
  const { weatherData } = useSelector((state) => state.city);

  const {
    name: cityName,
    main: { temp, feels_like: feelsLike, humidity, pressure },
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

        <TemperatureCard />
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
