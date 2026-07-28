import axios from "axios";


const API =
"http://localhost:5001/api/jobs";



const config = () => ({

  headers:{

    Authorization:
    `Bearer ${localStorage.getItem("token")}`

  }

});





// GET ALL JOBS

export const getJobs = () => {

  return axios.get(
    API,
    config()
  );

};






// GET SINGLE JOB

export const getJob = (id) => {

  return axios.get(
    `${API}/${id}`,
    config()
  );

};






// CREATE JOB

export const createJob = (job) => {

  return axios.post(
    API,
    job,
    config()
  );

};






// UPDATE JOB

export const updateJob = (
  id,
  job
) => {

  return axios.put(

    `${API}/${id}`,

    job,

    config()

  );

};






// DELETE JOB

export const deleteJob = (id) => {

  return axios.delete(

    `${API}/${id}`,

    config()

  );

};