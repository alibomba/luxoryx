import axios from 'axios';

const axiosClient = axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL}/api`,
    headers: {
        "Content-Type": "application/json"
    }
});

axiosClient.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) config.headers['Authorization'] = `Bearer ${accessToken}`;

        return config;
    },
    error => Promise.reject(error)
)


export default axiosClient;