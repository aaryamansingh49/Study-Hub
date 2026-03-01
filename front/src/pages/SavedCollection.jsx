import React, { useEffect, useState } from "react";
import axios from "axios";
import { getSaved, toggleSaved } from "../utils/savedManager";
import "../styles/SavedCollection.css";

const SavedCollection = () => {
  const [worksheets, setWorksheets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSaved();
  }, []);

  const fetchSaved = async () => {
    const saved = getSaved();

    if (saved.worksheets.length > 0) {
      const res = await axios.get(
        `http://localhost:5000/api/worksheets?ids=${saved.worksheets.join(",")}`
      );
      setWorksheets(res.data);
    }

    setLoading(false);
  };

  const removeSaved = (id) => {
    toggleSaved("worksheets", id);
    setWorksheets(worksheets.filter(ws => ws._id !== id));
  };

  return (
    <div className="saved-container">

      <div className="saved-header">
        <h2>Saved Worksheets</h2>
        <span className="saved-count">
          {worksheets.length} Saved
        </span>
      </div>

      {loading ? (
        <p className="saved-loading">Loading...</p>
      ) : worksheets.length > 0 ? (
        <div className="saved-grid">
          {worksheets.map(ws => (
            <div key={ws._id} className="saved-card">

            <h3>{ws.title}</h3>
          
            <p className="saved-meta">
              <strong>Course:</strong> {ws.course?.program} - Sem {ws.course?.semester} - {ws.course?.subject}
            </p>
          
            <p className="saved-meta">
              <strong>Worksheet:</strong> {ws.worksheetNumber}
            </p>
          
            <p className="saved-downloads">
              {ws.downloads} Downloads
            </p>
          
            <div className="saved-actions">
              <button
                onClick={() =>
                  window.open(
                    `http://localhost:5000/${ws.fileUrl}`,
                    "_blank"
                  )
                }
                className="saved-preview"
              >
                Preview
              </button>
          
              <button
                onClick={() => removeSaved(ws._id)}
                className="saved-remove"
              >
                Remove
              </button>
            </div>
          
          </div>
          ))}
        </div>
      ) : (
        <p className="saved-empty">
          No saved worksheets yet.
        </p>
      )}
    </div>
  );
};

export default SavedCollection;