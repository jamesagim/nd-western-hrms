import axios from "axios";

const API = "http://localhost:5001/api/employees";

const getConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// Get all employees
export const getEmployees = () => {
  return axios.get(API, getConfig());
};

// Get one employee
export const getEmployee = (id) => {
  return axios.get(`${API}/${id}`, getConfig());
};

// Create employee
export const createEmployee = (employee) => {
  return axios.post(API, employee, getConfig());
};

// Update employee
export const updateEmployee = (id, employee) => {
  return axios.put(`${API}/${id}`, employee, getConfig());
};

// Delete employee
export const deleteEmployee = (id) => {
  return axios.delete(`${API}/${id}`, getConfig());
};