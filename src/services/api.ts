import axios from 'axios';

const api = axios.create({
  baseURL: 'https://5a83-189-57-188-42.ngrok-free.app/api',
});

export default api;
