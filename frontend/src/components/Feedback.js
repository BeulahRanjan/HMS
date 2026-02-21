import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";

export default function Feedback() {
  const { doctorId } = useParams(); // ✅ from URL
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState("");

  const handleSubmit = async () => {
    try {
      const token = Cookies.get("authToken");

      if (!token) {
        alert("Please login first");
        return;
      }

      const res = await axios.post(
        `http://localhost:5000/addFeedback/${doctorId}`,
        {
          rating: Number(rating), // ✅ convert to number
          feedback,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data);
      alert("Feedback submitted successfully!");

      setFeedback("");
      setRating("");
    } catch (error) {
      console.error(
        "Error submitting feedback:",
        error.response?.data || error.message
      );
      alert(error.response?.data?.message || "Failed to submit feedback");
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#e3f0f7] to-[#eff6fa] h-screen flex flex-col items-center justify-center">
      <p className="mb-10 text-3xl font-bold">Feedback Form</p>

      <div className="border border-gray-300 p-6 rounded-lg shadow-md w-1/2">
        <span>Feedback:</span>

        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="w-full h-40 p-2 border border-gray-500 rounded mt-2 resize-none"
          placeholder="Enter your feedback here..."
        />

        <span className="block mt-4">Rating:</span>

        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="w-2/5 h-12 p-2 border border-gray-500 rounded mt-2"
          placeholder="1–5"
        />

        <button
          onClick={handleSubmit}
          className="mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Submit Feedback
        </button>
      </div>
    </div>
  );
}