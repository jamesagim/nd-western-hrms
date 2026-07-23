import axios from "axios";

const API = "http://localhost:5001/api/attendance";

const getConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// Get all attendance
export const getAttendance = () => {
  return axios.get(API, getConfig());
};

// Clock In
export const clockIn = (data) => {
  return axios.post(
    `${API}/clock-in`,
    data,
    getConfig()
  );
};

// Clock Out
export const clockOut = (id) => {
  return axios.put(
    `${API}/clock-out/${id}`,
    {},
    getConfig()
  );
};

// Delete Attendance
export const deleteAttendance = (id) => {
  return axios.delete(
    `${API}/${id}`,
    getConfig()
  );
};