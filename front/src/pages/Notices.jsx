import React from "react";
import { FiBell } from "react-icons/fi";
import "../styles/Notices.css";

const Notices = () => {
  return (
    <div className="notices-page">

      <div className="notices-card">
        <FiBell className="notices-icon" />

        <h1> Coming Soon</h1>

        <p>
          Stay tuned.
        </p>

      </div>

    </div>
  );
};

export default Notices;