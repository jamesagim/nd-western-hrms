import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import AppLayout from "../components/layout/AppLayout";
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import LoadingSpinner from "../components/ui/LoadingSpinner";

import { EmployeeContext } from "../context/EmployeeContext";
import {
  getSinglePerformance,
  updatePerformance,
} from "../services/performanceService";

function EditPerformance() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { employees } = useContext(EmployeeContext);

  const [formData, setFormData] = useState({
    employee: "",
    reviewer: "",
    reviewPeriod: "",
    rating: 3,
    goals: "",
    comments: "",
    status: "Pending",
  });
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      loadPerformance();
    }
  }, [id]);

  const loadPerformance = async () => {
    try {
      setLoading(true);
      const res = await getSinglePerformance(id);

      setFormData({
        employee: res.data.employee?._id || "",
        reviewer: res.data.reviewer || "",
        reviewPeriod: res.data.reviewPeriod || "",
        rating: res.data.rating || 3,
        goals: res.data.goals || "",
        comments: res.data.comments || "",
        status: res.data.status || "Pending",
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to load performance review.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await updatePerformance(id, formData);
      toast.success("Performance review updated successfully.");
      navigate("/performance");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to update review.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <AppLayout>
        <PageHeader
          title="Edit Performance Review"
          subtitle="Update employee performance"
        />
        <Card className="max-w-4xl mx-auto p-8">
          <LoadingSpinner size={60} text="Loading review..." />
        </Card>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <PageHeader
        title="Edit Performance Review"
        subtitle="Update employee performance"
      />

      <Card className="max-w-4xl mx-auto p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-semibold">Employee</label>
            <select
              name="employee"
              value={formData.employee}
              onChange={handleChange}
              className="w-full border rounded-xl p-3"
              required
            >
              <option value="">Select Employee</option>

              {employees.map((employee) => (
                <option key={employee._id} value={employee._id}>
                  {employee.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 font-semibold">Reviewer</label>
            <input
              type="text"
              name="reviewer"
              value={formData.reviewer}
              onChange={handleChange}
              className="w-full border rounded-xl p-3"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Review Period</label>
            <input
              type="text"
              name="reviewPeriod"
              value={formData.reviewPeriod}
              onChange={handleChange}
              className="w-full border rounded-xl p-3"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Rating</label>
            <select
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="w-full border rounded-xl p-3"
            >
              <option value="1">⭐ 1</option>
              <option value="2">⭐⭐ 2</option>
              <option value="3">⭐⭐⭐ 3</option>
              <option value="4">⭐⭐⭐⭐ 4</option>
              <option value="5">⭐⭐⭐⭐⭐ 5</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-semibold">Goals</label>
            <textarea
              name="goals"
              value={formData.goals}
              onChange={handleChange}
              rows="4"
              className="w-full border rounded-xl p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Comments</label>
            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              rows="5"
              className="w-full border rounded-xl p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded-xl p-3"
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update Performance Review"}
          </Button>
        </form>
      </Card>
    </AppLayout>
  );
}

export default EditPerformance;