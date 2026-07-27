import Interview from "../models/Interview.js";


// ============================
// GET ALL INTERVIEWS
// ============================

export const getInterviews = async (req, res) => {

  try {

    const interviews = await Interview.find()

      .populate(
        "candidate",
        "firstName lastName email position department"
      )

      .populate(
        "job",
        "title department"
      )

      .sort({
        createdAt: -1,
      });



    res.json(interviews);



  } catch (error) {


    console.error(error);


    res.status(500).json({
      message: error.message,
    });


  }

};





// ============================
// GET SINGLE INTERVIEW
// ============================

export const getInterview = async (req, res) => {

  try {


    const interview =
      await Interview.findById(
        req.params.id
      )


      .populate(
        "candidate",
        "firstName lastName email phone position department experience education skills"
      )


      .populate(
        "job",
        "title department description"
      );





    if (!interview) {


      return res.status(404).json({

        message:
          "Interview not found",

      });


    }





    res.json(interview);





  } catch (error) {


    console.error(error);


    res.status(500).json({

      message:
        error.message,

    });


  }

};








// ============================
// CREATE INTERVIEW
// ============================

export const createInterview = async (req, res) => {

  try {


    const interview =
      await Interview.create(
        req.body
      );



    const populatedInterview =
      await Interview.findById(
        interview._id
      )

      .populate(
        "candidate",
        "firstName lastName email position"
      )

      .populate(
        "job",
        "title department"
      );




    res.status(201).json(
      populatedInterview
    );





  } catch (error) {


    console.error(error);


    res.status(400).json({

      message:
        error.message,

    });



  }

};










// ============================
// UPDATE INTERVIEW
// ============================

export const updateInterview = async (req, res) => {

  try {


    const interview =
      await Interview.findByIdAndUpdate(

        req.params.id,

        req.body,

        {
          new:true,
          runValidators:true,
        }

      )

      .populate(
        "candidate",
        "firstName lastName email position"
      )

      .populate(
        "job",
        "title department"
      );





    if(!interview){


      return res.status(404).json({

        message:
          "Interview not found",

      });


    }




    res.json(interview);






  } catch(error){


    console.error(error);



    res.status(400).json({

      message:
        error.message,

    });



  }

};










// ============================
// DELETE INTERVIEW
// ============================

export const deleteInterview = async (req,res)=>{


  try {


    const interview =
      await Interview.findByIdAndDelete(
        req.params.id
      );



    if(!interview){


      return res.status(404).json({

        message:
          "Interview not found",

      });


    }





    res.json({

      message:
        "Interview deleted successfully",

    });





  } catch(error){


    console.error(error);



    res.status(500).json({

      message:
        error.message,

    });


  }


};