import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import "./styles/Layout.css";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Sidebar />
        <div className="main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/courses" element={<Courses />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;