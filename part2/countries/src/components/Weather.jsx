import axios from "axios";
import { useEffect, useState } from "react";

const WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast";
const GEOLOCATION_API_URL = "https://api.api-ninjas.com/v1/geocoding";

const API_KEY = import.meta.env.VITE_NINJA_API_KEY;

/*
WMO Code
0               Clear sky
1, 2, 3         Mainly clear, partly cloudy, and overcast
45, 48          Fog and depositing rime fog
51, 53, 55      Drizzle: Light, moderate, and dense intensity
56, 57          Freezing Drizzle: Light and dense intensity
61, 63, 65      Rain: Slight, moderate and heavy intensity
66, 67          Freezing Rain: Light and heavy intensity
71, 73, 75      Snow fall: Slight, moderate, and heavy intensity
77              Snow grains
80, 81, 82      Rain showers: Slight, moderate, and violent
85, 86          Snow showers slight and heavy
95 *            Thunderstorm: Slight or moderate
96, 99 *        Thunderstorm with slight and heavy hail
*/

const WMO_CODE_MEANING = {
    0: "Clear sky",
    1: "Mainly clear", 2: "Partly cloudy", 3: "Overcast",
    45: "Fog", 48: "Depositing rime fog",
    51: "Light drizzle", 53: "Moderate drizzle", 55: "Dense drizzle",
    56: "Light freezing drizzle", 57: "Dense freezing drizzle",
    61: "Slight rain", 63: "Moderate rain", 65: "Heavy rain",
    66: "Light freezing rain", 67: "Heavy freezing rain",
    71: "Slight snow fall", 73: "Moderate snow fall", 75: "Heavy snow fall",
    77: "Snow grains",
    80: "Slight rain showers", 81: "Moderate rain showers", 82: "Violent rain showers",
    85: "Slight snow showers", 86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with slight hail", 99: "Thunderstorm with heavy hail"
};


const Weather = ({ countryData }) => {
    const capitals = countryData.capital;
    const countryName = countryData.name.common;
    const [weatherInfo, setWeatherInfo] = useState([]);

    const fetchWeatherInfo = (capitalName, lat, lng) =>
        axios.get(`${WEATHER_API_URL}?latitude=${lat}&longitude=${lng}&current=temperature_2m,weather_code,wind_speed_10m`)
            .then(({ data }) => {
                console.log(`Adding ${capitalName} weather data.`);
                setWeatherInfo(info => info.concat([{ ...data, name: capitalName }]));
            })
            .catch(error => console.error(error));


    useEffect(() => {
        setWeatherInfo(info => []);
        console.log("Country data changed! Weather info reset.", weatherInfo);
        capitals.map(
            capital =>
                axios.get(`${GEOLOCATION_API_URL}?city=${capital}&country=${countryName}`, { headers: { 'X-Api-Key': API_KEY } })
                    .then(({ data }) => {
                        if (data.length > 0) {
                            fetchWeatherInfo(capital, data[0].latitude, data[0].longitude);
                        } else if (countryData.capitalInfo?.latlng) {
                            console.log(`Could not find geolocation for ${capital} in ${countryName}. Using 'capitalInfo' field as a backup...`);
                            fetchWeatherInfo(capital, countryData.capitalInfo.latlng[0], countryData.capitalInfo.latlng[1]);
                        } else {
                            console.log(`Could not find geolocation for ${capital} in ${countryName}. Using country's geolocation...`);
                            fetchWeatherInfo(countryName, countryData.latlng[0], countryData.latlng[1]);
                        }
                    })
                    .catch(error => console.error(error))
        );
    }, [countryData]);

    return <>
        {
            weatherInfo.length > 0
                ? weatherInfo.map(capitalWeather =>
                    <div key={capitalWeather.name}>
                        <h4>Weather in {capitalWeather.name}</h4>
                        <p>Temperature: {capitalWeather.current.temperature_2m} Cº (Apparent: {capitalWeather.current.temperature_2m} Cº)</p>
                        <p>Wind speed: {capitalWeather.current.wind_speed_10m} km/h</p>
                        {<p>{WMO_CODE_MEANING[capitalWeather.current.weather_code]}</p> ?? <></>}
                    </div>)
                : <></>
        }
        {
            weatherInfo.length < capitals.length
                ? <p>Loading weather data [{weatherInfo.length}/{capitals.length}]...</p>
                : <></>
        }
    </>;
};

export default Weather;