import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

import { EmployeeContext } from "../context/EmployeeContext";

import { createPerformance } from "../services/performanceService";

import { toast } from "react-toastify";

function CreatePerformance() {
  const navigate = useNavigate();

  const { employees } =
    useContext(EmployeeContext);

  const [formData, setFormData] = useState({
    employee: "",
    reviewer: "",
    reviewPeriod: "",
    rating: 3,
    goals: "",
    comments: "",
    status: "Pending",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createPerformance(
        formData
      );

      toast.success(
        "Performance review created successfully."
      );

      navigate("/performance");

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to create performance review."
      );

    }
  };

  return (
    <AppLayout>

      <PageHeader
        title="Create Performance Review"
        subtitle="Evaluate an employee's performance"
      />

      <Card className="max-w-4xl mx-auto p-8">

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

              {employees.map(
                (employee) => (

                  <option
                    key={employee._id}
                    value={employee._id}
                  >

                    {employee.name}

                  </option>

                )
              )}

            </select>

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              Reviewer
            </label>

            <input
              type="text"
              name="reviewer"
              value={formData.reviewer}
              onChange={handleChange}
              placeholder="Manager / HR"
              className="w-full border rounded-xl p-3"
              required
            />

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              Review Period
            </label>

            <input
              type="text"
              name="reviewPeriod"
              value={formData.reviewPeriod}
              onChange={handleChange}
              placeholder="Q1 2026"
              className="w-full border rounded-xl p-3"
              required
            />

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              Rating
            </label>

            <select
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="w-full border rounded-xl p-3"
            >

              <option value="1">
                ⭐ 1
              </option>

              <option value="2">
                ⭐⭐ 2
              </option>

              <option value="3">
                ⭐⭐⭐ 3
              </option>

              <option value="4">
                ⭐⭐⭐⭐ 4
              </option>

              <option value="5">
                ⭐⭐⭐⭐⭐ 5
              </option>

            </select>

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              Goals
            </label>

            <textarea
              name="goals"
              value={formData.goals}
              onChange={handleChange}
              rows="4"
              className="w-full border rounded-xl p-3"
              placeholder="Employee goals..."
            />

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              Comments
            </label>

            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              rows="5"
              className="w-full border rounded-xl p-3"
              placeholder="Performance comments..."
            />

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded-xl p-3"
            >

              <option value="Pending">
                Pending
              </option>

              <option value="Completed">
                Completed
              </option>

            </select>

          </div>

          <Button>
            Save Performance Review
          </Button>

        </form>

      </Card>

    </AppLayout>
  );
}

export default CreatePerformance;