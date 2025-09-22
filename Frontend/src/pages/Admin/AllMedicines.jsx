import React, { useState, useEffect } from 'react'
import DataTable from '../../components/DataTable'
import { useDrugsStore } from '../../store/useDrugsStore'
import Loader from '../../components/Loader'
import { DeleteIcon, Edit, Loader2, View } from 'lucide-react'
import Swal from 'sweetalert2'
import api from '../../api/axios'
import { toast } from 'sonner'
import Select from 'react-select'
import { drugCategories, drugForm } from '../../lib/drugDetails'
import { useNavigate } from 'react-router-dom'

function AllMedicines() {
  const { isFetchingDrugs, drugs, fetchDrugs, isUpdatingDrug, viewMore } = useDrugsStore()
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    form: '',
    batch_number: '',
    expiry_date: '',
    manufacture_date: '',
    quantity: '',
    purchase_price: '',
    selling_price: '',
  })
  const navigate = useNavigate()

  useEffect(() => {
    fetchDrugs()
  }, [])


  const handleEdit = (row) => {
    setIsOpen(true)
    setFormData(row)
  };

  const updateData = (e) => {
    e.preventDefault()
    const { _id, createdAt, deleted, updatedAt, ...rest } = formData;
    const id = _id;
    setFormData(rest)

    const hasEmptyField = Object.values(formData).some(value => value === '');
    if (hasEmptyField) {
      Swal.fire({
        icon: 'warning',
        title: 'Attention Please',
        text: 'All fields are required'
      });
      return;
    }

    api.patch(`/drugs/${id}`, formData)
    .then(res => {
        setIsOpen(false)
    fetchDrugs()
      toast.success(res.data.msg)
    }).catch(error => {
      toast.error(error.response.data.msg || "An error occurred")
    })
  }

  const handleViewMore = (row) => {
    viewMore(row)
    navigate('/view-more')
  }


  const handleDelete = (row) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You want to delete the medicine ${row.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        api.delete(`/drugs/${row._id}`)
          .then(response => {
            toast.success(response.data.msg)
            fetchDrugs()
          })
          .catch(error => {
            toast.error(error.response.data.msg || "An error occurred")
          })
      }
    })
  };

  const handleReload = () => {
    fetchDrugs()
  };

  return (
    <div>
      {isFetchingDrugs ? <Loader /> :
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 m-4 lg:p-6">
          <DataTable
            data={drugs}
            onReload={handleReload}
            columns={{
              _id: "ID",
              name: "Medicine Name",
              category: "Category",
              form: "Form",
              batch_number: "Batch No",
              createdAt: "Created"
            }}
            actions={(row, index) => (
              <div>
                <a role='button' onClick={() => handleEdit(row)} className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-200 text-left flex items-center gap-2">
                  <Edit className='size-4' /> Modify Record</a>
                <a role='button' onClick={() => handleViewMore(row)} className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-200 text-left flex items-center gap-2">
                  <View className='size-4' /> View More</a>
                <a role='button' onClick={() => handleDelete(row)} className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-200 text-left flex items-center gap-2">
                  <DeleteIcon className='size-4' /> Delete</a>
              </div>
            )}
            columnRenderers={{
              _id: (_, __, rowIndex) => rowIndex + 1,
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
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-3xl mx-auto z-50">
            <form className="px-8 py-6" onSubmit={updateData}>
              {/* Header */}
              <div className="flex justify-between items-center border-b pb-1 mb-5">
                <h2 className="text-xl font-semibold">Edit Medicine</h2>
                <button type="button" className="text-gray-500 hover:text-gray-700" onClick={() => setIsOpen(false)} >
                  <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                    <rect opacity="0.5" x={6} y="17.3137" width={16} height={2} rx={1} transform="rotate(-45 6 17.3137)" fill="currentColor" />
                    <rect x="7.41422" y={6} width={16} height={2} rx={1} transform="rotate(45 7.41422 6)" fill="currentColor" />
                  </svg>
                </button>
              </div>

              <div className='grid md:grid-cols-2 gap-5'>
                <div className="flex-1 flex gap-0 flex-col mb-3">
                  <label>Name of Medicine</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="border mt-1 lg:w-4/5 py-1 px-2 focus:border-gray-800 outline-none bg-transparent w-full"
                  />
                </div>

                <div className="flex-1 flex gap-0 flex-col mb-3">
                  <label>Category</label>
                  <Select
                    className='lg:w-4/5'
                    options={drugCategories}
                    value={drugCategories.find(option => option.value === formData.category) || null}
                    onChange={(selected) => setFormData({ ...formData, category: selected.value })}
                  />
                </div>

                <div className="flex-1 flex gap-0 flex-col mb-3">
                  <label>Medicine's form</label>
                  <Select
                    className='lg:w-4/5'
                    options={drugForm}
                    value={drugForm.find(option => option.value === formData.form) || null}
                    onChange={(selected) => setFormData({ ...formData, form: selected.value })}
                  />
                </div>

                <div className="flex-1 flex gap-0 flex-col mb-3">
                  <label>Batch Number</label>
                  <input
                    type="text"
                    value={formData.batch_number}
                    onChange={(e) => setFormData({ ...formData, batch_number: e.target.value })}
                    className="border mt-1 lg:w-4/5 py-1 px-2 focus:border-gray-800 outline-none bg-transparent w-full"
                  />
                </div>

                <div className="flex-1 flex gap-0 flex-col mb-3">
                  <label>Date Manufactured</label>
                  <input
                    type="date"
                    value={formData.manufacture_date ? new Date(formData.manufacture_date).toISOString().split("T")[0] : ""}
                    onChange={(e) => setFormData({ ...formData, manufacture_date: e.target.value })}
                    className="border mt-1 lg:w-4/5 py-1 px-2 focus:border-gray-800 outline-none bg-transparent w-full"
                  />
                </div>

                <div className="flex-1 flex gap-0 flex-col mb-3">
                  <label>Expiry Date</label>
                  <input
                    type="date"
                    value={formData.expiry_date ? new Date(formData.manufacture_date).toISOString().split("T")[0] : ""} onChange={(e) => setFormData({ ...formData, expiry_date: e.target.value })}
                    className="border mt-1 lg:w-4/5 py-1 px-2 focus:border-gray-800 outline-none bg-transparent w-full"
                  />
                </div>

                <div className="flex-1 flex gap-0 flex-col mb-3">
                  <label>Quantity</label>
                  <input
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="border mt-1 lg:w-4/5 py-1 px-2 focus:border-gray-800 outline-none bg-transparent w-full"
                  />
                </div>

                <div className="flex-1 flex gap-0 flex-col mb-3">
                  <label>Purchase Price (GHS)</label>
                  <input
                    type="text"
                    value={formData.purchase_price}
                    onChange={(e) => setFormData({ ...formData, purchase_price: e.target.value })}
                    className="border mt-1 lg:w-4/5 py-1 px-2 focus:border-gray-800 outline-none bg-transparent w-full"
                  />
                </div>

                <div className="flex-1 flex gap-0 flex-col mb-3">
                  <label>Selling Price (GHS)</label>
                  <input
                    type="text"
                    value={formData.selling_price}
                    onChange={(e) => setFormData({ ...formData, selling_price: e.target.value })}
                    className="border mt-1 lg:w-4/5 py-1 px-2 focus:border-gray-800 outline-none bg-transparent w-full"
                  />
                </div>

              </div>

              <div className='flex items-center justify-end pr-5'>
                <button className='bg-blue-700 rounded text-white px-9 py-1 mt-5' disabled={isUpdatingDrug}>
                  {isUpdatingDrug ? (
                    <div>
                      <Loader2 /> Updating ...
                    </div>) : "Modify"
                  }
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AllMedicines