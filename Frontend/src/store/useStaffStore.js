import { create } from 'zustand'
import api from '../api/axios'
import { toast } from 'sonner'

export const useStaffStore = create((set) => ({
    allStaffs: [],
    isGettingStaff: false,
    isUpdatingStaff: false,

    getAllStaffs: async () => {
        set({ isGettingStaff: true })
        try {
            const res = await api.get("/staff")
            set({ allStaffs: res.data.staffs })
        } catch (error) {
            toast.error(error.response.data.msg)
        } finally {
            set({ isGettingStaff: false })
        }
    },
    updateRole: async (id, role) => {
        set({ isUpdatingStaff: true })
        console.log(id, role);
        
        // try {
        //     const res = await api.patch(`/staff/role/${id}`, role)
        //     toast.success(res.data.msg);
        // } catch (error) {
        //     console.log("error in update staff role" + error);
        //     toast.error(error.response.data.msg)
        // } finally {
        //     set({ isUpdatingStaff: false })
        // }
    },
    updateStatus: async (id, status) => {
        set({ isUpdatingStaff: true })
        try {
            const res = await api.patch(`/staff/status/${id}`, status)
            toast.success(res.data.msg);
        } catch (error) {
            console.log("error in update staff status" + error);
            toast.error(error.response.data.msg)
        } finally {
            set({ isUpdatingStaff: false })
        }
    }
}))