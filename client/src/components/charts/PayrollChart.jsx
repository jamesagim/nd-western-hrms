import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function PayrollChart({
  payrolls = [],
}) {
  const monthNames = [
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

  const monthlyTotals = {};

  payrolls.forEach((payroll) => {
    if (!payroll.createdAt) return;

    const month =
      monthNames[
        new Date(
          payroll.createdAt
        ).getMonth()
      ];

    const amount =
      Number(
        payroll.netSalary ??
        payroll.salary ??
        payroll.amount ??
        0
      );

    monthlyTotals[month] =
      (monthlyTotals[month] || 0) +
      amount;
  });

  const data = monthNames.map(
    (month) => ({
      month,
      payroll:
        monthlyTotals[month] || 0,
    })
  );

  return (
    <ResponsiveContainer
      width="100%"
      height={320}
    >
      <BarChart data={data}>

        <CartesianGrid
          strokeDasharray="3 3"
        />

        <XAxis dataKey="month" />

        <YAxis />

        <Tooltip />

        <Bar
          dataKey="payroll"
          fill="#16a34a"
          radius={[6, 6, 0, 0]}
        />

      </BarChart>
    </ResponsiveContainer>
  );
}

export default PayrollChart;