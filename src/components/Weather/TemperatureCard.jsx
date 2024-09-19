import React from "react";
import { Icon } from "react-icons-kit";
import { arrowUp, arrowDown } from "react-icons-kit/feather";
import { useSelector } from "react-redux";

export default function TemperatureCard() {
  const { weatherData } = useSelector((state) => state.city);

  const {
    name: cityName,
    main: { temp_min: tempMin, temp_max: tempMax },
  } = weatherData;

  return (
    <div className="key-value-box">
      <div className="key">
        <Icon icon={arrowUp} size={20} className="icon" />
        <span className="value">{tempMax}&deg;</span>
      </div>
      <div className="key">
        <Icon icon={arrowDown} size={20} className="icon" />
        <span className="value">{tempMin}&deg;</span>
      </div>
    </div>
  );
}
