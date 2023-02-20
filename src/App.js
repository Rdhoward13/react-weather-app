import "./App.css";
import UilReact from "@iconscout/react-unicons/icons/uil-react";
import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import { TimeAndLocation } from "./components/TimeAndLocation";
import { TemperatureAndDetails } from "./components/TemperatureAndDetails";
import { Forecast } from "./components/Forecast";
import getWeatherData from "./services/weatherService";
import getFormattedWeatherData from "./services/weatherService";
import { useEffect, useState } from "react";

export default function App() {
  const [query, setQuery] = useState({ q: "waxahachie" });
  const [units, setUnits] = useState("imperial");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      getFormattedWeatherData({ ...query, units }).then((data) => {
        setWeather(data);
      });
    };

    fetchWeather();
  }, [query, units]);
  return (
    <div className="mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400">
      <TopButtons />
      <Inputs />
      {weather && (
        <div>
          <TimeAndLocation weather={weather} />
          <TemperatureAndDetails weather={weather} />

          <Forecast title="Hourly Forecast" />
          <Forecast title="Daily Forecast" />
        </div>
      )}
    </div>
  );
}
