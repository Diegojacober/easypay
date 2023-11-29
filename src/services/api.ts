import axios from 'axios';

const api = axios.create({
  baseURL: ' https://ae89-189-57-188-42.ngrok-free.app/api',
});

export default api;
