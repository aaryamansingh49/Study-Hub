import React, { useEffect, useState } from "react";
import axios from "axios";
import CourseList from "../components/CourseList";
import "../styles/Courses.css";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [program, setProgram] = useState("");
  const [semester, setSemester] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, [program, semester]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/api/courses?program=${program}&semester=${semester}`
      );
      setCourses(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="courses-page">

      <div className="courses-header">
        <h1>All Subjects</h1>
        <p>Browse subjects by program and semester</p>
      </div>

      <div className="filters">
        <select
          className="filter-select"
          onChange={(e) => setProgram(e.target.value)}
        >
          <option value="">All Programs</option>
          <option value="MCA">MCA</option>
          <option value="BCA">BCA</option>
        </select>

        <select
          className="filter-select"
          onChange={(e) => setSemester(e.target.value)}
        >
          <option value="">All Semesters</option>
          <option value="1">Semester 1</option>
          <option value="2">Semester 2</option>
          <option value="3">Semester 3</option>
          <option value="4">Semester 4</option>
        </select>
      </div>

      {loading ? (
        <div className="loading-state">Loading courses...</div>
      ) : (
        <CourseList courses={courses} />
      )}

    </div>
  );
}

export default Courses;