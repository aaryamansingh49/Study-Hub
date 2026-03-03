import "../styles/Layout.css";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  
  return (
    <div className="layout">
      {/* Global Toaster */}
      <Toaster
        position="top-center"
        containerStyle={{ top: 80 }}
        toastOptions={{
          duration: 2500,
          style: {
            borderRadius: "14px",
            fontSize: "14px",
            padding: "14px 18px",
            background: "var(--bg-card)",
            color: "var(--text-main)",
            border: "1px solid var(--border-color)",
            boxShadow: "var(--shadow-soft)",
          },
          className: "smooth-toast",
        }}
      />

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
    transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
    style={{ height: "100%" }}
  >
    <Outlet />
  </motion.div>
</AnimatePresence>
            
        </div>
      </div>
    </div>
  );
}

export default Layout;
