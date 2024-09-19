import React from "react";

function Header({ unit, toggleUnit }) {
  return (
    <div className="details-box-header">
      {/* heading */}
      <h4>Current Weather</h4>

      {/* switch */}
      <div className="switch" onClick={toggleUnit}>
        <div className={`switch-toggle ${unit === "metric" ? "c" : "f"}`}></div>
        <span className="c">C</span>
        <span className="f">F</span>
      </div>
    </div>
  );
}

export default Header;
