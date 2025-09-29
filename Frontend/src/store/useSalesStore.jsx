import { toast } from "sonner";
import { create } from "zustand";
import api from '../api/axios'


export const useSalesStore = create((set) => ({
  isFetchingSales: false, 
  isFetchingTodaysSales: false,
  allSales: [], 
  todaySales: [],

  fetchSales: async() => {
    set({isFetchingSales: true})
    try {
      const res = await api.get('/sales')
      set({allSales: res.data.sales})
    } catch (error) {
      toast.error(error.response.data.msg)
    } finally {
      set({isFetchingSales: false})
    }
  }, 

  fetchTodaysSales: async() => {
    set({isFetchingTodaysSales: true})
    try {
      const res = await api.get('/sales/today')
      set({todaySales: res.data.todaysSales})
    } catch (error) {
      toast.error(error.response.data.msg)
    } finally {
      set({isFetchingTodaysSales: false})
    }
  }
}))




