import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import wind from "../../assets/wind.svg";
import humidity from "../../assets/humidity.svg";
import "../styles/Weather.css";
import axios from "axios";
import { dateHandler } from "../utils/dateHandler";

function WeatherPage() {
  const { id } = useParams();
  const [data, setData] = useState();
  const [activeUnit, setActiveUnit] = useState("fahrenheit");
  const [location, setLocation] = useState();
  const navigate = useNavigate();
  const fetchForecastData = async (arr) => {
    await axios(`https://api.weather.gov/points/${arr[0]},${arr[1]}`)
      .then((res) => {
        setLocation(res.data.properties?.relativeLocation?.properties);
        axios(`${res.data.properties?.forecast}`)
          .then((res) =>
            setData(
              res.data.properties.periods.find(
                (ele) => ele.name === "Wednesday Night"
              )
            )
          )
          .catch((err) => console.log(err.response.data.title));
      })
      .catch((err) => console.log(err.response.data.title));
  };
  useEffect(() => {
    if (id) {
      let arr = id.split(",").map((ele) => {
        if (ele.includes("S") || ele.includes("W")) ele = "-" + ele;
        return ele.replace(/N|°|E|W|S| /g, "");
      });
      fetchForecastData(arr);
    }
  }, []);

  const unitToggleHandler = ({ type }) => {
    let res;
    if (type === "celcius") {
      res = ((data?.temperature - 32) * 5) / 9;
    } else {
      res = (data?.temperature * 9) / 5 + 32;
    }
    setActiveUnit(type);
    setData({ ...data, temperature: Math.ceil(res) });
  };
  return (
    <>
      <div className="app_container">
        <div className="card_container">
          {data ? (
            <>
              <img src={data?.icon} className="night_logo" />
              <div className="temp_details">
                <div className="heading">
                  {data?.temperature}
                  <sup
                    className={`temp_unit ${
                      activeUnit !== "celcius" && "active_unit"
                    }`}
                    onClick={() => {
                      unitToggleHandler({ type: "celcius" });
                    }}
                  >
                    °C
                  </sup>
                  <sup className="temp_unit">|</sup>
                  <sup
                    className={`temp_unit ${
                      activeUnit !== "fahrenheit" && "active_unit"
                    }`}
                    onClick={() => {
                      unitToggleHandler({ type: "fahrenheit" });
                    }}
                  >
                    °F
                  </sup>
                </div>
                <div className="right">
                  <div className="day_details">
                    Wednesday,{`${dateHandler(data?.startTime)}`}
                  </div>
                  <div className="location_detils">{data?.shortForecast}</div>
                  <div className="location_detils">
                    {location?.city},{location?.state}
                  </div>
                </div>
              </div>
              <div className="info">
                <img alt="humidity1" className="detail_icons" src={humidity} />
                <div className="humidity">
                  Humidity: {data?.relativeHumidity?.value}%
                </div>
              </div>
              <div className="info">
                <img
                  alt="windspeed1"
                  className="detail_icons"
                  style={{ width: "5", height: "5" }}
                  src={wind}
                />
                <div className="windspeed">Wind Speed: {data?.windSpeed}</div>
              </div>
            </>
          ) : (
            <>
              <div className="heading">No Data Found</div>
              <button className="submit_button" onClick={() => navigate("/")}>
                Back
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default WeatherPage;
