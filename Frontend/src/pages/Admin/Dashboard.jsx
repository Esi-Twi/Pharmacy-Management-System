import React, { useState, useEffect } from 'react'
import {useAnalyticsStore} from '../../store/useAnalyticsStore';

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
  const {dashboardData, isGettingDashboardData, getDashboardData} = useAnalyticsStore()

  useEffect(() => {
    getDashboardData()
  }, [])

  console.log(dashboardData, isGettingDashboardData);
  

    const [selectedPeriod, setSelectedPeriod] = useState('Day');
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  
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

  return (
    <div>
    

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



    </div>


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
          </div>
        </div>
      </div>
    </div>

  )
}

export default Dashboard