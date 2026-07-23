import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";


import AppLayout from "../components/layout/AppLayout";
import Card from "../components/ui/Card";
import PageHeader from "../components/ui/PageHeader";
import Button from "../components/ui/Button";


import { EmployeeContext } from "../context/EmployeeContext";

import { createLeave } from "../services/leaveService";

import { toast } from "react-toastify";



function RequestLeave(){


const navigate = useNavigate();


const { employees } =
useContext(EmployeeContext);



const [formData,setFormData] =
useState({

 employee:"",
 leaveType:"Annual",
 startDate:"",
 endDate:"",
 reason:"",

});





const handleChange = (e)=>{


setFormData({

 ...formData,

 [e.target.name]:
 e.target.value,

});


};






const handleSubmit = async(e)=>{


e.preventDefault();



try{


await createLeave(formData);



toast.success(
"Leave request submitted successfully"
);



setTimeout(()=>{


navigate(
"/leave-management"
);


},500);



}

catch(error){


console.log(
error.response?.data || error.message
);



toast.error(
"Failed to submit leave request"
);


}



};







return (

<AppLayout>


<PageHeader

title="Request Leave"

subtitle="Submit employee leave request"

/>




<Card className="max-w-4xl p-8">


<form

onSubmit={handleSubmit}

className="space-y-6"

>



<div>

<label className="block font-semibold mb-2">

Employee

</label>



<select

name="employee"

value={formData.employee}

onChange={handleChange}

required

className="w-full border rounded-xl p-3"

>


<option value="">

Select Employee

</option>



{
employees.map((employee)=>(


<option

key={employee._id}

value={employee._id}

>

{employee.name}
(
{employee.department}
)

</option>


))
}


</select>


</div>







<div>


<label className="block font-semibold mb-2">

Leave Type

</label>



<select

name="leaveType"

value={formData.leaveType}

onChange={handleChange}

className="w-full border rounded-xl p-3"

>


<option>
Annual
</option>


<option>
Sick
</option>


<option>
Casual
</option>


<option>
Maternity
</option>


<option>
Paternity
</option>



</select>


</div>







<div className="grid md:grid-cols-2 gap-5">


<div>

<label className="block font-semibold mb-2">

Start Date

</label>


<input

type="date"

name="startDate"

value={formData.startDate}

onChange={handleChange}

required

className="w-full border rounded-xl p-3"

/>


</div>





<div>

<label className="block font-semibold mb-2">

End Date

</label>


<input

type="date"

name="endDate"

value={formData.endDate}

onChange={handleChange}

required

className="w-full border rounded-xl p-3"

/>


</div>



</div>








<div>


<label className="block font-semibold mb-2">

Reason

</label>



<textarea

name="reason"

value={formData.reason}

onChange={handleChange}

rows="5"

required

placeholder="Reason for leave"

className="w-full border rounded-xl p-3"

/>



</div>








<Button type="submit">

Submit Leave Request

</Button>





</form>



</Card>



</AppLayout>


);


}


export default RequestLeave;