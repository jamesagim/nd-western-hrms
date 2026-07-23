import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const EmployeeContext = createContext();

const API = "http://localhost:5001/api/employees";

function EmployeeProvider({ children }) {
  const [employees, setEmployees] = useState([]);

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