import axios from "axios";
const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'production'
    ? 'https://timchin-cpu-zoopark-4e00.twc1.net/api'
    : '/api',
  withCredentials: true
});
export default instance;