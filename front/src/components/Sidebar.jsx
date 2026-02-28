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
        <li>
        <Link to="/worksheets">Worksheets</Link>
        </li>
        <li>
        <Link to="/projects">Projects</Link>
        </li>
        <li>
        <Link to="/notices">Notices</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;