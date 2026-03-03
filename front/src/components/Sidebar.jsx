import React from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiBook, FiBookmark, FiFolder, FiBell } from "react-icons/fi";
import "../styles/Sidebar.css";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <div className={`sidebar ${sidebarOpen ? "active" : ""}`}>
      
      <h2 className="logo">StudyHub</h2>

      <ul>
        <li onClick={() => setSidebarOpen(false)}>
          <NavLink to="/" end>
            <FiHome className="icon" />
            <span>Dashboard</span>
          </NavLink>
        </li>

        <li onClick={() => setSidebarOpen(false)}>
          <NavLink to="/courses">
            <FiBook className="icon" />
            <span>Courses</span>
          </NavLink>
        </li>

        <li onClick={() => setSidebarOpen(false)}>
          <NavLink to="/saved">
            <FiBookmark className="icon" />
            <span>Saved Collection</span>
          </NavLink>
        </li>

        <li onClick={() => setSidebarOpen(false)}>
          <NavLink to="/projects">
            <FiFolder className="icon" />
            <span>Projects</span>
          </NavLink>
        </li>

        <li onClick={() => setSidebarOpen(false)}>
          <NavLink to="/notices">
            <FiBell className="icon" />
            <span>Notices</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;