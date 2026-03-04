import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  getWorksheetGroupDetails,
  downloadWorksheet
} from "../api/worksheetApi";
import {
  getSavedWorksheets,
  saveWorksheet,
  removeSavedWorksheet
} from "../api/savedApi";
import "../styles/WorksheetDetails.css";

const WorksheetDetails = () => {

  const { courseId, number } = useParams();
  const navigate = useNavigate();

  const [worksheets, setWorksheets] = useState([]);
  const [savedIds, setSavedIds] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("googleUser"));

  useEffect(() => {
    fetchWorksheets();

    if (user) {
      fetchSaved();
    }
  }, []);

  // ======================
  // FETCH WORKSHEETS
  // ======================

  const fetchWorksheets = async () => {
    try {

      const res = await getWorksheetGroupDetails(courseId, number);

      setWorksheets(res.data);

    } catch (error) {

      console.log(error);
      toast.error("Failed to load worksheets");

    } finally {
      setLoading(false);
    }
  };

  // ======================
  // FETCH SAVED WORKSHEETS
  // ======================

  const fetchSaved = async () => {

    try {

      const res = await getSavedWorksheets(user.email);

      const ids = res.data.map((item) => item.worksheet._id);

      setSavedIds(ids);

    } catch (err) {
      console.log(err);
    }

  };

  // ======================
  // PREVIEW PDF
  // ======================

  const handlePreview = (worksheet) => {

    const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  
    const serverURL = baseURL.replace("/api", "");
  
    const fileUrl = `${serverURL}/${worksheet.fileUrl}`;
  
    window.open(fileUrl, "_blank");
  
  };

  // ======================
  // DOWNLOAD FILE
  // ======================

  const handleDownload = async (worksheet) => {

    try {
  
      toast.success("Download started");
  
      await downloadWorksheet(worksheet._id);
  
      const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  
      const serverURL = baseURL.replace("/api", "");
  
      const fileUrl = `${serverURL}/${worksheet.fileUrl}`;
  
      const response = await fetch(fileUrl);
  
      const blob = await response.blob();
  
      const url = window.URL.createObjectURL(blob);
  
      const link = document.createElement("a");
  
      link.href = url;
      link.download = worksheet.title + ".pdf";
  
      document.body.appendChild(link);
  
      link.click();
  
      document.body.removeChild(link);
  
      window.URL.revokeObjectURL(url);
  
      fetchWorksheets();
  
    } catch (error) {
  
      console.log(error);
      toast.error("Download failed");
  
    }
  
  };

  // ======================
  // SAVE / UNSAVE
  // ======================

  const toggleSave = async (id) => {

    if (!user) {
      toast.error("Please login to save worksheets");
      return;
    }

    try {

      if (savedIds.includes(id)) {

        await removeSavedWorksheet({
          email: user.email,
          worksheetId: id
        });

        setSavedIds(savedIds.filter((sid) => sid !== id));

        toast("Removed from saved");

      } else {

        await saveWorksheet({
          email: user.email,
          worksheetId: id
        });

        setSavedIds([...savedIds, id]);

        toast.success("Added to saved ❤️");

      }

    } catch (err) {

      console.log(err);
      toast.error("Action failed");

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
                    savedIds.includes(ws._id)
                      ? "saved heart-pop"
                      : ""
                  }`}
                  onClick={() => toggleSave(ws._id)}
                >
                  {savedIds.includes(ws._id)
                    ? "❤️ Saved"
                    : "🤍 Save"}
                </button>

              </div>

            </div>

          ))}

        </div>

      ) : (

        <p className="no-data">
          No sets found
        </p>

      )}

    </div>
  );
};

export default WorksheetDetails;