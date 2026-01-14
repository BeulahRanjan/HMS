import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#398ebc]/90 via-[#5fa8cf]/30 to-[#e3f0f7]/50 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Logo & Tagline */}
        <div>
          <h2 className="text-2xl text-blue-700 font-bold mt-10 ">HopeCare </h2>
          <h2 className="text-2xl text-blue-700 font-bold ml-2 mb-2"> Hospital</h2>

        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-white text-lg mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:underline text-blue-700">Home</a></li>
            <li><a href="/about" className="hover:underline text-blue-700">About Us</a></li>
            <li><a href="/departments" className="hover:underline text-blue-700">Departments</a></li>
            <li><a href="/contact" className="hover:underline text-blue-700">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Contact</h3>
          <p className="text-sm text-blue-700">📍 Mumbai, Maharashtra</p>
          <p className="text-sm text-blue-700">📞 +91 98765 43210</p>
          <p className="text-sm text-blue-700">✉️ support@lifelinehospitals.com</p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Follow Us</h3>
          <div className="flex space-x-4 text-blue-500 text-xl">
            <a href="#"><FacebookIcon className="hover:text-blue-300" /></a>
            <a href="#"><XIcon className="hover:text-blue-300" /></a>
            <a href="#"><InstagramIcon className="hover:text-blue-300" /></a>
            <a href="#"><LinkedInIcon className="hover:text-blue-300" /></a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-blue-800 mt-10 pt-4 text-center text-sm text-blue-700">
        &copy; {new Date().getFullYear()} Lifeline Hospitals. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
