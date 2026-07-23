import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";
import ViewEmployee from "./pages/ViewEmployee";

import Recruitment from "./pages/Recruitment";
import AddCandidate from "./pages/AddCandidate";

import LeaveManagement from "./pages/LeaveManagement";
import RequestLeave from "./pages/RequestLeave";
import ViewLeave from "./pages/ViewLeave";

import Attendance from "./pages/Attendance";

import Payroll from "./pages/Payroll";
import CreatePayroll from "./pages/CreatePayroll";
import EditPayroll from "./pages/EditPayroll";
import ViewPayroll from "./pages/ViewPayroll";

import Performance from "./pages/Performance";

import Documents from "./pages/Documents";
import UploadDocument from "./pages/UploadDocument";
import ViewDocument from "./pages/ViewDocument";
import EditDocument from "./pages/EditDocument";

import Settings from "./pages/Settings";
import Login from "./pages/Login";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
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