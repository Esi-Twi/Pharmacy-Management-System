import React, { useState, useEffect } from 'react'
import DataTable from '../../components/DataTable'
import { useDrugsStore } from '../../store/useDrugsStore'
import Loader from '../../components/Loader'
import { DeleteIcon, Edit, Loader2, View } from 'lucide-react'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'



function CreateSales() {
  const { isFetchingDrugs, drugs, fetchDrugs, isUpdatingDrug } = useDrugsStore()
  const [selectedRows, setSelectedRows] = useState([]);
  const selectedItems = selectedRows.map((i) => drugs[i]);

  const navigate = useNavigate()

  useEffect(() => {
    fetchDrugs()
  }, [])

  const createSales = () => {
    const length = selectedItems.length
    if (!length) {
      return toast.error("Please medicines to proceed")
    }

    localStorage.setItem('ticket-drugs', JSON.stringify(selectedItems))
    navigate('/ticket')
  }


  return (
    <div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 m-4 lg:p-6">
        <div className='flex items-center justify-between'>
          <h1 className='text-2xl font-bold text-blue-700'>CREATE SALES</h1>

          <button type="button" className="bg-green-800 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-900 transition-colors" onClick={createSales}
          > Print Ticket</button>
        </div>
      </div>

      {isFetchingDrugs ? <Loader /> :
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 m-4 lg:p-6">
            <DataTable
              data={drugs}
              onReload={() => fetchDrugs()}
              columns={{
                _id: "ID",
                name: "Medicine",
                selling_price: "Price",
                category: "Category",
                form: "Form",
                createdAt: "Created"
              }}
              onSelectedRowsChange={(rows) => setSelectedRows(rows)}
              selectedRows={selectedRows}
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
        </div>
      }


    </div>
  )
}

export default CreateSales