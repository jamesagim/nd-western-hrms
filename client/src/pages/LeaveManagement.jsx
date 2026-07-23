import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getLeaves,
  updateLeave,
  deleteLeave,
} from "../services/leaveService";

import { toast } from "react-toastify";

import AppLayout from "../components/layout/AppLayout";
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

import {
  Eye,
  Check,
  X,
  Trash2,
  Search,
} from "lucide-react";


function LeaveManagement() {


  const [leaves, setLeaves] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);



  const admin = JSON.parse(
    localStorage.getItem("admin")
  );


  const role = admin?.role;



  useEffect(() => {

    fetchLeaves();

  }, []);





  const fetchLeaves = async () => {

    try {

      setLoading(true);

      const res = await getLeaves();

      setLeaves(
        res.data || []
      );


    } catch(error) {


      console.log(error);

      toast.error(
        "Failed to load leaves"
      );


    } finally {

      setLoading(false);

    }

  };







  const handleApprove = async(id)=>{


    try {


      await updateLeave(
        id,
        {
          status:"Approved"
        }
      );


      toast.success(
        "Leave Approved"
      );


      fetchLeaves();



    } catch(error){


      toast.error(
        "Approval failed"
      );


    }


  };








  const handleReject = async(id)=>{


    try {


      await updateLeave(
        id,
        {
          status:"Rejected"
        }
      );


      toast.success(
        "Leave Rejected"
      );


      fetchLeaves();



    } catch(error){


      toast.error(
        "Rejection failed"
      );


    }


  };









  const handleDelete = async(id)=>{


    const confirm =
    window.confirm(
      "Delete this leave request?"
    );



    if(!confirm)
      return;




    try {


      await deleteLeave(id);



      toast.success(
        "Leave deleted"
      );


      fetchLeaves();



    }catch(error){


      toast.error(
        "Delete failed"
      );


    }


  };










  const filteredLeaves =
  leaves.filter((leave)=>{


    const text =
    search.toLowerCase();



    return (

      leave.employee?.name
      ?.toLowerCase()
      .includes(text)


      ||

      leave.leaveType
      ?.toLowerCase()
      .includes(text)


      ||

      leave.status
      ?.toLowerCase()
      .includes(text)

    );


  });







  return (

<AppLayout>


<PageHeader

title="Leave Management"

subtitle="Manage employee leave requests"

actions={

<Link to="/request-leave">

<Button>

+ Request Leave

</Button>

</Link>

}

/>
<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

  <Card className="p-6">
    <p className="text-gray-500">
      Total Requests
    </p>

    <h2 className="text-3xl font-bold mt-2">
      {leaves.length}
    </h2>
  </Card>


  <Card className="p-6">

    <p className="text-gray-500">
      Pending
    </p>

    <h2 className="text-3xl font-bold mt-2 text-yellow-600">
      {
        leaves.filter(
          (leave)=>
            leave.status==="Pending"
        ).length
      }
    </h2>

  </Card>




  <Card className="p-6">

    <p className="text-gray-500">
      Approved
    </p>

    <h2 className="text-3xl font-bold mt-2 text-green-600">
      {
        leaves.filter(
          (leave)=>
            leave.status==="Approved"
        ).length
      }
    </h2>

  </Card>





  <Card className="p-6">

    <p className="text-gray-500">
      Rejected
    </p>

    <h2 className="text-3xl font-bold mt-2 text-red-600">
      {
        leaves.filter(
          (leave)=>
            leave.status==="Rejected"
        ).length
      }
    </h2>

  </Card>


</div>





<Card className="p-6 mb-8">


<div className="relative">


<Search

size={18}

className="absolute left-4 top-4 text-gray-400"

/>



<input

type="text"

placeholder="Search employee, type or status..."

value={search}

onChange={(e)=>
setSearch(e.target.value)
}

className="w-full border rounded-xl py-3 pl-11 pr-4"

/>


</div>



</Card>









<Card className="overflow-x-auto">


<table className="w-full">


<thead className="bg-slate-900 text-white">


<tr>


<th className="p-4 text-left">
Employee
</th>


<th className="p-4 text-left">
Department
</th>


<th className="p-4 text-left">
Leave Type
</th>


<th className="p-4 text-left">
Duration
</th>


<th className="p-4 text-left">
Status
</th>


<th className="p-4 text-left">
Actions
</th>


</tr>


</thead>





<tbody>



{
loading ? (


<tr>

<td
colSpan="6"
className="text-center p-8"
>

Loading leaves...

</td>

</tr>



)

:



filteredLeaves.length === 0 ? (


<tr>

<td

colSpan="6"

className="text-center p-8 text-gray-500"

>

No leave requests found

</td>

</tr>



)



:

filteredLeaves.map((leave)=>(


<tr

key={leave._id}

className="border-b hover:bg-gray-50"

>



<td className="p-4 font-medium">

{leave.employee?.name || "Unknown"}

</td>





<td className="p-4">

{leave.employee?.department || "N/A"}

</td>





<td className="p-4">

{leave.leaveType}

</td>





<td className="p-4">


{
new Date(
leave.startDate
).toLocaleDateString()
}


{" - "}


{
new Date(
leave.endDate
).toLocaleDateString()
}


</td>






<td className="p-4">


<span

className={

`
px-3 py-1 rounded-full text-white text-sm

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

`

}

>

{leave.status}

</span>


</td>







<td className="p-4">


<div className="flex gap-2 flex-wrap">



<Link

to={`/leave/${leave._id}`}

className="bg-blue-600 text-white p-2 rounded-lg"

title="View"

>

<Eye size={16}/>

</Link>







{

(role==="Admin" ||
role==="HR")

&&

leave.status==="Pending"

&&

<>


<button

onClick={()=>
handleApprove(
leave._id
)
}

className="bg-green-600 text-white p-2 rounded-lg"

>

<Check size={16}/>

</button>





<button

onClick={()=>
handleReject(
leave._id
)
}

className="bg-orange-500 text-white p-2 rounded-lg"

>

<X size={16}/>

</button>


</>


}








{

role==="Admin"

&&


<button

onClick={()=>
handleDelete(
leave._id
)
}

className="bg-red-600 text-white p-2 rounded-lg"

>

<Trash2 size={16}/>

</button>


}





</div>


</td>





</tr>


))

}



</tbody>



</table>


</Card>



</AppLayout>


);


}


export default LeaveManagement;