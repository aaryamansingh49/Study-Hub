import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Welcome.css";

function Welcome() {
  const navigate = useNavigate();
  return (
    <div className="welcome">

      <div className="welcome-content">
        {/* <span className="welcome-badge">Dashboard</span> */}

        <h1>
          Welcome!
        </h1>

        <p>
        Access worksheets and previous year papers quickly and efficiently.
        </p>

        <div className="welcome-actions">
  <button
    className="welcome-primary-btn"
    onClick={() => navigate("/courses")}
  >
    Explore Worksheets
  </button>
</div>
      </div>

      <div className="welcome-glow"></div>
      <div className="welcome-glow-2"></div>

    </div>
  );
}

export default Welcome;