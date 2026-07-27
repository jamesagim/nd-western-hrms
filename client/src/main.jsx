import React from "react";
import ReactDOM from "react-dom/client";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import App from "./App.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// CONTEXTS

import EmployeeProvider from "./context/EmployeeContext.jsx";
import CandidateProvider from "./context/CandidateContext.jsx";
import { NotificationProvider } from "./context/NotificationContext.jsx";


// PAGES

import Login from "./pages/Login.jsx";

import Dashboard from "./pages/Dashboard.jsx";

import Employees from "./pages/Employees.jsx";
import AddEmployee from "./pages/AddEmployee.jsx";
import EditEmployee from "./pages/EditEmployee.jsx";

import Recruitment from "./pages/Recruitment.jsx";
import AddCandidate from "./pages/AddCandidate.jsx";
import CandidateProfile from "./pages/CandidateProfile.jsx";

import InterviewSchedule from "./pages/InterviewSchedule.jsx";
import AddInterview from "./pages/AddInterview.jsx";


// STYLES

import "./index.css";



function RootApp() {

  return (

    <NotificationProvider>

      <EmployeeProvider>

        <CandidateProvider>


          <BrowserRouter>


            <Routes>


              {/* LOGIN */}

              <Route
                path="/login"
                element={<Login />}
              />



              {/* MAIN APP */}

              <Route
                path="/*"
                element={<App />}
              />


            </Routes>



            <ToastContainer
              position="top-right"
              autoClose={3000}
            />


          </BrowserRouter>


        </CandidateProvider>


      </EmployeeProvider>


    </NotificationProvider>


  );

}




ReactDOM.createRoot(
  document.getElementById("root")
)
.render(

  <React.StrictMode>

    <RootApp />

  </React.StrictMode>

);