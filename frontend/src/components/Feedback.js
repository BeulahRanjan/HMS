import { useState } from "react";

export default function FeedbackBox() {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  
  const handlesubmit = () => {    // Handle feedback submission logic here
    console.log("Feedback:", feedback);
    console.log("Rating:", rating);}

  return (
    <div className="bg-gradient-to-b from-[#e3f0f7] to-[#eff6fa] h-screen justify-center items-center flex flex-col">
    <p className="mb-10 text-3xl font-bold text-black">Feedback Form</p>

    <div className="bg-gradient-to-b from-[#e3f0f7] to-[#eff6fa] border border-gray-300 p-6 rounded-lg shadow-md w-1/2 mx-auto max-h-3xl">
  <span>FeedBack:</span>

  <textarea
    className="w-full mb-2 bg-gradient-to-b from-[#e3f0f7] to-[#eff6fa] h-40 p-2 border border-gray-500 rounded mt-2 resize-none"
    placeholder="Enter your feedback here..."
  />

  <span className="block mt-4"> Rating:</span>
<textarea
  className="w-2/6 mb-10 bg-gradient-to-b from-[#e3f0f7] to-[#eff6fa] h-11 p-2 border border-gray-500 rounded mt-2 resize-none"
  placeholder="Rate your experience (1-5)..."
/>

  <button onClick={handlesubmit}
  className="ml-10  bg-blue-300 hover:bg-blue-500 text-black py-1 px-4 rounded">
    Submit Feedback
  </button>
    </div>
   </div>

  );
}
