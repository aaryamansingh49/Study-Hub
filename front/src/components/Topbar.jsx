import React, { useState } from "react";
import "../styles/Topbar.css";

function Topbar({ setSidebarOpen }) {

  const [darkMode, setDarkMode] = useState(false);

  const toggleDark = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark");
  };

  return (
    <div className="topbar">

      {/* LEFT SECTION */}
      <div className="topbar-left">
        <button
          className="menu-btn"
          onClick={() => setSidebarOpen(prev => !prev)}
        >
          ☰
        </button>

        <input
          type="text"
          placeholder="Search courses..."
          className="search-bar"
        />
      </div>

      {/* RIGHT SECTION */}
      <div className="topbar-right">
        <button className="theme-btn" onClick={toggleDark}>
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>

    </div>
  );
}

export default Topbar;