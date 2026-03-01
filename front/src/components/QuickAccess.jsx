import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/QuickAccess.css";

function QuickAccess() {
  const navigate = useNavigate();

  const actions = [
    { title: "Browse Subjects", path: "/courses", icon: "📚" },
    { title: "View Worksheets", path: "/worksheets", icon: "📄" },
    { title: "View Projects", path: "/projects", icon: "🚀" },
    { title: "Check Notices", path: "/notices", icon: "📢" }
  ];

  return (
    <div className="quick-section">
      <h2 className="section-title">Quick Access</h2>

      <div className="quick-grid">
        {actions.map((item, index) => (
          <div
            key={index}
            className="quick-card"
            onClick={() => navigate(item.path)}
          >
            <div className="quick-icon">{item.icon}</div>
            <h3>{item.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuickAccess;