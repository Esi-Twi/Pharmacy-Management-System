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
        } finally {
            set({isGettingDashboardData: false})
        }
    }, 
    getDailyData: async() => {
        set({isGettingDailyData: true})
        try {
            const res = await api.get('/api/analytics/daily')
            set({dailyData: res.data? res.data : {mostSoldDrugs: [], numOfSales: 0, todaysSales: []}})
            console.log(dailyData);
            
        } catch (error) {
            console.log("error in getting daily data ", error)
        } finally {
            set({isGettingDailyData: false})
        }
    }, 
     getWeeklyData: async() => {
        set({isGettingWeeklyData: true})
        try {
            const res = await api.get('/api/analytics/weekly')
            set({weeklyData: res.data})
        } catch (error) {
            console.log("error in getting weekly data ", error)
        } finally {
            set({isGettingWeeklyData: false})
        }
    },
     getMonthlyData: async() => {
        set({isGettingMonthlyData: true})
        try {
            const res = await api.get('/api/analytics/monthly')
            set({monthlyData: res.data})
        } catch (error) {
            console.log("error in getting monthly data ", error)
        } finally {
            set({isGettingMonthlyData: false})
        }
    },
     getYearlyData: async() => {
        set({isGettingYearlyData: true})
        try {
            const res = await api.get('/api/analytics/yearly')
            set({yearlyData: res.data})
        } catch (error) {
            console.log("error in getting yearly data ", error)
        } finally {
            set({isGettingYearlyData: false})
        }
    }, 
    


}))


