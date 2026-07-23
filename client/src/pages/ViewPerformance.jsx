import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

import {
  getSinglePerformance,
} from "../services/performanceService";

function ViewPerformance() {

  const { id } = useParams();

  const [review, setReview] = useState(null);

  useEffect(() => {
    loadReview();
  }, []);

  const loadReview = async () => {

    try {

      const res =
        await getSinglePerformance(id);

      setReview(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  if (!review) {

    return (
      <AppLayout>

        <div className="p-10">

          Loading...

        </div>

      </AppLayout>
    );

  }

  return (

    <AppLayout>

      <PageHeader

        title="Performance Review"

        subtitle={
          review.employee?.name
        }

      />

      <Card className="max-w-5xl mx-auto p-10">

        <div className="grid md:grid-cols-2 gap-8">

          <div>

            <h3 className="font-bold mb-2">
              Employee
            </h3>

            <p>
              {review.employee?.name}
            </p>

          </div>

          <div>

            <h3 className="font-bold mb-2">
              Department
            </h3>

            <p>
              {
                review.employee
                  ?.department
              }
            </p>

          </div>

          <div>

            <h3 className="font-bold mb-2">
              Reviewer
            </h3>

            <p>
              {review.reviewer}
            </p>

          </div>

          <div>

            <h3 className="font-bold mb-2">
              Review Period
            </h3>

            <p>
              {
                review.reviewPeriod
              }
            </p>

          </div>

          <div>

            <h3 className="font-bold mb-2">
              Rating
            </h3>

            <p className="text-2xl font-bold text-yellow-500">
              ⭐ {review.rating}/5
            </p>

          </div>

          <div>

            <h3 className="font-bold mb-2">
              Status
            </h3>

            <span
              className={`px-4 py-2 rounded-full text-white ${
                review.status ===
                "Completed"
                  ? "bg-green-600"
                  : "bg-yellow-500"
              }`}
            >
              {review.status}
            </span>

          </div>

        </div>

        <div className="mt-10">

          <h3 className="font-bold mb-3">
            Goals
          </h3>

          <div className="border rounded-xl p-5 bg-gray-50">

            {review.goals ||
              "No goals provided."}

          </div>

        </div>

        <div className="mt-8">

          <h3 className="font-bold mb-3">
            Comments
          </h3>

          <div className="border rounded-xl p-5 bg-gray-50">

            {review.comments ||
              "No comments provided."}

          </div>

        </div>

        <div className="mt-10">

          <Button
            onClick={() =>
              window.print()
            }
          >
            Print Review
          </Button>

        </div>

      </Card>

    </AppLayout>

  );

}

export default ViewPerformance;