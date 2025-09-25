import api from "../api/axios";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
    authUser: {}, 
    isGettingUser: false,

    saveAuthUser: (data) => {
        set({authUser: data})
    }, 
    getAuthUser: async() => {
        set({isGettingUser: true})
        const userId = JSON.parse(localStorage.getItem('user'))._id
        try {
            const res = await api.get(`/staff/${userId}`)
            set({authUser: res.data.staff})
        } catch (error) {
            console.log('error  in getting auth user ' + error);
        } finally {
            set({isGettingUser: false})
        }
    }
}))
