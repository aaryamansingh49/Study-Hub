import React, { useState } from "react";
import "../styles/Topbar.css";

function Topbar() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDark = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark");
  };

  return (
    <div className="topbar">
      <input type="text" placeholder="Search courses..." />
      <div className="profile">
        <span>Theme</span>
        <button onClick={toggleDark}>🌙</button>
      </div>
    </div>
  );
}

export default Topbar;