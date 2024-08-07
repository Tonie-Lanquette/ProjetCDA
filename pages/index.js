import { useState, useEffect } from "react";

import { MainCard } from "../components/MainCard";
import { ContentBox } from "../components/ContentBox";
import { Header } from "../components/Header";
import { DateAndTime } from "../components/DateAndTime";
import { MetricsBox } from "../components/MetricsBox";
import { UnitSwitch } from "../components/UnitSwitch";
import { LoadingScreen } from "../components/LoadingScreen";
import { ErrorScreen } from "../components/ErrorScreen";

import styles from "../styles/Home.module.css";
import { cities }  from "../city.json";

export const App = () => {
  const [weatherData, setWeatherData] = useState();
  const [unitSystem, setUnitSystem] = useState("metric");

 const  getData = async () => {
      const response = await fetch(
       `https://api.open-meteo.com/v1/forecast?latitude=${cities.latitude}&longitude=${cities.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,showers,snowfall,weather_code,wind_speed_10m,wind_direction_10m&hourly=visibility&daily=sunrise,sunset&models=meteofrance_arome_france`
      )
       if (!response.ok) {
        throw new Error('Une erreure est survenu, impossible de récupérer les données')
      }

      const data = await response.json();
      setWeatherData(data);
      // console.log(data)
    };

  useEffect(() => {
    getData();

    const refreshPage = setInterval(() => {
      getData();
    }, 3600000);

    return () => clearInterval(refreshPage);

  }, []);


  

 

  const changeSystem = () =>
    unitSystem == "metric"
      ? setUnitSystem("imperial")
      : setUnitSystem("metric");

  return weatherData && !weatherData.message ? (
    <div className={styles.wrapper}>
      <MainCard
        city={cities.name}
        country={cities.country}
        weatherCode={weatherData.current.weather_code}
        isDay = {weatherData.current.is_day}
        iconName={weatherData.current.weather_code}
        unitSystem={unitSystem}
        weatherData={weatherData}
      />
      <ContentBox>
        <Header>
          <DateAndTime weatherData={weatherData} unitSystem={unitSystem} />
        </Header>
        <MetricsBox weatherData={weatherData} unitSystem={unitSystem} />
        <UnitSwitch onClick={changeSystem} unitSystem={unitSystem} />
      </ContentBox>
    </div>
  ) : weatherData && weatherData.message ? (
    <ErrorScreen errorMessage="Ville non trouvé, essaye encore ">
    </ErrorScreen>
  ) : (
    <LoadingScreen loadingMessage="Chargement des données..." />
  );
 };

export default App;
