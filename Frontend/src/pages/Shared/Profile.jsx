import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom'
import { User, Mail, Shield, Clock, CheckCircle, XCircle, Edit, Save, Phone, MapPin, AlertCircle, Loader } from 'lucide-react';


function Profile() {
  const userData = JSON.parse(localStorage.getItem('user'))

  const fetchData  = () => {
    console.log(user._id);
    
  }

  useEffect(() => {
    fetchData()
  }, [fetchData])

  console.log(userData);



  const [originalUser, setOriginalUser] = useState({
    _id: "66f2a8b4c12345678901234",
    name: "Sam Robinson",
    email: "samrobinson2000@gmail.com",
    role: "Pharmacist",
    status: "active",
    verified: true,
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-09-01T14:20:00Z",
    phone: "+1 555-999-036-1336",
    location: "New York, NY"
  });

  const [user, setUser] = useState(userData);
  const [editedUser, setEditedUser] = useState(userData);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [hasChanges, setHasChanges] = useState(false);

  // Check for changes whenever editedUser changes
  useEffect(() => {
    const changed = JSON.stringify(user) !== JSON.stringify(editedUser);
    setHasChanges(changed);
  }, [user, editedUser]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!editedUser.name || editedUser.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    }

    // Phone validation (optional but must be valid if provided)
    if (editedUser.phone && editedUser.phone.trim()) {
      const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
      if (!phoneRegex.test(editedUser.phone.replace(/\s/g, ''))) {
        newErrors.phone = 'Please enter a valid phone number';
      }
    }

    // Location validation (optional)
    if (editedUser.location && editedUser.location.trim().length > 100) {
      newErrors.location = 'Location must be less than 100 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedUser({ ...user });
    setErrors({});
    setSuccessMessage('');
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    if (!hasChanges) {
      setIsEditing(false);
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call - replace with actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Here you would make the actual API call:
      // const response = await fetch(`/api/users/${user._id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     name: editedUser.name.trim(),
      //     email: editedUser.email.trim().toLowerCase(),
      //     phone: editedUser.phone?.trim(),
      //     location: editedUser.location?.trim()
      //   })
      // });

      // if (!response.ok) throw new Error('Update failed');
      // const updatedUser = await response.json();

      // Simulate successful update
      const updatedUser = {
        ...editedUser,
        name: editedUser.name.trim(),
        phone: editedUser.phone?.trim(),
        location: editedUser.location?.trim(),
        updatedAt: new Date().toISOString()
      };

      setUser(updatedUser);
      setOriginalUser(updatedUser);
      setIsEditing(false);
      setSuccessMessage('Profile updated successfully!');

    } catch (error) {
      console.error('Update failed:', error);
      setErrors({ general: 'Failed to update profile. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEditedUser({ ...user });
    setIsEditing(false);
    setErrors({});
    setSuccessMessage('');
  };

  const handleInputChange = (field, value) => {
    setEditedUser(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear specific field error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleRoleChange = async (newRole) => {
    if (newRole === user.role) return;

    setIsLoading(true);
    try {
      // Simulate API call for role change - this would typically require admin privileges
      await new Promise(resolve => setTimeout(resolve, 1000));

      const updatedUser = {
        ...user,
        role: newRole,
        updatedAt: new Date().toISOString()
      };

      setUser(updatedUser);
      setEditedUser(updatedUser);
      setSuccessMessage(`Role updated to ${newRole}!`);

    } catch (error) {
      setErrors({ general: 'Failed to update role. You may not have permission.' });
    } finally {
      setIsLoading(false);
    }
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

      {/* <Button asChild>
        <Link href="/login">jon the party for here ooo</Link>
      </Button> */}
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-red-100 p-4 md:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">

          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-2xl flex items-center">
              <CheckCircle size={20} className="mr-2" />
              {successMessage}
            </div>
          )}

          {/* General Error Message */}
          {errors.general && (
            <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-2xl flex items-center">
              <AlertCircle size={20} className="mr-2" />
              {errors.general}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

            {/* Profile Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
                {isLoading && (
                  <div className="absolute inset-0 bg-white bg-opacity-75 rounded-3xl flex items-center justify-center z-10">
                    <Loader className="animate-spin text-blue-500" size={32} />
                  </div>
                )}

                <div className="text-center">
                  <div className="relative inline-block mb-6">
                    <div className="w-24 h-24 md:w-32 md:h-32 avatar rounded-full flex items-center justify-center mx-auto shadow-lg">
                      <h1>{userData.name[0]}</h1>
                    </div>
                    {user.verified && (
                      <div className={`absolute -top-2 -right-2 ${userData.verified && 'bg-green-500'} rounded-full p-2 shadow-lg`}>
                        {userData.verified && <CheckCircle size={20} className="text-white" />}
                      </div>
                    )}
                  </div>

                  <div className="mb-6">
                    {/* Name Field */}
                    <div className="mb-2">
                      <h1 className="text-xl md:text-2xl font-bold text-gray-800">{userData.name}</h1>
                    </div>

                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRoleColor(userData.role)}`}>
                        <Shield size={12} className="inline mr-1" />
                        {userData.role}
                      </span>

                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(userData.status)}`}>
                        {userData.status === 'active' ? (
                          <CheckCircle size={12} className="inline mr-1" />
                        ) : (
                          <XCircle size={12} className="inline mr-1" />
                        )}
                        {userData.status}
                      </span>
                    </div>

                    <div className="text-sm text-gray-600 space-y-2">
                      {/* Email Field */}
                      <div className="flex items-center justify-center">
                        <Mail size={14} className="mr-2 flex-shrink-0" />
                        <span className="break-all">{userData.email}</span>
                      </div>

                      {/* Phone Field */}
                      <div className="flex items-center justify-center">
                        <Phone size={14} className="mr-2 flex-shrink-0" />
                        <span>{userData.phone || 'Not provided'}</span>
                      </div>

                      {/* Location Field */}
                      <div className="flex items-center justify-center">
                        <MapPin size={14} className="mr-2 flex-shrink-0" />
                        <span>{userData.location || 'Not provided'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 justify-center">
                    {!isEditing &&
                      <button
                        onClick={handleEdit}
                        disabled={isLoading}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg flex items-center gap-2 mx-auto disabled:opacity-50"
                      >
                        <Edit size={16} />
                        Edit Profile
                      </button>
                    }

                    {isEditing && hasChanges && (
                      <p className="text-xs text-gray-500 text-center">
                        You have unsaved changes
                      </p>
                    )}
                  </div>
                </div>
              </div>

{/* form for editing personal data */}
              {isEditing && <div className="bg-white rounded-lg shadow-sm border mt-5 border-gray-200 p-4 lg:p-6">
                <h1 className='mb-4 font-bold text-blue-600'>Edit your Personal Info</h1>
                <div className="flex-1">
                  <input
                    type="text"
                    value={editedUser.name || ''}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`border py-1 px-2 ${errors.phone ? 'border-red-300' : 'border-gray-200'} focus:border-gray-800 outline-none bg-transparent w-full`}
                    placeholder="Enter name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                <div className="flex-1">
                  <input
                    type="text"
                    value={editedUser.phone || ''}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`border mt-3 py-1 px-2 ${errors.phone ? 'border-red-300' : 'border-gray-200'} focus:border-gray-800 outline-none bg-transparent w-full`}
                    placeholder="Enter phone number"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>

                <div className="flex-1 mt-3">
                  <input
                    type="text"
                    value={editedUser.location || ''}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className={`border py-1 px-2 ${errors.location ? 'border-red-300' : 'border-gray-200'} focus:border-gray-800 outline-none bg-transparent w-full`}
                    placeholder="Enter location"
                  />
                  {errors.location && (
                    <p className="text-red-500 text-xs mt-1">{errors.location}</p>
                  )}
                </div>

                <div className="flex gap-3 mt-4 justify-center flex-wrap">
                  <button
                    onClick={handleSave}
                    disabled={isLoading || !hasChanges}
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-full font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? <Loader className="animate-spin" size={16} /> : <Save size={16} />}
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    onClick={handleCancel}
                    disabled={isLoading}
                    className="bg-gray-200 text-gray-700 px-6 py-2 rounded-full font-medium hover:bg-gray-300 transition-all duration-200 disabled:opacity-50"
                  >
                    Cancel
                  </button>
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl">
                      <span className="font-medium text-gray-600">Account Status</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(userData.status)}`}>
                        {userData.status}
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl">
                      <span className="font-medium text-gray-600">Email Verified</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${userData.verified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {userData.verified ? 'Verified' : 'Unverified'}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl">
                      <span className="font-medium text-gray-600">Role</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(userData.role)}`}>
                        {userData.role}
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl">
                      <span className="font-medium text-gray-600">Member Since</span>
                      <span className="text-sm font-medium text-gray-700">
                        {formatDate(userData.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
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
                        <p className="text-sm text-gray-600">Last updated {formatDate(user.updatedAt)}</p>
                      </div>
                    </div>
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
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Completed
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-purple-50 rounded-2xl border-l-4 border-purple-400">
                    <div className="flex items-center">
                      <User size={20} className="text-purple-500 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-800">Account Created</p>
                        <p className="text-sm text-gray-600">Joined as {user.role}</p>
                      </div>
                    </div>
                    <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {formatDate(user.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile