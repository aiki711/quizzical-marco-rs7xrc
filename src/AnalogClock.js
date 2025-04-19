import React from "react";
import "./AnalogClock.css";

function AnalogClock({ time }) {
  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours() % 12;

  const secDeg = seconds * 6;
  const minDeg = minutes * 6;
  const hourDeg = hours * 30 + minutes * 0.5;

  return (
    <div className="analog-clock">
      <div
        className="hand hour"
        style={{ transform: `rotate(${hourDeg}deg)` }}
      ></div>
      <div
        className="hand minute"
        style={{ transform: `rotate(${minDeg}deg)` }}
      ></div>
      <div
        className="hand second"
        style={{ transform: `rotate(${secDeg}deg)` }}
      ></div>
      <div className="center-dot" />
    </div>
  );
}

export default AnalogClock;
