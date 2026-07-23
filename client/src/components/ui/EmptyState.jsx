import Button from "./Button";

function EmptyState({
  title,
  description,
  buttonText,
  onClick,
}) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-14 text-center">

      <div className="text-6xl mb-6">
        👥
      </div>

      <h2 className="text-2xl font-bold">
        {title}
      </h2>

      <p className="text-slate-500 mt-3 mb-8">
        {description}
      </p>

      {buttonText && (
        <Button onClick={onClick}>
          {buttonText}
        </Button>
      )}

    </div>
  );
}

export default EmptyState;