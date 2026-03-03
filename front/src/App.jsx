import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";

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

/* 🔥 Animated Router Wrapper */
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>

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

        {/* Admin Routes */}
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
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}