import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import DashboardCard from "../components/DashboardCard";
import DepartmentChart from "../components/DepartmentChart";

import { getDashboard } from "../services/dashboardService";

import {
  Users,
  Building2,
  UserCheck,
  UserX,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";


function Dashboard() {


  const [stats,setStats] = useState(null);



  useEffect(()=>{

    loadDashboard();

  },[]);





  const loadDashboard = async()=>{


    try{

      const res =
      await getDashboard();


      setStats(
        res.data
      );


    }catch(error){

      console.log(error);

    }


  };





  if(!stats){

    return(

      <LoadingSpinner
        text="Loading Dashboard..."
      />

    );

  }






  return(


<div className="flex bg-gray-100 min-h-screen">


<Sidebar />



<div className="flex-1">


<Navbar />



<main className="p-8">





{/* EMPLOYEE CARDS */}


<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">



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








{/* LEAVE CARDS */}


<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">



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









{/* CHART */}



<div className="bg-white rounded-2xl shadow-sm p-6">


<h2 className="text-2xl font-bold mb-6">

Employees By Department

</h2>


<DepartmentChart

employees={
stats.employees || []
}

/>


</div>









{/* RECENT EMPLOYEES */}



<div className="bg-white rounded-2xl shadow-sm p-6 mt-10">


<h2 className="text-2xl font-bold mb-6">

Recent Employees

</h2>




<table className="w-full">


<thead>

<tr className="border-b">


<th className="p-4 text-left">
Name
</th>


<th className="p-4 text-left">
Department
</th>


<th className="p-4 text-left">
Email
</th>


<th className="p-4 text-left">
Status
</th>


</tr>

</thead>



<tbody>



{
stats.recentEmployees?.map(
(employee)=>(


<tr

key={employee._id}

className="border-b hover:bg-gray-50"

>


<td className="p-4">

{employee.name}

</td>


<td className="p-4">

{employee.department}

</td>


<td className="p-4">

{employee.email}

</td>


<td className="p-4">

{employee.status}

</td>



</tr>


)

)

}



</tbody>



</table>


</div>









{/* RECENT LEAVES */}



<div className="bg-white rounded-2xl shadow-sm p-6 mt-10">


<h2 className="text-2xl font-bold mb-6">

Recent Leave Requests

</h2>





<table className="w-full">


<thead>

<tr className="border-b">


<th className="p-4 text-left">
Employee
</th>


<th className="p-4 text-left">
Leave Type
</th>


<th className="p-4 text-left">
Status
</th>


</tr>


</thead>



<tbody>


{

stats.recentLeaves?.map(

(leave)=>(


<tr

key={leave._id}

className="border-b hover:bg-gray-50"

>


<td className="p-4">

{leave.employee?.name}

</td>


<td className="p-4">

{leave.leaveType}

</td>


<td className="p-4">


<span

className={`
px-3 py-1 rounded-full text-white

${
leave.status==="Approved"

?

"bg-green-600"

:

leave.status==="Rejected"

?

"bg-red-600"

:

"bg-yellow-500"

}

`}

>

{leave.status}

</span>


</td>



</tr>


)

)


}



</tbody>



</table>


</div>





</main>


</div>


</div>


  );


}



export default Dashboard;