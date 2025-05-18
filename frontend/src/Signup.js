import React from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {ToastContainer, toast} from "react-toastify";
import axios from "axios";

function Signup() {

  
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        role:""
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post("http://localhost:5000/auth/signup", userData);
            console.log(response);
            if (response.status === 201) {
                toast.success("SignUp Successfull !", {
                    position: "top-right",
                    autoClose: 2000,
                });
                setUserData({name:"", email:"", password:"", role:""});
                setTimeout(() => navigate("/login"), 2000);

            }
            else if (response.status === 400) {
                toast.error("Wrong Password!", {
                    position: "top-center",
                });
            }
        }
        catch (error) {
            toast.error("Login Failed! Try Again", {
                position: "top-center",
              });
        }

    }

    const handleLogin=()=>{
        navigate("/login");
    }


  return (
  <div className="bg-[#d2ecf7] h-screen w-auto">
  <div className="flex items-center justify-center h-screen rounded-2xl">
    <div className="flex flex-row  h-4/5 w-2/3 bg-transparent rounded-2xl shadow-2xl">
        <div className=' relative w-2/3 rounded-2xl '>
        {/* <img src='https://i.pinimg.com/736x/c1/e4/f9/c1e4f92fd014f025cf45d378b573977d.jpg' */}
        <img src='https://i.pinimg.com/736x/37/ee/40/37ee40c057706ccd60b43e32f6592bf5.jpg'
        alt='signup'
         className="w-full h-full object-cover rounded-bl-2xl rounded-tl-2xl"/> 
        <div className='absolute rounded-bl-2xl rounded-tl-2xl  top-0 left-0 w-full h-full bg-[#9ad6ee] opacity-75 flex items-center justify-center px-8'>
        <div className=' '>
            <p className='text-4xl font-bold mb-10 text-center mt-[-100px]'>Welcome to HopeCare!</p>
            <p className='text-lg mb-2 ml-10 font-bold mr-10'>Your care starts here.</p>
            <p className='text-lg mb-4 ml-10 font-bold mr-10'>
            Join our trusted network of healthcare professionals and staff. Together, we create a safe,
            organized, and compassionate environment for every patient.
            </p>
            <p className='italic text-md ml-10 font-bold'>“Because every detail matters when it comes to care.”</p>
        </div>
        </div>

        </div>
        <div className='w-1/2  rounded-br-2xl rounded-tr-2xl'>
        <form  onSubmit={handleSubmit}>
            <div className='flex flex-col items-center justify-center h-full'>
                <h1 className='text-3xl font-bold mt-7'>Sign Up</h1>
                <div className='flex flex-col w-4/5 mt-5'>

                    <label className='text-lg mb-1'>Full Name:</label>
                    <input type="text" 
                    name='name'
                    value={userData.name}
                    placeholder="Enter your name" 
                    onChange={handleChange}
                    className='border border-gray-300 rounded-md p-2 mb-4 bg-transparent'/>

                    <label className='text-lg mb-1'>Email:</label>
                    <input type="email" 
                    name='email'
                    value={userData.email}
                    placeholder="Enter your email" 
                    onChange={handleChange}
                    className='border border-gray-300 rounded-md p-2 mb-4 bg-transparent'/>

                    <label className='text-lg mb-1'>Password:</label>
                    <input type="password" 
                    name='password'
                    value={userData.password}
                    placeholder="Enter your password" 
                    onChange={handleChange}
                    className='border border-gray-300 rounded-md p-2 mb-4 bg-transparent'/>
                    
                    <label className='text-lg mb-1'>Role:</label>
                    <select className="w-full px-4 py-2 bg-transparent border rounded-md shadow-sm 
                    focus:outline-none focus:ring-2 focus:ring-blue-200"
                    name='role'
                    value={userData.role}
                    onChange={handleChange}
                    defaultValue=""
                    >
                    <option value="" disabled>Select your role...</option>
                    <option value="doctor">Doctor</option>
                    <option value="nurse">Nurse</option>
                    <option value="receptionist">Receptionist</option>
                    <option value="admin">Admin</option>
                    </select>


                    <button type="submit" onClick={()=>{handleLogin()}} className='ml-[130px] mt-5 bg-blue-300  w-[80px] rounded-md p-2 hover:bg-blue-400'>Sign Up</button>
                </div>
            </div>
        </form>
        </div>
    </div>
    <ToastContainer/>
  </div>
</div>

  )
}

export default Signup;