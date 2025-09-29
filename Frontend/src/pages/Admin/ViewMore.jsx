import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle, XCircle, Pill, ArrowLeft, Loader2, Shield, Mail, Phone, MapPin, Edit, User, Clock, } from 'lucide-react';
import Loader from "../../components/Loader";


function ViewMore() {
  const [drug, setDrug] = useState([])
  const [staff, setStaff] = useState([])
  const [isGetting, setIsGetting] = useState(false)

  useEffect(() => {
    try {
      setIsGetting(true)
      const drug = JSON.parse(localStorage.getItem('drug-view-more'))
      const staff = JSON.parse(localStorage.getItem('staff'))

      setDrug(drug)
      setStaff(staff)
    } catch (error) {
      toast.error(error.response.data.msg)
    } finally {
      setIsGetting(false)
    }
  }, [])


  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Admin': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Pharmacist': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div>

      {drug &&
        <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-red-100 p-4 md:p-6 lg:p-8">
          <Link to='/medicine' className="flex items-center gap-2 mb-4">
            <ArrowLeft /> Back
          </Link>

          {isGetting ? <Loader /> :
            <div className="max-w-6xl mx-auto">
              <div className="">
                <div className="sm:w-[75%] w-full space-y-6">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
                    <h2 className="text-xl font-bold text-green-600 mb-6 flex items-center">
                      <Pill className="mr-3 text-blue-500" size={24} />
                      {drug.name}
                    </h2>

                    <div className="">
                      <div className="space-y-4">
                        <div className="px-4 py-2 bg-gray-100 rounded-2xl">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-black">Category</span>
                            <span className={`px-3 py-1 rounded-full text-base font-bold text-black`}>
                              {drug.category}</span>
                          </div>
                          <div className="flex justify-between items-center my-2">
                            <span className="font-medium text-black">Form</span>
                            <span className={`px-3 py-1 rounded-full text-base font-bold text-black`}>
                              {drug.form}</span>
                          </div>
                          <div className="flex justify-between items-center my-2">
                            <span className="font-medium text-black">Quantity</span>
                            <span className={`px-3 py-1 rounded-full text-base font-bold text-black`}>
                              {drug.quantity}</span>
                          </div>
                          <div className="flex justify-between items-center my-2">
                            <span className="font-medium text-black">Purchase Price</span>
                            <span className={`px-3 py-1 rounded-full text-base font-bold text-black`}>
                              {drug.purchase_price}</span>
                          </div>
                          <div className="flex justify-between items-center my-2">
                            <span className="font-medium text-black">Purchase Price</span>
                            <span className={`px-3 py-1 rounded-full text-base font-bold text-black`}>
                              {drug.selling_price}</span>
                          </div>
                          <div className="flex justify-between items-center my-2">
                            <span className="font-medium text-black">Batch Number</span>
                            <span className={`px-3 py-1 rounded-full text-base font-bold text-black`}>
                              {drug.batch_number}</span>
                          </div>
                          <div className="flex justify-between items-center my-2">
                            <span className="font-medium text-black">Manufacture Date</span>
                            <span className={`px-3 py-1 rounded-full text-base font-bold text-black`}>
                              {formatDate(drug.manufacture_date)}</span>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between p-4 bg-green-50 rounded-2xl border-l-4 border-green-400">
                            <div className="flex items-center">
                              <CheckCircle size={20} className="text-green-500 mr-3 flex-shrink-0" />
                              <div>
                                <p className="font-medium text-gray-800">Last Updated</p>
                                <p className="text-sm text-gray-600">Last updated {formatDate(drug.updatedAt)}</p>
                              </div>
                            </div>
                            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                              Recent
                            </span>
                          </div>
                          <div className="flex my-3 items-center justify-between p-4 bg-red-50 rounded-2xl border-l-4 border-red-600">
                            <div className="flex items-center">
                              <XCircle size={20} className="text-red-500 mr-3 flex-shrink-0" />
                              <div>
                                <p className="font-medium text-gray-800">Expiry Date</p>
                                <p className="text-sm text-gray-600">Will expire on {formatDate(drug.expiry_date)}</p>
                              </div>
                            </div>
                            <span className="bg-red-300 text-white px-3 py-1 rounded-full text-sm font-medium">
                              Soon
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>}
        </div>}

      {staff &&
        <div className="min-h-screen bg-gradient-to-br from-red-100 via-red-100 to-red-100 p-4 md:p-6 lg:p-8">
          <Link to='/staff' className="flex items-center gap-2 mb-4">
            <ArrowLeft /> Back
          </Link>

          <div className="max-w-6xl mx-auto mb-7">
            {isGetting ? <Loader /> : (
              <div className=" space-y-6">
                {/* Profile Card */}
                <div className="lg:w-4/5">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
                    <div className="text-center">
                      <div className="relative inline-block mb-6">
                        <div className="w-24 h-24 md:w-32 md:h-32 avatar rounded-full flex items-center justify-center mx-auto shadow-lg">
                          <h1>U</h1>
                          {/* <h1>{staff.name[0] || 'U'}</h1> */}
                        </div>
                        {staff.verified && (
                          <div className={`absolute -top-2 -right-2 ${staff.verified && 'bg-green-500'} rounded-full p-2 shadow-lg`}>
                            {staff.verified && <CheckCircle size={20} className="text-white" />}
                          </div>
                        )}
                      </div>

                      <div className="mb-6">
                        {/* Name Field */}
                        <div className="mb-2">
                          <h1 className="text-xl md:text-2xl font-bold text-gray-800">{staff.name}</h1>
                        </div>

                        <div className="flex flex-wrap justify-center gap-2 mb-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRoleColor(staff.role)}`}> <Shield size={12} className="inline mr-1" /> {staff.role}
                          </span>

                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(staff.status)}`}>
                            {staff.status === 'active' ? (<CheckCircle size={12} className="inline mr-1" />) : (<XCircle size={12} className="inline mr-1" />)}
                            {staff.status}
                          </span>
                        </div>

                        <div className="text-sm text-gray-600 space-y-2">
                          {/* Email Field */}
                          <div className="flex items-center justify-center">
                            <Mail size={14} className="mr-2 flex-shrink-0" />
                            <span className="break-all">{staff.email}</span>
                          </div>

                          {/* Phone Field */}
                          <div className="flex items-center justify-center">
                            <Phone size={14} className="mr-2 flex-shrink-0" />
                            <span>{staff.phone || 'Not provided'}</span>
                          </div>

                          {/* Location Field */}
                          <div className="flex items-center justify-center">
                            <MapPin size={14} className="mr-2 flex-shrink-0" />
                            <span>{staff.location || 'Not provided'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 lg:p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                    <Clock className="mr-3 text-purple-500" size={24} />
                    Recent Activity
                  </h2>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-2xl border-l-4 border-green-400">
                      <div className="flex items-center">
                        <CheckCircle size={20} className="text-green-500 mr-3 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-800">Profile Updated</p>
                          <p className="text-sm text-gray-600">Last updated {formatDate(staff.updatedAt)}</p>
                        </div>
                      </div>
                      {/* write logic for recent or not */}
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Recent
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-2xl border-l-4 border-blue-400">
                      <div className="flex items-center">
                        <Mail size={20} className="text-blue-500 mr-3 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-800">Email Verified</p>
                          <p className="text-sm text-gray-600">Account verification completed</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${staff.verified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {staff.verified ? 'Verified' : 'Unverified'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-purple-50 rounded-2xl border-l-4 border-purple-400">
                      <div className="flex items-center">
                        <User size={20} className="text-purple-500 mr-3 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-800">Account Created</p>
                          <p className="text-sm text-gray-600">Joined as {staff.role}</p>
                        </div>
                      </div>
                      <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {formatDate(staff.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>)
            }
          </div>
        </div>
      }

      {!drug && <>No item selected</>}

      {!staff && <>No item selected</>}
    </div>
  )
}

export default ViewMore