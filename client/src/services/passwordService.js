import axios from "axios";


const API =
"http://localhost:5001/api/password";



export const changePassword = (data) => {

  return axios.put(

    `${API}/change-password`,

    data,

    {
      headers:{
        Authorization:
        `Bearer ${localStorage.getItem("token")}`
      }
    }

  );

};