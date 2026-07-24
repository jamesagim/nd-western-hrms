import Admin from "../models/Admin.js";


// GET PROFILE

export const getProfile = async (
  req,
  res
) => {

  try {

    const admin =
      await Admin.findById(
        req.user._id
      )
      .select("-password");


    res.json(admin);


  } catch(error){

    res.status(500).json({
      message:error.message,
    });

  }

};




// UPDATE PROFILE

export const updateProfile = async (
  req,
  res
) => {

  try {


    const {
      name,
      email,
    } = req.body;



    const admin =
      await Admin.findByIdAndUpdate(

        req.user._id,

        {
          name,
          email,
        },

        {
          new:true,
        }

      )
      .select("-password");



    res.json(admin);



  }catch(error){

    res.status(500).json({
      message:error.message,
    });

  }

};