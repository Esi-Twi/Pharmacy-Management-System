import { create } from 'zustand'
import api from '../api/axios'
import { toast } from 'sonner'

export const useDrugsStore = create((set) => ({
    isAddingDrug: false,
    isFetchingDrugs: false,
    drugs: [],
    drugToViewMore: [], 
    isUpdatingDrug: false, 

    addDrugFunction: async (data) => {
        set({ isAddingDrug: true })
        try {
            const res = await api.post('/drugs', data)
            toast.success(res.data.msg)
        } catch (error) {
            toast.error(error.response.data.msg)
        } finally {
            set({ isAddingDrug: false })
        }
    },
    fetchDrugs: async () => {
        set({ isFetchingDrugs: true })
        try {
            const res = await api.get('/drugs')
            set({ drugs: res.data.drugs })
        } catch (error) {
            toast.error(error.response.data.msg)
        } finally {
            set({ isFetchingDrugs: false })
        }
    }, 
    viewMore: async (data) => {
        set({drugToViewMore: data})
    }
}))