import React from 'react'

function Abtus() {
  return (
    <div className="w-full py-5 opacity-80 -mt-16 z-10 relative">
    <div className=" h-[700px] w-full py-5 z-10">
    
      <p className="text-center font-bold text-3xl mt-[70px]">About Us</p>
      <div className=' pb-10 pr-10 pl-10 flex flex-row items-center rounded-2xl  ml-[160px] mr-10 mt-10 w-4/5 gap-5 '>
      <div className=" flex flex-row m-2  shadow-2xl ">
        {/* Image Container */}
        <div className="flex flex-col bg-[#eff6fa] relative">
          <img
            src="https://i.pinimg.com/736x/a0/d6/5a/a0d65a2d7811ca48d680e9045eabda5c.jpg"
            alt="doctor"
            className="h-[270px] w-[250px] mb-1 object-cover rounded-2xl shadow"
          />
          <img
            src="https://i.pinimg.com/736x/a8/75/13/a87513ccd7f58b3592415e4936326cb7.jpg"
            alt="doctor"
            className="h-[150px] w-[250px] w-full object-cover  rounded-2xl shadow"
          />
        </div>

        <div className="flex flex-col  relative">
          <img
            src="https://i.pinimg.com/736x/37/72/2e/37722e6875026f5625eec7beaa965df6.jpg"
            alt="doctor"
            className="h-[150px] w-[250px] ml-1 object-cover rounded-2xl shadow"
          />
          <img
            src="https://i.pinimg.com/736x/fe/62/ca/fe62ca1428deda198243dc072bd9a90b.jpg"
            alt="doctor"
            className="h-[270px] w-[250px] ml-1 mt-1 w-full object-cover  rounded-2xl shadow"
          />
        </div>
      </div>
      <div  className='bg-[#eff6fa] w-[700px] p-7 m-5 text-left mr-10  shadow-2xl rounded-2xl text-sm' >
        Established in 2010, HopeCare Hospital began with a simple yet powerful vision — to provide compassionate, affordable, 
        and high-quality healthcare to all. What started as a modest facility with a handful of dedicated professionals has grown 
        into a trusted name in healthcare, known for its patient-first approach and medical excellence.<br/><br/>
        
        Over the years, we’ve steadily expanded our network by opening multiple branches and specialty centers across the region. Through 
        strategic partnerships, advanced technologies, and a commitment to continuous improvement, HopeCare continues to reach more communities 
        while upholding the core values we were founded upon.<br/><br/>
        
        We are proudly NABH-accredited and ISO 9001:2015 certified, reflecting our unwavering commitment to safety, quality, 
        and global standards of care.<br/><br/>
        
        Today, HopeCare offers a wide range of services including emergency care, diagnostics, surgery, maternity, pediatrics, and 
        chronic disease management — all delivered in a compassionate and respectful environment.<br/><br/>
        
        At HopeCare, we believe healing begins with hope. That’s why we work tirelessly to ensure every patient receives not only the 
        best medical treatment but also the emotional support they need to recover and thrive.<br/>
        <a href="/about" className="text-blue-400 hover:text-blue-700">Learn More</a><br/>

      </div>

      </div>
    </div>
    </div>
  )
}

export default Abtus;
