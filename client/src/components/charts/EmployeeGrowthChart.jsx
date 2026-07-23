import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function EmployeeGrowthChart({
  employees,
}) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const data = months.map(
    (month, index) => {
      const total =
        employees.filter((emp) => {
          if (!emp.createdAt)
            return false;

          const employeeMonth =
            new Date(
              emp.createdAt
            ).getMonth();

          return (
            employeeMonth <= index
          );
        }).length;

      return {
        month,
        employees: total,
      };
    }
  );

  return (
    <ResponsiveContainer
      width="100%"
      height={320}
    >
      <LineChart data={data}>
        <CartesianGrid
          strokeDasharray="3 3"
        />

        <XAxis dataKey="month" />

        <YAxis />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="employees"
          stroke="#2563eb"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default EmployeeGrowthChart;