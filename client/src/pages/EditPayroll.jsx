import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

import {
  getPayroll,
  updatePayroll,
} from "../services/payrollService";

import { toast } from "react-toastify";

function EditPayroll() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    month: "",
    year: "",
    basicSalary: "",
    allowance: "",
    bonus: "",
    deductions: "",
  });

  useEffect(() => {
    loadPayroll();
  }, []);

  const loadPayroll = async () => {
    try {
      const res = await getPayroll();

      const payroll = res.data.find(
        (item) => item._id === id
      );

      if (!payroll) {
        toast.error("Payroll not found");
        navigate("/payroll");
        return;
      }

      setFormData({
        month: payroll.month,
        year: payroll.year,
        basicSalary: payroll.basicSalary,
        allowance: payroll.allowance || 0,
        bonus: payroll.bonus,
        deductions: payroll.deductions,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const netSalary =
    Number(formData.basicSalary) +
    Number(formData.allowance) +
    Number(formData.bonus) -
    Number(formData.deductions);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updatePayroll(id, {
        ...formData,
        netSalary,
      });

      toast.success(
        "Payroll updated successfully"
      );

      navigate("/payroll");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Update failed"
      );
    }
  };

  return (
    <AppLayout>

      <PageHeader
        title="Edit Payroll"
        subtitle="Update payroll information"
      />

      <Card className="max-w-4xl p-8">

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <div className="grid md:grid-cols-2 gap-5">

            <div>

              <label className="block mb-2 font-semibold">
                Month
              </label>

              <input
                type="text"
                name="month"
                value={formData.month}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              />

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
              />

            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-5">

            <input
              type="number"
              name="basicSalary"
              placeholder="Basic Salary"
              value={formData.basicSalary}
              onChange={handleChange}
              className="border rounded-xl p-3"
            />

            <input
              type="number"
              name="allowance"
              placeholder="Allowance"
              value={formData.allowance}
              onChange={handleChange}
              className="border rounded-xl p-3"
            />

          </div>

          <div className="grid md:grid-cols-2 gap-5">

            <input
              type="number"
              name="bonus"
              placeholder="Bonus"
              value={formData.bonus}
              onChange={handleChange}
              className="border rounded-xl p-3"
            />

            <input
              type="number"
              name="deductions"
              placeholder="Deductions"
              value={formData.deductions}
              onChange={handleChange}
              className="border rounded-xl p-3"
            />

          </div>

          <div className="bg-slate-100 rounded-xl p-5">

            <h2 className="font-bold">
              Net Salary
            </h2>

            <p className="text-3xl text-green-600 font-bold">
              ₦{netSalary.toLocaleString()}
            </p>

          </div>

          <Button type="submit">
            Update Payroll
          </Button>

        </form>

      </Card>

    </AppLayout>
  );
}

export default EditPayroll;