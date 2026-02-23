import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Navbar() {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
    const role = localStorage.getItem('role'); 

 // doctor | admin | receptionist | patient

  // check login / submission state
  useEffect(() => {
    const submitted = Cookies.get('hasSubmittedForm');
    setHasSubmitted(submitted === 'true');
  }, []);

  // close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleProfileClick = () => {
    if (role === 'doctor') navigate('/doctor');
    else if (role === 'receptionist') navigate('/recep');
    else if (role === 'admin') navigate('/admin');
  };

  const handleLogout = () => {
    Cookies.remove('hasSubmittedForm');
    Cookies.remove('role');
    localStorage.clear();
    setShowDropdown(false);
    setHasSubmitted(false);
    navigate('/signup', { replace: true }); // 🔥 FIX
    window.location.reload();
  };

  const handleAuthClick = () => {
  if (!role) {
    navigate('/signup');
    return;
  }

  if (role === 'patient') {
    handleLogout();
    return;
  }

  setShowDropdown(prev => !prev);
};

  return (
    <div className="flex flex-row ml-10 p-2 mr-10 px-2 relative">
      <div className="font-bold text-white text-xl ml-[77px]">HopeCare</div>

      <ul className="flex flex-row ml-[430px]">
        <li onClick={() => navigate('/givefeedback')} className="ml-10 text-white font-bold text-lg cursor-pointer">Give Feedback</li>
        <li className="ml-10 text-white font-bold text-lg cursor-pointer">About Us</li>
        <li className="ml-10 text-white font-bold text-lg cursor-pointer">Departments</li>
        <li onClick={() => navigate('/doctors')} className="ml-10 text-white font-bold text-lg cursor-pointer">Doctors</li>
        <li className="ml-10 text-white font-bold text-lg cursor-pointer">Contact Us</li>

        {/* AUTH SECTION */}
        <li
          className="ml-10 text-white font-bold text-lg cursor-pointer relative"
          onClick={handleAuthClick}
        >
          {role
  ? role === 'patient'
    ? 'Logout'
    : 'My Profile'
  : 'Signin'}

          {/* Dropdown ONLY for non-patient users */}
          {showDropdown && role !== 'patient' && (
            <ul
              ref={dropdownRef}
              className="absolute right-0 mt-2 bg-white text-black shadow-md rounded-md w-40 z-10"
            >
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={handleProfileClick}
              >
                View Appointments
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
}

export default Navbar;