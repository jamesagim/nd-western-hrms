import { useEffect, useState } from "react";

import Button from "../ui/Button";

import {
  getSettings,
  updateSettings,
} from "../../services/settingsService";

import { toast } from "react-toastify";


function AppearanceSettings() {


  const [loading,setLoading] =
  useState(true);


  const [saving,setSaving] =
  useState(false);



  const [formData,setFormData] =
  useState({

    theme:"Light",

  });





  useEffect(()=>{

    loadSettings();

  },[]);






  const loadSettings = async()=>{


    try{


      const res =
      await getSettings();



      setFormData({

        theme:
        res.data.theme || "Light",

      });



    }catch(error){


      console.log(error);


      toast.error(
        "Failed to load appearance settings."
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



      localStorage.setItem(

        "theme",

        formData.theme

      );



      toast.success(
        "Appearance updated successfully."
      );



    }catch(error){


      console.log(error);


      toast.error(
        "Failed to update appearance."
      );


    }finally{


      setSaving(false);


    }


  };








  if(loading){


    return(

      <div className="p-10">

        Loading appearance...

      </div>

    );


  }







  return(


    <form

      onSubmit={handleSubmit}

      className="space-y-8"

    >



      <h2 className="text-2xl font-bold">

        Appearance

      </h2>




      <p className="text-gray-500">

        Customize how the HR Management System looks.

      </p>







      <div className="grid md:grid-cols-2 gap-6">



        <div>


          <label className="font-semibold">

            Theme

          </label>



          <select

            name="theme"

            value={formData.theme}

            onChange={handleChange}

            className="w-full border rounded-lg p-3 mt-2"

          >


            <option value="Light">

              🌞 Light

            </option>


            <option value="Dark">

              🌙 Dark

            </option>


          </select>


        </div>







        <div>


          <label className="font-semibold">

            Accent Color

          </label>



          <select

            disabled

            className="w-full border rounded-lg p-3 mt-2 bg-gray-100"

          >


            <option>

              Blue (Coming Soon)

            </option>


          </select>


        </div>



      </div>







      <div className="rounded-xl border p-6 bg-gray-50">


        <h3 className="font-bold mb-3">

          Preview

        </h3>





        <div

          className={`rounded-lg p-6 border ${
          
          formData.theme === "Dark"

          ?

          "bg-slate-900 text-white"

          :

          "bg-white text-black"

          }`}

        >


          <h4 className="font-bold text-lg">

            ND Western HRMS

          </h4>



          <p className="mt-2">

            This preview shows your selected theme.

          </p>


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
          "Save Appearance"
        }


      </Button>




    </form>


  );


}


export default AppearanceSettings;