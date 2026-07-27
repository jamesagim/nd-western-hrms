import {
  createContext,
  useEffect,
  useState,
  useContext,
} from "react";

import axios from "axios";
import { toast } from "react-toastify";

import {
  hireCandidate as hireCandidateService,
} from "../services/candidateService";

import {
  NotificationContext,
} from "./NotificationContext";


export const CandidateContext = createContext();



const API =
  "http://localhost:5001/api/candidates";



function CandidateProvider({ children }) {


  const [candidates, setCandidates] =
    useState([]);


  const [loading, setLoading] =
    useState(true);



  const {
    addNotification,
  } = useContext(NotificationContext);




  const getConfig = () => ({

    headers: {

      Authorization:
        `Bearer ${localStorage.getItem("token")}`,

    },

  });






  // ==========================
  // LOAD CANDIDATES
  // ==========================


  const fetchCandidates = async()=>{


    try{


      const res =
        await axios.get(
          API,
          getConfig()
        );


      setCandidates(
        res.data
      );


    }catch(error){


      console.log(error);


      toast.error(
        "Unable to load candidates."
      );


    }finally{


      setLoading(false);


    }


  };





  useEffect(()=>{


    fetchCandidates();


  }, []);







  // ==========================
  // ADD CANDIDATE
  // ==========================


  const addCandidate = async(formData)=>{


    try{


      const res =
        await axios.post(
          API,
          formData,
          {

            headers: {

              Authorization:
              `Bearer ${localStorage.getItem("token")}`,

              "Content-Type":
              "multipart/form-data",

            },

          }
        );



      setCandidates(
        prev => [
          res.data,
          ...prev
        ]
      );



      addNotification(

        "New Candidate",

        `${res.data.firstName} ${res.data.lastName} applied for ${res.data.position}.`,

        "info"

      );



      toast.success(
        "Candidate added successfully!"
      );



      return res.data;



    }catch(error){


      console.log(error);



      toast.error(

        error.response?.data?.message ||

        "Unable to add candidate."

      );



      throw error;


    }


  };








  // ==========================
  // DELETE CANDIDATE
  // ==========================


  const deleteCandidate = async(id)=>{


    try{


      await axios.delete(

        `${API}/${id}`,

        getConfig()

      );



      setCandidates(

        prev =>

        prev.filter(

          candidate =>

          candidate._id !== id

        )

      );



      toast.success(

        "Candidate deleted."

      );



    }catch(error){


      console.log(error);



      toast.error(

        "Unable to delete candidate."

      );


    }


  };








  // ==========================
  // MOVE PIPELINE
  // ==========================


  const moveCandidate = async(
    id,
    stage
  )=>{


    try{


      const res =
        await axios.put(

          `${API}/${id}/move`,

          {
            stage
          },

          getConfig()

        );




      setCandidates(

        prev =>

        prev.map(

          candidate =>

          candidate._id === id

          ?

          res.data

          :

          candidate

        )

      );




      addNotification(

        "Candidate Updated",

        `${res.data.firstName} ${res.data.lastName} moved to ${stage}.`,

        "info"

      );




    }catch(error){


      console.log(error);



      toast.error(

        "Unable to update candidate."

      );


    }


  };









  // ==========================
  // HIRE CANDIDATE
  // ==========================


  const hireCandidate = async(id)=>{


    try{


      const res =

        await hireCandidateService(id);




      const employeeName =

        res.data.employee?.name ||

        `${res.data.employee?.firstName || ""} ${res.data.employee?.lastName || ""}`.trim() ||

        "New employee";





      addNotification(

        "Candidate Hired",

        `${employeeName} has joined the company.`,

        "success"

      );




      toast.success(

        "Candidate hired successfully!"

      );




      await fetchCandidates();




      return res.data;



    }catch(error){


      console.log(error);



      toast.error(

        error.response?.data?.message ||

        "Unable to hire candidate."

      );



      throw error;


    }


  };









  return (


    <CandidateContext.Provider


      value={{

        candidates,

        loading,

        fetchCandidates,

        addCandidate,

        deleteCandidate,

        moveCandidate,

        hireCandidate,

      }}


    >


      {children}


    </CandidateContext.Provider>


  );


}



export default CandidateProvider;