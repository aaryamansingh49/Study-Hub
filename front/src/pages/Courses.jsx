import React from "react";
import "../styles/Courses.css";

function Courses() {
  const courses = [
    { name: "React Development", type: "Practical" },
    { name: "Data Structures", type: "Theory" },
    { name: "Machine Learning", type: "Advanced" }
  ];

  return (
    <div className="courses-page">
      <h1 className="courses-title">All Courses</h1>

      <div className="course-container">
        {courses.map((course, index) => (
          <div className="course-card" key={index}>
            <h3>{course.name}</h3>
            <p>{course.type}</p>
            <button>View</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;