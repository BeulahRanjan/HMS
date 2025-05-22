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

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:5000/auth/login', userData);
            console.log(response.data.user);
           if(response.status===200){
            toast.success("Login Successfull !", {
                        position: "top-right",
                        autoClose:2000,
                      });
            Cookies.set('authToken', response.data.token, { 
                expires: 7, 
                sameSite: 'strict'
              });
              Cookies.set('userId', response.data.user._id, { 
                expires: 7, 
                sameSite: 'strict'
              });
              Cookies.set('username', response.data.user.name, { 
                expires: 7, 
                sameSite: 'strict'
              });
              Cookies.set('role', response.data.user.role, { 
                expires: 7, 
                sameSite: 'strict'
              });
              Cookies.set('hasSubmittedForm', response.data.user.hasSubmittedForm, { 
                expires: 7, 
                sameSite: 'strict'
              });
              console.log(response.data);
                // Set global context
      setUserGlobalData(response.data.user._id, response.data.user.name);

      // Clear form
      setUserData({ email: "", password: "", role: "" });

      // Use role from backend response
      const user = response.data.user;
      const userRole = response.data.user.role;
               setTimeout(() => {
                if (!user.hasSubmittedForm) {
                  console.log(user.hasSubmittedForm);
          // Redirect to respective form if first-time login
          if (userRole === 'doctor') navigate('/addDoctor');
          else if (userRole === 'nurse') navigate('/nurseform');
          else if (userRole === 'receptionist') navigate('/addRecep');
          else navigate('/');
        } else {
          // Already submitted form → Go to homepage
          navigate('/');
        }
      }, 1000);}

           else if(response.status===400){
            toast.error("Wrong Password!", {
                position: "top-center",
              });
           }

        }
        catch(error){
            toast.error("Login Failed! Try Again", {
                position: "top-center",
              });
        }
    }

        const handleSignUp=()=>{
        navigate("/");
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
                    onClick={()=>{handleSignUp()}}  >Login</button>
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