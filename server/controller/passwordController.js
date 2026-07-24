import bcrypt from "bcryptjs";

import Admin from "../models/Admin.js";


export const changePassword = async (
  req,
  res
) => {

  try {

    const {
      currentPassword,
      newPassword,
    } = req.body;



    const admin =
      await Admin.findById(
        req.user._id
      );



    if(!admin){

      return res.status(404).json({
        message:"User not found",
      });

    }




    const match =
      await bcrypt.compare(
        currentPassword,
        admin.password
      );



    if(!match){

      return res.status(400).json({
        message:
        "Current password is incorrect",
      });

    }




    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        10
      );



    admin.password =
      hashedPassword;



    await admin.save();



    res.json({

      message:
      "Password changed successfully",

    });



  }catch(error){


    res.status(500).json({

      message:error.message,

    });


  }

};