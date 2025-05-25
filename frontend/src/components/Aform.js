import React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";


function Aform() {
  
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

    const handleSubmit = async (e) => {
      e.preventDefault();
            console.log(Cookies.get('authToken'));

  
      try {
        const response = await axios.post('http://localhost:5000/addAppt', formData, {
          headers: {
            Authorization: `Bearer ${Cookies.get('authToken')}`,
          },
        });
        
            console.log(Cookies.get('authToken'));
        console.log(response.data.newAppt);
        if (response.status === 201) {
          toast.success("Appointment form submitted!");
          navigate('/recep'); // Redirect to homepage
        }
      } catch (error) {
        toast.error("Error submitting form.");
        console.error(error);
      }
    };
  
        const handleform=()=>{
          navigate("/recep");
          
      }
  
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
            <h1 className="mt-5 text-3xl font-bold text-blue-700">Add Patient</h1>
            <p className="mt-1 text-md italic">
            Fields marked with an asterisk () are mandatory.*
            </p>
           <form className='overflow-y-auto h-80 mt-10' onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-6">
                <div className="flex flex-col">
                <label className="text-lg mb-1">Petient<span className="text-red-600 ml-1">*</span>:</label>
                <input
                    type="text"
                    name='patient'
                    value={formData.patient}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="border border-black rounded-md p-2 px-10  bg-transparent placeholder-black"
                />
                </div>
                <div className="flex flex-col">
                <label className="text-lg mb-1">Doctor<span className="text-red-600 ml-1">*</span>:</label>
                <input
                    type="text"
                    name='doctor'
                    value={formData.doctor}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="border border-black rounded-md p-2 px-10 bg-transparent placeholder-black"
                />
                </div>
                <div className="flex flex-col">
                <label className="text-lg mb-1">Department<span className="text-red-600 ml-1">*</span>:</label>
                <input
                    type="text"
                    name='department'
                    value={formData.department}
                    onChange={handleChange}
                    placeholder="Enter phone number"
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
                defaultValue="">
                <option value="" disabled>Select your status...</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Cancelled">Cancelled</option>
                </select>
                </div>
            </div>
             <button type='submit' className='m-10  ml-[270px] p-2 px-4 rounded-lg bg-blue-400 hover:bg-blue-700'
              onClick={()=>{handleform()}}
              >Submit</button>
           </form>
          
          </div>
         </div>
        </div>
    </div>
  )
}

export default Aform;

