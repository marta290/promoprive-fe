import axios from "axios";
import { basepath } from "../src/constants/constants";

const instance = axios.create({ baseURL: basepath });

instance.interceptors.request.use(config => {
    const token = localStorage.getItem("userToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


instance.interceptors.response.use(
    response => response, 
    error => {
        if (error.response && error.response.status === 401) { 
            localStorage.removeItem("userToken");
            window.location.reload(); 
        }
        return Promise.reject(error);
    }
);

export default instance;