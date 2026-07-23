import Attendance from "../models/Attendance.js";


// =====================================
// GET ALL ATTENDANCE
// =====================================

export const getAttendance = async (req, res) => {
  try {

    const attendance = await Attendance.find()
      .populate(
        "employee",
        "name email department"
      )
      .sort({
        date: -1,
      });


    res.json(attendance);


  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message,
    });

  }
};




// =====================================
// GET SINGLE ATTENDANCE
// =====================================

export const getSingleAttendance = async (
  req,
  res
) => {

  try {

    const attendance =
      await Attendance.findById(
        req.params.id
      )
      .populate(
        "employee",
        "name email department"
      );


    if (!attendance) {

      return res.status(404).json({
        message:
          "Attendance record not found",
      });

    }


    res.json(attendance);



  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message,
    });

  }

};




// =====================================
// CREATE ATTENDANCE
// =====================================

export const createAttendance = async (
  req,
  res
) => {

  try {

    const attendance =
      await Attendance.create({

        employee:
          req.body.employee,

        date:
          req.body.date || Date.now(),

        status:
          req.body.status || "Present",

        checkIn:
          req.body.checkIn,

        checkOut:
          req.body.checkOut,

      });


    res.status(201).json(
      attendance
    );


  } catch (error) {

    console.error(error);


    res.status(400).json({
      message:error.message,
    });

  }

};




// =====================================
// UPDATE ATTENDANCE
// =====================================

export const updateAttendance = async (
  req,
  res
) => {

  try {


    const attendance =
      await Attendance.findByIdAndUpdate(

        req.params.id,

        req.body,

        {
          new: true,
          runValidators: true,
        }

      );



    if (!attendance) {

      return res.status(404).json({
        message:
          "Attendance record not found",
      });

    }



    res.json(attendance);



  } catch(error) {

    console.error(error);


    res.status(400).json({
      message:error.message,
    });

  }

};




// =====================================
// DELETE ATTENDANCE
// =====================================

export const deleteAttendance = async (
  req,
  res
) => {

  try {


    const attendance =
      await Attendance.findByIdAndDelete(
        req.params.id
      );



    if (!attendance) {

      return res.status(404).json({
        message:
          "Attendance record not found",
      });

    }



    res.json({

      message:
        "Attendance deleted successfully",

    });



  } catch(error) {

    console.error(error);


    res.status(500).json({
      message:error.message,
    });

  }

};
// =====================================
// CLOCK IN
// =====================================

export const clockIn = async(req,res)=>{

  try{


    const attendance =
    await Attendance.create({

      employee:req.body.employee,

      date:new Date(),

      checkIn:new Date(),

      status:"Present"

    });



    res.status(201).json(attendance);



  }catch(error){

    res.status(400).json({
      message:error.message
    });

  }

};






// =====================================
// CLOCK OUT
// =====================================

export const clockOut = async(req,res)=>{

  try{


    const attendance =
    await Attendance.findById(
      req.params.id
    );


    if(!attendance){

      return res.status(404).json({
        message:"Attendance not found"
      });

    }



    attendance.checkOut =
      new Date();



    if(
      attendance.checkIn &&
      attendance.checkOut
    ){

      const hours =
      (
        attendance.checkOut -
        attendance.checkIn
      )
      /
      (1000*60*60);



      attendance.hoursWorked =
      Number(hours.toFixed(2));

    }



    await attendance.save();



    res.json(attendance);



  }catch(error){

    res.status(400).json({
      message:error.message
    });

  }

};