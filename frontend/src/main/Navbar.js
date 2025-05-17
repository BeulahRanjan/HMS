import React from 'react';
import { useNavigate } from 'react-router-dom';
// import SearchIcon from '@mui/icons-material/Search';

function Navbar() {

    const navigate= useNavigate();
  return (
    <div className='flex flex-row ml-10 p-2  mr-10 px-2 '>
        <div className='font-bold text-white text-xl ml-[77px]'>HopeCare</div>
        <div>
            <div>
                <ul className='flex flex-row ml-[500px] '>
                    <li className='ml-10 text-white font-bold text-lg'>Home</li>
                    <li className='ml-10 text-white font-bold text-lg'>About Us</li>
                    <li className='ml-10 text-white font-bold text-lg'>Departments</li>
                    <li className='ml-10 text-white font-bold text-lg'>Doctors</li>
                    <li className='ml-10 text-white font-bold text-lg'>Contact Us</li>
                    <li className='ml-10 text-white font-bold text-lg' onClick={() => navigate('/signup')}>Sign in</li>
                    {/* <li className='ml-10'>
                        <SearchIcon className='text-white' />
                    </li> */}
                </ul>
            </div>
        </div>
    </div>
  );
}

export default Navbar;
