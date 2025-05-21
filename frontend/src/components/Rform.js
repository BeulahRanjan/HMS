import React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";


function Rform() {
  
       const navigate = useNavigate();
  const[formData, setFormData]=useState({
    name:"",
    email:"",
    phone_no:"",
    dob:"",
    experience:"",
    gender:"",
    shift:"",
    joining_date:""

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
  
      try {
        const response = await axios.post('http://localhost:5000/addRecep', formData, {
          headers: {
            Authorization: `Bearer ${Cookies.get('authToken')}`,
          },
        });
  
        if (response.status === 201) {
          toast.success("Receptionist form submitted!");
          navigate('/'); // Redirect to homepage
        }
      } catch (error) {
        toast.error("Error submitting form.");
        console.error(error);
      }
    };
  
        const handleform=()=>{
          navigate("/");
          Cookies.set('hasSubmittedForm', true);
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
            <h1 className="mt-5 text-3xl font-bold text-blue-700">Welcome to HopeCare!</h1>
            <p className="mt-2 text-lg text-center">
            We're thrilled to have you on board. Let's complete your profile so we can better connect you with your patients 
            and streamline your work experience.</p>
            <p className="mt-1 text-md italic">
            “Because healing begins with the right information.”
            </p>
           <form className='overflow-y-auto h-80 mt-10' onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-6">
                <div className="flex flex-col">
                <label className="text-lg mb-1">Full Name:</label>
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
                <label className="text-lg mb-1">Email:</label>
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
                <label className="text-lg mb-1">Phone Number:</label>
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
                <label className="text-lg mb-1">Date of Birth:</label>
                <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="border border-black rounded-md p-2 px-10 bg-transparent placeholder-black"
                />
                </div>
                <div className="flex flex-col">
                <label className="text-lg mb-1">Experience</label>
                <input
                    type="text"
                    name='experience'
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="Enter your experience in yrs.."
                    className="border border-black rounded-md p-2  bg-transparent placeholder-black"
                />
                </div>
                

                <div className="flex flex-col">
                <label className='text-lg mb-1'>Gender</label>
                <select className="w-full px-4 py-2 bg-transparent border border-black rounded-md shadow-sm 
                focus:outline-none focus:ring-2 focus:ring-blue-200"
                name='gender'
                value={formData.gender}
                onChange={handleChange}
                defaultValue="">
                <option value="" disabled>Select your status in dept....</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                </select>
                </div>

                <div className="flex flex-col">
                <label className='text-lg mb-1'>Shift</label>
                <select className="w-full px-4 py-2 bg-transparent border border-black rounded-md shadow-sm 
                focus:outline-none focus:ring-2 focus:ring-blue-200"
                name='shift'
                value={formData.shift}
                
                    onChange={handleChange}
                defaultValue="">
                <option value="" disabled>Select your status in dept....</option>
                <option value="">Morning</option>
                <option value="">Afternoon</option>
                <option value="">Evening</option>
                <option value="">Night</option>
                </select>
                </div>

                <div className="flex flex-col">
                <label className="text-lg mb-1">Joining Date:</label>
                <input
                    type="date"
                    name='joining_date'
                    value={formData.joining_date}
                    
                    onChange={handleChange}
                    className="border border-black rounded-md p-2 px-10 bg-transparent placeholder-black"/>
                </div>
            </div>
             <button className='m-10  ml-[270px] p-2 px-4 rounded-lg bg-blue-400 hover:bg-blue-700' onClick={()=>{handleform()}}>Submit</button>
           </form>
          
          </div>
         </div>
        </div>
    </div>
  )
}

export default Rform;

