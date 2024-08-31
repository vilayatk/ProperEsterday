import { useState } from "react";
import "./App.css";

function App() {
  const [forecasts, setForecasts] = useState();
  const [count, setCount] = useState(0);
  const [isStatic, setIsStatic] = useState(true);

  const handleCheckboxChange = (event) => {
    setIsStatic(event.target.checked);
    populateWeatherData(count, event.target.checked);
  };

  const checkboxLabel = (value) => {
    return value ? "Static" : "Dynamic";
  };

  const contents =
    forecasts === undefined ? (
      <p>
        <em>
          Loading... Please refresh once the ASP.NET backend has started. See{" "}
          <a href="https://aka.ms/jspsintegrationreact">
            https://aka.ms/jspsintegrationreact
          </a>{" "}
          for more details.
        </em>
      </p>
    ) : (
      <table className="table table-striped" aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Date</th>
            <th>Temp. (C)</th>
            <th>Temp. (F)</th>
            <th>Temp. (K)</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          {forecasts.map((forecast) => (
            <tr key={forecast.date}>
              <td>{forecast.date}</td>
              <td>{forecast.temperatureC}</td>
              <td>{forecast.temperatureF}</td>
              <td>{forecast.temperatureK}</td>
              <td>{forecast.summary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );

  return (
    <div>
      <h1 id="tabelLabel">{checkboxLabel(isStatic)} weather forecasts</h1>
      <input
        type="checkbox"
        id="myCheckbox"
        checked={isStatic}
        onChange={handleCheckboxChange}
      />
      <label htmlFor="myCheckbox">Click for {checkboxLabel(!isStatic)}</label>
      {!isStatic && (
        <span>
          <p>Number of rows: {count}</p>
          <button onClick={handleClick}>Add a new row</button>
        </span>
      )}
      {contents}
    </div>
  );

  function handleClick() {
    setCount(count + 1);
    populateWeatherData(count + 1);
  }

  async function populateWeatherData(count, isStatic) {
    if (isStatic) {
      count = -1;
    }
    const forecasturl = "weatherforecast/" + count;
    const response = await fetch(forecasturl);
    const data = await response.json();
    setForecasts(data);
  }
}

export default App;
