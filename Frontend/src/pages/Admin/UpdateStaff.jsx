import { useEffect, useState } from 'react'
import { useStaffStore } from '../../store/useStaffStore'
import Loader from '../../components/Loader'
import { CheckCircle, Mail, MapPin, Phone, Shield } from 'lucide-react'


function UpdateStaff() {
 const { isGettingStaff, getAllStaffs, allStaffs } = useStaffStore()
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    getAllStaffs()
  }, [])

  console.log(allStaffs);
  

  const onReload = () => {
    getAllStaffs()
  }
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
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 m-4 lg:p-6">
      <div className="">
        {/* Search + buttons */}
        <div className="border-0 pt-1 flex justify-between items-center flex-wrap gap-3">
          <div className="flex items-center relative w-full sm:w-auto">
            <svg className="w-5 h-5 absolute left-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full sm:w-80"
              placeholder="Search ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex space-x-3">
            <button
              type="button"
              className="bg-blue-800 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-900 transition-colors"
            >
              Export
            </button>
            <button
              type="button"
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg flex items-center hover:bg-gray-300 transition-colors"
              onClick={onReload}
            >
              Reload
            </button>
          </div>
        </div>
      </div>

      {isGettingStaff ? <Loader /> : (
        <div className='grid mt-6 md:grid-col-3 sm:grid-cols-2 grid-cols-1 gap-6'>
          {allStaffs.map((staff, index) => (
            <div key={index} className="">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2 w-full">
                <div className="text-center">
                  <div className="relative inline-block mb-1">
                    <div className="w-24 h-24 md:w-32 md:h-32 avatar rounded-full flex items-center justify-center mx-auto shadow-lg">
                      <h1>{staff.name?.[0] || 'U'}</h1>
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
                      <h1 className="text-xl md:text-2xl font-bold text-gray-800">{staff.name || "User"}</h1>
                    </div>

                    <div className="flex flex-wrap justify-center gap-3 mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRoleColor(staff.role)}`}>
                        <Shield size={12} className="inline mr-1" />
                        {staff.role}
                      </span>

                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(staff.status)}`}>
                        {staff.status === 'active' ? (
                          <CheckCircle size={12} className="inline mr-1" />
                        ) : (
                          <XCircle size={12} className="inline mr-1" />
                        )}
                        {staff.status}
                      </span>
                    </div>

                    <div className="text-md flex items-center justify-center gap-7 text-gray-600 space-y-2">
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

                    </div>

                    <div className="text-md flex items-center justify-center gap-7 text-gray-600 space-y-2">
                      {/* Location Field */}
                      <div className="flex items-center justify-center">
                        <MapPin size={14} className="mr-2 flex-shrink-0" />
                        <span>{staff.location || 'Not provided'}</span>
                      </div>

                      {/* Joined Field */}
                      <span className='flex items-center gap-2'>
                        {/* <h1 className='font-bold text-green-500'>Joined:</h1>{staff.createdAt.toISOString().split("T")[0] || 'Not provided'} */}
                      </span>
                      
                      <div className="flex items-center justify-center">
                        {/* < size={14} className="mr-2 flex-shrink-0" /> */}
                        <span>Joined</span>
                      </div>

                    </div>

                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>)
      }

    </div>
  )
}

export default UpdateStaff