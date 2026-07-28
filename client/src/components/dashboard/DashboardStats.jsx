import DashboardCard from "../DashboardCard";

import {
  Users,
  Building2,
  UserCheck,
  UserX,
  Clock,
  CheckCircle,
  XCircle,
  Briefcase,
  FolderOpen,
  FolderClosed,
} from "lucide-react";


function DashboardStats({ stats }) {

  return (

    <>

      {/* ================= EMPLOYEE CARDS ================= */}


      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">


        <DashboardCard

          title="Total Employees"

          value={stats.totalEmployees}

          icon={Users}

        />



        <DashboardCard

          title="Departments"

          value={stats.totalDepartments}

          icon={Building2}

        />



        <DashboardCard

          title="Active Employees"

          value={stats.activeEmployees}

          icon={UserCheck}

        />



        <DashboardCard

          title="Inactive Employees"

          value={stats.inactiveEmployees}

          icon={UserX}

        />


      </div>






      {/* ================= LEAVE CARDS ================= */}



      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">


        <DashboardCard

          title="Pending Leave"

          value={stats.pendingLeaves}

          icon={Clock}

        />



        <DashboardCard

          title="Approved Leave"

          value={stats.approvedLeaves}

          icon={CheckCircle}

        />



        <DashboardCard

          title="Rejected Leave"

          value={stats.rejectedLeaves}

          icon={XCircle}

        />


      </div>







      {/* ================= JOB CARDS ================= */}



      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">


        <DashboardCard

          title="Total Jobs"

          value={stats.totalJobs}

          icon={Briefcase}

        />



        <DashboardCard

          title="Open Jobs"

          value={stats.openJobs}

          icon={FolderOpen}

        />



        <DashboardCard

          title="Closed Jobs"

          value={stats.closedJobs}

          icon={FolderClosed}

        />


      </div>




    </>

  );

}


export default DashboardStats;