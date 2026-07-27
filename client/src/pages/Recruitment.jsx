import { useContext } from "react";
import { Link } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";
import PageHeader from "../components/ui/PageHeader";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

import RecruitmentBoard from "../components/recruitment/RecruitmentBoard";

import { CandidateContext } from "../context/CandidateContext";

import {
  Users,
  UserPlus,
  BriefcaseBusiness,
  CheckCircle,
} from "lucide-react";


function Recruitment() {


  const {
    candidates,
    moveCandidate,
  } = useContext(CandidateContext);




  const onDragEnd = async(result)=>{


    if(!result.destination)
      return;



    const candidateId =
      result.draggableId;


    const newStage =
      result.destination.droppableId;



    await moveCandidate(
      candidateId,
      newStage
    );


  };






  const totalCandidates =
    candidates.length;



  const hired =
    candidates.filter(
      candidate =>
        candidate.stage === "Hired"
    ).length;



  const interviews =
    candidates.filter(
      candidate =>
        candidate.stage === "Interview"
    ).length;




  const offers =
    candidates.filter(
      candidate =>
        candidate.stage === "Offer"
    ).length;





  return (

    <AppLayout>


      <PageHeader

        title="Recruitment Dashboard"

        subtitle="Manage candidates, interviews, offers and hiring pipeline."

        actions={

          <Link to="/add-candidate">

            <Button>

              <div className="flex items-center gap-2">

                <UserPlus size={18}/>

                Add Candidate

              </div>

            </Button>

          </Link>

        }

      />






      {/* STATS */}


      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-4
        gap-6
        mb-8
      ">




        <Card className="p-6">


          <div className="
            flex
            justify-between
            items-center
          ">


            <div>


              <p className="text-sm text-slate-500">

                Total Candidates

              </p>


              <h2 className="
                text-4xl
                font-bold
                mt-3
              ">

                {totalCandidates}

              </h2>


            </div>


            <Users
              size={35}
              className="text-blue-600"
            />


          </div>


        </Card>








        <Card className="p-6">


          <div className="
            flex
            justify-between
            items-center
          ">


            <div>


              <p className="text-sm text-slate-500">

                Interviews

              </p>


              <h2 className="
                text-4xl
                font-bold
                mt-3
              ">

                {interviews}

              </h2>


            </div>


            <BriefcaseBusiness
              size={35}
              className="text-purple-600"
            />


          </div>


        </Card>









        <Card className="p-6">


          <div className="
            flex
            justify-between
            items-center
          ">


            <div>


              <p className="text-sm text-slate-500">

                Offers

              </p>


              <h2 className="
                text-4xl
                font-bold
                mt-3
              ">

                {offers}

              </h2>


            </div>


            <CheckCircle
              size={35}
              className="text-orange-500"
            />


          </div>


        </Card>









        <Card className="p-6">


          <div className="
            flex
            justify-between
            items-center
          ">


            <div>


              <p className="text-sm text-slate-500">

                Hired

              </p>


              <h2 className="
                text-4xl
                font-bold
                mt-3
              ">

                {hired}

              </h2>


            </div>


            <Users
              size={35}
              className="text-green-600"
            />


          </div>


        </Card>




      </div>







      {/* PIPELINE */}



      <Card className="p-6">


        <div className="mb-6">


          <h2 className="
            text-2xl
            font-bold
            text-slate-900
          ">

            Hiring Pipeline

          </h2>



          <p className="
            text-slate-500
            mt-1
          ">

            Drag candidates through each recruitment stage.

          </p>


        </div>




        <RecruitmentBoard

          candidates={candidates}

          onDragEnd={onDragEnd}

        />


      </Card>





    </AppLayout>

  );

}


export default Recruitment;