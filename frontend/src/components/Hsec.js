import React from 'react';
// import { initFlowbite } from 'flowbite';
import Navbar from '../main/Navbar';

function Hsec() {
  return (
 
    <div className='relative '>
      <div className=" top-0 left-0 w-full h-full bg-gradient-to-r from-[#5fa8cf]/90 via-[#aad1e6]/60 to-transparent  opacity-80">
       <Navbar/>
     </div>
    <div className="relative w-full h-[600px] ">
       
      <img
        src="https://i.pinimg.com/736x/f9/84/2d/f9842d5ae63275b3620e90085e8e0a04.jpg"
        alt="hospital"
        className="w-full h-full object-cover"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#5fa8cf]/90 via-[#aad1e6]/60 to-transparent  opacity-80">
        <div className="flex flex-col items-start justify-center h-full px-6 md:px-16 ">
            <h1 className='text-7xl font-bold text-blue-700 mb-10 ml-[100px] mt-[-50px] text-center'>Welcome to <br/> HopeCare</h1>
            <h2 className="text-3xl font-bold text-blue-600 mb-10 text-center ml-[70px]">
                Compassionate Care, Trusted Healing
            </h2>
            <p className="text-center text-lg md:text-xl text-gray-800 max-w-2xl mb-5">
                At HopeCare, we’re more than a hospital — we’re your partner in health. From everyday checkups to life-saving treatments
                , our expert team is here with compassion, innovation, and unwavering support. Because your life, your family, and your 
                future matter.
            </p>
            <p className="mt-4 ml-[90px] italic text-md text-gray-700 text-center">
                “Together, we build a healthier tomorrow — one patient at a time.”
            </p>
            </div>

      </div>

       
    </div>
    <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-10">
      <svg
      className="relative block w-[calc(100%+1.3px)] h-[100px]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 100"
      preserveAspectRatio="none" >
      <path
        d="M0,0V46.29c47.29,22,98.4,29.05,146.29,17.9C230.38,46.93,284.7,0,339.42,0s113.85,43.84,180.17,49.54C603.57,55.86,657,18.25,720,5.6c57.38-11.4,114.72,8.89,172.21,18.44C953.17,33.59,1012.23,18,1069.44,7.35,1118.58-1.74,1166.45,0,1200,0V120H0Z"
        fill="#ffffff"></path>
        </svg>
      </div>
</div>
        


  );
}

export default Hsec;
