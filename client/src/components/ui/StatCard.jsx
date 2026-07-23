import Card from "./Card";

function StatCard({
  icon,
  title,
  value,
  subtitle,
}) {
  return (
    <Card className="p-6">

      <div className="flex justify-between items-start">

        <div>

          <p className="text-slate-500">
            {title}
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {value}
          </h2>

          {subtitle && (
            <p className="text-green-600 mt-2 text-sm">
              {subtitle}
            </p>
          )}

        </div>

        <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">

          {icon}

        </div>

      </div>

    </Card>
  );
}

export default StatCard;