import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function AttendanceChart({
  attendance = [],
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

  const monthlyAttendance = {};

  attendance.forEach((record) => {
    if (!record.createdAt) return;

    const month =
      monthNames[
        new Date(
          record.createdAt
        ).getMonth()
      ];

    monthlyAttendance[month] =
      (monthlyAttendance[month] || 0) + 1;
  });

  const data = monthNames.map(
    (month) => ({
      month,
      attendance:
        monthlyAttendance[month] || 0,
    })
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
          dataKey="attendance"
          stroke="#f97316"
          strokeWidth={3}
        />

      </LineChart>
    </ResponsiveContainer>
  );
}

export default AttendanceChart;