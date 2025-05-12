import React from 'react'

function Dform() {
  return (
    <div className='bg-[#d0e5f1] h-screen w-auto flex items-center justify-center'>
        <div className='flex flex-col items-center justify-center h-4/5 w-2/3 rounded-2xl shadow-2xl'>
         <div className="relative w-full h-full rounded-2xl">
          <img
            src="https://i.pinimg.com/736x/37/ee/40/37ee40c057706ccd60b43e32f6592bf5.jpg"
            alt="Doctor"
            className="w-full h-full object-cover rounded-2xl"
          />
          <div className="absolute rounded-2xl top-0 left-0 w-full h-full bg-[#aad1e6] opacity-75 flex flex-col items-center  px-8 rounded-2xl">
            <h1 className="mt-5 text-3xl font-bold text-blue-700">Welcome, Doctor!</h1>
            <p className="mt-2 text-lg text-center">
            We're thrilled to have you on board. Let's complete your profile so we can better connect you with your patients 
            and streamline your work experience.</p>
            <p className="mt-1 text-md italic">
            “Because healing begins with the right information.”
            </p>
           <form className='overflow-y-auto h-80 mt-10'>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-6">
                <div className="flex flex-col">
                <label className="text-lg mb-1">Full Name:</label>
                <input
                    type="text"
                    placeholder="Enter your name"
                    className="border border-black rounded-md p-2 px-10  bg-transparent placeholder-black"
                />
                </div>
                <div className="flex flex-col">
                <label className="text-lg mb-1">Email:</label>
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="border border-black rounded-md p-2 px-10 bg-transparent placeholder-black"
                />
                </div>
                <div className="flex flex-col">
                <label className="text-lg mb-1">Phone Number:</label>
                <input
                    type="text"
                    placeholder="Enter phone number"
                    className="border border-black rounded-md p-2 px-10 bg-transparent placeholder-black"
                />
                </div>
                <div className="flex flex-col">
                <label className="text-lg mb-1">Date of Birth:</label>
                <input
                    type="date"
                    className="border border-black rounded-md p-2 px-10 bg-transparent placeholder-black"
                />
                </div>
                <div className="flex flex-col">
                <label className="text-lg mb-1">Department</label>
                <input
                    type="text"
                    placeholder="Enter your department"
                    className="border border-black rounded-md p-2 px-10 bg-transparent placeholder-black"
                />
                </div>
                <div className="flex flex-col">
                <label className="text-lg mb-1">Specialization</label>
                <input
                    type="text"
                    placeholder="Enter your specialization"
                    className="border border-black rounded-md p-2 px-10 bg-transparent placeholder-black"
                />
                </div>
                <div className="flex flex-col">
                <label className="text-lg mb-1">Experience</label>
                <input
                    type="text"
                    placeholder="Enter your experience in yrs.."
                    className="border border-black rounded-md p-2  bg-transparent placeholder-black"
                />
                </div>
                <div className="flex flex-col">
                <label className='text-lg mb-1'>Status</label>
                <select className="w-full px-4 py-2 bg-transparent border border-black rounded-md shadow-sm 
                focus:outline-none focus:ring-2 focus:ring-blue-200"
                defaultValue="">
                <option value="" disabled>Select your status in dept....</option>
                <option value="">Head of Department (HOD)</option>
                <option value="">Senior Consultant</option>
                <option value="">Attending Physician</option>
                <option value="">Head Surgeon</option>
                <option value="">Consultant Surgeon</option>
                <option value="">Specialist Doctor</option>
                <option value="">Medical Intern</option>
                </select>
                </div>

                <div className="flex flex-col">
                <label className='text-lg mb-1'>Gender</label>
                <select className="w-full px-4 py-2 bg-transparent border border-black rounded-md shadow-sm 
                focus:outline-none focus:ring-2 focus:ring-blue-200"
                defaultValue="">
                <option value="" disabled>Select your status in dept....</option>
                <option value="">Male(HOD)</option>
                <option value="">Female</option>
                <option value="">Other</option>
                </select>
                </div>

                <div className="flex flex-col">
                <label className='text-lg mb-1'>Shift</label>
                <select className="w-full px-4 py-2 bg-transparent border border-black rounded-md shadow-sm 
                focus:outline-none focus:ring-2 focus:ring-blue-200"
                defaultValue="">
                <option value="" disabled>Select your status in dept....</option>
                <option value="">Morning</option>
                <option value="">Afternoon</option>
                <option value="">Evening</option>
                <option value="">Night</option>
                </select>
                </div>
            </div>
             <button className='m-10  ml-[270px] p-2 px-4 rounded-lg bg-blue-400 hover:bg-blue-700'>Submit</button>
           </form>
          
          </div>
         </div>
        </div>
    </div>
  )
}

export default Dform;

