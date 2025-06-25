import axios from 'axios';

const api = axios.create({
  baseURL: 'https://task-management-web-application-bac.vercel.app/api',
  withCredentials: true,
});

export default api;
