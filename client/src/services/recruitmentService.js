import axios from "axios";

const API = "http://localhost:5001/api/recruitment";

const getConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// Get applicants
export const getApplicants = () => {
  return axios.get(API, getConfig());
};

// Create applicant
export const createApplicant = (applicant) => {
  return axios.post(
    API,
    applicant,
    getConfig()
  );
};

// Update applicant
export const updateApplicant = (
  id,
  applicant
) => {
  return axios.put(
    `${API}/${id}`,
    applicant,
    getConfig()
  );
};

// Hire applicant
export const hireApplicant = (id) => {
  return axios.put(
    `${API}/hire/${id}`,
    {},
    getConfig()
  );
};

// Delete applicant
export const deleteApplicant = (id) => {
  return axios.delete(
    `${API}/${id}`,
    getConfig()
  );
};