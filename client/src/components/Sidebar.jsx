import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  LayoutDashboard,
  Users,
  UserPlus,
  CalendarCheck2,
  Clock3,
  Settings,
  LogOut,
  Briefcase,
  BadgeDollarSign,
  BarChart3,
  FileText,
  UserCog,
  ClipboardList,
  MessageSquare,
  ChevronRight,
} from "lucide-react";

import TonkaLogo from "./logo/TonkaLogo";


function Sidebar() {

const navigate = useNavigate();


const admin =
JSON.parse(
localStorage.getItem("admin")
);


const role =
admin?.role;



const handleLogout = ()=>{

localStorage.removeItem("token");

localStorage.removeItem("admin");

navigate("/login");

};




const linkClass = ({isActive}) =>

`group flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300 ${
isActive
?
"bg-black text-white shadow-lg"
:
"text-slate-600 hover:bg-slate-100"
}`;




return (

<aside className="w-72 bg-white border-r border-slate-200 flex flex-col">


<div className="p-7 border-b border-slate-200">

<TonkaLogo size="md"/>

</div>



<div className="flex-1 px-5 py-6 overflow-y-auto">


<p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-3">
Main Menu
</p>



<nav className="space-y-2">



<NavLink to="/" className={linkClass}>
<div className="flex items-center gap-3">
<LayoutDashboard size={20}/>
Dashboard
</div>
</NavLink>




<NavLink to="/employees" className={linkClass}>
<div className="flex items-center gap-3">
<Users size={20}/>
Employees
</div>
</NavLink>





{
(role==="Admin" || role==="HR") &&

<NavLink to="/add-employee" className={linkClass}>

<div className="flex items-center gap-3">
<UserPlus size={20}/>
Add Employee
</div>

</NavLink>

}






<NavLink to="/attendance" className={linkClass}>

<div className="flex items-center gap-3">
<Clock3 size={20}/>
Attendance
</div>

</NavLink>





<NavLink to="/leave-management" className={linkClass}>

<div className="flex items-center gap-3">
<CalendarCheck2 size={20}/>
Leave
</div>

</NavLink>





<NavLink to="/recruitment" className={linkClass}>

<div className="flex items-center gap-3">
<Briefcase size={20}/>
Recruitment
</div>

</NavLink>





<NavLink to="/candidate-board" className={linkClass}>

<div className="flex items-center gap-3">
<ClipboardList size={20}/>
Candidate Board
</div>

</NavLink>





<NavLink to="/interviews" className={linkClass}>

<div className="flex items-center gap-3">
<MessageSquare size={20}/>
Interviews
</div>

</NavLink>






<NavLink to="/payroll" className={linkClass}>

<div className="flex items-center gap-3">
<BadgeDollarSign size={20}/>
Payroll
</div>

</NavLink>






<NavLink to="/performance" className={linkClass}>

<div className="flex items-center gap-3">
<BarChart3 size={20}/>
Performance
</div>

</NavLink>






<NavLink to="/documents" className={linkClass}>

<div className="flex items-center gap-3">
<FileText size={20}/>
Documents
</div>

</NavLink>






{
role==="Admin" &&

<NavLink to="/users" className={linkClass}>

<div className="flex items-center gap-3">
<UserCog size={20}/>
Users
</div>

</NavLink>

}



</nav>



</div>







<div className="border-t border-slate-200 p-5">



<NavLink
to="/settings"
className={linkClass}
>

<div className="flex items-center gap-3">
<Settings size={20}/>
Settings
</div>

</NavLink>





<button

onClick={handleLogout}

className="mt-3 w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-600 hover:bg-red-50 transition"

>

<LogOut size={20}/>

Logout

</button>




</div>



</aside>

);

}


export default Sidebar;