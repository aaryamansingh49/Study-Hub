import React from "react";
import { FiBookOpen, FiTarget, FiAward } from "react-icons/fi";
import "../styles/About.css";

function About() {
  return (
    <div className="about-page">
      <div className="about-card">

        <h1>
          About <span>Workshit</span>
        </h1>

        <p className="tagline">
          Your personal academic workspace — organize, save and grow smarter.
        </p>

        <div className="about-grid">

          {/* Smart Learning */}
          <div className="about-box">
            <div className="about-header">
              <div className="about-icon">
                <FiBookOpen />
              </div>
              <h3>Smart Learning</h3>
            </div>
            <p>
              Organize worksheets, manage courses and track your academic journey efficiently.
            </p>
          </div>

          {/* Productivity */}
          <div className="about-box">
            <div className="about-header">
              <div className="about-icon">
                <FiTarget />
              </div>
              <h3>Productivity Focused</h3>
            </div>
            <p>
              Designed to help students stay organized, focused and consistent.
            </p>
          </div>

          {/* Clean Experience */}
          <div className="about-box">
            <div className="about-header">
              <div className="about-icon">
                <FiAward />
              </div>
              <h3>Clean Experience</h3>
            </div>
            <p>
              Minimal UI with premium feel, optimized for both light and dark mode.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default About;