import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const res = await API.post("/admin/login", { email, password });
  
      console.log("Login Response:", res.data); // 👈 DEBUG
  
      if (!res.data.token) {
        alert("Token not received from server");
        return;
      }
  
      localStorage.setItem("adminToken", res.data.token);
  
      alert("Login Successful");
      navigate("/admin-upload");
  
    } catch (error) {
      console.log("Login Error:", error.response?.data);
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Admin Login</h2>
      <input 
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input 
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default AdminLogin;