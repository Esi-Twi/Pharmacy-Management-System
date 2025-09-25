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
    updateRole: async (data) => {
        set({ isUpdatingStaff: true })
        try {
            const res = await api.patch(`/staff/role/${data.id}`, {role: data.role})
            toast.success(res.data.msg);
        } catch (error) {
            console.log("error in update staff role" + error);
            toast.error(error.response.data.msg)
        } finally {
            set({ isUpdatingStaff: false })
        }
    },
    updateStatus: async (data) => {
        set({ isUpdatingStaff: true })
        console.log(data);
        
        try {
            const res = await api.patch(`/staff/status/${data.id}`, {status: data.status})
            toast.success(res.data.msg);
        } catch (error) {
            console.log("error in update staff status" + error);
            toast.error(error.response.data.msg)
        } finally {
            set({ isUpdatingStaff: false })
        }
    }, 
}))