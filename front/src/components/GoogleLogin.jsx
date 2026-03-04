import "../styles/TopBar.css";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../services/firebase";
import toast from "react-hot-toast";
import { googleLogin } from "../api/authApi";
import "../styles/GoogleLogin.css";

const GoogleLogin = () => {

  const handleLogin = async () => {
    try {

      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userData = {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL?.replace("s96-c", "s400-c"),
        uid: user.uid
      };

      localStorage.setItem("googleUser", JSON.stringify(userData));

      await googleLogin(userData);

      toast.success("Logged in successfully");

      window.location.reload();

    } catch (err) {
      console.error(err);
      toast.error("Login failed");
    }
  };

  return (
    <button className="google-login-btn" onClick={handleLogin}>
      <img
        src="/google.svg"
        alt="google"
        referrerPolicy="no-referrer"
      />
      Login with Google
    </button>
  );
};

export default GoogleLogin;