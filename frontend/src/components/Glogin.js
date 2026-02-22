import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Glogin() {
  const navigate = useNavigate(); // ✅ correct hook

  const handleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/auth/google-login",
        {
          token: credentialResponse.credential, // ✅ send ONLY token
        }
      );

      console.log("Backend response:", res.data);

      // ✅ navigate ONLY after backend success
      navigate("/");
    } catch (err) {
      console.error("Google login error:", err.response?.data || err.message);
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