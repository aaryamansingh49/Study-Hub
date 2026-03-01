import React from "react";
import "../styles/Notices.css";

export const Notices = () => {
  return (
    <div className="notices-coming">
      <div className="notices-box">
        <h1 className="notices-title">📢 Coming Soon</h1>
        <p className="notices-subtitle">
          Important Notices will be available here shortly.
        </p>
      </div>
    </div>
  );
};

export default Notices;