import React from "react";
import Topbar from "../components/Topbar";
import Welcome from "../components/Welcome";
import StatsCards from "../components/StatsCards";
import QuickAccess from "../components/QuickAccess";
import RecentlyAdded from "../components/RecentlyAdded";
import "../styles/Layout.css";

function Dashboard() {

  const worksheetCount = 12;
  const projectCount = 6;
  const courseCount = 8;

  return (
    <>
      <Topbar />
      <Welcome />
      <StatsCards
        worksheetCount={worksheetCount}
        projectCount={projectCount}
        courseCount={courseCount}
      />

      <QuickAccess />
      <RecentlyAdded />
    </>
  );
}

export default Dashboard;