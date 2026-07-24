import { useState } from "react";

import Button from "../ui/Button";

import {
  changePassword,
} from "../../services/passwordService";

import { toast } from "react-toastify";


function SecuritySettings() {


  const [saving,setSaving] =
  useState(false);



  const [formData,setFormData] =
  useState({

    currentPassword:"",
    newPassword:"",
    confirmPassword:"",

  });





  const handleChange=(e)=>{


    setFormData({

      ...formData,

      [e.target.name]:
      e.target.value,

    });


  };







  const handleSubmit=async(e)=>{


    e.preventDefault();



    if(
      formData.newPassword !==
      formData.confirmPassword
    ){

      toast.error(
        "Passwords do not match."
      );

      return;

    }





    if(
      formData.newPassword.length < 6
    ){

      toast.error(
        "Password must be at least 6 characters."
      );

      return;

    }





    setSaving(true);



    try{


      await changePassword({

        currentPassword:
        formData.currentPassword,


        newPassword:
        formData.newPassword,


      });




      toast.success(
        "Password changed successfully."
      );




      setFormData({

        currentPassword:"",
        newPassword:"",
        confirmPassword:"",

      });



    }catch(error){


      console.log(error);


      toast.error(

        error.response?.data?.message ||

        "Failed to change password."

      );



    }finally{


      setSaving(false);


    }


  };







  return(


    <form

      onSubmit={handleSubmit}

      className="space-y-8"

    >



      <h2 className="text-2xl font-bold">

        Security

      </h2>



      <p className="text-gray-500">

        Change your account password.

      </p>







      <div className="space-y-6">



        <div>


          <label className="font-semibold">

            Current Password

          </label>



          <input

            type="password"

            name="currentPassword"

            value={
              formData.currentPassword
            }

            onChange={handleChange}

            required

            className="w-full border rounded-lg p-3 mt-2"

          />


        </div>







        <div>


          <label className="font-semibold">

            New Password

          </label>



          <input

            type="password"

            name="newPassword"

            value={
              formData.newPassword
            }

            onChange={handleChange}

            required

            className="w-full border rounded-lg p-3 mt-2"

          />


        </div>







        <div>


          <label className="font-semibold">

            Confirm New Password

          </label>



          <input

            type="password"

            name="confirmPassword"

            value={
              formData.confirmPassword
            }

            onChange={handleChange}

            required

            className="w-full border rounded-lg p-3 mt-2"

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
          "Updating..."
          :
          "Update Password"
        }


      </Button>





    </form>


  );


}


export default SecuritySettings;