import React, { useState, useEffect } from 'react'

import PharmaSideNav from '../Pharmacist/PharmaSideNav'
import AdminSideNav from '../Admin/AdminSideNav'

import Drugs from '../Pharmacist/Drugs'
/*
----------dashboard for pharmacist----------------
-----functions-----
1. create new sales
2. get all sales and filter by date and drug for current day
3. look up sales receipt for current day
-Sales Page – generate receipt
-Stock Update Page – update quantities when sold, view drugs, search drugs
-Sales History Page – lookup previous transactions for current day

fix height of sidebar color when not full
*/





function Dashboard() {
  const {role, name} = JSON.parse(localStorage.getItem('user'))
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const toggleUserDropdown = () => {
    setUserDropdownOpen(!userDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = () => {
      if (userDropdownOpen) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [userDropdownOpen]);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState('drugs');
  console.log(activePage);
  

  // Map keys from sidebar → components
  const componentMap = {
    drugs: <Drugs />,
    // medicines: <AllMedicines />,
    // addMedicine: <AddMedicine />,
    // customers: <Customers />,
    // add more mappings as needed...
  };

  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);


  return (
    <div>
      <div className="flex h-screen bg-gray-50">
        {/* ----------Sidebar ---------------*/}
        {role === 'Admin' ?
          <AdminSideNav
            isOpen={sidebarOpen}
            closeSidebar={closeSidebar}
             setActivePage={setActivePage} // 🟢 pass function to sidebar
          /> :
          <PharmaSideNav
            isOpen={sidebarOpen}
            closeSidebar={closeSidebar}
          />}


        {/* ---------Mobile overlay-------- */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={closeSidebar}
          />
        )}

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
          {/* --------Top Navigation-------- */}
          <div className="bg-white shadow-sm border-b border-gray-200 px-4 lg:px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={openSidebar}
                    className="lg:hidden p-2 rounded-md hover:bg-gray-100"
                  >
                    <i className="bi bi-list text-xl"></i>
                  </button>
                  <div>
                    <h1 className="text-xl font-semibold text-blue-600">Welcome back, {name} </h1>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {/* Search */}
                <div className="relative hidden md:block">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm outline-none"
                  />
                  <i className="bi bi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                </div>

                {/* Notifications */}
                <button className="relative text-gray-600 hover:text-gray-900">
                  <i className="bi bi-bell text-xl"></i>
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
                </button>

                {/* User Profile */}
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleUserDropdown();
                    }}
                    className="flex items-center space-x-2 hover:bg-gray-50 rounded-lg p-2"
                  >
                    <img src='../../assets/imgs/p-woman.jpg' alt="User" className="w-8 h-8 rounded-full"
                    />
                    <span className="hidden md:block text-sm font-medium text-gray-700">{name? name : 'User'}</span>
                    <i className="bi bi-chevron-down text-sm text-gray-400"></i>
                  </button>

                  {/* User Dropdown */}
                  {userDropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                      <div className="p-4 border-b border-gray-200">
                        <div className="flex items-center space-x-3">
                          <img src='../../assets/imgs/p-woman.jpg' alt="User" className="w-10 h-10 rounded-full" />
                          <div>
                            <p className="font-medium text-gray-900">Anantha Krishnan</p>
                            <p className="text-sm text-gray-500 font-bold">{role == 'Admin'? 'Adminstrator': 'Pharmacist'}</p>
                          </div>
                        </div>
                      </div>
                      <div className="py-2">
                        <button className="flex items-center space-x-3 w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50">
                          <i className="bi bi-person text-gray-400"></i>
                          <span>View Profile</span>
                        </button>
                        <button className="flex items-center space-x-3 w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50">
                          <i className="bi bi-gear text-gray-400"></i>
                          <span>Settings</span>
                        </button>
                        <button className="flex items-center space-x-3 w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50">
                          <i className="bi bi-question-circle text-gray-400"></i>
                          <span>Help & Support</span>
                        </button>
                        <div className="border-t border-gray-200 mt-2 pt-2">
                          <button className="flex items-center space-x-3 w-full px-4 py-2 text-left text-red-600 hover:bg-red-50">
                            <i className="bi bi-box-arrow-right text-red-500"></i>
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>

          {/* Page content */}
          <main className="flex-1 overflow-y-auto p-6">
            {/* {ContentComponent ? <ContentComponent /> : <div>Page not found</div>} */}
                {componentMap[activePage] }
          </main>

        </div>
      </div>



    </div>

  )
}

export default Dashboard