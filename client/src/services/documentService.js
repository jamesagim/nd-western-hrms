import axios from "axios";

const API =
  "http://localhost:5001/api/documents";

const getConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem(
      "token"
    )}`,
  },
});

// ==========================
// GET ALL DOCUMENTS
// ==========================

export const getDocuments = () => {
  return axios.get(
    API,
    getConfig()
  );
};

// ==========================
// GET SINGLE DOCUMENT
// ==========================

export const getDocument = (id) => {
  return axios.get(
    `${API}/${id}`,
    getConfig()
  );
};

// ==========================
// CREATE DOCUMENT
// ==========================

export const createDocument = (
  data
) => {
  return axios.post(
    API,
    data,
    getConfig()
  );
};

// ==========================
// UPDATE DOCUMENT
// ==========================

export const updateDocument = (
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
// DELETE DOCUMENT
// ==========================

export const deleteDocument = (
  id
) => {
  return axios.delete(
    `${API}/${id}`,
    getConfig()
  );
};