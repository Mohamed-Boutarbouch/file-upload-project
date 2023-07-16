import axios from 'axios';

const axiosClient = axios.create({
  baseURL: '/api',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
});

// axiosClient.interceptors.request.use((config) => {
//   if (config.data instanceof FormData) {
//     config.headers['Content-Type'] = 'multipart/form-data';
//   }
//   return config;
// });

export default axiosClient;
