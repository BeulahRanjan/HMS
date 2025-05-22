import React from 'react'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";


function Pform() {
const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_no: "",
    dob:"",
    age: "",
    gender:"",
    address:"",
    blood_group:""
    // Add others if needed
  });

 const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/addPatient', formData, {
        headers: {
          Authorization: `Bearer ${Cookies.get('authToken')}`,
        },
      });

      console.log(response)
      if (response.status === 201) {
        toast.success("Doctor form submitted!");
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
            src="https://i.pinimg.com/736x/0c/f9/5b/0cf95bbb233db1f8194f48d95455edf7.jpg"
            alt="Doctor"
            className="w-full h-full object-cover rounded-2xl"
          />
          <div className="absolute rounded-2xl top-0 left-0 w-full h-full bg-[#aad1e6] opacity-75 flex flex-col items-center  px-8 rounded-2xl">
            <h1 className="mt-5 text-3xl font-bold text-blue-700">Add Patient</h1>
            <p className="mt-1 text-md italic">
            Fields marked with an asterisk () are mandatory.*
            </p>
           <form className='overflow-y-auto h-80 mt-10' onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-6">
                <div className="flex flex-col">
                <label className="text-lg mb-1">Full Name<span className="text-red-600 ml-1">*</span>:</label>
                <input
                    type="text"
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="border border-black rounded-md p-2 px-10  bg-transparent placeholder-black"
                />
                </div>
                <div className="flex flex-col">
                <label className="text-lg mb-1">Email<span className="text-red-600 ml-1">*</span>:</label>
                <input
                    type="email"
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="border border-black rounded-md p-2 px-10 bg-transparent placeholder-black"
                />
                </div>
                <div className="flex flex-col">
                <label className="text-lg mb-1">Phone Number<span className="text-red-600 ml-1">*</span>:</label>
                <input
                    type="text"
                    name='phone_no'
                    value={formData.phone_no}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className="border border-black rounded-md p-2 px-10 bg-transparent placeholder-black"
                />
                </div>
                <div className="flex flex-col">
                <label className="text-lg mb-1">Date of Birth<span className="text-red-600 ml-1">*</span>:</label>
                <input
                    type="date"
                    name='dob'
                    value={formData.dob}
                    onChange={handleChange}
                    className="border border-black rounded-md p-2 px-10 bg-transparent placeholder-black"
                />
                </div>
                <div className="flex flex-col">
                <label className="text-lg mb-1">Age<span className="text-red-600 ml-1">*</span>:</label>
                <input
                    type="text"
                    name='age'
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className="border border-black rounded-md p-2 px-10 bg-transparent placeholder-black"
                />
                </div>
                <div className="flex flex-col">
                <label className='text-lg mb-1'>Gender<span className="text-red-600 ml-1">*</span>:</label>
                <select className="w-full px-4 py-2 bg-transparent border border-black rounded-md shadow-sm 
                focus:outline-none focus:ring-2 focus:ring-blue-200"
                defaultValue=""
                name='gender'
                value={formData.gender}
                onChange={handleChange}>

                <option value="" disabled>Select gender....</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                </select>
                </div>

                <div className="flex flex-col">
                <label className="text-lg mb-1">Address<span className="text-red-600 ml-1">*</span>:</label>
                <input
                    type="text"
                    name='address'
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter address"
                    className="border border-black rounded-md p-2 px-10 bg-transparent placeholder-black"
                />
                </div>

                <div className="flex flex-col">
                <label className='text-lg mb-1'>Blood Group<span className="text-red-600 ml-1">*</span>:</label>
                <select className="w-full px-4 py-2 bg-transparent border border-black rounded-md shadow-sm 
                focus:outline-none focus:ring-2 focus:ring-blue-200"
                defaultValue=""
                name='blood_group'
                value={formData.blood_group}
                onChange={handleChange}>
                <option value="" disabled>Select blood group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                </select>
                </div>


                  {/* <div className="mb-4">
                <label className="text-lg mb-1 block">
                  Timing<span className="text-red-600 ml-1">*</span>
                </label>
                <input
                  type="time"
                  name="timing"
                  value=""
                  required
                  className="w-full px-4 py-2 border rounded bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                </div>

              <div className="mb-4">
                <label className="text-lg mb-1 block">
                  Doctor<span className="text-red-600 ml-1 ">*</span>
                </label>
                <select
                  name="doctor"
                  value=""
                  required
                  className="w-full px-4 py-2 border rounded bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Doctor</option>
                  <option value="Dr. Rajeev Kumar">Dr. Rajeev Kumar</option>
                  <option value="Dr. Meera Sharma">Dr. Meera Sharma</option>
                  <option value="Dr. Aman Verma">Dr. Aman Verma</option>
            
                </select>
              </div> */}

            </div>
             <button  onClick={()=>{handleform()}} className='m-10  ml-[270px] p-2 px-4 rounded-lg bg-blue-400 hover:bg-blue-700'>Submit</button>
           </form>
          
          </div>
         </div>
        </div>
    </div>
  )
}

export default Pform;

