import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Layout from "./Layout";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Notices from "./pages/Notices";
import Worksheets from "./pages/Worksheets";
import Projects from "./pages/Projects";
import AdminUpload from "./pages/AdminUpload";
import AdminLogin from "./pages/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import WorksheetDetails from "./pages/WorksheetDetails";
import SavedCollection from "./pages/SavedCollection";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="courses" element={<Courses />} />
          <Route path="worksheets/:courseId" element={<Worksheets />} />
          <Route path="worksheets/:courseId/:number" element={<WorksheetDetails />} />
          <Route path="projects" element={<Projects />} />
          <Route path="notices" element={<Notices />} />
          <Route path="saved" element={<SavedCollection />} />
          
          
        </Route>

        {/* Admin */}
        <Route path="/admin-login" element={<AdminLogin />} />

        <Route
          path="/admin-upload"
          element={
            <ProtectedRoute>
              <AdminUpload />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;