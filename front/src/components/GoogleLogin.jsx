import "../styles/TopBar.css";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../services/firebase";
import toast from "react-hot-toast";
import axios from "axios";
import "../styles/GoogleLogin.css"

const GoogleLogin = () => {

  const handleLogin = async () => {
    try {

      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userData = {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        uid: user.uid
      };

      // localStorage
      localStorage.setItem("googleUser", JSON.stringify(userData));

      // 🔥 Backend API call (MongoDB me save karne ke liye)
      await axios.post("http://localhost:5000/api/users/google-login", userData);

      toast.success("Logged in successfully");

      window.location.reload();

    } catch (err) {
      console.error(err);
      toast.error("Login failed");
    }
  };

  return (
    <button className="google-login-btn" onClick={handleLogin}>
      <img src="/google.svg" alt="google"/>
      Login with Google
    </button>
  );
};

export default GoogleLogin;