import React, { useState, useEffect } from 'react'
import DataTable from '../../components/DataTable'
import Loader from '../../components/Loader'
import { DeleteIcon, Edit, Loader2, View } from 'lucide-react'
import Swal from 'sweetalert2'
import api from '../../api/axios'
import { toast } from 'sonner'
import Select from 'react-select'
import { useNavigate } from 'react-router-dom'
import { useStaffStore } from '../../store/useStaffStore'


function ManageStaff() {
  const { isGettingStaffs, getAllStaffs, allStaffs, isUpdatingStaff, updateRole, updateStatus } = useStaffStore()
  const [isOpen, setIsOpen] = useState(false)
  const [isUpdatingRole, setIsUpdatingRole] = useState(false)
  const [roleUpdate, setRoleUpdate] = useState({})
  const [statusUpdate, setStatusUpdate] = useState({})
  const roles = [
    { label: 'Admin', value: "Admin" },
    { label: 'Pharmacist', value: "Pharmacist" },
  ]
  const status = [
    { label: 'Active', value: "active" },
    { label: 'Inactive', value: "inactive" },
  ]

  const navigate = useNavigate()

  useEffect(() => {
    getAllStaffs()
    localStorage.removeItem('staff')
  }, [])

  const handleUpdateRole = async (row) => {
    setIsOpen(true)
    setRoleUpdate({id: row._id, role: row.role})
    setIsUpdatingRole(true)
  }

  const updateRoleFunction = (data) => {
    updateRole(data)
    setIsOpen(false)
    getAllStaffs()
    setRoleUpdate({})
  }

  const handleUpdateStatus = (row) => {
    setIsOpen(true)
    setStatusUpdate({id: row._id, status: row.status})
    setIsUpdatingRole(false)
  }

   const updateStatusFunction = (data) => {
    console.log(statusUpdate);
    
    updateStatus(data)
    setIsOpen(false)
    getAllStaffs()
    setStatusUpdate({})
  }

  const handleViewMore = (row) => {
    localStorage.setItem('staff', JSON.stringify(row))
    navigate('/view-more')
  }


  const handleDelete = (row) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You want to delete the staff ${row.name || row.email}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        api.delete(`/staff/${row._id}`)
          .then(response => {
            toast.success(response.data.msg)
            getAllStaffs()
          })
          .catch(error => {
            toast.error(error.response.data.msg || "An error occurred")
          })
      }
    })
  };

  const handleReload = () => {
    getAllStaffs()
  };

  return (
    <div>
      {isGettingStaffs ? <Loader /> :
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 m-4 lg:p-6">
          <DataTable
            data={allStaffs}
            onReload={handleReload}
            columns={{
              _id: "ID",
              name: "Medicine Name",
              role: "Role",
              email: "Email",
              status: "Status",
              createdAt: "Created"
            }}
            actions={(row, index) => (
              <div>
                <a role='button' onClick={() => handleUpdateRole(row)} className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-200 text-left flex items-center gap-2">
                  <Edit className='size-4' /> Update Role</a>
                <a role='button' onClick={() => handleUpdateStatus(row)} className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-200 text-left flex items-center gap-2">
                  <Edit className='size-4' /> Update Status</a>
                <a role='button' onClick={() => handleViewMore(row)} className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-200 text-left flex items-center gap-2">
                  <View className='size-4' /> View More</a>
                <a role='button' onClick={() => handleDelete(row)} className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-200 text-left flex items-center gap-2">
                  <DeleteIcon className='size-4' /> Delete</a>
              </div>
            )}
            columnRenderers={{
              _id: (_, __, rowIndex) => rowIndex + 1,
              name: (value) => value || 'User',
              createdAt: (value) => {
                if (!value) return "";
                const d = value instanceof Date ? value : new Date(value);
                const year = d.getFullYear();
                const month = String(d.getMonth() + 1).padStart(2, "0");
                const day = String(d.getDate()).padStart(2, "0");
                return `${year}-${month}-${day}`;
              }
            }}
          />
        </div>}

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div className="fixed inset-0 bg-black/50" />

          {/* Modal container */}
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md mx-auto z-50">
            <form className="px-8 py-6">
              {/* Header */}
              <div className="flex justify-between items-center border-b pb-1 mb-5">
                <h2 className="text-xl font-semibold">
                  Update {isUpdatingRole ? <>{roleUpdate.name || roleUpdate.email} Role</> : <>{statusUpdate.name || statusUpdate.email} Status</>}
                </h2>
                <button type="button" className="text-gray-500 hover:text-gray-700" onClick={() => setIsOpen(false)} >
                  <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                    <rect opacity="0.5" x={6} y="17.3137" width={16} height={2} rx={1} transform="rotate(-45 6 17.3137)" fill="currentColor" />
                    <rect x="7.41422" y={6} width={16} height={2} rx={1} transform="rotate(45 7.41422 6)" fill="currentColor" />
                  </svg>
                </button>
              </div>

              {isUpdatingRole ? (
                <div className="flex-1 flex gap-0 flex-col mb-3">
                  <label>Role</label>
                  <Select
                    className='mt-1'
                    options={roles}
                    value={roles.find(option => option.value === roleUpdate.role) || {}}
                    onChange={(selected) => setRoleUpdate({ ...roleUpdate, role: selected.value })}
                  />
                </div>
              ) : (
                <div className="flex-1 flex gap-0 flex-col mb-3">
                  <label>Status</label>
                  <Select
                    className='mt-1'
                    options={status}
                    value={status.find(option => option.value === statusUpdate.status) || null}
                    onChange={(selected) => setStatusUpdate({...statusUpdate, status: selected.value })}
                  />
                </div>
              )}


              <div className='flex items-center justify-end pr-5'>
                {isUpdatingRole ? (
                  <button onClick={() => updateRoleFunction(roleUpdate)} className='bg-blue-700 rounded text-white px-9 py-1 mt-5' disabled={isUpdatingStaff}>
                    {isUpdatingStaff ? (
                      <div>
                        <Loader2 /> Updating ...
                      </div>) : "Update"
                    }
                  </button>
                ) : (
                  <button onClick={() => updateStatusFunction(statusUpdate)} className='bg-blue-700 rounded text-white px-9 py-1 mt-5' disabled={isUpdatingStaff}>
                    {isUpdatingStaff ? (
                      <div>
                        <Loader2 /> Updating ...
                      </div>) : "Update"
                    }
                  </button>
                )}

              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ManageStaff