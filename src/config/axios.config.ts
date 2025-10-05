import axios from 'axios';

// Create an instance of axios
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000",  // Set your base URL here
    timeout: 10000,                      // Set a timeout limit
    headers: {
        'Content-Type': 'application/json',  // Default headers
    },
});

// Request interceptor
// axiosInstance.interceptors.request.use(
//     config => {
//         // Add authorization token or any other request modification here
//         const token = localStorage.getItem('token'); // Example: getting token from localStorage
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     error => {
//         // Handle request error here
//         return Promise.reject(error);
//     }
// );

// Response interceptor
axiosInstance.interceptors.response.use(
    response => {
        return response;
    },
    error => {

        return Promise.reject(error);
    }
);

export default axiosInstance;
