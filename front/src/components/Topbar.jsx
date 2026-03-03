import React, { useEffect, useState } from "react";
import { FiMenu, FiSun, FiMoon, FiSearch } from "react-icons/fi";
// import logo from "../assets/workshit-logo.png";
import "../styles/Topbar.css";

function Topbar({ setSidebarOpen }) {

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="topbar">

      {/* LEFT */}
      <div className="topbar-left">

        <button
          className="menu-btn"
          onClick={() => setSidebarOpen(prev => !prev)}
        >
          <FiMenu />
        </button>

        <div className="search-container">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search courses..."
          />
        </div>

      </div>

      {/* RIGHT */}
      <div className="topbar-right">

        <button
          className="theme-btn"
          onClick={() => setDarkMode(prev => !prev)}
        >
          {darkMode ? <FiSun /> : <FiMoon />}
        </button>

      </div>

    </div>
  );
}

export default Topbar;