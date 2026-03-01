import React, { useEffect, useState } from "react";
import axios from "axios";
// import Topbar from "../components/Topbar";
import Welcome from "../components/Welcome";
// import StatsCards from "../components/StatsCards";
import QuickAccess from "../components/QuickAccess";
import RecentlyAdded from "../components/RecentlyAdded";
import "../styles/Layout.css";

function Dashboard() {

  const [stats, setStats] = useState({
    worksheetCount: 0,
    projectCount: 0,
    courseCount: 0
  });

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
    <>
      {/* <Topbar /> */}
      <Welcome />

      {/* <StatsCards
        worksheetCount={stats.worksheetCount}
        projectCount={stats.projectCount}
        programCount={stats.programCount}
      /> */}

      <QuickAccess />
      <RecentlyAdded />
    </>
  );
}

export default Dashboard;