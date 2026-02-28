import React from "react";
import { Link } from "react-router-dom";
import "../styles/Sidebar.css";
function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo"> StudyHub</h2>
      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/courses">Courses</Link>
        </li>
        <li>Worksheets</li>
        <li>Projects</li>
        <li>Notices</li>
      </ul>
    </div>
  );
}

export default Sidebar;