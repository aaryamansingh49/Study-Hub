import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Worksheets.css";

const Worksheets = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGroups();
  }, [courseId]);

  const fetchGroups = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/worksheets/groups/${courseId}`
      );
      setGroups(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="worksheet-container">
      <div className="worksheet-header">
        <div className="header-left">
          <button className="back-btn" onClick={() => navigate(-1)}>←</button>
          <div className="header-text">
            <h2>Course Worksheets</h2>
            <p>Select a worksheet to view all sets</p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : groups.length > 0 ? (
        <div className="worksheet-grid">
          {groups.map((number) => (
            <div key={number} className="worksheet-card">
              <div className="card-top">
                <h3>Worksheet {number}</h3>
              </div>

              <button
                className="download-btn"
                onClick={() =>
                  navigate(`/worksheets/${courseId}/${number}`)
                }
              >
                View All Worksheets
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-data">No worksheets available</div>
      )}
    </div>
  );
};

export default Worksheets;