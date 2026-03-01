import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toggleSaved, isSaved } from "../utils/savedManager";
import "../styles/Worksheets.css";

const WorksheetDetails = () => {
  const { courseId, number } = useParams();
  const navigate = useNavigate();

  const [worksheets, setWorksheets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWorksheets();
  }, []);

  const fetchWorksheets = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/worksheets/group/${courseId}/${number}`
      );
      setWorksheets(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (worksheet) => {
    await axios.put(
      `http://localhost:5000/api/worksheets/${worksheet._id}/download`
    );

    window.open(
      `http://localhost:5000/${worksheet.fileUrl}`,
      "_blank"
    );

    fetchWorksheets();
  };

  const handlePreview = (worksheet) => {
    window.open(
      `http://localhost:5000/${worksheet.fileUrl}`,
      "_blank"
    );
  };

  const handleSave = (id) => {
    toggleSaved("worksheets", id);
    setWorksheets([...worksheets]); // refresh without reload
  };

  return (
    <div className="worksheet-container">

      <div className="worksheet-header">
        <button className="back-btn" onClick={() => navigate(-1)}>←</button>
        <h2>Worksheet {number}</h2>
      </div>

      {loading ? (
        <p className="loading">Loading...</p>
      ) : worksheets.length > 0 ? (
        <div className="worksheet-grid">
          {worksheets.map((ws) => (
            <div key={ws._id} className="worksheet-card">

              <div className="card-top">
                <h3>{ws.title}</h3>
                <span className="download-count">
                  {ws.downloads} Downloads
                </span>
              </div>

              <div className="action-row">

                <button
                  className="action-btn preview-btn"
                  onClick={() => handlePreview(ws)}
                >
                  Preview
                </button>

                <button
                  className="action-btn download-btn"
                  onClick={() => handleDownload(ws)}
                >
                  Download
                </button>

                <button
                  className={`action-btn save-btn ${
                    isSaved("worksheets", ws._id) ? "saved" : ""
                  }`}
                  onClick={() => handleSave(ws._id)}
                >
                  {isSaved("worksheets", ws._id)
                    ? "❤️ Saved"
                    : "🤍 Save"}
                </button>

              </div>

            </div>
          ))}
        </div>
      ) : (
        <p className="no-data">No sets found</p>
      )}
    </div>
  );
};

export default WorksheetDetails;