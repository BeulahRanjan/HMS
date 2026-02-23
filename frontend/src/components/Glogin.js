import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Glogin() {
  const navigate = useNavigate(); // ✅ correct hook

const handleSuccess = async (credentialResponse) => {
  try {
    const googleToken = credentialResponse.credential;

    const res = await axios.post(
      "http://localhost:5000/auth/google-login",
      { token: googleToken }
    );

    // 🔥 STORE AUTH STATE
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", "patient");
    Cookies.set("hasSubmittedForm", "true");

    navigate("/");
  } catch (err) {
    console.error("Google login error:", err);
  }
};

  return (
    <div className=" absolute bottom-[5.5em] right-[16.5em] h-25 w-1/7 ">
      <GoogleLogin theme='outline' size='large' shape='pill'
        onSuccess={handleSuccess}
        onError={() => console.log("Google Login Failed")}
      />
    </div>
  );
}