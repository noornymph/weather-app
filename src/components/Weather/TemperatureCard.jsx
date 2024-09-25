import React from "react";
import { Icon } from "react-icons-kit";
import { arrowUp, arrowDown } from "react-icons-kit/feather";

const TemperatureCard = ({ tempMin, tempMax }) => {
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
};

export default TemperatureCard;
