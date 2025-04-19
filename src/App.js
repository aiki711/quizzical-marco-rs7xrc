import React, { useState, useEffect } from "react";
import "./styles.css";
import AnalogClock from "./AnalogClock";
import { quotes1, quotes2 } from "./quotes";

function App() {
  const [language, setLanguage] = useState("ja");
  const [quote, setQuote] = useState(null);
  const [animationKey, setAnimationKey] = useState(0); // アニメーション再生用
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timeOfDay, setTimeOfDay] = useState("morning");
  const [weather, setWeather] = useState(null);

  const updateQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes1.length);
    setQuote(quotes1[randomIndex]);
  };

  // 時計の更新
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);

      // 自動更新用
      const second = now.getSeconds();
      if (second % 10 === 0) {
        updateQuote();
      }

      // 時間帯の更新
      const hour = now.getHours();
      if (hour >= 5 && hour < 12) {
        setTimeOfDay("morning");
      } else if (hour >= 12 && hour < 18) {
        setTimeOfDay("afternoon");
      } else {
        setTimeOfDay("night");
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  //天気の取得
  useEffect(() => {
    const fetchWeather = () => {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        const apiKey = "7332ea724f72d9d1a1247334cb8204c1";
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=ja`;

        fetch(url)
          .then((res) => res.json())
          .then((data) => {
            setWeather(data.weather[0]);
          })
          .catch((err) => console.error("天気の取得失敗:", err));
      });
    };

    fetchWeather(); // 最初に1回
    const interval = setInterval(fetchWeather, 30 * 60 * 1000); // 30分ごと

    return () => clearInterval(interval);
  }, []);

  // 手動更新用
  const handleClick = () => {
    const randomIndex = Math.floor(Math.random() * quotes2.length);
    setQuote(quotes2[randomIndex]);
    setAnimationKey((prev) => prev + 1); // アニメーション再生用にキーを更新
  };

  const formatTime = (date) =>
    date.toLocaleTimeString("ja-JP", { hour12: false });

  return (
    <div className={`app ${timeOfDay}`}>
      {/* 言語切り替え */}
      <div className="language-select">
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="ja">日本語</option>
          <option value="en">English</option>
        </select>
      </div>

      {weather && (
        <div className="weather-info">
          <p>🌤 現在の天気: {weather.description}</p>
        </div>
      )}

      <h1>🕒 現在時刻</h1>
      <div className="clock-section">
        <div className="digital-clock">{formatTime(currentTime)}</div>
        <AnalogClock time={currentTime} />
      </div>

      <h1>💬ジョージの名言ジェネレーター💬</h1>
      <button onClick={handleClick}>モチベがないときに押すボタン</button>

      {quote && (
        <p className="quote fade-in" key={animationKey}>
          {quote[language]}
        </p>
      )}
    </div>
  );
}

export default App;
