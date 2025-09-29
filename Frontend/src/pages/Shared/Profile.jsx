import { useState, useEffect } from 'react'
import { User, Mail, Shield, Clock, CheckCircle, XCircle, Edit, Phone, MapPin, Loader, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import api from '../../api/axios'
import { useAuthStore } from '../../store/useAuthStore';

function Profile() {
  // const {authUser, getAuthUser, isGettingUser } = useAuthStore()
  const [userData, setUserData] = useState(null)
  const [isFetching, setIsFetching] = useState(false)
  // let userData = JSON.parse(localStorage.getItem('user'))

  const [editedUser, setEditedUser] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false)

  
  useEffect(() => {
    setIsFetching(true)
    const user = JSON.parse(localStorage.getItem('user'))
    setUserData(user)
    setIsFetching(false)
  }, [])


  const validateForm = () => {
    //name validation
    if (!editedUser.name) {
      toast.error("Name cannot be empty")
      return false
    }

    // Phone validation if provided
    if (editedUser.phone && editedUser.phone.trim()) {
      const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
      if (!phoneRegex.test(editedUser.phone.replace(/\s/g, ''))) {
        toast.error('Please enter a valid phone number')
        return false
      }
    }

    return true
  };

  const handleEdit = () => {
    const { name, phone, location } = userData
    const safe_phone = phone || ''
    const safe_location = location || ''
    setEditedUser({ name, phone: safe_phone, location: safe_location });

    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsSaving(true)

    if (!validateForm()) {
      setIsSaving(false)
      return;
    }

    try {
      const res = await api.patch(`/staff/profile/${userData._id}`, editedUser)
      
      const updatedUser = { ...userData, ...editedUser, updatedAt: new Date().toISOString() };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // ✅ Update state immediately so UI re-renders
      setUserData(updatedUser);
      
      toast.success(res.data.msg)
      setIsEditing(false)
    } catch (error) {
      console.log(error);
      
        toast.error(error.response.data.msg || "An error occured")
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditedUser([]);
    setIsEditing(false);
    setIsSaving(false)
  };

  const handleInputChange = (field, value) => {
    setEditedUser(prev => ({
      ...prev,
      [field]: value
    }));
  };


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
    <div className=''>
      {isFetching ? <Loader /> : 
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-red-100 p-4 md:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
                <div className="text-center">
                  <div className="relative inline-block mb-6">
                    <div className="w-24 h-24 md:w-32 md:h-32 avatar rounded-full flex items-center justify-center mx-auto shadow-lg">
                      <h1>{userData?.name[0]}</h1>
                    </div>
                    {userData?.verified && (
                      <div className={`absolute -top-2 -right-2 ${userData?.verified && 'bg-green-500'} rounded-full p-2 shadow-lg`}>
                        {userData?.verified && <CheckCircle size={20} className="text-white" />}
                      </div>
                    )}
                  </div>

                  <div className="mb-6">
                    {/* Name Field */}
                    <div className="mb-2">
                      <h1 className="text-xl md:text-2xl font-bold text-gray-800">{userData?.name}</h1>
                    </div>

                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRoleColor(userData?.role)}`}> <Shield size={12} className="inline mr-1" /> {userData?.role}
                      </span>

                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(userData?.status)}`}>
                        {userData?.status === 'active' ? (<CheckCircle size={12} className="inline mr-1" />) : (<XCircle size={12} className="inline mr-1" />)}
                        {userData?.status}
                      </span>
                    </div>

                    <div className="text-sm text-gray-600 space-y-2">
                      {/* Email Field */}
                      <div className="flex items-center justify-center">
                        <Mail size={14} className="mr-2 flex-shrink-0" />
                        <span className="break-all">{userData?.email}</span>
                      </div>

                      {/* Phone Field */}
                      <div className="flex items-center justify-center">
                        <Phone size={14} className="mr-2 flex-shrink-0" />
                        <span>{userData?.phone || 'Not provided'}</span>
                      </div>

                      {/* Location Field */}
                      <div className="flex items-center justify-center">
                        <MapPin size={14} className="mr-2 flex-shrink-0" />
                        <span>{userData?.location || 'Not provided'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 justify-center">
                    {!isEditing &&
                      <button
                        onClick={handleEdit}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg flex items-center gap-2 mx-auto disabled:opacity-50"
                      >
                        <Edit size={16} /> Edit Profile </button>
                    }
                  </div>
                </div>
              </div>

              {/* form for editing personal data */}
              {isEditing && <div className="bg-white rounded-lg shadow-sm border mt-5 border-gray-200 p-4 lg:p-6">
                <h1 className='mb-4 font-bold text-blue-600'>Edit your Personal Info</h1>
                <div className="flex-1">
                  <input type="text" value={editedUser.name || ''} placeholder="Enter name"
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`border py-1 px-2  focus:border-gray-800 outline-none bg-transparent w-full`} />
                </div>

                <div className="flex-1">
                  <input type="text" value={editedUser.phone} placeholder="Enter phone number"
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`border mt-3 py-1 px-2  focus:border-gray-800 outline-none bg-transparent w-full`} />
                </div>

                <div className="flex-1 mt-3">
                  <input type="text" value={editedUser.location} placeholder="Enter location"
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className={`border py-1 px-2  focus:border-gray-800 outline-none bg-transparent w-full`} />
                </div>

                <div className="flex gap-3 mt-4 justify-center flex-wrap">
                  <button onClick={handleSave} disabled={isSaving}
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-full font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed" >
                    {isSaving ?
                      <>
                        <Loader className="animate-spin" size={16} /> <span>Saving...</span>
                      </> :
                      <>Save Changes</>}
                  </button>

                  <button onClick={handleCancel} disabled={isSaving}
                    className="bg-gray-200 text-gray-700 px-6 py-2 rounded-full font-medium hover:bg-gray-300 transition-all duration-200 disabled:opacity-50"
                  > Cancel </button>
                </div>
              </div>}
            </div>

            {/* Account Information & Activity */}
            <div className="lg:col-span-2 space-y-6">

              {/* Account Details */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                  <User className="mr-3 text-blue-500" size={24} />
                  Account Details
                </h2>

                <div className="space-y-4 mb-3">
                  <div className="flex justify-between items-center p-4 bg-gray-200 rounded-2xl">
                    <span className="font-medium text-gray-600">Account Status</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(userData?.status)}`}>
                      {userData?.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-100 rounded-2xl">
                    <span className="font-medium text-gray-600">Role</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(userData?.role)}`}>
                      {userData?.role}
                    </span>
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
                        <p className="text-sm text-gray-600">Last updated {formatDate(userData?.updatedAt)}</p>
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
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${userData?.verified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {userData?.verified ? 'Verified' : 'Unverified'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-purple-50 rounded-2xl border-l-4 border-purple-400">
                    <div className="flex items-center">
                      <User size={20} className="text-purple-500 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-800">Account Created</p>
                        <p className="text-sm text-gray-600">Joined as {userData?.role}</p>
                      </div>
                    </div>
                    <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {formatDate(userData?.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      }

    </div>
  )
}

export default Profile