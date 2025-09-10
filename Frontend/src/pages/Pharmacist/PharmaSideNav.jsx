import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PharmaSideNav = ({ isOpen, onClose }) => {
  const [expandedMenus, setExpandedMenus] = useState({});

  const toggleMenu = (menu) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  const handleNavigation = (link) => {
    // You can replace this with your actual navigation logic
    console.log('Navigate to:', link);
    // onClose();
  };

  const menuItems = [
    {
      id: 'tax',
      icon: 'bi-capsule',
      label: 'Drugs',
      link: '/drugs'
    },
    {
      id: 'dashboard',
      icon: 'bi-speedometer2',
      label: 'Dashboard',
      link: '/dashboard'
    },
    {
      id: 'medicine',
      icon: 'bi-capsule',
      label: 'Medicine',
      submenu: [
        { label: 'All Medicines', link: '/medicines' },
        { label: 'Add Medicine', link: '/medicines/add' },
        { label: 'Categories', link: '/medicines/categories' }
      ]
    },
    {
      id: 'customer',
      icon: 'bi-people',
      label: 'Customer',
      submenu: [
        { label: 'All Customers', link: '/customers' },
        { label: 'Add Customer', link: '/customers/add' },
        { label: 'Customer Groups', link: '/customers/groups' }
      ]
    },
    {
      id: 'invoice',
      icon: 'bi-file-text',
      label: 'Invoice',
      submenu: [
        { label: 'All Invoices', link: '/invoices' },
        { label: 'Create Invoice', link: '/invoices/create' },
        { label: 'Pending Invoices', link: '/invoices/pending' }
      ]
    },
    {
      id: 'manufacturer',
      icon: 'bi-building',
      label: 'Manufacturer',
      submenu: [
        { label: 'All Manufacturers', link: '/manufacturers' },
        { label: 'Add Manufacturer', link: '/manufacturers/add' }
      ]
    },
    {
      id: 'inventory',
      icon: 'bi-box-seam',
      label: 'Inventory',
      submenu: [
        { label: 'Stock Overview', link: '/inventory' },
        { label: 'Low Stock Alert', link: '/inventory/low-stock' },
        { label: 'Expired Items', link: '/inventory/expired' }
      ]
    },
    {
      id: 'returns',
      icon: 'bi-arrow-return-left',
      label: 'Returns',
      submenu: [
        { label: 'All Returns', link: '/returns' },
        { label: 'Process Return', link: '/returns/process' }
      ]
    },
    {
      id: 'reports',
      icon: 'bi-graph-up',
      label: 'Reports',
      submenu: [
        { label: 'Sales Report', link: '/reports/sales' },
        { label: 'Inventory Report', link: '/reports/inventory' },
        { label: 'Customer Report', link: '/reports/customers' }
      ]
    },
    {
      id: 'accounts',
      icon: 'bi-calculator',
      label: 'Accounts',
      submenu: [
        { label: 'Income', link: '/accounts/income' },
        { label: 'Expenses', link: '/accounts/expenses' },
        { label: 'Balance Sheet', link: '/accounts/balance' }
      ]
    },
    {
      id: 'tax',
      icon: 'bi-percent',
      label: 'Tax',
      link: '/tax'
    },
    {
      id: 'staff',
      icon: 'bi-person-badge',
      label: 'Staff',
      submenu: [
        { label: 'All Staff', link: '/staff' },
        { label: 'Add Staff', link: '/staff/add' },
        { label: 'Staff Roles', link: '/staff/roles' }
      ]
    }
  ];

  return (
    <>
      <link 
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css" 
        rel="stylesheet"
      />
      
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-screen overflow-y-scroll bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
        w-64 lg:w-64
      `}>
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <i className="bi bi-heart-pulse text-white text-lg"></i>
              </div>
              <span className="text-xl font-bold text-gray-800">Pharmacy</span>
            </div>
            <button 
              onClick={onClose}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <i className="bi bi-x-lg text-xl"></i>
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-4">
            {menuItems.map((item) => (
              <li key={item.id}>
                {item.submenu ? (
                  <div>
                    <button
                      onClick={() => toggleMenu(item.id)}
                      className={`
                        w-full flex items-center justify-between px-3 py-3 text-left rounded-lg transition-colors duration-200
                        ${item.id === 'dashboard' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}
                      `}
                    >
                      <div className="flex items-center space-x-3">
                        <i className={`${item.icon} text-lg`}></i>
                        <span className="font-medium">{item.label}</span>
                      </div>
                      <i className={`bi bi-chevron-down text-sm transition-transform duration-200 ${
                        expandedMenus[item.id] ? 'rotate-180' : ''
                      }`}></i>
                    </button>
                    
                    {/* Submenu */}
                    <div className={`
                      overflow-hidden transition-all duration-300 ease-in-out
                      ${expandedMenus[item.id] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                    `}>
                      <ul className="mt-2 ml-8 space-y-1">
                        {item.submenu.map((subItem, index) => (
                          <li key={index}>
                            <button
                              onClick={() => handleNavigation(subItem.link)}
                              className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200"
                            >
                              {subItem.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <Link to={item.link} className={`
                      w-full flex items-center space-x-3 px-3 py-3 text-left rounded-lg transition-colors duration-200
                      ${item.id === 'dashboard' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}
                    `}
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
    </>
  );
};

export default PharmaSideNav;