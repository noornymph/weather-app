import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExtendedForecast } from "../redux/citySlice";

const ExtendedForecast = ({ city, unit }) => {
  const { extendedForecast, loading, error } = useSelector(
    (state) => state.city
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (city) {
      dispatch(fetchExtendedForecast({ city, unit }));
    }
  }, [city, unit, dispatch]);

  // Function to filter the forecast data to one entry per day (e.g., at 12:00 PM)
  const getDailyForecast = (forecastList) => {
    const dailyForecast = [];
    const uniqueDays = new Set();

    forecastList.forEach((data) => {
      const date = new Date(data.dt_txt);
      const day = date.toLocaleDateString("en-US", {
        weekday: "short",
      });

      // Only add one entry per day
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
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="error-msg">{error}</div>
      ) : filteredForecast.length > 0 ? (
        <div className="extended-forecasts-container">
          {filteredForecast.map((data, index) => {
            const date = new Date(data.dt_txt);
            const day = date.toLocaleDateString("en-US", {
              weekday: "short",
            });
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
