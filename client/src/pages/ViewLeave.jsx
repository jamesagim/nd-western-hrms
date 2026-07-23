import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";
import Card from "../components/ui/Card";
import PageHeader from "../components/ui/PageHeader";
import Button from "../components/ui/Button";

import { getLeave } from "../services/leaveService";

import { ArrowLeft } from "lucide-react";


function ViewLeave(){

  const { id } = useParams();

  const [leave,setLeave] = useState(null);



  useEffect(()=>{

    fetchLeave();

  },[]);




  const fetchLeave = async()=>{

    try{

      const res = await getLeave(id);

      setLeave(res.data);


    }catch(error){

      console.log(error);

    }

  };





  if(!leave){

    return (

      <AppLayout>

        <div className="p-8">

          Loading leave details...

        </div>

      </AppLayout>

    );

  }





  return (

    <AppLayout>


      <PageHeader

        title="Leave Details"

        subtitle="View employee leave information"

        actions={

          <Link to="/leave-management">

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
              Employee
            </p>

            <h3 className="font-bold text-lg">
              {leave.employee?.name}
            </h3>

          </div>





          <div>

            <p className="text-gray-500">
              Department
            </p>

            <h3 className="font-bold text-lg">
              {leave.employee?.department}
            </h3>

          </div>






          <div>

            <p className="text-gray-500">
              Email
            </p>

            <h3 className="font-bold text-lg">
              {leave.employee?.email}
            </h3>

          </div>







          <div>

            <p className="text-gray-500">
              Leave Type
            </p>

            <h3 className="font-bold text-lg">
              {leave.leaveType}
            </h3>

          </div>







          <div>

            <p className="text-gray-500">
              Start Date
            </p>

            <h3 className="font-bold">
              {new Date(
                leave.startDate
              ).toLocaleDateString()}
            </h3>

          </div>








          <div>

            <p className="text-gray-500">
              End Date
            </p>

            <h3 className="font-bold">
              {new Date(
                leave.endDate
              ).toLocaleDateString()}
            </h3>

          </div>





        </div>





        <div className="mt-8">


          <p className="text-gray-500">
            Reason
          </p>


          <p className="mt-2 bg-gray-100 rounded-xl p-4">

            {leave.reason}

          </p>


        </div>







        <div className="mt-8">


          <p className="text-gray-500">
            Status
          </p>


          <span
          className={`
          inline-block mt-2 px-4 py-2 rounded-full text-white

          ${
            leave.status==="Approved"
            ?
            "bg-green-600"

            :

            leave.status==="Rejected"

            ?

            "bg-red-600"

            :

            "bg-yellow-500"

          }

          `}
          >

            {leave.status}

          </span>


        </div>




      </Card>



    </AppLayout>

  );

}


export default ViewLeave;