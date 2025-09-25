import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle, XCircle, Pill, ArrowLeft, } from 'lucide-react';
import Loader from "../../components/Loader";


function ViewMore() {
  const [drug, setDrug] = useState([])
  const [isGettingDrug, setIsGettingDrug] = useState(false)

  useEffect(() => {
    try {
      setIsGettingDrug(true)
      const drug = JSON.parse(localStorage.getItem('drug-view-more'))
      setDrug(drug)
    } catch (error) {
      toast.error(error.response.data.msg)
    } finally {
      setIsGettingDrug(false)
    }
  }, [])


  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-red-100 p-4 md:p-6 lg:p-8">
        <Link to='/all-meds' className="flex items-center gap-2 mb-4">
          <ArrowLeft /> Back
        </Link>

        {isGettingDrug ? <Loader /> :
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
      </div>
    </div>
  )
}

export default ViewMore