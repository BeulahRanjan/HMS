import React from 'react'
import { useNavigate } from 'react-router-dom';

function Pform() {
const navigate =useNavigate();
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
           <form className='overflow-y-auto h-80 mt-10'>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-6">
                <div className="flex flex-col">
                <label className="text-lg mb-1">Full Name<span className="text-red-600 ml-1">*</span>:</label>
                <input
                    type="text"
                    placeholder="Enter your name"
                    className="border border-black rounded-md p-2 px-10  bg-transparent placeholder-black"
                />
                </div>
                <div className="flex flex-col">
                <label className="text-lg mb-1">Email<span className="text-red-600 ml-1">*</span>:</label>
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="border border-black rounded-md p-2 px-10 bg-transparent placeholder-black"
                />
                </div>
                <div className="flex flex-col">
                <label className="text-lg mb-1">Phone Number<span className="text-red-600 ml-1">*</span>:</label>
                <input
                    type="text"
                    placeholder="Enter phone number"
                    className="border border-black rounded-md p-2 px-10 bg-transparent placeholder-black"
                />
                </div>
                <div className="flex flex-col">
                <label className="text-lg mb-1">Date of Birth<span className="text-red-600 ml-1">*</span>:</label>
                <input
                    type="date"
                    className="border border-black rounded-md p-2 px-10 bg-transparent placeholder-black"
                />
                </div>
                <div className="flex flex-col">
                <label className="text-lg mb-1">Age<span className="text-red-600 ml-1">*</span>:</label>
                <input
                    type="text"
                    placeholder="Enter phone number"
                    className="border border-black rounded-md p-2 px-10 bg-transparent placeholder-black"
                />
                </div>
                <div className="flex flex-col">
                <label className='text-lg mb-1'>Gender<span className="text-red-600 ml-1">*</span>:</label>
                <select className="w-full px-4 py-2 bg-transparent border border-black rounded-md shadow-sm 
                focus:outline-none focus:ring-2 focus:ring-blue-200"
                defaultValue="">
                <option value="" disabled>Select gender....</option>
                <option value="">Male(HOD)</option>
                <option value="">Female</option>
                <option value="">Other</option>
                </select>
                </div>

                <div className="flex flex-col">
                <label className="text-lg mb-1">Address<span className="text-red-600 ml-1">*</span>:</label>
                <input
                    type="text"
                    placeholder="Enter address"
                    className="border border-black rounded-md p-2 px-10 bg-transparent placeholder-black"
                />
                </div>

                <div className="flex flex-col">
                <label className='text-lg mb-1'>Blood Group<span className="text-red-600 ml-1">*</span>:</label>
                <select className="w-full px-4 py-2 bg-transparent border border-black rounded-md shadow-sm 
                focus:outline-none focus:ring-2 focus:ring-blue-200"
                defaultValue="">
                <option value="" disabled>Select blood group</option>
                <option value="">A+</option>
                <option value="">A-</option>
                <option value="">B+</option>
                <option value="">B-</option>
                <option value="">AB+</option>
                <option value="">AB-</option>
                <option value="">O+</option>
                <option value="">O-</option>
                </select>
                </div>


                <div className="mb-4">
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
    {/* Add other doctors as needed */}
  </select>
</div>

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

