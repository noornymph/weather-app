import React from "react";
import { Icon } from "react-icons-kit";

const InfoCard = ({ icon, label, value, unit }) => {
  return (
    <div className="key-value-box">
      <div className="key">
        <Icon icon={icon} size={20} className="icon" />
        <span>{label}</span>
      </div>
      <div className="value">
        <span>
          {value} {unit}
        </span>
      </div>
    </div>
  );
};

export default InfoCard;
