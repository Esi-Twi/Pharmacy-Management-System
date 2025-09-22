import React, { useState } from 'react'
import Select from 'react-select'
import Swal from 'sweetalert2'
import { useDrugsStore } from '../../store/useDrugsStore'
import { Loader2 } from 'lucide-react'
import { drugCategories, drugForm } from '../../lib/drugDetails'


function AddStaff() {
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
  const { isAddingDrug, addDrugFunction } = useDrugsStore()

  const addDrug = (e) => {
    e.preventDefault()

    const hasEmptyField = Object.values(formData).some(value => value === '');
    if (hasEmptyField) {
      Swal.fire({
        icon: 'warning',
        title: 'Attention Please',
        text: 'All fields are required'
      });
      return;
    }

    addDrugFunction(formData)

    setFormData({
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

  }



  return (
    <div className='flex items-center justify-start pt-12 pl-12 pr-5'>

      <div className="bg-white rounded-lg w-full xl:w-4/5 shadow-lg  border border-gray-200 px-4 py-6 lg:p-6">
        <h1 className='text-2xl font-bold text-blue-700 mb-5'>Add Medicine</h1>

        <form onSubmit={addDrug}>
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
                value={formData.manufacture_date}
                onChange={(e) => setFormData({ ...formData, manufacture_date: e.target.value })}
                className="border mt-1 lg:w-4/5 py-1 px-2 focus:border-gray-800 outline-none bg-transparent w-full"
              />
            </div>

            <div className="flex-1 flex gap-0 flex-col mb-3">
              <label>Expiry Date</label>
              <input
                type="date"
                value={formData.expiry_date}
                onChange={(e) => setFormData({ ...formData, expiry_date: e.target.value })}
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

          <button className='bg-blue-700 rounded text-white px-9 py-1 mt-5' disabled={isAddingDrug}>
            {isAddingDrug ? (
              <div>
                <Loader2 /> Adding ...
              </div>) : "Add Medicine"
            }
          </button>
        </form>
      </div>
    </div>)
}

export default AddStaff