import axios from "axios";

const API =
  "http://localhost:5001/api/payroll";

const config = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// ==========================
// GET ALL PAYROLL
// ==========================
export const getPayroll = () => {
  return axios.get(API, config());
};

// ==========================
// CREATE PAYROLL
// ==========================
export const createPayroll = (data) => {
  return axios.post(
    API,
    data,
    config()
  );
};

// ==========================
// UPDATE PAYROLL
// ==========================
export const updatePayroll = (
  id,
  data
) => {
  return axios.put(
    `${API}/${id}`,
    data,
    config()
  );
};

// ==========================
// MARK AS PAID
// ==========================
export const markPayrollPaid = (id) => {
  return axios.put(
    `${API}/paid/${id}`,
    {},
    config()
  );
};

// ==========================
// DELETE PAYROLL
// ==========================
export const deletePayroll = (id) => {
  return axios.delete(
    `${API}/${id}`,
    config()
  );
};