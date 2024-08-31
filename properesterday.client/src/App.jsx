import { useState } from 'react';
import './App.css';

function App() {
    const [forecasts, setForecasts] = useState();
    const [count, setCount] =  useState(0);

    const contents = forecasts === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-striped" aria-labelledby="tabelLabel">
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
                {forecasts.map(forecast =>
                    <tr key={forecast.date}>
                        <td>{forecast.date}</td>
                        <td>{forecast.temperatureC}</td>
                        <td>{forecast.temperatureF}</td>
                        <td>{forecast.temperatureK}</td>
                        <td>{forecast.summary}</td>
                    </tr>
                )}
            </tbody>
        </table>;
    
    return (
        <div>
            <h1 id="tabelLabel">Weather forecast</h1>
            <p>Number of rows: {count}</p>
            <button onClick ={handleClick}>Add a new row</button>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
        </div>
    );

    function handleClick(){
        setCount(count+1);
        populateWeatherData(count+1);
    }

    async function populateWeatherData(count) {
        const response = await fetch('weatherforecast/' + count);
        const data = await response.json();
        setForecasts(data);
    }
}

export default App;