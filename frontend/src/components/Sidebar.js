import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Sidebar = ({ onNavigate, role }) => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleSidebar = () => setCollapsed(!collapsed);

  const docItems = [
    // { label: 'Dashboard', value: 'dashboard', icon: '📊' },
    // { label: 'Patients', value: 'patients', icon: '🧾' },
    { label: 'Surguries', value:'Surgeries', icon:'🧾'},
    { label: 'Appointments', value: 'appointments', icon: '📅' },
    { label: 'Profile', value: 'profile', icon:'🧑‍⚕️ ' }
  ];

  const recepItems = [
    { label: 'Profile', value: 'Profile', icon: '📊' },
    { label: 'Patients', value: 'patients', icon: '🧾' },
    { label: 'Appointments', value: 'appointments', icon: '📅' },
    { label: 'Doctors', value: 'doctors', icon: '🧑‍⚕️' },
    // { label: 'Profile', value: 'profile', icon:'🧑‍⚕️ ' }
  ];

  const links = role === "doctor" ? docItems : recepItems;

  return (
    <div className={` fixed h-screen  ${collapsed ? 'w-20' : 'w-64'} opacity-100 z-10 bg-[#eff6fa] p-4 transition-all duration-300 shadow-md`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-xl font-bold ${collapsed ? 'hidden' : 'block'}`}>
          {role === 'doctor' ? 'Doctor Panel' : 'Reception Panel'}
        </h2>
        <button onClick={toggleSidebar} className="text-xl">
          {collapsed ? <MenuIcon /> : <CloseIcon />}
        </button>
      </div>

      <ul className="space-y-4">
        {links.map((link) => (
          <li key={link.value}>
            <a
              href="#"
              onClick={() => onNavigate && onNavigate(link.value)}
              className="flex items-center gap-3 text-lg hover:bg-blue-200 p-2 rounded transition"
            >
              {link.icon}
              {!collapsed && <span>{link.label}</span>}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
