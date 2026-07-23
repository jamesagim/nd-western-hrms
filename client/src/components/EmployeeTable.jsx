import { Link } from "react-router-dom";
import {
  Eye,
  Pencil,
  Trash2,
  Building2,
  Mail,
  Phone,
  Circle,
} from "lucide-react";

import Badge from "./ui/Badge";
import DataTable from "./ui/DataTable";

function EmployeeTable({
  employees = [],
  deleteEmployee,
}) {
  const admin = JSON.parse(
    localStorage.getItem("admin")
  );

  const role = admin?.role;

  const handleDelete = async (employee) => {
    const confirmDelete = window.confirm(
      `Delete ${employee.name}?`
    );

    if (!confirmDelete) return;

    await deleteEmployee(employee._id);
  };

  const getInitials = (name = "") => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <DataTable
      columns={[
        "Employee",
        "Department",
        "Contact",
        "Status",
        "Actions",
      ]}
      emptyMessage="No employees found."
    >
      {employees.map((employee) => (
        <tr
          key={employee._id}
          className="border-b border-slate-100 hover:bg-blue-50/40 transition-all duration-300"
        >
          {/* Employee */}

          <td className="px-6 py-5">

            <div className="flex items-center gap-4">

              {employee.image ? (
                <img
                  src={employee.image}
                  alt={employee.name}
                  className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-sm"
                />
              ) : (
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white flex items-center justify-center font-bold text-lg shadow">
                  {getInitials(employee.name)}
                </div>
              )}

              <div>

                <h3 className="font-semibold text-slate-900 text-[15px]">
                  {employee.name}
                </h3>

                <div className="flex items-center gap-2 mt-1 text-slate-500 text-sm">

                  <Mail size={14} />

                  <span>{employee.email}</span>

                </div>

              </div>

            </div>

          </td>

          {/* Department */}

          <td className="px-6 py-5">

            <div className="flex items-center gap-2">

              <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center">

                <Building2
                  size={18}
                  className="text-blue-600"
                />

              </div>

              <Badge color="blue">
                {employee.department}
              </Badge>

            </div>

          </td>

          {/* Contact */}

          <td className="px-6 py-5">

            <div className="space-y-2 text-sm">

              <div className="flex items-center gap-2 text-slate-600">

                <Phone size={14} />

                {employee.phone || "No phone"}

              </div>

              <div className="flex items-center gap-2 text-slate-400">

                <Circle
                  size={8}
                  fill="currentColor"
                />

                Employee ID

              </div>

            </div>

          </td>

          {/* Status */}

          <td className="px-6 py-5">

            <Badge
              color={
                employee.status === "Active"
                  ? "green"
                  : "red"
              }
            >
              {employee.status}
            </Badge>

          </td>

          {/* Actions */}

          <td className="px-6 py-5">

            <div className="flex items-center gap-3">

              <Link
                to={`/employee/${employee.employeeId || "No ID"}`}
                className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition"
                title="View"
              >
                <Eye
                  size={18}
                  className="text-slate-700"
                />
              </Link>

              {(role === "Admin" ||
                role === "HR") && (
                <Link
                  to={`/edit-employee/${employee.employeeId || "No ID"}`}
                  className="w-10 h-10 rounded-xl bg-blue-100 hover:bg-blue-200 flex items-center justify-center transition"
                  title="Edit"
                >
                  <Pencil
                    size={18}
                    className="text-blue-700"
                  />
                </Link>
              )}

              {role === "Admin" && (
                <button
                  onClick={() =>
                    handleDelete(employee)
                  }
                  className="w-10 h-10 rounded-xl bg-red-100 hover:bg-red-200 flex items-center justify-center transition"
                  title="Delete"
                >
                  <Trash2
                    size={18}
                    className="text-red-700"
                  />
                </button>
              )}

            </div>

          </td>

        </tr>
      ))}
    </DataTable>
  );
}

export default EmployeeTable;