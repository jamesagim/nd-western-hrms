import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

import {
  getInterviews,
  deleteInterview,
} from "../services/interviewService";

import { toast } from "react-toastify";

function InterviewSchedule() {

  const [interviews, setInterviews] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const admin = JSON.parse(
    localStorage.getItem("admin")
  );

  const role = admin?.role;

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {

    try {

      const res =
        await getInterviews();

      setInterviews(
        res.data || []
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to load interviews."
      );

    }

  };

  const handleDelete = async (id) => {

    if (
      !window.confirm(
        "Delete this interview?"
      )
    ) {
      return;
    }

    try {

      await deleteInterview(id);

      toast.success(
        "Interview deleted successfully."
      );

      fetchInterviews();

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to delete interview."
      );

    }

  };

  const filteredInterviews =
    interviews.filter((item) => {

      const candidate =
        item.candidate?.name
          ?.toLowerCase() || "";

      const interviewer =
        item.interviewer
          ?.toLowerCase() || "";

      return (
        candidate.includes(
          search.toLowerCase()
        ) ||
        interviewer.includes(
          search.toLowerCase()
        )
      );

    });

  const scheduled =
    interviews.filter(
      (i) =>
        i.status === "Scheduled"
    ).length;

  const completed =
    interviews.filter(
      (i) =>
        i.status === "Completed"
    ).length;

  const cancelled =
    interviews.filter(
      (i) =>
        i.status === "Cancelled"
    ).length;

  return (

    <AppLayout>

      <PageHeader
        title="Interview Management"
        subtitle="Schedule and manage interviews"
      />

      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <Card className="p-6">

          <p className="text-gray-500">
            Scheduled
          </p>

          <h2 className="text-3xl font-bold text-blue-600">
            {scheduled}
          </h2>

        </Card>

        <Card className="p-6">

          <p className="text-gray-500">
            Completed
          </p>

          <h2 className="text-3xl font-bold text-green-600">
            {completed}
          </h2>

        </Card>

        <Card className="p-6">

          <p className="text-gray-500">
            Cancelled
          </p>

          <h2 className="text-3xl font-bold text-red-600">
            {cancelled}
          </h2>

        </Card>

      </div>

      <Card className="p-6 mb-8">

        <div className="flex flex-col md:flex-row gap-4 justify-between">

          <input
            type="text"
            placeholder="Search interview..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="border rounded-xl p-3 w-full md:w-96"
          />

          {(role === "Admin" ||
            role === "HR") && (

            <Link
              to="/add-interview"
            >

              <Button>
                Schedule Interview
              </Button>

            </Link>

          )}

        </div>

      </Card>

      <Card className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-slate-900 text-white">

            <tr>

              <th className="p-4 text-left">
                Candidate
              </th>

              <th className="p-4 text-left">
                Job
              </th>

              <th className="p-4 text-left">
                Interviewer
              </th>

              <th className="p-4 text-left">
                Date
              </th>

              <th className="p-4 text-left">
                Mode
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

            {filteredInterviews.map(
              (item) => (

                <tr
                  key={item._id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-4">
                    {item.candidate?.name}
                  </td>

                  <td className="p-4">
                    {item.job?.title}
                  </td>

                  <td className="p-4">
                    {item.interviewer}
                  </td>

                  <td className="p-4">
                    {new Date(
                      item.interviewDate
                    ).toLocaleDateString()}
                  </td>

                  <td className="p-4">
                    {item.mode}
                  </td>

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-white ${
                        item.status ===
                        "Completed"
                          ? "bg-green-600"
                          : item.status ===
                            "Cancelled"
                          ? "bg-red-600"
                          : "bg-blue-600"
                      }`}
                    >
                      {item.status}
                    </span>

                  </td>

                  <td className="p-4 flex gap-2">

                    {(role === "Admin" ||
                      role === "HR") && (

                      <>
                        <Link
                          to={`/edit-interview/${item._id}`}
                        >
                          <Button>
                            Edit
                          </Button>
                        </Link>

                        {role ===
                          "Admin" && (

                          <Button
                            onClick={() =>
                              handleDelete(
                                item._id
                              )
                            }
                          >
                            Delete
                          </Button>

                        )}

                      </>

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

export default InterviewSchedule;