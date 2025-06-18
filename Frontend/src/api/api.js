import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL:BASE_URL,
});

export const setAuthToken = (token) =>{
    if(token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }else{
        delete api.defaults.headers.common["Authorization"];
    }
};

export default api;