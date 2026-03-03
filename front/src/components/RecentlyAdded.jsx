import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/RecentlyAdded.css";

function RecentlyAdded() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recent-section">
      <h2 className="section-title">Recently Added</h2>

      {loading ? (
        <p className="loading-text">Loading recent courses...</p>
      ) : courses.length === 0 ? (
        <p className="empty-text">No recent courses found.</p>
      ) : (
        <div className="recent-grid">
          {courses.map((course) => (
            <div key={course._id} className="recent-card">

              <div className="recent-header">
                <h3>{course.subject}</h3>
              </div>

              <div className="recent-info">
                <p><span>Program:</span> {course.program}</p>
                <p><span>Semester:</span> {course.semester}</p>
              </div>

              <button
                className="recent-btn"
                onClick={() => navigate(`/worksheets/${course._id}`)}
              >
                View Worksheets →
              </button>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecentlyAdded;