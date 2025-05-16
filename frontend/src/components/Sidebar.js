import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Sidebar = ({ onNavigate }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState('dashboard');

  const handleClick = (section) => {
    setActive(section);
    onNavigate(section);
  };

  const menuItems = [
    { label: 'Dashboard', value: 'dashboard', icon: '📊' },
    { label: 'Patients', value: 'patients', icon: '🧾' },
    { label: 'Appointments', value: 'appointments', icon: '📅' },
    { label: 'Doctors', value: 'doctors', icon: '🧑‍⚕️' },
    { label: 'Profile', value: 'profile', icon:'🧑‍⚕️ '}
  ];

  return (
    <div
      className={`opacity-100 z-30 h-screen bg-blue-100 p-4 shadow-md transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      } fixed flex flex-col`}
    >
      <div className="opacity-80 z-20 flex items-center justify-between mb-6">
        {!collapsed && <h2 className="text-xl font-bold text-blue-700">You're on Duty!</h2>}
        <button onClick={() => setCollapsed(!collapsed)} className="text-blue-700">
          {collapsed ? <MenuIcon size={24} /> : <CloseIcon size={24} />}
        </button>
      </div>

      <ul className="space-y-4 opacity-80 z-20">
        {menuItems.map((item) => (
          <li
            key={item.value}
            onClick={() => handleClick(item.value)}
            className={`cursor-pointer flex items-center gap-3 p-2 rounded hover:bg-blue-200 ${
              active === item.value ? 'bg-blue-300 font-semibold' : ''
            }`}
          >
            <span>{item.icon}</span>
            {!collapsed && <span>{item.label}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
