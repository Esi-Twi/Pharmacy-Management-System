import Loader from '../../components/Loader';
import { ArrowLeft, X } from 'lucide-react';
import React, { use, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import api from '../../api/axios'
import { useNavigate } from 'react-router-dom';


function TicketCheck() {
    const [drugs, setDrugs] = useState([])
    const [isGettingDrugs, setIsGettingDrugs] = useState(false)
    const user = JSON.parse(localStorage.getItem('user'))
    const [salesItems, setSalesItems] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()
    const [selectedSale, setSelectedSale] = useState([])

    useEffect(() => {
        setIsGettingDrugs(true)
        const storedDrugs = JSON.parse(localStorage.getItem('ticket-drugs')) || [];
        setDrugs(storedDrugs);

        // Initialize salesItems with quantity 1 for each drug
        const initialItems = storedDrugs.map(drug => ({
            id: drug._id,
            quantity: 1
        }));
        setSalesItems(initialItems);

        setIsGettingDrugs(false)
    }, [])


    //  Handle input change
    const handleChange = (drugId, value) => {
        setSalesItems(prev => (
            prev.map(item =>
                item.id === drugId
                    ? { ...item, quantity: Number(value) || 1 }
                    : item
            )))
    }

    const printTicket = async () => {
        try {
            const res = await api.post(`/sales/${user._id}`, salesItems)
            toast.success(res.data.msg)

            if (res.data.success) {
                setSelectedSale(res.data.newSale)
                setIsOpen(true)
            }
        } catch (error) {
            console.log("error in creating sales", error);
            toast.error(error.response.data.msg)

        }


    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };


    const closeModal = () => {
        setIsOpen(false)
        navigate('/create-sales')
    }

    return (
        <div className='p-4'>
            <Link to='/create-sales' className="flex items-center gap-2 mb-4">
                <ArrowLeft /> Back
            </Link>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 m-4 lg:p-6">
                <div className='flex items-center justify-between'>
                    <h1 className='text-2xl font-bold text-blue-700'>CREATE SALES</h1>

                    <button type="button" className="bg-green-800 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-900 transition-colors" onClick={printTicket}
                    > Print Ticket</button>
                </div>
            </div>

            {isGettingDrugs ? <Loader /> :
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 m-4 lg:p-6">
                    <table className="min-w-full divide-y divide-gray-200 text-left">
                        <thead className="bg-blue-600 !text-white !text-lg">
                            <tr>
                                <th className='py-2 pl-4'>No</th>
                                <th className='py-2 pl-4'>Drug</th>
                                <th>Price</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 ">
                            {drugs.map((drug, index) => {
                                return <tr key={index} className="hover:bg-gray-50">
                                    <td className='pl-6 pt-5'>{index + 1}</td>
                                    <td>{drug.name}</td>
                                    <td>{drug.selling_price}</td>
                                    <td>
                                        <input type='number' defaultValue={1}
                                            onChange={(e) => handleChange(drug._id, e.target.value)}
                                            className='border-b-2 border-gray-700 px-4 text-center outline-none' />
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>}


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
                                <button onClick={closeModal}><X /></button>
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

export default TicketCheck