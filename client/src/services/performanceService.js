import axios from "axios";

const API =
  "http://localhost:5001/api/performance";

const getConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem(
      "token"
    )}`,
  },
});

// ==========================
// Get All Performance Reviews
// ==========================

export const getPerformance = () => {
  return axios.get(API, getConfig());
};

// ==========================
// Get Single Performance
// ==========================

export const getSinglePerformance = (
  id
) => {
  return axios.get(
    `${API}/${id}`,
    getConfig()
  );
};

// ==========================
// Create Performance Review
// ==========================

export const createPerformance = (
  data
) => {
  return axios.post(
    API,
    data,
    getConfig()
  );
};

// ==========================
// Update Performance Review
// ==========================

export const updatePerformance = (
  id,
  data
) => {
  return axios.put(
    `${API}/${id}`,
    data,
    getConfig()
  );
};

// ==========================
// Delete Performance Review
// ==========================

export const deletePerformance = (
  id
) => {
  return axios.delete(
    `${API}/${id}`,
    getConfig()
  );
};