import React from 'react';
// import SearchIcon from '@mui/icons-material/Search';

function Navbar() {
  return (
    <div className='flex flex-row ml-10   mr-10 px-2 '>
        <div className='font-bold text-black text-xl'>HopeCare</div>
        <div>
            <div>
                <ul className='flex flex-row ml-[600px] '>
                    <li className='ml-10 text-black font-bold text-lg'>Home</li>
                    <li className='ml-10 text-black font-bold text-lg'>About Us</li>
                    <li className='ml-10 text-black font-bold text-lg'>Departments</li>
                    <li className='ml-10 text-black font-bold text-lg'>Doctors</li>
                    <li className='ml-10 text-black font-bold text-lg'>Contact Us</li>
                    {/* <li className='ml-10'>
                        <SearchIcon className='text-black' />
                    </li> */}
                </ul>
            </div>
        </div>
    </div>
  );
}

export default Navbar;
