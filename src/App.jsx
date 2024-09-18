import { useState } from "react";
import "./App.css";
import Icon from "react-icons-kit";
import { search } from "react-icons-kit/feather/search";
import { useDispatch } from "react-redux";

function App() {
  const [city, setCity] = useState("London");
  const [unit, setUnit] = useState("Metric");

  const dispatch = useDispatch();

  //Data fetching
  const fetchData = () => {
    dispatch(getCityData(city, unit)).then((response) => console.response);
  };

  const handleCitySearch = (event) => {
    event.preventDefault();
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <div className="background">
      <div className="box">
        {/* city search form*/}
        <form
          autoComplete="off"
          onSubmit={{ handleCitySearch }}
          onChange={{ handleCityChange }}
        >
          <label>
            <Icon icon={search} />
          </label>
          <input
            type="text"
            className="city-input"
            value={city}
            required
            placeholder="Enter city....."
          />
          <button type="submit">GO</button>
        </form>
      </div>
    </div>
  );
}

export default App;
