import axios from 'axios';

const api = axios.create({
  baseURL: 'https://7241-189-57-188-42.ngrok-free.app/api',
});

export default api;
