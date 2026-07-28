import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";

import {
  getJobs,
  deleteJob,
} from "../services/jobService";

import { toast } from "react-toastify";

import {
  Eye,
  Edit,
  Trash2,
} from "lucide-react";



function Jobs() {


  const [jobs,setJobs] =
  useState([]);




  useEffect(()=>{

    fetchJobs();

  },[]);






  const fetchJobs = async()=>{


    try{


      const res =
      await getJobs();


      setJobs(
        res.data || []
      );



    }catch(error){


      console.log(error);


      toast.error(
        "Failed loading jobs"
      );


    }


  };








  const handleDelete = async(id)=>{


    const confirm =
    window.confirm(
      "Delete this job?"
    );


    if(!confirm)
      return;




    try{


      await deleteJob(id);


      toast.success(
        "Job deleted"
      );


      fetchJobs();



    }catch(error){


      console.log(error);


      toast.error(
        "Delete failed"
      );


    }


  };








  return (

    <AppLayout>



      <PageHeader

        title="Job Management"

        subtitle="Create and manage company job openings"

      />






      <div className="flex justify-end mb-6">


        <Link

          to="/add-job"

          className="bg-black text-white px-5 py-3 rounded-xl"

        >

          + Create Job

        </Link>


      </div>







      <Card className="overflow-x-auto">


        <table className="w-full">


          <thead className="bg-slate-900 text-white">


            <tr>


              <th className="p-4 text-left">
                Title
              </th>


              <th className="p-4 text-left">
                Department
              </th>


              <th className="p-4 text-left">
                Location
              </th>


              <th className="p-4 text-left">
                Type
              </th>


              <th className="p-4 text-left">
                Status
              </th>


              <th className="p-4 text-left">
                Actions
              </th>


            </tr>


          </thead>








          <tbody>


          {
            jobs.map((job)=>(


              <tr

                key={job._id}

                className="border-b hover:bg-gray-50"

              >



                <td className="p-4 font-medium">

                  {job.title}

                </td>





                <td className="p-4">

                  {job.department}

                </td>





                <td className="p-4">

                  {job.location}

                </td>





                <td className="p-4">

                  {job.employmentType}

                </td>






                <td className="p-4">


                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">

                    {job.status}

                  </span>


                </td>







                <td className="p-4">


                  <div className="flex gap-2">



                    <Link

                      to={`/job/${job._id}`}

                      className="bg-blue-600 text-white p-2 rounded"

                      title="View"

                    >

                      <Eye size={16}/>

                    </Link>






                    <Link

                      to={`/edit-job/${job._id}`}

                      className="bg-yellow-500 text-white p-2 rounded"

                      title="Edit"

                    >

                      <Edit size={16}/>

                    </Link>






                    <button

                      onClick={()=>
                        handleDelete(job._id)
                      }

                      className="bg-red-600 text-white p-2 rounded"

                      title="Delete"

                    >

                      <Trash2 size={16}/>

                    </button>



                  </div>


                </td>





              </tr>


            ))
          }



          </tbody>


        </table>







        {
          jobs.length===0 && (

            <div className="p-8 text-center">

              No jobs found.

            </div>

          )
        }





      </Card>




    </AppLayout>

  );


}



export default Jobs;