import { useEffect, useState } from "react";

import Button from "../ui/Button";

import {
  getSettings,
  updateSettings,
} from "../../services/settingsService";

import { toast } from "react-toastify";


function CompanySettings() {


  const [loading,setLoading] =
  useState(true);


  const [saving,setSaving] =
  useState(false);



  const [formData,setFormData] =
  useState({

    companyName:"",
    companyEmail:"",
    companyPhone:"",
    companyWebsite:"",
    companyAddress:"",

  });




  useEffect(()=>{

    loadSettings();

  },[]);





  const loadSettings = async()=>{


    try{


      const res =
      await getSettings();


      setFormData({

        companyName:
        res.data.companyName || "",


        companyEmail:
        res.data.companyEmail || "",


        companyPhone:
        res.data.companyPhone || "",


        companyWebsite:
        res.data.companyWebsite || "",


        companyAddress:
        res.data.companyAddress || "",

      });



    }catch(error){


      console.log(error);


      toast.error(
        "Failed to load company settings."
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


      const res =
      await updateSettings(
        formData
      );


      setFormData({

        companyName:
        res.data.companyName || "",


        companyEmail:
        res.data.companyEmail || "",


        companyPhone:
        res.data.companyPhone || "",


        companyWebsite:
        res.data.companyWebsite || "",


        companyAddress:
        res.data.companyAddress || "",

      });



      toast.success(
        "Company settings updated."
      );



    }catch(error){


      console.log(error);


      toast.error(
        "Failed to update company settings."
      );



    }finally{


      setSaving(false);


    }


  };





  if(loading){


    return(

      <div className="p-10">

        Loading company settings...

      </div>

    );


  }





  return (


    <form

      onSubmit={handleSubmit}

      className="space-y-8"

    >


      <h2 className="text-2xl font-bold">

        Company Information

      </h2>




      <div className="grid md:grid-cols-2 gap-6">



        <div>

          <label className="font-semibold">

            Company Name

          </label>


          <input

            type="text"

            name="companyName"

            value={formData.companyName}

            onChange={handleChange}

            className="w-full border rounded-lg p-3 mt-2"

          />


        </div>





        <div>

          <label className="font-semibold">

            Company Email

          </label>


          <input

            type="email"

            name="companyEmail"

            value={formData.companyEmail}

            onChange={handleChange}

            className="w-full border rounded-lg p-3 mt-2"

          />


        </div>





        <div>

          <label className="font-semibold">

            Phone

          </label>


          <input

            type="text"

            name="companyPhone"

            value={formData.companyPhone}

            onChange={handleChange}

            className="w-full border rounded-lg p-3 mt-2"

          />


        </div>





        <div>

          <label className="font-semibold">

            Website

          </label>


          <input

            type="text"

            name="companyWebsite"

            value={formData.companyWebsite}

            onChange={handleChange}

            className="w-full border rounded-lg p-3 mt-2"

          />


        </div>



      </div>






      <div>


        <label className="font-semibold">

          Company Address

        </label>



        <textarea

          rows="4"

          name="companyAddress"

          value={formData.companyAddress}

          onChange={handleChange}

          className="w-full border rounded-lg p-3 mt-2"

        />


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
          "Save Company Settings"
        }


      </Button>




    </form>


  );


}


export default CompanySettings;