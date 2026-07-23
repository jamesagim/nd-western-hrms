import Card from "../ui/Card";

import EmployeeGrowthChart from "../charts/EmployeeGrowthChart";
import DepartmentChart from "../charts/DepartmentChart";
import LeavePieChart from "../charts/LeavePieChart";
import PayrollChart from "../charts/PayrollChart";
import AttendanceChart from "../charts/AttendanceChart";

function DashboardCharts({ stats }) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-10">

      <Card>

        <h2 className="text-xl font-bold mb-4">
          Employee Growth
        </h2>

        <EmployeeGrowthChart
          employees={stats.employees}
        />

      </Card>

      <Card>

        <h2 className="text-xl font-bold mb-4">
          Employees by Department
        </h2>

        <DepartmentChart
          employees={stats.employees}
        />

      </Card>

      <Card>

        <h2 className="text-xl font-bold mb-4">
          Leave Distribution
        </h2>

        <LeavePieChart
          pendingLeaves={
            stats.pendingLeaves
          }
          approvedLeaves={
            stats.approvedLeaves
          }
          rejectedLeaves={
            stats.rejectedLeaves
          }
        />

      </Card>

      <Card>

        <h2 className="text-xl font-bold mb-4">
          Payroll Trend
        </h2>

        <PayrollChart
          payrolls={
            stats.payrolls
          }
        />

      </Card>

      <Card className="xl:col-span-2">

        <h2 className="text-xl font-bold mb-4">
          Attendance Trend
        </h2>

        <AttendanceChart
          attendance={
            stats.attendance
          }
        />

      </Card>

    </div>
  );
}

export default DashboardCharts;