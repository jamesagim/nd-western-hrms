import axios from "axios";

const API_URL = "http://localhost:5001/api/interviews";

const getToken = () => {

  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

};

export const getInterviews = () => {
  return axios.get(API_URL, getToken());
};

export const getInterview = (id) => {
  return axios.get(`${API_URL}/${id}`, getToken());
};

export const createInterview = (data) => {
  return axios.post(API_URL, data, getToken());
};

export const updateInterview = (id, data) => {
  return axios.put(`${API_URL}/${id}`, data, getToken());
};

export const deleteInterview = (id) => {
  return axios.delete(`${API_URL}/${id}`, getToken());
};