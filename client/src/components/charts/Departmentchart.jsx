import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function DepartmentChart({
  employees,
}) {
  const departmentCounts = {};

  employees.forEach((employee) => {
    const department =
      employee.department ||
      "Unknown";

    departmentCounts[department] =
      (departmentCounts[department] || 0) + 1;
  });

  const data = Object.keys(
    departmentCounts
  ).map((department) => ({
    department,
    employees:
      departmentCounts[department],
  }));

  return (
    <ResponsiveContainer
      width="100%"
      height={320}
    >
      <BarChart data={data}>
        <CartesianGrid
          strokeDasharray="3 3"
        />

        <XAxis
          dataKey="department"
        />

        <YAxis />

        <Tooltip />

        <Bar
          dataKey="employees"
          fill="#2563eb"
          radius={[6, 6, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default DepartmentChart;