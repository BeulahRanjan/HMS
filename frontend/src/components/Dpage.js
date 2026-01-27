import  { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import Cookies from "js-cookie";

function Dpage() {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [doctorProfile, setDoctorProfile] = useState(null);
  const [currentSection, setCurrentSection] = useState("dashboard");
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [filters, setFilters] = useState({
    status: "",
    timeSlot: "",
  });

 

  const loadDoctorProfile = async () => {
    try {
      const token = Cookies.get("authToken");

      const res = await axios.get("http://localhost:5000/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDoctorProfile(res.data.doctor);
      console.log("Doctor Profile:", res.data.doctor);
      
      
      
    } catch (error) {
      console.error("Error loading doctor profile:", error);
    }
  };

  useEffect(() => {
    loadDoctorProfile();
  }, []);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedImage(file);
    setPreview(URL.createObjectURL(file));
  };

const uploadProfileImage = async () => {
  
  if (!selectedImage) return;

  try {
    setUploading(true);

    const formData = new FormData();
    formData.append("profileImage", selectedImage);

    const res = await axios.put(
      "http://localhost:5000/upload-profile-image",
      formData,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
      }
    );

    const { imagePath } = res.data;

    setDoctorProfile((prev) => ({
      ...prev,
      profileImage: imagePath,
    }));

    setSelectedImage(null);
    setPreview(null);
  } catch (error) {
    console.error("Image upload failed:", error);
  } finally {
    setUploading(false);
  }
};


  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);


  const goToEditDoctor = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/getDoctor/${id}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        }
      );

      navigate("/addDoctor", {
        state: { doctorProfile: res.data.doctor },
      });
    } catch (error) {
      console.error("Error opening edit page:", error);
    }
  };


  const isTimeInSlot = (time, slot) => {
    if (!time || !slot) return true;

    const [timePart, modifier] = time.split(" ");
    let hour = parseInt(timePart.split(":")[0], 10);

    if (modifier === "PM" && hour !== 12) hour += 12;
    if (modifier === "AM" && hour === 12) hour = 0;

    if (slot === "morning") return hour >= 8 && hour < 12;
    if (slot === "afternoon") return hour >= 12 && hour < 16;
    if (slot === "evening") return hour >= 16 && hour < 20;
    if (slot === "night") return hour >= 20;

    return true;
  };

  const filteredAppointments = appointments.filter(
    (appt) =>
      (!filters.status || appt.status === filters.status) &&
      (!filters.timeSlot || isTimeInSlot(appt.time, filters.timeSlot))
  );


  const hasProfileImage =
  doctorProfile?.profileImage &&
  doctorProfile.profileImage !== "null" &&
  doctorProfile.profileImage !== "undefined";

  console.log("Has Profile Image:", hasProfileImage, doctorProfile?.profileImage);






  return (
    <div className='flex overflow-x-hidden'>
    <Sidebar onNavigate={setCurrentSection} role={"doctor"}/>
    {currentSection === 'appointments' &&
      <div className='flex flex-col'>
        <div className="bg-[#eff6fa] p-4 flex items-center justify-between w-[1450px] h-[70px] ml-[70px]">
          <div className='flex flex-row gap-3'>
          <img src={`http://localhost:5000${doctorProfile?.profileImage}?t=${Date.now()}`} alt='' className='w-12 h-12 rounded-full border-2 border-black'/>
          <div className='flex flex-col'>
            <p>{doctorProfile?.name}</p>
            <p>{doctorProfile?.specialist}</p>
          </div>
          <div className='flex flex-col ml-[1100px]'>
          <p>Date: {new Date().toLocaleDateString()}</p>
          <p>Time: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
          </div>
          </div>
        </div>
        <img src='https://i.pinimg.com/736x/1d/8f/8f/1d8f8faed281703de0d2f87c88def6a3.jpg' alt='' className='w-screen h-screen object-cover'/>
        <div className='absolute top-0 left-0 w-[1446px] h-screen bg-gradient-to-l  
        from-[#e3f0f7]/60 to-[#e3f0f7]/60 mt-[70px] ml-[75px] '>
        <div className='ml-[170px] mt-[20px]'>
        
        <select
        value={filters.timeSlot}
        onChange={(e) => setFilters({ ...filters, timeSlot: e.target.value })}
        className="border border-blue-300 px-3 py-2 rounded-md ml-10 bg-transparent">
        <option value="">All Time Slots</option>
        <option value="morning">Morning (8 AM – 12 PM)</option>
        <option value="afternoon">Afternoon (12 PM – 4 PM)</option>
        <option value="evening">Evening (4 PM – 8 PM)</option>
        <option value="night">Night (8 PM - 12 AM)</option>
        </select>

        <select
        value={filters.status}
        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        className="border border-blue-300 px-3 py-2 rounded-md ml-4 bg-transparent">
        <option value="">All Status</option>
        <option value="Scheduled">Scheduled</option>
        <option value="Pending">Pending</option>
        <option value="Cancelled">Cancelled</option>
        <option value="Completed">Completed</option>
      </select>



          <table className="mx-10 mt-10 w-[1070px] table-auto border-collapse border border-blue-300 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-[#eff6fa]">
            <tr>
              <th className="px-4 py-2 border border-blue-300 text-center">Sr.No.</th>
              <th className="px-4 py-2 border border-blue-300 text-center">Timing</th>
              <th className="px-4 py-2 border border-blue-300 text-center">Patient Name</th>
              <th className="px-4 py-2 border border-blue-300 text-center">Age</th>
              <th className="px-4 py-2 border border-blue-300 text-center">Gender</th>
              <th className="px-4 py-2 border border-blue-300 text-center">Status of Appointment</th>
            </tr>
          </thead>
          <tbody>
  {filteredAppointments.length === 0 ? (
    <tr>
      <td colSpan="4" className="text-center py-4">
        No appointments found
      </td>
    </tr>
  ) : (
    filteredAppointments.map((appt, index) => (
      <tr key={appt._id}>
        <td className="border px-4 py-2 text-center">
          {index + 1}
        </td>
        <td className="border px-4 py-2 text-center">
          {appt.time}
        </td>
        <td className="border px-4 py-2 text-center">
          {appt.patient?.name}
        </td>
              <td className="border px-4 py-2 text-center">
          {appt.patient?.age}
        </td>
                <td className="border px-4 py-2 text-center">
          {appt.patient?.gender}
        </td>
        <td className="border px-4 py-2 text-center">
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold
              ${
                appt.status === "Scheduled"
                  ? "text-yellow-800"
                  : appt.status === "Completed"
                  ? "text-green-800"
                  : appt.status === "Cancelled"
                  ? "text-red-800"
                  : "text-gray-800"
              }`}
          >
            {appt.status}
          </span>
        </td>
      </tr>
    ))
  )}
</tbody>


        </table>


          </div>
        </div>
      
      
      </div>}

 <div className="ml-[100px] p-6 w-full">
  {currentSection === 'profile' && 
      <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 flex flex-col">
  {/* Top Nav */}
  <header className="h-16 bg-blue-700 text-white flex items-center justify-between px-6 shadow-md">
    <h1 className="text-2xl font-bold">HopeCare</h1>
    <span className="text-lg">Doctor Dashboard</span>
  </header>
    
  <main className="flex-1 p-6 flex justify-center">
    {doctorProfile && (
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-8 space-y-8">
         {!hasProfileImage && (
    <div className="mb-4 p-3 rounded-lg bg-yellow-100 border border-yellow-400 text-yellow-800 text-center">
      ⚠️ Please upload a profile image in formal doctor attire.
    </div>
  )}
        
        
        <div className="flex flex-col md:flex-row items-center gap-6 relative">
     
  
  {/* Profile Image */}
  <div className="relative">
    <img
      src={
    preview
      ? preview
      : doctorProfile?.profileImage
      ? `http://localhost:5000${doctorProfile.profileImage}?t=${Date.now()}`
      : "/default-doctor.png"
  }
      
      alt="Doctor Avatar"
      className="w-28 h-28 rounded-full border-4 border-blue-200 shadow object-cover"
    />




    {/* Edit Icon */}
    <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700">
      ✏️
      <input
  type="file"
  accept="image/*"
  className="hidden"
  onChange={handleImageChange}
/>

    </label>
  </div>

  {/* Doctor Info */}
  <div className="text-center md:text-left">
    <h2 className="text-3xl font-bold text-gray-800">
      {doctorProfile.name}
    </h2>



    <p className="text-blue-600 font-medium text-lg">
      {doctorProfile.specialist}
    </p>

    <span
      className={`inline-block mt-2 px-4 py-1 rounded-full text-sm font-semibold
        ${
          doctorProfile.status === "Active"
            ? "bg-green-100 text-green-700"
            : "bg-yellow-100 text-yellow-700"
        }`}
    >
      {doctorProfile.status}
    </span>

    {/* 🔥 Upload Button (only when image selected) */}
    {selectedImage && (
      <div className="mt-3">
        <button
          onClick={uploadProfileImage}
          className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
        >
          Save Photo
        </button>
      </div>
    )}
  </div>
</div>


        {/* Info Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Personal Info */}
          <div className="bg-blue-50 rounded-xl p-5 shadow-inner">
            <h3 className="font-semibold text-gray-700 mb-4 text-lg">
              🧍 Personal Information
            </h3>

            <div className="space-y-2 text-gray-700">
              <p><strong>Email:</strong> {doctorProfile.email}</p>
              <p><strong>Phone:</strong> {doctorProfile.phone_no}</p>
              <p><strong>Gender:</strong> {doctorProfile.gender}</p>
              <p><strong>Date of Birth:</strong> {doctorProfile.dob}</p>
              <p><strong>Specialization:</strong> {doctorProfile.specialization}</p>
            </div>
          </div>

          {/* Professional Info */}
          <div className="bg-blue-50 rounded-xl p-5 shadow-inner">
            <h3 className="font-semibold text-gray-700 mb-4 text-lg">
              🏥 Professional Information
            </h3>

            <div className="space-y-2 text-gray-700">
              <p><strong>Department:</strong> {doctorProfile.department?.name}</p>
              <p><strong>Experience:</strong> {doctorProfile.experience} years</p>
              <p><strong>Shift:</strong> {doctorProfile.shift}</p>
              <p><strong>About Me:</strong> {doctorProfile.description}</p>
            </div>
          </div>

        </div>

        {/* Actions (optional) */}
        <div className="flex justify-end">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition" 
           onClick={() => {goToEditDoctor(doctorProfile._id)}}>
            Edit Profile 
          </button>
        </div>
      </div>
    )}
  </main>
</div>

}
 </div>

    </div>
  )
}

export default Dpage;