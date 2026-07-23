import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [
  "#eab308",
  "#22c55e",
  "#ef4444",
];

function LeavePieChart({
  pendingLeaves,
  approvedLeaves,
  rejectedLeaves,
}) {
  const data = [
    {
      name: "Pending",
      value: pendingLeaves,
    },
    {
      name: "Approved",
      value: approvedLeaves,
    },
    {
      name: "Rejected",
      value: rejectedLeaves,
    },
  ];

  return (
    <ResponsiveContainer
      width="100%"
      height={320}
    >
      <PieChart>

        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius={110}
          label
        >
          {data.map(
            (entry, index) => (
              <Cell
                key={index}
                fill={
                  COLORS[index]
                }
              />
            )
          )}
        </Pie>

        <Tooltip />

        <Legend />

      </PieChart>
    </ResponsiveContainer>
  );
}

export default LeavePieChart;