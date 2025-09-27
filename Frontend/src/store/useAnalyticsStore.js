import api from "../api/axios";
import { toast } from "sonner";
import { create } from "zustand";

export const useAnalyticsStore = create((set) => ({
    dashboardData: [], 
    dailyData: [], 
    weeklyData: [], 
    monthlyData: [], 
    yearlyData: [], 
    isGettingDashboardData: false, 
    isGettingDailyData: false, 
    isGettingWeeklyData: false, 
    isGettingMonthlyData: false, 
    isGettingYearlyData: false, 


    getDashboardData: async() => {
        set({isGettingDashboardData: true})
        try {
            const res = await api.get('/api/analytics/dashboard')
            set({dashboardData: res.data})
        } catch (error) {
            console.log("error in getting dashboard data ", error)
            toast.error(error.response.data.msg)
        } finally {
            set({isGettingDashboardData: false})
        }
    }, 


}))


