import { useEffect, useState } from "react";

import Button from "../ui/Button";

import {
  getProfile,
  updateProfile,
} from "../../services/profileService";

import { toast } from "react-toastify";


function ProfileSettings() {


  const [loading,setLoading] =
  useState(true);


  const [saving,setSaving] =
  useState(false);



  const [formData,setFormData] =
  useState({

    name:"",
    email:"",
    role:"",

  });





  useEffect(()=>{

    loadProfile();

  },[]);






  const loadProfile = async()=>{


    try{


      const res =
      await getProfile();



      setFormData({

        name:
        res.data.name || "",


        email:
        res.data.email || "",


        role:
        res.data.role || "",


      });



    }catch(error){


      console.log(error);


      toast.error(
        "Failed to load profile."
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
      await updateProfile({

        name:
        formData.name,


        email:
        formData.email,


      });



      setFormData({

        ...formData,


        name:
        res.data.name,


        email:
        res.data.email,


      });




      localStorage.setItem(

        "admin",

        JSON.stringify(res.data)

      );




      toast.success(
        "Profile updated successfully."
      );



    }catch(error){


      console.log(error);


      toast.error(
        "Failed to update profile."
      );


    }finally{


      setSaving(false);


    }


  };






  if(loading){


    return(

      <div className="p-10">

        Loading profile...

      </div>

    );


  }






  return(


    <form

      onSubmit={handleSubmit}

      className="space-y-8"

    >



      <h2 className="text-2xl font-bold">

        Admin Profile

      </h2>





      <div className="flex items-center gap-5">


        <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold">


          {
            formData.name
            ?.charAt(0)
            ?.toUpperCase()
          }


        </div>



        <div>


          <h3 className="text-xl font-bold">

            {formData.name}

          </h3>



          <p className="text-gray-500">

            {formData.role}

          </p>


        </div>


      </div>







      <div className="grid md:grid-cols-2 gap-6">



        <div>


          <label className="font-semibold">

            Full Name

          </label>



          <input

            type="text"

            name="name"

            value={formData.name}

            onChange={handleChange}

            className="w-full border rounded-lg p-3 mt-2"

          />


        </div>







        <div>


          <label className="font-semibold">

            Email Address

          </label>



          <input

            type="email"

            name="email"

            value={formData.email}

            onChange={handleChange}

            className="w-full border rounded-lg p-3 mt-2"

          />


        </div>







        <div>


          <label className="font-semibold">

            Role

          </label>



          <input

            type="text"

            value={formData.role}

            disabled

            className="w-full border rounded-lg p-3 mt-2 bg-gray-100"

          />


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
          "Save Profile"
        }


      </Button>




    </form>


  );


}


export default ProfileSettings;