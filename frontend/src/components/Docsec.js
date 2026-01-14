import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';


const doct = [
  {
    img: "https://i.pinimg.com/736x/c8/1c/c5/c81cc548ebf9b7ad5e2bb5c666e7dfcc.jpg", 
    name: "Dr. Anjali Mehta",
    dept: "Cardiology",
    experience: "10+ years",
    rating: 4.9,
    desc: "Specialist in heart diseases with over 10 years of experience treating complex cardiovascular conditions."
  },
  {
    img: "https://i.pinimg.com/736x/44/f0/cd/44f0cd0a70468a149d2bcd4836d7e93c.jpg", 
    name: "Dr. Rajeev Kumar",
    dept: "Neurology",
    experience: "8+ years",
    rating: 4.8,
    desc: "Expert in neurological disorders including epilepsy, stroke, and multiple sclerosis."
  },
  {
    img: "https://i.pinimg.com/736x/47/1d/97/471d978af65fe65ec1fd7e9647ce2ab7.jpg", 
    name: "Dr. Neha Sharma",
    dept: "Orthopedics",
    experience: "11+ years",
    rating: 4.7,
    desc: "Experienced orthopedic surgeon specializing in joint replacement and sports injuries."
  },
  {
    img: "https://i.pinimg.com/736x/6c/6e/d7/6c6ed7f4011b7f926b3f1505475aba16.jpg", 
    name: "Dr. Arvind Patel",
    dept: "Pediatrics",
    experience: "15+ years",
    rating: 4.6,
    desc: "Trusted pediatrician caring for children's health and development from infancy to adolescence."
  },
  {
    img: "https://i.pinimg.com/736x/6c/59/95/6c599523460f54ddeba81f3cd689ae04.jpg", 
    name: "Dr. Priya Desai",
    dept: "Dermatology",
    experience: "8+ years",
    rating: 4.5,
    desc: "Skin specialist with a focus on acne, eczema, and cosmetic dermatological treatments."
  },
  {
    img: "https://i.pinimg.com/736x/4f/e6/13/4fe613b07575cb969aef68498ad342f1.jpg", 
    name: "Dr. Karan Verma",
    dept: "Radiology",
    experience: "20+ years",
    rating: 4.4,
    desc: "Radiologist skilled in diagnostic imaging, including X-rays, MRIs, and CT scans."
  },
  {
    img: "https://i.pinimg.com/736x/e6/44/1f/e6441fea7bfedba0cda5a56d7fdbc71d.jpg", 
    name: "Dr. Shalini Nair",
    dept: "Oncology",
    experience: "11+ years",
    rating: 4.3,
    desc: "Compassionate oncologist dedicated to the treatment and care of cancer patients."
  }
];


// Custom Next Arrow
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

// Custom Prev Arrow
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

  //bg-gradient-to-b from-[#e3f0f7] to-[#eff6fa]
  return ( 
    <div className="w-full h-[550px]  bg-gradient-to-b from-white  to-[#cae2ef]  bg-white/20 backdrop-blur-xl rounded-lg">
      <p className="text-3xl font-bold text-center pt-10 pb-5"> Our Doctors</p>
    <div className="relative ">
      <Slider {...settings}>
        {doct.map((doc, index) => (
          <div key={index} className="p-4">
  <div className="w-[270px] h-[400px] bg-white/20 backdrop-blur-md rounded-2xl flex flex-col text-center p-4 
    shadow-lg border border-white/30 hover:scale-105 transition-transform duration-300 hover:shadow-2xl">
    
    <img
      src={doc.img}
      alt={doc.name}
      className="w-[220px] h-[150px] object-cover mx-auto mb-4 rounded-xl shadow-md 
        transition-transform duration-300 hover:scale-105"
    />
    
    <h2 className="text-xl font-bold text-black mb-1">{doc.name}</h2>
    <p className="text-blue-500 font-semibold text-md mb-1">{doc.dept}</p>
    
    <div className="text-sm text-black-100 mb-1">
      <strong className="font-medium text-black">Experience:</strong> {doc.experience}
    </div>

    <div className="text-sm text-black-100 mb-2">
      <strong className="font-medium text-black">Rating:</strong> {doc.rating} <span className="text-yellow-400">★</span>
    </div>
    
    <p className="text-sm text-black/90 text-justify overflow-y-auto px-2 scrollbar-thin 
      scrollbar-thumb-blue-600 scrollbar-track-blue-100 h-[100px] rounded-md">
      {doc.desc} <a href="/" className="text-blue-600 font-medium hover:underline">Read More</a>
    </p>
  </div>
</div>

        ))}
      </Slider>
    </div>


  
 




    </div>
  );
}

export default Docsec;
