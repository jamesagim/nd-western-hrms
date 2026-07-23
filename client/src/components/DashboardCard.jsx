import { ArrowUpRight } from "lucide-react";

function DashboardCard({
  title,
  value,
  icon: Icon,
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 p-6">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <h2 className="text-4xl font-bold text-slate-900 mt-3">
            {value}
          </h2>

          <div className="flex items-center gap-2 mt-5">

            <ArrowUpRight
              size={16}
              className="text-green-600"
            />

            <span className="text-sm text-green-600 font-medium">
              Live Data
            </span>

          </div>

        </div>

        <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center">

          {Icon && (
            <Icon
              size={30}
              className="text-blue-600"
            />
          )}

        </div>

      </div>

    </div>
  );
}

export default DashboardCard;