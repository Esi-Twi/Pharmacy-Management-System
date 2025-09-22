import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function AdminSideNav({ isOpen, closeSidebar, setActivePage}) {
  const [activeItem, setActiveItem] = useState('dashboard')
  const [expandedMenus, setExpandedMenus] = useState({});

  const menuItems = [
    {
      id: 'dashboard',
      icon: 'bi-speedometer2',
      label: 'Dashboard',
      page: 'dashboard'
    },
    {
      id: 'medicine',
      icon: 'bi-capsule',
      label: 'Medicine',
      submenu: [
        { label: 'Manage Medicines', page: '/all-meds' },
        { label: 'Add Medicine', page: '/add-med' },
      ]
    },
    {
      id: 'staff',
      icon: 'bi-person-badge',
      label: 'Staff',
      submenu: [
        { label: 'Add Staff', page: '/add-staff' },
        { label: 'Manage Staff', page: '/staff' },
        { label: 'Update Staff Roles', page: '/update-staff' }
      ]
    },
    {
      id: 'customer',
      icon: 'bi-people',
      label: 'Customer',
      submenu: [
        { label: 'All Customers', page: '/customers' },
        { label: 'Add Customer', page: '/customers/add' },
        { label: 'Customer Groups', page: '/customers/groups' }
      ]
    },
    {
      id: 'invoice',
      icon: 'bi-file-text',
      label: 'Invoice',
      submenu: [
        { label: 'All Invoices', page: '/invoices' },
        { label: 'Create Invoice', page: '/invoices/create' },
        { label: 'Pending Invoices', page: '/invoices/pending' }
      ]
    },
    {
      id: 'manufacturer',
      icon: 'bi-building',
      label: 'Manufacturer',
      submenu: [
        { label: 'All Manufacturers', page: '/manufacturers' },
        { label: 'Add Manufacturer', page: '/manufacturers/add' }
      ]
    },
    {
      id: 'inventory',
      icon: 'bi-box-seam',
      label: 'Inventory',
      submenu: [
        { label: 'Stock Overview', page: '/inventory' },
        { label: 'Low Stock Alert', page: '/inventory/low-stock' },
        { label: 'Expired Items', page: '/inventory/expired' }
      ]
    },
    {
      id: 'returns',
      icon: 'bi-arrow-return-left',
      label: 'Returns',
      submenu: [
        { label: 'All Returns', page: '/returns' },
        { label: 'Process Return', page: '/returns/process' }
      ]
    },
    {
      id: 'reports',
      icon: 'bi-graph-up',
      label: 'Reports',
      submenu: [
        { label: 'Sales Report', page: '/reports/sales' },
        { label: 'Inventory Report', page: '/reports/inventory' },
        { label: 'Customer Report', page: '/reports/customers' }
      ]
    },
    {
      id: 'accounts',
      icon: 'bi-calculator',
      label: 'Accounts',
      submenu: [
        { label: 'Income', page: '/accounts/income' },
        { label: 'Expenses', page: '/accounts/expenses' },
        { label: 'Balance Sheet', page: '/accounts/balance' }
      ]
    },
    {
      id: 'tax',
      icon: 'bi-percent',
      label: 'Tax',
      page: '/tax'
    },
    
      {
      id: 'account',
      icon: 'bi-person',
      label: 'Account',
      submenu: [
        { label: 'Profile', page: '/profile' },
        { label: 'Add Staff', page: '/staff/add' },
        { label: 'Staff Roles', page: '/staff/roles' }
      ]
    }
  ];

  const toggleMenu = (menu) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  const handleNavigation = (page) => {
   setActivePage(page); // 🟢 updates Dashboard content

    closeSidebar();
  };



  return (
    <div>

      <div className={`fixed bg-white h-screen inset-y-0 left-0 z-50 w-72 border-r border-gray-200 transform
  transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
        <div className="flex flex-col h-full">
          {/* ------------Header------ */}
          <div className="p-6 border-b bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <i className="bi bi-heart-pulse text-white text-lg"></i>
                </div>
                <span className="text-xl font-bold text-gray-800"> Dunon Pharmacy</span>
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
                      <button
                        onClick={() => toggleMenu(item.id)}
                        className={`
                        w-full flex items-center justify-between px-3 py-3 text-left rounded-lg transition-colors duration-200 
                       
                      `}
                      >
                        <div className="flex items-center space-x-3">
                          <i className={`${item.icon} text-lg`}></i>
                          <span className="font-medium">{item.label}</span>
                        </div>
                        <i className={`bi bi-chevron-down text-sm transition-transform duration-200 ${expandedMenus[item.id] ? 'rotate-180' : ''
                          }`}></i>
                      </button>

                      {/* Submenu */}
                      <div className={`overflow-hidden transition-all duration-300 ease-in-out
                      ${expandedMenus[item.id] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                      >
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
                    <Link to={item.page} onClick={() => {setActiveItem(item.id); handleNavigation(item.page)}}
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

export default AdminSideNav