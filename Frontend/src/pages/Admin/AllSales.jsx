import { useState, useEffect, useMemo } from 'react'
import DataTable from '../../components/DataTable'
import Loader from '../../components/Loader'
import { DotSquare, List, MessageCircleHeart, Save, View, X } from 'lucide-react'
import { useSalesStore } from '../../store/useSalesStore'


function AllSales() {
  const [showList, setShowList] = useState(false)
  const { isFetchingSales, allSales, fetchSales } = useSalesStore()
  const [selectedSale, setSelectedSale] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('');


  useEffect(() => {
    fetchSales()
  }, [])

  const handleViewMore = (row) => {
    setIsOpen(true)
    setSelectedSale(row)
  }

  const handleReload = () => {
    fetchSales()
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

   const filteredData = useMemo(() => {
      if (!searchQuery) return allSales.sort();
      return allSales.filter((item) =>
        Object.values(item).some((val) =>
          val?.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }, [allSales, searchQuery]);

  return (
    <div>
      {/* header */}
      <div className="bg-white flex items-center justify-between rounded-lg shadow-sm border border-gray-200 px-4 py-1 m-4 lg:px-6">
        <div>
          <h1 className='text-blue-700 text-2xl'>Sales</h1>
          <p className='text-gray-700 text-sm'>View all sales</p>
        </div>

        <div>
          <button onClick={() => setShowList(true)} className='bg-blue-500 rounded-sm p-2 mr-3'>
            <List className='size-5 text-white' />
          </button>
          <button className='bg-blue-500 rounded-sm p-2'>
            <DotSquare onClick={() => setShowList(false)} className='size-5 text-white' />
          </button>
        </div>
      </div>

      {showList ?
        <div>
          {isFetchingSales ? <Loader /> :
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 m-4 lg:p-6">
              <DataTable
                data={allSales}
                onReload={handleReload}
                columns={{
                  _id: "ID",
                  pharmacistName: "Pharmacist",
                  totalPrice: "Total Price",
                  totalQuantity: "Total Quantity",
                  paymentMethod: "Payment Method",
                  createdAt: "Created"
                }}
                actions={(row, index) => (
                  <div>
                    <a role='button' onClick={() => handleViewMore(row)} className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-200 text-left flex items-center gap-2">
                      <View className='size-4' /> View Invoice</a>
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
        </div>
        : <div>
          {isFetchingSales ? <Loader /> :
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 m-4 lg:p-6">
              {/* Search buttons */}
              <div className="border-0 mb-7 flex justify-between items-center flex-wrap gap-3">
                <div className="flex items-center relative w-full sm:w-auto">
                  <svg className="w-5 h-5 absolute left-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  <input
                    type="text"
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full sm:w-80"
                    placeholder="Search ..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* cards */}
              <div className='mt-6 gap-6'>
                {filteredData.map((sale, index) => (
                  <div key={index} className="">
                    <div className="bg-white mb-6 rounded-lg shadow-md border border-gray-200 p-2 w-full">
                      <div className='flex items-center justify-between'>
                        <div className='flex gap-3'>
                          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <i className="bi bi-capsule text-white text-xl"></i>
                          </div>

                          <p>Sold by: <span className="text-xl font-bold text-gray-800">{sale.pharmacistName}</span></p>
                        </div>

                        <button onClick={() => { setIsOpen(true); setSelectedSale(sale) }} className='mr-3'>
                          <List className='size-5 text-black' />
                        </button>
                      </div>

                      <div className="mt-2">
                        <p>
                          <span className="text-md font-bold text-black">Total Price: </span>{sale.totalPrice}
                        </p>

                        <p>
                          <span className="text-md font-bold text-black">Total Quantity: </span>{sale.totalPrice}
                        </p>

                        <div className="text-md flex items-center gap-7 text-gray-900 space-y-2">
                          <div className="flex items-center justify-center">
                            <Save size={14} className="mr-2 flex-shrink-0" />
                            <span className="break-all"><span className='text-lg font-bold'>Created:</span> {formatDate(sale.createdAt)}</span>
                          </div>

                          <div className="flex items-center justify-center -mt-4">
                            <MessageCircleHeart size={14} className="mr-2 flex-shrink-0" />
                            <span><span className='text-lg font-bold'>Payment Method: </span>{sale.paymentMethod}</span>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>}
        </div>
      }

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div className="fixed inset-0 bg-black/50" />

          {/* Modal container */}
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-xl mx-auto z-50">
            <div className="px-8 py-6">
              {/* header */}
              <div className='flex items-center justify-end'>
                <button onClick={() => setIsOpen(false)}><X /></button>
              </div>
              <div className='flex items-center gap-2'>
                <div className="w-8 h-8 bg-blue-800 rounded-lg flex items-center justify-center">
                  <i className="bi bi-heart-pulse text-white text-lg"></i>
                </div>
                <div>
                  <h1 className='text-2xl font-bold'>Dunon Pharmacy</h1>
                  <p className='-mt-2 text-sm text-gray-600'>Your one stop pharmacy</p>
                </div>
              </div>

              {/* info */}
              <div>
                <h1 className='text-3xl font-3xl font-bold mt-6 text-blue-800'>INVOICE</h1>

                <div className='flex items-center justify-between'>
                  <p>Invoice by: <span className='font-bold text-xl'>{selectedSale.pharmacistName}</span></p>
                  <p>{formatDate(selectedSale.createdAt)}</p>
                </div>

                <div>
                  <p>Total Price: <span className='text-blue-700 font-bold text-lg'>{selectedSale.totalPrice}</span></p>
                  <p>Payment: <span className='font-bold text-md'>{selectedSale.paymentMethod}</span></p>
                </div>
              </div>

              {/* drugs */}
              <table className='mt-6 w-100'>
                <tbody>
                  <tr className='bg-blue-600 !text-white'>
                    <th className='text-center w-[15%] py-1'>NO.</th>
                    <th className='text-left w-[75%]'>Drug</th>
                    <th className='text-center w-[10%]'>Quan.</th>
                  </tr>

                  {selectedSale.items.map((sale, index) => {
                    return <tr key={index}>
                      <td className='text-center w-[5%] pt-2'>{index + 1}</td>
                      <td>{sale.drugName}</td>
                      <td className='px-8'>{sale.quantity}</td>
                    </tr>
                  })}

                  <tr className='border-t-2 border-black mt-1'>
                    <td></td>
                    <td className='text-right pr-2 font-bold pt-2'>Total Quantity</td>
                    <td className='text-center'>{selectedSale.totalQuantity}</td>
                  </tr>
                </tbody>
              </table>

              <p className='text-center mt-6 text-gray-800'>Thank you for purchasing from us.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AllSales