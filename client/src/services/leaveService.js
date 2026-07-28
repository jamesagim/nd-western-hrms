import axios from "axios";

const API = "http://localhost:5001/api/leaves";

const getConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// Get all leaves
export const getLeaves = () => {
  return axios.get(API, getConfig());
};

// Get one leave
export const getLeave = (id) => {
  return axios.get(`${API}/${id}`, getConfig());
};

// Create leave request
export const createLeave = (leave) => {
  return axios.post(API, leave, getConfig());
};

// Approve / Reject leave
export const updateLeave = (id, leave) => {
  return axios.put(
    `${API}/${id}/status`,
    leave,
    getConfig()
  );
};

// Delete leave
export const deleteLeave = (id) => {
  return axios.delete(
    `${API}/${id}`,
    getConfig()
  );
};