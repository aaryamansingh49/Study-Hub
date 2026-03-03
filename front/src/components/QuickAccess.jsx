import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  HiOutlineBookOpen, 
  HiOutlineFolderOpen, 
  HiOutlineBell 
} from "react-icons/hi2";
import "../styles/QuickAccess.css";

function QuickAccess() {
  const navigate = useNavigate();

  const actions = [
    { 
      title: "Subjects", 
      subtitle: "View all subjects",
      path: "/courses", 
      icon: <HiOutlineBookOpen /> 
    },
    { 
      title: "Projects", 
      subtitle: "Manage your projects",
      path: "/projects", 
      icon: <HiOutlineFolderOpen /> 
    },
    { 
      title: "Question Paper", 
      subtitle: "Check previous year question papers",
      path: "/notices", 
      icon: <HiOutlineBell /> 
    }
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
          <div className={`quick-icon icon-${index}`}>
  {React.cloneElement(item.icon, { className: "icon-svg" })}
</div>

            <div className="quick-content">
              <h3>{item.title}</h3>
              <p>{item.subtitle}</p>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default QuickAccess;