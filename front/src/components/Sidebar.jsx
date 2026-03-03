import React from "react";
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiBook,
  FiBookmark,
  FiFolder,
  FiBell,
  FiInfo,
  FiMail,
} from "react-icons/fi";
import "../styles/Sidebar.css";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <div className={`sidebar ${sidebarOpen ? "active" : ""}`}>
      <div className="logo">
        <h2>
          Work<span>shit</span>
        </h2>
      </div>

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

        <li onClick={() => setSidebarOpen(false)}>
          <NavLink to="/about">
            <FiInfo className="icon" />
            <span>About</span>
          </NavLink>
        </li>

        <li onClick={() => setSidebarOpen(false)}>
          <NavLink to="/contact">
            <FiMail className="icon" />
            <span>Contact</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
