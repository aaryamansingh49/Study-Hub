import React, { useState } from "react";
import "../styles/AdminLayout.css";
//  
const AdminLayout = ({ children }) => {
  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <h2>Worksheet Admin</h2>
        <p>Upload Panel</p>
      </div>
      <div className="admin-content">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;