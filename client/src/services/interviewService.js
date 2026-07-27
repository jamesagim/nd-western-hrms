import axios from "axios";

const API =
  "http://localhost:5001/api/interviews";


const config = () => ({
  headers: {
    Authorization:
      `Bearer ${localStorage.getItem("token")}`,
  },
});


// GET ALL INTERVIEWS
export const getInterviews = () =>
  axios.get(
    API,
    config()
  );


// GET ONE
export const getInterview = (id) =>
  axios.get(
    `${API}/${id}`,
    config()
  );


// CREATE
export const createInterview = (data) =>
  axios.post(
    API,
    data,
    config()
  );


// UPDATE
export const updateInterview = (id,data) =>
  axios.put(
    `${API}/${id}`,
    data,
    config()
  );


// DELETE
export const deleteInterview = (id) =>
  axios.delete(
    `${API}/${id}`,
    config()
  );