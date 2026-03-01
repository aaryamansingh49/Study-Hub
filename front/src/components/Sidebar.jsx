import React from "react";
import { Link } from "react-router-dom";
import "../styles/Sidebar.css";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <div className={`sidebar ${sidebarOpen ? "active" : ""}`}>
      <h2 className="logo">StudyHub</h2>

      <ul>
        <li onClick={() => setSidebarOpen(false)}>
          <Link to="/">Dashboard</Link>
        </li>

        <li onClick={() => setSidebarOpen(false)}>
          <Link to="/courses">Courses</Link>
        </li>

        <li onClick={() => setSidebarOpen(false)}>
          <Link to="/saved">Saved Collection</Link>
        </li>

        <li onClick={() => setSidebarOpen(false)}>
          <Link to="/projects">Projects</Link>
        </li>

        <li onClick={() => setSidebarOpen(false)}>
          <Link to="/notices">Notices</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;