import axios from "axios";
const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? 'https://147.45.244.129:3000/api'
    : '/api',
  withCredentials: true
});
export default instance;