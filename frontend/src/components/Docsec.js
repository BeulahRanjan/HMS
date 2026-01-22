import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useState, useEffect} from 'react';
import axios from "axios";
import Cookies from "js-cookie";



function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="absolute right-[0px] top-1/2 transform -translate-y-1/2 z-10 bg-blue-100 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer shadow-md"
      onClick={onClick}
    >
      <ChevronRightIcon />
    </div>
  );
}


function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="absolute left-[0px] top-1/2 transform -translate-y-1/2 z-10 bg-blue-100 text-black w-10 h-10 flex items-center justify-center rounded-full cursor-pointer shadow-md"
      onClick={onClick}
    >
      <ChevronLeftIcon />
    </div>
  );
}

function Docsec() {

    const [doctors, setDoctors] = useState([]);
  
const fetchDoctors = async () => {
  try {
    const res = await axios.get("http://localhost:5000/getAllDoctors", {
      headers: {
        Authorization: `Bearer ${Cookies.get("authToken")}`,
      },
    });

    setDoctors(res.data.doctors);
    console.log("Doctors fetched:", res.data.doctors);
  } catch (error) {
    console.error("Error fetching doctors:", error);
  }
};

useEffect(() => {
  fetchDoctors();
}, []);



  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };


  return ( 
    <div className="w-full h-[550px]  bg-gradient-to-b from-white  to-[#cae2ef]  bg-white/20 backdrop-blur-xl rounded-lg">
      <p className="text-3xl font-bold text-center pt-10 pb-5"> Our Doctors</p>
    <div className="relative ">
      <Slider {...settings}>
         {doctors.map((doc) => (
          <div className="ml-[100px]">
    <div
  key={doc._id}
  className="w-[270px]  bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 flex flex-col overflow-hidden"
>
  {/* Image */}
  <div className="h-[190px] w-full overflow-hidden">
    <img
      src={
        doc?.profileImage
          ? `http://localhost:5000${doc.profileImage}?t=${Date.now()}`
          : "/default-doctor.png"
      }
      alt={doc.name}
      className="w-full h-full object-cover hover:scale-105 transition duration-300"
    />
  </div>

  {/* Content */}
  <div className="p-5 flex flex-col flex-grow text-center">
    <h2 className="text-xl font-bold text-gray-800">{doc.name}</h2>

    <p className="text-blue-600 font-semibold">{doc.department?.name}</p>

    <p className="text-sm text-gray-600 mt-1">{doc.specialization}</p>

    <div className="mt-2 text-sm text-gray-700">
      <strong>Experience:</strong> {doc.experience}
    </div>

    <p className="text-sm text-gray-600 mt-3 line-clamp-3">
      {doc.description}
    </p>

    <button className="mt-auto bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
      View Profile
    </button>
  </div>
</div>
</div>

  ))}<br></br>
      </Slider>
    </div>


  
 




    </div>
  );
}

export default Docsec;
