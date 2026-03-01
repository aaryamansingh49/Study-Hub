import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import "./styles/Layout.css";

function Layout() {
  return (
    <div className="container">
      <Sidebar />
      <div className="main">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;