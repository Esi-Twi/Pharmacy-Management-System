import React, { useState, useEffect } from 'react'
import DataTable from '../../components/DataTable'
import api from '../../api/axios'


function AllMedicines() {
  const sampleData = [
    {
      tableRow: {
        id: '001',
        name: 'John Doe',
        email: 'john@example.com',
        status: 'Active',
        amount: '$120.00',
        date: '2023-05-15'
      }
    },
    {
      tableRow: {
        id: '002',
        name: 'Jane Smith',
        email: 'jane@example.com',
        status: 'Inactive',
        amount: '$85.50',
        date: '2023-05-14'
      }
    },]

  const [drugs, setDrugs] = useState(null)
  
  const fetchDrugs = () => {
    api.get('/drugs')
      .then(res => {
        setDrugs(res.data.drugs)
      }).catch(error => {
        toast.error(error.response.data.msg)
      })
  }

  useEffect(() => {
    fetchDrugs()
  }, [])

  console.log(drugs);
  

 
  const handleEdit = (row) => {
    console.log("Editing row:", row);
  };

  const handleDelete = (row) => {
    console.log("Deleting row:", row);
  };

  // Reload function
  const handleReload = () => {
    console.log('Reloading data...');
  };

  return (
    <div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 m-4 lg:p-6">
        <DataTable
          data={sampleData}
          onReload={handleReload}
          actions={(row, index) => (
            <div>
              <a role='button' onClick={() => handleEdit(row)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Edit</a>
              <a role='button' onClick={() => handleDelete(row)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Delete</a>
            </div>
          )}
        />
      </div>

    </div>
  )
}

export default AllMedicines