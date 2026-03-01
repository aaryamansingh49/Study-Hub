import "../styles/CourseList.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CourseList({ courses }) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filteredCourses = (courses || []).filter((course) =>
    course?.subject?.toLowerCase().includes(search.toLowerCase())
  );

  const handleView = (course) => {
    if (!course?._id) return;
    navigate(`/worksheets/${course._id}`);
  };

  return (
    <div className="subject-section">
      <input
        type="text"
        className="subject-search"
        placeholder="Search subject..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="course-container">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course, index) => (
            <div className="course-card" key={course._id || index}>
              <div className="card-top">
                <h3>{course.subject}</h3>
              </div>

              <div className="card-info">
                <p><strong>Program:</strong> {course.program}</p>
                <p><strong>Semester:</strong> {course.semester}</p>
              </div>

              <button
                className="view-btn"
                onClick={() => handleView(course)}
              >
                View Worksheets
              </button>
            </div>
          ))
        ) : (
          <p className="no-data">No subjects found</p>
        )}
      </div>
    </div>
  );
}

export default CourseList;