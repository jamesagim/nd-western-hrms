import { Link } from "react-router-dom";


function RecentJobsTable({ jobs }) {


  return (

    <div className="bg-white rounded-xl shadow p-6 mt-8">


      <div className="flex justify-between items-center mb-6">


        <h2 className="text-xl font-bold">

          Recent Jobs

        </h2>



        <Link

          to="/jobs"

          className="text-blue-600 hover:underline"

        >

          View All

        </Link>


      </div>





      <div className="overflow-x-auto">


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
                Status
              </th>



            </tr>


          </thead>







          <tbody>


            {
              jobs?.length === 0 ? (


                <tr>


                  <td

                    colSpan="4"

                    className="p-8 text-center text-gray-500"

                  >

                    No jobs found

                  </td>


                </tr>



              )


              :



              jobs?.map((job)=>(


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


                    <span

                      className={`

                      px-3 py-1 rounded-full text-sm

                      ${
                        job.status==="Open"

                        ?

                        "bg-green-100 text-green-700"

                        :

                        "bg-red-100 text-red-700"

                      }

                      `}

                    >

                      {job.status}

                    </span>


                  </td>



                </tr>


              ))


            }



          </tbody>


        </table>


      </div>


    </div>

  );

}


export default RecentJobsTable;