import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import AppLayout from "../components/layout/AppLayout";
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import LoadingSpinner from "../components/ui/LoadingSpinner";

import {
  getPerformance,
  deletePerformance,
} from "../services/performanceService";

function Performance() {
  const [reviews, setReviews] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const admin = JSON.parse(localStorage.getItem("admin") || "{}");
  const role = admin?.role;

  useEffect(() => {
    fetchPerformance();
  }, []);

  const fetchPerformance = async () => {
    try {
      setLoading(true);
      const res = await getPerformance();
      setReviews(res.data || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load performance reviews.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this performance review?")) return;

    try {
      await deletePerformance(id);
      toast.success("Performance review deleted.");
      fetchPerformance();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete performance review.");
    }
  };

  const filteredReviews = reviews.filter((review) => {
    const employee = review.employee?.name?.toLowerCase() || "";
    const department = review.employee?.department?.toLowerCase() || "";
    const reviewer = review.reviewer?.toLowerCase() || "";
    const status = review.status?.toLowerCase() || "";
    const text = search.toLowerCase();

    return (
      employee.includes(text) ||
      department.includes(text) ||
      reviewer.includes(text) ||
      status.includes(text)
    );
  });

  return (
    <AppLayout>
      <PageHeader
        title="Performance Management"
        subtitle="Employee performance reviews"
        actions={
          <Link to="/create-performance">
            <Button>+ New Review</Button>
          </Link>
        }
      />

      <Card className="p-6 mb-6">
        <input
          type="text"
          placeholder="Search employee, department, reviewer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-xl p-3"
        />
      </Card>

      <Card className="overflow-x-auto">
        {loading ? (
          <div className="p-10">
            <LoadingSpinner size={60} text="Loading reviews..." />
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            No performance reviews found.
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-slate-900 text-white">
              <tr>
                <th className="p-4 text-left">Employee</th>
                <th className="p-4 text-left">Department</th>
                <th className="p-4 text-left">Reviewer</th>
                <th className="p-4 text-left">Period</th>
                <th className="p-4 text-left">Rating</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredReviews.map((review) => (
                <tr key={review._id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{review.employee?.name}</td>
                  <td className="p-4">{review.employee?.department}</td>
                  <td className="p-4">{review.reviewer}</td>
                  <td className="p-4">{review.reviewPeriod}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-white ${
                        review.rating >= 4
                          ? "bg-green-600"
                          : review.rating >= 3
                          ? "bg-yellow-500"
                          : "bg-red-600"
                      }`}
                    >
                      ⭐ {review.rating}/5
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-white ${
                        review.status === "Completed"
                          ? "bg-green-600"
                          : "bg-yellow-500"
                      }`}
                    >
                      {review.status}
                    </span>
                  </td>
                  <td className="p-4 flex gap-2 flex-wrap">
                    <Link to={`/performance/${review._id}`}>
                      <Button>View</Button>
                    </Link>

                    {(role === "Admin" || role === "HR") && (
                      <Link to={`/edit-performance/${review._id}`}>
                        <Button>Edit</Button>
                      </Link>
                    )}

                    {role === "Admin" && (
                      <Button onClick={() => handleDelete(review._id)}>
                        Delete
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </AppLayout>
  );
}

export default Performance;