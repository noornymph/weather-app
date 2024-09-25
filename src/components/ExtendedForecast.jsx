import React from "react";

const ExtendedForecast = ({ extendedForecast }) => {
  const getDailyForecast = (forecastList) => {
    const dailyForecast = [];
    const uniqueDays = new Set();

    forecastList.forEach((data) => {
      const date = new Date(data.dt_txt);
      const day = date.toLocaleDateString("en-US", { weekday: "short" });

      if (!uniqueDays.has(day) && date.getHours() === 12) {
        dailyForecast.push(data);
        uniqueDays.add(day);
      }
    });

    return dailyForecast;
  };

  const filteredForecast = extendedForecast?.list
    ? getDailyForecast(extendedForecast.list)
    : [];

  return (
    <>
      <h4 className="extended-forecast-heading">Extended Forecast</h4>
      {filteredForecast.length > 0 ? (
        <div className="extended-forecasts-container">
          {filteredForecast.map((data, index) => {
            const date = new Date(data.dt_txt);
            const day = date.toLocaleDateString("en-US", { weekday: "short" });
            return (
              <div className="forecast-box" key={index}>
                <h5>{day}</h5>
                <img
                  src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
                  alt="icon"
                />
                <h5>{data.weather[0].description}</h5>
                <h5 className="min-max-temp">
                  {data.main.temp_max}&deg; / {data.main.temp_min}&deg;
                </h5>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="error-msg">No Data Found</div>
      )}
    </>
  );
};

export default ExtendedForecast;
