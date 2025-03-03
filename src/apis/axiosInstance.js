import axios from 'axios';

 

const axiosInstance = axios.create({
  baseURL: '',
  timeout: 5000,
  headers: {
    // Authorization: `Bearer ${API_KEY}`, 
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
