import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { NotificationContext } from "./NotificationContext";

export const EmployeeContext = createContext();

const API = "http://localhost:5001/api/employees";

function EmployeeProvider({ children }) {
  const [employees, setEmployees] = useState([]);
  const { addNotification } = useContext(NotificationContext);

  const getConfig = () => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });


  // ==========================
  // LOAD EMPLOYEES
  // ==========================

  useEffect(() => {
    fetchEmployees();
  }, []);


  const fetchEmployees = async () => {
    try {

      const res = await axios.get(
        API,
        getConfig()
      );

      setEmployees(res.data);

    } catch (error) {

      console.error(error);

      toast.error(
        "Unable to load employees."
      );

    }
  };



  // ==========================
  // ADD EMPLOYEE
  // ==========================

  const addEmployee = async (formData) => {

    try {

      const res = await axios.post(
        API,
        formData,
        {
          headers: {
            Authorization:
              `Bearer ${localStorage.getItem("token")}`,
            "Content-Type":
              "multipart/form-data",
          },
        }
      );


      await fetchEmployees();

      const employeeName =
        res.data.name ||
        `${res.data.firstName || ""} ${res.data.lastName || ""}`.trim() ||
        "New employee";

      addNotification(
        "New Employee",
        `${employeeName} joined ${res.data.department || "the team"}.`,
        "success"
      );

      toast.success(
        "Employee added successfully!"
      );

      return res.data;


    } catch (error) {


      console.error(error);


      toast.error(
        error.response?.data?.message ||
        "Unable to add employee."
      );


      throw error;

    }

  };




  // ==========================
  // DELETE EMPLOYEE
  // ==========================

  const deleteEmployee = async (id) => {

    try {

      await axios.delete(
        `${API}/${id}`,
        getConfig()
      );


      await fetchEmployees();


      toast.success(
        "Employee deleted successfully."
      );


    } catch (error) {


      console.error(error);


      toast.error(
        "Unable to delete employee."
      );


    }

  };





  // ==========================
  // UPDATE EMPLOYEE
  // ==========================

  const updateEmployee = async (
    formData,
    id
  ) => {


    try {


      const res = await axios.put(
        `${API}/${id}`,
        formData,
        {
          headers: {
            Authorization:
              `Bearer ${localStorage.getItem("token")}`,
            "Content-Type":
              "multipart/form-data",
          },
        }
      );


      await fetchEmployees();


      toast.success(
        "Employee updated successfully."
      );


      return res.data;



    } catch (error) {


      console.error(error);


      toast.error(
        error.response?.data?.message ||
        "Unable to update employee."
      );


      throw error;


    }


  };




  return (

    <EmployeeContext.Provider

      value={{
        employees,
        fetchEmployees,
        addEmployee,
        deleteEmployee,
        updateEmployee,
      }}

    >

      {children}

    </EmployeeContext.Provider>

  );

}


export default EmployeeProvider;