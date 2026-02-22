import React, { useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Docpage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const isDoctorsPage = location.pathname.includes("doctors");


  const fetchDoctors = async () => {
    try {
      const token = Cookies.get("authToken");

      console.log("Auth token:", token);

      const res = axios.get("/getAllDoctors", {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

      console.log("API response:", res.data);

      // handle both possible response shapes
      const doctorsData = res.data.doctors || res.data;

      setDoctors(Array.isArray(doctorsData) ? doctorsData : []);
    } catch (err) {
      console.error("Error fetching doctors:", err);
      setError("Failed to load doctors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#e3f0f7] to-[#eff6fa] py-10 px-6">
      <p className="text-3xl font-bold text-center mb-8">Our Doctors</p>

      {/* Loading */}
      {loading && (
        <p className="text-center text-gray-500">Loading doctors...</p>
      )}

      {/* Error */}
      {error && (
        <p className="text-center text-red-500">{error}</p>
      )}

      {/* Empty */}
      {!loading && doctors.length === 0 && !error && (
        <p className="text-center text-gray-500">No doctors found</p>
      )}

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
        {doctors.map((doc) => (
          <div
            key={doc._id}
            className="w-[270px] bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 flex flex-col overflow-hidden"
          >
            {/* Image */}
            <div className="h-[190px] w-full overflow-hidden">
              <img
                src={
                  doc?.profileImage
                    ? doc.profileImage.startsWith("http")
                      ? doc.profileImage
                      : `http://localhost:5000${doc.profileImage}`
                    : "/default-doctor.png"
                }
                alt={doc.name}
                className="w-full h-full object-cover hover:scale-105 transition duration-300"
              />
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow text-center">
              <h2 className="text-xl font-bold text-gray-800">
                {doc.name}
              </h2>

              <p className="text-blue-600 font-semibold">
                {doc.department?.name || "General"}
              </p>

              <p className="text-sm text-gray-600 mt-1">
                {doc.specialization || "—"}
              </p>

              <div className="mt-2 text-sm text-gray-700">
                <strong>Experience:</strong>{" "}
                {doc.experience || "N/A"}
              </div>

              <p className="text-sm text-gray-600 mt-3 line-clamp-3">
                {doc.description || "No description available"}
              </p>

              <button
  onClick={() => {
    if (isDoctorsPage) {
      navigate(`/doctors/${doc._id}`);   // 👈 doctor profile page
    } else {
      navigate(`/addFeedback/${doc._id}`); // 👈 feedback page
    }
  }}
  className="mt-auto bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
>
  {isDoctorsPage ? "View Profile" : "Give Feedback"}
</button>


            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
