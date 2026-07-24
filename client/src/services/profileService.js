import axios from "axios";


const API = "http://localhost:5001/api/profile";


const config = () => ({
  headers:{
    Authorization:
      `Bearer ${localStorage.getItem("token")}`
  }
});



export const getProfile = () => {
  return axios.get(
    API,
    config()
  );
};



export const updateProfile = (data) => {
  return axios.put(
    API,
    data,
    config()
  );
};