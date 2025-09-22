import {create} from 'zustand'
import api from '../api/axios'
import { toast } from 'sonner'

export const useStaffStore = create((set) => ({
    allStaffs: [], 
    isGettingStaff: false,

    getAllStaffs: async() => {
        set({isGettingStaff: true})
        try {
            const res = await api.get("/staff")
            set({allStaffs: res.data.staffs})
        } catch (error) {
            toast.error(error.response.data.msg)
        } finally {
            set({isGettingStaff: false})
        }
    }


}))