import React from 'react';
import { useState } from 'react';
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

function Dpage() {

    const [filters, setFilters] = useState({
  status: '',
  timeSlot: '', // new field
});

const isTimeInSlot = (time, slot) => {
  const [hour, modifier] = time.split(/[: ]/);
  let h = parseInt(hour);
  if (modifier === 'PM' && h !== 12) h += 12;
  if (modifier === 'AM' && h === 12) h = 0;

  if (slot === 'morning') return h >= 8 && h < 12;
  if (slot === 'afternoon') return h >= 12 && h < 16;
  if (slot === 'evening') return h >= 16 && h < 20;
  if (slot === 'night') return h>=20 && h <=24;
  return true;
};



  const filteredAppointments = appointments.filter((appt) => {
  const matchesDate = filters.date ? appt.date === filters.date : true;
  const matchesStatus = filters.status ? appt.status === filters.status : true;
  const matchesName = filters.patientName
    ? appt.name.toLowerCase().includes(filters.patientName.toLowerCase())
    : true;
  const matchesTime =
    filters.timeSlot !== '' ? isTimeInSlot(appt.time, filters.timeSlot) : true;

  return matchesStatus &&  matchesTime;
});

function updateAppointmentsToInProcess(appointments) {
  const now = new Date();
  const currentTime = now.toTimeString().slice(0, 5); // Format: "HH:MM"

  return appointments.map((appt) => {
    // Assuming appt.time is also in "HH:MM" format
    if (appt.status === "Pending" && appt.time === currentTime) {
      return { ...appt, status: "In Process" };
    }
    return appt;
  });
}



  return (
    <div className='flex '>
      <Sidebar role={"doctor"} />
      <div className='flex flex-col'>
        <div className="bg-[#eff6fa] p-4 flex items-center justify-between w-[1450px] h-[70px] ml-[70px]">
          <div className='flex flex-row gap-3'>
          <img src='' alt='' className='w-12 h-12 rounded-full border-2 border-black'/>
          <div className='flex flex-col'>
            <p>Dr.Rajeev Kumar</p>
            <p>Neurologist</p>
          </div>
          <div className='flex flex-col ml-[1100px]'>
          <p>Date: {new Date().toLocaleDateString()}</p>
          <p>Time: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
          </div>
          </div>
        </div>
        <img src='https://i.pinimg.com/736x/1d/8f/8f/1d8f8faed281703de0d2f87c88def6a3.jpg' alt='' className='w-screen h-screen object-cover'/>
        <div className='absolute top-0 left-0 w-[1446px] h-screen bg-gradient-to-l  
        from-[#e3f0f7]/60 to-[#e3f0f7]/60 mt-[70px] ml-[75px] '>
        <div className='ml-[170px] mt-[20px]'>
        
        <select
        value={filters.timeSlot}
        onChange={(e) => setFilters({ ...filters, timeSlot: e.target.value })}
        className="border border-blue-300 px-3 py-2 rounded-md ml-10 bg-transparent">
        <option value="">All Time Slots</option>
        <option value="morning">Morning (8 AM – 12 PM)</option>
        <option value="afternoon">Afternoon (12 PM – 4 PM)</option>
        <option value="evening">Evening (4 PM – 8 PM)</option>
        <option value="night">Night (8 PM - 12 AM)</option>
        </select>

        <select
        value={filters.status}
        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        className="border border-blue-300 px-3 py-2 rounded-md ml-4 bg-transparent">
        <option value="">All Status</option>
        <option value="Confirmed">Confirmed</option>
        <option value="Pending">Pending</option>
        <option value="Cancelled">Cancelled</option>
        <option value="Completed">Completed</option>
      </select>



          <table className="mx-10 mt-10 w-[1070px] table-auto border-collapse border border-blue-300 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-[#eff6fa]">
            <tr>
              <th className="px-4 py-2 border border-blue-300 text-center">Sr.No.</th>
              <th className="px-4 py-2 border border-blue-300 text-center">Timing</th>
              <th className="px-4 py-2 border border-blue-300 text-center">Patient Name</th>
              <th className="px-4 py-2 border border-blue-300 text-center">Age</th>
              <th className="px-4 py-2 border border-blue-300 text-center">Gender</th>
              <th className="px-4 py-2 border border-blue-300 text-center">Phone No.</th>
              <th className="px-4 py-2 border border-blue-300 text-center">Status of Appointment</th>
            </tr>
          </thead>
          <tbody>
          {filteredAppointments.map((appt, index) => (
            <tr key={appt.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border border-blue-300 text-center">{index + 1}</td>
              <td className="px-4 py-2 border border-blue-300 text-center">{appt.time}</td>
              <td className="px-4 py-2 border border-blue-300 text-center">{appt.name}</td>
              <td className="px-4 py-2 border border-blue-300 text-center">{appt.age}</td>
              <td className="px-4 py-2 border border-blue-300 text-center">{appt.gender}</td>
              <td className="px-4 py-2 border border-blue-300 text-center">1234567890</td> {/* Replace with real phone number if available */}
              <td
                className={`px-4 py-2 border border-blue-300 text-center font-semibold ${
                  appt.status === 'Confirmed'
                    ? 'text-green-600'
                    : appt.status === 'Pending'
                    ? 'text-yellow-600'
                    : appt.status === 'Cancelled'
                    ? 'text-red-600'
                    : 'text-blue-600'
                }`}
              >
                {appt.status}
              </td>
            </tr>
          ))}
        </tbody>

        </table>


          </div>
        </div>
      </div>
    </div>
  )
}

export default Dpage;