import Employee from "../models/Employee.js";
import Leave from "../models/Leave.js";
import Payroll from "../models/Payroll.js";
import Attendance from "../models/Attendance.js";
import Job from "../models/Job.js";


export const getDashboard = async (req, res) => {

  try {


    const [

      // Employees

      totalEmployees,

      activeEmployees,

      inactiveEmployees,

      departments,



      // Leaves

      pendingLeaves,

      approvedLeaves,

      rejectedLeaves,



      // Jobs

      totalJobs,

      openJobs,

      closedJobs,



      // Recent Data

      recentEmployees,

      recentLeaves,

      recentJobs,



      // Full Data

      employees,

      payrolls,

      attendance,

      jobs,


    ] = await Promise.all([



      Employee.countDocuments(),



      Employee.countDocuments({
        status:"Active",
      }),



      Employee.countDocuments({
        status:"Inactive",
      }),



      Employee.distinct(
        "department"
      ),





      Leave.countDocuments({
        status:"Pending",
      }),



      Leave.countDocuments({
        status:"Approved",
      }),



      Leave.countDocuments({
        status:"Rejected",
      }),





      // JOB COUNTS


      Job.countDocuments(),



      Job.countDocuments({
        status:"Open",
      }),



      Job.countDocuments({
        status:"Closed",
      }),






      // RECENT EMPLOYEES


      Employee.find()

      .sort({
        createdAt:-1,
      })

      .limit(5),





      // RECENT LEAVES


      Leave.find()

      .populate(
        "employee",
        "name"
      )

      .sort({
        createdAt:-1,
      })

      .limit(5),





      // RECENT JOBS


      Job.find()

      .sort({
        createdAt:-1,
      })

      .limit(5),





      // FULL EMPLOYEE DATA


      Employee.find(),





      // PAYROLL DATA


      Payroll.find(),





      // ATTENDANCE DATA


      Attendance.find(),





      // JOB DATA


      Job.find(),



    ]);







    res.json({



      // EMPLOYEE STATS


      totalEmployees,


      activeEmployees,


      inactiveEmployees,


      totalDepartments:
      departments.length,






      // LEAVE STATS


      pendingLeaves,


      approvedLeaves,


      rejectedLeaves,







      // JOB STATS


      totalJobs,


      openJobs,


      closedJobs,







      // RECENT DATA


      recentEmployees,


      recentLeaves,


      recentJobs,







      // FULL DATA


      employees,


      payrolls,


      attendance,


      jobs,



    });





  } catch(error){


    console.error(
      "Dashboard Error:",
      error
    );



    res.status(500).json({

      message:error.message,

    });


  }


};