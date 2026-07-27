import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

import { createJob } from "../services/jobService";

import { toast } from "react-toastify";


function AddJob(){


  const navigate = useNavigate();



  const [formData,setFormData] = useState({

    title:"",
    department:"",
    location:"Remote",
    employmentType:"Full Time",
    description:"",
    requirements:"",
    status:"Open",

  });





  const handleChange = (e)=>{


    setFormData({

      ...formData,

      [e.target.name]:
      e.target.value,

    });


  };







  const handleSubmit = async(e)=>{


    e.preventDefault();



    try{


      await createJob({

        ...formData,

        requirements:
        formData.requirements
        .split(",")
        .map(item=>item.trim()),

      });



      toast.success(
        "Job created successfully"
      );


      navigate("/jobs");



    }catch(error){


      console.log(error);


      toast.error(
        "Failed creating job"
      );


    }


  };






  return (

    <AppLayout>


      <PageHeader

        title="Create Job"

        subtitle="Add a new job opening"

      />





      <Card className="p-8">


        <form

          onSubmit={handleSubmit}

          className="space-y-6"

        >




          <div className="grid md:grid-cols-2 gap-6">



            <div>

              <label className="font-semibold">
                Job Title
              </label>


              <input

                name="title"

                value={formData.title}

                onChange={handleChange}

                className="w-full border rounded-lg p-3 mt-2"

                required

              />

            </div>





            <div>

              <label className="font-semibold">
                Department
              </label>


              <input

                name="department"

                value={formData.department}

                onChange={handleChange}

                className="w-full border rounded-lg p-3 mt-2"

                required

              />

            </div>





            <div>

              <label className="font-semibold">
                Location
              </label>


              <input

                name="location"

                value={formData.location}

                onChange={handleChange}

                className="w-full border rounded-lg p-3 mt-2"

              />

            </div>





            <div>

              <label className="font-semibold">
                Employment Type
              </label>


              <select

                name="employmentType"

                value={formData.employmentType}

                onChange={handleChange}

                className="w-full border rounded-lg p-3 mt-2"

              >

                <option>
                  Full Time
                </option>

                <option>
                  Part Time
                </option>

                <option>
                  Contract
                </option>

                <option>
                  Internship
                </option>


              </select>


            </div>





          </div>






          <div>

            <label className="font-semibold">
              Job Description
            </label>


            <textarea

              name="description"

              rows="5"

              value={formData.description}

              onChange={handleChange}

              className="w-full border rounded-lg p-3 mt-2"

              required

            />


          </div>






          <div>

            <label className="font-semibold">
              Requirements
            </label>


            <textarea

              name="requirements"

              rows="4"

              placeholder="React, JavaScript, MongoDB"

              value={formData.requirements}

              onChange={handleChange}

              className="w-full border rounded-lg p-3 mt-2"

            />


          </div>






          <div>

            <label className="font-semibold">
              Status
            </label>


            <select

              name="status"

              value={formData.status}

              onChange={handleChange}

              className="w-full border rounded-lg p-3 mt-2"

            >

              <option>
                Open
              </option>


              <option>
                Closed
              </option>


            </select>


          </div>







          <Button type="submit">

            Create Job

          </Button>





        </form>


      </Card>



    </AppLayout>

  );


}



export default AddJob;