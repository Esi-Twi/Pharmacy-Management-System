import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function PharmaSideNav({ isOpen, closeSidebar, setActivePage }) {
  const [activeItem, setActiveItem] = useState('create-sales')
  const [expandedMenus, setExpandedMenus] = useState({});

  const menuItems = [
    {
      id: 'create-sales',
      icon: 'bi-speedometer2',
      label: 'Create Sales',
      page: 'create-sales'
    },
    {
      id: 'today-sales',
      icon: 'bi-speedometer2',
      label: "Today's Sales",
      page: '/today-sales'
    },
    {
      id: 'account',
      icon: 'bi-person',
      label: 'Account',
      submenu: [
        { label: 'Profile', page: '/profile' },
      ]
    }
  ]

  const toggleMenu = (menu) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  const handleNavigation = (page) => {
    setActivePage(page);
    closeSidebar();
  };


  return (
    <div>

      <div className={`fixed inset-y-0 h-[100vh] left-0 z-50 w-72 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
        <div className="flex flex-col h-full bg-white">
          {/* Header */}
          <div className="p-6 border-b bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <i className="bi bi-heart-pulse text-white text-lg"></i>
                </div>
                <span className="text-xl font-bold text-gray-800 "> Dunon Pharmacy</span>
              </div>
              <button
                onClick={closeSidebar}
                className="lg:hidden text-gray-500 hover:text-gray-700"
              >
                <i className="bi bi-x-lg text-xl"></i>
              </button>
            </div>
          </div>

          {/* ---------Navigation------ */}
          <nav className="flex-1 overflow-y-auto py-4 h-full bg-white">
            <ul className="space-y-1 px-4">
              {menuItems.map((item) => (
                <li key={item.id}>
                  {item.submenu ? (
                    <div>
                      <button onClick={() => toggleMenu(item.id)} className={`  w-full flex items-center justify-between px-3 py-3 text-left rounded-lg transition-colors duration-200 `}>
                        <div className="flex items-center space-x-3">
                          <i className={`${item.icon} text-lg`}></i>
                          <span className="font-medium">{item.label}</span>
                        </div>
                        <i className={`bi bi-chevron-down text-sm transition-transform duration-200 ${expandedMenus[item.id] ? 'rotate-180' : ''
                          }`}></i>
                      </button>

                      {/* Submenu */}
                      <div className={`overflow-hidden transition-all duration-300 ease-in-out
                               ${expandedMenus[item.id] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <ul className="mt-2 ml-8 space-y-1">
                          {item.submenu.map((subItem, index) => (
                            <li key={index}>
                              <Link to={subItem.page}
                                onClick={() => { handleNavigation(subItem.page); setActiveItem(subItem.label) }}

                                className={`block w-full text-left px-3 py-2 text-sm text-gray-600 rounded-md transition-colors duration-200
                                         ${activeItem === subItem.label ? 'bg-blue-600 text-white border-r-2'
                                    : 'text-gray-700 hover:bg-gray-50'
                                  }`}
                              >
                                {subItem.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <Link to={item.page} onClick={() => { setActiveItem(item.id); handleNavigation(item.page) }}
                    // <Link to={item.page} onClick={() => { setActiveItem(item.id); handleNavigation(item.page) }}
                      className={`w-full flex items-center space-x-3 px-3 py-3 text-left rounded-lg transition-colors duration-200  ${activeItem === item.id
                        ? 'bg-blue-600 text-white border-r-2'
                        : 'text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                      <i className={`${item.icon} text-lg`}></i>
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>


    </div>
  )
}

export default PharmaSideNav