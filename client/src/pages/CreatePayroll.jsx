import { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";
import Card from "../components/ui/Card";
import PageHeader from "../components/ui/PageHeader";
import Button from "../components/ui/Button";

import { EmployeeContext } from "../context/EmployeeContext";
import { createPayroll } from "../services/payrollService";

import { toast } from "react-toastify";

function CreatePayroll() {
  const navigate = useNavigate();

  const { employees } = useContext(EmployeeContext);

  const [formData, setFormData] = useState({
    employee: "",
    month: "",
    year: new Date().getFullYear(),
    basicSalary: "",
    allowance: "",
    bonus: "",
    deductions: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const netSalary = useMemo(() => {
    return (
      Number(formData.basicSalary || 0) +
      Number(formData.allowance || 0) +
      Number(formData.bonus || 0) -
      Number(formData.deductions || 0)
    );
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createPayroll({
        ...formData,
        netSalary,
      });

      toast.success(
        "Payroll created successfully."
      );

      navigate("/payroll");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to create payroll."
      );
    }
  };

  return (
    <AppLayout>
      <PageHeader
        title="Create Payroll"
        subtitle="Generate payroll for an employee"
      />

      <Card className="max-w-4xl p-8">

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <div>
            <label className="block mb-2 font-semibold">
              Employee
            </label>

            <select
              name="employee"
              value={formData.employee}
              onChange={handleChange}
              className="w-full border rounded-xl p-3"
              required
            >
              <option value="">
                Select Employee
              </option>

              {employees.map((employee) => (
                <option
                  key={employee._id}
                  value={employee._id}
                >
                  {employee.name} (
                  {employee.department})
                </option>
              ))}
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <label className="block mb-2 font-semibold">
                Month
              </label>

              <select
                name="month"
                value={formData.month}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
                required
              >
                <option value="">
                  Select Month
                </option>

                {[
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ].map((month) => (
                  <option
                    key={month}
                    value={month}
                  >
                    {month}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Year
              </label>

              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
                required
              />
            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <label className="block mb-2 font-semibold">
                Basic Salary
              </label>

              <input
                type="number"
                name="basicSalary"
                value={formData.basicSalary}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Allowance
              </label>

              <input
                type="number"
                name="allowance"
                value={formData.allowance}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              />
            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <label className="block mb-2 font-semibold">
                Bonus
              </label>

              <input
                type="number"
                name="bonus"
                value={formData.bonus}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Deductions
              </label>

              <input
                type="number"
                name="deductions"
                value={formData.deductions}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              />
            </div>

          </div>

          <div className="bg-slate-100 rounded-xl p-5">

            <h2 className="text-xl font-bold">
              Net Salary
            </h2>

            <p className="text-3xl font-bold text-green-600 mt-2">
              ₦{netSalary.toLocaleString()}
            </p>

          </div>

          <Button type="submit">
            Create Payroll
          </Button>

        </form>

      </Card>
    </AppLayout>
  );
}

export default CreatePayroll;