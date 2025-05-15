import React from 'react';
import { useState } from 'react';


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



  return (
    <div>
        <div className='bg-[#eff6fa] p-2  flex flex-row gap-3'>
            <img src='' alt='' className='w-12 h-12 rounded-full border-2 border-black ml-3 '/>
            <div className='flex flex-col'>
            <p>Dr. Rajeev Kumar</p>
            <p>Neurologist</p>
            </div>
            <div className='flex flex-col ml-[1180px]'>
              <p>Date: {new Date().toLocaleDateString()}</p>
              <p>Time: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
        </div>
        <img src='https://i.pinimg.com/736x/1d/8f/8f/1d8f8faed281703de0d2f87c88def6a3.jpg' alt=''
        className='w-full h-screen '/>
        <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-l mt-[63px] from-[#e9f3f8]/90 to-[#e9f3f8]/90  opacity-80'>
          <select
          value={filters.timeSlot}
          onChange={(e) => setFilters({ ...filters, timeSlot: e.target.value })}
          className="border px-3 py-2 rounded-md mt-10 ml-10 mr-10"
        >
          <option value="">All Time Slots</option>
          <option value="morning">Morning (8 AM – 12 PM)</option>
          <option value="afternoon">Afternoon (12 PM – 4 PM)</option>
          <option value="evening">Evening (4 PM – 8 PM)</option>
          <option value="night">Night (8 PM - 12 AM) </option>
          </select>
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="border px-3 py-2 rounded-md"
          >
            <option value="">All Status</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Rescheduled">Rescheduled</option>
          </select>
          <div>
          <table className="mx-10 mt-10 w-full max-w-[1450px] table-auto  shadow-lg
          overflow-hidden">
            <thead className="bg-[#d6e9f3] ">
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
                  <tr key={appt.id} className="hover:bg-blue-200">
                    <td className="px-4 py-2 border border-blue-300 text-center">{index + 1}</td>
                    <td className="px-4 py-2 border border-blue-300 text-center">{appt.time}</td>
                    <td className="px-4 py-2 border border-blue-300 text-center">{appt.name}</td>
                    <td className="px-4 py-2 border  border-blue-300 text-center">{appt.age}</td>
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
  )
}

export default Dpage;