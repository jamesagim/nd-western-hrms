import { useEffect, useState } from "react";

import {
  getAttendance,
  clockIn,
  clockOut,
  deleteAttendance,
} from "../services/attendanceService";

import { toast } from "react-toastify";

import AppLayout from "../components/layout/AppLayout";
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";



function Attendance(){


const [attendance,setAttendance] =
useState([]);

const [search,setSearch] =
useState("");



const admin =
JSON.parse(
localStorage.getItem("admin")
);


const role =
admin?.role;





useEffect(()=>{

fetchAttendance();

},[]);





const fetchAttendance = async()=>{

try{

const res =
await getAttendance();


setAttendance(
res.data || []
);


}catch(error){

console.log(error);

}

};







const handleClockIn = async(employee)=>{


try{


await clockIn({

employee:
employee._id

});


toast.success(
"Clock In Successful"
);


fetchAttendance();



}catch(error){

toast.error(
"Clock In Failed"
);

}



};








const handleClockOut = async(id)=>{


try{


await clockOut(id);


toast.success(
"Clock Out Successful"
);


fetchAttendance();


}catch(error){

toast.error(
"Clock Out Failed"
);


}


};









const handleDelete = async(id)=>{


const confirm =
window.confirm(
"Delete attendance record?"
);


if(!confirm)
return;



try{


await deleteAttendance(id);


toast.success(
"Attendance Deleted"
);


fetchAttendance();



}catch(error){

console.log(error);

}



};










const filteredAttendance =
attendance.filter((item)=>{


const name =
item.employee?.name
?.toLowerCase()
||"";


return name.includes(
search.toLowerCase()
);


});










const present =
attendance.filter(
(item)=>
item.status==="Present"
).length;



const absent =
attendance.filter(
(item)=>
item.status==="Absent"
).length;



const late =
attendance.filter(
(item)=>
item.status==="Late"
).length;








return(

<AppLayout>



<PageHeader

title="Attendance Management"

subtitle="Track employee attendance"

/>






<div className="grid md:grid-cols-3 gap-6 mb-8">


<Card className="p-6">

<p className="text-gray-500">
Present
</p>

<h2 className="text-3xl font-bold text-green-600">

{present}

</h2>

</Card>




<Card className="p-6">

<p className="text-gray-500">
Absent
</p>

<h2 className="text-3xl font-bold text-red-600">

{absent}

</h2>

</Card>





<Card className="p-6">

<p className="text-gray-500">
Late
</p>

<h2 className="text-3xl font-bold text-yellow-600">

{late}

</h2>

</Card>


</div>










<Card className="p-6 mb-8">


<input

type="text"

placeholder="Search employee..."

value={search}

onChange={(e)=>
setSearch(e.target.value)
}

className="w-full border rounded-xl p-3"

/>


</Card>











<Card className="overflow-x-auto">



<table className="w-full">


<thead className="bg-slate-900 text-white">


<tr>


<th className="p-4 text-left">
Employee
</th>


<th className="p-4 text-left">
Date
</th>


<th className="p-4 text-left">
Check In
</th>


<th className="p-4 text-left">
Check Out
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

filteredAttendance.map(
(item)=>(


<tr

key={item._id}

className="border-b hover:bg-gray-50"

>


<td className="p-4">

{item.employee?.name || "Unknown"}

</td>




<td className="p-4">

{
new Date(
item.date
).toLocaleDateString()
}

</td>





<td className="p-4">

{
item.checkIn
?
new Date(
item.checkIn
).toLocaleTimeString()
:
"--"
}

</td>






<td className="p-4">

{
item.checkOut
?
new Date(
item.checkOut
).toLocaleTimeString()
:
"--"
}

</td>






<td className="p-4">


<span
className={`
px-3 py-1 rounded-full text-white

${
item.status==="Present"
?
"bg-green-600"
:
item.status==="Late"
?
"bg-yellow-600"
:
"bg-red-600"
}

`}
>

{item.status}

</span>


</td>








<td className="p-4 flex gap-2">


{
!item.checkOut &&

<button

onClick={()=>
handleClockOut(
item._id
)
}

className="bg-blue-600 text-white px-3 py-1 rounded"

>

Clock Out

</button>

}






{
role==="Admin" &&

<button

onClick={()=>
handleDelete(
item._id
)
}

className="bg-red-600 text-white px-3 py-1 rounded"

>

Delete

</button>

}



</td>





</tr>


)

)


}





</tbody>



</table>



</Card>





</AppLayout>

);


}



export default Attendance;