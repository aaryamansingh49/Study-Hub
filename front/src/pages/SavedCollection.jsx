import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getSavedWorksheets,
  removeSavedWorksheet
} from "../api/savedApi";
import "../styles/SavedCollection.css";

const SavedCollection = () => {

  const [worksheets, setWorksheets] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("googleUser"));

  useEffect(() => {
    if (user) fetchSaved();
    else setLoading(false);
  }, []);

  const fetchSaved = async () => {
    try {

      const res = await getSavedWorksheets(user.email);

      const worksheetData = res.data
  .map((item) => item?.worksheet)
  .filter(Boolean);

      setWorksheets(worksheetData);

    } catch (err) {
      toast.error("Failed to load saved worksheets");
    }

    setLoading(false);
  };

  const removeSaved = async (id) => {

    try {

      await removeSavedWorksheet({
        email: user.email,
        worksheetId: id
      });

      const card = document.getElementById(`saved-${id}`);

      if (card) {

        card.classList.add("remove-animation");

        setTimeout(() => {
          setWorksheets((prev) =>
            prev.filter((ws) => ws._id !== id)
          );
        }, 300);

      }

      toast("Removed from saved");

    } catch (err) {
      toast.error("Failed to remove");
    }
  };

  if (!user) {
    return (
      <div className="saved-container">
        <p className="saved-empty">
          Please login to view saved worksheets.
        </p>
      </div>
    );
  }

  return (
    <div className="saved-container">
      <div className="saved-header">

        <div>
          <h2>Saved Worksheets</h2>
          <p className="saved-subtitle">
            Access your bookmarked worksheets anytime
          </p>
        </div>

        <span className="saved-count">
          {worksheets.length} Saved
        </span>

      </div>

      {loading ? (
        <p className="saved-loading">Loading...</p>
      ) : worksheets.length > 0 ? (

        <div className="saved-grid">

          {worksheets.map((ws) => (

            <div
              id={`saved-${ws._id}`}
              key={ws._id}
              className="saved-card saved-highlight"
            >

              <div className="saved-top">
                <h3>{ws.title}</h3>
                <span className="saved-badge">❤️ Saved</span>
              </div>

              <p className="saved-meta">
                <strong>Course:</strong>
                {ws.course?.program} - Sem {ws.course?.semester}
              </p>

              <p className="saved-meta">
                <strong>Subject:</strong> {ws.course?.subject}
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
                      `${import.meta.env.VITE_API_URL.replace("/api","")}/${ws.fileUrl}`,
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