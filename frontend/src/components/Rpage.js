import React from 'react';
import { useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Sidebar from './Sidebar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';



function Rpage() {


  const [currentSection, setCurrentSection] = useState('dashboard');

  const [recepProfile, setRecepProfile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [filters, setFilters] = useState({
  status: '',
  timeSlot: '', 
});
    const navigate =useNavigate();

        const handlePatient=()=>{
        navigate("/addPatient");
    }

     const handleAppt=()=>{
        navigate("/addAppt");
    }

const isTimeInSlot = (time, slot) => {
  const [rawHour, rawMinuteModifier] = time.split(':'); // "04", "00 PM"
  const [minute, modifier] = rawMinuteModifier.split(' ');
  let h = parseInt(rawHour);
  if (modifier === 'PM' && h !== 12) h += 12;
  if (modifier === 'AM' && h === 12) h = 0;

  if (slot === 'morning') return h >= 8 && h < 12;
  if (slot === 'afternoon') return h >= 12 && h < 16;
  if (slot === 'evening') return h >= 16 && h <= 20;
  if (slot === 'night') return h>=20 && h<=24; 
  return true;
};

  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getAllPat', {
          headers: {
            Authorization: `Bearer ${Cookies.get('authToken')}`,
          },
        });
        console.log(response.data.patients);
        setPatients(response.data.patients);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, []);

   const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getAllAppts', {
          headers: {
            Authorization: `Bearer ${Cookies.get('authToken')}`,
          },
        });
        console.log(response.data.appointments);
        setAppointments(response.data.appointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  const deleteAppointment = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:5000/delAppt/${id}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get('authToken')}`,
      },
    });

    // Update UI after deletion
    setAppointments((prevAppointments) =>
      prevAppointments.filter((appt) => appt._id !== id)
    );
  } catch (error) {
    console.error("Error deleting appointment:", error);
    // alert("Failed to delete appointment.");
  }
};

  const deletePatient = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:5000/delPatient/${id}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get('authToken')}`,
      },
    });

    // Update UI after deletion
    setPatients((prevPatients) =>
      prevPatients.filter((pat) => pat._id !== id)
    );
  } catch (error) {
    console.error("Error deleting appointment:", error);
    // alert("Failed to delete appointment.");
  }
};

const fetchAppointment = async (id) => {
  try {
    const response = await axios.get(`http://localhost:5000/getAppt/${id}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get('authToken')}`,
      },
    });

    const appt = response.data.appointment;
    console.log(appt);
    // ✅ Navigate and pass appointment data via state
    navigate('/addAppt', { state: { appt } });

  } catch (error) {
    console.error('Error fetching appointment:', error);
  }
};
 
  const loadRecepProfile = async () => {
    try {
      const token = Cookies.get("authToken");

      const res = await axios.get("http://localhost:5000/rprofile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRecepProfile(res.data.recep);
      console.log("Recep Profile:", res.data.recep);
      


    } catch (error) {
      console.error("Error loading profile:", error);
    }
  };

  useEffect(() => {
    loadRecepProfile();
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
      "http://localhost:5000/upload-rprofile-image",
      formData,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
      }
    );

    const { imagePath } = res.data;
    console.log(res.data);
  
    setRecepProfile((prev) => ({
      ...prev,
      profileImage: imagePath,
    }));
    const imageUrl1=`http://localhost:5000${recepProfile.profileImage}?t=${Date.now()}`;
    console.log(imageUrl1);
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


 const goToEditRecep = async (id) => {
  try {
    const res = await axios.get(
      `http://localhost:5000/getRecep/${id}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
      }
    );
  
    console.log(id);
    navigate("/recep", {
      state: { recepProfile: res.data.recep },
    });
  } catch (error) {
    console.error("Error opening edit page:", error);
  }
};



    const hasProfileImage =
  recepProfile?.profileImage &&
  recepProfile.profileImage !== "null" &&
  recepProfile.profileImage !== "undefined";

  const [doctors, setDoctors] = useState([]);

const fetchDoctors = async () => {
  try {
    const res = await axios.get("http://localhost:5000/getAllDoctors", {
      headers: {
        Authorization: `Bearer ${Cookies.get("authToken")}`,
      },
    });

    setDoctors(res.data.doctors);
    console.log("Doctors fetched:", res.data.doctors);
  } catch (error) {
    console.error("Error fetching doctors:", error);
  }
};

useEffect(() => {
  fetchDoctors();
}, []);







  return (


        <div className="flex">
      <Sidebar onNavigate={setCurrentSection} />
      <div className="ml-[100px] p-6 w-full">
        {currentSection === 'Profile' && 
        <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 flex flex-col">
  {/* Top Nav */}
  <header className="h-16 bg-blue-700 text-white flex items-center justify-between px-6 shadow-md">
    <h1 className="text-2xl font-bold">HopeCare</h1>
    <span className="text-lg">Receptionist Dashboard</span>
  </header>
    
  <main className="flex-1 p-6 flex justify-center">
    {recepProfile && (
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8 space-y-8">
         {!hasProfileImage && (
    <div className="mb-4 p-3 rounded-lg bg-yellow-100 border border-yellow-400 text-yellow-800 text-center">
      ⚠️ Please upload a profile image in formal doctor attire.
    </div>
  )}
        
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center gap-6 relative">
     
  
  {/* Profile Image */}
  <div className="relative">
    <img
      src={
    preview
      ? preview
      : recepProfile?.profileImage
      ? `http://localhost:5000${recepProfile.profileImage}?t=${Date.now()}`
      : "/default-receptionist.png"
  }

      alt="Receptionist Avatar"
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
      {recepProfile.name}
    </h2>

    <p className="text-blue-600 font-medium text-lg">
      {recepProfile.specialization}
    </p>

    <span
      className={`inline-block mt-2 px-4 py-1 rounded-full text-sm font-semibold
        ${
          recepProfile.status === "Active"
            ? "bg-green-100 text-green-700"
            : "bg-yellow-100 text-yellow-700"
        }`}
    >
      {recepProfile.status}
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
              <p><strong>Email:</strong> {recepProfile.email}</p>
              <p><strong>Phone:</strong> {recepProfile.phone_no}</p>
              <p><strong>Gender:</strong> {recepProfile.gender}</p>
              <p><strong>Date of Birth:</strong> {recepProfile.dob}</p>
            </div>
          </div>

          {/* Professional Info */}
          <div className="bg-blue-50 rounded-xl p-5 shadow-inner">
            <h3 className="font-semibold text-gray-700 mb-4 text-lg">
              🏥 Professional Information
            </h3>

            <div className="space-y-2 text-gray-700">
              <p><strong>Department:</strong> {recepProfile.department?.name}</p>
              <p><strong>Experience:</strong> {recepProfile.experience} years</p>
              <p><strong>Shift:</strong> {recepProfile.shift}</p>
            </div>
          </div>

        </div>

        {/* Actions (optional) */}
        <div className="flex justify-end">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition" 
           onClick={() => {goToEditRecep(recepProfile._id)}}>
            Edit Profile 
          </button>
        </div>
      </div>
    )}
  </main>
</div>
}
        {currentSection === 'patients' && 
        <div> 
       
        <div className="p-4">
          <div className='flex justify-between items-center'>
            <h2 className="text-xl ml-[150px] font-bold mb-4">Patient List</h2>
             <button  className='mr-[170px] mt-[-20px] bg-blue-300  w-[100px] rounded-md p-2 hover:bg-blue-400'
        onClick={()=>{handlePatient()}}  >Add Patient
        </button>
          </div>

         <table className="ml-[100px] mx-10 mt-0 w-[1100px] table-auto  shadow-xl
          overflow-hidden">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Age</th>
            <th className='border px-4 py-2'>Email</th>
            <th className="border px-4 py-2">Gender</th>
            <th className='border px-4 py-2'>Address</th>
            <th className="border px-4 py-2">Contact</th>
            <th className='border px-4 py-2'>By</th>
            <th className='border px-4 py-2'>Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(patients) && patients.map((pat, index) => (
            <tr key={index}>
              <td className="border text-center px-4 py-2">{pat.name}</td>
              <td className="border text-center px-4 py-2">{pat.age}</td>
              <td className='border text-center px-4 py-2'>{pat.email}</td>
              <td className="border text-center px-4 py-2">{pat.gender}</td>
              <td className='border text-center px-4 py-2'>{pat.address}</td>
              <td className="border text-center px-4 py-2">{pat.phone_no}</td>
              <td className='border text-center px-4 py-2'>{pat.created_by.name}</td>
              <td className='border gap-2 px-4 py-2 flex flex-row'>
                      <EditIcon className='cursor-pointer text-blue-200'/>
                        <DeleteIcon className='cursor-pointer text-blue-200' onClick={() => deletePatient(pat._id)} />
                    </td>
            </tr>
          ))}
        </tbody>
         </table>
         </div>
  
        </div>}

        {currentSection === 'appointments' && 
        <div>  
          <div className="p-4">
            <div className="flex justify-between items-center"> 
            <h2 className="text-xl ml-[150px] font-bold mb-4">Appointment List</h2>
               <button
            className='mr-[170px] mt-[-20px] bg-blue-300 w-[150px] rounded-md p-2 hover:bg-blue-400'
            onClick={handleAppt}
          >
            Add Appointment
          </button>
          </div>
            <table className="ml-[100px] mx-10 mt-0 w-[1100px] table-auto shadow-xl overflow-hidden">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2">Patient Name</th>
                  <th className="border px-4 py-2">Doctor Name</th>
                  <th className='border px-4 py-2'>Department</th>
                  <th className="border px-4 py-2">Date</th>
                  <th className='border px-4 py-2'>Time</th>
                  <th className="border px-4 py-2">Status</th>
                  <th className='border px-4 py-2'>By</th>
                  <th className='border px-4 py-2'>Action</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(appointments) && appointments.map((appt, index) => (
                  <tr key={index}>
                    <td className="border text-center px-4 py-2">{appt.patient?.name || "N/A"}</td>
                    <td className="border text-center px-4 py-2">{appt.doctor?.name || "N/A"}</td>
                    <td className='border text-center px-4 py-2'>{appt.department?.name || "N/A"}</td>
                    <td className="border text-center px-4 py-2">{appt.date}</td>
                    <td className='border text-center px-4 py-2'>{appt.time}</td>
                    <td className="border text-center px-4 py-2">{appt.status}</td>
                    <td className='border text-center px-4 py-2'>{appt.created_by?.name || "N/A"}</td>
                    <td className='border gap-2 px-4 py-2 flex flex-row'>
                      <EditIcon className='cursor-pointer text-blue-200' onClick={() => {fetchAppointment(appt._id)}}/>
                        <DeleteIcon className='cursor-pointer text-blue-200' onClick={() => deleteAppointment(appt._id)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        }

        {currentSection === 'doctors' && 
        <div>
          <div className="w-full min-h-screen bg-gradient-to-b from-[#e3f0f7] to-[#eff6fa] py-10 px-6 ">
           <p className="text-3xl font-bold text-center mb-8">Our Doctors</p>
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4  justify-items-center">
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
          ? `http://localhost:5000${doc.profileImage}?t=${Date.now()}`
          : "/default-doctor.png"
      }
      alt={doc.name}
      className="w-full h-full object-cover hover:scale-105 transition duration-300"
    />
  </div>

  {/* Content */}
  <div className="p-5 flex flex-col flex-grow text-center">
    <h2 className="text-xl font-bold text-gray-800">{doc.name}</h2>

    <p className="text-blue-600 font-semibold">{doc.department?.name}</p>

    <p className="text-sm text-gray-600 mt-1">{doc.specialization}</p>

    <div className="mt-2 text-sm text-gray-700">
      <strong>Experience:</strong> {doc.experience}
    </div>

    <p className="text-sm text-gray-600 mt-3 line-clamp-3">
      {doc.description}
    </p>

    <button className="mt-auto bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
      View Profile
    </button>
  </div>
</div>

  ))}
</div>
      
          </div>
        </div>
        }

        {/* {currentSection === 'profile' && <div >Hello, I'm back!!!</div>} */}
      </div>
    </div>

  )
}


export default Rpage;