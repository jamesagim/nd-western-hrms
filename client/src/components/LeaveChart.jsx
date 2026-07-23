import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { CalendarCheck2 } from "lucide-react";

function LeaveChart({
  pending,
  approved,
  rejected,
}) {
  const data = [
    {
      name: "Pending",
      value: pending,
      color: "#F59E0B",
    },
    {
      name: "Approved",
      value: approved,
      color: "#22C55E",
    },
    {
      name: "Rejected",
      value: rejected,
      color: "#EF4444",
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7">

      {/* Header */}

      <div className="flex items-center justify-between mb-8">

        <div>

          <h2 className="text-xl font-bold text-slate-900">
            Leave Analytics
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Current leave request status
          </p>

        </div>

        <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">

          <CalendarCheck2
            size={24}
            className="text-orange-500"
          />

        </div>

      </div>

      {/* Chart */}

      <ResponsiveContainer
        width="100%"
        height={320}
      >
        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={70}
            outerRadius={105}
            paddingAngle={4}
            stroke="white"
            strokeWidth={2}
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={entry.color}
              />
            ))}
          </Pie>

          <Tooltip />

          <Legend
            verticalAlign="bottom"
            iconType="circle"
          />

        </PieChart>
      </ResponsiveContainer>

    </div>
  );
}

export default LeaveChart;