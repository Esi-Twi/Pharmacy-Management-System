import React, { useState, useEffect } from 'react'

function AllMedicines() {

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

  return (
    <div>

  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 m-4 lg:p-6">
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
  )
}

export default AllMedicines