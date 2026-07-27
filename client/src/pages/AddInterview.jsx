import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

import { getCandidates } from "../services/candidateService";
import { getJobs } from "../services/jobService";
import { createInterview } from "../services/interviewService";

import { toast } from "react-toastify";


function AddInterview() {

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();


  const candidateFromProfile =
    searchParams.get("candidate");



  const [loading,setLoading] =
    useState(false);


  const [candidates,setCandidates] =
    useState([]);


  const [jobs,setJobs] =
    useState([]);




  const [formData,setFormData] = useState({

    candidate:
      candidateFromProfile || "",

    job:"",

    interviewer:"",

    interviewDate:"",

    interviewTime:"",

    mode:"Online",

    status:"Scheduled",

    notes:"",

  });





  useEffect(()=>{

    fetchData();

  },[]);






  const fetchData = async()=>{

    try{

      const [
        candidateRes,
        jobRes
      ] = await Promise.all([

        getCandidates(),

        getJobs(),

      ]);


      setCandidates(
        candidateRes.data || []
      );


      setJobs(
        jobRes.data || []
      );


    }catch(error){

      console.log(error);

      toast.error(
        "Unable to load data."
      );

    }

  };







  const handleChange=(e)=>{


    setFormData(prev=>({

      ...prev,

      [e.target.name]:
        e.target.value,

    }));


  };







  const handleSubmit=async(e)=>{

    e.preventDefault();


    try{


      setLoading(true);



      await createInterview(
        formData
      );



      toast.success(
        "Interview scheduled successfully."
      );


      navigate("/interviews");



    }catch(error){


      console.log(error);



      toast.error(
        error.response?.data?.message ||
        "Unable to schedule interview."
      );



    }finally{


      setLoading(false);


    }


  };







  return (

    <AppLayout>


      <PageHeader

        title="Schedule Interview"

        subtitle="Create and manage candidate interviews."

      />





      <Card className="p-8">


        <form

          onSubmit={handleSubmit}

          className="
          grid grid-cols-1
          md:grid-cols-2
          gap-6
          "

        >





          <div>

            <label className="block mb-2 font-semibold">

              Candidate

            </label>



            <select

              name="candidate"

              value={formData.candidate}

              onChange={handleChange}

              required

              className="
              w-full
              border
              rounded-xl
              p-3
              "

            >

              <option value="">

                Select Candidate

              </option>



              {
                candidates.map(candidate=>(

                  <option

                    key={candidate._id}

                    value={candidate._id}

                  >

                    {candidate.firstName}
                    {" "}
                    {candidate.lastName}

                  </option>


                ))
              }


            </select>


          </div>







          <div>


            <label className="block mb-2 font-semibold">

              Job Position

            </label>



            <select

              name="job"

              value={formData.job}

              onChange={handleChange}

              required

              className="
              w-full
              border
              rounded-xl
              p-3
              "

            >

              <option value="">

                Select Job

              </option>



              {
                jobs.map(job=>(

                  <option

                    key={job._id}

                    value={job._id}

                  >

                    {job.title}

                  </option>


                ))
              }


            </select>


          </div>








          <div>

            <label className="block mb-2 font-semibold">

              Interviewer

            </label>


            <input

              type="text"

              name="interviewer"

              value={formData.interviewer}

              onChange={handleChange}

              required

              placeholder="Interviewer name"

              className="
              w-full
              border
              rounded-xl
              p-3
              "

            />

          </div>








          <div>

            <label className="block mb-2 font-semibold">

              Interview Date

            </label>


            <input

              type="date"

              name="interviewDate"

              value={formData.interviewDate}

              onChange={handleChange}

              required

              className="
              w-full
              border
              rounded-xl
              p-3
              "

            />


          </div>








          <div>

            <label className="block mb-2 font-semibold">

              Interview Time

            </label>


            <input

              type="time"

              name="interviewTime"

              value={formData.interviewTime}

              onChange={handleChange}

              required

              className="
              w-full
              border
              rounded-xl
              p-3
              "

            />


          </div>








          <div>


            <label className="block mb-2 font-semibold">

              Mode

            </label>


            <select

              name="mode"

              value={formData.mode}

              onChange={handleChange}

              className="
              w-full
              border
              rounded-xl
              p-3
              "

            >

              <option>

                Online

              </option>


              <option>

                Physical

              </option>


            </select>


          </div>








          <div className="md:col-span-2">


            <label className="block mb-2 font-semibold">

              Notes

            </label>



            <textarea

              name="notes"

              value={formData.notes}

              onChange={handleChange}

              rows="5"

              placeholder="Interview notes..."

              className="
              w-full
              border
              rounded-xl
              p-3
              "

            />


          </div>








          <div className="md:col-span-2 flex gap-4">


            <Button

              type="submit"

              disabled={loading}

            >

              {
                loading
                ?
                "Scheduling..."
                :
                "Schedule Interview"
              }


            </Button>





            <Button

              type="button"

              onClick={()=>navigate("/interviews")}

            >

              Cancel

            </Button>



          </div>




        </form>


      </Card>



    </AppLayout>

  );

}


export default AddInterview;