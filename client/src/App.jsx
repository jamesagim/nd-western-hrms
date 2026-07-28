import { Routes, Route } from "react-router-dom";


// ================= DASHBOARD =================

import Dashboard from "./pages/Dashboard";



// ================= EMPLOYEES =================

import Employees from "./pages/Employees";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";
import ViewEmployee from "./pages/ViewEmployee";



// ================= RECRUITMENT =================

import Recruitment from "./pages/Recruitment";
import AddCandidate from "./pages/AddCandidate";
import CandidateBoard from "./pages/CandidateBoard";
import CandidateProfile from "./pages/CandidateProfile";
import AddInterview from "./pages/AddInterview";
import EditInterview from "./pages/EditInterview";
import InterviewSchedule from "./pages/InterviewSchedule";



// ================= LEAVE =================

import LeaveManagement from "./pages/LeaveManagement";
import RequestLeave from "./pages/RequestLeave";
import ViewLeave from "./pages/ViewLeave";



// ================= ATTENDANCE =================

import Attendance from "./pages/Attendance";



// ================= JOBS =================

import Jobs from "./pages/Jobs";
import AddJob from "./pages/AddJob";
import EditJob from "./pages/EditJob";
import ViewJob from "./pages/ViewJob";



// ================= PAYROLL =================

import Payroll from "./pages/Payroll";
import CreatePayroll from "./pages/CreatePayroll";
import EditPayroll from "./pages/EditPayroll";
import ViewPayroll from "./pages/ViewPayroll";



// ================= PERFORMANCE =================

import Performance from "./pages/Performance";



// ================= DOCUMENTS =================

import Documents from "./pages/Documents";
import UploadDocument from "./pages/UploadDocument";
import ViewDocument from "./pages/ViewDocument";
import EditDocument from "./pages/EditDocument";



// ================= USERS =================

import Users from "./pages/Users";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";



// ================= SETTINGS =================

import Settings from "./pages/Settings";



// ================= LOGIN =================

import Login from "./pages/Login";



// ================= PROTECTION =================

import ProtectedRoute from "./components/ProtectedRoute";




function App(){


return (

<Routes>





{/* ================= LOGIN ================= */}


<Route

path="/login"

element={<Login />}

/>







{/* ================= DASHBOARD ================= */}


<Route

path="/"

element={

<ProtectedRoute>

<Dashboard />

</ProtectedRoute>

}

/>







{/* ================= EMPLOYEES ================= */}


<Route

path="/employees"

element={

<ProtectedRoute>

<Employees />

</ProtectedRoute>

}

/>



<Route

path="/add-employee"

element={

<ProtectedRoute>

<AddEmployee />

</ProtectedRoute>

}

/>



<Route

path="/edit-employee/:id"

element={

<ProtectedRoute>

<EditEmployee />

</ProtectedRoute>

}

/>



<Route

path="/employee/:id"

element={

<ProtectedRoute>

<ViewEmployee />

</ProtectedRoute>

}

/>








{/* ================= RECRUITMENT ================= */}


<Route

path="/recruitment"

element={

<ProtectedRoute>

<Recruitment />

</ProtectedRoute>

}

/>



<Route

path="/recruitment/add"

element={

<ProtectedRoute>

<AddCandidate />

</ProtectedRoute>

}

/>



<Route

path="/candidate-board"

element={

<ProtectedRoute>

<CandidateBoard />

</ProtectedRoute>

}

/>



<Route

path="/candidate/:id"

element={

<ProtectedRoute>

<CandidateProfile />

</ProtectedRoute>

}

/>



<Route

path="/interviews"

element={

<ProtectedRoute>

<InterviewSchedule />

</ProtectedRoute>

}

/>



<Route

path="/add-interview"

element={

<ProtectedRoute>

<AddInterview />

</ProtectedRoute>

}

/>



<Route

path="/edit-interview/:id"

element={

<ProtectedRoute>

<EditInterview />

</ProtectedRoute>

}

/>








{/* ================= LEAVE ================= */}


<Route

path="/leave-management"

element={

<ProtectedRoute>

<LeaveManagement />

</ProtectedRoute>

}

/>



<Route

path="/request-leave"

element={

<ProtectedRoute>

<RequestLeave />

</ProtectedRoute>

}

/>



<Route

path="/leave/:id"

element={

<ProtectedRoute>

<ViewLeave />

</ProtectedRoute>

}

/>








{/* ================= ATTENDANCE ================= */}


<Route

path="/attendance"

element={

<ProtectedRoute>

<Attendance />

</ProtectedRoute>

}

/>








{/* ================= JOBS ================= */}


<Route

path="/jobs"

element={

<ProtectedRoute>

<Jobs />

</ProtectedRoute>

}

/>



<Route

path="/add-job"

element={

<ProtectedRoute>

<AddJob />

</ProtectedRoute>

}

/>



<Route

path="/edit-job/:id"

element={

<ProtectedRoute>

<EditJob />

</ProtectedRoute>

}

/>



<Route

path="/job/:id"

element={

<ProtectedRoute>

<ViewJob />

</ProtectedRoute>

}

/>








{/* ================= PAYROLL ================= */}


<Route

path="/payroll"

element={

<ProtectedRoute>

<Payroll />

</ProtectedRoute>

}

/>



<Route

path="/create-payroll"

element={

<ProtectedRoute>

<CreatePayroll />

</ProtectedRoute>

}

/>



<Route

path="/edit-payroll/:id"

element={

<ProtectedRoute>

<EditPayroll />

</ProtectedRoute>

}

/>



<Route

path="/payroll/:id"

element={

<ProtectedRoute>

<ViewPayroll />

</ProtectedRoute>

}

/>








{/* ================= PERFORMANCE ================= */}


<Route

path="/performance"

element={

<ProtectedRoute>

<Performance />

</ProtectedRoute>

}

/>








{/* ================= DOCUMENTS ================= */}


<Route

path="/documents"

element={

<ProtectedRoute>

<Documents />

</ProtectedRoute>

}

/>



<Route

path="/upload-document"

element={

<ProtectedRoute>

<UploadDocument />

</ProtectedRoute>

}

/>



<Route

path="/documents/:id"

element={

<ProtectedRoute>

<ViewDocument />

</ProtectedRoute>

}

/>



<Route

path="/edit-document/:id"

element={

<ProtectedRoute>

<EditDocument />

</ProtectedRoute>

}

/>








{/* ================= USERS ================= */}


<Route

path="/users"

element={

<ProtectedRoute>

<Users />

</ProtectedRoute>

}

/>



<Route

path="/add-user"

element={

<ProtectedRoute>

<AddUser />

</ProtectedRoute>

}

/>



<Route

path="/edit-user/:id"

element={

<ProtectedRoute>

<EditUser />

</ProtectedRoute>

}

/>








{/* ================= SETTINGS ================= */}


<Route

path="/settings"

element={

<ProtectedRoute>

<Settings />

</ProtectedRoute>

}

/>





</Routes>

);


}


export default App;