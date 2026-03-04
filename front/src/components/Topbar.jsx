import React, { useEffect, useState } from "react";
import { FiMenu, FiSun, FiMoon, FiSearch, FiLogOut } from "react-icons/fi";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import GoogleLogin from "./GoogleLogin";
import "../styles/Topbar.css";
import { useNavigate } from "react-router-dom";

function Topbar({ setSidebarOpen }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("googleUser"))
  );

  const handleSearch = (e) => {

    if (e.key === "Enter") {
  
      const value = search.trim();
  
      if (!value) return;
  
      const program = value.toUpperCase();
  
      navigate(`/courses?program=${encodeURIComponent(program)}`);
  
      setSearch("");
  
    }
  
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // LOGOUT
  const handleLogout = async () => {
    await signOut(auth);

    localStorage.removeItem("googleUser");

    setUser(null);

    navigate("/");
  };

  return (
    <div className="topbar">
      {/* LEFT */}
      <div className="topbar-left">
        <button
          className="menu-btn"
          onClick={() => setSidebarOpen((prev) => !prev)}
        >
          <FiMenu />
        </button>

        <div className="search-container">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="topbar-right">
        <button
          className="theme-btn"
          onClick={() => setDarkMode((prev) => !prev)}
        >
          {darkMode ? <FiSun /> : <FiMoon />}
        </button>

        {/* GOOGLE LOGIN */}
        {!user ? (
          <GoogleLogin />
        ) : (
          <div className="user-profile">
            <img src={user.photo} alt="user" />

            <span>{user.name}</span>

            <button className="logout-btn" onClick={handleLogout}>
              <FiLogOut />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Topbar;
