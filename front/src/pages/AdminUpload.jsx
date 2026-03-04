import { useState, useEffect } from "react";
import API from "../services/api";
import AdminLayout from "../components/AdminLayout";
import "../styles/AdminUpload.css";

const AdminUpload = () => {

  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [worksheetNumber, setWorksheetNumber] = useState("");
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await API.get("/courses");
      setCourses(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCourse || !worksheetNumber || files.length === 0) {
      alert("All fields are required");
      return;
    }

    const token = localStorage.getItem("adminToken");

    const formData = new FormData();
    formData.append("courseId", selectedCourse);
    formData.append("worksheetNumber", worksheetNumber);

    // 🔥 Multiple Files Append
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      await API.post("/worksheets/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      alert("Worksheet Folder Uploaded Successfully!");

      // Reset form
      setWorksheetNumber("");
      setFiles([]);
      document.getElementById("fileInput").value = "";

    } catch (error) {
      alert("Upload Failed");
      console.log(error);
    }
  };

  return (
    <AdminLayout>
      <div className="admin-upload-page">
        <h2 className="upload-title">Upload Worksheet Folder</h2>

        <form className="upload-form" onSubmit={handleSubmit}>

          {/* Course Select */}
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

          {/* Worksheet Number */}
          <input
            type="number"
            placeholder="Worksheet Number (1,2,3...)"
            value={worksheetNumber}
            onChange={(e) => setWorksheetNumber(e.target.value)}
            required
          />

          {/* 🔥 Folder / Multiple Upload */}
          <input
            id="fileInput"
            type="file"
            multiple
            accept="application/pdf"
            onChange={handleFileChange}
            required
          />

          <button type="submit" className="upload-btn">
            Upload Folder
          </button>

        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminUpload;