import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

function AddMedicine() {
  const [errors, setErrors] = useState({});
  const errorMessage = ''
  const [data, setData] = useState([{

  }]);
  const {register, handleSubmit, reset} = useForm()

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

  /*
  const drugSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'Name of drug is required'], 
        trim: true
    }, 
    category: {
        type: String, 
        enum: {
            values:  drugCategories, 
            messages: '{VALUE} is not supported'
        },
        required: [true, 'Drug category is required'], 
    },
    form: {
        type: String, 
        enum: {
            values: drugsForm,
            messages: '{VALUE} is not supported'
        }
    }, 
    batch_number: {
        type: String, 
        required: [true, 'Batch number is required'], 
        trim: true
    },
    expiry_date: {
        type: Date, 
        required: [true, 'Expiry date is required']
    }, 
     manufacture_date: {
        type: Date, 
        required: [true, 'Manufacture date is required']
    }, 
    quantity: {
        type: Number, 
        required: [true, 'Quantity of drug is required'], 
    }, 
    purchase_price: {
        type: Number, 
        required: [true, 'Purchase Price is required']
    }, 
    selling_price: {
        type: Number, 
        required: [true, 'Selling Price is required']
    }, 
},
  */


  const handleInputChange = (field, value) => {
    setData(prev => ({
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

  const addDrug = () => {
    e.preventDefault()

    console.log('submit add Data');
    
  }

  return (
    <div className='flex items-center justify-start pt-12 pl-12'>

      <div className="bg-white rounded-lg w-4/5 shadow-lg border border-gray-200 px-4 py-6 lg:p-6">
        <h1 className='text-2xl font-bold text-blue-700 mb-5'>Add Medicine</h1>

        <form onSubmit={handleSubmit(addDrug)}>
          <div className="flex-1 flex gap-0 flex-col">
            <label>Name of Medicine</label>
            <input type="text" {...register("name")}
              className={`border mt-1 md:w-2/5 py-1 px-2 ${errors.phone ? 'border-red-300' : 'border-gray-400'} focus:border-gray-800 outline-none bg-transparent w-full`}
            />
           
          </div>

           {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}

          <button className='bg-blue-700 rounded text-white px-9 py-1 mt-5'>Add Medicine</button>
        </form>
      </div>
    </div>
  )
}

export default AddMedicine