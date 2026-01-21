import React from 'react'

const specializations = [
  { name: "Cardiology", icon: "/icons/heart-organ.svg" },
  { name: "Neurology", icon: "/icons/neurology.svg" },
  { name: "Orthopaedics", icon: "/icons/orthopaedics.svg" },
  { name: "Ophthalmology", icon: "/icons/opthalmology.svg" },
  { name: "Dermatology", icon: "/icons/skin-cancer.svg" },
  { name: "Gynecology", icon: "/icons/gynecology.svg" },
  { name: "ENT", icon: "/icons/ear-nose_throat.svg" },
  { name: "Hematology", icon: "/icons/hematology.svg" },
  { name: "Oncology", icon: "/icons/oncology.svg" },
  { name: "Nephrology", icon: "/icons/kidneys.svg" },
  { name: "Pulmonology", icon: "/icons/lungs.svg" },
  { name: "Gastroenterology", icon: "/icons/gastroenterology.svg" },
  { name: "Endocrinology", icon: "/icons/endocrinology.svg" },
  { name: "Dentistry", icon: "/icons/tooth.svg" },
  { name: "Pharmacy", icon: "/icons/medicines.svg" },
];


function Dsec() {
  return (
    <div className='bg-gradient-to-b from-[#e9f3f8] to-white  h-[550px]'>
        <div className='font-bold text-3xl text-center pt-7 '>Our Departments</div>
        <p className='text-center mt-7 font-semibold text-xl'>Explore our departments below and discover how HopeCare is committed to healing with 
            excellence and heart.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-5 gap-x-10 mt-10 absolute ml-[370px] ">
  {specializations.map((item) => (
    <div key={item.name} className="flex flex-col items-center  ">
      <div className="border-2 border-blue-300 p-3 rounded-full shadow-xl hover:scale-105 transition ">
        <img src={item.icon} alt={item.name} className="w-14 h-14" />
      </div>
      <p className="font-medium">{item.name}</p>
    </div>
  ))}
</div>


    </div>
  )
}

export default Dsec