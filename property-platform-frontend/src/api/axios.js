import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000", // adjust if different
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    withCredentials: true  },
});

// Automatically attach JWT if it exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
