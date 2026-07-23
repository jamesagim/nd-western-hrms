import Employee from "../models/Employee.js";
import Leave from "../models/Leave.js";


export const getDashboard = async (req, res) => {

  try {

    const [
      totalEmployees,
      activeEmployees,
      inactiveEmployees,
      departments,

      pendingLeaves,
      approvedLeaves,
      rejectedLeaves,

      recentEmployees,
      recentLeaves,
      employees

    ] = await Promise.all([


      Employee.countDocuments(),


      Employee.countDocuments({
        status: "Active",
      }),


      Employee.countDocuments({
        status: "Inactive",
      }),


      Employee.distinct(
        "department"
      ),


      Leave.countDocuments({
        status: "Pending",
      }),


      Leave.countDocuments({
        status: "Approved",
      }),


      Leave.countDocuments({
        status: "Rejected",
      }),


      Employee.find()
        .sort({
          createdAt: -1,
        })
        .limit(5),


      Leave.find()
        .populate(
          "employee",
          "name"
        )
        .sort({
          createdAt: -1,
        })
        .limit(5),


      Employee.find(),


    ]);



    res.json({

      totalEmployees,

      activeEmployees,

      inactiveEmployees,

      totalDepartments:
        departments.length,


      pendingLeaves,

      approvedLeaves,

      rejectedLeaves,


      recentEmployees,

      recentLeaves,

      employees,


    });



  } catch(error) {


    console.error(
      "Dashboard Error:",
      error
    );


    res.status(500).json({

      message:
        error.message,

    });


  }

};