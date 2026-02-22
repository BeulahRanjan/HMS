import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Glogin() {
  const navigate = useNavigate(); // ✅ correct hook

const handleSuccess = async (credentialResponse) => {
  try {
    // 🔵 Google token (ONLY for backend login)
    const googleToken = credentialResponse.credential;
    console.log("Received Google token:", googleToken);

    const res = await axios.post(
      "http://localhost:5000/auth/google-login",
      { token: googleToken }
    );
    navigate("/"); // ✅ navigate after successful login 
    // 🟢 YOUR APP TOKEN
    console.log("Backend response:", res.data);
    console.log("App token:", res.data.token);

    // ✅ STORE APP TOKEN (THIS WAS THE BUG)
    localStorage.setItem("token", res.data.token);

    console.log(
      "Stored token in localStorage:",
      localStorage.getItem("token")
    );
  } catch (err) {
    console.error("Google login error:", err);
  }
};

  return (
    <div className="absolute top-4 right-4">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => console.log("Google Login Failed")}
      />
    </div>
  );
}