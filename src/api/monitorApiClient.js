import axios from 'axios';
//import router from '@/router/index.js';
const monitorApiClient = axios.create({
  validateStatus: (status) => status < 500,
  baseURL: import.meta.env.VITE_AXIOS_BASE_URL + '/monitor'
});
export { monitorApiClient };