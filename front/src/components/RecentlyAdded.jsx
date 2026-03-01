import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/RecentlyAdded.css";

function RecentlyAdded() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecent();
  }, []);

  const fetchRecent = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/worksheets/recent-courses"
      );
      setCourses(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="recent-section">
      <h2 className="section-title">Recently Added</h2>

      <div className="recent-grid">
      {courses.map((course) => (
  <div key={course._id} className="recent-card">
    
    <h3>{course.subject}</h3>

    <p><strong>Program:</strong> {course.program}</p>
    <p><strong>Semester:</strong> {course.semester}</p>

    <button
      onClick={() => navigate(`/worksheets/${course._id}`)}
    >
      View Worksheets
    </button>
  </div>
))}
      </div>
    </div>
  );
}

export default RecentlyAdded;