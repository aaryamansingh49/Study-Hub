import "../styles/Layout.css";
import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Footer from "./Footer";

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="layout-wrapper">

      {/* Main Dashboard Layout */}
      <div className="layout">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="main-area">
          <Topbar setSidebarOpen={setSidebarOpen} />

          <div className="content-wrapper">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.45 }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Footer Outside Dashboard Layout */}
      <Footer />

      {/* Global Toaster */}
      <Toaster position="top-center" />

    </div>
  );
}

export default Layout;