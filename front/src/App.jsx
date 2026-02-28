import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Notices from "./pages/Notices";
import Worksheets from "./pages/Worksheets";
import Projects from "./pages/Projects";
import "./styles/Layout.css";
// import { Notices } from "./pages/Notices";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Sidebar />
        <div className="main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/worksheets" element={<Worksheets />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/notices" element={<Notices />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;