import React from 'react';
import { useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Sidebar from './Sidebar';

const appointments = [
  {
    id: 1,
    date: '2025-05-15',
    time: '10:00 AM',
    name: 'John Doe',
    status: 'Confirmed',
    age: 30,
    gender: 'Male'
  },
  {
    id: 2,
    date: '2025-05-15',
    time: '9:00 AM',
    name: 'Jane Smith',
    status: 'Pending',
    age: 25,
    gender: 'Female'
  },
  {
    id: 3,
    date: '2025-05-15',
    time: '12:00 PM',
    name: 'Bob Johnson',
    status: 'Cancelled',
    age: 40,
    gender: 'Male'
  },
  {
    id: 4,
    date: '2025-05-15',
    time: '01:00 PM',
    name: 'Alice Brown',
    status: 'Completed',
    age: 29,
    gender: 'Female'
  },
  {
    id: 5,
    date: '2025-05-15',
    time: '09:00 PM',
    name: 'Charlie Davis',
    status: 'Confirmed',
    age: 35,
    gender: 'Male'
  },
  {
    id: 6,
    date: '2025-05-15',
    time: '03:00 PM',
    name: 'Diana Evans',
    status: 'Pending',
    age: 28,
    gender: 'Female'
  },
  {
    id: 7,
    date: '2025-05-15',
    time: '04:00 PM',
    name: 'Ethan Foster',
    status: 'Cancelled',
    age: 32,
    gender: 'Male'
  }
];

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


function Rpage() {


  const [currentSection, setCurrentSection] = useState('dashboard');
  const [filters, setFilters] = useState({
  status: '',
  timeSlot: '', // new field
});
 const navigate =useNavigate();

        const handlePatient=()=>{
        navigate("/addPatient");
    }

     const handleAppt=()=>{
        navigate("/addAppt");
    }


const isTimeInSlot = (time, slot) => {
  const [rawHour, rawMinuteModifier] = time.split(':'); // "04", "00 PM"
  const [minute, modifier] = rawMinuteModifier.split(' ');
  let h = parseInt(rawHour);
  if (modifier === 'PM' && h !== 12) h += 12;
  if (modifier === 'AM' && h === 12) h = 0;

  if (slot === 'morning') return h >= 8 && h < 12;
  if (slot === 'afternoon') return h >= 12 && h < 16;
  if (slot === 'evening') return h >= 16 && h <= 20;
  if (slot === 'night') return h>=20 && h<=24; 
  return true;
};


const filteredAppointments = appointments.filter((appt) => {
  
  const matchesStatus = filters.status ? appt.status === filters.status : true;

  const matchesTime =
    filters.timeSlot !== '' ? isTimeInSlot(appt.time, filters.timeSlot) : true;

  return  matchesStatus && matchesTime;
});
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getAllPat', {
          headers: {
            Authorization: `Bearer ${Cookies.get('authToken')}`,
          },
        });
        console.log(response.data.patients);
        setPatients(response.data.patients);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, []);

  return (


        <div className="flex">
      <Sidebar onNavigate={setCurrentSection} />
      <div className="ml-[100px] p-6 w-full">
        {currentSection === 'dashboard' && <div>Welcome to Dashboard</div>}
        {currentSection === 'patients' && 
        <div> 
        <button  className='ml-[150px] mt-5 bg-blue-300  w-[80px] rounded-md p-2 hover:bg-blue-400'
        onClick={()=>{handlePatient()}}  >Add Patient
        </button>
          <div className="p-4">
      <h2 className="text-xl ml-[150px] font-bold mb-4">Patient List</h2>
      <table className="ml-[100px] mx-10 mt-10 w-[1100px] table-auto  shadow-xl
          overflow-hidden">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Age</th>
            <th className='border px-4 py-2'>Email</th>
            <th className="border px-4 py-2">Gender</th>
            <th className='border px-4 py-2'>Address</th>
            <th className="border px-4 py-2">Contact</th>
            <th className='border px-4 py-2'>By</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(patients) && patients.map((pat, index) => (
            <tr key={index}>
              <td className="border text-center px-4 py-2">{pat.name}</td>
              <td className="border text-center px-4 py-2">{pat.age}</td>
              <td className='border text-center px-4 py-2'>{pat.email}</td>
              <td className="border text-center px-4 py-2">{pat.gender}</td>
              <td className='border text-center px-4 py-2'>{pat.address}</td>
              <td className="border text-center px-4 py-2">{pat.phone_no}</td>
              <td className='border text-center px-4 py-2'>{pat.created_by.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  
        </div>}
        {currentSection === 'appointments' && 
        <div>  
          
           <button  className='ml-[150px] mt-5 bg-blue-300  w-[100px] rounded-md p-2 hover:bg-blue-400'
        onClick={()=>{handleAppt()}}  >Add Appointment
        </button>
        </div>}
        {currentSection === 'doctors' && 
        <div>
          <div className="w-full min-h-screen bg-gradient-to-b from-[#e3f0f7] to-[#eff6fa] py-10 px-6 ">
      <p className="text-3xl font-bold text-center mb-8">Our Doctors</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
        {doct.map((doc, index) => (
          <div key={index} className="w-[270px] bg-blue-200 rounded-lg flex flex-col text-center p-4 
          shadow-md hover:shadow-xl transition duration-300">
            <img
              src={doc.img}
              alt={doc.name}
              className="w-[240px] h-[180px] mb-4 rounded-lg object-cover hover:scale-105 transition duration-300"
            />
            <h2 className="text-xl font-bold mb-1">{doc.name}</h2>
            <p className="text-lg font-semibold mb-2">{doc.dept}</p>
            <p className="text-sm mb-1"><strong>Experience:</strong> {doc.experience}</p>
            <p className="text-sm mb-2">
              <strong>Rating:</strong> {doc.rating} ⭐
            </p>
            <p className="text-sm text-justify overflow-y-auto px-2 scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-blue-100">
              {doc.desc} <a href="/" className="text-blue-700">Read More</a>
            </p>
          </div>
        ))}
      </div>
          </div>
        </div>}
        {currentSection === 'profile' && <div >Hello, I'm back!!!</div>}
      </div>
    </div>

  )
}

export default Rpage;