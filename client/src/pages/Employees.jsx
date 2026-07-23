import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Plus,
  Users,
  UserCheck,
  UserX,
  Building2,
} from "lucide-react";

import { EmployeeContext } from "../context/EmployeeContext";

import AppLayout from "../components/layout/AppLayout";
import EmployeeTable from "../components/EmployeeTable";
import ExportExcel from "../components/ExportExcel";
import ExportPDF from "../components/ExportPDF";

import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import StatCard from "../components/ui/StatCard";

function Employees() {
  const { employees, deleteEmployee } =
    useContext(EmployeeContext);

  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] =
    useState("All");
  const [statusFilter, setStatusFilter] =
    useState("All");

  const filteredEmployees = employees.filter(
    (employee) => {
      const matchesSearch =
        employee.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        employee.email
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        employee.department
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesDepartment =
        departmentFilter === "All" ||
        employee.department === departmentFilter;

      const matchesStatus =
        statusFilter === "All" ||
        employee.status === statusFilter;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesStatus
      );
    }
  );

  const activeEmployees = employees.filter(
    (employee) => employee.status === "Active"
  ).length;

  const inactiveEmployees = employees.filter(
    (employee) => employee.status === "Inactive"
  ).length;

  const totalDepartments = new Set(
    employees.map(
      (employee) => employee.department
    )
  ).size;

  return (
    <AppLayout>
      <PageHeader
        title="Employees"
        subtitle="Manage employees, departments and company records."
        actions={
          <>
            <ExportExcel
              employees={filteredEmployees}
            />

            <ExportPDF
              employees={filteredEmployees}
            />

            <Link to="/add-employee">
              <Button>
                <div className="flex items-center gap-2">
                  <Plus size={18} />
                  Add Employee
                </div>
              </Button>
            </Link>
          </>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

        <StatCard
          title="Total Employees"
          value={employees.length}
          icon={
            <Users
              size={28}
              className="text-blue-600"
            />
          }
        />

        <StatCard
          title="Active"
          value={activeEmployees}
          icon={
            <UserCheck
              size={28}
              className="text-green-600"
            />
          }
        />

        <StatCard
          title="Inactive"
          value={inactiveEmployees}
          icon={
            <UserX
              size={28}
              className="text-red-600"
            />
          }
        />

        <StatCard
          title="Departments"
          value={totalDepartments}
          icon={
            <Building2
              size={28}
              className="text-purple-600"
            />
          }
        />

      </div>

      <Card className="p-6 mb-8">

        <div className="grid lg:grid-cols-3 gap-5">

          <div className="relative">

            <Search
              size={18}
              className="absolute left-4 top-4 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search employees..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full border border-slate-300 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          <select
            value={departmentFilter}
            onChange={(e) =>
              setDepartmentFilter(
                e.target.value
              )
            }
            className="border border-slate-300 rounded-xl px-4 py-3 bg-white"
          >
            <option value="All">
              All Departments
            </option>

            <option>IT</option>
            <option>HR</option>
            <option>SMC</option>
            <option>TD</option>
            <option>Engineering</option>
            <option>Audit</option>
            <option>Legal</option>

          </select>

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value
              )
            }
            className="border border-slate-300 rounded-xl px-4 py-3 bg-white"
          >
            <option value="All">
              All Status
            </option>

            <option>Active</option>

            <option>Inactive</option>

          </select>

        </div>

      </Card>

      <div className="flex justify-between items-center mb-6">

        <div className="bg-white rounded-2xl border border-slate-200 px-5 py-3 shadow-sm">

          <span className="text-slate-500">
            Employees Found
          </span>

          <span className="ml-3 font-bold text-slate-900 text-lg">
            {filteredEmployees.length} / {employees.length}
          </span>

        </div>

      </div>

      <EmployeeTable
        employees={filteredEmployees}
        deleteEmployee={deleteEmployee}
      />

    </AppLayout>
  );
}

export default Employees;