import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { Building2 } from "lucide-react";

function DepartmentChart({ employees }) {
  const departments = [
    "IT",
    "HR",
    "SMC",
    "TD",
    "Engineering",
    "Audit",
    "Legal",
  ];

  const data = departments.map((department) => ({
    department,
    employees: employees.filter(
      (employee) =>
        employee.department === department
    ).length,
  }));

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7">

      {/* Header */}

      <div className="flex items-center justify-between mb-8">

        <div>

          <h2 className="text-xl font-bold text-slate-900">
            Department Overview
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Employee distribution across departments
          </p>

        </div>

        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">

          <Building2
            size={24}
            className="text-blue-600"
          />

        </div>

      </div>

      {/* Chart */}

      <ResponsiveContainer
        width="100%"
        height={320}
      >
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: -20,
            bottom: 0,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#E5E7EB"
          />

          <XAxis
            dataKey="department"
            tick={{
              fill: "#64748B",
              fontSize: 12,
            }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tick={{
              fill: "#64748B",
              fontSize: 12,
            }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            cursor={{
              fill: "#F8FAFC",
            }}
          />

          <Bar
            dataKey="employees"
            fill="#4F8EF7"
            radius={[8, 8, 0, 0]}
          />

        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}

export default DepartmentChart;