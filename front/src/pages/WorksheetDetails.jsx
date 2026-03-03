import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { toggleSaved, isSaved } from "../utils/savedManager";
import "../styles/WorksheetDetails.css";

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
    toast.success("Download started");

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
    const alreadySaved = isSaved("worksheets", id);

    toggleSaved("worksheets", id);
    setWorksheets([...worksheets]);

    if (alreadySaved) {
      toast("Removed from saved");
    } else {
      toast.success("Added to saved ❤️");
    }
  };

  return (
    <div className="wsd-container">

      <div className="wsd-header">
        <button
          className="wsd-back-btn"
          onClick={() => navigate(-1)}
        >
          ←
        </button>

        <div className="worksheet-title-group">
          <h2>Worksheet {number}</h2>
          <p className="worksheet-tagline">
            Different variants. Same concept. Your choice.
          </p>
        </div>
      </div>

      {loading ? (
        <p className="loading">Loading...</p>
      ) : worksheets.length > 0 ? (
        <div className="wsd-grid">
          {worksheets.map((ws) => (
            <div key={ws._id} className="wsd-card">

              <div className="wsd-card-top">
                <h3>{ws.title}</h3>
                <span className="download-count">
                  {ws.downloads} Downloads
                </span>
              </div>

              <div className="wsd-action-row">

                <button
                  className="wsd-btn wsd-preview"
                  onClick={() => handlePreview(ws)}
                >
                  Preview
                </button>

                <button
                  className="wsd-btn wsd-download"
                  onClick={() => handleDownload(ws)}
                >
                  Download
                </button>

                <button
                  className={`wsd-btn wsd-save ${
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