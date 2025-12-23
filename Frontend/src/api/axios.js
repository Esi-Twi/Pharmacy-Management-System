import axios from "axios";

const api = axios.create({
    // baseURL: "http://localhost:3000",
    baseURL: import.meta.env.VITE_REACT_APP_BACKEND_BASEURL, 
    withCredentials: true
})

export default api;

