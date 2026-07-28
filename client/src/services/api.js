import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001/api",
});

API.interceptors.request.use((config) => {
  const admin = JSON.parse(localStorage.getItem("admin"));

  if (admin?.token) {
    config.headers.Authorization = `Bearer ${admin.token}`;
  }

  return config;
});

export default API;