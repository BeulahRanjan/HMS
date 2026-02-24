import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Sidebar = ({ onNavigate, role }) => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleSidebar = () => setCollapsed(!collapsed);

  // Menu items for doctor
  const docItems = [
    // { label: 'Home', value: 'home', icon: '🏠' },
    { label: 'Reviews', value: 'reviews', icon: '🧾' },,
    { label: 'Appointments', value: 'appointments', icon: '📅' },
    { label: 'Profile', value: 'profile', icon: '🧑‍⚕️' }
  ];

  // Menu items for receptionist
  const recepItems = [
    // { label: 'Home', value: 'home', icon: '🏠' },
    { label: 'Profile', value: 'profile', icon: '📊' },
    { label: 'Patients', value: 'patients', icon: '🧾' },
    { label: 'Appointments', value: 'appointments', icon: '📅' },
    { label: 'Doctors', value: 'doctors', icon: '🧑‍⚕️' }
  ];
   const adminItems = [
    // { label: 'Home', value: 'home', icon: '🏠' },
    { label: 'departments', value: 'departments', icon: '📊' },
    // { label: 'Dashboard', value: 'dashboard', icon: '🧾' },
    // { label: 'Doctors', value: 'doctors', icon: '🧑‍⚕️' }
  ];

  const links = role === 'doctor' ? docItems : role === 'admin' ? adminItems : recepItems;
  // Handles click on a menu item
  const handleClick = (value) => {
    if (!value) return;

    const normalized = value.toLowerCase();
    if (normalized === 'home') {
      // Navigate to homepage
      onNavigate && onNavigate('home');
    } else {
      onNavigate && onNavigate(normalized);
    }
  };

  return (
    <div
      className={`fixed h-screen ${collapsed ? 'w-20' : 'w-64'} bg-[#eff6fa] p-4 transition-all duration-300 shadow-md z-10`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-xl font-bold ${collapsed ? 'hidden' : 'block'}`}>
          {role === 'doctor' ? 'Doctor Panel' : role === 'admin' ? 'Admin Panel' : 'Reception Panel'}
        </h2>
        <button onClick={toggleSidebar} className="text-xl">
          {collapsed ? <MenuIcon /> : <CloseIcon />}
        </button>
      </div>

      {/* Menu Items */}
      <ul className="space-y-4">
        {links.map((link) => (
          <li key={link.value}>
            <button
              onClick={() => handleClick(link.value)}
              className="flex items-center gap-3 text-lg w-full text-left hover:bg-blue-200 p-2 rounded transition"
            >
              {link.icon}
              {!collapsed && <span>{link.label}</span>}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;