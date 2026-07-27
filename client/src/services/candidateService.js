import axios from "axios";

const API_URL = "http://localhost:5001/api/candidates";

const getConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getCandidates = () => {
  return axios.get(API_URL, getConfig());
};

export const getCandidate = (id) => {
  return axios.get(
    `${API_URL}/${id}`,
    getConfig()
  );
};

export const createCandidate = (candidate) => {
  return axios.post(
    API_URL,
    candidate,
    getConfig()
  );
};

export const updateCandidate = (
  id,
  candidate
) => {
  return axios.put(
    `${API_URL}/${id}`,
    candidate,
    getConfig()
  );
};

export const deleteCandidate = (id) => {
  return axios.delete(
    `${API_URL}/${id}`,
    getConfig()
  );
};