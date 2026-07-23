import axios from "axios";

const API_URL = "http://localhost:5001/api/auth";

export const getUsers = () => {
  return axios.get(`${API_URL}/users`);
};

export const createUser = (user) => {
  return axios.post(`${API_URL}/register`, user);
};

export const updateUser = (id, user) => {
  return axios.put(`${API_URL}/users/${id}`, user);
};

export const deleteUser = (id) => {
  return axios.delete(`${API_URL}/users/${id}`);
};