import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

import { getJob } from "../services/jobService";

import { ArrowLeft } from "lucide-react";

import { toast } from "react-toastify";



function ViewJob(){


  const { id } = useParams();


  const [job,setJob] = useState(null);





  useEffect(()=>{

    fetchJob();

  },[]);







  const fetchJob = async()=>{


    try{


      const res =
      await getJob(id);



      setJob(
        res.data
      );



    }catch(error){


      console.log(error);


      toast.error(
        "Failed loading job"
      );


    }


  };







  if(!job){


    return (

      <AppLayout>

        <div className="p-8">

          Loading job details...

        </div>

      </AppLayout>

    );


  }







  return (

    <AppLayout>



      <PageHeader

        title="Job Details"

        subtitle="View job opening information"

        actions={


          <Link to="/jobs">


            <Button>


              <div className="flex items-center gap-2">


                <ArrowLeft size={18}/>


                Back


              </div>


            </Button>


          </Link>


        }


      />








      <Card className="max-w-4xl p-8">


        <div className="grid md:grid-cols-2 gap-6">





          <div>

            <p className="text-gray-500">
              Job Title
            </p>


            <h3 className="font-bold text-lg">

              {job.title}

            </h3>


          </div>






          <div>

            <p className="text-gray-500">
              Department
            </p>


            <h3 className="font-bold text-lg">

              {job.department}

            </h3>


          </div>






          <div>

            <p className="text-gray-500">
              Location
            </p>


            <h3 className="font-bold text-lg">

              {job.location}

            </h3>


          </div>






          <div>

            <p className="text-gray-500">
              Employment Type
            </p>


            <h3 className="font-bold text-lg">

              {job.employmentType}

            </h3>


          </div>






          <div>

            <p className="text-gray-500">
              Status
            </p>


            <span className={`
            
            inline-block mt-2 px-4 py-2 rounded-full text-white
            
            ${
              job.status==="Open"
              ?
              "bg-green-600"
              :
              "bg-red-600"
            }

            `}>

              {job.status}

            </span>


          </div>




        </div>







        <div className="mt-8">


          <p className="text-gray-500">

            Description

          </p>


          <p className="mt-2 bg-gray-100 rounded-xl p-4">

            {job.description}

          </p>


        </div>







        <div className="mt-8">


          <p className="text-gray-500">

            Requirements

          </p>




          <ul className="mt-3 list-disc ml-6">


            {

              job.requirements?.map(
                (item,index)=>(


                  <li key={index}>

                    {item}

                  </li>


                )

              )

            }


          </ul>


        </div>





      </Card>



    </AppLayout>

  );


}


export default ViewJob;