import { useState, useEffect } from "react";
import API from "../services/api";
import AdminLayout from "../components/AdminLayout";
import "../styles/AdminUpload.css";

const AdminUpload = () => {

  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [worksheetNumber, setWorksheetNumber] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const res = await API.get("/courses");
    setCourses(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("adminToken");

    const formData = new FormData();
    formData.append("courseId", selectedCourse);
    formData.append("worksheetNumber", worksheetNumber);
    formData.append("title", title);
    formData.append("file", file);

    try {
      await API.post("/worksheets/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert("Worksheet Uploaded Successfully!");
      setTitle("");
      setFile(null);

    } catch (error) {
      alert("Upload Failed");
    }
  };

  return (
    <AdminLayout>
      <div className="admin-upload-page">
        <h2 className="upload-title">Upload Worksheet</h2>
  
        <form className="upload-form" onSubmit={handleSubmit}>
  
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            required
          >
            <option value="">Select Course</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.program} - Sem {course.semester} - {course.subject}
              </option>
            ))}
          </select>
  
          <input
            type="number"
            placeholder="Worksheet Number (1,2,3...)"
            value={worksheetNumber}
            onChange={(e) => setWorksheetNumber(e.target.value)}
            required
          />
  
          <input
            type="text"
            placeholder="Title (Set A / Practice Set 1)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
  
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
  
          <button type="submit" className="upload-btn">
            Upload Worksheet
          </button>
  
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminUpload;