import React, { useState } from "react";
import "../styles/CourseList.css";

function CourseList({ courses = [] }) {
  const [search, setSearch] = useState("");

  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <h2 className="section-title">Enrolled Courses</h2>

      <input
        type="text"
        className="course-search"
        placeholder="Search courses..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="course-container">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course, index) => (
            <div className="course-card" key={`${course.name}-${index}`}>
              <h3>{course.name}</h3>
              <p>{course.type}</p>
              <button>View</button>
            </div>
          ))
        ) : (
          <p style={{ marginTop: "20px" }}>No courses found</p>
        )}
      </div>
    </>
  );
}

export default CourseList;