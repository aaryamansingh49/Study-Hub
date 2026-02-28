import React from "react";
import Topbar from "../components/Topbar";
import Welcome from "../components/Welcome";
import StatsCards from "../components/StatsCards";
import CourseList from "../components/CourseList";
import "../styles/Layout.css";

function Dashboard() {
  const courses = [
    { name: "Object Oriented Programming", type: "worksheet" },
    { name: "Database Management System", type: "worksheet" },
    { name: "Java Mini Project", type: "project" },
    { name: "Web Development Project", type: "project" }
  ];

  const worksheetCount = courses.filter(c => c.type === "worksheet").length;
  const projectCount = courses.filter(c => c.type === "project").length;

  return (
    <>
      <Topbar />
      <Welcome />
      <StatsCards
        worksheetCount={worksheetCount}
        projectCount={projectCount}
      />
      <CourseList courses={courses} />
    </>
  );
}

export default Dashboard;