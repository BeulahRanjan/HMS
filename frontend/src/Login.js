import React from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {ToastContainer, toast} from "react-toastify";
import Cookies from "js-cookie"
import { useUserContext } from "./hooks/UserProvider";



function Login() {
    const [userData, setUserData]=useState({
        email:"",
        password:""
    })
    const {setUserGlobalData}=useUserContext();
    
const navigate = useNavigate();

    const handleChange=(e)=>{
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }

   const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      "https://hms-1-1u51.onrender.com/auth/login",
      userData
    );

    if (response.status === 200) {
      const { user, token } = response.data;

      toast.success("Login Successful!", {
        position: "top-right",
        autoClose: 2000,
      });

      // 🔐 AUTH STORAGE (REQUIRED FOR NAVBAR)
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);

      Cookies.set("authToken", token, {
        expires: 7,
        sameSite: "strict",
      });

      Cookies.set("userId", user._id, {
        expires: 7,
        sameSite: "strict",
      });

      Cookies.set("username", user.name, {
        expires: 7,
        sameSite: "strict",
      });

      Cookies.set("role", user.role, {
        expires: 7,
        sameSite: "strict",
      });

      Cookies.set(
        "hasSubmittedForm",
        user.hasSubmittedForm ? "true" : "false",
        {
          expires: 7,
          sameSite: "strict",
        }
      );

      // 🌍 Global context
      setUserGlobalData(user._id, user.name);

      // 🧭 ROLE-BASED NAVIGATION
      setTimeout(() => {
        if (user.role === "patient") {
          navigate("/", { replace: true });
          return;
        }

        if (!user.hasSubmittedForm) {
          if (user.role === "doctor") navigate("/addDoctor", { replace: true });
          else if (user.role === "nurse") navigate("/nurseform", { replace: true });
          else if (user.role === "admin") navigate("/addAdmin", { replace: true });
          else if (user.role === "receptionist")
            navigate("/addRecep", { replace: true });
          else navigate("/", { replace: true });
        } else {
          navigate("/", { replace: true });
        }
      }, 800);
    }
  } catch (error) {
    toast.error("Login Failed! Try Again", {
      position: "top-center",
    });
  }
};


  return (
  <div className="bg-[#d2ecf7] h-screen w-auto">
  <div className="flex items-center justify-center h-screen rounded-2xl">
    <div className="flex flex-row  h-4/5 w-2/3 bg-transparent rounded-2xl shadow-2xl">
        <div className=' relative w-2/3 rounded-2xl '>
        {/* <img src='https://i.pinimg.com/736x/c1/e4/f9/c1e4f92fd014f025cf45d378b573977d.jpg' */}
        <img src='https://i.pinimg.com/736x/37/ee/40/37ee40c057706ccd60b43e32f6592bf5.jpg'
        alt='signup'
         className="w-full h-full object-cover rounded-bl-2xl rounded-tl-2xl"/> 
        <div className='absolute rounded-bl-2xl rounded-tl-2xl  top-0 left-0 w-full h-full bg-[#9ad6ee] opacity-75 
        flex items-center justify-center px-8'>
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
        <form onSubmit={handleSubmit}>
            <div className='flex flex-col items-center justify-center h-full'>
                <h1 className='text-3xl font-bold mt-[100px]'>Login</h1>
                <div className='flex flex-col w-4/5 mt-10'>

                  

                    <label className='text-lg mb-1'>Email:</label>
                    <input type="email" 
                    name='email'
                    onChange={handleChange}
                    placeholder="Enter your email" 
                    className='border border-gray-300 rounded-md p-2 mb-4 bg-transparent'/>

                    <label className='text-lg mb-1'>Password:</label>
                    <input type="password" 
                    name='password'
                    onChange={handleChange}
                    placeholder="Enter your password" 
                    className='border border-gray-300 rounded-md p-2 mb-4 bg-transparent'/>
                    
                   


                    <button type="submit" className='ml-[130px] mt-5 bg-blue-300  w-[80px] rounded-md p-2 hover:bg-blue-400'
                    >Login</button>
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

export default Login;