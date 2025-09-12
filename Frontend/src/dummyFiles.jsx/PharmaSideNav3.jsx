import React, { useState } from 'react';
import { Menu, X, Home, Users, ShoppingCart, Settings, Pill, FileText, BarChart } from 'lucide-react';


const PharmaSideNav = ({ activeItem, setActiveItem, isMobile, closeSidebar }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'medications', label: 'Medications', icon: Pill },
    { id: 'prescriptions', label: 'Prescriptions', icon: FileText },
    { id: 'inventory', label: 'Inventory', icon: ShoppingCart },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const handleItemClick = (itemId) => {
    setActiveItem(itemId);
    if (isMobile) closeSidebar();
  };

  return (
    <>
       <div className="h-full bg-green-900 text-white">
      <div className="p-4 border-b border-green-700">
        <h2 className="text-lg font-semibold">Pharmacy Portal</h2>
      </div>
      <nav className="p-4 overflow-y-auto h-full">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg mb-2 text-left transition-colors ${
                activeItem === item.id 
                  ? 'bg-green-600 text-white' 
                  : 'text-gray-300 hover:bg-green-800 hover:text-white'
              }`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>

    </>
  );
};

export default PharmaSideNav;