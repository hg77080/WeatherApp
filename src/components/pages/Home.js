import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  const navigate = useNavigate();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const latitudeHandler = (val) => {
    setLatitude(val);
  };
  const longitudeHandler = (val) => {
    setLongitude(val);
  };

  const handleSubmit = () => {
    navigate(`/forecast/${latitude},${longitude}`);
  };
  return (
    <div className="app_container">
      <div className="card_container">
        <p className="form_heading">Weather App</p>
        <div className="form_fields">
          <input
            placeholder="Enter Latitude"
            value={latitude}
            onChange={(e) => {
              latitudeHandler(e.target.value);
            }}
            className="input_container"
          />
          <input
            placeholder="Enter Latitude"
            value={longitude}
            onChange={(e) => {
              longitudeHandler(e.target.value);
            }}
            className="input_container"
          />
        </div>
        <button
          className="submit_button"
          onClick={handleSubmit}
          disabled={!latitude || !longitude}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Home;
