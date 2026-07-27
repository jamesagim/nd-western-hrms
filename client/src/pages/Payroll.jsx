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
        total + Number(payroll.netSalary || 0),
      0
    );

  const paidEmployeesCount = payrolls.filter(
    (payroll) => payroll.status === "Paid"
  ).length;

  const pendingPaymentsCount = payrolls.filter(
    (payroll) => payroll.status === "Pending"
  ).length;

  const totalAmountPaid = payrolls.reduce(
    (total, payroll) =>
      total +
      (payroll.status === "Paid"
        ? Number(payroll.netSalary || 0)
        : 0),
    0
  );

  return (
    <AppLayout>
      <PageHeader
        title="Payroll Dashboard"
        subtitle="A consolidated view of payroll health and payments"
        actions={
          <Link to="/create-payroll">
            <Button>
              + Create Payroll
            </Button>
          </Link>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Total Payroll
          </h3>
          <p className="mt-4 text-4xl font-bold text-slate-900">
            {payrolls.length}
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Records across the current payroll run.
          </p>
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Paid Employees
          </h3>
          <p className="mt-4 text-4xl font-bold text-emerald-600">
            {paidEmployeesCount}
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Payments completed successfully.
          </p>
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Pending Payments
          </h3>
          <p className="mt-4 text-4xl font-bold text-amber-600">
            {pendingPaymentsCount}
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Employees awaiting payroll approval.
          </p>
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Total Amount Paid
          </h3>
          <p className="mt-4 text-4xl font-bold text-blue-600">
            ₦{totalAmountPaid.toLocaleString()}
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Cleared payroll disbursements.
          </p>
        </Card>
      </div>

      <Card className="p-6 mb-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Payroll Overview
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Review employee payroll status, salary breakdowns, and payment actions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <input
              type="text"
              placeholder="Search employee, department or status..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-auto min-w-[220px] border border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </Card>

      <Card className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-slate-900 text-white">
            <tr>
              <th className="px-5 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                Employee
              </th>
              <th className="px-5 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                Department
              </th>
              <th className="px-5 py-4 text-right text-sm font-semibold uppercase tracking-wider">
                Basic Salary
              </th>
              <th className="px-5 py-4 text-right text-sm font-semibold uppercase tracking-wider">
                Bonus
              </th>
              <th className="px-5 py-4 text-right text-sm font-semibold uppercase tracking-wider">
                Deductions
              </th>
              <th className="px-5 py-4 text-right text-sm font-semibold uppercase tracking-wider">
                Net Salary
              </th>
              <th className="px-5 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                Status
              </th>
              <th className="px-5 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-slate-200">
            {filteredPayroll.map((payroll) => (
              <tr key={payroll._id} className="hover:bg-slate-50">
                <td className="px-5 py-4 text-sm font-medium text-slate-900">
                  {payroll.employee?.name || "—"}
                </td>
                <td className="px-5 py-4 text-sm text-slate-600">
                  {payroll.employee?.department || "—"}
                </td>
                <td className="px-5 py-4 text-right text-sm font-semibold text-slate-900">
                  ₦{Number(payroll.basicSalary || 0).toLocaleString()}
                </td>
                <td className="px-5 py-4 text-right text-sm text-slate-700">
                  ₦{Number(payroll.bonus || 0).toLocaleString()}
                </td>
                <td className="px-5 py-4 text-right text-sm text-slate-700">
                  ₦{Number(payroll.deductions || 0).toLocaleString()}
                </td>
                <td className="px-5 py-4 text-right text-sm font-semibold text-slate-900">
                  ₦{Number(payroll.netSalary || 0).toLocaleString()}
                </td>
                <td className="px-5 py-4 text-sm">
                  <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                    payroll.status === "Paid"
                      ? "bg-emerald-100 text-emerald-700"
                      : payroll.status === "Pending"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-slate-100 text-slate-700"
                  }`}>
                    {payroll.status || "Unknown"}
                  </span>
                </td>
                <td className="px-5 py-4 text-sm text-slate-700">
                  <div className="flex flex-wrap gap-2">
                    <Link to={`/payroll/${payroll._id}`}>
                      <Button className="px-4 py-2" variant="secondary">
                        View
                      </Button>
                    </Link>
                    <Link to={`/edit-payroll/${payroll._id}`}>
                      <Button className="px-4 py-2" variant="secondary">
                        Edit
                      </Button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </AppLayout>
  );
}

export default Payroll;