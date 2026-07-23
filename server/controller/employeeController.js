import Employee from "../models/Employee.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";


// =====================================
// GET ALL EMPLOYEES
// =====================================

export const getEmployees = async (req, res) => {
  try {

    const employees = await Employee.find()
      .sort({
        createdAt: -1,
      });


    res.status(200).json(employees);


  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message,
    });

  }
};




// =====================================
// GET SINGLE EMPLOYEE
// =====================================

export const getEmployee = async (req, res) => {

  try {

    const employee =
      await Employee.findById(req.params.id);


    if (!employee) {

      return res.status(404).json({
        message: "Employee not found",
      });

    }


    res.status(200).json(employee);


  } catch (error) {

    console.error(error);


    res.status(500).json({
      message: error.message,
    });

  }

};




// =====================================
// CREATE EMPLOYEE
// =====================================

export const createEmployee = async (req, res) => {

  try {


    let imageUrl = "";



    // Upload image if provided

    if (req.file) {


      const result =
        await cloudinary.uploader.upload(
          req.file.path,
          {
            folder: "employees",
          }
        );


      imageUrl = result.secure_url;


      fs.unlinkSync(req.file.path);


    }




    const employee = await Employee.create({

      employeeId:
        req.body.employeeId,


      firstName:
        req.body.firstName,


      lastName:
        req.body.lastName,


      name:
        req.body.firstName && req.body.lastName
          ? `${req.body.firstName} ${req.body.lastName}`
          : req.body.name,



      email:
        req.body.email,


      phone:
        req.body.phone,


      gender:
        req.body.gender,


      dateOfBirth:
        req.body.dateOfBirth || null,


      nationality:
        req.body.nationality,


      maritalStatus:
        req.body.maritalStatus,



      address:
        req.body.address,


      city:
        req.body.city,


      state:
        req.body.state,


      country:
        req.body.country,



      department:
        req.body.department,


      jobTitle:
        req.body.jobTitle,


      employmentType:
        req.body.employmentType,


      manager:
        req.body.manager,


      hireDate:
        req.body.hireDate || Date.now(),


      officeLocation:
        req.body.officeLocation,


      salary:
        req.body.salary || 0,



      education:
        req.body.education,


      skills:
        req.body.skills,


      bio:
        req.body.bio,



      emergencyName:
        req.body.emergencyName,


      emergencyRelationship:
        req.body.emergencyRelationship,


      emergencyPhone:
        req.body.emergencyPhone,



      linkedin:
        req.body.linkedin,


      github:
        req.body.github,


      website:
        req.body.website,



      status:
        req.body.status || "Active",



      image:
        imageUrl,

    });



    res.status(201).json(employee);



  } catch (error) {


    console.error(error);



    res.status(400).json({
      message: error.message,
    });


  }

};






// =====================================
// UPDATE EMPLOYEE
// =====================================

export const updateEmployee = async (req, res) => {


  try {


    const updateData = {


      ...req.body,


      name:
        req.body.firstName && req.body.lastName
          ? `${req.body.firstName} ${req.body.lastName}`
          : req.body.name,


    };



    if (req.file) {


      const result =
        await cloudinary.uploader.upload(
          req.file.path,
          {
            folder: "employees",
          }
        );


      updateData.image =
        result.secure_url;



      fs.unlinkSync(req.file.path);


    }




    const employee =
      await Employee.findByIdAndUpdate(

        req.params.id,

        updateData,

        {
          new: true,
          runValidators: true,
        }

      );




    if (!employee) {


      return res.status(404).json({

        message: "Employee not found",

      });


    }




    res.status(200).json(employee);




  } catch (error) {


    console.error(error);



    res.status(400).json({

      message: error.message,

    });


  }


};







// =====================================
// DELETE EMPLOYEE
// =====================================

export const deleteEmployee = async (req, res) => {


  try {


    const employee =
      await Employee.findByIdAndDelete(
        req.params.id
      );



    if (!employee) {


      return res.status(404).json({

        message: "Employee not found",

      });


    }



    res.status(200).json({

      message:
        "Employee deleted successfully",

    });



  } catch (error) {


    console.error(error);



    res.status(500).json({

      message: error.message,

    });


  }


};