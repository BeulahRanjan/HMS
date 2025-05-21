import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Navbar() {
  const navigate = useNavigate();
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const val = Cookies.get('hasSubmittedForm');
    if (val === 'true') {
      setHasSubmitted(true);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleProfileClick = () => {
    const val = Cookies.get('role');
    if(val === 'doctor')
      navigate('/doctor');
    else
    navigate('/recep');
  };

  const handleLogout = () => {
    Cookies.remove('hasSubmittedForm');
    setHasSubmitted(false);
    setShowDropdown(false);
    navigate('/signup');
  };

  return (
    <div className='flex flex-row ml-10 p-2 mr-10 px-2 relative'>
      <div className='font-bold text-white text-xl ml-[77px]'>HopeCare</div>
      <ul className='flex flex-row ml-[500px]'>
        <li className='ml-10 text-white font-bold text-lg cursor-pointer'>Home</li>
        <li className='ml-10 text-white font-bold text-lg cursor-pointer'>About Us</li>
        <li className='ml-10 text-white font-bold text-lg cursor-pointer'>Departments</li>
        <li className='ml-10 text-white font-bold text-lg cursor-pointer'>Doctors</li>
        <li className='ml-10 text-white font-bold text-lg cursor-pointer'>Contact Us</li>

        <li
          className='ml-10 text-white font-bold text-lg cursor-pointer relative'
          onClick={() => {
            if (hasSubmitted) {
              setShowDropdown((prev) => !prev);
            } else {
              navigate('/signup');
            }
          }}
        >
          {hasSubmitted ? 'My Profile' : 'Sign in'}

          {showDropdown && (
            <ul
              className='absolute right-0 mt-2 bg-white text-black shadow-md rounded-md w-40 z-10'
              ref={dropdownRef}
            >
              <li
                className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
                onClick={handleProfileClick}
              >
                View Appointments
              </li>
              <li
                className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
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
