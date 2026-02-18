import { useState } from "react";

export default function FeedbackBox() {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);

  return (
    <div className="bg-gradient-to-b from-[#e3f0f7] to-[#eff6fa] h-screen justify-center items-center flex flex-col">
    <p className="mb-10 text-3xl font-bold text-black">Feedback Form</p>

    <div className="bg-gradient-to-b from-[#e3f0f7] to-[#eff6fa] border border-gray-300 p-6 rounded-lg shadow-md w-1/2 mx-auto max-h-3xl">
  <span>FeedBack:</span>

  <textarea
    className="w-full mb-2 bg-gradient-to-b from-[#e3f0f7] to-[#eff6fa] h-40 p-2 border border-gray-500 rounded mt-2 resize-none"
    placeholder="Enter your feedback here..."
  />

  <span className=""> Rating:</span>

  <div className="flex ">
    {[1, 2, 3, 4, 5].map((star) => (
      <span
        key={star}
        className="text-blue-300 text-xl cursor-pointer"
      >
        ★
      </span>
    ))}
  </div>
    </div>
   </div>

  );
}
