import React from "react";
import { FiClock } from "react-icons/fi";
import "../styles/Projects.css";

const Projects = () => {
  return (
    <div className="projects-page">

      <div className="projects-card">
        <FiClock className="projects-icon" />

        <h1>Projects Coming Soon</h1>

        <p>
          We're building something exciting.
          Stay tuned for powerful project features!
        </p>

      </div>

    </div>
  );
};

export default Projects;