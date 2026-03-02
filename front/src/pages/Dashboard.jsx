import React, { useEffect, useState } from "react";
import axios from "axios";
// import Topbar from "../components/Topbar";
import Welcome from "../components/Welcome";
// import StatsCards from "../components/StatsCards";
import QuickAccess from "../components/QuickAccess";
import RecentlyAdded from "../components/RecentlyAdded";
// import "../styles/Layout.css";
import "../styles/Dashboard.css";

function Dashboard() {

  // const [stats, setStats] = useState({
  //   worksheetCount: 0,
  //   projectCount: 0,
  //   courseCount: 0
  // });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/stats");
      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

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