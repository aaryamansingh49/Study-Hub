import React from "react";
import { FiBell } from "react-icons/fi";
import "../styles/Notices.css";

const Notices = () => {
  return (
    <div className="notices-page">

      <div className="notices-card">
        <FiBell className="notices-icon" />

        <h1>Notices Coming Soon</h1>

        <p>
          Important announcements and updates will appear here.
          Stay tuned for the latest information.
        </p>

      </div>

    </div>
  );
};

export default Notices;