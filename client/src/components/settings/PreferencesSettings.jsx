import { useEffect, useState } from "react";

import Button from "../ui/Button";

import {
  getSettings,
  updateSettings,
} from "../../services/settingsService";

import { toast } from "react-toastify";


function PreferencesSettings() {


  const [loading,setLoading] =
  useState(true);


  const [saving,setSaving] =
  useState(false);



  const [formData,setFormData] =
  useState({

    currency:"₦",
    timezone:"Africa/Lagos",
    dateFormat:"DD/MM/YYYY",

  });





  useEffect(()=>{

    loadSettings();

  },[]);






  const loadSettings = async()=>{


    try{


      const res =
      await getSettings();



      setFormData({

        currency:
        res.data.currency || "₦",


        timezone:
        res.data.timezone || "Africa/Lagos",


        dateFormat:
        res.data.dateFormat || "DD/MM/YYYY",


      });



    }catch(error){


      console.log(error);


      toast.error(
        "Failed to load preferences."
      );


    }finally{


      setLoading(false);


    }


  };






  const handleChange=(e)=>{


    setFormData({

      ...formData,


      [e.target.name]:
      e.target.value,


    });


  };






  const handleSubmit=async(e)=>{


    e.preventDefault();


    setSaving(true);



    try{


      await updateSettings(
        formData
      );



      toast.success(
        "Preferences updated successfully."
      );



    }catch(error){


      console.log(error);


      toast.error(
        "Failed to update preferences."
      );



    }finally{


      setSaving(false);


    }


  };







  if(loading){


    return(

      <div className="p-10">

        Loading preferences...

      </div>

    );


  }







  return(


    <form

      onSubmit={handleSubmit}

      className="space-y-8"

    >



      <h2 className="text-2xl font-bold">

        Preferences

      </h2>




      <p className="text-gray-500">

        Configure your regional and system preferences.

      </p>







      <div className="grid md:grid-cols-3 gap-6">



        <div>


          <label className="font-semibold">

            Currency

          </label>



          <select

            name="currency"

            value={formData.currency}

            onChange={handleChange}

            className="w-full border rounded-lg p-3 mt-2"

          >


            <option value="₦">

              Nigerian Naira (₦)

            </option>


            <option value="$">

              US Dollar ($)

            </option>


            <option value="£">

              British Pound (£)

            </option>


            <option value="€">

              Euro (€)

            </option>


          </select>


        </div>







        <div>


          <label className="font-semibold">

            Timezone

          </label>



          <select

            name="timezone"

            value={formData.timezone}

            onChange={handleChange}

            className="w-full border rounded-lg p-3 mt-2"

          >


            <option value="Africa/Lagos">

              Africa/Lagos

            </option>


            <option value="Europe/London">

              Europe/London

            </option>


            <option value="America/New_York">

              America/New_York

            </option>


            <option value="Asia/Dubai">

              Asia/Dubai

            </option>


          </select>


        </div>







        <div>


          <label className="font-semibold">

            Date Format

          </label>



          <select

            name="dateFormat"

            value={formData.dateFormat}

            onChange={handleChange}

            className="w-full border rounded-lg p-3 mt-2"

          >


            <option value="DD/MM/YYYY">

              DD/MM/YYYY

            </option>


            <option value="MM/DD/YYYY">

              MM/DD/YYYY

            </option>


            <option value="YYYY-MM-DD">

              YYYY-MM-DD

            </option>


          </select>


        </div>



      </div>







      <Button

        type="submit"

        disabled={saving}

      >


        {
          saving
          ?
          "Saving..."
          :
          "Save Preferences"
        }


      </Button>





    </form>


  );


}


export default PreferencesSettings;