import Button from "./Button";

function PageHeader({
  title,
  subtitle,
  buttonText,
  onClick,
  icon,
  actions,
}) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">

      <div>

        <div className="flex items-center gap-3">

          {icon && (
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
              {icon}
            </div>
          )}

          <div>

            <h1 className="text-4xl font-bold text-slate-900">
              {title}
            </h1>

            {subtitle && (
              <p className="text-slate-500 mt-1">
                {subtitle}
              </p>
            )}

          </div>

        </div>

      </div>

      <div className="flex gap-3">

        {actions}

        {buttonText && (
          <Button onClick={onClick}>
            {buttonText}
          </Button>
        )}

      </div>

    </div>
  );
}

export default PageHeader;