import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function StatusChart({ employees }) {
  const active = employees.filter(
    (emp) => emp.status === "Active"
  ).length;

  const inactive = employees.filter(
    (emp) => emp.status === "Inactive"
  ).length;

  const data = {
    labels: ["Active", "Inactive"],
    datasets: [
      {
        data: [active, inactive],
        backgroundColor: [
          "#22c55e",
          "#ef4444",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">
        Employee Status
      </h2>

      <Pie data={data} />
    </div>
  );
}

export default StatusChart;