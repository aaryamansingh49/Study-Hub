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
      const response = await axios.get(
        `http://localhost:5000/api/courses?program=${program}&semester=${semester}`
      );

      setCourses(response.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <div className="courses-page">
      <h1>All Subjects</h1>

      <select onChange={(e) => setProgram(e.target.value)}>
        <option value="">All Programs</option>
        <option value="MCA">MCA</option>
        <option value="BCA">BCA</option>
      </select>

      <select onChange={(e) => setSemester(e.target.value)}>
        <option value="">All Semesters</option>
        <option value="1">Semester 1</option>
        <option value="2">Semester 2</option>
        <option value="3">Semester 3</option>
        <option value="4">Semester 4</option>
      </select>

      {loading ? <p>Loading...</p> : <CourseList courses={courses} />}
    </div>
  );
}

export default Courses;