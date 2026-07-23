import axios from "axios";

const API = "http://localhost:5001/api/auth";

// ==========================
// Get Auth Headers
// ==========================
const getConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// ==========================
// Login
// ==========================
export const login = (credentials) =>
  axios.post(
    `${API}/login`,
    credentials
  );

// ==========================
// Register
// ==========================
export const register = (admin) =>
  axios.post(
    `${API}/register`,
    admin
  );

// ==========================
// Get Logged-in Admin
// ==========================
export const getProfile = () =>
  axios.get(
    `${API}/profile`,
    getConfig()
  );

// ==========================
// Update Profile
// ==========================
export const updateProfile = (
  data
) =>
  axios.put(
    `${API}/profile`,
    data,
    getConfig()
  );

// ==========================
// Change Password
// ==========================
export const changePassword = (
  data
) =>
  axios.put(
    `${API}/change-password`,
    data,
    getConfig()
  );

// ==========================
// Get All Users
// ==========================
export const getUsers = () =>
  axios.get(
    `${API}/users`,
    getConfig()
  );

// ==========================
// Update User
// ==========================
export const updateUser = (
  id,
  data
) =>
  axios.put(
    `${API}/users/${id}`,
    data,
    getConfig()
  );

// ==========================
// Delete User
// ==========================
export const deleteUser = (
  id
) =>
  axios.delete(
    `${API}/users/${id}`,
    getConfig()
  );