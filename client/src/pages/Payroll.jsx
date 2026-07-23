import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

import {
  getPayroll,
  deletePayroll,
  markPayrollPaid,
} from "../services/payrollService";

import { toast } from "react-toastify";

function Payroll() {
  const [payrolls, setPayrolls] = useState([]);
  const [search, setSearch] = useState("");

  const admin = JSON.parse(
    localStorage.getItem("admin")
  );

  const role = admin?.role;

  useEffect(() => {
    fetchPayroll();
  }, []);

  const fetchPayroll = async () => {
    try {
      const res = await getPayroll();
      setPayrolls(res.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Delete this payroll?"
      )
    )
      return;

    try {
      await deletePayroll(id);

      toast.success(
        "Payroll deleted."
      );

      fetchPayroll();
    } catch (error) {
      console.log(error);
    }
  };

  const handlePaid = async (id) => {
    try {
      await markPayrollPaid(id);

      toast.success(
        "Payroll marked as paid."
      );

      fetchPayroll();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredPayroll = payrolls.filter(
    (payroll) => {
      const employee =
        payroll.employee?.name?.toLowerCase() ||
        "";

      const month =
        payroll.month?.toLowerCase() || "";

      const status =
        payroll.status?.toLowerCase() || "";

      const text =
        search.toLowerCase();

      return (
        employee.includes(text) ||
        month.includes(text) ||
        status.includes(text)
      );
    }
  );

  const totalPayrollValue =
    payrolls.reduce(
      (total, payroll) =>
        total +
        Number(payroll.netSalary || 0),
      0
    );

  return (
    <AppLayout>
      <PageHeader
        title="Payroll"
        subtitle="Manage employee payroll"
        actions={
          <Link to="/create-payroll">
            <Button>
              + Create Payroll
            </Button>
          </Link>
        }
      />

      {/* SUMMARY CARDS */}

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <h3 className="text-gray-500">
            Total Payroll
          </h3>

          <h1 className="text-4xl font-bold mt-2">
            {payrolls.length}
          </h1>
        </Card>

        <Card className="p-6">
          <h3 className="text-gray-500">
            Paid
          </h3>

          <h1 className="text-4xl font-bold text-green-600 mt-2">
            {
              payrolls.filter(
                (p) =>
                  p.status === "Paid"
              ).length
            }
          </h1>
        </Card>

        <Card className="p-6">
          <h3 className="text-gray-500">
            Pending
          </h3>

          <h1 className="text-4xl font-bold text-yellow-500 mt-2">
            {
              payrolls.filter(
                (p) =>
                  p.status ===
                  "Pending"
              ).length
            }
          </h1>
        </Card>
      </div>

      {/* TOTAL PAYROLL VALUE */}

      <Card className="p-6 mb-8">
        <h2 className="text-xl font-bold">
          Total Payroll Value
        </h2>

        <h1 className="text-4xl font-bold text-blue-600 mt-3">
          ₦
          {totalPayrollValue.toLocaleString()}
        </h1>
      </Card>

      {/* SEARCH */}

      <Card className="p-6 mb-8">
        <input
          type="text"
          placeholder="Search employee, month or status..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full border rounded-xl p-3"
        />
      </Card>

      {/* TABLE */}

      <Card className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-900 text-white">
            <tr>
              <th className="p-4 text-left">
                Employee
              </th>

              <th className="p-4 text-left">
                Month
              </th>

              <th className="p-4 text-left">
                Net Salary
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredPayroll.map(
              (payroll) => (
                <tr
                  key={payroll._id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-4">
                    {payroll.employee?.name}
                  </td>

                  <td className="p-4">
                    {payroll.month}{" "}
                    {payroll.year}
                  </td>

                  <td className="p-4 font-semibold">
                    ₦
                    {Number(
                      payroll.netSalary
                    ).toLocaleString()}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-white ${
                        payroll.status ===
                        "Paid"
                          ? "bg-green-600"
                          : "bg-yellow-500"
                      }`}
                    >
                      {payroll.status}
                    </span>
                  </td>

                  <td className="p-4 flex gap-2 flex-wrap">
                    <Link
                      to={`/payroll/${payroll._id}`}
                    >
                      <Button>
                        View
                      </Button>
                    </Link>

                    <Link
                      to={`/edit-payroll/${payroll._id}`}
                    >
                      <Button>
                        Edit
                      </Button>
                    </Link>

                    {payroll.status ===
                      "Pending" &&
                      (role ===
                        "Admin" ||
                        role ===
                          "HR") && (
                        <Button
                          onClick={() =>
                            handlePaid(
                              payroll._id
                            )
                          }
                        >
                          Mark Paid
                        </Button>
                      )}

                    {role ===
                      "Admin" && (
                      <Button
                        onClick={() =>
                          handleDelete(
                            payroll._id
                          )
                        }
                      >
                        Delete
                      </Button>
                    )}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </Card>
    </AppLayout>
  );
}

export default Payroll;