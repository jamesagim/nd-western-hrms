import axios from "axios";

const API_URL = "http://localhost:5001/api/users";


// GET ALL USERS

export const getUsers = () => {

  return axios.get(API_URL, {
    headers:{
      Authorization:
        `Bearer ${localStorage.getItem("token")}`,
    },
  });

};




// GET SINGLE USER

export const getUser = (id) => {

  return axios.get(
    `${API_URL}/${id}`,
    {
      headers:{
        Authorization:
          `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

};




// CREATE USER

export const createUser = (user) => {

  return axios.post(
    API_URL,
    user,
    {
      headers:{
        Authorization:
          `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

};




// UPDATE USER

export const updateUser = (id,user) => {

  return axios.put(
    `${API_URL}/${id}`,
    user,
    {
      headers:{
        Authorization:
          `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

};




// DELETE USER

export const deleteUser = (id) => {

  return axios.delete(
    `${API_URL}/${id}`,
    {
      headers:{
        Authorization:
          `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

};