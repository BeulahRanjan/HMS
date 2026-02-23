import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Glogin() {
  const navigate = useNavigate(); // ✅ correct hook

const handleSuccess = async (credentialResponse) => {
  try {
    // 🔵 Google token (ONLY for backend verification)
    const googleToken = credentialResponse.credential;
    console.log("Received Google token:", googleToken);

    const res = await axios.post(
      "http://localhost:5000/auth/google-login",
      {
        token: googleToken,
        role: "patient"   // ✅ SEND ROLE
      }
    );

    console.log("Backend response:", res.data);

    // 🟢 YOUR APP TOKEN
    localStorage.setItem("token", res.data.token);

    // 🟢 STORE ROLE FOR NAVBAR / AUTH
    localStorage.setItem("role", "patient");

    navigate("/", { replace: true }); // ✅ prevent back navigation
  } catch (err) {
    console.error("Google login error:", err);
  }
};

  return (
    <div className=" absolute bottom-[5.5em] right-[16.5em] h-25 w-1/7 ">
      <GoogleLogin theme='otline' size='large' shape='pill'
        onSuccess={handleSuccess}
        onError={() => console.log("Google Login Failed")}
      />
    </div>
  );
}