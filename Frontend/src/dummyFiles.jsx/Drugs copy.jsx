import React, { useState, useEffect } from 'react'

function Drugs() {
const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('Day');

  const statsData = [
    { 
      title: 'Total Profit', 
      value: '₹1,03,748', 
      icon: 'bi-currency-rupee',
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
      textColor: 'text-green-800'
    },
    { 
      title: 'Inventory Stock', 
      value: '1,432', 
      icon: 'bi-box-seam',
      bgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      textColor: 'text-yellow-800'
    },
    { 
      title: 'Out of Stock', 
      value: '389', 
      icon: 'bi-exclamation-triangle',
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
      textColor: 'text-blue-800'
    },
    { 
      title: 'Expired', 
      value: '24', 
      icon: 'bi-calendar-x',
      bgColor: 'bg-red-100',
      iconColor: 'text-red-600',
      textColor: 'text-red-800'
    }
  ];

  const chartData = [
    { month: 'Jan', value: 40 },
    { month: 'Feb', value: 65 },
    { month: 'Mar', value: 45 },
    { month: 'Apr', value: 70 },
    { month: 'May', value: 55 },
    { month: 'Jun', value: 80 }
  ];

  const purchaseReports = [
    { 
      title: 'Total Items Ordered', 
      value: '800', 
      icon: 'bi-cart-check',
      color: 'text-gray-600'
    },
    { 
      title: 'Amount', 
      value: '₹70,500', 
      icon: 'bi-currency-rupee',
      color: 'text-blue-600'
    },
    { 
      title: 'Amount Pending', 
      value: '₹30,000', 
      icon: 'bi-clock-history',
      color: 'text-orange-600'
    }
  ];

  const recentOrders = [
    { id: '#001', customer: 'John Doe', amount: '₹1,250', status: 'Completed', date: '2025-01-10' },
    { id: '#002', customer: 'Jane Smith', amount: '₹890', status: 'Pending', date: '2025-01-10' },
    { id: '#003', customer: 'Mike Johnson', amount: '₹2,100', status: 'Processing', date: '2025-01-09' },
    { id: '#004', customer: 'Sarah Wilson', amount: '₹750', status: 'Completed', date: '2025-01-09' },
    { id: '#005', customer: 'Tom Brown', amount: '₹1,580', status: 'Cancelled', date: '2025-01-08' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Processing': return 'bg-blue-100 text-blue-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const toggleUserDropdown = () => {
    setUserDropdownOpen(!userDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (userDropdownOpen) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [userDropdownOpen]);

  return (
    <div>



    <div className="flex-1 bg-gray-50 min-h-screen">
      {/* Top Navigation */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              // onClick={onMenuToggle}
              className="lg:hidden text-gray-600 hover:text-gray-900"
            >
              <i className="bi bi-list text-2xl"></i>
            </button>
            <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Dashboard</h1>
          </div>

          <div className="flex items-center space-x-4">
            {/* Period Selector */}
            <div className="hidden sm:flex bg-gray-100 rounded-lg p-1">
              {['Day', 'Week', 'Month', 'Year'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 ${
                    selectedPeriod === period
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>

            {/* Date */}
            <span className="hidden md:block text-sm text-gray-500">5th January 2025</span>

            {/* Search */}
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
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
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                  alt="User"
                  className="w-8 h-8 rounded-full"
                />
                <span className="hidden md:block text-sm font-medium text-gray-700">Anantha Krishnan</span>
                <i className="bi bi-chevron-down text-sm text-gray-400"></i>
              </button>

              {/* User Dropdown */}
              {userDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                      <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                        alt="User"
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="font-medium text-gray-900">Anantha Krishnan</p>
                        <p className="text-sm text-gray-500">Administrator</p>
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

      {/* Main Content */}
      <div className="p-4 lg:p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {statsData.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl lg:text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <i className={`${stat.icon} ${stat.iconColor} text-xl`}></i>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts and Reports Row */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Sales Overview */}
          <div className="xl:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Sales Overview</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>Total Profit</span>
                <span className="font-semibold text-gray-900">₹10,85,556</span>
              </div>
            </div>
            
            {/* Simple Chart */}
            <div className="h-64 flex items-end justify-between space-x-2">
              {chartData.map((data, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div 
                    className="bg-blue-500 rounded-t-md w-full relative"
                    style={{ height: `${data.value * 2.5}px` }}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                      ₹{data.value * 1000}
                    </div>
                  </div>
                  <span className="text-sm text-gray-600 mt-2">{data.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Purchase Report */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Purchase Report</h3>
              <button className="text-sm text-blue-600 hover:text-blue-700">Today</button>
            </div>
            
            <div className="space-y-4">
              {purchaseReports.map((report, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <i className={`${report.icon} ${report.color} text-lg`}></i>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{report.title}</p>
                      <p className="text-xs text-gray-500">Updated just now</p>
                    </div>
                  </div>
                  <p className={`text-lg font-semibold ${report.color}`}>{report.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700">Today</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Order ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Customer</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-blue-600">{order.id}</td>
                    <td className="py-3 px-4 text-gray-900">{order.customer}</td>
                    <td className="py-3 px-4 font-semibold text-gray-900">{order.amount}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{order.date}</td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-700">
                          <i className="bi bi-eye text-sm"></i>
                        </button>
                        <button className="text-green-600 hover:text-green-700">
                          <i className="bi bi-pencil text-sm"></i>
                        </button>
                        <button className="text-red-600 hover:text-red-700">
                          <i className="bi bi-trash text-sm"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      

    </div>
    </div>
    </div>
  )
}

export default Drugs