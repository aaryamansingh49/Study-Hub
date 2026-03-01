import React from "react";
import "../styles/RecentlyAdded.css";

function RecentlyAdded() {

  // Dummy data (later backend se aayega)
  const worksheets = [
    { title: "Data Structures - Unit 1", program: "MCA", semester: "1" },
    { title: "DBMS Important Questions", program: "MCA", semester: "1" },
    { title: "Operating Systems PYQ", program: "BCA", semester: "2" }
  ];

  return (
    <div className="recent-section">
      <h2 className="section-title">Recently Added Worksheets</h2>

      <div className="recent-grid">
        {worksheets.map((item, index) => (
          <div key={index} className="recent-card">
            <h3>{item.title}</h3>
            <p>Program: {item.program}</p>
            <p>Semester: {item.semester}</p>
            <button>View</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentlyAdded;