import {
  Bell,
  Search,
  CalendarDays,
  Check,
  X,
} from "lucide-react";

import {
  useContext,
  useState,
} from "react";

import {
  NotificationContext
} from "../../context/NotificationContext";


function Navbar() {


  const [openNotifications, setOpenNotifications] =
    useState(false);


  const {
    notifications,
    markAsRead,
    clearNotifications,
  } = useContext(NotificationContext);



  const admin =
    JSON.parse(
      localStorage.getItem("admin")
    ) || {};




  const unreadCount =
    notifications.filter(
      (notification)=>
        !notification.read
    ).length;




  const today =
    new Date().toLocaleDateString(
      "en-US",
      {
        weekday:"long",
        month:"long",
        day:"numeric",
        year:"numeric",
      }
    );





  const notificationColor = (type)=>{

    if(type==="success")
      return "bg-green-100 text-green-700";


    if(type==="warning")
      return "bg-yellow-100 text-yellow-700";


    if(type==="error")
      return "bg-red-100 text-red-700";


    return "bg-blue-100 text-blue-700";

  };





  return (

<header className="bg-white border-b border-gray-200 px-8 py-5">


<div className="flex items-center justify-between">



{/* LEFT */}

<div>

<h1 className="text-3xl font-bold text-slate-900">

Welcome back, {admin.name || "Admin"}

</h1>



<div className="flex items-center gap-2 mt-1 text-gray-500">

<CalendarDays size={16}/>

<span className="text-sm">

{today}

</span>

</div>


</div>






{/* RIGHT */}

<div className="flex items-center gap-5">





{/* SEARCH */}

<div className="relative hidden lg:block">


<Search

size={18}

className="absolute left-4 top-3.5 text-gray-400"

/>


<input

type="text"

placeholder="Search anything..."

className="
w-80
bg-gray-100
rounded-xl
pl-11
pr-4
py-3
outline-none
focus:ring-2
focus:ring-blue-400
"

/>


</div>







{/* NOTIFICATION */}


<div className="relative">


<button

onClick={()=>
setOpenNotifications(
!openNotifications
)
}

className="
relative
w-12
h-12
rounded-xl
bg-gray-100
hover:bg-gray-200
transition
flex
items-center
justify-center
"

>


<Bell

size={21}

className="text-slate-700"

/>



{
unreadCount > 0 &&

<span

className="
absolute
-top-1
-right-1
bg-red-500
text-white
text-xs
font-bold
rounded-full
w-5
h-5
flex
items-center
justify-center
"

>

{unreadCount}

</span>

}


</button>








{
openNotifications &&


<div

className="
absolute
right-0
mt-3
w-96
bg-white
rounded-2xl
shadow-2xl
border
border-gray-200
z-50
overflow-hidden
"

>


<div

className="
flex
items-center
justify-between
px-5
py-4
border-b
"

>


<div>

<h3 className="font-bold text-slate-900">

Notifications

</h3>


<p className="text-xs text-gray-500">

{
unreadCount
}
unread

</p>


</div>



<button

onClick={clearNotifications}

className="
text-xs
text-red-500
hover:text-red-700
"

>

Clear all

</button>


</div>









<div

className="
max-h-96
overflow-y-auto
"

>


{
notifications.length === 0 ?


<div

className="
p-8
text-center
text-gray-400
"

>

No notifications yet

</div>



:


notifications.map(
(notification)=>(


<div

key={notification.id}

onClick={()=>
markAsRead(
notification.id
)
}

className={`
px-5
py-4
border-b
cursor-pointer
hover:bg-gray-50
transition
${!notification.read
?
"bg-blue-50"
:
""
}
`}

>



<div className="flex gap-3">


<div

className={`
w-9
h-9
rounded-full
flex
items-center
justify-center
${notificationColor(notification.type)}
`}

>


<Bell size={16}/>


</div>






<div className="flex-1">


<h4 className="font-semibold text-sm">

{notification.title}

</h4>


<p className="text-sm text-gray-600">

{notification.message}

</p>


<p className="text-xs text-gray-400 mt-1">

{
new Date(
notification.createdAt
)
.toLocaleString()
}

</p>


</div>





{
!notification.read &&

<div className="w-2 h-2 bg-blue-600 rounded-full mt-2">

</div>

}



</div>


</div>


)

)


}



</div>



</div>

}


</div>









{/* USER */}


<div className="
flex
items-center
gap-3
bg-gray-100
rounded-xl
px-3
py-2
">


<div

className="
w-11
h-11
rounded-full
bg-black
flex
items-center
justify-center
text-white
font-bold
text-lg
"

>


{
(admin.name || "A")
.charAt(0)
.toUpperCase()
}


</div>





<div>


<p className="font-semibold text-slate-900">

{admin.name || "Administrator"}

</p>



<p className="text-xs text-gray-500">

{admin.role || "Admin"}

</p>


</div>


</div>







</div>


</div>


</header>


  );

}


export default Navbar;