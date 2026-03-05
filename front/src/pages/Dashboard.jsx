import React, { useEffect, useState } from "react";
// import Topbar from "../components/Topbar";
import Welcome from "../components/Welcome";
import QuickAccess from "../components/QuickAccess";
import RecentlyAdded from "../components/RecentlyAdded";
// import "../styles/Layout.css";
import "../styles/Dashboard.css";

function Dashboard() {

  
  return (
    <div className="dashboard">

      <Welcome />

      <div className="dashboard-section">
        <QuickAccess />
      </div>

      <div className="dashboard-section">
        <RecentlyAdded />
      </div>

    </div>
  );
}

export default Dashboard;