import React from "react";
import switchImg from "./imgs/switch.svg";
import "./Journey.css";

export default function Journey(props) {
  const { from, to, exchangeFromTo, showCitySelector } = props;
  return (
    <div className="journey">
      <div className="journey-station" onClick={() => showCitySelector(false)}>
        <input
          type="text"
          readOnly
          className="journey-input journey-from"
          name="from"
          value={from}
        />
      </div>
      <div className="journey-switch"onClick={() => exchangeFromTo()}>
        <img src={switchImg} alt="switch-img" width="70" height="40" />
      </div>
      <div className="journey-station" onClick={() => showCitySelector(true)}>
        <input
          type="text"
          readOnly
          className="journey-input journey-to"
          name="to"
          value={to}
        />
      </div>
    </div>
  );
}
