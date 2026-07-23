import Employee from "../models/Employee.js";
import Leave from "../models/Leave.js";
import Payroll from "../models/Payroll.js";
import Attendance from "../models/Attendance.js";

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

      employees,
      payrolls,
      attendance,
    ] = await Promise.all([
      Employee.countDocuments(),

      Employee.countDocuments({
        status: "Active",
      }),

      Employee.countDocuments({
        status: "Inactive",
      }),

      Employee.distinct("department"),

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

      Payroll.find(),

      Attendance.find(),
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

      payrolls,

      attendance,
    });
  } catch (error) {
    console.error(
      "Dashboard Error:",
      error
    );

    res.status(500).json({
      message: error.message,
    });
  }
};