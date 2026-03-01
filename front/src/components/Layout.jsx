import "../styles/Layout.css";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);


  return (
    <div className="layout">
      
      <Sidebar 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

<div className="main-area">
  <Topbar setSidebarOpen={setSidebarOpen} />

  <div className="content-wrapper">
    <Outlet />
  </div>

</div>
    </div>
  );
}

export default Layout;