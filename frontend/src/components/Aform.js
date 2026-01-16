import React from 'react';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";


function Aform() {
  const location = useLocation(); // <-- add this line
  const passedAppt = location.state?.appt;
  const [isEditMode, setIsEditMode] = useState(false);
  const [appointmentId, setAppointmentId] = useState(null);
  const navigate = useNavigate();
  const[formData, setFormData]=useState({
    patient:"",
    doctor:"",
    department:"",
    date:"",
    time:"",
    status:""
  });

  const handleChange =(e) => {
    const {name, value} = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }



// useEffect(() => {
//   if (passedAppt) {
//     setIsEditMode(true);
//     setAppointmentId(passedAppt._id);
//     setFormData({
//        patient: passedAppt.patient?._id || '',
//         patientName: passedAppt.patient?.name || '',
//         doctor: passedAppt.doctor?._id || '',
//         doctorName: passedAppt.doctor?.name || '',
//         department: passedAppt.department?._id || '',
//         departmentName: passedAppt.department?.name || '',
//       date: passedAppt.date?.slice(0, 10) || '',
//       time: passedAppt.time || '',
//       status: passedAppt.status || '',
//     });
//   }
// }, [passedAppt]);




// const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     const url = isEditMode
//       ? `http://localhost:5000/upAppt/${appointmentId}`
//       : `http://localhost:5000/addAppt`;

//     const method = isEditMode ? 'put' : 'post';

//     const payload = {
//       patient: formData.patient,
//       doctor: formData.doctor,
//       department: formData.department,
//       date: formData.date,
//       time: formData.time,
//       status: formData.status,
//     };

//     const response = await axios({
//       method: method,
//       url: url,
//       data: payload,
//       headers: {
//         Authorization: `Bearer ${Cookies.get('authToken')}`,
//       },
//     });

//     if (response.status === 200 || response.status === 201) {
//       const msg = isEditMode ? 'Appointment updated!' : 'Appointment added!';
//       toast.success(msg);
//       navigate('/recep');
//     }
//   } catch (error) {
//     toast.error('Error submitting form.');
//     console.error("Error during form submit:", error);
//   }
// };

useEffect(() => {
  if (passedAppt) {
    setIsEditMode(true);
    setAppointmentId(passedAppt._id);

    setFormData({
      patient: passedAppt.patient?._id,
      doctor: passedAppt.doctor?._id,
      department: passedAppt.department?._id,

      patientName: passedAppt.patient?.name || "",
      doctorName: passedAppt.doctor?.name || "",
      departmentName: passedAppt.department?.name || "",

      date: passedAppt.date?.slice(0, 10),
      time: passedAppt.time,
      status: passedAppt.status,
    });
  }
}, [passedAppt]);

console.log(isEditMode);

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // Fetch IDs from backend using names
    const [patientRes, doctorRes, deptRes] = await Promise.all([
      axios.get(`http://localhost:5000/getPatByName/${formData.patientName}`, {
        headers: { Authorization: `Bearer ${Cookies.get('authToken')}` }
      }),
      axios.get(`http://localhost:5000/getDocByName/${formData.doctorName}`, {
        headers: { Authorization: `Bearer ${Cookies.get('authToken')}` }
      }),
      axios.get(`http://localhost:5000/getDeptByName/${formData.departmentName}`, {
        headers: { Authorization: `Bearer ${Cookies.get('authToken')}` }
      })
    ]);

    // Extract the _id for each
    const patientId = patientRes.data?.patient?._id;
    const doctorId = doctorRes.data?.doctor?._id;
    const departmentId = deptRes.data?.department?._id;
    console.log(patientRes.data);
    console.log("Patient ID:", patientId);
    console.log(doctorRes.data);
    console.log("Doctor ID:", doctorId);
    console.log(deptRes.data);
    console.log("Department ID:", departmentId);

    if (!patientId) {
      toast.error("One or more entities not found");
      return;
    }
if (!doctorId) {
    console.log("One or more entities not found");
      return;
    }
    const payload = {
      patient: patientId,
      doctor: doctorId,
      department: departmentId,
      date: formData.date,
      time: formData.time,
      status: formData.status,
    };
console.log("Auth token:", Cookies.get('authToken'));

    const url = isEditMode
      ? `http://localhost:5000/upAppt/${appointmentId}`
      : `http://localhost:5000/addAppt`;

    const method = isEditMode ? 'put' : 'post';

    const response = await axios({
      method,
      url,
      data: payload,
      headers: {
        Authorization: `Bearer ${Cookies.get('authToken')}`,
      },
    });

    console.log(appointmentId);
    console.log("Response:", response.data);
    if (response.status === 200 || response.status === 201) {
      const msg = isEditMode ? 'Appointment updated!' : 'Appointment added!';
      toast.success(msg);
      navigate('/recep');
    }

  } catch (err) {
    console.error("Error updating appointment:", err);
    toast.error("Failed to update appointment");
  }
};



  
  return (
    <div className='bg-[#d0e5f1] h-screen w-auto flex items-center justify-center'>
        <div className='flex flex-col items-center justify-center h-4/5 w-2/3 rounded-2xl shadow-2xl'>
         <div className="relative w-full h-full rounded-2xl">
          <img
            src="https://i.pinimg.com/736x/b3/92/df/b392dfdeea7eeec622e8796d8f8a14af.jpg"
            alt="Doctor"
            className="w-full h-full object-cover rounded-2xl"
          />
          <div className="absolute rounded-2xl top-0 left-0 w-full h-full bg-[#aad1e6] opacity-60 flex flex-col items-center  px-8 rounded-2xl">
            <h1 className="mt-5 text-3xl font-bold text-blue-700"> {isEditMode ? 'Update Appointment' : 'Add Appointment'}</h1>
            <p className="mt-1 text-md italic">
            Fields marked with an asterisk () are mandatory.*
            </p>
           <form className='overflow-y-auto h-80 mt-10' onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-6">
                <div className="flex flex-col">
                <label className="text-lg mb-1">Patient<span className="text-red-600 ml-1">*</span>:</label>
                <input
                    type="text"
                    name='patientName'
                    value={formData.patientName}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="border border-black rounded-md p-2 px-10  bg-transparent placeholder-black"
                />
                </div>
                <div className="flex flex-col">
                <label className="text-lg mb-1">Doctor<span className="text-red-600 ml-1">*</span>:</label>
                <input
                    type="text"
                    name='doctorName'
                    value={formData.doctorName}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="border border-black rounded-md p-2 px-10 bg-transparent placeholder-black"
                />
                </div>
                <div className="flex flex-col">
                <label className="text-lg mb-1">Department<span className="text-red-600 ml-1">*</span>:</label>
                <input
                    type="text"
                    name='departmentName'
                    value={formData.departmentName}
                    onChange={handleChange}
                    placeholder="Enter the department"
                    className="border border-black rounded-md p-2 px-10 bg-transparent placeholder-black"
                />
                </div>
                <div className="flex flex-col">
                <label className="text-lg mb-1">Date<span className="text-red-600 ml-1">*</span>:</label>
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="border border-black rounded-md p-2 px-10 bg-transparent placeholder-black"
                />
                </div>
                <div className="flex flex-col">
                <label className="text-lg mb-1">time<span className="text-red-600 ml-1">*</span>:</label>
                <input
                    type="text"
                    name='time'
                    value={formData.time}
                    onChange={handleChange}
                    placeholder="Enter your experience in yrs.."
                    className="border border-black rounded-md p-2  bg-transparent placeholder-black"
                />
                </div>
                

                <div className="flex flex-col">
                <label className='text-lg mb-1'>Status<span className="text-red-600 ml-1">*</span>:</label>
                <select className="w-full px-4 py-2 bg-transparent border border-black rounded-md shadow-sm 
                focus:outline-none focus:ring-2 focus:ring-blue-200"
                name='status'
                value={formData.status}
                onChange={handleChange}
                >
                <option value="" disabled>Select your status...</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Cancelled">Cancelled</option>
                </select>
                </div>
            </div>
             <button type='submit' className='m-10  ml-[270px] p-2 px-4 rounded-lg bg-blue-400 hover:bg-blue-700'
              // onClick={()=>{handleform()}}
              >  {isEditMode ? 'Update' : 'Submit'}</button>
           </form>
          
          </div>
         </div>
        </div>
    </div>
  )
}

export default Aform;

