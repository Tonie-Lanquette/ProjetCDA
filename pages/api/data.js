// import cities from "../../city.json";

// export default async function handler(req, res) {
//   const { latitude } = city;
//   const { longitude } = city;
//   const getWeatherData = await fetch(
//     `https://api.open-meteo.com/v1/forecast?latitude=${cities.latitude}&longitude=${cities.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,showers,snowfall,weather_code,wind_speed_10m,wind_direction_10m&daily=sunrise,sunset&models=meteofrance_arome_france`
    
//   );
//   const data = await getWeatherData.json();
//   res.status(200).json(data);
// }
