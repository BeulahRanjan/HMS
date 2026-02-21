import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export default function Glogin() {
  const handleSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);

    console.log("Google user:", decoded);

    // Send Google user data to backend
    const res = await axios.post("http://localhost:5000/auth/google-login", {
      email: decoded.email,
      name: decoded.name,
      picture: decoded.picture,
    });

    console.log("Backend response:", res.data);
  };

  return (
    <div className=" absolute top-4 right-4">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => console.log("Google Login Failed")}
      />
    </div>
  );
}