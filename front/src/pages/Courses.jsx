import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import CourseList from "../components/CourseList";
import "../styles/Courses.css";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const program = searchParams.get("program") || "";
  const semester = searchParams.get("semester") || "";

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

  const handleProgramChange = (e) => {
    setSearchParams({
      program: e.target.value,
      semester,
    });
  };

  const handleSemesterChange = (e) => {
    setSearchParams({
      program,
      semester: e.target.value,
    });
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
          value={program}
          onChange={handleProgramChange}
        >
          <option value="">All Programs</option>
          <option value="MCA">MCA</option>
          <option value="BCA">BCA</option>
        </select>

        <select
          className="filter-select"
          value={semester}
          onChange={handleSemesterChange}
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