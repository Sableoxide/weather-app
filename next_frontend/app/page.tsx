'use client';

import Image from "next/image";
import styles from "./page.module.css"
import { useEffect, useRef, useState } from "react";

interface WeatherData {
  timestamp: number,       //1745658000,
  city: string,            // "Nairobi South",
  temp: number,            // 296.32,
  humidity: number,        // 44,
  weather: string          // "Clear",
  wind_direction: number   // 95,
  wind_speed: number       // 4.15,
  icon_code: string,        // "01d"
}

interface Coordinates {
  lon: string,
  lat: string
}

interface Temp {
  temp: number
}

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [city, setCity] = useState("shibuya");
  //const [coordinates, setCoordinates] = useState<Coordinates>({lon: "-0.1276474", lat: "51.5073219"});
  const [weatherData, setWeatherData] = useState<WeatherData[] | null>(null);
  const [isCelsius, setIsCelsius] = useState(true)
  
  const options = {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  }

  const handleClick = () => {
    setCity(inputRef.current?.value ?? "london");
    console.log(city)
  }

  const changeToCelsius = () => {
    setIsCelsius(true);
  }

  const changeToFarenheight = () => {
    setIsCelsius(false);
  }

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const geocod_url = "http://127.0.0.1:8000/api/location/" + city;
        const geoResponse = await fetch(geocod_url, options);
        if (!geoResponse.ok) throw new Error("GEO RESPONSE WAS NOT OK");
        const geoJson = await geoResponse.json();
        const newCoordinates: Coordinates = geoJson.body;
  
        const params = new URLSearchParams({
          lon: newCoordinates.lon,
          lat: newCoordinates.lat,
        });
        const weather_url = "http://127.0.0.1:8000/api/weather-data?" + params.toString() + "&cnt=1";
        const weatherResponse = await fetch(weather_url, options);
        if (!weatherResponse.ok) throw new Error("WEATHER RESPONSE WAS NOT OK");
        const weatherJson = await weatherResponse.json();
        setWeatherData(weatherJson.body);
      } catch (error: any) {
        console.log(error);
      }
    };
  
    fetchWeatherData();
  }, [city]);
 
  const forecast_cards = weatherData?.map((data, index) => {
    if (index >= 1) { 
      const time = new Date(data?.timestamp*1000).toLocaleString();
      return (
        <div className={` card ${styles.forecast_card}`} key={index}>
          <p>{time ?? "NULL DATE"}</p>
          <Image src={data?.icon_code ? "/" + data.icon_code + ".png" : "/img_error.png"} alt="wind icon" height={100} width={100}/>
          <span>{isCelsius ? data?.temp.toFixed(2) + "℃" : ((data?.temp ?? 0 * 9/5)+32).toFixed(2) + "℉"}</span>
        </div>
      )
    }
  })

  return (
    <div className={styles.main}>
      <div className={styles.sidebar}>
        <div className={styles.weather_temp_box}>
        <Image src={weatherData?.[0]?.icon_code ? "/" + weatherData[0].icon_code + ".png" : "/img_error.png"} alt="rain icon" height={100} width={100} />
          <p>
            {isCelsius ? weatherData?.[0]?.temp.toFixed(2) + "℃" : ((weatherData?.[0]?.temp ?? 0 * 9/5)+32).toFixed(2) + "℉"}
          </p>
          <p>{weatherData?.[0]?.weather ?? "loading weather"}</p>
        </div>
        <div className={styles.time_city_box}>
          <p>{weatherData?.[1]?.timestamp ? new Date(weatherData[0].timestamp*1000).toLocaleString() : "loading DATE"}</p>
          <p>{weatherData?.[0]?.city ?? "loading city"}</p>
        </div>
      </div>

      <div className={styles.sub_main}>
        <div className={styles.search_temp}>
          <div className={styles.search}>
            <input 
              type="search" 
              name="location" 
              id="location" 
              className="input-ghost-primary input input-block" 
              ref={inputRef}
              placeholder="Search city..."/>
            <button className="btn btn-primary btn-md" onClick={handleClick}>Go</button>
          </div>

          <div className={styles.temp}>
            <div className="btn-group btn-group-rounded btn-group-scrollable">
	            <button className={` btn ${isCelsius && "btn-warning"}`} onClick={changeToCelsius}>℃</button>
	            <button className={` btn ${!isCelsius && "btn-warning"}`} onClick={changeToFarenheight}>℉</button>
            </div>
          </div>
        </div>

        <div className={styles.x3day_forecast}>
          {forecast_cards ?? "LOADING"}
        </div>

        <div className={styles.wind_humidity}>
          <div className={`${styles.wind_humidity_cards} card`}>
	          <div className="card-body">
              <h2 className="card-header">WIND</h2>
            </div>
            <div className={styles.wind_speed}>
              <Image src="/wind.svg" alt="wind icon" height={40} width={40}/>
              <span>{weatherData?.[0]?.wind_speed ?? "loading wind speed" + " Km/hr"}</span>
            </div>
			      <p className={styles.wind_direction_text}>wind direction: {weatherData?.[0]?.wind_direction ?? "loading direction" + "°"}</p>
          </div>

          <div className={`${styles.wind_humidity_cards} card`}>
	          <div className="card-body">
              <h2 className="card-header">HUMIDITY</h2>
            </div>
            <p className={styles.humidity_text}>{weatherData?.[0]?.humidity ?? "loading humidity"}%</p>
            <progress className="progress progress-primary" value={weatherData?.[0]?.humidity} max="100"></progress>
          </div>
        </div>
      </div>
    </div>
  );
}
