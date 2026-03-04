import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import "../styles/CourseList.css";

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

      {/* Search Bar */}
      <div className="subject-search-wrapper">
        <FiSearch className="subject-search-icon" />
        <input
          type="text"
          placeholder="Search subject..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Courses Grid */}
      <div className="course-container">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course, index) => (
            <div className="course-card" key={course._id || index}>

              <div className="card-top">
                <h3>{course.subject}</h3>
              </div>

              <div className="card-info">
                <p><span>Program:</span> {course.program}</p>
                <p><span>Semester:</span> {course.semester}</p>
              </div>

              <button
                className="view-btn"
                onClick={() => handleView(course)}
              >
                View Worksheets →
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