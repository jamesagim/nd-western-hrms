import axios from "axios";

const API = "http://localhost:5001/api/dashboard";

export const getDashboard = async () => {
  const token = localStorage.getItem("token");

  return axios.get(API, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};