import axios from "axios";

const API = "http://localhost:5001/api/payroll";

const getConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// ==========================
// GET ALL PAYROLL
// ==========================
export const getPayroll = () => {
  return axios.get(API, getConfig());
};

// ==========================
// GET SINGLE PAYROLL
// ==========================
export const getSinglePayroll = (id) => {
  return axios.get(`${API}/${id}`, getConfig());
};

// ==========================
// CREATE PAYROLL
// ==========================
export const createPayroll = (data) => {
  return axios.post(API, data, getConfig());
};

// ==========================
// UPDATE PAYROLL
// ==========================
export const updatePayroll = (id, data) => {
  return axios.put(
    `${API}/${id}`,
    data,
    getConfig()
  );
};

// ==========================
// MARK PAYROLL AS PAID
// ==========================
export const markPayrollPaid = (id) => {
  return axios.put(
    `${API}/paid/${id}`,
    {},
    getConfig()
  );
};

// ==========================
// DELETE PAYROLL
// ==========================
export const deletePayroll = (id) => {
  return axios.delete(
    `${API}/${id}`,
    getConfig()
  );
};