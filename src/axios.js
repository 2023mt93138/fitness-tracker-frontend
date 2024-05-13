import axios from 'axios'

export const apiClient = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
    }
});
