import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineBookOpen } from "react-icons/hi2";
import { getRecentCourses } from "../api/courseApi";
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

      const res = await getRecentCourses();
      setCourses(Array.isArray(res.data) ? res.data : []);
      setCourses(res.data);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recent-section">

      <div className="recent-header-main">
        <h2>Recently Added</h2>
      </div>

      {loading ? (
        <p className="loading-text">Loading recent courses...</p>
      ) : courses.length === 0 ? (
        <p className="empty-text">No recent courses found.</p>
      ) : (
        <div className="recent-grid">

          {courses.map((course, index) => (

            <div key={course._id} className="recent-card">

              <div className="recent-card-top">

                <div className={`recent-icon icon-${index % 3}`}>
                  <HiOutlineBookOpen />
                </div>

                <div className="recent-content">
                  <h3>{course.subject}</h3>

                  <p className="recent-sub">
                    {course.program} • Semester {course.semester}
                  </p>
                </div>

              </div>

              <button
                className="recent-small-btn"
                onClick={() => navigate(`/worksheets/${course._id}`)}
              >
                View Worksheets
              </button>

            </div>

          ))}

        </div>
      )}
    </div>
  );
}

export default RecentlyAdded;