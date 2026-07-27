import axios from "axios";

const API = "http://localhost:5001/api/candidates";

const config = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getCandidates = () => axios.get(API, config());
export const getCandidate = (id) => axios.get(`${API}/${id}`, config());
export const createCandidate = (candidate) =>
  axios.post(API, candidate, config());
export const updateCandidate = (id, candidate) =>
  axios.put(`${API}/${id}`, candidate, config());
export const deleteCandidate = (id) => axios.delete(`${API}/${id}`, config());
export const hireCandidate = (id) =>
  axios.put(
    `${API}/${id}/hire`,
    {},
    config()
  );