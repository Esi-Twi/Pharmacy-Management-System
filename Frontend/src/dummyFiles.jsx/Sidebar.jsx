import React, { useState } from 'react';
import { Menu, X, User, Pill, Shield, Home, BarChart3, Users, Package, Settings, FileText, Activity } from 'lucide-react';

function Sidebar({ role, activeItem, setActiveItem, isOpen, closeSidebar }) {
  const sidebarConfig = {
  admin: {
    title: 'Admin Dashboard',
    items: [
      { id: 'overview', label: 'Overview', icon: '' },
      { id: 'users', label: 'User Management', icon: '' },
      { id: 'analytics', label: 'Analytics', icon: '' },
      { id: 'inventory', label: 'Inventory', icon: '' },
      { id: 'reports', label: 'Reports', icon: '' },
      { id: 'settings', label: 'System Settings', icon: '' }
    ]
  },
  pharmacist: {
    title: 'Pharmacist Portal',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: '' },
      { id: 'prescriptions', label: 'Prescriptions', icon: '' },
      { id: 'inventory', label: 'Drug Inventory', icon: '' },
      { id: 'patients', label: 'Patients', icon: '' },
      { id: 'activity', label: 'Activity Log', icon: '' },
      { id: 'profile', label: 'Profile', icon: '' }
    ]
  }
};


  const config = sidebarConfig[role];

  return (
    <div>

 <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    }`}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            {role === 'admin' ? (
              <Shield className="w-8 h-8 text-blue-600" />
            ) : (
              <Pill className="w-8 h-8 text-green-600" />
            )}
            <h2 className="font-semibold text-gray-900">{config.title}</h2>
          </div>
          <button
            onClick={closeSidebar}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {config.items.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveItem(item.id);
                      closeSidebar();
                    }}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeItem === item.id
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {/* <Icon className="w-5 h-5" /> */}
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
        
        {/* User info */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                {role === 'admin' ? 'Admin User' : 'Pharmacist'}
              </p>
              <p className="text-xs text-gray-500 capitalize">{role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>


    </div>
  )
}

export default Sidebar