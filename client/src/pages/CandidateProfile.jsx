import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  Mail,
  Phone,
  Briefcase,
  GraduationCap,
  UserCheck,
  Trash2,
  FileText,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";

import AppLayout from "../components/layout/AppLayout";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

import { CandidateContext } from "../context/CandidateContext";
import { getCandidate } from "../services/candidateService";

import { toast } from "react-toastify";


function CandidateProfile() {

  const { id } = useParams();

  const navigate = useNavigate();


  const {
    deleteCandidate,
    hireCandidate,
  } = useContext(CandidateContext);



  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);



  const admin =
    JSON.parse(
      localStorage.getItem("admin")
    ) || {};

  const role = admin.role;



  useEffect(() => {

    loadCandidate();

  }, [id]);



  const loadCandidate = async () => {

    try {

      const res =
        await getCandidate(id);

      setCandidate(res.data);


    } catch(error){

      console.log(error);

      toast.error(
        "Unable to load candidate."
      );

    } finally {

      setLoading(false);

    }

  };




  const handleHire = async()=>{


    if(
      !window.confirm(
        "Hire this candidate and create employee profile?"
      )
    )
    return;



    try{


      await hireCandidate(
        candidate._id
      );


      toast.success(
        "Candidate hired successfully."
      );


      navigate(
        "/employees"
      );


    }catch(error){

      console.log(error);

    }


  };





  const handleDelete = async()=>{


    if(
      !window.confirm(
        "Delete this candidate?"
      )
    )
    return;



    try{


      await deleteCandidate(
        candidate._id
      );


      navigate(
        "/recruitment"
      );


    }catch(error){

      console.log(error);

    }


  };





  if(loading){


    return (

      <AppLayout>

        <div className="p-10 text-center">

          Loading candidate profile...

        </div>

      </AppLayout>

    );

  }




  if(!candidate){


    return (

      <AppLayout>

        <div className="p-10 text-center">

          Candidate not found.

        </div>

      </AppLayout>

    );

  }





  const fullName =
    `${candidate.firstName} ${candidate.lastName}`;



  return (

    <AppLayout>



      <div className="mb-6">

        <Button
          onClick={() => navigate(-1)}
        >

          <div className="flex items-center gap-2">

            <ArrowLeft size={18}/>

            Back

          </div>


        </Button>


      </div>





      <Card className="p-8 mb-8">


        <div className="flex flex-col md:flex-row gap-6 items-center">


          {
            candidate.photo ?

            <img
              src={candidate.photo}
              alt={fullName}
              className="
              w-32
              h-32
              rounded-3xl
              object-cover
              border
              "
            />


            :


            <div
              className="
              w-32
              h-32
              rounded-3xl
              bg-blue-600
              text-white
              flex
              items-center
              justify-center
              text-4xl
              font-bold
              "
            >

              {candidate.firstName?.[0]}

            </div>

          }





          <div>


            <h1 className="
            text-4xl
            font-bold
            text-slate-900
            ">

              {fullName}

            </h1>



            <p className="
            text-lg
            text-slate-500
            mt-2
            ">

              {candidate.position}

            </p>



            <span className="
            inline-block
            mt-4
            px-4
            py-2
            rounded-full
            bg-blue-100
            text-blue-700
            font-semibold
            ">

              {candidate.stage}

            </span>


          </div>


        </div>


      </Card>







      <div className="
      grid
      lg:grid-cols-2
      gap-6
      ">



        <Card className="p-6">


          <h2 className="
          text-xl
          font-bold
          mb-6
          ">

            Personal Information

          </h2>



          <div className="space-y-4">


            <p className="flex gap-3">

              <Mail/>

              {candidate.email}

            </p>



            <p className="flex gap-3">

              <Phone/>

              {candidate.phone || "No phone"}

            </p>



            <p className="flex gap-3">

              <Briefcase/>

              {candidate.department}

            </p>


          </div>


        </Card>






        <Card className="p-6">


          <h2 className="
          text-xl
          font-bold
          mb-6
          ">

            Professional Details

          </h2>



          <div className="space-y-4">


            <p className="flex gap-3">

              <UserCheck/>

              Experience:
              {" "}
              {candidate.experience}
              {" "}
              years

            </p>



            <p className="flex gap-3">

              <GraduationCap/>

              {candidate.education ||
              "No education added"}

            </p>


          </div>


        </Card>


      </div>







      <Card className="p-6 mt-6">


        <h2 className="
        text-xl
        font-bold
        mb-4
        ">

          Skills

        </h2>



        <div className="flex flex-wrap gap-3">


          {
            candidate.skills?.map(
              skill => (

                <span
                  key={skill}
                  className="
                  bg-slate-100
                  px-4
                  py-2
                  rounded-full
                  "
                >

                  {skill}

                </span>

              )
            )
          }


        </div>


      </Card>








      <Card className="p-6 mt-6">


        <h2 className="
        text-xl
        font-bold
        mb-4
        ">

          Resume

        </h2>



        {
          candidate.resume ?


          <a
            href={candidate.resume}
            target="_blank"
            rel="noreferrer"
            className="
            flex
            items-center
            gap-2
            text-blue-600
            "
          >

            <FileText/>

            View Resume


          </a>


          :

          <p>

            No resume uploaded

          </p>

        }


      </Card>







      <Card className="p-6 mt-6">


        <div className="flex gap-4">


          {
            (
              role === "Admin" ||
              role === "HR"
            )
            &&
            candidate.stage === "Offer"
            &&

            <Button
              onClick={handleHire}
            >

              <div className="flex items-center gap-2">

                <CheckCircle size={18}/>

                Hire Candidate

              </div>


            </Button>

          }




          {
            role === "Admin"

            &&

            <Button
              onClick={handleDelete}
            >

              <div className="flex items-center gap-2">

                <Trash2 size={18}/>

                Delete Candidate

              </div>

            </Button>

          }


        </div>


      </Card>



    </AppLayout>

  );

}


export default CandidateProfile;