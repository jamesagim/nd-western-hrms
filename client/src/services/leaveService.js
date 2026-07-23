import axios from "axios";


const API =
"http://localhost:5001/api/leaves";



const config = () => ({

  headers:{

    Authorization:
    `Bearer ${localStorage.getItem("token")}`

  }

});





// GET ALL LEAVES

export const getLeaves = ()=>{

return axios.get(
 API,
 config()
);

};





// GET ONE LEAVE

export const getLeave = (id)=>{

return axios.get(

 `${API}/${id}`,

 config()

);

};





// CREATE LEAVE

export const createLeave = (data)=>{

return axios.post(

 API,

 data,

 config()

);

};





// UPDATE STATUS

export const updateLeave = (
id,
data
)=>{

return axios.put(

 `${API}/${id}/status`,

 data,

 config()

);

};





// DELETE

export const deleteLeave = (id)=>{

return axios.delete(

 `${API}/${id}`,

 config()

);

};