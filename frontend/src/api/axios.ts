import axios, { AxiosInstance } from 'axios';
export const http: AxiosInstance = axios.create({
  baseURL: process.env.API_URL,
});
