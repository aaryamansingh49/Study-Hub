import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {

  const token = localStorage.getItem("adminToken");

  // agar token nahi hai
  if (!token) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
};

export default AdminRoute;