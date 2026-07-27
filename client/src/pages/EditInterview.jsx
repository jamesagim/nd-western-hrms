import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

import {
  getInterview,
  updateInterview,
} from "../services/interviewService";

import { toast } from "react-toastify";


function EditInterview() {


  const { id } = useParams();

  const navigate = useNavigate();


  const [loading, setLoading] =
    useState(true);


  const [saving, setSaving] =
    useState(false);



  const [formData, setFormData] = useState({

    interviewer: "",

    interviewDate: "",

    interviewTime: "",

    mode: "Online",

    status: "Scheduled",

    notes: "",

  });





  useEffect(() => {

    fetchInterview();

  }, []);





  const fetchInterview = async()=>{


    try {


      const res =
        await getInterview(id);



      const interview =
        res.data;



      setFormData({

        interviewer:
          interview.interviewer || "",


        interviewDate:
          interview.interviewDate
          ?.split("T")[0] || "",


        interviewTime:
          interview.interviewTime || "",


        mode:
          interview.mode || "Online",


        status:
          interview.status || "Scheduled",


        notes:
          interview.notes || "",


      });



    } catch(error){


      console.log(error);


      toast.error(
        "Unable to load interview."
      );


    } finally {


      setLoading(false);


    }


  };






  const handleChange = (e)=>{


    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,

    });


  };






  const handleSubmit = async(e)=>{


    e.preventDefault();


    try {


      setSaving(true);



      await updateInterview(
        id,
        formData
      );



      toast.success(
        "Interview updated successfully."
      );



      navigate("/interviews");



    } catch(error){


      console.log(error);


      toast.error(
        error.response?.data?.message ||
        "Unable to update interview."
      );


    } finally {


      setSaving(false);


    }


  };







  if(loading){


    return (

      <AppLayout>

        <div className="p-10">

          Loading interview...

        </div>

      </AppLayout>

    );


  }







  return (

    <AppLayout>


      <PageHeader

        title="Edit Interview"

        subtitle="Update interview information"

      />




      <Card className="p-8">


        <form

          onSubmit={handleSubmit}

          className="grid md:grid-cols-2 gap-6"

        >



          <div>


            <label className="block mb-2 font-semibold">

              Interviewer

            </label>


            <input

              type="text"

              name="interviewer"

              value={formData.interviewer}

              onChange={handleChange}

              className="w-full border rounded-xl p-3"

              required

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

              className="w-full border rounded-xl p-3"

              required

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

              className="w-full border rounded-xl p-3"

              required

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

              className="w-full border rounded-xl p-3"

            >


              <option value="Online">

                Online

              </option>


              <option value="Physical">

                Physical

              </option>


            </select>


          </div>








          <div>


            <label className="block mb-2 font-semibold">

              Status

            </label>


            <select

              name="status"

              value={formData.status}

              onChange={handleChange}

              className="w-full border rounded-xl p-3"

            >


              <option value="Scheduled">

                Scheduled

              </option>


              <option value="Completed">

                Completed

              </option>


              <option value="Cancelled">

                Cancelled

              </option>


            </select>


          </div>








          <div className="md:col-span-2">


            <label className="block mb-2 font-semibold">

              Notes

            </label>


            <textarea

              name="notes"

              rows="5"

              value={formData.notes}

              onChange={handleChange}

              className="w-full border rounded-xl p-3"

            />

          </div>








          <div className="md:col-span-2 flex gap-4">


            <Button

              type="submit"

              disabled={saving}

            >

              {
              saving
              ?
              "Updating..."
              :
              "Update Interview"
              }

            </Button>





            <Button

              type="button"

              onClick={() =>
                navigate("/interviews")
              }

            >

              Cancel

            </Button>



          </div>





        </form>


      </Card>


    </AppLayout>

  );

}



export default EditInterview;