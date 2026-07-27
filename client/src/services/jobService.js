import axios from "axios";

const API_URL = "http://localhost:5001/api/jobs";

const getConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getJobs = () => {
  return axios.get(API_URL, getConfig());
};

export const getJob = (id) => {
  return axios.get(`${API_URL}/${id}`, getConfig());
};

export const createJob = (job) => {
  return axios.post(API_URL, job, getConfig());
};

export const updateJob = (id, job) => {
  return axios.put(
    `${API_URL}/${id}`,
    job,
    getConfig()
  );
};

export const deleteJob = (id) => {
  return axios.delete(
    `${API_URL}/${id}`,
    getConfig()
  );
};